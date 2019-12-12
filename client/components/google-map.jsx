import React from 'react';
/* global google */

class GoogleMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      view: 'map',
      userLat: 0,
      userLong: 0
    };
    this.googleMapRef = React.createRef();
    this.markers = [];
    this.GOOGLE_MAP_API_KEY = 'AIzaSyAOJECdvPZz9UkXONB7GvgiYfrP_s6RNOw';

    this.createMarker = this.createMarker.bind(this);
  }

  componentDidMount() {
    if (!document.getElementById('map')) {
      const googleMapScript = document.createElement('script');
      googleMapScript.setAttribute('id', 'map');
      googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${this.GOOGLE_MAP_API_KEY}&libraries=places`;
      window.document.body.appendChild(googleMapScript);

      googleMapScript.addEventListener('load', () => {
        this.googleMap = this.createGoogleMap();
        this.createMarker();
      });
    } else {
      this.googleMap = this.createGoogleMap();
      this.createMarker();
    }

  }

  getUserLocation() {
    // navigator.geolocation.getCurrentPosition(position => {
    //   this.setState({userLat: position.coords.latitude, userLng: position.coords.longitude})
    // });
    // console.log(this.state)
  }

  createGoogleMap() {
    return new window.google.maps.Map(this.googleMapRef.current, {
      zoom: 11,
      center: {
        lat: 33.707567,
        lng: -117.77154
      },
      disableDefaultUI: true
    });
  }

  componentDidUpdate() {
    this.markers.map(marker => marker.setMap(null));
    this.markers.length = 0;
    this.createMarker();
    if (this.props.display === false) {
      this.handleResetZoom();
    }
  }

  createMarker() {
    // const icons = {
    //   soccer: {
    //     icon: 'images/IconSoccer.jpeg'
    //   },
    // }

    if (this.props.events.events.length === 0) return null;
    this.props.events.events.map(event => {
      const marker = new window.google.maps.Marker({
        position: { lat: event.lat, lng: -event.lng },
        type: 'soccer',
        map: this.googleMap,
        id: event.id,
        animation: google.maps.Animation.DROP
        // icon: icons.soccer.icon,
      });

      this.markers.push(marker);

      marker.addListener('click', () => {
        this.googleMap.setZoom(17);
        this.googleMap.setCenter(marker.getPosition());
        this.props.callback(marker.id);
      });
    });
  }

  handleResetZoom() {
    this.googleMap.setZoom(11.5);
  }

  render() {
    return (
      <div className="main">
        <div
          ref={this.googleMapRef}
          style={{ height: '100%' }}
          id="google-map"
          className="card-panel white map-holder" />
      </div>
    );
  }
}

export default GoogleMap;
