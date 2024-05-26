import React from 'react';
import logo from './logo.svg';
import './App.css'; 
import { useState } from 'react';

export interface ISquareProps{
  value: String;
  id: number;
  onClick: (id: number) => void;
} 

function Square() {
  const [value, setValue] = useState(String);

  const handleClick = () => {
    setValue("x");
  }

  return <button className="square" onClick={handleClick}>{value}</button>
}
export default function Board() {
  
  return(
    <>
    <div className='boardRow'>
      <Square />
      <Square />
      <Square />
    </div>

    <div className='boardRow'>
      <Square />
      <Square />
      <Square />
    </div>

    <div className='boardRow'>
      <Square />
      <Square />
      <Square />
    </div>
  </>
  )
}


