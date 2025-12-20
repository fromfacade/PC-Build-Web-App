import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
    const { login, user, logout } = useAuth();
    const [username, setUsername] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        if (username.trim()) {
            login(username);
            setIsOpen(false);
            setUsername('');
        }
    };

    if (user) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ color: 'var(--color-primary)' }}>Hi, {user.username}</span>
                <button
                    onClick={logout}
                    style={styles.button}
                >
                    Logout
                </button>
            </div>
        );
    }

    return (
        <div style={{ position: 'relative' }}>
            {!isOpen ? (
                <button
                    onClick={() => setIsOpen(true)}
                    style={styles.button}
                >
                    Login to Save
                </button>
            ) : (
                <form onSubmit={handleLogin} style={styles.form}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={styles.input}
                        autoFocus
                    />
                    <button type="submit" style={styles.submitBtn}>Go</button>
                    <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        style={styles.cancelBtn}
                    >
                    </button>
                </form>
            )}
        </div>
    );
};

const styles = {
    button: {
        backgroundColor: 'var(--color-primary)',
        color: '#fff',
        border: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold',
    },
    form: {
        display: 'flex',
        gap: '0.5rem',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: '0.25rem',
        borderRadius: '4px',
    },
    input: {
        padding: '0.25rem 0.5rem',
        borderRadius: '2px',
        border: '1px solid #ccc',
        width: '120px',
    },
    submitBtn: {
        backgroundColor: 'var(--color-primary)',
        color: '#fff',
        border: 'none',
        padding: '0.25rem 0.5rem',
        borderRadius: '2px',
        cursor: 'pointer',
    },
    cancelBtn: {
        background: 'none',
        border: 'none',
        fontSize: '1.2rem',
        cursor: 'pointer',
        color: '#666',
        padding: '0 0.25rem',
    }
};

export default Login;
