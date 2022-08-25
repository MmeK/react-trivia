import React from "react"
import clsx from 'clsx';

export default function Answer(props){
    const style = clsx('answer',props.isCorrect&&'answer--correct',!props.isCorrect&&"answer--incorrect",props.selected&&"answer--selected")
    return <button onClick={props.setSelectedAnswer} className={style} disabled={props.disabled}>{props.answer}</button>
}