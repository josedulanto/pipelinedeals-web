import React from 'react';
import BarChart from './components/BarChart';
import './App.css';

class App extends React.Component {
  state = {
    data: []
  }

  componentDidMount() {
    fetch('http://localhost:3000/deals/chart')
    .then(res => res.json())
    .then((data) => {
      this.setState({ data })
    })
    .catch(console.log)
  }

  render() {
    let colors = [
      '#DD1C1A',
      '#1985A1',
      '#541388',
      '#F9C80E',
      '#F86624',
      '#009E3F'
    ];

    return (
      <div className="App">
        <h1>Total deals value by stage</h1>
        <BarChart title="Deals" colors={colors} data={this.state.data}></BarChart>
      </div>
    );
  }
}

export default App;
