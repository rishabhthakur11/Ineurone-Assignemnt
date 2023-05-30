import React, { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-400 box-border">
      <div className="bg-red-200 p-20 rounded-md  border-2 border-transparent">
        <h1 className="text-4xl font-bold mb-10 text-center">Counter App</h1>
        <div className="flex items-center justify-center">
          <button
            className="text-white bg-blue-500 rounded-full px-6 py-2 mr-4"
            onClick={decrement}
          >
            Decrement
          </button>
          <p className="text-2xl font-bold p-4">{count}</p>
          <button
            className="text-white bg-blue-500 rounded-full px-6 py-2 ml-4"
            onClick={increment}
          >
            Increment
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
