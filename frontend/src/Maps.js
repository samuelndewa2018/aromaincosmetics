import { Component } from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";

class Maps extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        style={{ width: "100%", height: "100%" }}
        zoom={10}
        initialCenter={{
          lat: -1.1944,
          lng: 36.94463,
        }}
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDJyrTU6U9BlkUv2Zot6ZpgLzPAKO_YD3A",
})(Maps);
