import React from 'react';
import logo from './logo.svg';
import Lightweight from './react-lightweight-charts'

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Lightweight
        width={600}
        height={380}
        series="line"
        // overlay={true}
        // title="Series title example"
        // scaleMargins={{
        //   top: 0.1,
        //   bottom: 0.3,
        // }}
        // priceLineVisible={false}
        // priceLineWidth={2}
        // priceLineColor="#4682B4"
        // priceLineStyle={3}
        data={[
          { time: '2019-04-11', value: 80.01 },
          { time: '2019-04-12', value: 96.63 },
          { time: '2019-04-13', value: 76.64 },
          { time: '2019-04-14', value: 81.89 },
          { time: '2019-04-15', value: 74.43 },
          { time: '2019-04-16', value: 80.01 },
          { time: '2019-04-17', value: 96.63 },
          { time: '2019-04-18', value: 76.64 },
          { time: '2019-04-19', value: 81.89 },
          { time: '2019-04-20', value: 74.43 },
        ]}
      />
    </div>
  );
}

export default App;
