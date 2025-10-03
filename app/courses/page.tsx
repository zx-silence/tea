import { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, BookOpen, Star } from 'lucide-react';
import { formatDuration } from '@/lib/utils';

export const metadata: Metadata = {
  title: '课程体系 - 中国少年茶人',
  description: '浏览完整的茶文化教育课程体系，从基础到进阶，系统学习茶文化知识与技能',
};

export const revalidate = 3600; // ISR: revalidate every hour

async function getCourses() {
  return prisma.course.findMany({
    where: { isPublished: true },
    orderBy: [
      { isFeatured: 'desc' },
      { order: 'asc' },
    ],
    include: {
      lessons: {
        where: { isPublished: true },
        select: {
          id: true,
          duration: true,
        },
      },
    },
  });
}

export default async function CoursesPage() {
  const courses = await getCourses();

  const levels = ['基础', '进阶', '高级'];

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            课程体系
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            系统化的茶文化教育课程，循序渐进，因材施教
          </p>
        </div>

        {/* Level Tabs */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {levels.map((level) => (
            <Badge key={level} variant="default" className="text-base px-6 py-2 cursor-pointer">
              {level}课程
            </Badge>
          ))}
        </div>

        {/* Course Grid */}
        {courses.length === 0 ? (
          <div className="text-center py-16">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">暂无课程，敬请期待</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => {
              const totalDuration = course.lessons.reduce(
                (sum, lesson) => sum + (lesson.duration || 0),
                0
              );

              return (
                <Card key={course.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    {course.coverImage && (
                      <div className="mb-4 -mx-6 -mt-6">
                        <img
                          src={course.coverImage}
                          alt={course.title}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                      </div>
                    )}
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">
                          {course.title}
                        </CardTitle>
                        {course.subtitle && (
                          <CardDescription>{course.subtitle}</CardDescription>
                        )}
                      </div>
                      {course.isFeatured && (
                        <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <Badge variant="secondary">{course.level}</Badge>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        <span>{course.lessons.length} 课节</span>
                      </div>
                      {totalDuration > 0 && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{formatDuration(totalDuration)}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {course.description}
                    </p>
                    <Link href={`/courses/${course.id}`}>
                      <Button className="w-full">查看详情</Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
