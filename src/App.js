import { useEffect,useState } from 'react';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck'
import CardColumns from 'react-bootstrap/CardColumns';
import Cloumns from 'react-columns';
import Form from 'react-bootstrap/Form';


function App() {
  const [latest, setLatest] = useState([]);
  const [res,setRes ]= useState([]);
  const [serch,setSerch] = useState("");

  useEffect(() => {
    axios
    .get("https://corona-virus-world-and-india-data.p.rapidapi.com/api", {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "e5e2f726e4msha90e808df4f0c85p12b883jsn0099c0cb1a3c",
        "x-rapidapi-host": "corona-virus-world-and-india-data.p.rapidapi.com"
      }
    })
    .then(response => {
      setLatest(response.data.world_total);
      setRes(response.data.countries_stat);
      console.log(response.data.countries_stat);
      console.log(response.data.world_total);
    })
    .catch(err => {
      console.error(err);
    });

    
  }, [])

  const FC = res.filter(item =>{
    return serch !== "" ? item.country_name.includes(serch) : item
  })
  const contries = FC.map((data,i) => {
    return(
      <Card
        key={i}
        bg="info"
        text="dark"
        className="text-center"
        style={{margin: "10px"}}
        >
          
          <Card.Body>
            <Card.Title>{data.country_name}</Card.Title>
            <Card.Text>Total Cases {data.cases}</Card.Text>
            <Card.Text>Active Cases {data.active_cases}</Card.Text>
            <Card.Text>Deaths {data.deaths}</Card.Text>
            <Card.Text>Deaths per 1m population {data.deaths_per_1m_population}</Card.Text>
            <Card.Text>Total Recovered {data.total_recovered}</Card.Text>
            <Card.Text>Total tests {data.total_tests}</Card.Text>
          </Card.Body>
        </Card>
    );
  } );


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
              {latest.total_cases}
      </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated on {latest.statistic_taken_at}</small>
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
            {latest.total_deaths}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated on {latest.statistic_taken_at}</small>
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
            {latest.total_recovered}
      </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated on {latest.statistic_taken_at}</small>
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
            {latest.active_cases}
      </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated on {latest.statistic_taken_at}</small>
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
            {latest.new_deaths}
      </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated on {latest.statistic_taken_at}</small>
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
            {latest.new_cases}
      </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated on {latest.statistic_taken_at}</small>
          </Card.Footer>
        </Card>
        </CardDeck>

      <Form>
        <Form.Group controlId="formGroupSearch">
          <Form.Control 
            type="text" 
            placeholder="Search a country" 
            onChange={e => setSerch(e.target.value)}/>
          </Form.Group>
      </Form>
        <Cloumns>{contries}</Cloumns>


  
    </div>
  );
}

export default App;
