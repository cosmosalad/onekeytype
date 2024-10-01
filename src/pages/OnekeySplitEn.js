import React, { useState, useEffect, useCallback } from 'react';

const OnekeySplitEn = () => {
  const [currentChar, setCurrentChar] = useState('');
  const [pressedKey, setPressedKey] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [lastKeyPressTime, setLastKeyPressTime] = useState(0);

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  const doubleTapMap = {
    'G': 'Q', 'V': 'Z', 'R': 'P', 'H': 'B', 'U': 'C', 'I': 'J', 'D': 'K', 'W': 'X'
  };

  const keyboard = [
    {
      row: [
        { key: 'ESC', x: 1, y: 0.5, fontSize: '20px' },
        { key: 'Alt', x: 2, y: 0.25, fontSize: '20px' },
        { key: 'G', x: 3, y: 0, topRight: 'Q', doubleTap: 'Q' },
        { key: 'V', x: 4, y: 0.25, topRight: 'Z', doubleTap: 'Z' },
        { key: 'F', x: 5, y: 0.5 },
      ]
    },
    {
      row: [
        { key: '기타', x: 0, y: -0.5 },
        { key: 'R', x: 1, y: 1, topRight: 'P', doubleTap: 'P' },
        { key: 'H', x: 2, y: 0.75, topRight: 'B', doubleTap: 'B' },
        { key: 'N', x: 3, y: 0.5 },
        { key: 'T', x: 4, y: 0.75 },
        { key: 'S', x: 5, y: 1 },
        { key: 'Back\nSpace', x: 6, y: 0, fontSize: '18px' }
      ]
    },
    {
      row: [
        { key: '영문', x: 0, y: 0 },
        { key: 'U', x: 1, y: 1.5, topRight: 'C', doubleTap: 'C' },
        { key: 'A', x: 2, y: 1.25 },
        { key: 'E', x: 3, y: 1 },
        { key: 'O', x: 4, y: 1.25 },
        { key: 'I', x: 5, y: 1.5, topRight: 'J', doubleTap: 'J' },
        { key: '.', x: 6, y: 0.5 },
      ]
    },
    {
      row: [
        { key: '한글', x: 0, y: 0.5 },
        { key: 'D', x: 1, y: 2, topRight: 'K', doubleTap: 'K' },
        { key: 'W', x: 2, y: 1.75, topRight: 'X', doubleTap: 'X' },
        { key: 'Y', x: 3, y: 1.5 },
        { key: 'L', x: 4, y: 1.75 },
        { key: 'M', x: 5, y: 2, topRight: '?' },
        { key: 'Enter', x: 6, y: 1, fontSize: '20px' },
      ]
    },
    {
      row: [
        { key: 'Space', x: 0.35, y: 2.8, rotate: -30, height: 1.5, fontSize: '20px'  },
        { key: 'Shift', x: 1.45, y: 2.9, rotate: -15, fontSize: '20px' },
        { key: 'Ctrl', x: 2.5, y: 2.5, fontSize: '20px' },
      ]
    }
  ];

  const nextCharacter = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    setCurrentChar(alphabet[randomIndex]);
    setIsCorrect(null);
    setPressedKey('');
  }, []);

  const goBack = () => {
    window.history.back();
  };

  useEffect(() => {
    nextCharacter();
  }, []);

  const handleKeyPress = useCallback((event) => {
    const key = event.key.toUpperCase();
    const currentTime = new Date().getTime();
    
    if (alphabet.includes(key)) {
      let pressedChar = key;
      
      if (currentTime - lastKeyPressTime < 300 && doubleTapMap[pressedChar]) {
        pressedChar = doubleTapMap[pressedChar];
      }
      
      setPressedKey(pressedChar);
      setLastKeyPressTime(currentTime);
      
      checkInput(pressedChar);
    }
  }, [lastKeyPressTime, currentChar]);

  const checkInput = (input) => {
    if (input === currentChar) {
      setIsCorrect(true);
      setScore(prevScore => prevScore + 1);
      setTimeout(() => {
        nextCharacter();
      }, 500); // Move to next character after 0.5 seconds
    } else {
      setIsCorrect(false);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  const highlightKeys = [currentChar];
  Object.entries(doubleTapMap).forEach(([key, value]) => {
    if (value === currentChar) {
      highlightKeys.push(key);
    }
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 p-4">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">English Keyboard Practice</h1>
      <div className={`text-9xl mb-8 ${isCorrect === false ? 'text-red-500' : isCorrect === true ? 'text-green-500' : 'text-gray-800'}`}>
        {currentChar}
      </div>
      <div className="text-2xl mb-4 text-gray-700">Score: {score}</div>
      <div className="mb-8 relative" style={{ width: '600px', height: '400px' }}>
        {keyboard.map((row, rowIndex) => (
          <div key={rowIndex} className="absolute" style={{ top: `${rowIndex * 70}px` }}>
            {row.row.map((key, keyIndex) => (
              <div
                key={keyIndex}
                className={`absolute flex flex-col items-center justify-center border-2 rounded-lg shadow-md transition-all duration-150
                            ${highlightKeys.includes(key.key) ? 'bg-yellow-300 border-red-500' : 
                              key.key === pressedKey ? (isCorrect ? 'bg-green-300' : 'bg-red-300') : 
                              'bg-white border-gray-300 hover:bg-gray-100'}`}
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
                    fontSize: key.fontSize || '24px',
                    whiteSpace: 'pre-line',
                    lineHeight: '1.2',
                  }}>
                  {key.key}
                </div>
                {key.topRight && 
                 <div className="text-sm absolute top-1 right-1 text-gray-500">{key.topRight}</div>}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-4 text-gray-600 flex flex-col items-center" style={{ marginTop: '4rem' }}>
        {isCorrect === false && <p className="mb-2">Incorrect. Please try again.</p>}
        <p>Press the key corresponding to the displayed letter.</p>
      </div>
      <button onClick={goBack}
        className="mt-8 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
        Go Back
      </button>
    </div>
  );
};

export default OnekeySplitEn;