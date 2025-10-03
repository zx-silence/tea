import { prisma } from './prisma';

export interface AuditLogData {
  teacherId?: string;
  action: string;
  entity: string;
  entityId?: string;
  details?: string;
  ipAddress?: string;
  userAgent?: string;
}

export async function createAuditLog(data: AuditLogData) {
  return prisma.auditLog.create({
    data,
  });
}

export async function logAction(
  action: string,
  entity: string,
  entityId: string,
  teacherId?: string,
  details?: string
) {
  return createAuditLog({
    teacherId,
    action,
    entity,
    entityId,
    details,
  });
}
