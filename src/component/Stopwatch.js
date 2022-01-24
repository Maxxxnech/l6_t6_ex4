import React, { PureComponent } from "react";
import "./css/Stopwatch.css";

export default class Stopwatch extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      running: false,
      value: 0,
    };
    this.interval = null;
    //Шаг секундомера
    this.step = 0.1;

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.reset = this.reset.bind(this);
    this.valueParser = this.valueParser.bind(this);
  }

  componentWillUnmount() {
    if (this.state.running) {
      clearInterval(this.interval);
    }
  }
  render() {
    return (
      <div className="stopWatchWrapper">
        <header>
          <button onClick={this.start} disabled={this.state.running}>Старт</button>
          <button onClick={this.stop} disabled={!this.state.running}>Стоп</button>
          <button onClick={this.reset}>Сброс</button>
        </header>
        <div className="dials">{this.valueParser(this.state.value)}</div>
      </div>
    );
  }
  
  //Добавляем ноль перед цифрой
  addZero(num){
    return num < 10 ? ("0" + num) : num;
  }
  // Добавляем десятые секунды
  add2Zeros(num){
    if(num % 1 === 0){
       num =  num + ".0"
    }
    return   num < 10 ? ("0" + num) : num;
  }
  valueParser(number){
    var fixedNumber =  +number.toFixed(1);
    var hours =  Math.floor(fixedNumber / 3600) ;
    var minutes = Math.floor((fixedNumber - hours * 3600) / 60);   
    var seconds = fixedNumber - minutes * 60 - hours * 3600;
    return `${this.addZero(hours)}:${this.addZero(minutes)}:${this.add2Zeros(seconds)}`
  }

  start() {
    if(this.state.running) return;
    this.interval = setInterval(() => {
      this.setState((prevState) => ({
        running: true,
        value: prevState.value + this.step,
      }));
      console.log("Running: " + this.state.value);
    }, this.step * 1000);
  }

  stop() {
    this.setState({running: false});
    clearInterval(this.interval);
    console.log("Stopped: " + this.state.value);
  }

  reset() {
    clearInterval(this.interval);  
    this.setState(prevState=>({
      running: false,
      value: 0,
    }));

    console.log("Reset: " + this.state.value);
  }
}
