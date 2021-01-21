import { useEffect, useState } from 'react';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import GoogleMapReact from 'google-map-react';



function App() {
  const [latest, setLatest] = useState([]);
  const [res, setRes] = useState([]);

  useEffect(() => {
    axios
      .all([
        axios.get("https://corona.lmao.ninja/v2/all"),
        axios.get("https://corona.lmao.ninja/v2/countries?sort=country")
      ])
      .then(response => {
        console.log(response.data);
        setLatest(response[0].data);
        console.log(response[1].data);
        setRes(response[1].data);
      })
      .catch(err => {
      });


  }, [])

  const date = new Date(parseInt(latest.updated));
  const DateUpdated = date.toString();

  const countryLocation = res.map((data,i) => {
    return(
      <div
        lat={data.countryInfo.lat}
        lng={data.countryInfo.long}
        style={{
          color: "red",
          backgroundColor: "#FFF",
          height: "25px",
          width: "35px",
          textAlign: "center",
          borderRadius: "30px"
        }}>
          <img height="10px" src={data.countryInfo.flag} />
          <br />
          {data.cases}
        </div>
    )
  })


  return (
    <div>

      <CardDeck>
        <Card
          bg="secondary"
          text="white"
          className="text-center"
          style={{ margin: "10px" }}>
          <Card.Body>
            <Card.Title>Total Cases</Card.Title>
            <Card.Text>
              {latest.cases}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated on {DateUpdated}</small>
          </Card.Footer>
        </Card>
        <Card
          bg="dark"
          text="white"
          className="text-center"
          style={{ margin: "10px" }}>
          <Card.Body>
            <Card.Title>Total Deaths</Card.Title>
            <Card.Text>
              {latest.deaths}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated on {DateUpdated}</small>
          </Card.Footer>
        </Card>
        <Card
          bg="success"
          text="white"
          className="text-center"
          style={{ margin: "10px" }}>

          <Card.Body>
            <Card.Title>Total Recoverd</Card.Title>
            <Card.Text>
              {latest.recovered}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated on {DateUpdated}</small>
          </Card.Footer>
        </Card>
      </CardDeck>
      <CardDeck>
        <Card
          bg="danger"
          text="white"
          className="text-center"
          style={{ margin: "10px" }}>

          <Card.Body>
            <Card.Title>Total Active Cases</Card.Title>
            <Card.Text>
              {latest.active}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated on {DateUpdated}</small>
          </Card.Footer>
        </Card>
        <Card
          bg="dark"
          text="white"
          className="text-center"
          style={{ margin: "10px" }}>

          <Card.Body>
            <Card.Title>New Deaths</Card.Title>
            <Card.Text>
              {latest.todayDeaths}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated on {DateUpdated}</small>
          </Card.Footer>
        </Card>
        <Card
          bg="warning"
          text="white"
          className="text-center"
          style={{ margin: "10px" }}>

          <Card.Body>
            <Card.Title>New cases</Card.Title>
            <Card.Text>
              {latest.todayCases}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated on {DateUpdated}</small>
          </Card.Footer>
        </Card>
      </CardDeck>

      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBixYvYwCIkF5NWAtUl_zaGTeErRhtvXPw" }}
          defaultCenter={{ lat: 20, lng: 77 }}
          defaultZoom={4}
        >
        {countryLocation}
        </GoogleMapReact>
      </div>



    </div>
  );
}

export default App;
