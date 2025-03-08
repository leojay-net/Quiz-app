import { useEffect, useRef, useState } from 'react'
import { IQuestion } from '../components/question'

import { questions } from '../components/data'


export const useQuestion = () => {
    const [answers, setAnswers] = useState<{[key: number]: string} | null>(null)
      const [question, setQuestion] = useState<IQuestion>(questions[0])
      let score = useRef<number>(0)
    //   const [isOver, setIsOver] = useState<boolean>(false)
    
      useEffect(() => {
        console.log(score)
    
      }) 
      
    
      const _handleNextQuestion = (oldId: number) => {
        console.log(oldId)
        if (oldId > questions.length)
          console.log(questions.length)
        questions.map((question) => {
          setQuestion(prev => question.id === oldId + 1 ? { ...question } : prev)
          console.log(question.body)
        })
    
    
      }
    
      const _handlePrevQuestion = (oldId: number) => {
        console.log(oldId)
        if (oldId > 1 && oldId <= questions.length)
          console.log(questions.length)
        questions.map((question) => {
          setQuestion(prev => question.id === oldId - 1 ? { ...question } : prev)
          console.log(question.body)
        })
    
    
      }
    
      const _handleOptionSelection = (option: string, oldId: number) => {
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

      return { question, score, answers, _handleNextQuestion, _handlePrevQuestion, _handleOptionSelection }
    
      

}