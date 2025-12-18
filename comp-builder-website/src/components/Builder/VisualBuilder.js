import React, { useState } from 'react';
import { CATEGORIES } from '../../data/parts';
import PeripheralSidebar from './PeripheralSidebar';

const VisualBuilder = ({ build, onPartSelect, errors = {} }) => {
    const [layoutMode, setLayoutMode] = useState('decision'); // 'decision' | 'physical'

    const coreParts = ['cpu', 'motherboard', 'ram', 'gpu', 'storage', 'psu', 'case', 'cpuCooler'];

    const getLayout = (mode) => {
        if (mode === 'physical') {
            // Previous Motherboard-centric layout
            return {
                positions: {
                    pc: { x: 50, y: 50 },
                    cpu: { x: 50, y: 30 },
                    motherboard: { x: 50, y: 50 }, // Center hub
                    cpuCooler: { x: 30, y: 30 },
                    ram: { x: 70, y: 30 },
                    gpu: { x: 50, y: 80 },
                    storage: { x: 80, y: 50 },
                    psu: { x: 20, y: 50 },
                    case: { x: 50, y: 90 },
                },
                connections: [
                    { from: 'pc', to: 'motherboard', type: 'solid' },
                    { from: 'motherboard', to: 'cpu', type: 'solid' },
                    { from: 'motherboard', to: 'ram', type: 'solid' },
                    { from: 'motherboard', to: 'gpu', type: 'solid' },
                    { from: 'motherboard', to: 'storage', type: 'solid' },
                    { from: 'motherboard', to: 'cpuCooler', type: 'dotted' },
                    { from: 'pc', to: 'psu', type: 'solid' },
                    { from: 'pc', to: 'case', type: 'solid' },
                ]
            };
        } else {
            // Decision Flow (CPU Centered)
            return {
                positions: {
                    cpu: { x: 50, y: 15 }, // Start here
                    motherboard: { x: 50, y: 35 }, // Main Gate
                    ram: { x: 30, y: 55 },
                    gpu: { x: 50, y: 60 },
                    storage: { x: 70, y: 55 },
                    cpuCooler: { x: 80, y: 15 }, // Linked to CPU
                    case: { x: 50, y: 85 }, // Linked to Mobo/GPU
                    psu: { x: 20, y: 85 },
                },
                connections: [
                    { from: 'cpu', to: 'motherboard', type: 'solid' },
                    { from: 'motherboard', to: 'ram', type: 'solid' },
                    { from: 'motherboard', to: 'gpu', type: 'solid' },
                    { from: 'motherboard', to: 'storage', type: 'solid' },
                    // Secondary / Constraints
                    { from: 'cpu', to: 'cpuCooler', type: 'dotted' },
                    { from: 'motherboard', to: 'case', type: 'solid' },
                    { from: 'gpu', to: 'psu', type: 'dotted' },
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
                        <option value="decision">Decision Flow (CPU)</option>
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

                    return (
                        <div
                            key={key}
                            style={{ ...styles.node, left: `${pos.x}%`, top: `${pos.y}%` }}
                            onClick={() => onPartSelect(key)}
                        >
                            <div style={{
                                ...styles.nodeIcon,
                                ...(part ? styles.nodeActive : {}),
                                ...(hasError ? styles.nodeError : {})
                            }}>
                                {part ? <img src={part.image} alt={part.name} style={styles.partImage} /> : '+'}
                            </div>
                            <span style={styles.nodeLabel}>
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
        boxShadow: '0 0 15px rgba(255, 77, 77, 0.4)',
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
    }
};

export default VisualBuilder;
