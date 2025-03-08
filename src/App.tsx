import { useEffect, useRef, useState } from 'react'
import './App.css'

import { Question, IQuestion } from './components/question'
import { questions } from './components/data'

// interface IRef {
//   id: number;
//   answer: string;
// }

function App() {
  const [answers, setAnswers] = useState<{[key: number]: string} | null>(null)
  const [question, setQuestion] = useState<IQuestion>(questions[0])
  let score = useRef<number>(0)
  const [isOver, setIsOver] = useState<boolean>(false)

  useEffect(() => {
    console.log(score)

  }) 
  

  const handleNextQuestion = (oldId: number) => {
    console.log(oldId)
    if (oldId > questions.length)
      console.log(questions.length)
    questions.map((question) => {
      setQuestion(prev => question.id === oldId + 1 ? { ...question } : prev)
      console.log(question.body)
    })


  }

  const handlePrevQuestion = (oldId: number) => {
    console.log(oldId)
    if (oldId > 1 && oldId <= questions.length)
      console.log(questions.length)
    questions.map((question) => {
      setQuestion(prev => question.id === oldId - 1 ? { ...question } : prev)
      console.log(question.body)
    })


  }

  const handleOptionSelection = (option: string, oldId: number) => {
    console.log("Before", answers)
    if (oldId >= 1 && oldId <= questions.length) {
      let newAnswers = answers ? {...answers} : {}
 
      newAnswers[oldId]=option
      
      console.log("NEW ANSWERS", newAnswers)
      
      setAnswers(newAnswers)
      
      let _score = 0
      questions.forEach((question) => {
        // answers[]
        console.log("score before", _score)
        
        newAnswers && newAnswers[question.id] &&  newAnswers[question.id]===question.answer ? _score++ : _score
        
      })
      console.log("score After", _score)
      score.current = _score
    }
  }

  const handleScore = () => {
    setIsOver(true)

  }


  return (
    <>
    <h1 className="text-3xl font-bold text-center my-6 text-blue-600">
      QUIZ APP
    </h1>
  
    {!isOver ? (
      <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
        {question.body === "" ? (
          <h3 className="text-red-500 font-semibold">No Question</h3>
        ) : (
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
        )}
  
        <button
          onClick={handleScore}
          className="bg-green-500 text-white p-3 mt-6 rounded-md w-full hover:bg-green-600 transition"
        >
          Done
        </button>
      </div>
    ) : (
      <h2 className="text-2xl font-bold text-center my-6">
        Total Score: {score.current} / {questions.length}
      </h2>
    )}
  </>
  
  )
}

export default App
