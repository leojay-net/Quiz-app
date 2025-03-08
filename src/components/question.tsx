import React, { useCallback } from "react";

export interface IQuestion {
  id: number;
  body: string;
  options: string[]
  answer: string
}

export interface IQuestionFunctions extends IQuestion {
  handleNextQuestion: () => void;
  handlePrevQuestion: () => void;
  handleOptionSelection: (option: string) => void;
  selectedOption: string | null;
}

export const Question: React.FC<IQuestionFunctions> = ({ id, body, options, selectedOption, handleNextQuestion, handlePrevQuestion, handleOptionSelection }) => {
  const btnFocus = useCallback((e: HTMLButtonElement | null, option: string | null) => {
    if (option === selectedOption && e) {
      e.focus();
    }
  }, [selectedOption]);

  // Letters for option labels
  const optionLetters = ['A', 'B', 'C', 'D', 'E', 'F'];

  return (
    <>
      {body && options ? (
        <div className="flex flex-col items-center p-6 rounded-xl shadow-lg max-w-md mx-auto bg-white">
          <div className="w-full mb-4">
            <span className="text-orange-500 text-3xl font-bold">{id}</span>
          </div>
          <h3 className="text-xl font-bold mb-6 text-center text-indigo-900">{body}</h3>
          <div className="flex flex-col space-y-4 mb-6 w-full">
            {options.map((option, index) => (
              <div><button
                key={index}
                onClick={() => handleOptionSelection(option)}
                ref={(e) => btnFocus(e, option)}
                className={`w-full p-3 rounded-lg border-2 transition-all flex items-center 
                  ${selectedOption === option 
                    ? 'bg-indigo-600 text-white border-indigo-700' 
                    : 'bg-white text-indigo-900 border-indigo-200 hover:border-indigo-400'}`}
              >
                <span className={`flex items-center justify-center w-10 h-10 rounded-full mr-4
                  ${selectedOption === option 
                    ? 'bg-indigo-500 text-white' 
                    : 'bg-indigo-100 text-indigo-700'}`}>
                  {optionLetters[index] + ". "}
                </span>
                <span className="text-left">{option}</span>
              </button>
              <br></br></div>
            ))}
          </div>
          <div className="flex justify-between w-full mt-4">
            {id === 1 ? (
              <button
                disabled
                className="bg-gray-200 text-gray-500 py-3 px-6 rounded-lg w-1/3 font-medium"
              >
                Previous
              </button>
            ) : (
              <button
                onClick={handlePrevQuestion}
                className="bg-indigo-100 text-indigo-700 py-3 px-6 rounded-lg w-1/3 font-medium hover:bg-indigo-200 transition"
              >
                Previous
              </button>
            )}
            {id === 10 ? ( // Assuming 10 questions, adjust as needed
              <button
                disabled
                className="bg-gray-200 text-gray-500 py-3 px-6 rounded-lg w-1/3 font-medium"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="bg-indigo-600 text-white py-3 px-6 rounded-lg w-1/3 font-medium hover:bg-indigo-700 transition"
              >
                Next
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
};