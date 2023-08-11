import React, { useState, useEffect } from "react";
import "./style.css";
import WeatherDetails from "./weatherDetails";

const searchMain = () => {
  const [searchTerm, setSearchTerm] = useState("Salt Lake City");
  const [tempInfo, setTempInfo] = useState({});
  // console.log(searchTerm)

  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=imperial&appid=96c668e208edcf7b52711415b69b810a`;

      let res = await fetch(url);
      let data = await res.json();

      const { temp, humidity, pressure } = data.main;
      const { main: weatherType } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weatherType,
        name,
        speed,
        country,
        sunset,
      };

      setTempInfo(myNewWeatherInfo);
      // console.log(data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeatherInfo();
  }, []);

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="Search City..."
            id="search"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        
          <button className="searchButton" onClick={getWeatherInfo}>Search</button>
        </div>
        </div>
      
      <WeatherDetails {...tempInfo} />
    </>
  );
};

export default searchMain;
