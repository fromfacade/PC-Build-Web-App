import React from 'react';
import { PARTS_DATA } from '../../data/parts';

export default function getCompatibleParts(type, build) {
    const allParts = PARTS_DATA[type] || [];

    return allParts.filter(part => {
        // CPU <-> Motherboard Compatibility
        if (type === 'cpu' && build.motherboard) {
            if (part.socket !== build.motherboard.socket) return false;
        }
        if (type === 'motherboard' && build.cpu) {
            if (part.socket !== build.cpu.socket) return false;
        }

        // CPU Cooler <-> CPU Compatibility
        if (type === 'cpuCooler' && build.cpu) {
            if (!part.supportedSockets.includes(build.cpu.socket)) return false;
        }
        if (type === 'cpu' && build.cpuCooler) {
            if (!build.cpuCooler.supportedSockets.includes(part.socket)) return false;
        }

        // Case <-> Motherboard Compatibility
        if (type === 'case' && build.motherboard) {
            // Case supports list of form factors
            if (!part.supportedMotherboards.includes(build.motherboard.formFactor)) return false;
        }
        if (type === 'motherboard' && build.case) {
            // Motherboard has one form factor
            if (!build.case.supportedMotherboards.includes(part.formFactor)) return false;
        }

        // RAM <-> Motherboard Compatibility
        if (type === 'ram' && build.motherboard) {
            if (build.motherboard.memoryType && part.type !== build.motherboard.memoryType) return false;
        }
        if (type === 'motherboard' && build.ram) {
            if (part.memoryType && build.ram.type !== part.memoryType) return false;
        }

        return true;
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