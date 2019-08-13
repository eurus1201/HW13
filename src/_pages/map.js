import React , { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

export class MapContainer extends Component {

constructor (props){
    super(props);
    
}

    render() {
        return (
            <Map
                google={this.props.google}
             
                center={{
                    lat: this.props.lat,
                    lng: this.props.lng
                }}
                zoom={14}
                onClick={this.onMapClicked}
            >

                <Marker onClick={this.onMarkerClick}
                    name={'Current location'} />

                <InfoWindow onClose={this.onInfoWindowClose}>
                    <div>
                        {/* <h1>{this.state.selectedPlace.name}</h1> */}
                    </div>
                </InfoWindow>
            </Map>
        );
    }
}


export default GoogleApiWrapper({
    apiKey: ('AIzaSyAdj0C81rA_-Ko03ne6H63lfpvKS-vRNR4')
})(MapContainer)