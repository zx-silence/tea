import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Calendar } from 'lucide-react';
import { formatDate } from '@/lib/utils';

async function getClasses(schoolId: string) {
  return prisma.class.findMany({
    where: { schoolId },
    orderBy: { createdAt: 'desc' },
    include: {
      teachers: {
        include: {
          teacher: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      },
      _count: {
        select: {
          studyRecords: true,
        },
      },
    },
  });
}

export default async function TeacherClassesPage() {
  const session = await getSession();
  
  if (!session) {
    return null;
  }

  const classes = await getClasses(session.schoolId);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          班级管理
        </h1>
        <p className="text-gray-600">
          管理和查看所有班级信息
        </p>
      </div>

      {classes.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">暂无班级</p>
            <p className="text-gray-500 text-sm mt-2">请联系管理员创建班级</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((cls) => (
            <Card key={cls.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xl">{cls.name}</CardTitle>
                  <Badge variant={cls.isActive ? 'success' : 'secondary'}>
                    {cls.isActive ? '进行中' : '已结束'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">
                      {cls.grade} · {cls.studentCount} 名学生
                    </span>
                  </div>

                  {cls.startDate && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">
                        开始时间：{formatDate(cls.startDate)}
                      </span>
                    </div>
                  )}

                  <div className="pt-3 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-2">授课教师：</p>
                    <div className="space-y-1">
                      {cls.teachers.map((ct) => (
                        <div key={ct.id} className="flex items-center gap-2">
                          <span className="text-sm">
                            {ct.teacher.name}
                          </span>
                          {ct.isPrimary && (
                            <Badge variant="default" className="text-xs">主教师</Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {cls._count.studyRecords > 0 && (
                    <div className="pt-3 border-t border-gray-200">
                      <p className="text-sm text-gray-600">
                        学习记录：{cls._count.studyRecords} 条
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
