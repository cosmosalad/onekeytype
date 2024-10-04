import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const practiceTypes = [
    { name: 'Hybrid Korean', path: '/onekey-hybrid-kr', description: 'Practice Korean with hybrid keyboard' },
    { name: 'Independent Mode Korean', path: '/onekey-split-kr', description: 'Practice Korean with Independent Mode keyboard' },
    { name: 'Hybrid English', path: '/onekey-hybrid-en', description: 'Practice English with hybrid keyboard' },
    { name: 'Independent Mode English', path: '/onekey-split-en', description: 'Practice English with Independent Mode keyboard' },
  ];

  const regularTyping = {
    name: 'Typing Practice',
    path: '/typing-practice',
    description: 'Practice typing in English or Korean with various texts'
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 p-4">
      <h1 className="text-4xl font-bold mb-8">Onekey Keyboard Practice</h1>
      <div className="grid grid-cols-3 gap-4 mb-8 w-full max-w-6xl">
        {practiceTypes.slice(0, 2).map((type, index) => (
          <Link
            key={index}
            to={type.path}
            className="bg-white hover:bg-blue-100 text-blue-800 font-semibold py-4 px-6 border border-blue-400 rounded shadow transition duration-300 ease-in-out transform hover:scale-105"
          >
            <h2 className="text-xl mb-2">{type.name}</h2>
            <p className="text-sm text-gray-600">{type.description}</p>
          </Link>
        ))}
        <Link
          to={regularTyping.path}
          className="bg-white hover:bg-blue-100 text-blue-800 font-semibold py-4 px-6 border border-blue-400 rounded shadow transition duration-300 ease-in-out transform hover:scale-105 row-span-2 flex flex-col justify-center"
        >
          <h2 className="text-2xl mb-2">{regularTyping.name}</h2>
          <p className="text-sm text-gray-600">{regularTyping.description}</p>
        </Link>
        {practiceTypes.slice(2).map((type, index) => (
          <Link
            key={index + 2}
            to={type.path}
            className="bg-white hover:bg-blue-100 text-blue-800 font-semibold py-4 px-6 border border-blue-400 rounded shadow transition duration-300 ease-in-out transform hover:scale-105"
          >
            <h2 className="text-xl mb-2">{type.name}</h2>
            <p className="text-sm text-gray-600">{type.description}</p>
          </Link>
        ))}
      </div>
      <div className="text-center max-w-2xl">
        <h3 className="text-2xl font-semibold mb-4">How to Play</h3>
        <ul className="text-left list-disc list-inside">
          <li>Choose a practice mode from the options above</li>
          <li>Type the character or text shown on the screen</li>
          <li>Use Fn key or double tap when necessary</li>
          <li>Try to increase your score and typing speed</li>
        </ul>
      </div>
      <div className="mt-8 text-sm text-gray-600">
        © 2024 <a href="https://github.com/cosmosalad/" className="text-blue-600 hover:underline">cosmosalad</a>. All rights reserved.
      </div>
    </div>
  );
};

export default Home;