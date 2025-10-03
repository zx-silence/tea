import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';
import { Award, Calendar, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: '学校成果 - 中国少年茶人',
  description: '展示全国各地学校的茶文化教育实践成果',
};

export const revalidate = 1800; // ISR: revalidate every 30 minutes

async function getAchievements() {
  return prisma.achievement.findMany({
    where: {
      isPublished: true,
    },
    orderBy: {
      date: 'desc',
    },
    include: {
      school: {
        select: {
          name: true,
          city: true,
          province: true,
        },
      },
    },
    take: 50,
  });
}

export default async function AchievementsPage() {
  const achievements = await getAchievements();

  const categories = [...new Set(achievements.map((a) => a.category))];

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            学校成果展示
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            全国各地学校茶文化教育的精彩实践与优秀成果
          </p>
        </div>

        {/* Category Filter */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            <Badge variant="default" className="cursor-pointer px-4 py-2">
              全部
            </Badge>
            {categories.map((category) => (
              <Badge
                key={category}
                variant="secondary"
                className="cursor-pointer px-4 py-2"
              >
                {category}
              </Badge>
            ))}
          </div>
        )}

        {/* Achievements Grid */}
        {achievements.length === 0 ? (
          <div className="text-center py-16">
            <Award className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">暂无成果展示</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {achievements.map((achievement) => (
              <Card
                key={achievement.id}
                className="hover:shadow-lg transition-shadow overflow-hidden"
              >
                {achievement.imageUrl && (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={achievement.imageUrl}
                      alt={achievement.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <CardTitle className="text-lg line-clamp-2">
                      {achievement.title}
                    </CardTitle>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="default" className="text-xs">
                      {achievement.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {achievement.description && (
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                      {achievement.description}
                    </p>
                  )}
                  
                  <div className="space-y-2 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>
                        {achievement.school.province} {achievement.school.city} · {achievement.school.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(achievement.date)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Stats Section */}
        <section className="mt-16 bg-gradient-to-br from-brand-50 to-green-50 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            项目数据概览
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-brand-700 mb-2">500+</div>
              <div className="text-gray-600">合作学校</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-brand-700 mb-2">2000+</div>
              <div className="text-gray-600">认证教师</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-brand-700 mb-2">50000+</div>
              <div className="text-gray-600">受益学生</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-brand-700 mb-2">100+</div>
              <div className="text-gray-600">优秀案例</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
