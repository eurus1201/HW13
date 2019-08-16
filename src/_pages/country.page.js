import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Axios from 'axios';
import '../_styles/App.scss';
import world from '../world.svg';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Bootstrap from '../_styles/bootstrap-grid.min.css';
import GoogleApiWrapper from "./map";
import { Weather } from "./weather";
import '../_styles/App.scss';


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

        <div className="row backk ">


          <div className="row col-12 col-lg-8 flagInfo">
            <div className="flag">
              <img src={state.flag} alt="flag" />
            </div>


            <div className="code">
              <div>CALLING CODE</div>
              <h1> {state.callingCodes} </h1>

            </div>

            <div className="digitIso">
              <span>
                <span>2 DIGIT ISO : </span>{state.alpha2Code}
              </span>
              <br />
              <span>
                <span>3 DIGIT ISO : </span> {state.name}
              </span>
            </div>
          </div> {/* flag info */}

          <div className="col-12 col-lg-4 countryInfo">
            <div >
              <div className="headerCountryInfo">{state.name}</div>
              <div>
                <ul className= "" >
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

        <div className="row backk baba">

          <div className="col-lg-3 col-12 ">
            <div className="weather" >Capital Weather Report</div>
            <div >
              <Weather city={this.state.capital} country={this.state.alpha2Code} />
            </div>
          </div>

          <div className="col-lg-3 col-12 map" >
            <div className="weather">Map</div>
            <div className="col-11" >
              < GoogleApiWrapper lat={state.latlng[0]} lng={state.latlng[1]} name={state.name} />
            </div>
          </div>

          <div className="col-lg-3 col-12 Neightbers">
            <div className="weather">Neightbers:</div>
            <div>
              {state.borders.map((item, index) => <li><Link to={`/country/${item}`}>{item}</Link></li>)}
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
