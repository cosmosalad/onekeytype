import React, { useState, useEffect, useCallback } from 'react';
import keyboardLayout from '../data/layout/Split Korean.json';

const OnekeySplitKr = () => {
  const [currentChar, setCurrentChar] = useState('');
  const [pressedKey, setPressedKey] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [lastKeyPressTime, setLastKeyPressTime] = useState(0);
  const [composingKeys, setComposingKeys] = useState([]);
  const [isConsonant, setIsConsonant] = useState(true);
  const [keysToPress, setKeysToPress] = useState([]);
  const [showDetails, setShowDetails] = useState(false);

  const koreanKeyMap = {
    'q': 'ㅂ', 'w': 'ㅈ', 'e': 'ㄷ', 'r': 'ㄱ', 't': 'ㅅ', 'y': 'ㅛ', 'u': 'ㅕ', 'i': 'ㅑ', 'o': 'ㅐ', 'p': 'ㅔ',
    'a': 'ㅁ', 's': 'ㄴ', 'd': 'ㅇ', 'f': 'ㄹ', 'g': 'ㅎ', 'h': 'ㅗ', 'j': 'ㅓ', 'k': 'ㅏ', 'l': 'ㅣ',
    'z': 'ㅋ', 'x': 'ㅌ', 'c': 'ㅊ', 'v': 'ㅍ', 'b': 'ㅠ', 'n': 'ㅜ', 'm': 'ㅡ',
    'Q': 'ㅃ', 'W': 'ㅉ', 'E': 'ㄸ', 'R': 'ㄲ', 'T': 'ㅆ',
    'O': 'ㅒ', 'P': 'ㅖ'
  };

  const doubleTapMap = {
    'ㅂ': 'ㅍ', 'ㅈ': 'ㅊ', 'ㄱ': 'ㅋ'
  };

  const doubleConsonantMap = {
    'ㅂ': 'ㅃ', 'ㅈ': 'ㅉ', 'ㄷ': 'ㄸ', 'ㄱ': 'ㄲ', 'ㅅ': 'ㅆ'
  };

  const cheonjinMap = {
    'ㅣ': { key: 'IN', char: 'ㅣ' },
    'ㆍ': { key: 'ARAE_A', char: 'ㆍ' },
    'ㅡ': { key: 'JI', char: 'ㅡ' }
  };

  const composedVowels = {
    'ㅣㆍㆍㅣ': 'ㅒ',
    'ㆍㆍㅣㅣ': 'ㅖ',
    'ㅣㆍ': 'ㅏ',
    'ㆍㅣ': 'ㅓ',
    'ㆍㅡ': 'ㅗ',
    'ㅡㆍ': 'ㅜ',
    'ㅡㆍㆍ': 'ㅠ',
    'ㅣㆍㆍ': 'ㅑ',
    'ㆍㆍㅡ': 'ㅛ',
    'ㆍㆍㅣ': 'ㅕ',
    'ㅣㆍㅣ': 'ㅐ',
    'ㆍㅣㅣ': 'ㅔ'
  };

  const vowelComponents = {
    'ㅏ': ['ㅣ', 'ㆍ'],
    'ㅓ': ['ㆍ', 'ㅣ'],
    'ㅗ': ['ㆍ', 'ㅡ'],
    'ㅜ': ['ㅡ', 'ㆍ'],
    'ㅑ': ['ㅣ', 'ㆍ', 'ㆍ'],
    'ㅛ': ['ㆍ', 'ㆍ', 'ㅡ'],
    'ㅠ': ['ㅡ', 'ㆍ', 'ㆍ'],
    'ㅕ': ['ㆍ', 'ㆍ', 'ㅣ'],
    'ㅐ': ['ㅣ', 'ㆍ', 'ㅣ'],
    'ㅔ': ['ㆍ', 'ㅣ', 'ㅣ'],
    'ㅒ': ['ㅣ', 'ㆍ', 'ㆍ', 'ㅣ'],
    'ㅖ': ['ㆍ', 'ㆍ', 'ㅣ', 'ㅣ'],
  };

  const consonants = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ';
  const vowels = 'ㅏㅑㅓㅕㅗㅛㅜㅠㅡㅣㅐㅒㅔㅖ';

  const keyboard = keyboardLayout;

  const nextCharacter = useCallback(() => {
    const characters = isConsonant ? consonants : vowels;
    const randomIndex = Math.floor(Math.random() * characters.length);
    const newChar = characters[randomIndex];
    setCurrentChar(newChar);
    setIsCorrect(null);
    setPressedKey('');
    setComposingKeys([]);
    setIsConsonant(!isConsonant);

  if (vowelComponents[newChar]) {
    setKeysToPress(vowelComponents[newChar]);
  } else if (Object.values(doubleTapMap).includes(newChar)) {
    const keyToPress = Object.keys(doubleTapMap).find(key => doubleTapMap[key] === newChar);
    setKeysToPress([keyToPress, keyToPress]);
  } else if (Object.values(doubleConsonantMap).includes(newChar)) {
    const keyToPress = Object.keys(koreanKeyMap).find(key => koreanKeyMap[key] === newChar);
    setKeysToPress(['Shift', keyToPress.toLowerCase()]);
  } else {
    const keyToPress = Object.keys(koreanKeyMap).find(key => koreanKeyMap[key] === newChar);
    setKeysToPress(keyToPress ? [keyToPress] : []);
  }
}, [isConsonant]);

  const goBack = () => {
    window.history.back();
  };

  useEffect(() => {
    nextCharacter();
  }, []);

  const handleKeyPress = useCallback((event) => {
    const key = event.key;
    const currentTime = new Date().getTime();

    if (koreanKeyMap[key]) {
      let pressedChar = koreanKeyMap[key];

      if (!event.shiftKey && currentTime - lastKeyPressTime < 300 && doubleTapMap[pressedChar]) {
        pressedChar = doubleTapMap[pressedChar];
      }

      setPressedKey(pressedChar);
      setLastKeyPressTime(currentTime);

      const newComposingKeys = [...composingKeys, pressedChar];
      setComposingKeys(newComposingKeys);
      checkInput(pressedChar, newComposingKeys);
    } else if (Object.values(cheonjinMap).some(item => item.key === key.toUpperCase())) {
      const cheonjinChar = Object.values(cheonjinMap).find(item => item.key === key.toUpperCase()).char;
      const newComposingKeys = [...composingKeys, cheonjinChar];
      setComposingKeys(newComposingKeys);

      checkInput(cheonjinChar, newComposingKeys);
    }
  }, [koreanKeyMap, lastKeyPressTime, currentChar, composingKeys]);

  const checkInput = (input, keys) => {
    if (isCorrect) return;

    let composed = input;

    if (keys.length > 1) {
      for (let i = keys.length; i > 1; i--) {
        const subComposed = composedVowels[keys.slice(-i).join('')];
        if (subComposed) {
          composed = subComposed;
          break;
        }
      }
    }

    if (composed === currentChar) {
      setIsCorrect(true);
      setScore(prevScore => prevScore + 1);
      setTimeout(() => {
        nextCharacter();
      }, 500);
      setComposingKeys([]);
    } else {
      setIsCorrect(false);
      if (composed !== input && composedVowels[keys.join('')]) {
        setComposingKeys([]);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  const highlightKeys = vowelComponents[currentChar] || [currentChar];

  Object.entries(doubleTapMap).forEach(([key, value]) => {
    if (value === currentChar) {
      highlightKeys.push(key);
    }
  });

  Object.entries(doubleConsonantMap).forEach(([key, value]) => {
    if (value === currentChar) {
      highlightKeys.push(key);
      highlightKeys.push('Shift');
    }
  });

  const getKeyContent = (key) => {
    if (showDetails) {
      if (key.key === '. ,') {
        return '탭1: .\n탭2: ,';
      }
      let content = `탭1: ${key.key}\n`;
      if (doubleTapMap[koreanKeyMap[key.key.toUpperCase()]]) {
        content += `탭2: ${doubleTapMap[koreanKeyMap[key.key.toUpperCase()]]}\n`;
      }
      if (doubleConsonantMap[koreanKeyMap[key.key.toUpperCase()]]) {
        content += `Shift: ${doubleConsonantMap[koreanKeyMap[key.key.toUpperCase()]]}\n`;
      }
      return content.trim();
    }
    return key.key;
  };

  const renderKeysToPress = () => {
    return (
      <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">눌러야 할 자판 순서:</h3>
        <div className="flex justify-center space-x-2">
          {keysToPress.map((key, index) => (
            <div key={index} className="w-12 h-12 flex items-center justify-center bg-white border-2 border-gray-300 rounded-lg text-lg font-bold">
              {key in koreanKeyMap ? koreanKeyMap[key] : key}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">한글 키보드 자리 연습</h1>
      <div className={`text-9xl mb-2 ${isCorrect === false ? 'text-red-500' : isCorrect === true ? 'text-green-500' : ''}`}>
        {currentChar}
      </div>
      <div className="text-2xl mb-4 text-gray-700">점수: {score}</div>
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
                    fontSize: showDetails ? '18px' : (key.fontSize || '35px'),
                    whiteSpace: 'pre-line',
                    lineHeight: '1.2',
                  }}
                >
                  {getKeyContent(key)}
                </div>
                {!showDetails && (
                  <>
                    {key.topRight && 
                     <div className="text-[16px] absolute top-1 right-1">{key.topRight}</div>}
                  </>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="my-2"></div>
      {renderKeysToPress()}
      <p className="mt-4 text-gray-600 flex flex-col items-center" >
        {isCorrect === false ? '틀렸습니다. 다시 시도해주세요.' : '화면에 표시된 한글 자모음에 해당하는 키를 눌러주세요.'}
      </p>
      <div className="mt-2 text-sm text-gray-500">
        타이핑: {composedVowels[composingKeys.join('')] || composingKeys[composingKeys.length - 1] || ''}
      </div>
      <button onClick={goBack}
        className="mt-8 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
        뒤로 가기
      </button>
    </div>
  );
<<<<<<< HEAD
};
=======
};
>>>>>>> de7e28b6a6d48f4d909568b61557b2a6904915ef
