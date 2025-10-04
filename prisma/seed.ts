import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Create demo school
  const school = await prisma.school.upsert({
    where: { code: 'DEMO001' },
    update: {},
    create: {
      name: '示范小学',
      code: 'DEMO001',
      province: '浙江',
      city: '杭州',
      district: '西湖区',
      address: '西湖区文一路100号',
      contactPerson: '张主任',
      contactPhone: '13800138000',
      contactEmail: 'contact@demo.school',
      description: '这是一所示范学校，用于演示中国少年茶人项目',
      isActive: true,
    },
  });

  console.log('Created school:', school.name);

  // Create demo teacher
  const hashedPassword = await bcrypt.hash('password123', 10);
  const teacher = await prisma.teacher.upsert({
    where: { email: 'teacher@demo.com' },
    update: {},
    create: {
      schoolId: school.id,
      email: 'teacher@demo.com',
      phone: '13900139000',
      password: hashedPassword,
      name: '李老师',
      role: 'TEACHER',
      title: '德育主任',
      department: '德育处',
      isActive: true,
    },
  });

  console.log('Created teacher:', teacher.name);

  // Create demo classes
  const class1 = await prisma.class.create({
    data: {
      schoolId: school.id,
      name: '四年级一班',
      grade: '四年级',
      studentCount: 35,
      startDate: new Date('2024-09-01'),
      isActive: true,
    },
  });

  await prisma.classTeacher.create({
    data: {
      classId: class1.id,
      teacherId: teacher.id,
      isPrimary: true,
    },
  });

  console.log('Created class:', class1.name);

  // Create demo courses
  const course1 = await prisma.course.create({
    data: {
      title: '茶文化启蒙',
      subtitle: '探索中国茶文化的奥秘',
      description: '通过生动有趣的方式，引导学生了解茶的起源、分类、历史文化，培养对传统文化的兴趣。',
      level: '基础',
      duration: 240,
      order: 1,
      isPublished: true,
      isFeatured: true,
      lessons: {
        create: [
          {
            title: '茶的起源与传说',
            description: '了解茶的起源故事和历史传说',
            duration: 1200,
            order: 1,
            isFree: true,
            isPublished: true,
          },
          {
            title: '认识六大茶类',
            description: '学习绿茶、红茶、乌龙茶等六大茶类的基本特征',
            duration: 1800,
            order: 2,
            isFree: true,
            isPublished: true,
          },
          {
            title: '茶具的认识与使用',
            description: '认识常见茶具及其使用方法',
            duration: 1500,
            order: 3,
            isFree: false,
            isPublished: true,
          },
        ],
      },
    },
  });

  const course2 = await prisma.course.create({
    data: {
      title: '茶艺基础',
      subtitle: '学习基本的茶艺技能',
      description: '系统学习茶艺的基本技能，包括泡茶技法、茶席布置、品茶礼仪等，培养学生的实践能力和审美情趣。',
      level: '基础',
      duration: 360,
      order: 2,
      isPublished: true,
      isFeatured: true,
      lessons: {
        create: [
          {
            title: '泡茶基本技法',
            description: '学习标准的泡茶流程和手法',
            duration: 2400,
            order: 1,
            isFree: false,
            isPublished: true,
          },
          {
            title: '茶席布置与美学',
            description: '了解茶席布置的要点和美学原则',
            duration: 1800,
            order: 2,
            isFree: false,
            isPublished: true,
          },
        ],
      },
    },
  });

  console.log('Created courses:', course1.title, course2.title);

  // Create demo public resources
  await prisma.resource.createMany({
    data: [
      {
        title: '茶文化教育宣传片',
        description: '介绍中国少年茶人项目的宣传视频',
        type: 'VIDEO',
        fileUrl: 'videos/intro.mp4',
        fileSize: 52428800,
        duration: 180,
        accessLevel: 'PUBLIC',
        isActive: true,
      },
      {
        title: '茶文化基础知识手册',
        description: 'PDF格式的茶文化入门手册',
        type: 'DOCUMENT',
        fileUrl: 'documents/tea-basics.pdf',
        fileSize: 5242880,
        accessLevel: 'PUBLIC',
        isActive: true,
      },
    ],
  });

  console.log('Created public resources');

  // Create demo achievement
  await prisma.achievement.create({
    data: {
      schoolId: school.id,
      title: '首届校园茶艺展演圆满成功',
      description: '我校成功举办首届少年茶人茶艺展演活动，40余名学生参与演出，展示了扎实的茶艺功底和良好的精神风貌。',
      category: '活动展示',
      date: new Date('2024-06-15'),
      isPublished: true,
    },
  });

  console.log('Created achievement');

  // Create public benefit project
  const project = await prisma.publicBenefitProject.create({
    data: {
      name: '2024年度茶文化教育公益计划',
      description: '推动茶文化教育在全国中小学的普及',
      startDate: new Date('2024-01-01'),
      targetAmount: 1000000,
      currentAmount: 450000,
      isActive: true,
    },
  });

  await prisma.publicBenefitProgress.create({
    data: {
      projectId: project.id,
      schoolId: school.id,
      amount: 5000,
      description: '开展茶文化系列课程，惠及200名学生',
      reportedAt: new Date(),
    },
  });

  console.log('Created public benefit project');

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
