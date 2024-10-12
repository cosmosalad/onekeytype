import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import KeyboardLayout from './KeyboardLayout';

const TypingPractice = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('');
  const [texts, setTexts] = useState([]);
  const [selectedText, setSelectedText] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [cpm, setCpm] = useState(0);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showKeyboardOptions, setShowKeyboardOptions] = useState(false);
  const [currentLayout, setCurrentLayout] = useState('');
  const [showKeyboard, setShowKeyboard] = useState(false);

  useEffect(() => {
    if (language) {
      import(`../data/${language}.json`)
        .then(module => setTexts(module.default))
        .catch(error => console.error('Error loading JSON:', error));
    }
  }, [language]);

  const countKoreanCharacters = useCallback((text) => {
    let count = 0;
    for (let i = 0; i < text.length; i++) {
      const charCode = text.charCodeAt(i);
      if (charCode >= 0xAC00 && charCode <= 0xD7A3) {
        const syllableCode = charCode - 0xAC00;
        const jong = syllableCode % 28;
        count += jong === 0 ? 2 : 3;
      } else if ((charCode >= 0x3131 && charCode <= 0x314E) || (charCode >= 0x314F && charCode <= 0x3163)) {
        count += 1;
      } else {
        count += 1;
      }
    }
    return count;
  }, []);

  const calculateCPM = useCallback(() => {
    if (startTime && selectedText) {
      const now = Date.now();
      const timeElapsed = (now - startTime) / 60000; // 분 단위
      let totalCharacters = 0;

      if (language === 'kr') {
        for (let i = 0; i < currentLineIndex; i++) {
          totalCharacters += countKoreanCharacters(selectedText.text[i]);
        }
        totalCharacters += countKoreanCharacters(userInput);
      } else {
        totalCharacters = selectedText.text.slice(0, currentLineIndex).join('').length + userInput.length;
      }

      return Math.round(totalCharacters / timeElapsed);
    }
    return 0;
  }, [startTime, selectedText, currentLineIndex, userInput, language, countKoreanCharacters]);

  useEffect(() => {
    if (startTime && !isCompleted) {
      const interval = setInterval(() => {
        setCpm(calculateCPM());
      }, 100);
      return () => clearInterval(interval);
    }
  }, [calculateCPM, startTime, isCompleted]);

  const resetPractice = useCallback(() => {
    setUserInput('');
    setCurrentLineIndex(0);
    setIsCompleted(false);
    setStartTime(null);
    setCpm(0);
  }, []);

  const handleLanguageSelect = useCallback((lang) => {
    setLanguage(lang);
    setSelectedText(null);
    resetPractice();
    // 현재 레이아웃을 유지
    setShowKeyboard(true);
  }, [resetPractice]);

  const handleTextSelect = useCallback((text) => {
    setSelectedText(text);
    resetPractice();
  }, [resetPractice]);

  const handleInputChange = useCallback((e) => {
    const input = e.target.value;
    if (!startTime) {
      setStartTime(Date.now());
    }
    setUserInput(input);
  }, [startTime]);

  const findCurrentWordBoundaries = useCallback((text, cursorIndex) => {
    let start = cursorIndex;
    let end = cursorIndex;
    
    while (start > 0 && !/\s/.test(text[start - 1])) {
      start--;
    }
    
    while (end < text.length && !/\s/.test(text[end])) {
      end++;
    }
    
    return { start, end };
  }, []);

  const renderCurrentLine = useCallback(() => {
    if (!selectedText) return null;
    
    const currentLine = selectedText.text[currentLineIndex];
    const { start: wordStart, end: wordEnd } = findCurrentWordBoundaries(currentLine, userInput.length);

    return currentLine.split('').map((char, index) => {
      let className = 'text-gray-800';
      let underline = false;

      if (index < userInput.length) {
        if (char === userInput[index]) {
          className = 'text-blue-500';
        } else if (index === userInput.length - 1) {
          className = 'text-gray-800';
        } else {
          className = 'text-red-500';
        }
      }

      if (index >= wordStart && index < wordEnd && index >= userInput.length) {
        underline = true;
      }

      return (
        <span key={index} className={`relative ${className}`}>
          {char}
          {underline && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500"></span>
          )}
        </span>
      );
    });
  }, [selectedText, currentLineIndex, userInput, findCurrentWordBoundaries]);

  const checkLineCompletion = useCallback(() => {
    if (userInput === selectedText.text[currentLineIndex]) {
      if (currentLineIndex < selectedText.text.length - 1) {
        setCurrentLineIndex(prevIndex => prevIndex + 1);
        setUserInput('');
      } else {
        setIsCompleted(true);
      }
      return true;
    }
    return false;
  }, [userInput, selectedText, currentLineIndex]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || (e.key === ' ' && userInput === selectedText.text[currentLineIndex])) {
      e.preventDefault();
      checkLineCompletion();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setUserInput('');
    }
  }, [checkLineCompletion, userInput, selectedText, currentLineIndex]);

  const handleGoBack = useCallback(() => {
    if (selectedText) {
      setSelectedText(null);
      resetPractice();
    } else if (language) {
      setLanguage('');
      setTexts([]);
    } else {
      navigate('/onekeytype');
    }
  }, [selectedText, language, resetPractice, navigate]);

  const toggleKeyboardOptions = () => {
    setShowKeyboardOptions(!showKeyboardOptions);
    if (showKeyboardOptions) {

      setShowKeyboard(false);
      setCurrentLayout('');
    }
  };

  const changeLayout = (layout) => {
    setCurrentLayout(layout);
    setShowKeyboard(layout !== '');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 p-4">
      <div className="absolute top-4 left-4 flex items-center">
        <button
          onClick={toggleKeyboardOptions}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors mr-4"
        >
          {showKeyboardOptions ? 'Hide Keyboard' : 'Show Keyboard'}
        </button>
        {showKeyboardOptions && (
          <select
            value={currentLayout}
            onChange={(e) => changeLayout(e.target.value)}
            className="px-2 py-1 border border-gray-300 rounded"
          >
            <option value="">Select Layout</option>
            <option value="Hybrid English">Hybrid English</option>
            <option value="Hybrid Korean">Hybrid Korean</option>
            <option value="Split English">Split English</option>
            <option value="Split Korean">Split Korean</option>
          </select>
        )}
      </div>
      
      {showKeyboard && currentLayout && <KeyboardLayout layout={currentLayout} />}
      <div className="h-20"></div>
      {!language && (
        <>
          <div className="mb-6 space-x-4">
            {['en', 'kr'].map((lang) => (
              <button
                key={lang}
                onClick={() => handleLanguageSelect(lang)}
                className="px-8 py-4 bg-white text-blue-800 font-semibold rounded shadow transition duration-300 ease-in-out transform hover:scale-105 active:scale-95" 
                style={{ fontSize: '30px' }}>
                {lang === 'en' ? 'English' : 'Korean'}
              </button>
            ))}
          </div>
          <button
            onClick={handleGoBack}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
            Go Back to Home
          </button>
        </>
      )}

      {language && !selectedText && (
        <div className="grid grid-cols-2 gap-4 mb-8 animate-fade-in">
          {texts.map((text, index) => (
            <button
              key={index}
              onClick={() => handleTextSelect(text)}
              className="bg-white hover:bg-blue-100 text-blue-800 font-semibold py-4 px-6 border border-blue-400 rounded shadow transition duration-300 ease-in-out transform hover:scale-105 active:scale-95"
            >
              <h2 className="text-xl">{text.name}</h2>
            </button>
          ))}
        </div>
      )}

      {selectedText && !isCompleted && (
        <div className="w-full max-w-3xl">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">{selectedText.name}</h2>
          <div className="mb-6 text-xl leading-relaxed bg-white p-4 rounded shadow">
            {renderCurrentLine()}
          </div>
          <div className="relative w-full">
            <div className="absolute inset-0 bg-white border border-blue-300 rounded shadow"></div>
            <input
              type="text"
              value={userInput}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="relative w-full p-4 text-xl bg-transparent focus:outline-none"
            />
          </div>
          <div className="mt-4 text-xl font-semibold text-gray-800">
            Current Speed: {cpm} CPM
          </div>
          <div className="mt-2 text-lg text-gray-600">
            Line: {currentLineIndex + 1} / {selectedText.text.length}
          </div>
        </div>
      )}

      {isCompleted && (
        <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">수고하셨습니다!</h2>
          <p className="text-2xl mb-6">최종 타이핑 속도: {cpm} CPM</p>
          <button
            onClick={handleGoBack}
            className="px-6 py-2 bg-blue-500 text-white rounded shadow text-lg transition duration-300 ease-in-out hover:scale-105 active:scale-95"
          >
            New Practice
          </button>
        </div>
      )}

      {(language || selectedText) && !isCompleted && (
        <button
          onClick={handleGoBack}
          className="mt-8 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
          Go Back
        </button>
      )}
    </div>
  );
};

export default TypingPractice;