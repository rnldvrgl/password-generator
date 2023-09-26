
"use client"
// components/PasswordGenerator.js

import { useState } from "react";

const PasswordGenerator = ({ setPassword }) => {
    const [len, setLen] = useState(8);
    const [upper, setUpper] = useState(false);
    const [lower, setLower] = useState(false);
    const [number, setNumber] = useState(false);
    const [symbol, setSymbol] = useState(false);

    const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+=";

    const getLowercase = () => {
        return lowerLetters[Math.floor(Math.random() * lowerLetters.length)];
    };

    const getUppercase = () => {
        return upperLetters[Math.floor(Math.random() * upperLetters.length)];
    };

    const getNumber = () => {
        return numbers[Math.floor(Math.random() * numbers.length)];
    };

    const getSymbol = () => {
        return symbols[Math.floor(Math.random() * symbols.length)];
    };

    const generateX = () => {
        const xs = [];
        if (upper) xs.push(getUppercase());
        if (lower) xs.push(getLowercase());
        if (number) xs.push(getNumber());
        if (symbol) xs.push(getSymbol());

        if (xs.length === 0) return "";

        return xs[Math.floor(Math.random() * xs.length)];
    };

    const generatePassword = () => {
        let newPassword = "";

        if (upper) newPassword += getUppercase();
        if (lower) newPassword += getLowercase();
        if (number) newPassword += getNumber();
        if (symbol) newPassword += getSymbol();

        for (let i = newPassword.length; i < len; i++) {
            newPassword += generateX();
        }

        setPassword(newPassword);
        console.log(newPassword)
    };

    return (
        <div>
            <div className="flex justify-between mx-0 my-3">
                <input
                    type="range"
                    min="1"
                    max="100" // Adjust the maximum value as needed
                    value={len}
                    onChange={(e) => setLen(e.target.value)}
                    className="w-full"
                />
                <span className="ml-2">{len}</span>
            </div>

            <div className="flex justify-between mx-0 my-3">
                <input
                    type="number"
                    value={len}
                    onChange={(e) => setLen(e.target.value)}
                    min="1"
                />
            </div>
            <div className="flex justify-between mx-0 my-3">
                <label>
                    <input
                        type="checkbox"
                        checked={upper}
                        onChange={() => setUpper(!upper)}
                    />
                    Uppercase
                </label>
            </div>
            <div className="flex justify-between mx-0 my-3">
                <label>
                    <input
                        type="checkbox"
                        checked={lower}
                        onChange={() => setLower(!lower)}
                    />
                    Lowercase
                </label>
            </div>
            <div className="flex justify-between mx-0 my-3">
                <label>
                    <input
                        type="checkbox"
                        checked={number}
                        onChange={() => setNumber(!number)}
                    />
                    Number
                </label>
            </div>
            <div className="flex justify-between mx-0 my-3">
                <label>
                    <input
                        type="checkbox"
                        checked={symbol}
                        onChange={() => setSymbol(!symbol)}
                    />
                    Symbol
                </label>
            </div>
            <button onClick={generatePassword}>Generate Password</button>
        </div>
    );
};

export default PasswordGenerator;
