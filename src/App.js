import React, { Component } from "react";
import Select from "./Components/Select";
import PlayerArea from "./Components/PlayerArea";
import items from "./words-store";
import { randomLossSentence, winnerSentence } from "./arrays";

class App extends Component {
    state = {
        isPlaying: false,
        value: "",
        select: "",
        score: 0,
        message: "",
        time: 0,
        word: "",
        finalHits: 0
    };

    handleForms = e => {
        const name = e.target.name;
        const targetValue = e.target.value;

        this.setState({
            [name]: targetValue
        });
    };

    setValue = () => {
        const { select } = this.state;
        this.time = 0;
        if (select === "easy") {
            this.time = 5;
            this.setState({
                time: 5
            });
            this.set = setInterval(this.intervalFn, 1000);
            this.intervalState = setInterval(this.stateInterval, 1000);
        } else if (select === "medium") {
            this.time = 3;
            this.setState({
                time: 3
            });
            this.set = setInterval(this.intervalFn, 1000);
            this.intervalState = setInterval(this.stateInterval, 1000);
        } else if (select === "hard") {
            this.time = 2;
            this.setState({
                time: 2
            });
            this.set = setInterval(this.intervalFn, 1000);
            this.intervalState = setInterval(this.stateInterval, 1000);
        } else if (select === "special") {
            this.special();
            this.set = setInterval(this.intervalFn, 1000);
            this.intervalState = setInterval(this.stateInterval, 1000);
        }
    };

    drawWords = () => {
        const randomWord = Math.floor(Math.random() * items.length);
        this.setState(prevState => ({
            word: (prevState.word = items[randomWord])
        }));
    };
    intervalFn = () => {
        let randomSentence;
        if (this.time > 0) {
            this.time--;
            if (this.time === 0) {
                if (this.state.score > 0) {
                    randomSentence = Math.floor(
                        Math.random() * randomLossSentence.length
                    );
                }
                this.setState({
                    isPlaying: false,
                    message: randomLossSentence[randomSentence],
                    score: 0
                });
            }
        }
    };
    stateInterval = () => {
        if (this.state.time > 0) {
            this.setState({
                time: this.state.time - 1
            });
        } else {
            clearInterval(this.intervalState);
            return;
        }
    };
    special = () => {
        const { score } = this.state;
        console.log(score);
        this.time = 5;
        this.setState({
            time: 5
        });
        if (score > 7) {
            this.time = 4;
            this.setState({
                time: 4
            });
        }
        if (score > 14) {
            this.time = 3;
            this.setState({
                time: 3
            });
        }
        if (score > 21) {
            this.time = 2;
            this.setState({
                time: 2
            });
        }
    };

    startGame = () => {
        clearInterval(this.set);
        clearInterval(this.intervalState);
        this.setState({
            value: "",
            message: "",
            score: 0,
            finalHits: 0,
            isPlaying: true
        });
        this.setValue();
        this.drawWords();
    };

    componentDidUpdate() {
        //console.log(this.time)
        const { isPlaying, word, value, score } = this.state;
        if (isPlaying) {
            if (word === value) {
                this.startGame();
                //console.log("Correct!");
                this.setState({
                    score: this.state.score + 1,
                    finalHits: this.state.finalHits + 1
                });
                if (score > 0) {
                    const randomSentence = Math.floor(
                        Math.random() * winnerSentence.length
                    );
                    this.setState({
                        message: winnerSentence[randomSentence]
                    });
                }
            }
        }
    }

    render() {
        const { message, isPlaying } = this.state;

        return (
            <div className="main">
                <header>
                    <h1>Hit Word</h1>
                </header>
                <Select
                    clickOnChange={this.handleForms}
                    {...this.state}
                    clickButton={this.startGame}
                />
                <PlayerArea
                    {...this.state}
                    clickOnChange={this.handleForms}
                    clickButton={this.startGame}
                />
            </div>
        );
    }
}
export default App;
