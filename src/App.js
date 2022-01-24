import React, {useState} from 'react';
import './App.css';
import Stopwatch from './component/Stopwatch';
function App() {
  const [show, setShow] = useState(false);
  function handleClick(){
    setShow(!show);
  }
  return (
    <div className="App">
       <header>
       <h1>l6_t6 задание 4: секундомер</h1>
       <button onClick={handleClick}>{show? "Убрать секундомер" : "Показать секундомер"}</button>
       </header>
       {show && <Stopwatch />}
    </div>
  );
}

export default App;
