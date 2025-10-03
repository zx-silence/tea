import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { notifyCooperationApplication } from '@/lib/notifications';
import { z } from 'zod';

const cooperationSchema = z.object({
  schoolName: z.string().min(2),
  contactPerson: z.string().min(2),
  contactPhone: z.string().regex(/^1[3-9]\d{9}$/),
  contactEmail: z.string().email(),
  position: z.string().optional(),
  province: z.string(),
  city: z.string(),
  district: z.string().optional(),
  studentCount: z.number().int().positive().optional(),
  message: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = cooperationSchema.parse(body);

    const application = await prisma.cooperationApplication.create({
      data: {
        ...data,
        status: 'PENDING',
      },
    });

    // Send notification
    await notifyCooperationApplication(
      data.contactEmail,
      data.contactPhone,
      'PENDING'
    );

    return NextResponse.json({
      success: true,
      application,
    });
  } catch (error) {
    console.error('Cooperation application error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to submit application' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const where = status ? { status: status as any } : {};

    const [applications, total] = await Promise.all([
      prisma.cooperationApplication.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          school: {
            select: {
              name: true,
              code: true,
            },
          },
        },
      }),
      prisma.cooperationApplication.count({ where }),
    ]);

    return NextResponse.json({
      applications,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get applications error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
}
