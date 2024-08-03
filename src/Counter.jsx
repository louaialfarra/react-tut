import React, { useState } from "react";

function Counter() {
  const [counter, setCounter] = useState(0);
  const [name, SetName] = useState();
  const [color, setColor] = useState("yellow");

  const handleIncr = () => {
    setCounter(counter + 1);
  };
  const handleDecrement = () => {
    setCounter(counter - 1);
  };
  const handlereset = () => {
    setCounter(0);
  };
  const handleValueChange = (event) => {
    SetName(event.target.value);
  };
  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  return (
    <>
      <h1>this is Counter {counter} </h1>
      <button onClick={handleDecrement}>Decriment</button>
      <button onClick={handlereset}>Reset</button>
      <button onClick={handleIncr}>incriment</button>
      ss
      <input placeholder="enter ur name" onChange={handleValueChange} />
      <h4> Hello {name}</h4>
      <div>
        <input type="color" onChange={handleColorChange} />
        <p style={{ backgroundColor: color }}> color is : {color}</p>
      </div>
    </>
  );
}
export default Counter;
