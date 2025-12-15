import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Builder from './components/Builder/Builder';

function App() {
  return (
    <div className="App">
      <Header />
      <main className="App-main">
        <Builder />
      </main>
      <Footer />
    </div>
  );
}

export default App;
