import { useEffect,useState } from 'react';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import GoogleMapReact from 'google-map-react';



function App() {
  const [latest, setLatest] = useState([]);
  const [res,setRes ]= useState([]);

  useEffect(() => {
    axios
    .get("https://corona.lmao.ninja/v2/all")
    .then(response => {
      console.log(response.data);
      setLatest(response.data);
    })
    .catch(err => {
    });

    
  }, [])

  const date = new Date(parseInt(latest.updated));
  const DateUpdated = date.toString();


  return (
    <div>

      <CardDeck>
        <Card 
          bg="secondary"
          text="white"
          className="text-center"
          style={{margin: "10px"}}>
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
          style={{margin: "10px"}}>
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
          style={{margin: "10px"}}>

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
          style={{margin: "10px"}}>

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
          style={{margin: "10px"}}>

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
          style={{margin: "10px"}}>

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
          bootstrapURLKeys={{ key:"AIzaSyBixYvYwCIkF5NWAtUl_zaGTeErRhtvXPw"}}
          defaultCenter={{lat: 59.955413, lng:30.337844}}
          defaultZoom={10}
        >
          <div
            lat={59.955413}
            lng={30.337844}>
              My Marker
              </div>
        </GoogleMapReact>
      </div>


  
    </div>
  );
}

export default App;
