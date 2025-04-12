import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";

function SwapiCall() {
    const [people, setPeople] = useState(1);
    const baseURL = `https://swapi.py4e.com/api/people/${people}`;
    // const baseURL=`https://api.openweathermap.org/data/2.5/weather?q=${people}&appid=4a1f8a61b74546825af1e0be106e797b&units=metric`;
    const [star, setStar] = useState(null);

    useEffect(() => {

        axios.get(baseURL).then((response) => {
             
            setStar(response.data);
            
        }).catch(error => {

            setStar({ "name": "", "mass": "" });

        });
    }, [people]);
    const peopleChange = (event) => {
        let n = event.target.value;
        n = n.trim();
        if (n == "")
            n = "1";
        n = Number(n);
        setPeople(n);
        console.log(event.target.value);
    }
    if (!star) return (<div>
        
        <center>

            <input type="text" onChange={peopleChange} />
            
            <p>No Data</p>

        </center>
    </div>);

    return <div>

        <center>
            <input type="text" value={people} onChange={peopleChange} />

            <p>Name {(star.name) ? star.name : "No Data"}</p>

        </center>
    </div>;
}


export default SwapiCall;