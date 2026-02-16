export type PartCategory = 'cpu' | 'gpu' | 'mobo' | 'ram' | 'psu' | 'case' | 'storage' | 'cooler';

export interface BaseSpecs {
    [key: string]: any;
}

export interface CpuSpecs extends BaseSpecs {
    socket: string;
    tdp: number;
}

export interface GpuSpecs extends BaseSpecs {
    length: number; // mm
    tdp: number;
}

export interface MoboSpecs extends BaseSpecs {
    socket: string;
    memoryType: string; // e.g., "DDR4", "DDR5"
    formFactor: string; // e.g., "ATX", "Micro-ATX"
}

export interface RamSpecs extends BaseSpecs {
    type: string; // e.g., "DDR4"
}

export interface PsuSpecs extends BaseSpecs {
    wattage: number;
}

export interface CaseSpecs extends BaseSpecs {
    maxGpuLength: number; // mm
    supportedFormFactors: string[]; // e.g., ["ATX", "Micro-ATX"]
}

export interface StorageSpecs extends BaseSpecs {
    type: string; // "SSD", "HDD"
    interface: string; // "M.2", "SATA"
}

export interface CoolerSpecs extends BaseSpecs {
    supportedSockets: string[];
}

export interface PartWithSpecs {
    id: number;
    category: string;
    brand: string;
    model: string;
    price: any;
    specs: any; // Raw JSON from DB
}

export interface CompatibilityIssue {
    check: string;
    severity: 'error' | 'warning';
    message: string;
    fix: string;
}

export interface CompatibilityResult {
    ok: boolean;
    issues: CompatibilityIssue[];
}
