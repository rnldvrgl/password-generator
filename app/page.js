"use client"

import Arrow from '@/components/Arrow';
import Checkbox from '@/components/CheckBox';
import Copy from '@/components/Copy';
import PasswordHistoryItem from '@/components/PasswordHistoryItem';
import Slider from '@/components/Slider';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function Home() {
  const [password, setPassword] = useState("");
  const [len, setLen] = useState(8);
  const [upper, setUpper] = useState(false);
  const [lower, setLower] = useState(false);
  const [number, setNumber] = useState(false);
  const [symbol, setSymbol] = useState(false);
  const [passwordHistory, setPasswordHistory] = useState([]);

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

    if (newPassword == '') {
      return;
    }

    setPassword(newPassword);
    setPasswordHistory([...passwordHistory, newPassword]);
  };

  const handleCopyToClipboard = () => {
    if (!password) {
      return;
    }

    navigator.clipboard.writeText(password)
      .then(() => {
        toast.success('Password copied to clipboard', {
          position: 'top-right',
          duration: 2000,
        });
      })
      .catch((error) => {
        console.error('Copy to clipboard failed:', error);
        toast.error('Copy to clipboard failed');
      });
  };


  return (
    <main className="flex items-stretch justify-center min-h-screen p-24 border">
      <div className='flex flex-col justify-start w-full h-full lg:flex-row gap-y-6 gap-x-24'>
        <div className='flex flex-col w-full gap-y-6 h-fit'>
          <h1 className='max-w-xl text-5xl font-bold tracking-wide uppercase text-primary'>Password Generator</h1>
          <button onClick={handleCopyToClipboard} className='relative w-full max-w-4xl p-5 px-6 overflow-y-scroll truncate border text-start bg-secondary/10 border-secondary text-secondary'>
            {password ? password : 'Generate a Password'}
            <span className='absolute flex p-0 font-semibold top-2 right-2 gap-x-4 text-dark text-start'>
              <Copy />
            </span>
          </button>
          <div className='grid grid-cols-2 gap-y-7'>
            <div className='col-span-2'>
              <Slider
                min={1}
                max={30}
                value={len}
                onChange={(e) => setLen(e.target.value)}
              />
            </div>
            <Checkbox id="upper" label="Uppercase Letters" onChange={() => setUpper(!upper)} />
            <Checkbox id="lower" label="Lowercase Letters" onChange={() => setLower(!lower)} />
            <Checkbox id="numbers" label="Numbers" onChange={() => setNumber(!number)} />
            <Checkbox id="symbols" label="Symbols" onChange={() => setSymbol(!symbol)} />
            <button className='w-full col-span-2 py-5 border bg-primary border-danger px-14 text-dark' onClick={generatePassword}>Generate Password_</button>
          </div>
        </div>
        <div className='flex flex-col w-full h-full'>
          <div className="flex flex-col justify-between h-full space-y-12s">
            <div className="mb-4">
              <div className='flex justify-between'>
                <h2 className="text-2xl">Password History</h2>
                <button className='px-4 py-2 border border-primary text-primary' onClick={() => {
                  if (passwordHistory.length == 0) {
                    return;
                  }
                  setPasswordHistory([])
                  toast.success('Password history cleared', {
                    position: 'top-right',
                    duration: 2000,
                  });
                }}>
                  Clear History
                </button>
              </div>
              <div className="flex flex-col mt-2 gap-y-2">
                {passwordHistory.length > 0 ? (
                  passwordHistory.map((password, index) => (
                    <PasswordHistoryItem
                      key={index}
                      password={password}
                    />
                  ))
                ) : (
                  <div className='mt-16 text-center'>
                    No generated password
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}