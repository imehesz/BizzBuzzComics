import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { ComicsProvider } from './Services/ComicsProvider'
import Home from './components/Home';
import './App.scss';

import Footer from './components/Footer/Footer'
import About from './components/Pages/About/About'
import Header from './components/Header/Header'
import Comics from './components/Pages/Comics/Comics'
import Comic from './components/Pages/Comic/Comic'
import Reader from './components/Pages/Reader/Reader';

function App() {
  return (
    <Router>
        <ComicsProvider>
        <div className="app-container">
            <Header />
            
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/comics" element={<Comics />} />
                    <Route path="/comic/:seriesId" element={<Comic />} />
                    <Route path="/comic/:seriesId/read/:episodeId" element={<Reader />} />
                    {/* Add more routes here as needed */}
                </Routes>
            </main>
            
            <Footer />
        </div>
        </ComicsProvider>
    </Router>
  )
}

export default App