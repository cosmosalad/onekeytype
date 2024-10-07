import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import OnekeyHybridEn from './pages/OnekeyHybridEn';
import OnekeyHybridKr from './pages/OnekeyHybridKr';
import OnekeySplitEn from './pages/OnekeySplitEn';
import OnekeySplitKr from './pages/OnekeySplitKr';
import TypingPractice from './pages/TypingPractice';
import UsageGuideHybrid from './pages/UsageGuideHybrid';
import UsageGuideSplit from './pages/UsageGuideSplit';

import Home_gearpad from './pages/gearpad/Home_gearpad';
import GearpadKr from './pages/gearpad/GearpadKr';
import GearpadEn from './pages/gearpad/GearpadEn';
import TypingPractice_gearpad from './pages/gearpad/TypingPractice_gearpad';
import UsageGuidegearpad from './pages/gearpad/UsageGuidegearpad';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/onekey_hybrid_en" element={<OnekeyHybridEn />} />
        <Route path="/onekey_hybrid_kr" element={<OnekeyHybridKr />} />
        <Route path="/onekey_split_en" element={<OnekeySplitEn />} />
        <Route path="/onekey_split_kr" element={<OnekeySplitKr />} />
        <Route path="/typing_practice" element={<TypingPractice />} />
        <Route path="/usage_guide_hybrid" element={<UsageGuideHybrid />} />
        <Route path="/usage_guide_split" element={<UsageGuideSplit />} />

        <Route path="/gearpad" element={<Home_gearpad />} />
        <Route path="/gearpad/korean" element={<GearpadKr />} />
        <Route path="/gearpad/english" element={<GearpadEn />} />
        <Route path="/gearpad/typingpractice" element={<TypingPractice_gearpad />} />
        <Route path="/gearpad/usageguide" element={<UsageGuidegearpad />} />
      </Routes>
    </HashRouter>
  );
}

export default App;