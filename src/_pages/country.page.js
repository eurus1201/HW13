import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Axios from 'axios';
import '../_styles/App.scss';
import world from '../world.svg';
import { BrowserRouter as Router, Route, Redirect,Link } from "react-router-dom";
import Bootstrap from '../_styles/bootstrap-grid.min.css';
import GoogleApiWrapper from "./map";
import { Weather} from "./weather";
// import MapContainer from "./map";

  class Country extends Component {

    constructor(props) {
      super(props);
    }
    getCountry = () => {
      Axios.get('https://restcountries.eu/rest/v2/alpha/' + this.props.match.params.code).then(response => {
        this.setState({ ...response.data })
      })
    }
       componentDidMount() {
      this.getCountry();
    }

    componentDidUpdate() {
      this.getCountry();
    }
    goBack = () => {
      this.props.history.push('/');
    }
    
    render() {
      const { state } = this;
      return <>
        <nav>
          <img src={world} className="nav-logo" alt="logo" />
          <span>Country Info - {this.state && this.state.name}</span>
          <button onClick={this.goBack}>Back</button>
        </nav>
        {state ? <main className="container-fluid">
          <div className="row">
            <div className="col-12 col-lg-4"><img src={state.flag} className="flag" alt="flag" /></div>
            <div className="col-12 col-lg-4" style={{ background: '#ffdc37', padding: 0, textAlign: 'center' }}>
              <div style={{ background: 'black', color: 'white', textAlign: 'center', padding: '15px' }}>CALLING CODE</div>
              <div><h1>{state.callingCodes}</h1></div>
            </div>
            <div className="col-12 col-lg-4">
              <div style={{ background: '#504e4e', color: 'white', height: '100%', padding: '15px' }}>
                <div>{state.name}</div>
                <div>
                  <ul className="info">
                    <li><span>Native Name:</span> {state.nativeName}</li>
                    <li><span>Capital:</span> {state.capital}</li>
                    <li><span>Region:</span> {state.region}</li>
                    <li><span>Population:</span> {state.population}</li>
                    <li><span>Languages:</span> {state.languages[0].name}</li>
                    <li><span>TimeZone:</span> {state.timezones}</li>
                    
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4">
              <div style={{ background: 'black', color: 'white', textAlign: 'center', padding: '15px' }}>Capital Weather Report</div>
              <div>
                <Weather city={this.state.capital} country={this.state.alpha2Code} />
              </div>
            </div>
           <div className="col-lg-4">
              <span>Neightbers:</span> {state.borders.map((item, index) => <li><Link to={`/country/${item}`}>{item}</Link></li>)} 
           </div>
            <div className="col-lg-4 " >
              <div className="map">
                < GoogleApiWrapper lat={state.latlng[0]} lng={state.latlng[1]} name={state.name} />
              </div>
            </div>
          </div>

        </main> : <span>Loading...</span>}
      </>
    }
    
  }

// google map  apiKey: 'AIzaSyAdj0C81rA_-Ko03ne6H63lfpvKS-vRNR4'

withRouter(Country)
export { Country }
