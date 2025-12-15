import React from 'react';

const PartSlot = ({ type, label, part, onAdd, onRemove }) => {
    return (
        <div style={styles.slot}>
            <div style={styles.header}>
                <h3 style={styles.label}>{label}</h3>
                {!part && (
                    <button style={styles.addButton} onClick={() => onAdd(type)}>
                        + Add {label}
                    </button>
                )}
            </div>

            {part && (
                <div style={styles.partCard}>
                    <div style={styles.partInfo}>
                        <div style={styles.imagePlaceholder}>
                            <img src={part.image} alt={part.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div>
                            <div style={styles.partName}>{part.name}</div>
                            <div style={styles.partPrice}>${part.price}</div>
                        </div>
                    </div>
                    <button style={styles.removeButton} onClick={() => onRemove(type)}>
                        ×
                    </button>
                </div>
            )}
        </div>
    );
};

const styles = {
    slot: {
        backgroundColor: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        padding: '1.5rem',
        marginBottom: '1rem',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '0.5rem',
    },
    label: {
        fontSize: '1rem',
        fontWeight: '600',
        color: 'var(--color-text-muted)',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
    },
    addButton: {
        backgroundColor: 'var(--color-primary)',
        color: '#fff',
        padding: '0.5rem 1rem',
        borderRadius: 'var(--radius-sm)',
        fontSize: '0.875rem',
        fontWeight: '600',
    },
    partCard: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '1rem',
        padding: '1rem',
        backgroundColor: 'var(--color-bg-dark)',
        borderRadius: 'var(--radius-sm)',
        border: '1px solid var(--color-border)',
    },
    partInfo: {
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
    },
    imagePlaceholder: {
        width: '48px',
        height: '48px',
        backgroundColor: '#30363d',
        borderRadius: 'var(--radius-sm)',
        overflow: 'hidden'
    },
    partName: {
        fontWeight: '600',
        color: 'var(--color-text-main)',
    },
    partPrice: {
        color: 'var(--color-accent)',
        fontWeight: '500',
    },
    removeButton: {
        backgroundColor: 'transparent',
        color: 'var(--color-text-muted)',
        fontSize: '1.5rem',
        padding: '0 0.5rem',
    }
};

export default PartSlot;
