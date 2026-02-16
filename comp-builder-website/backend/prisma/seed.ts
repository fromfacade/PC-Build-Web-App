import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding database...');

    // 1. CPU
    const cpu = await prisma.part.create({
        data: {
            brand: 'Intel',
            model: 'Core i5-12600K',
            category: 'cpu',
            price: 299.99,
            specs: {
                socket: 'LGA1700',
                tdp: 125,
                cores: 10,
                threads: 16,
                baseClock: 3.7,
                boostClock: 4.9,
            },
            images: ['https://example.com/cpu.jpg'],
        },
    });

    // 2. Motherboard
    const mobo = await prisma.part.create({
        data: {
            brand: 'ASUS',
            model: 'Prime Z690-P',
            category: 'mobo',
            price: 219.99,
            specs: {
                socket: 'LGA1700',
                formFactor: 'ATX',
                memoryType: 'DDR5',
                slots: 4,
                maxMemory: 128,
            },
            images: ['https://example.com/mobo.jpg'],
        },
    });

    // 3. RAM
    const ram = await prisma.part.create({
        data: {
            brand: 'Corsair',
            model: 'Vengeance 32GB',
            category: 'ram',
            price: 149.99,
            specs: {
                type: 'DDR5',
                capacity: 32,
                speed: 5200,
                modules: 2,
            },
            images: ['https://example.com/ram.jpg'],
        },
    });

    // 4. GPU
    const gpu = await prisma.part.create({
        data: {
            brand: 'NVIDIA',
            model: 'GeForce RTX 3060',
            category: 'gpu',
            price: 399.99,
            specs: {
                length: 242,
                tdp: 170,
                vram: 12,
                boostClock: 1.78,
            },
            images: ['https://example.com/gpu.jpg'],
        },
    });

    // 5. PSU
    const psu = await prisma.part.create({
        data: {
            brand: 'Corsair',
            model: 'RM750',
            category: 'psu',
            price: 129.99,
            specs: {
                wattage: 750,
                efficiency: '80+ Gold',
                modular: true,
            },
            images: ['https://example.com/psu.jpg'],
        },
    });

    // 6. Case
    const casePart = await prisma.part.create({
        data: {
            brand: 'NZXT',
            model: 'H510',
            category: 'case',
            price: 89.99,
            specs: {
                type: 'Mid Tower',
                maxGpuLength: 381,
                supportedFormFactors: ['ATX', 'Micro-ATX', 'Mini-ITX'],
            },
            images: ['https://example.com/case.jpg'],
        },
    });

    console.log('Seeding finished.');
    console.log('Created components:', {
        cpu: cpu.model,
        mobo: mobo.model,
        ram: ram.model,
        gpu: gpu.model,
        psu: psu.model,
        case: casePart.model,
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
