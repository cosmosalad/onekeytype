import React, { useState, useEffect, useCallback } from 'react';
import keyboardLayout from '../data/layout/Hybrid English.json';

const OnekeyHybridEn = () => {
  const [currentChar, setCurrentChar] = useState('');
  const [pressedKey, setPressedKey] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [isFnPressed, setIsFnPressed] = useState(false);
  const [lastKeyPressTime, setLastKeyPressTime] = useState(0);
  const [doubleTapKey, setDoubleTapKey] = useState('');
  const [keysToPress, setKeysToPress] = useState([]);
  const [showDetails, setShowDetails] = useState(false);

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  const keyboard = keyboardLayout;

  const nextCharacter = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    const newChar = alphabet[randomIndex];
    setCurrentChar(newChar);
    setIsCorrect(null);
    setPressedKey('');

    let keys = [];
    keyboard.forEach(row => {
      row.row.forEach(key => {
        if (key.key === newChar) {
          keys.push(key.key);
        } else if (key.FnTap === newChar) {
          keys.push('Fn', key.key);
        } else if (key.doubleTap === newChar) {
          keys.push(key.key, key.key);
        }
      });
    });
    setKeysToPress(keys);
  }, []);

  useEffect(() => {
    nextCharacter();
  }, [nextCharacter]);

  const handleKeyPress = useCallback((event) => {
    const key = event.key.toUpperCase();
    const currentTime = new Date().getTime();
    
    if (key === 'FN') {
      setIsFnPressed(true);
    } else if (alphabet.includes(key)) {
      let pressedChar = key;
      const keyInfo = keyboard.flatMap(row => row.row).find(k => k.key === key || k.FnTap === key || k.doubleTap === key);
      
      if (keyInfo) {
        if (isFnPressed) {
          pressedChar = keyInfo.FnTap || key;
        } else if (currentTime - lastKeyPressTime < 300 && key === doubleTapKey) {
          pressedChar = keyInfo.doubleTap || key;
        }
      }
      
      setPressedKey(pressedChar);
      setLastKeyPressTime(currentTime);
      setDoubleTapKey(key);
      checkInput(pressedChar);
    }
  }, [isFnPressed, lastKeyPressTime, doubleTapKey, currentChar]);

  const handleKeyUp = useCallback((event) => {
    if (event.key.toUpperCase() === 'FN') {
      setIsFnPressed(false);
    }
  }, []);

  const checkInput = (input) => {
    if (isCorrect) return;
  
    if (input === currentChar) {
      setIsCorrect(true);
      setScore(prevScore => prevScore + 1);
      setTimeout(() => {
        nextCharacter();
      }, 500);
    } else {
      setIsCorrect(false);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyPress, handleKeyUp]);

  const highlightKeys = [currentChar];
  let requiresFn = false;
  keyboard.forEach(row => {
    row.row.forEach(key => {
      if (key.key === currentChar || key.FnTap === currentChar || key.doubleTap === currentChar) {
        highlightKeys.push(key.key);
        if (key.FnTap === currentChar) {
          requiresFn = true;
        }
      }
    });
  });

  if (requiresFn) {
    highlightKeys.push('Space\n\nFn');
  }

  const goBack = () => {
    window.history.back();
  };

  const renderKeysToPress = () => {
    return (
      <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">Keys to press in order:</h3>
        <div className="flex justify-center space-x-2">
          {keysToPress.map((key, index) => (
            <div key={index} className="w-12 h-12 flex items-center justify-center bg-white border-2 border-gray-300 rounded-lg text-lg font-bold">
              {key}
            </div>
          ))}
        </div>
      </div>
    );
  };

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">English Keyboard Practice</h1>
      <div className={`text-9xl mb-2 ${isCorrect === false ? 'text-red-500' : isCorrect === true ? 'text-green-500' : 'text-gray-800'}`}>
        {currentChar}
      </div>
      <div className="text-2xl mb-4 text-gray-700">Score: {score}</div>
      <button 
        onClick={() => setShowDetails(!showDetails)} 
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        {showDetails ? '간단히 보기' : '자세히 보기'}
      </button>
      <div className="mb-6 relative" style={{ width: '600px', height: '400px' }}>
        {keyboard.map((row, rowIndex) => (
          <div key={rowIndex} className="absolute" style={{ top: `${rowIndex * 70}px` }}>
            {row.row.map((key, keyIndex) => (
              <div
                key={keyIndex}
                className={`absolute flex flex-col items-center justify-center border-2 rounded-lg shadow-md transition-all duration-150
                            ${highlightKeys.includes(key.key) ? 'bg-yellow-300 border-red-500' : 
                              key.key === pressedKey ? (isCorrect ? 'bg-green-300' : 'bg-red-300') : 
                              'bg-white border-gray-300 hover:bg-gray-100'}
                            ${key.key === 'Fn' && isFnPressed ? 'bg-blue-300' : ''}`}
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
      <div className="my-2"></div>
      {renderKeysToPress()}
      <div className="mt-4 text-gray-600 flex flex-col items-center" >
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

export default OnekeyHybridEn;