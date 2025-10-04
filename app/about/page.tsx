import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Award, Users, Heart, Target, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: '项目介绍 - 中国少年茶人',
  description: '了解中国少年茶人项目的背景、理念、课程体系和公益机制',
};

export default function AboutPage() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            项目介绍
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            中国少年茶人致力于传承和弘扬中华优秀传统文化，通过系统化的茶文化教育，培养具有文化自信的新时代少年
          </p>
        </div>

        {/* Brand Story */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-brand-50 to-green-50 rounded-2xl p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="h-8 w-8 text-brand-600" />
              <h2 className="text-3xl font-bold text-gray-900">品牌故事</h2>
            </div>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                中国少年茶人项目启动于2018年，是响应国家&ldquo;传承中华优秀传统文化&rdquo;号召而创立的教育公益项目。
                我们深信，茶文化作为中华文化的重要组成部分，不仅承载着数千年的智慧结晶，
                更是培养青少年文化自信、道德修养和审美情趣的重要载体。
              </p>
              <p className="text-gray-700 leading-relaxed">
                五年来，项目已覆盖全国20多个省市，与500余所学校建立合作关系，
                培养认证教师2000余名，惠及学生超过5万人。我们将继续秉承&ldquo;以茶育人、以文化人&rdquo;的理念，
                让更多青少年感受传统文化的魅力。
              </p>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            核心价值
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Target className="h-12 w-12 text-brand-600 mb-4" />
                <CardTitle>教育使命</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  通过茶文化教育培养学生的文化认同、道德修养、审美情趣和实践能力，
                  助力学校落实立德树人根本任务
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Heart className="h-12 w-12 text-brand-600 mb-4" />
                <CardTitle>公益理念</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  坚持教育公益属性，以可持续的公益模式推动传统文化教育普及，
                  让更多学校和学生受益
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-12 w-12 text-brand-600 mb-4" />
                <CardTitle>专业保障</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  汇聚茶文化、教育学、心理学等领域专家，构建科学完善的课程体系和评价标准
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Course System */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            课程体系
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <BookOpen className="h-10 w-10 text-brand-600 mb-4" />
                <CardTitle className="text-2xl">基础课程</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">茶文化启蒙</h4>
                  <p className="text-gray-600">了解茶的起源、分类、历史与文化内涵</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">茶艺基础</h4>
                  <p className="text-gray-600">学习基本的泡茶技能和茶具使用方法</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">茶礼茶德</h4>
                  <p className="text-gray-600">培养尊师重道、待人接物的礼仪修养</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Award className="h-10 w-10 text-brand-600 mb-4" />
                <CardTitle className="text-2xl">进阶课程</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">六大茶类专题</h4>
                  <p className="text-gray-600">深入学习绿茶、红茶、乌龙茶等茶类特点</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">茶艺表演</h4>
                  <p className="text-gray-600">掌握规范的茶艺展示和讲解能力</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">茶文化传播</h4>
                  <p className="text-gray-600">培养文化传承与创新表达能力</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Media & Recognition */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            媒体报道与权威认可
          </h2>
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">媒体报道</h3>
                <ul className="space-y-3 text-gray-600">
                  <li>• 人民日报：传统文化进校园的创新实践</li>
                  <li>• 新华社：少年茶人培养计划成效显著</li>
                  <li>• 中国教育报：以茶育人的德育新路径</li>
                  <li>• CCTV：传承茶文化 培育新时代少年</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">权威认证</h3>
                <ul className="space-y-3 text-gray-600">
                  <li>• 教育部传统文化教育示范项目</li>
                  <li>• 中国茶叶学会战略合作伙伴</li>
                  <li>• 全国青少年茶文化教育基地</li>
                  <li>• 国家级非遗传承推广单位</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Public Benefit */}
        <section id="public-benefit" className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            公益机制
          </h2>
          <div className="bg-gradient-to-br from-green-50 to-brand-50 rounded-2xl p-8 md:p-12">
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                中国少年茶人秉持&ldquo;让每个孩子都能接受优质传统文化教育&rdquo;的愿景，
                建立了可持续的公益运营模式：
              </p>
              <div className="space-y-4 text-gray-700">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center font-semibold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">免费师资培训</h4>
                    <p>为合作学校提供系统的教师培训，无需额外费用</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center font-semibold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">公益资源共享</h4>
                    <p>核心教学资源向所有合作学校开放，确保教学质量</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center font-semibold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">帮扶计划</h4>
                    <p>重点支持乡村学校和欠发达地区，缩小教育差距</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center font-semibold">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">透明运营</h4>
                    <p>定期公示项目进展和资金使用情况，接受社会监督</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
