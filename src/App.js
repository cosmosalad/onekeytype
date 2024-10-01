import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import OnekeyHybridEn from './pages/OnekeyHybridEn';
import OnekeyHybridKr from './pages/OnekeyHybridKr';
import OnekeySplitEn from './pages/OnekeySplitEn';
import OnekeySplitKr from './pages/OnekeySplitKr';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/onekeytype" element={<Home />} />
        <Route path="/onekey-hybrid-en" element={<OnekeyHybridEn />} />
        <Route path="/onekey-hybrid-kr" element={<OnekeyHybridKr />} />
        <Route path="/onekey-split-en" element={<OnekeySplitEn />} />
        <Route path="/onekey-split-kr" element={<OnekeySplitKr />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;