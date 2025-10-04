import { prisma } from '@/lib/prisma';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Clock, PlayCircle } from 'lucide-react';
import { formatDuration } from '@/lib/utils';

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

export default async function TeacherCoursesPage() {
  const courses = await getCourses();

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          课程管理
        </h1>
        <p className="text-gray-600">
          浏览和管理所有可用的茶文化课程
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                      className="w-full h-40 object-cover rounded-t-lg"
                    />
                  </div>
                )}
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  {course.isFeatured && (
                    <Badge variant="success" className="text-xs">精品</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {course.description}
                </p>

                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <Badge variant="secondary">{course.level}</Badge>
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    <span>{course.lessons.length}课节</span>
                  </div>
                  {totalDuration > 0 && (
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{formatDuration(totalDuration)}</span>
                    </div>
                  )}
                </div>

                <Button className="w-full" size="sm">
                  <PlayCircle className="h-4 w-4 mr-2" />
                  开始教学
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
