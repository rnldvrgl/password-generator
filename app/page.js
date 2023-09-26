"use client"

import React, { useState } from 'react';
import PasswordHistoryItem from '@/components/PasswordHistoryItem';
import Slider from '@/components/Slider';
import Checkbox from '@/components/CheckBox';
import Copy from '@/components/Copy';
import toast from 'react-hot-toast';

const Home = () => {
  const [password, setPassword] = useState('');
  const [len, setLen] = useState(8);
  const [upper, setUpper] = useState(false);
  const [lower, setLower] = useState(false);
  const [number, setNumber] = useState(false);
  const [symbol, setSymbol] = useState(false);
  const [passwordHistory, setPasswordHistory] = useState([]);

  const upperLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowerLetters = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+=';

  const getCharacter = (characters) => {
    return characters[Math.floor(Math.random() * characters.length)];
  };

  const generatePassword = () => {
    const characters = [];
    if (upper) characters.push(getCharacter(upperLetters));
    if (lower) characters.push(getCharacter(lowerLetters));
    if (number) characters.push(getCharacter(numbers));
    if (symbol) characters.push(getCharacter(symbols));

    for (let i = characters.length; i < len; i++) {
      characters.push(getCharacter(upperLetters + lowerLetters + numbers + symbols));
    }

    const newPassword = characters.join('');
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
          position: 'bottom-right',
          duration: 2000,
        });
      })
      .catch((error) => {
        console.error('Copy to clipboard failed:', error);
        toast.error('Copy to clipboard failed');
      });
  };

  const clearPasswordHistory = () => {
    if (passwordHistory.length === 0) {
      return;
    }
    setPasswordHistory([]);
    toast.success('Password history cleared', {
      position: 'bottom-right',
      duration: 2000,
    });
  };

  return (
    <main className='flex flex-col w-full h-full min-h-screen p-20 lg:flex-row gap-y-6 gap-x-24'>
      <div className='flex flex-col w-full lg:justify-between gap-y-6'>
        <section className='flex flex-col gap-y-6'>
          <h1 className='max-w-xl mb-6 text-5xl font-bold tracking-wide uppercase text-primary'>Password Generator</h1>
          <button onClick={handleCopyToClipboard} className='relative w-full max-w-4xl p-5 px-6 overflow-y-scroll truncate border text-start bg-secondary/10 border-secondary text-secondary'>
            {password ? password : 'Generate a Password'}
            <span className='absolute flex p-0 font-semibold top-2 right-2 gap-x-4 text-dark text-start'>
              <Copy fill="#00F0FF" />
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
            <button className='w-full col-span-2 py-5 border bg-primary border-danger px-14 text-dark' onClick={generatePassword}>Generate Password</button>
          </div>
        </section>
        <section className='items-center justify-center hidden lg:flex'>
          <h1 className='font-bold'>Created By: Ronald Vergel Dela Cruz</h1>
        </section>
      </div>
      <div className="flex flex-col justify-between w-full space-y-12s">
        <div className="mb-4">
          <div className='flex items-center justify-between'>
            <h2 className="text-2xl font-bold uppercase">Password History</h2>
            <button className='px-4 py-2 border border-primary text-primary hover:bg-danger/10' onClick={clearPasswordHistory}>
              Clear History
            </button>
          </div>
          <div className="flex flex-col mt-4 overflow-auto max-h-[calc(256px-1rem)] lg:max-h-[calc(770px-1rem)] gap-y-2">
            {passwordHistory.length > 0 ? (
              passwordHistory.toReversed().map((password, index) => (
                <PasswordHistoryItem
                  key={index}
                  password={password}
                  onCopy={() => {
                    navigator.clipboard.writeText(password)
                      .then(() => {
                        toast.success('Password copied to clipboard', {
                          position: 'bottom-right',
                          duration: 2000,
                        });
                      })
                      .catch((error) => {
                        console.error('Copy to clipboard failed:', error);
                        toast.error('Copy to clipboard failed');
                      });
                  }}
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
    </main >
  );
}

export default Home;
