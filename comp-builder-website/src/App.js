import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Builder from './components/Builder/Builder';

import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Header />
        <main className="App-main">
          <Builder />
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
