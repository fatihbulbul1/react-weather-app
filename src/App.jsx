import './App.css';
import React, { useState } from 'react';
function App() {
  let [query , setQuery] = useState('')
  const [weather , setWeather] = useState({})
  function date(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  const search = e =>{
    if (e.key === "Enter"){
      fetch(`${process.env.REACT_APP_BASE}weather?q=${query}&units=metric&APPID=${process.env.REACT_APP_WEATHER_API}`)
      .then(r => r.json())
      .then(res =>{
        setWeather(res)
        try {
          color(res.main.temp)
        } catch (error) {
          color('err')
        }
        query = ''
        document.getElementById('search-bar').value = ''
      })
    }
  }

  function color (e){
    if (e >= 30){
      document.getElementById('root').style.backgroundColor = '#fcba03'
    }
    else if (e < 30 && e >= 20){
      document.getElementById('root').style.backgroundColor = '#ffff00'
    }
    else if(e < 20 && e >= 10){
      document.getElementById('root').style.backgroundColor = '#00b7ff'
    }
    else if(e < 10){
      document.getElementById('root').style.backgroundColor = '#0055ff'
    }
    else if (e == 'err'){
      document.getElementById('root').style.backgroundColor = '#609bca'
    }
  }

  return (
    <>
      <div id='app-container'>
        <div id='search-div'>
          <input autoComplete='off'
           type="search"
           id="search-bar"
           onChange={e => query = e.target.value}
           onKeyPress = {search}
           placeholder='Search...' />
        </div>
        {(typeof weather.main != 'undefined') ? (
          <>
        <div id="place-div">
          <div id="location">
            {weather.name}, {weather.sys.country} 
          </div>
          <div id="time-zone">{date(new Date())}</div>
        </div>
        <div id="degree-div">
          <div id="degree">
            {weather.main.temp.toFixed(1)} °C
          </div>
          <div id="weather">{weather.weather[0].main}</div>
        </div>
        </>
        ) : ('')}
      </div>
    </>
  );
}

export default App;
