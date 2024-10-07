import React, { useState } from 'react';
import keyboardLayout from '../data/layout/Usage Guide split.json';

const OnekeyHybridEn = () => {
  const [showDetails, setShowDetails] = useState(false);

  const keyboard = keyboardLayout;

  const goBack = () => {
    window.history.back();
  };

  const getKeyContent = (key) => {
    if (showDetails) {
      if (key.key === '') {
        return '';
      }
      if (key.key === 'Space\n\nFn') {
        return '탭1: Space\n\n홀드:Fn';
      }
      if (key.key === '. ,') {
        return '탭1: .\n탭2: ,';
      }
      let content = `탭1: ${key.key}\n`;
      if (key.doubleTap) content += `탭2: ${key.doubleTap}\n`;
      if (key.doubleConsonant) content += `Shift: ${key.doubleConsonant}\n`;
      if (key.shift) content += `Shift: ${key.shift}\n`;
      if (key.FnTap) content += `Fn: ${key.FnTap}\n`;
      if (key.fnsft) content += `FnSft: ${key.fnsft}\n`;
      if (key.fndoubleTap) content += `Fn탭2: ${key.fndoubleTap}`;
      return content.trim();
    }
    return key.key;
  };

  const keyboardSections = [
    { name: "한글", description: "'한글' 키를 누르면 사용가능합니다.", x: 3.17, y: 0 },
    { name: "영문", description: "'영문' 키를 누르면 사용가능합니다.", x: 11.21, y: 0 },
    { name: "기타", description: "'기타' 키를 누르면 사용가능합니다.", x: 19.29, y: 0 },
  ];

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col justify-center">
      <div className="p-4" style={{ width: '1960px' }}>
        <h1 className="text-3xl font-bold mb-6 text-gray-800">OneKey Independent Mode Usage Guide</h1>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="mb-20 px-4 py-2 bg-blue-500 text-white rounded"
        >
          {showDetails ? '간단히 보기' : '자세히 보기'}
        </button>
        <div className="relative" style={{ height: '400px' }}>
          {keyboardSections.map((section, index) => (
            <div 
              key={index} 
              className="absolute text-center"
              style={{
                left: `${section.x * 75}px`,
                top: '-50px',
                fontSize: '30px',
                fontWeight: '800'
              }}>
              {section.name}
            </div>
          ))}
          {keyboard.map((row, rowIndex) => (
            <div key={rowIndex} className="absolute" style={{ top: `${rowIndex * 64}px`,transform: 'scale(0.9)' }}>
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
                    }}>
                    {getKeyContent(key)}
                  </div>
                  {!showDetails && (
                    <>
                      {key.topRight &&
                        <div className="text-sm absolute top-1 right-1 text-gray-500">{key.topRight}</div>}
                      {key.bottomRight &&
                        <div className="text-lg absolute bottom-1 right-1 text-gray-500">{key.bottomRight}</div>}
                    </>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-32 text-lg text-gray-700">
          <h2 className="font-bold mb-2">키보드 섹션 설명:</h2>
          <ul>탭1: 키를 한번 눌러주세요, 탭2: 키를 두번 눌러주세요
            {keyboardSections.map((section, index) => (
              <li key={index}><strong>{section.name}:</strong> {section.description}</li>
            ))}
          </ul>
        </div>
        <button onClick={goBack}
          className="mt-8 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
          Go Back
        </button>
      </div>
    </div>
  );
};

export default OnekeyHybridEn;