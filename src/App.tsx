import { useEffect, useRef, useState } from 'react';
import './App.css';

import { Question, IQuestion } from './components/question';
import { questions } from './components/data';

function App() {
  const [answers, setAnswers] = useState<{[key: number]: string} | null>(null);
  const [question, setQuestion] = useState<IQuestion>(questions[0]);
  let score = useRef<number>(0);
  const [isOver, setIsOver] = useState<boolean>(false);

  useEffect(() => {
    console.log(score);
  });

  const handleNextQuestion = (oldId: number) => {
    if (oldId < questions.length) {
      const nextQuestion = questions.find(q => q.id === oldId + 1);
      if (nextQuestion) {
        setQuestion(nextQuestion);
      }
    }
  };

  const handlePrevQuestion = (oldId: number) => {
    if (oldId > 1) {
      const prevQuestion = questions.find(q => q.id === oldId - 1);
      if (prevQuestion) {
        setQuestion(prevQuestion);
      }
    }
  };

  const handleOptionSelection = (option: string, oldId: number) => {
    if (oldId >= 1 && oldId <= questions.length) {
      let newAnswers = answers ? {...answers} : {};
      newAnswers[oldId] = option;
      setAnswers(newAnswers);
      
      let _score = 0;
      questions.forEach((question) => {
        if (newAnswers[question.id] && newAnswers[question.id] === question.answer) {
          _score++;
        }
      });
      score.current = _score;
    }
  };

  const handleScore = () => {
    setIsOver(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-700 to-purple-600 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10 text-white">
          PEOPLE QUIZ
        </h1>
        
        {!isOver ? (
          <div className="relative">
            {/* Quiz decoration elements */}
            <div className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4">
              <div className="w-24 h-24 rounded-full bg-yellow-400 bg-opacity-90 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border-4 border-indigo-900 bg-yellow-500 relative">
                  {/* Simplified globe dots */}
                  <div className="absolute w-2 h-2 bg-indigo-900 rounded-full top-2 left-2"></div>
                  <div className="absolute w-2 h-2 bg-indigo-900 rounded-full bottom-2 right-3"></div>
                </div>
              </div>
            </div>
            
            <Question
              key={question.id}
              {...question}
              handleNextQuestion={() => handleNextQuestion(question.id)}
              handlePrevQuestion={() => handlePrevQuestion(question.id)}
              handleOptionSelection={(option: string) =>
                handleOptionSelection(option, question.id)
              }
              selectedOption={answers ? answers[question.id] : null}
            />
            
            <button
              onClick={handleScore}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-6 rounded-lg w-full mt-8 font-semibold text-lg shadow-lg hover:from-green-600 hover:to-emerald-700 transition"
            >
              Finish Quiz
            </button>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <h2 className="text-3xl font-bold text-indigo-900 mb-4">
              Quiz Complete!
            </h2>
            <div className="py-8">
              <span className="text-6xl font-bold text-indigo-600">{score.current}</span>
              <span className="text-4xl text-gray-400">/{questions.length}</span>
            </div>
            <p className="text-xl text-gray-600 mb-6">
              {score.current === questions.length 
                ? "Perfect score! Excellent work!" 
                : score.current > questions.length / 2 
                  ? "Good job! You did well!" 
                  : "You can do better. Try again!"}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-indigo-600 text-white py-3 px-8 rounded-lg font-medium hover:bg-indigo-700 transition"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;