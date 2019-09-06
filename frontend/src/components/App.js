import React, { Component } from 'react';
import axios from 'axios';
import CountUp from 'react-countup';
import Wave from '../components/Wave';
import '../styles/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalAmount: 0,
      totalAmountEng: "Loading",
      data: [],
    };
  }

  componentDidMount() {
    axios.get('http://localhost:8081/damfund')
    .then((resp) => {
      const totalAmount = Number(resp.data.totalAmount);
      this.setState({ totalAmountEng: resp.data.totalAmountEng, totalAmount, data: resp.data.data });
    })
    .catch((err) =>{
      console.error(err);
    })
  }

  render() {
    return (
      <div className="App">
        <CountUp
          style={{  color: '#4478e3', fontWeight: 'bold', fontSize: 'calc(56px + 0.4vw)'}}
          start={0}
          end={this.state.totalAmount}
          delay={1}
          duration={3}
          separator=","
          decimal=","
          prefix="Rs. "
          useEasing={true}
        />
         
        <p>{this.state.totalAmountEng}</p>
        {/* <div><p>{(((this.state.totalAmount*0.0064)/12000000000)*100).toFixed(5)} % have been collected so far</p></div> */}
        <Wave val={(((this.state.totalAmount*0.0064)/12000000000)*100).toFixed(5)}/>
        <p>Made with ❤ in Switzerland</p>
      </div>
    );
  }
}

export default App;
