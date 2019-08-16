import React, { Component } from "react";
import Axios from 'axios';

class Weather extends Component {

    constructor(props) {
        super(props);
        
        Axios.get('https://api.openweathermap.org/data/2.5/weather' ,{
            params:{
                q:`${this.props.city},${this.props.country}`,
                APPID:'bce54fa8d352ef132f63065a3238fae6'
            }
        }) .then(response => {
            this.setState({  ...response.data })
        })
       
    }
    render() {
   
        return (

            <div>
                <div id="icon"><img
                    id="wicon"
                    src={this.state && 'http://openweathermap.org/img/w/' + this.state.weather[0].icon + '.png'}
                    alt="Weather icon" /></div>
                <ul>                   
                    <li> <span>main weather : </span> {this.state ? this.state.weather[0].main : <span>loading</span>}</li>
                    <li> <span>description : </span> {this.state ? this.state.weather[0].description : <span>loading</span>}</li>
                    <li> <span>tempertuer `C : </span> {this.state ? (this.state.main.temp)-273.15  : <span>loading</span>}</li>                  
                </ul>
            </div>
        )
    }
}

export {Weather}