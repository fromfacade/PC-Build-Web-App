import {
    PartWithSpecs,
    CompatibilityResult,
    CpuSpecs,
    MoboSpecs,
    RamSpecs,
    GpuSpecs,
    CaseSpecs,
    PsuSpecs,
    CompatibilityIssue
} from '../types';
import { calculateSystemWattage } from '../services/wattage';

export function checkCompatibility(parts: Record<string, PartWithSpecs | undefined>): CompatibilityResult {
    const issues: CompatibilityIssue[] = [];

    const cpu = parts.cpu;
    const mobo = parts.mobo;
    const ram = parts.ram;
    const gpu = parts.gpu;
    const psu = parts.psu;
    const casePart = parts.case; // 'case' is a reserved keyword

    // Helper to cast specs
    const getSpecs = <T>(part: PartWithSpecs) => part.specs as T;

    // 1. CPU socket must match motherboard supported sockets
    if (cpu && mobo) {
        const cpuSpecs = getSpecs<CpuSpecs>(cpu);
        const moboSpecs = getSpecs<MoboSpecs>(mobo);

        if (cpuSpecs.socket !== moboSpecs.socket) {
            issues.push({
                check: 'CPU Socket',
                severity: 'error',
                message: `CPU socket ${cpuSpecs.socket} does not match Motherboard socket ${moboSpecs.socket}`,
                fix: 'Select a Motherboard that matches the CPU socket.'
            });
        }
    }

    // 2. RAM type must match motherboard memory type
    if (ram && mobo) {
        const ramSpecs = getSpecs<RamSpecs>(ram);
        const moboSpecs = getSpecs<MoboSpecs>(mobo);

        if (ramSpecs.type !== moboSpecs.memoryType) {
            issues.push({
                check: 'RAM Type',
                severity: 'error',
                message: `RAM type ${ramSpecs.type} is not supported by Motherboard (requires ${moboSpecs.memoryType})`,
                fix: 'Select RAM that matches the Motherboard memory type.'
            });
        }
    }

    // 3. PSU wattage must be >= estimated system wattage x 1.25
    if (psu) {
        const psuSpecs = getSpecs<PsuSpecs>(psu);
        const estimatedWattage = calculateSystemWattage(parts);
        const requiredBrewerage = estimatedWattage * 1.25;

        if (psuSpecs.wattage < requiredBrewerage) {
            issues.push({
                check: 'PSU Wattage',
                severity: 'warning',
                message: `PSU wattage (${psuSpecs.wattage}W) is lower than recommended (${Math.ceil(requiredBrewerage)}W)`,
                fix: `Upgrade to a PSU with at least ${Math.ceil(requiredBrewerage)}W.`
            });
        }
    }

    // 4. GPU length must fit inside case max_gpu_length
    if (gpu && casePart) {
        const gpuSpecs = getSpecs<GpuSpecs>(gpu);
        const caseSpecs = getSpecs<CaseSpecs>(casePart);

        if (gpuSpecs.length > caseSpecs.maxGpuLength) {
            issues.push({
                check: 'GPU Clearance',
                severity: 'error',
                message: `GPU length (${gpuSpecs.length}mm) exceeds Case maximum (${caseSpecs.maxGpuLength}mm)`,
                fix: 'Choose a smaller GPU or a larger Case.'
            });
        }
    }

    // 5. Motherboard form factor must fit case supported_form_factors
    if (mobo && casePart) {
        const moboSpecs = getSpecs<MoboSpecs>(mobo);
        const caseSpecs = getSpecs<CaseSpecs>(casePart);

        if (!caseSpecs.supportedFormFactors.includes(moboSpecs.formFactor)) {
            issues.push({
                check: 'Form Factor',
                severity: 'error',
                message: `Motherboard form factor (${moboSpecs.formFactor}) is not supported by Case`,
                fix: `Choose a Case that supports ${moboSpecs.formFactor} motherboards.`
            });
        }
    }

    return {
        ok: issues.filter(i => i.severity === 'error').length === 0,
        issues
    };
}
