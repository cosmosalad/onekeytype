import React, { useState, useEffect, useCallback } from 'react';

const OnekeyHybridKr = () => {
  const [currentChar, setCurrentChar] = useState('');
  const [pressedKey, setPressedKey] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [lastKeyPressTime, setLastKeyPressTime] = useState(0);
  const [composingKeys, setComposingKeys] = useState([]);
  const [isConsonant, setIsConsonant] = useState(true);
  
  const koreanKeyMap = {
    'q': 'ㅂ', 'w': 'ㅈ', 'e': 'ㄷ', 'r': 'ㄱ', 't': 'ㅅ', 'y': 'ㅛ', 'u': 'ㅕ', 'i': 'ㅑ', 'o': 'ㅐ', 'p': 'ㅔ',
    'a': 'ㅁ', 's': 'ㄴ', 'd': 'ㅇ', 'f': 'ㄹ', 'g': 'ㅎ', 'h': 'ㅗ', 'j': 'ㅓ', 'k': 'ㅏ', 'l': 'ㅣ',
    'z': 'ㅋ', 'x': 'ㅌ', 'c': 'ㅊ', 'v': 'ㅍ', 'b': 'ㅠ', 'n': 'ㅜ', 'm': 'ㅡ',
    'Q': 'ㅃ', 'W': 'ㅉ', 'E': 'ㄸ', 'R': 'ㄲ', 'T': 'ㅆ',
    'O': 'ㅒ', 'P': 'ㅖ'
  };

  const doubleTapMap = {
    'ㅂ': 'ㅍ', 'ㄱ': 'ㅋ'
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

  const keyboard = [
    {
      row: [
        { key: '1', x: 1, y: 0.5 },
        { key: '2', x: 2, y: 0.25 },
        { key: '3', x: 3, y: 0 },
        { key: '4', x: 4, y: 0.25 },
        { key: '5', x: 5, y: 0.5 },
      ]
    },
    {
      row: [
        { key: '넘패드', x: 0, y: -0.5 },
        { key: 'ㅂ', x: 1, y: 1, topRight: 'ㅍ', doubleTap: 'ㅍ', doubleConsonant: 'ㅃ' },
        { key: 'ㅈ', x: 2, y: 0.75, doubleConsonant: 'ㅉ' },
        { key: 'ㅇ', x: 3, y: 0.5 },
        { key: 'ㄱ', x: 4, y: 0.75, topRight: 'ㅋ', doubleTap: 'ㅋ', doubleConsonant: 'ㄲ' },
        { key: 'ㅎ', x: 5, y: 1 },
        { key: 'Back Space', x: 6, y: 0, fontSize: '18px' }
      ]
    },
    {
      row: [
        { key: 'Alt', x: 0, y: 0, fontSize: '20px' },
        { key: 'ㄴ', x: 1, y: 1.5 },
        { key: 'ㅣ', x: 2, y: 1.25, cheonjin: true },
        { key: 'ㆍ', x: 3, y: 1, cheonjin: true },
        { key: 'ㅡ', x: 4, y: 1.25, cheonjin: true },
        { key: 'ㅅ', x: 5, y: 1.5, doubleConsonant: 'ㅆ' },
        { key: '기타', x: 6, y: 0.5 },
      ]
    },
    {
      row: [
        { key: '. ,', x: 0, y: 0.5 },
        { key: 'ㅌ', x: 1, y: 2 },
        { key: 'ㄷ', x: 2, y: 1.75, doubleConsonant: 'ㄸ' },
        { key: 'ㅁ', x: 3, y: 1.5 },
        { key: 'ㄹ', x: 4, y: 1.75 },
        { key: 'ㅊ', x: 5, y: 2 },
        { key: 'Enter', x: 6, y: 1, fontSize: '20px' },
      ]
    },
    {
      row: [
        { key: 'Space\n\nFn', x: 0.35, y: 2.8, rotate: -30, height: 1.5, fontSize: '20px'  },
        { key: 'Shift', x: 1.45, y: 2.9, rotate: -15, fontSize: '20px' },
        { key: 'Ctrl', x: 2.5, y: 2.5, fontSize: '20px' },
      ]
    }
  ];

  const nextCharacter = useCallback(() => {
    const characters = isConsonant ? consonants : vowels;
    const randomIndex = Math.floor(Math.random() * characters.length);
    setCurrentChar(characters[randomIndex]);
    setIsCorrect(null);
    setPressedKey('');
    setComposingKeys([]);
    setIsConsonant(!isConsonant);
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
    let composed = input;
    
    // 복합 모음 처리를 위한 로직 개선
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
      }, 500); // 0.5초 후에 다음 문제로 넘어감
      setComposingKeys([]); // 입력이 맞으면 composingKeys 초기화
    } else {
      setIsCorrect(false);
      // 복합 모음이 완성되었지만 현재 문제와 다른 경우
      if (composed !== input && composedVowels[keys.join('')]) {
        setComposingKeys([]); // 복합 모음이 완성되면 composingKeys 초기화
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 p-4">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">한글 키보드 자리 연습</h1>
      <div className={`text-9xl mb-8 ${isCorrect === false ? 'text-red-500' : isCorrect === true ? 'text-green-500' : ''}`}>
        {currentChar}
      </div>
      <div className="text-2xl mb-4 text-gray-700">점수: {score}</div>
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
                  }}
                >
                  {key.key}
                </div>
                {koreanKeyMap[key.key.toUpperCase()] && 
                 <div className="text-[8px] absolute top-0 left-0">{koreanKeyMap[key.key.toUpperCase()]}</div>}
                {key.topRight && 
                 <div className="text-[16px] absolute top-0 right-0">{key.topRight}</div>}
              </div>
            ))}
          </div>
        ))}
      </div>
      <p className="mt-4 text-gray-600 flex flex-col items-center" style={{ marginTop: '4rem' }}>
        {isCorrect === false ? '틀렸습니다. 다시 시도해주세요.' : '화면에 표시된 한글 자모음에 해당하는 키를 눌러주세요.'}
      </p>
      <div className="mt-2 text-sm text-gray-500">
        타이핑: {composedVowels[composingKeys.join('')] || composingKeys[composingKeys.length - 1] || ''}
      </div>
      <button onClick={goBack}
          className="mt-8 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
          Go Back
        </button>
    </div>
  );
};

export default OnekeyHybridKr;