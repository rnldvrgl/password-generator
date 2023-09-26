import React from "react";

const Slider = ({ min, max, value, onChange }) => {
    return (
        <div className="flex justify-between mx-0 my-3">
            <input
                type="range"
                min={min}
                max={max}
                value={value}
                onChange={onChange}
                className="w-full accent-secondary"
            />
            <span className="ml-2 font-bold text-primary">{value}</span>
        </div>
    );
};

export default Slider;
