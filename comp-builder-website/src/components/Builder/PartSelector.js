import React from 'react';
// import { PARTS_DATA } from '../../data/parts'; // No longer needed directly

const PartSelector = ({ type, parts, isOpen, onClose, onSelect }) => {
    if (!isOpen) return null;

    // const parts = PARTS_DATA[type] || []; // Now passed in as prop

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <h2>Select {type}</h2>
                    <button style={styles.closeButton} onClick={onClose}>Close</button>
                </div>
                <div style={styles.list}>
                    {parts.map(part => (
                        <div key={part.id} style={styles.item} onClick={() => onSelect(type, part)}>
                            <div style={styles.itemImage}>
                                <img src={part.image} alt={part.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                            </div>
                            <div style={styles.itemDetails}>
                                <div style={styles.itemName}>{part.name}</div>
                                <div style={styles.itemMeta}>
                                    {Object.entries(part).map(([key, value]) => {
                                        if (['id', 'name', 'price', 'image'].includes(key)) return null;
                                        return <span key={key} style={styles.tag}>{value}</span>;
                                    })}
                                </div>
                            </div>
                            <div style={styles.itemPrice}>${part.price}</div>
                            <button style={styles.selectButton}>Add</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        backdropFilter: 'blur(4px)',
    },
    modal: {
        backgroundColor: 'var(--color-bg-card)',
        width: '90%',
        maxWidth: '600px',
        maxHeight: '80vh',
        borderRadius: 'var(--radius-lg)',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
        border: '1px solid var(--color-border)',
    },
    header: {
        padding: '1.5rem',
        borderBottom: '1px solid var(--color-border)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    closeButton: {
        backgroundColor: 'transparent',
        color: 'var(--color-text-muted)',
        fontWeight: '600',
    },
    list: {
        padding: '1rem',
        overflowY: 'auto',
    },
    item: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '1rem',
        borderBottom: '1px solid var(--color-border)',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        ':hover': {
            backgroundColor: 'var(--color-bg-dark)',
        }
    },
    itemImage: {
        width: '60px',
        height: '60px',
        backgroundColor: '#fff',
        borderRadius: 'var(--radius-sm)',
        padding: '4px',
    },
    itemDetails: {
        flex: 1,
    },
    itemName: {
        fontWeight: '600',
        marginBottom: '0.25rem',
    },
    itemMeta: {
        display: 'flex',
        gap: '0.5rem',
        flexWrap: 'wrap',
    },
    tag: {
        fontSize: '0.75rem',
        backgroundColor: 'var(--color-bg-dark)',
        padding: '0.125rem 0.5rem',
        borderRadius: '1rem',
        color: 'var(--color-text-muted)',
        border: '1px solid var(--color-border)',
    },
    itemPrice: {
        fontSize: '1.125rem',
        fontWeight: '700',
        color: 'var(--color-text-main)',
        marginRight: '1rem',
    },
    selectButton: {
        backgroundColor: 'var(--color-primary)',
        color: '#fff',
        padding: '0.5rem 1rem',
        borderRadius: 'var(--radius-sm)',
        fontSize: '0.875rem',
        fontWeight: '600',
    }
};

export default PartSelector;
