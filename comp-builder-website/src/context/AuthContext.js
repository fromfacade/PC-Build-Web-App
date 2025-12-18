import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [savedBuilds, setSavedBuilds] = useState([]);

    useEffect(() => {
        // Check local storage for existing session
        const storedUser = localStorage.getItem('pc_builder_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        const storedBuilds = localStorage.getItem('pc_builder_saves');
        if (storedBuilds) {
            setSavedBuilds(JSON.parse(storedBuilds));
        }
    }, []);

    const login = (username) => {
        // Simple mock login
        const newUser = { username, id: Date.now() };
        setUser(newUser);
        localStorage.setItem('pc_builder_user', JSON.stringify(newUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('pc_builder_user');
    };

    const saveBuild = (buildName, buildData) => {
        if (!user) return alert("Please login to save builds");

        const newBuild = {
            id: Date.now(),
            name: buildName,
            date: new Date().toISOString(),
            parts: buildData
        };

        const updatedBuilds = [...savedBuilds, newBuild];
        setSavedBuilds(updatedBuilds);
        localStorage.setItem('pc_builder_saves', JSON.stringify(updatedBuilds));
        alert("Build saved!");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, saveBuild, savedBuilds }}>
            {children}
        </AuthContext.Provider>
    );
};
