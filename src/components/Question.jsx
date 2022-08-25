import React from "react"
import Answer from "./Answer"

export default function Question(props){
    const [selectedAnswer,setSelectedAnswer]=React.useState({id:0,correct:false})
    
    React.useEffect(()=>{props.setCorrect(selectedAnswer.correct)},[selectedAnswer])
    function changeAnswer(selectedId){
        if(selectedAnswer.id === selectedId){
            setSelectedAnswer({id:0,correct:false})
        }else
        setSelectedAnswer(
            props.answers.find(({id})=>id===selectedId)
        )
    }
    
    const answerElements = props.answers.map(answer => 
        <Answer 
        key={answer.id}
        disabled={props.disabled}  
        answer={answer.text} 
        selected={answer.id===selectedAnswer.id}
        setSelectedAnswer={()=>changeAnswer(answer.id)} 
        isCorrect={answer.correct}/>
    )
    return (
        <div  className="question" >
            <h2 className="question--title">{props.question}</h2>
            <div className="answer--container">
                {answerElements}
            </div>
            <hr className="question--line"/>
        </div>
    )
}