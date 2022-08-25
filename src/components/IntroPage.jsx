import React from "react"
export default function IntroPage(props){
    return (
        <main className="intro">
            <img className="intro--blob--1" src="../images/blob1.svg"/>
            <img className="intro--blob--2" src="../images/blob2.svg"/>
            <h1 className="intro--title">Quizzical</h1>
            <p className="intro--description">Test your trivia knowledge in this mini-game made in react by <a href="https://github.com/MmeK" target="_blank">me</a>!</p>
            <button className="intro--start" onClick={props.start}>Start Quiz</button>
        </main>
        )
}