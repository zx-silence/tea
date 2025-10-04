import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { generateSignedUrl, getPublicUrl } from '@/lib/oss';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const resource = await prisma.resource.findUnique({
      where: { id: params.id, isActive: true },
    });

    if (!resource) {
      return NextResponse.json(
        { error: 'Resource not found' },
        { status: 404 }
      );
    }

    // Check access level
    if (resource.accessLevel === 'PUBLIC') {
      const url = getPublicUrl(resource.fileUrl);
      return NextResponse.json({ url });
    }

    // Require authentication for non-public resources
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Check school-specific access
    if (resource.accessLevel === 'SCHOOL_ONLY' || resource.accessLevel === 'PREMIUM') {
      // Additional checks can be added here for school-specific or premium content
      // For now, authenticated users can access
    }

    // Generate signed URL with expiration
    const url = generateSignedUrl({
      key: resource.fileUrl,
      expiresIn: 3600, // 1 hour
    });

    // Increment view/download count
    await prisma.resource.update({
      where: { id: params.id },
      data: { 
        viewCount: { increment: 1 },
      },
    });

    return NextResponse.json({ url });
  } catch (error) {
    console.error('Get resource URL error:', error);
    return NextResponse.json(
      { error: 'Failed to generate resource URL' },
      { status: 500 }
    );
  }
}
