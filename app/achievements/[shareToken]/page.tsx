import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';
import { MapPin, Calendar, Award } from 'lucide-react';

interface SharePageProps {
  params: {
    shareToken: string;
  };
}

export async function generateMetadata({ params }: SharePageProps): Promise<Metadata> {
  const achievement = await prisma.achievement.findUnique({
    where: { shareToken: params.shareToken },
    select: { title: true, description: true },
  });

  if (!achievement) {
    return {
      title: '成果未找到',
    };
  }

  return {
    title: `${achievement.title} - 中国少年茶人`,
    description: achievement.description || achievement.title,
  };
}

async function getAchievement(shareToken: string) {
  const achievement = await prisma.achievement.findUnique({
    where: { shareToken, isPublished: true },
    include: {
      school: {
        select: {
          name: true,
          province: true,
          city: true,
        },
      },
    },
  });

  if (achievement) {
    // Increment view count
    await prisma.achievement.update({
      where: { id: achievement.id },
      data: { viewCount: { increment: 1 } },
    });
  }

  return achievement;
}

export default async function AchievementSharePage({ params }: SharePageProps) {
  const achievement = await getAchievement(params.shareToken);

  if (!achievement) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2 text-brand-600 mb-4">
              <Award className="h-6 w-6" />
              <span className="text-sm font-semibold">学校成果分享</span>
            </div>
            <CardTitle className="text-3xl">{achievement.title}</CardTitle>
          </CardHeader>
          <CardContent>
            {achievement.imageUrl && (
              <div className="mb-6 rounded-lg overflow-hidden">
                <img
                  src={achievement.imageUrl}
                  alt={achievement.title}
                  className="w-full h-auto"
                />
              </div>
            )}

            <div className="flex flex-wrap gap-4 text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>
                  {achievement.school.province} {achievement.school.city} · {achievement.school.name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>{formatDate(achievement.date)}</span>
              </div>
            </div>

            {achievement.description && (
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {achievement.description}
                </p>
              </div>
            )}

            <div className="mt-8 pt-8 border-t border-gray-200 text-center">
              <p className="text-gray-600 mb-4">
                了解更多关于中国少年茶人项目
              </p>
              <a
                href="/"
                className="inline-block rounded-md bg-brand-600 px-6 py-3 text-white hover:bg-brand-700 transition-colors"
              >
                访问官网
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
