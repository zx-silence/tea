'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

const cooperationSchema = z.object({
  schoolName: z.string().min(2, '请输入学校名称'),
  contactPerson: z.string().min(2, '请输入联系人姓名'),
  contactPhone: z.string().regex(/^1[3-9]\d{9}$/, '请输入有效的手机号码'),
  contactEmail: z.string().email('请输入有效的邮箱地址'),
  position: z.string().optional(),
  province: z.string().min(1, '请选择省份'),
  city: z.string().min(1, '请输入城市'),
  district: z.string().optional(),
  studentCount: z.coerce.number().int().positive().optional(),
  message: z.string().optional(),
});

type CooperationForm = z.infer<typeof cooperationSchema>;

const provinces = [
  '北京', '上海', '天津', '重庆',
  '河北', '山西', '辽宁', '吉林', '黑龙江',
  '江苏', '浙江', '安徽', '福建', '江西', '山东',
  '河南', '湖北', '湖南', '广东', '海南',
  '四川', '贵州', '云南', '陕西', '甘肃',
  '青海', '台湾', '内蒙古', '广西', '西藏',
  '宁夏', '新疆', '香港', '澳门',
];

export default function CooperationPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CooperationForm>({
    resolver: zodResolver(cooperationSchema),
  });

  const onSubmit = async (data: CooperationForm) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/cooperation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('提交失败');
      }

      setIsSubmitted(true);
      reset();
    } catch (error) {
      console.error('Submit error:', error);
      alert('提交失败，请稍后重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="py-12">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="pt-12 pb-12 text-center">
              <CheckCircle2 className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                提交成功！
              </h2>
              <p className="text-gray-600 mb-6">
                感谢您的申请。我们已收到您的合作意向，将在3个工作日内与您联系。
              </p>
              <Button onClick={() => setIsSubmitted(false)}>
                提交新的申请
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            合作申请
          </h1>
          <p className="text-xl text-gray-600">
            加入中国少年茶人项目，开启茶文化教育之旅
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">免费师资培训</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                系统的教师培训与持续支持，确保教学质量
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">完整课程体系</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                从基础到进阶的完整课程和教学资源
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">权威认证证书</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                学员可获得官方认证的少年茶人证书
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Application Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">申请表单</CardTitle>
            <CardDescription>
              请填写以下信息，我们将尽快与您联系
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="schoolName">学校名称 *</Label>
                  <Input
                    id="schoolName"
                    {...register('schoolName')}
                    placeholder="请输入学校全称"
                  />
                  {errors.schoolName && (
                    <p className="text-sm text-red-600">{errors.schoolName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactPerson">联系人姓名 *</Label>
                  <Input
                    id="contactPerson"
                    {...register('contactPerson')}
                    placeholder="请输入您的姓名"
                  />
                  {errors.contactPerson && (
                    <p className="text-sm text-red-600">{errors.contactPerson.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactPhone">联系电话 *</Label>
                  <Input
                    id="contactPhone"
                    {...register('contactPhone')}
                    placeholder="请输入手机号码"
                  />
                  {errors.contactPhone && (
                    <p className="text-sm text-red-600">{errors.contactPhone.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactEmail">电子邮箱 *</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    {...register('contactEmail')}
                    placeholder="请输入邮箱地址"
                  />
                  {errors.contactEmail && (
                    <p className="text-sm text-red-600">{errors.contactEmail.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position">职务</Label>
                  <Input
                    id="position"
                    {...register('position')}
                    placeholder="如：德育主任、校长等"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="province">省份 *</Label>
                  <select
                    id="province"
                    {...register('province')}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    <option value="">请选择省份</option>
                    {provinces.map((province) => (
                      <option key={province} value={province}>
                        {province}
                      </option>
                    ))}
                  </select>
                  {errors.province && (
                    <p className="text-sm text-red-600">{errors.province.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">城市 *</Label>
                  <Input
                    id="city"
                    {...register('city')}
                    placeholder="请输入城市"
                  />
                  {errors.city && (
                    <p className="text-sm text-red-600">{errors.city.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="district">区县</Label>
                  <Input
                    id="district"
                    {...register('district')}
                    placeholder="请输入区县（可选）"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="studentCount">学生人数</Label>
                  <Input
                    id="studentCount"
                    type="number"
                    {...register('studentCount')}
                    placeholder="预计参与学生人数"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">留言</Label>
                <textarea
                  id="message"
                  {...register('message')}
                  rows={4}
                  className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                  placeholder="请简要说明您的合作意向或其他需求"
                />
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? '提交中...' : '提交申请'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
