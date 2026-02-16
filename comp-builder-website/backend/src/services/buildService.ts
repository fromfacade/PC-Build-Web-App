import { prisma } from '../db';
import { partService } from './partService';
import { checkCompatibility } from '../compat';
import { calculateSystemWattage } from './wattage';
import { PartWithSpecs } from '../types';

interface CreateBuildDto {
    name: string;
    components: Record<string, number>; // category -> partId
}

export const buildService = {
    async getBuildById(id: number) {
        return prisma.build.findUnique({
            where: { id },
        });
    },

    async createBuild(data: CreateBuildDto) {
        const { name, components } = data;
        const loadedParts: Record<string, PartWithSpecs> = {};
        let totalPrice = 0;

        // 1. Fetch all parts
        for (const [category, id] of Object.entries(components)) {
            const part = await partService.getPartById(id);
            if (part) {
                loadedParts[category] = part as unknown as PartWithSpecs;
                totalPrice += Number(part.price);
            }
        }

        // 2. Run Compatibility Logic
        const compatibility = checkCompatibility(loadedParts);

        // 3. Calculate Wattage (optional to store, but good to know)
        // const wattage = calculateSystemWattage(loadedParts);

        // 4. Save Build
        return prisma.build.create({
            data: {
                name,
                components: components,
                compatibility: compatibility as any, // Cast to JSON
                totalPrice: totalPrice,
            },
        });
    },
};
