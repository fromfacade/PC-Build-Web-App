import React, { useState } from 'react';
import { CATEGORIES } from '../../data/parts';
import { useAuth } from '../../context/AuthContext';
import PartSlot from './PartSlot';
import PartSelector from './PartSelector';
import VisualBuilder from './VisualBuilder';
import getCompatibleParts from './compatibility.js';
import validateBuild from './compatibility.js';


const Builder = () => {
    const [build, setBuild] = useState({});
    const [purchasedParts, setPurchasedParts] = useState({}); // { cpu: true }
    const [selectorOpen, setSelectorOpen] = useState(null); // 'cpu', 'gpu', etc. or null
    const [viewMode, setViewMode] = useState('visual'); // 'visual' | 'list'
    const { saveBuild } = useAuth();

    const errors = validateBuild(build);

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
            return newBuild;
        });
        setPurchasedParts(prev => {
            const newPurchased = { ...prev };
            delete newPurchased[type];
            return newPurchased;
        });
    };

    const handleTogglePurchased = (type) => {
        setPurchasedParts(prev => ({ ...prev, [type]: !prev[type] }));
    };

    const handleSave = () => {
        const name = prompt("Enter a name for this build:");
        if (name) {
            saveBuild(name, { ...build, purchased: purchasedParts });
        }
    };

    const subtotal = Object.values(build).reduce((acc, part) => acc + part.price, 0);
    const taxRate = 0.08; // 8%
    const tax = subtotal * taxRate;
    const total = subtotal + tax;

    return (
        <div style={styles.container}>
            <div style={styles.headerControls}>
                <div style={styles.toggleContainer}>
                    <button
                        style={{ ...styles.toggleBtn, ...(viewMode === 'visual' ? styles.toggleBtnActive : {}) }}
                        onClick={() => setViewMode('visual')}
                    >
                        Visual
                    </button>
                    <button
                        style={{ ...styles.toggleBtn, ...(viewMode === 'list' ? styles.toggleBtnActive : {}) }}
                        onClick={() => setViewMode('list')}
                    >
                        List
                    </button>
                </div>
            </div>

            {viewMode === 'visual' ? (
                <VisualBuilder
                    build={build}
                    onPartSelect={handleAddPart}
                    errors={errors}
                />
            ) : (
                <div style={styles.builderGrid}>
                    {Object.entries(CATEGORIES).map(([key, label]) => (
                        <PartSlot
                            key={key}
                            type={key}
                            label={label}
                            part={build[key]}
                            onAdd={handleAddPart}
                            onRemove={handleRemovePart}
                            error={errors[key]}
                            isPurchased={!!purchasedParts[key]}
                            onTogglePurchased={handleTogglePurchased}
                        />
                    ))}
                </div>
            )}

            {/* Sticky Bottom Bar */}
            <div style={styles.bottomBar}>
                <div style={styles.bottomBarContent}>
                    <div style={styles.priceBreakdown}>
                        <div style={styles.priceRow}>Subtotal: ${subtotal.toLocaleString()}</div>
                        <div style={styles.priceRow}>Tax (8%): ${tax.toFixed(2)}</div>
                        <div style={styles.totalPrice}>
                            Total: <span style={{ color: 'var(--color-primary)' }}>${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </div>
                    </div>
                    <button onClick={handleSave} style={styles.saveButton}>Save Build</button>
                </div>
            </div>

            {selectorOpen && (
                <PartSelector
                    type={selectorOpen}
                    label={CATEGORIES[selectorOpen]}
                    parts={getCompatibleParts(selectorOpen, build)}
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
        padding: '2rem 1rem 100px 1rem', // Extra padding bottom for sticky bar
        maxWidth: '1200px', // Wider for visual builder
        margin: '0 auto',
    },
    headerControls: {
        marginBottom: '2rem',
        display: 'flex',
        justifyContent: 'center',
    },
    toggleContainer: {
        backgroundColor: 'var(--color-bg-card)',
        padding: '4px',
        borderRadius: 'var(--radius-md)',
        display: 'flex',
        gap: '4px',
        border: '1px solid var(--color-border)',
    },
    toggleBtn: {
        padding: '0.5rem 1.5rem',
        borderRadius: 'var(--radius-sm)',
        border: 'none',
        background: 'transparent',
        color: 'var(--color-text-muted)',
        cursor: 'pointer',
        fontWeight: '600',
        transition: 'all 0.2s',
    },
    toggleBtnActive: {
        backgroundColor: 'var(--color-bg-dark)',
        color: 'var(--color-primary)',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
    },
    builderGrid: {
        display: 'grid',
        gap: '1rem',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    },
    bottomBar: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'var(--color-bg-card)',
        borderTop: '1px solid var(--color-border)',
        backdropFilter: 'blur(10px)',
        padding: '1rem',
        zIndex: 100,
        boxShadow: '0 -4px 20px rgba(0,0,0,0.3)',
    },
    bottomBarContent: {
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'flex-end', // Align to right
        alignItems: 'center',
        gap: '2rem',
    },
    priceBreakdown: {
        textAlign: 'right',
    },
    priceRow: {
        fontSize: '0.875rem',
        color: 'var(--color-text-muted)',
        marginBottom: '0.25rem',
    },
    totalPrice: {
        fontSize: '1.5rem',
        fontWeight: '700',
    },
    saveButton: {
        backgroundColor: 'var(--color-primary)',
        color: '#000',
        border: 'none',
        padding: '0.75rem 2rem',
        borderRadius: 'var(--radius-sm)',
        fontSize: '1rem',
        fontWeight: '700',
        cursor: 'pointer',
        boxShadow: '0 4px 15px rgba(0, 210, 255, 0.3)',
        transition: 'transform 0.2s',
    },
};

export default Builder;
