import { prisma } from '../db';
import { Prisma } from '@prisma/client';

export const partService = {
    async getParts(query: string = '') {
        const where: Prisma.PartWhereInput = query
            ? {
                OR: [
                    { brand: { contains: query, mode: 'insensitive' } },
                    { model: { contains: query, mode: 'insensitive' } },
                    { category: { contains: query, mode: 'insensitive' } },
                ],
            }
            : {};

        return prisma.part.findMany({
            where,
            orderBy: { category: 'asc' },
        });
    },

    async getPartById(id: number) {
        return prisma.part.findUnique({
            where: { id },
        });
    },

    async createPart(data: Prisma.PartCreateInput) {
        return prisma.part.create({
            data,
        });
    },
};
