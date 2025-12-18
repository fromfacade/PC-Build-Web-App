import React from 'react';
import { CATEGORIES } from '../../data/parts';

const VisualBuilder = ({ build, onPartSelect, errors = {} }) => {
    // Define positions for a spider-web layout
    const positions = {
        center: { x: 50, y: 50 },
        cpu: { x: 50, y: 20 },
        motherboard: { x: 50, y: 35 },
        cpuCooler: { x: 25, y: 20 },
        ram: { x: 75, y: 20 },
        gpu: { x: 50, y: 70 },
        storage: { x: 80, y: 50 },
        psu: { x: 20, y: 50 },
        case: { x: 50, y: 85 },
        monitor: { x: 85, y: 80 },
        keyboard: { x: 15, y: 80 },
        mouse: { x: 15, y: 70 },
    };

    const connections = [
        { from: 'center', to: 'motherboard' },
        { from: 'motherboard', to: 'cpu' },
        { from: 'motherboard', to: 'ram' },
        { from: 'motherboard', to: 'gpu' },
        { from: 'motherboard', to: 'storage' },
        { from: 'motherboard', to: 'cpuCooler' }, // Usually connects to CPU area
        { from: 'center', to: 'psu' },
        { from: 'center', to: 'case' },
        { from: 'center', to: 'monitor' },
        { from: 'center', to: 'keyboard' },
        { from: 'center', to: 'mouse' },
    ];

    return (
        <div style={styles.container}>
            <svg style={styles.svg}>
                {connections.map((conn, i) => {
                    const start = positions[conn.from];
                    const end = positions[conn.to];
                    return (
                        <line
                            key={i}
                            x1={`${start.x}%`} y1={`${start.y}%`}
                            x2={`${end.x}%`} y2={`${end.y}%`}
                            stroke="var(--color-border)"
                            strokeWidth="2"
                        />
                    );
                })}
            </svg>

            <div style={{ ...styles.node, ...styles.centerNode, left: '50%', top: '50%' }}>
                <div style={styles.nodeIcon}>💻</div>
                <span style={styles.nodeLabel}>PC</span>
            </div>

            {Object.entries(CATEGORIES).map(([key, label]) => {
                const pos = positions[key] || { x: 0, y: 0 };
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
                            {part ? part.name.substring(0, 15) + (part.name.length > 15 ? '...' : '') : label}
                        </span>
                    </div>
                );
            })}
        </div>
    );
};

const styles = {
    container: {
        position: 'relative',
        width: '100%',
        height: '600px',
        backgroundColor: 'var(--color-bg-card)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        border: '1px solid var(--color-border)',
        marginBottom: '2rem',
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
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '2px solid var(--color-border)',
        transition: 'all 0.3s ease',
        fontSize: '1.2rem',
        color: 'var(--color-text-muted)',
    },
    centerNode: {
        cursor: 'default',
    },
    nodeActive: {
        borderColor: 'var(--color-primary)',
        backgroundColor: '#fff',
        overflow: 'hidden',
        padding: 0,
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
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: '2px 6px',
        borderRadius: '4px',
        maxWidth: '120px',
        textAlign: 'center',
    }
};

export default VisualBuilder;
