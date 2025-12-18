import React from 'react';
import { CATEGORIES } from '../../data/parts';

const PeripheralSidebar = ({ build, onPartSelect }) => {
    const peripheralKeys = ['monitor', 'keyboard', 'mouse'];

    return (
        <div style={styles.sidebar}>
            <h3 style={styles.header}>Peripherals</h3>
            <div style={styles.list}>
                {peripheralKeys.map(key => {
                    const part = build[key];
                    return (
                        <div
                            key={key}
                            style={styles.item}
                            onClick={() => onPartSelect(key)}
                        >
                            <div style={{ ...styles.icon, ...(part ? styles.iconActive : {}) }}>
                                {part ? <img src={part.image} alt={part.name} style={styles.img} /> : '+'}
                            </div>
                            <div style={styles.info}>
                                <div style={styles.label}>{CATEGORIES[key]}</div>
                                {part && <div style={styles.partName}>{part.name}</div>}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const styles = {
    sidebar: {
        width: '250px',
        borderLeft: '1px solid var(--color-border)',
        backgroundColor: 'rgba(0,0,0,0.2)',
        display: 'flex',
        flexDirection: 'column',
    },
    header: {
        padding: '1rem',
        margin: 0,
        fontSize: '1rem',
        borderBottom: '1px solid var(--color-border)',
        backgroundColor: 'rgba(255,255,255,0.05)',
    },
    list: {
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        overflowY: 'auto',
    },
    item: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.5rem',
        borderRadius: 'var(--radius-sm)',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        ':hover': {
            backgroundColor: 'var(--color-bg-dark)',
        }
    },
    icon: {
        width: '40px',
        height: '40px',
        borderRadius: '8px',
        backgroundColor: 'var(--color-bg-dark)',
        border: '1px solid var(--color-border)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'var(--color-text-muted)',
        flexShrink: 0,
    },
    iconActive: {
        borderColor: 'var(--color-primary)',
        backgroundColor: '#fff',
        padding: 0,
        overflow: 'hidden',
    },
    img: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    info: {
        overflow: 'hidden',
    },
    label: {
        fontSize: '0.875rem',
        fontWeight: '600',
    },
    partName: {
        fontSize: '0.75rem',
        color: 'var(--color-text-muted)',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
};

export default PeripheralSidebar;
