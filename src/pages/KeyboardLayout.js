import React, { useState } from 'react';
import HybridEnglishLayout from '../data/layout/Hybrid English.json';
import HybridKoreanLayout from '../data/layout/Hybrid Korean.json';
import SplitEnglishLayout from '../data/layout/Split English.json';
import SplitKoreanLayout from '../data/layout/Split Korean.json';

const KeyboardLayout = ({ layout }) => {
  const [showDetails, setShowDetails] = useState(false);

  const getLayout = () => {
    switch(layout) {
      case 'Hybrid English': return HybridEnglishLayout;
      case 'Hybrid Korean': return HybridKoreanLayout;
      case 'Split English': return SplitEnglishLayout;
      case 'Split Korean': return SplitKoreanLayout;
      default: return HybridEnglishLayout;
    }
  };

  const currentLayout = getLayout();

  const getKeyContent = (key) => {
    if (showDetails) {
      if (key.key === 'Space\n\nFn') {
        return '탭1: Space\n\n홀드:Fn';
      }
      if (key.key === '. ,') {
        return '탭1: .\n탭2: ,';
      }

      let content = `탭1: ${key.key}\n`;
      if (key.doubleTap) {
        content += `탭2: ${key.doubleTap}\n`;
      }
      if (key.FnTap) {
        content += `Fn: ${key.bottomRight}\n`;
      }
      if (key.doubleConsonant) {
        content += `Shift: ${key.doubleConsonant}`;
      }
      return content.trim();
    }
    return key.key;
  };

  return (
    <div className="flex flex-col items-center">
      <button 
        onClick={() => setShowDetails(!showDetails)} 
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        {showDetails ? '간단히 보기' : '자세히 보기'}
      </button>
      <div className="mb-8 relative" style={{ width: '600px', height: '400px' }}>
        {currentLayout.map((row, rowIndex) => (
          <div key={rowIndex} className="absolute" style={{ top: `${rowIndex * 70}px` }}>
            {row.row.map((key, keyIndex) => (
              <div
                key={keyIndex}
                className={`absolute flex flex-col items-center justify-center border-2 rounded-lg shadow-md transition-all duration-150 bg-white border-gray-300 hover:bg-gray-100`}
                style={{
                  left: `${key.x * 84}px`,
                  top: `${key.y * 30}px`,
                  transform: `rotate(${key.rotate || 0}deg)`,
                  width: key.width ? `${key.width * 80}px` : '80px',
                  height: key.height ? `${key.height * 80}px` : '80px',
                }}
              >
                <div
                  className="font-bold text-center"
                  style={{
                    fontSize: showDetails ? '18px' : (key.fontSize || '35px'),
                    whiteSpace: 'pre-line',
                    lineHeight: '1.2',
                  }}
                >
                  {getKeyContent(key)}
                </div>
                {!showDetails && (
                  <>
                    {key.topRight && (
                      <div className="text-sm absolute top-1 right-1 text-gray-500">{key.topRight}</div>
                    )}
                    {key.bottomRight && (
                      <div className="text-lg absolute bottom-1 right-1 text-gray-500">{key.bottomRight}</div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeyboardLayout;