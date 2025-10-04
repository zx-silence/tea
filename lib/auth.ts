import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { prisma } from './prisma';
import bcrypt from 'bcryptjs';
import type { UserRole } from '@prisma/client';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-super-secret-jwt-key'
);

export interface JWTPayload {
  userId: string;
  email: string;
  role: UserRole;
  schoolId: string;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createToken(payload: JWTPayload): Promise<string> {
  return new SignJWT(payload as any)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(process.env.JWT_EXPIRES_IN || '7d')
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as JWTPayload;
  } catch (error) {
    return null;
  }
}

export async function getSession(): Promise<JWTPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  
  if (!token) {
    return null;
  }

  return verifyToken(token);
}

export async function requireAuth(): Promise<JWTPayload> {
  const session = await getSession();
  
  if (!session) {
    throw new Error('Unauthorized');
  }

  return session;
}

export async function checkPermission(
  requiredRoles: UserRole[]
): Promise<boolean> {
  const session = await getSession();
  
  if (!session) {
    return false;
  }

  return requiredRoles.includes(session.role);
}

export async function login(email: string, password: string) {
  const teacher = await prisma.teacher.findUnique({
    where: { email },
    include: { school: true },
  });

  if (!teacher || !teacher.isActive) {
    throw new Error('Invalid credentials');
  }

  const isValid = await verifyPassword(password, teacher.password);
  
  if (!isValid) {
    throw new Error('Invalid credentials');
  }

  // Update last login
  await prisma.teacher.update({
    where: { id: teacher.id },
    data: { lastLoginAt: new Date() },
  });

  const token = await createToken({
    userId: teacher.id,
    email: teacher.email,
    role: teacher.role,
    schoolId: teacher.schoolId,
  });

  return { token, teacher };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('token');
}
