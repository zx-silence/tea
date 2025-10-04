import { prisma } from '@/lib/prisma';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Video, Headphones, Download, Eye } from 'lucide-react';
import { formatFileSize } from '@/lib/utils';

async function getResources() {
  return prisma.resource.findMany({
    where: {
      isActive: true,
      accessLevel: {
        in: ['PUBLIC', 'AUTHENTICATED', 'SCHOOL_ONLY'],
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      lesson: {
        select: {
          title: true,
          course: {
            select: {
              title: true,
            },
          },
        },
      },
    },
    take: 100,
  });
}

const resourceIcons = {
  VIDEO: Video,
  AUDIO: Headphones,
  DOCUMENT: FileText,
  IMAGE: FileText,
  COURSE_MATERIAL: FileText,
};

export default async function TeacherResourcesPage() {
  const resources = await getResources();

  const groupedByType = resources.reduce((acc, resource) => {
    if (!acc[resource.type]) {
      acc[resource.type] = [];
    }
    acc[resource.type].push(resource);
    return acc;
  }, {} as Record<string, typeof resources>);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          教学资源
        </h1>
        <p className="text-gray-600">
          访问和下载所有教学相关的资源文件
        </p>
      </div>

      <div className="space-y-8">
        {Object.entries(groupedByType).map(([type, items]) => {
          const Icon = resourceIcons[type as keyof typeof resourceIcons];

          return (
            <section key={type}>
              <div className="flex items-center gap-3 mb-4">
                <Icon className="h-6 w-6 text-brand-600" />
                <h2 className="text-2xl font-bold text-gray-900">
                  {type === 'VIDEO' && '视频资源'}
                  {type === 'AUDIO' && '音频资源'}
                  {type === 'DOCUMENT' && '文档资料'}
                  {type === 'IMAGE' && '图片素材'}
                  {type === 'COURSE_MATERIAL' && '课程资料'}
                </h2>
                <Badge variant="secondary">{items.length}</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((resource) => (
                  <Card key={resource.id}>
                    <CardHeader>
                      <CardTitle className="text-base line-clamp-2">
                        {resource.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {resource.description && (
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {resource.description}
                        </p>
                      )}

                      {resource.lesson && (
                        <p className="text-xs text-gray-500 mb-3">
                          所属课程：{resource.lesson.course.title} - {resource.lesson.title}
                        </p>
                      )}

                      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                        {resource.fileSize && (
                          <span>{formatFileSize(resource.fileSize)}</span>
                        )}
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {resource.viewCount}
                          </span>
                          <span className="flex items-center gap-1">
                            <Download className="h-3 w-3" />
                            {resource.downloadCount}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-2">
                        <Badge
                          variant={
                            resource.accessLevel === 'PUBLIC'
                              ? 'success'
                              : 'default'
                          }
                          className="text-xs"
                        >
                          {resource.accessLevel === 'PUBLIC' && '公开'}
                          {resource.accessLevel === 'AUTHENTICATED' && '认证'}
                          {resource.accessLevel === 'SCHOOL_ONLY' && '学校'}
                          {resource.accessLevel === 'PREMIUM' && '高级'}
                        </Badge>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-1" />
                          下载
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {resources.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">暂无可用资源</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
