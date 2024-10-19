import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import OnekeyHybridEn from './pages/OnekeyHybridEn';
import OnekeyHybridKr from './pages/OnekeyHybridKr';
import OnekeySplitEn from './pages/OnekeySplitEn';
import OnekeySplitKr from './pages/OnekeySplitKr';
import TypingPractice from './pages/TypingPractice';
import UsageGuideHybrid from './pages/UsageGuideHybrid';
import UsageGuideSplit from './pages/UsageGuideSplit';

function App() {
  return (
    <BrowserRouter basename="/onekeytype">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/onekey_hybrid_en" element={<OnekeyHybridEn />} />
        <Route path="/onekey_hybrid_kr" element={<OnekeyHybridKr />} />
        <Route path="/onekey_split_en" element={<OnekeySplitEn />} />
        <Route path="/onekey_split_kr" element={<OnekeySplitKr />} />
        <Route path="/typing_practice" element={<TypingPractice />} />
        <Route path="/usage_guide_hybrid" element={<UsageGuideHybrid />} />
        <Route path="/usage_guide_split" element={<UsageGuideSplit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;