import React, { useState } from 'react';
import { CATEGORIES, PARTS_DATA } from '../../data/parts';
import PartSlot from './PartSlot';
import PartSelector from './PartSelector';

const Builder = () => {
    const [build, setBuild] = useState({});
    const [selectorOpen, setSelectorOpen] = useState(null); // 'cpu', 'gpu', etc. or null

    const handleAddPart = (type) => {
        setSelectorOpen(type);
    };

    const handleSelectPart = (type, part) => {
        setBuild(prev => ({ ...prev, [type]: part }));
        setSelectorOpen(null);
    };

    const handleRemovePart = (type) => {
        setBuild(prev => {
            const newBuild = { ...prev };
            delete newBuild[type];

            // Cascade removal if compatibility is broken? 
            // For now, let's keep it simple: just remove the item. 
            // User can re-verify compatibility visually.
            // Or, better, if we remove Motherboard, we might want to warn about CPU. 
            // But keeping it flexible is fine for V1.

            return newBuild;
        });
    };

    const getCompatibleParts = (type) => {
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

    const totalPrice = Object.values(build).reduce((acc, part) => acc + part.price, 0);

    return (
        <div style={styles.container}>
            <div style={styles.summaryCard}>
                <h2>Your Build</h2>
                <div style={styles.totalPrice}>
                    Total: <span style={{ color: 'var(--color-accent)' }}>${totalPrice.toLocaleString()}</span>
                </div>
            </div>

            <div style={styles.builderGrid}>
                {Object.entries(CATEGORIES).map(([key, label]) => (
                    <PartSlot
                        key={key}
                        type={key}
                        label={label}
                        part={build[key]}
                        onAdd={handleAddPart}
                        onRemove={handleRemovePart}
                    />
                ))}
            </div>

            {selectorOpen && (
                <PartSelector
                    type={selectorOpen}
                    parts={getCompatibleParts(selectorOpen)} // Pass filtered parts
                    isOpen={!!selectorOpen}
                    onClose={() => setSelectorOpen(null)}
                    onSelect={handleSelectPart}
                />
            )}
        </div>
    );
};

const styles = {
    container: {
        padding: '2rem 1rem',
        maxWidth: '1000px',
        margin: '0 auto',
    },
    summaryCard: {
        backgroundColor: 'var(--color-bg-card)',
        padding: '2rem',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border)',
        marginBottom: '2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'linear-gradient(145deg, var(--color-bg-card), #1c2128)',
    },
    totalPrice: {
        fontSize: '2rem',
        fontWeight: '700',
    },
    builderGrid: {
        display: 'grid',
        gap: '1rem',
    }
};

export default Builder;
