import React from "react";

const PlayerArea = ({
    value,
    clickOnChange,
    clickButton,
    isPlaying,
    score,
    time,
    word,
    finalHits,
    select,
    message
}) => {
    let btnTouch = "btn";
    if (isPlaying) {
        btnTouch = btnTouch + " touched";
    }

    return (
        <>
            <div className="results">
                {finalHits > 1 && !isPlaying ? (
                    <h3>
                        Final hits:<span>{finalHits}</span>
                    </h3>
                ) : (
                    <h3>
                        Hits:<span>{score}</span>
                    </h3>
                )}

                <h3>
                    Your Time:<span>{time}</span>{" "}
                </h3>
            </div>
            <div className="showWords">
                {!isPlaying && <h3>Your words will appear here...</h3>}
                {isPlaying && <span>{word}</span>}
            </div>
            <form>
                <label htmlFor="words" />
                <input
                    type="text"
                    name="value"
                    id="words"
                    value={value}
                    placeholder="Type word here"
                    onChange={clickOnChange}
                    autoFocus
                />
            </form>
            <button
                className={btnTouch}
                onClick={clickButton}
                disabled={!select || isPlaying}
            >
                Play
            </button>
            <div className="message">
                {finalHits < 1 ? (
                    <h6>To start game select your level and click "Play"</h6>
                ) : (
                    <h4 style={{ color: isPlaying ? "#036621" : "#9c0404" }}>
                        {message}
                    </h4>
                )}
            </div>
        </>
    );
};

export default PlayerArea;
