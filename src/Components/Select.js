import React from "react";

const Select = ({ select, isPlaying, clickOnChange, clickButton }) => (
    <div className="select">
        <label>
            <select name="select" value={select} onChange={clickOnChange}>
                <option value="">Choose level</option>
                <option value="easy">Lazy [5 secs]</option>
                <option value="medium">Quicker [3 secs]</option>
                <option value="hard">Speedy [2 secs]</option>
                <option value="special">Faster and Faster</option>
            </select>
        </label>
        <button onClick={clickButton} disabled={!select || isPlaying}>
            Play
        </button>
    </div>
);

export default Select;
