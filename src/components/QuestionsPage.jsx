import React from "react"
import Question from "./Question"
import clsx from 'clsx';
import Confetti from "react-confetti";

export default function QuestionsPage(props){
    
    const [questionsCorrectness, setQuestionsCorrectness] = 
        React.useState(props.questions.map(
            question=>({id:question.id,correct:false})
        ))
    
    function changeCorrects(correct,id){
        setQuestionsCorrectness(prevCorrects => {
                return prevCorrects.map(
                    isCorrect => (
                        isCorrect.id===id?{...isCorrect,correct:correct}:isCorrect
                    )
                )
            }
        )
    }
    const questionElements = props.questions.map(
        question => (<Question
            key= {question.id}
            id={question.id}
            question={question.question}
            answers={question.answers}
            disabled={props.ended}
            setCorrect={(correct)=>changeCorrects(correct,question.id)}
            />)
        )
    
    
    function calculateResults(){
        const corrects = questionsCorrectness.filter(q => q.correct).length
        return corrects?corrects:0
    }
    
    
    const style = clsx("questions", props.ended&&"questions--ended")
    console.log(style)
    return (
        <main className={style}>
            {props.ended && calculateResults()==props.questions.length && <Confetti width={window.innerWidth} height={window.innerHeight}/>}
            <img className="questions--blob--1" src="../images/blob3.svg"/>
            <img className="questions--blob--2" src="../images/blob4.svg"/>
            <div className="question--container">
            {questionElements}
            </div>
            {props.ended?
                (<div className="questions--score--container">
                    <h3 className="questions--score">{`You scored ${calculateResults()}/${props.questions.length} correct answers`}</h3>
                    <button className="questions--play--again" onClick={props.restart}>Play again</button>
                </div>):
                (<button className="questions--check--answers" onClick={()=>props.end(true)}>Check answers</button>)}
        </main>
    )
}