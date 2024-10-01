import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const practiceTypes = [
    { name: 'Hybrid Korean', path: '/onekey-hybrid-kr', description: 'Practice Korean with hybrid keyboard' },
    { name: 'Split Korean', path: '/onekey-split-kr', description: 'Practice Korean with split keyboard' },
    { name: 'Hybrid English', path: '/onekey-hybrid-en', description: 'Practice English with hybrid keyboard' },
    { name: 'Split English', path: '/onekey-split-en', description: 'Practice English with split keyboard' },

  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 p-4">
      <h1 className="text-4xl font-bold mb-8">Onekey Keyboard Practice</h1>
      <div className="grid grid-cols-2 gap-4 mb-8">
        {practiceTypes.map((type, index) => (
          <Link 
            key={index} 
            to={type.path}
            className="bg-white hover:bg-blue-100 text-blue-800 font-semibold py-4 px-6 border border-blue-400 rounded shadow transition duration-300 ease-in-out transform hover:scale-105"
          >
            <h2 className="text-xl mb-2">{type.name}</h2>
            <p className="text-sm text-gray-600">{type.description}</p>
          </Link>
        ))}
      </div>
      <div className="text-center">
        <h3 className="text-2xl font-semibold mb-4">How to Play</h3>
        <ul className="text-left list-disc list-inside">
          <li>Choose a practice mode from the options above</li>
          <li>Type the character shown on the screen</li>
          <li>Use Fn key or double tap when necessary</li>
          <li>Try to increase your score and typing speed</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;