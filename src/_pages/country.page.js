import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Axios from 'axios';
import world from '../world.svg';
import Bootstrap from '../_styles/bootstrap-grid.min.css'

class Country extends Component {

  constructor(props) {
    super(props);
    Axios.get('https://restcountries.eu/rest/v2/alpha/' + props.match.params.code).then(response => {
      this.setState({ ...response.data })
    })
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
          <div className="col-12 col-lg-4 "><img src={state.flag} className="flag heightt" alt="flag" /></div>

          <div className="col-12 col-lg-4 ">
            <div className=" heightt">
              <div className="collingcod "> CALLING CODE </div>
              <div className="" >
                {state.callingCodes}
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-4 ">
            <div className="infoo" >
              <ul>
                <li>
                  <span>name</span>  : {state.name}
                </li>
                <li>
                  <span>topLevelDomain</span>   :  {state.topLevelDomain}
                </li>
                <li>
                  <span>capital</span>   : {state.capital}
                </li>
                <li>
                  <span>region</span>   : {state.region}
                </li>
                <li>
                  <span>nativeName</span>    : {state.nativeName}
                </li>

              </ul>
            </div>
          </div>
        </div>
      </main> : <span>Loading...</span>}
    </>
  }

}

withRouter(Country)
export { Country };