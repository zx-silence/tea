import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Users, Award, TrendingUp } from 'lucide-react';

async function getDashboardData(teacherId: string, schoolId: string) {
  const [teacher, classes, courses, studyRecords] = await Promise.all([
    prisma.teacher.findUnique({
      where: { id: teacherId },
      include: {
        school: true,
      },
    }),
    prisma.class.findMany({
      where: { schoolId },
      include: {
        teachers: {
          where: { teacherId },
        },
      },
    }),
    prisma.course.findMany({
      where: { isPublished: true },
      take: 5,
    }),
    prisma.studyRecord.findMany({
      where: { teacherId },
      include: {
        course: true,
        class: true,
      },
      orderBy: { updatedAt: 'desc' },
      take: 10,
    }),
  ]);

  return { teacher, classes, courses, studyRecords };
}

export default async function TeacherDashboardPage() {
  const session = await getSession();
  
  if (!session) {
    return null;
  }

  const { teacher, classes, courses, studyRecords } = await getDashboardData(
    session.userId,
    session.schoolId
  );

  const stats = {
    totalClasses: classes.length,
    totalCourses: courses.length,
    inProgressCourses: studyRecords.filter(r => r.progress > 0 && r.progress < 100).length,
    completedCourses: studyRecords.filter(r => r.progress === 100).length,
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          欢迎回来，{teacher?.name}老师
        </h1>
        <p className="text-gray-600">
          {teacher?.school.name}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              我的班级
            </CardTitle>
            <Users className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalClasses}</div>
            <p className="text-xs text-gray-600 mt-1">管理中的班级数量</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              课程总数
            </CardTitle>
            <BookOpen className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCourses}</div>
            <p className="text-xs text-gray-600 mt-1">可用的课程资源</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              进行中
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.inProgressCourses}</div>
            <p className="text-xs text-gray-600 mt-1">正在学习的课程</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              已完成
            </CardTitle>
            <Award className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedCourses}</div>
            <p className="text-xs text-gray-600 mt-1">已完成的课程</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* My Classes */}
        <Card>
          <CardHeader>
            <CardTitle>我的班级</CardTitle>
            <CardDescription>管理中的班级列表</CardDescription>
          </CardHeader>
          <CardContent>
            {classes.length === 0 ? (
              <p className="text-gray-500 text-sm">暂无班级</p>
            ) : (
              <div className="space-y-3">
                {classes.map((cls) => (
                  <div
                    key={cls.id}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-brand-300 transition-colors"
                  >
                    <div>
                      <h4 className="font-medium text-gray-900">{cls.name}</h4>
                      <p className="text-sm text-gray-600">
                        {cls.grade} · {cls.studentCount} 名学生
                      </p>
                    </div>
                    <Badge variant={cls.isActive ? 'success' : 'secondary'}>
                      {cls.isActive ? '进行中' : '已结束'}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Study Records */}
        <Card>
          <CardHeader>
            <CardTitle>最近学习记录</CardTitle>
            <CardDescription>最新的教学进度</CardDescription>
          </CardHeader>
          <CardContent>
            {studyRecords.length === 0 ? (
              <p className="text-gray-500 text-sm">暂无学习记录</p>
            ) : (
              <div className="space-y-3">
                {studyRecords.slice(0, 5).map((record) => (
                  <div
                    key={record.id}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">
                        {record.course.title}
                      </h4>
                      <p className="text-xs text-gray-600">
                        {record.class.name}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-brand-600">
                        {record.progress}%
                      </div>
                      <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className="bg-brand-600 h-2 rounded-full"
                          style={{ width: `${record.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>快速操作</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/teacher/courses"
              className="p-4 border border-gray-200 rounded-lg hover:border-brand-300 hover:bg-brand-50 transition-colors text-center"
            >
              <BookOpen className="h-8 w-8 text-brand-600 mx-auto mb-2" />
              <h4 className="font-medium text-gray-900">浏览课程</h4>
              <p className="text-sm text-gray-600 mt-1">查看可用课程资源</p>
            </a>
            <a
              href="/teacher/classes"
              className="p-4 border border-gray-200 rounded-lg hover:border-brand-300 hover:bg-brand-50 transition-colors text-center"
            >
              <Users className="h-8 w-8 text-brand-600 mx-auto mb-2" />
              <h4 className="font-medium text-gray-900">管理班级</h4>
              <p className="text-sm text-gray-600 mt-1">查看和管理班级信息</p>
            </a>
            <a
              href="/teacher/resources"
              className="p-4 border border-gray-200 rounded-lg hover:border-brand-300 hover:bg-brand-50 transition-colors text-center"
            >
              <Award className="h-8 w-8 text-brand-600 mx-auto mb-2" />
              <h4 className="font-medium text-gray-900">教学资源</h4>
              <p className="text-sm text-gray-600 mt-1">下载和使用教学资源</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
