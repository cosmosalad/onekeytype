import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//Onekey
import Home from './pages/Home';
import OnekeyHybridEn from './pages/OnekeyHybridEn';
import OnekeyHybridKr from './pages/OnekeyHybridKr';
import OnekeySplitEn from './pages/OnekeySplitEn';
import OnekeySplitKr from './pages/OnekeySplitKr';
import TypingPractice from './pages/TypingPractice';
import UsageGuideHybrid from './pages/UsageGuideHybrid';
import UsageGuideSplit from './pages/UsageGuideSplit';

//Gearpad
import GearpadEn from './pages/gearpad/GearpadEn';
import GearpadKr from './pages/gearpad/GearpadKr';
import Home_gearpad from './pages/gearpad/Home_gearpad';
import KeyboardLayout from './pages/gearpad/KeyboardLayout';
import TypingPractice_gearpad from './pages/gearpad/TypingPractice_gearpad';
import UsageGuidegearpad from './pages/gearpad/UsageGuidegearpad';

function App() {
  return (
    <BrowserRouter basename="/onekeytype">
      <Routes>
        {/* Onekey routes */}
        <Route path="/" element={<Home />} />
        <Route path="/onekey_hybrid_en" element={<OnekeyHybridEn />} />
        <Route path="/onekey_hybrid_kr" element={<OnekeyHybridKr />} />
        <Route path="/onekey_split_en" element={<OnekeySplitEn />} />
        <Route path="/onekey_split_kr" element={<OnekeySplitKr />} />
        <Route path="/typing_practice" element={<TypingPractice />} />
        <Route path="/usage_guide_hybrid" element={<UsageGuideHybrid />} />
        <Route path="/usage_guide_split" element={<UsageGuideSplit />} />

        {/* Gearpad routes */}
        <Route path="/gearpad" element={<Home_gearpad />} />
        <Route path="/gearpad/en" element={<GearpadEn />} />
        <Route path="/gearpad/kr" element={<GearpadKr />} />
        <Route path="/gearpad/layout" element={<KeyboardLayout />} />
        <Route path="/gearpad/typing" element={<TypingPractice_gearpad />} />
        <Route path="/gearpad/guide" element={<UsageGuidegearpad />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;