import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, BookOpen, PlayCircle, Lock } from 'lucide-react';
import { formatDuration } from '@/lib/utils';
import Link from 'next/link';

interface CoursePageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const course = await prisma.course.findUnique({
    where: { id: params.id },
    select: { title: true, description: true },
  });

  if (!course) {
    return {
      title: '课程未找到',
    };
  }

  return {
    title: `${course.title} - 中国少年茶人`,
    description: course.description || course.title,
  };
}

async function getCourse(id: string) {
  return prisma.course.findUnique({
    where: { id, isPublished: true },
    include: {
      lessons: {
        where: { isPublished: true },
        orderBy: { order: 'asc' },
        include: {
          resources: {
            where: { isActive: true },
            select: {
              id: true,
              title: true,
              type: true,
              accessLevel: true,
            },
          },
        },
      },
    },
  });
}

export default async function CoursePage({ params }: CoursePageProps) {
  const course = await getCourse(params.id);

  if (!course) {
    notFound();
  }

  const totalDuration = course.lessons.reduce(
    (sum, lesson) => sum + (lesson.duration || 0),
    0
  );

  const freePreviewCount = course.lessons.filter((l) => l.isFree).length;

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Course Header */}
        <div className="mb-12">
          {course.coverImage && (
            <div className="mb-8 rounded-xl overflow-hidden">
              <img
                src={course.coverImage}
                alt={course.title}
                className="w-full h-96 object-cover"
              />
            </div>
          )}
          
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-4">
              <Badge variant="default" className="text-base px-4 py-1">
                {course.level}
              </Badge>
              {course.isFeatured && (
                <Badge variant="success" className="text-base px-4 py-1">
                  精品课程
                </Badge>
              )}
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {course.title}
            </h1>
            
            {course.subtitle && (
              <p className="text-xl text-gray-600 mb-6">
                {course.subtitle}
              </p>
            )}

            <div className="flex flex-wrap gap-6 text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                <span>{course.lessons.length} 课节</span>
              </div>
              {totalDuration > 0 && (
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>总时长 {formatDuration(totalDuration)}</span>
                </div>
              )}
              {freePreviewCount > 0 && (
                <div className="flex items-center gap-2">
                  <PlayCircle className="h-5 w-5" />
                  <span>{freePreviewCount} 节免费试听</span>
                </div>
              )}
            </div>

            {course.description && (
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {course.description}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Course Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lessons List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">课程内容</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {course.lessons.map((lesson, index) => (
                    <div
                      key={lesson.id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-brand-300 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-sm font-semibold text-gray-500">
                              第 {index + 1} 节
                            </span>
                            {lesson.isFree ? (
                              <Badge variant="success" className="text-xs">
                                免费试听
                              </Badge>
                            ) : (
                              <Lock className="h-4 w-4 text-gray-400" />
                            )}
                          </div>
                          <h3 className="font-semibold text-gray-900 mb-2">
                            {lesson.title}
                          </h3>
                          {lesson.description && (
                            <p className="text-sm text-gray-600 mb-2">
                              {lesson.description}
                            </p>
                          )}
                          {lesson.resources.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {lesson.resources.map((resource) => (
                                <Badge key={resource.id} variant="secondary" className="text-xs">
                                  {resource.type}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                        {lesson.duration && (
                          <div className="text-sm text-gray-500 ml-4">
                            {formatDuration(lesson.duration)}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>开始学习</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                  登录教师端即可访问完整课程内容和教学资源
                </p>
                <Link href="/teacher/login">
                  <Button className="w-full" size="lg">
                    教师端登录
                  </Button>
                </Link>
                <Link href="/cooperation">
                  <Button variant="outline" className="w-full">
                    申请合作
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
