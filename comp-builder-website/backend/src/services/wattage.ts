import { PartWithSpecs, CpuSpecs, GpuSpecs } from '../types';

export function calculateSystemWattage(parts: Record<string, PartWithSpecs | undefined>): number {
    let totalTdp = 0;
    const BASE_OVERHEAD = 80;

    // Add CPU TDP
    if (parts.cpu) {
        const specs = parts.cpu.specs as CpuSpecs;
        if (specs.tdp) {
            totalTdp += specs.tdp;
        }
    }

    // Add GPU TDP
    if (parts.gpu) {
        const specs = parts.gpu.specs as GpuSpecs;
        if (specs.tdp) {
            totalTdp += specs.tdp;
        }
    }

    // In a real app we might sum other components, but logic is simplified here per prompt
    // Prompt says: CPU TDP + GPU TDP + 80W overhead

    return totalTdp + BASE_OVERHEAD;
}
