// https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=2c821678dbb89631ed6f7044a1ec56b9
import React, { useEffect, useState } from 'react'
import "./style.css"
import Weathercard from "./weathercard"
const Temp = () => {

    const [searchValue, setSearchValue] = useState("delhi")
    const [tempInfo, setTempInfo] = useState({})

    const getWeatherInfo = async () => {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=2c821678dbb89631ed6f7044a1ec56b9`;

            const res = await fetch(url)
            const data = await res.json()

            const { temp, humidity, pressure } = data.main;
            const { main: weathermood } = data.weather[0];
            const { name } = data
            const { speed } = data.wind
            const { country, sunset } = data.sys

            const myNewWeatherInfo = {
                temp,
                humidity,
                pressure,
                weathermood,
                name,
                speed,
                country,
                sunset,
            };

            setTempInfo(myNewWeatherInfo);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getWeatherInfo();
    }, []);
    return (
        <>
            <div className="wrap">
                <div className="search">
                    <input type="search" id="search" placeholder="search..." autoFocus className="searchTerm" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                    <button className="searchButton" type="button" onClick={getWeatherInfo}>Search</button>
                </div>
            </div>

            {/* our temp card */}

            <Weathercard tempInfo={tempInfo} />
        </>
    )
}

export default Temp
