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
            // If adding CPU but Cooler is already selected (less common flow, but possible)
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

            return true;
        });
    };