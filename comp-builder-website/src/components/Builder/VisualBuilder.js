import React, { useState } from 'react';
import { CATEGORIES } from '../../data/parts';
import PeripheralSidebar from './PeripheralSidebar';

const VisualBuilder = ({ build, onPartSelect, onPartRemove, errors = {}, isPartLocked = () => false }) => {
    // ... (existing layout logic)
    const [layoutMode, setLayoutMode] = useState('decision'); // 'decision' | 'physical'

    const coreParts = ['cpu', 'motherboard', 'ram', 'gpu', 'storage', 'psu', 'case', 'cpuCooler'];

    const getLayout = (mode) => {
        if (mode === 'physical') {
            // Previous Motherboard-centric layout
            return {
                positions: {
                    cpu: { x: 30, y: 30 },
                    motherboard: { x: 50, y: 50 }, // Center hub
                    cpuCooler: { x: 15, y: 30 },
                    ram: { x: 70, y: 30 },
                    gpu: { x: 30, y: 80 },
                    storage: { x: 80, y: 50 },
                    psu: { x: 20, y: 50 },
                    case: { x: 70, y: 80 },
                },
                connections: [
                    { from: 'case', to: 'motherboard', type: 'solid' },
                    { from: 'motherboard', to: 'cpu', type: 'solid' },
                    { from: 'motherboard', to: 'ram', type: 'solid' },
                    { from: 'motherboard', to: 'gpu', type: 'solid' },
                    { from: 'motherboard', to: 'storage', type: 'solid' },
                    { from: 'motherboard', to: 'psu', type: 'solid' },
                    { from: 'cpu', to: 'cpuCooler', type: 'dotted' },
                ]
            };
        } else {
            // Decision Flow (User Requested Order)
            // Level 1: CPU, Case
            // Level 2: Motherboard, Cooler
            // Level 3: PSU, GPU, Storage, Memory
            return {
                positions: {
                    case: { x: 35, y: 20 },
                    cpu: { x: 65, y: 20 },

                    motherboard: { x: 50, y: 50 },
                    cpuCooler: { x: 75, y: 50 },

                    psu: { x: 20, y: 80 },
                    gpu: { x: 40, y: 80 },
                    storage: { x: 60, y: 80 },
                    ram: { x: 80, y: 80 },
                },
                connections: [
                    // Level 1 -> Level 2
                    { from: 'case', to: 'motherboard', type: 'solid' },
                    { from: 'cpu', to: 'motherboard', type: 'solid' },
                    { from: 'cpu', to: 'cpuCooler', type: 'dotted' },

                    // Level 2 -> Level 3
                    { from: 'motherboard', to: 'gpu', type: 'solid' },
                    { from: 'motherboard', to: 'storage', type: 'solid' },
                    { from: 'motherboard', to: 'ram', type: 'solid' },
                    { from: 'motherboard', to: 'psu', type: 'solid' }, // PSU powers mobo
                ]
            };
        }
    };

    const { positions, connections } = getLayout(layoutMode);

    return (
        <div style={styles.wrapper}>
            <div style={styles.controls}>
                <label style={styles.toggleLabel}>
                    <span style={{ marginRight: '8px', color: 'var(--color-text-muted)' }}>Layout:</span>
                    <select
                        value={layoutMode}
                        onChange={(e) => setLayoutMode(e.target.value)}
                        style={styles.select}
                    >
                        <option value="decision">Decision Flow</option>
                        <option value="physical">Physical Hub</option>
                    </select>
                </label>
            </div>

            <div style={styles.graphArea}>
                <svg style={styles.svg}>
                    {connections.map((conn, i) => {
                        const start = positions[conn.from];
                        const end = positions[conn.to];
                        if (!start || !end) return null;

                        return (
                            <line
                                key={i}
                                x1={`${start.x}%`} y1={`${start.y}%`}
                                x2={`${end.x}%`} y2={`${end.y}%`}
                                stroke="var(--color-border)"
                                strokeWidth="2"
                                strokeDasharray={conn.type === 'dotted' ? '5,5' : 'none'}
                                opacity={conn.type === 'dotted' ? 0.6 : 1}
                            />
                        );
                    })}
                </svg>

                {coreParts.map(key => {
                    const pos = positions[key];
                    if (!pos) return null; // Skip if not in current layout

                    const part = build[key];
                    const hasError = !!errors[key];
                    const locked = isPartLocked(key);

                    return (
                        <div
                            key={key}
                            style={{ ...styles.node, left: `${pos.x}%`, top: `${pos.y}%`, opacity: locked ? 0.5 : 1, pointerEvents: locked ? 'none' : 'auto' }}
                            onClick={() => !locked && onPartSelect(key)}
                        >
                            <div style={{
                                ...styles.nodeIcon,
                                ...(part ? styles.nodeActive : {}),
                                ...(hasError ? styles.nodeError : {}),
                                ...(locked ? styles.nodeLocked : {})
                            }}>
                                {locked ? (
                                    <span style={{ fontSize: '1.5rem' }}>🔒</span>
                                ) : (
                                    part ? <img src={part.image} alt={part.name} style={styles.partImage} /> : '+'
                                )}
                            </div>

                            {part && !locked && (
                                <div
                                    style={styles.removeBtn}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onPartRemove(key);
                                    }}
                                    title="Remove part"
                                >
                                    ×
                                </div>
                            )}

                            <span style={{
                                ...styles.nodeLabel,
                                ...(hasError ? styles.nodeLabelError : {})
                            }}>
                                {part ? (part.name.length > 12 ? part.name.substring(0, 12) + '...' : part.name) : CATEGORIES[key]}
                            </span>
                        </div>
                    );
                })}
            </div>

            <PeripheralSidebar build={build} onPartSelect={onPartSelect} />
        </div>
    );
};

const styles = {
    // ... (keep previous styles unchanged until nodeError)
    wrapper: {
        display: 'flex',
        backgroundColor: 'var(--color-bg-card)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border)',
        marginBottom: '2rem',
        overflow: 'hidden',
        height: '600px',
        position: 'relative',
    },
    graphArea: {
        flex: 1,
        position: 'relative',
        backgroundColor: 'rgba(0,0,0,0.2)', // Slightly darker graph area
    },
    controls: {
        position: 'absolute',
        top: '1rem',
        left: '1rem',
        zIndex: 20,
    },
    select: {
        padding: '4px 8px',
        borderRadius: 'var(--radius-sm)',
        background: 'var(--color-bg-dark)',
        color: '#fff',
        border: '1px solid var(--color-border)',
        fontSize: '0.875rem',
    },
    svg: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
    },
    node: {
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
        cursor: 'pointer',
        zIndex: 10,
        transition: 'opacity 0.3s ease',
    },
    nodeIcon: {
        width: '50px',
        height: '50px',
        backgroundColor: 'var(--color-bg-dark)',
        borderRadius: '12px', // Squircle
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '2px solid var(--color-border)',
        transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)', // Bouncy
        fontSize: '1.2rem',
        color: 'var(--color-text-muted)',
        position: 'relative', // Context for relative children if needed
    },
    nodeActive: {
        borderColor: 'var(--color-primary)',
        backgroundColor: '#fff',
        overflow: 'hidden',
        padding: 0,
        boxShadow: '0 4px 15px rgba(0, 210, 255, 0.2)',
    },
    nodeError: {
        borderColor: '#ff4d4d',
        borderWidth: '3px',
        boxShadow: '0 0 20px rgba(255, 77, 77, 0.6)',
    },
    nodeLocked: {
        backgroundColor: '#2a2a2a',
        borderColor: '#444',
        cursor: 'not-allowed',
        boxShadow: 'none',
    },
    partImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    nodeLabel: {
        fontSize: '0.75rem',
        color: 'var(--color-text-muted)',
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: '2px 6px',
        borderRadius: '4px',
        maxWidth: '120px',
        textAlign: 'center',
        backdropFilter: 'blur(4px)',
    },
    nodeLabelError: {
        backgroundColor: '#ff4d4d',
        color: '#fff',
        fontWeight: 'bold',
    },
    removeBtn: {
        position: 'absolute',
        top: '-6px',
        right: '-6px',
        width: '24px',
        height: '24px',
        backgroundColor: 'transparent',
        color: '#ff4d4d',
        borderRadius: '50%', // Keep radius for hover effects if any, or click radius
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '18px',
        lineHeight: '1',
        paddingBottom: '2px',
        fontWeight: '900', // Extra bold
        cursor: 'pointer',
        zIndex: 20,
        textShadow: '0 2px 4px rgba(0,0,0,0.3)', // Text shadow to pop against any bg
        transition: 'transform 0.2s ease',
    }
};

export default VisualBuilder;
