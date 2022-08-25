import React from "react"
import IntroPage from "./components/IntroPage"
import QuestionsPage from "./components/QuestionsPage"
import Loading from "./components/LoadingPage"
import {nanoid} from "nanoid"
import {shuffle} from "./utils"
import parse from 'html-react-parser'


export default function App(){
    const API_URL="https://opentdb.com/api.php?amount=5&type=multiple"
    
    const [started, setStarted] = React.useState(false)
    const [ended, setEnded]= React.useState(false)
    const [questions, setQuestions] = React.useState([])
    const [isLoading, setIsLoading]= React.useState(false)
    
    React.useEffect(()=>{
        getQuestions()
    },[])
    function processQuestons(questions){
        return (
            questions.map(question => ({
             id:nanoid(),
             ...question,
             question:parse(question.question),
             answers:shuffle([
                    ...(question.incorrect_answers.map(answer => (
                        {id:nanoid(),
                        correct:false,
                        text:parse(answer)}
                    ))),
                    {id:nanoid() ,correct:true,text:parse(question.correct_answer)}
                ])
            })
            )
        )
    }
    async function getQuestions(){
        setIsLoading(true)        
        const res = await fetch(API_URL)
        const data = await res.json()
        setQuestions(processQuestons(data.results))
        setIsLoading(false)        
    }
        
    async function restart(){
        getQuestions()
        setEnded(false)
    }
 
    const page = 
                started ? 
                    isLoading?
                        <Loading/>:
                        <QuestionsPage 
                            questions={questions}
                            restart={restart}
                            ended={ended}
                            end={()=> setEnded(true)} /> :
                    <IntroPage start={()=>setStarted(true)} />
    
    return page
}