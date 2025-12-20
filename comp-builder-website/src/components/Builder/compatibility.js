import React from 'react';
import { PARTS_DATA } from '../../data/parts';

export default function getCompatibleParts(type, build) {
    const allParts = PARTS_DATA[type] || [];

    return allParts.map(part => {
        let compatible = true;
        let error = null;

        // CPU <-> Motherboard Compatibility
        if (type === 'cpu' && build.motherboard) {
            if (part.socket !== build.motherboard.socket) {
                compatible = false;
                error = `Incompatible Socket (Needs ${build.motherboard.socket})`;
            }
        }
        if (type === 'motherboard' && build.cpu) {
            if (part.socket !== build.cpu.socket) {
                compatible = false;
                error = `Incompatible Socket (Needs ${build.cpu.socket})`;
            }
        }

        // CPU Cooler <-> CPU Compatibility
        if (type === 'cpuCooler' && build.cpu) {
            if (!part.supportedSockets.includes(build.cpu.socket)) {
                compatible = false;
                error = `Unsupported Socket (Needs ${build.cpu.socket})`;
            }
        }
        if (type === 'cpu' && build.cpuCooler) {
            if (!build.cpuCooler.supportedSockets.includes(part.socket)) {
                compatible = false;
                error = `Unsupported Socket (Cooler supports ${build.cpuCooler.supportedSockets.join(', ')})`;
            }
        }

        // Case <-> Motherboard Compatibility
        if (type === 'case' && build.motherboard) {
            // Case supports list of form factors
            if (!part.supportedMotherboards.includes(build.motherboard.formFactor)) {
                compatible = false;
                error = `Incompatible Form Factor (Need ${build.motherboard.formFactor})`;
            }
        }
        if (type === 'motherboard' && build.case) {
            // Motherboard has one form factor
            if (!build.case.supportedMotherboards.includes(part.formFactor)) {
                compatible = false;
                error = `Case too small (Max: ${build.case.supportedMotherboards.join(', ')})`;
            }
        }

        // RAM <-> Motherboard Compatibility
        if (type === 'ram' && build.motherboard) {
            if (build.motherboard.memoryType && part.type !== build.motherboard.memoryType) {
                compatible = false;
                error = `Incompatible Memory (Needs ${build.motherboard.memoryType})`;
            }
        }
        if (type === 'motherboard' && build.ram) {
            if (part.memoryType && build.ram.type !== part.memoryType) {
                compatible = false;
                error = `Incompatible Memory (Stick is ${build.ram.type})`;
            }
        }

        return { ...part, compatible, error };
    });
};

export function validateBuild(build) {
    const errors = {};

    // Check CPU vs Motherboard
    if (build.cpu && build.motherboard) {
        if (build.cpu.socket !== build.motherboard.socket) {
            errors.cpu = "Incompatible Socket";
            errors.motherboard = "Incompatible Socket";
        }
    }

    // Check RAM vs Motherboard
    if (build.ram && build.motherboard) {
        if (build.motherboard.memoryType && build.ram.type !== build.motherboard.memoryType) {
            errors.ram = `Requires ${build.motherboard.memoryType}`;
            errors.motherboard = "Incompatible RAM";
        }
    }

    // Check Cooler vs CPU
    if (build.cpuCooler && build.cpu) {
        if (!build.cpuCooler.supportedSockets.includes(build.cpu.socket)) {
            errors.cpuCooler = "Unsupported Socket";
        }
    }

    // Check Case vs Motherboard
    if (build.case && build.motherboard) {
        if (!build.case.supportedMotherboards.includes(build.motherboard.formFactor)) {
            errors.case = "Incompatible Form Factor";
            errors.motherboard = "Incompatible Form Factor";
        }
    }

    return errors;
}