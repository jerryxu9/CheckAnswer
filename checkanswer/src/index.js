import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


let questionSet = ["8 x 1",
                "11 x 3",
                "6 x 4",
                "4 x 7",
                "6 x 7",
                "8 x 8",
                "13 x 12",
                "9 x 3",
                "11 x 12",
                "1 x 1"   
                ]

let answerSet = [8,33,24,28,42,64,156,27,121,1]

let choiceSet = [
            [1,2,3,8],
            [3,4,33,5],
            [6,24,7,8],
            [28,9,10,11],
            [12,13,14,42],
            [15,16,64,17],
            [18,156,19,20],
            [27,21,22,23],
            [24,25,26,121],
            [27,28,1,29]
            ]

function Choice(props){
    return(
        <button onClick = {() => props.handleClick(props.choice)} class = "choice">{props.choice}
        </button>
    )
}

function Choices(props){
    return(
        <div id = {props.id}>
            <Choice choice = {props.choice[0]} handleClick = {props.handleClick}/>
            <Choice choice = {props.choice[1]} handleClick = {props.handleClick}/>
            <Choice choice = {props.choice[2]} handleClick = {props.handleClick}/>
            <Choice choice = {props.choice[3]} handleClick = {props.handleClick}/>
        </div>
    )
}

function Question(props){
    return(
        <div id = {props.id}>
            <h1>{props.question}</h1>
        </div>
    )
}

function CorrectAnswers(props){
    return(
        <div id={props.id}>
            <h2>Correct: {props.correct}</h2>
        </div>
    )
}

function IncorrectAnswers(props){
    return(
        <div id= {props.id}>
            <h2>Incorrect: {props.incorrect}</h2>
        </div>
    )
}

class Game extends React.Component{
    constructor(props){
        super(props)
        this.state = {correct:0, incorrect:0, number:0}
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(choice){
        if(answerSet[this.state.number] === choice){
            this.setState({number:this.state.number + 1, correct:this.state.correct + 1})
        }
        else{
            this.setState({number: this.state.number + 1, incorrect: this.state.incorrect + 1})
        }
    }
    restart(){
        this.setState({number:0,correct:0,incorrect:0})
    }

    render(){
        return this.state.number < 10 ? (
            <div id = "game">
                <Question id = "question" question = {"What is " + questionSet[this.state.number]} />
                <Choices id = "choices" choice = {choiceSet[this.state.number]} handleClick = {this.handleClick}/>
                <CorrectAnswers id = "correctAnswers" correct = {this.state.correct} />
                <IncorrectAnswers id = "incorrectAnswers" incorrect = {this.state.incorrect}/> 
            </div>
        ) : (
            <div>
                <h2>
                    {"Your score is: " + this.state.correct + "/10"}
                </h2>
                <button onClick = {() => this.restart()}>Restart</button>
            </div>
        )
    }
}

ReactDOM.render(
    <Game/>,
    document.getElementById("root")
)