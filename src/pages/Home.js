import React from 'react';
import { Link } from 'react-router-dom';
import { ReactTyped } from "react-typed";

const Home = () => {
  const practiceTypes = [
    { name: 'Hybrid Korean', path: '/onekey_hybrid_kr', description: 'Practice Korean with hybrid keyboard' },
    { name: 'Independent Mode Korean', path: '/onekey_split_kr', description: 'Practice Korean with Independent Mode keyboard' },
    { name: 'Hybrid English', path: '/onekey_hybrid_en', description: 'Practice English with hybrid keyboard' },
    { name: 'Independent Mode English', path: '/onekey_split_en', description: 'Practice English with Independent Mode keyboard' },
  ];

  const regularTyping = {
    name: 'Typing Practice',
    path: '/typing_practice',
    description: 'Practice typing in English or Korean with various texts'
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 p-4">
      <h1 className="text-4xl font-bold mb-8 h-16">
        <ReactTyped
          strings={["Onekey Typing Practice", "원키 타이핑 연습"]}
          typeSpeed={40}
          backSpeed={50}
          backDelay={10000}
          loop
        />
      </h1>
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
        <h3 className="text-2xl font-semibold mb-4">사용 방법</h3>
        <ul className="text-left list-disc list-inside mb-4">
          <li>위의 옵션에서 원하는 연습 모드를 선택하세요</li>
          <li>화면에 표시된 문자나 텍스트를 입력하세요</li>
          <li>점수와 타이핑 속도를 높이도록 노력하세요</li>
          <li>필요한 경우 더블 탭, Fn키, 홀드를 사용하세요</li>
          <li><a href="https://vial.rocks/" className="text-blue-600 hover:underline">Vial Web</a></li>
        </ul>
      <div className="flex space-x-4">
        <Link
          to="/usage_guide_hybrid"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
        >
          Hybrid Usage Guide
        </Link>
        <Link
          to="/usage_guide_split"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
        >
          Independent Mode Usage Guide
        </Link>
      </div>
      </div>
      <div className="mt-5 flex justify-center">
        <Link
          to="/gearpad"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
        >
          Usage Guide
        </Link>
      </div>
      <div className="mt-8 text-sm text-gray-600">
        © 2024 <a href="https://github.com/cosmosalad/" className="text-blue-600 hover:underline">cosmosalad</a>. All rights reserved.
      </div>
    </div>
  );
};

export default Home;