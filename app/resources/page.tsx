import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Video, Headphones, Image as ImageIcon, Download, Eye } from 'lucide-react';
import { formatFileSize } from '@/lib/utils';

export const metadata: Metadata = {
  title: '教学资源 - 中国少年茶人',
  description: '丰富的茶文化教学资源，包括视频、音频、文档等多种形式',
};

export const revalidate = 3600;

async function getPublicResources() {
  return prisma.resource.findMany({
    where: {
      isActive: true,
      accessLevel: 'PUBLIC',
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 50,
  });
}

const resourceIcons = {
  VIDEO: Video,
  AUDIO: Headphones,
  DOCUMENT: FileText,
  IMAGE: ImageIcon,
  COURSE_MATERIAL: FileText,
};

const resourceColors = {
  VIDEO: 'text-blue-600',
  AUDIO: 'text-purple-600',
  DOCUMENT: 'text-green-600',
  IMAGE: 'text-pink-600',
  COURSE_MATERIAL: 'text-orange-600',
};

export default async function ResourcesPage() {
  const resources = await getPublicResources();

  const groupedResources = resources.reduce((acc, resource) => {
    if (!acc[resource.type]) {
      acc[resource.type] = [];
    }
    acc[resource.type].push(resource);
    return acc;
  }, {} as Record<string, typeof resources>);

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            教学资源
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            精心策划的教学资源，支持多样化的茶文化教育实践
          </p>
        </div>

        {/* Info Card */}
        <Card className="mb-12 bg-brand-50 border-brand-200">
          <CardContent className="p-6">
            <p className="text-center text-gray-700">
              以下为公开资源。登录教师端可访问完整的教学资源库，包括课程配套材料、教学指南等
            </p>
          </CardContent>
        </Card>

        {/* Resources by Type */}
        {Object.entries(groupedResources).map(([type, items]) => {
          const Icon = resourceIcons[type as keyof typeof resourceIcons];
          const colorClass = resourceColors[type as keyof typeof resourceColors];

          return (
            <section key={type} className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Icon className={`h-8 w-8 ${colorClass}`} />
                <h2 className="text-2xl font-bold text-gray-900">
                  {type === 'VIDEO' && '视频资源'}
                  {type === 'AUDIO' && '音频资源'}
                  {type === 'DOCUMENT' && '文档资料'}
                  {type === 'IMAGE' && '图片素材'}
                  {type === 'COURSE_MATERIAL' && '课程资料'}
                </h2>
                <Badge variant="secondary">{items.length}</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((resource) => (
                  <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg line-clamp-2">
                          {resource.title}
                        </CardTitle>
                        <Icon className={`h-5 w-5 flex-shrink-0 ml-2 ${colorClass}`} />
                      </div>
                    </CardHeader>
                    <CardContent>
                      {resource.description && (
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                          {resource.description}
                        </p>
                      )}
                      
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
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

                      <Badge variant="default" className="text-xs">
                        公开资源
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          );
        })}

        {resources.length === 0 && (
          <div className="text-center py-16">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">暂无公开资源</p>
          </div>
        )}
      </div>
    </div>
  );
}
