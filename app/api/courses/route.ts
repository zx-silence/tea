import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const level = searchParams.get('level');
    const featured = searchParams.get('featured') === 'true';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');

    const where: any = {
      isPublished: true,
    };

    if (level) {
      where.level = level;
    }

    if (featured) {
      where.isFeatured = true;
    }

    const [courses, total] = await Promise.all([
      prisma.course.findMany({
        where,
        orderBy: [
          { isFeatured: 'desc' },
          { order: 'asc' },
          { createdAt: 'desc' },
        ],
        skip: (page - 1) * limit,
        take: limit,
        include: {
          lessons: {
            where: { isPublished: true },
            select: {
              id: true,
              title: true,
              duration: true,
              isFree: true,
            },
          },
        },
      }),
      prisma.course.count({ where }),
    ]);

    return NextResponse.json({
      courses,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get courses error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}
