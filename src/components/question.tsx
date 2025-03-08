import React, { useCallback, useRef } from "react";

import { questions } from "./data";

export interface IQuestion {
    id: number;
    body: string;
    options: string[]
    answer: string
}

export interface IQuestionFunctions extends IQuestion {
    handleNextQuestion: () => void;
    handlePrevQuestion: () => void;
    handleOptionSelection: (option:string) => void;
    selectedOption: string | null;
}

export const Question: React.FC<IQuestionFunctions> = ({id, body, options, selectedOption,  handleNextQuestion, handlePrevQuestion, handleOptionSelection }) => {

    const btnFocus = useCallback((e: HTMLButtonElement | null, option: string | null) => {
        if (option === selectedOption && e) {
            e.focus();
        }
    }, [selectedOption]);
    return (
        <>
          {body && options ? (
            <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-md max-w-md mx-auto">
              <h3 className="text-xl font-semibold mb-4 text-center">{body}</h3>
              <div className="flex flex-col space-y-2 mb-6">
                {options.map((option) => (
                  <button
                    key={options.indexOf(option)}
                    onClick={() => handleOptionSelection(option)}
                    ref={(e) => btnFocus(e, option)}
                    className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
                  >
                    {option}
                  </button>
                ))}
              </div>
              <div className="flex justify-between w-full">
                {id === 1 ? (
                  <button
                    disabled
                    className="bg-gray-300 text-gray-600 p-2 rounded-md w-1/3"
                  >
                    Prev Question
                  </button>
                ) : (
                  <button
                    onClick={handlePrevQuestion}
                    className="bg-green-500 text-white p-2 rounded-md w-1/3 hover:bg-green-600 transition"
                  >
                    Prev Question
                  </button>
                )}
                {id === questions.length ? (
                  <button
                    disabled
                    className="bg-gray-300 text-gray-600 p-2 rounded-md w-1/3"
                  >
                    Next Question
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="bg-green-500 text-white p-2 rounded-md w-1/3 hover:bg-green-600 transition"
                  >
                    Next Question
                  </button>
                )}
              </div>
            </div>
          ) : (
            <h3 className="text-center text-red-500 font-semibold mt-4">
              No Options
            </h3>
          )}
        </>
      );
}