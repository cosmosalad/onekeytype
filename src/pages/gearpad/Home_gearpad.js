import React from 'react';
import { Link } from 'react-router-dom';
import { ReactTyped } from "react-typed";

const Home = () => {
  const practiceTypes = [
    { name: 'Korean', path: '/gearpad/korean', description: 'Practice Korean with gearnumpad' },
    { name: 'English', path: '/gearpad/english', description: 'Practice english with gearnumpad' },
  ];

  const regularTyping = {
    name: 'Typing Practice',
    path: '/gearpad/typingpractice',
    description: 'Practice typing in English or Korean with various texts'
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 p-4">
      <h1 className="text-4xl font-bold mb-8 h-16">
        <ReactTyped
          strings={["Gearpad Typing Practice", "Gearpad 타이핑 연습"]}
          typeSpeed={40}
          backSpeed={50}
          backDelay={10000}
          loop
        />
      </h1>
      <div className="grid grid-cols-2 gap-4 mb-8 w-full max-w-2xl">
        <div className="flex flex-col space-y-4">
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
        <Link
          to={regularTyping.path}
          className="bg-white hover:bg-blue-100 text-blue-800 font-semibold py-4 px-6 border border-blue-400 rounded shadow transition duration-300 ease-in-out transform hover:scale-105 flex flex-col justify-center"
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
          <li>필요한 경우 더블 탭, 홀드를 사용하세요</li>
          <li><a href="https://vial.rocks/" className="text-blue-600 hover:underline">Vial Web</a></li>
        </ul>
      <div className="flex justify-center">
        <Link
          to="/gearpad/usageguide"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
        >
          Usage Guide
        </Link>
      </div>
      </div>
      <div className="mt-8 text-sm text-gray-600">
        © 2024 <a href="https://github.com/cosmosalad/" className="text-blue-600 hover:underline">cosmosalad</a>. All rights reserved.
      </div>
    </div>
  );
};

export default Home;