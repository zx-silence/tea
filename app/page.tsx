import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users, Award, Heart } from 'lucide-react';

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-50 to-green-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              中国少年茶人
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-4">
              传承中华茶文化，培养新时代少年茶人
            </p>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              专业的茶文化教育课程体系，助力学校开展特色德育实践
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/courses">
                <Button size="lg" className="w-full sm:w-auto">
                  探索课程
                </Button>
              </Link>
              <Link href="/cooperation">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  申请合作
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              项目特色
            </h2>
            <p className="text-lg text-gray-600">
              系统化的茶文化教育解决方案
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardHeader>
                <BookOpen className="h-12 w-12 text-brand-600 mb-4" />
                <CardTitle className="text-xl">完整课程体系</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  从基础到进阶，覆盖茶文化知识、茶艺技能、礼仪修养等多个维度
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-12 w-12 text-brand-600 mb-4" />
                <CardTitle className="text-xl">专业师资培训</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  提供系统的教师培训与持续支持，确保教学质量
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Award className="h-12 w-12 text-brand-600 mb-4" />
                <CardTitle className="text-xl">权威认证体系</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  完善的考核评价机制，颁发官方认证证书
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Heart className="h-12 w-12 text-brand-600 mb-4" />
                <CardTitle className="text-xl">公益教育理念</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  以教育公益为核心，推动传统文化教育普及
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-brand-700 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-brand-100">合作学校</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">2000+</div>
              <div className="text-brand-100">认证教师</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50000+</div>
              <div className="text-brand-100">受益学生</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100+</div>
              <div className="text-brand-100">优秀案例</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-brand-600 to-tea-dark rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              开启茶文化教育之旅
            </h2>
            <p className="text-lg mb-8 text-brand-50">
              加入我们，让传统文化在校园绽放新的光彩
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/cooperation">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white text-brand-700 hover:bg-brand-50">
                  立即申请合作
                </Button>
              </Link>
              <Link href="/teacher/login">
                <Button size="lg" variant="ghost" className="w-full sm:w-auto text-white border-white hover:bg-white/10">
                  教师端登录
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
