import React from 'react';
import PropTypes from 'prop-types';
import Chart from 'chart.js';

export default class BarChart extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidUpdate() {
    this.myChart.data.labels = this.props.data.map(d => d.label);
    this.myChart.data.datasets[0].data = this.props.data.map(d => d.value);
    this.myChart.update();
  }

  componentDidMount() {
    this.myChart = new Chart(this.canvasRef.current, {
      type: 'bar',
      data: {
        labels: this.props.data.map(d => d.label),
        datasets: [{
          label: this.props.title,
          data: this.props.data.map(d => d.value),
          backgroundColor: this.props.colors,
        }]
      },
      options: {
        responsive: true,
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            ticks: {
              maxRotation: 90,
              minRotation: 80
            }
          }],
          yAxes: [{
            ticks: {
              callback: (value, index, values) => {
                return '$' + this.asCurrency(value);
              }
            }
          }],
        },
        tooltips: {
          callbacks: {
            label: (tooltipItem, data) => {
              var label = data.datasets[tooltipItem.datasetIndex].label || '';

              if (label) {
                label += ': $';
              }
              label += this.asCurrency(Math.round(tooltipItem.yLabel * 100) / 100);
              return label;
            }
          }
        }
      }
    });
  }

  asCurrency(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  render() {
    return (
        <canvas ref={this.canvasRef} />
    );
  }
}

BarChart.propTypes = {
  title: PropTypes.string.isRequired,
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      percent: PropTypes.number
    })
  )
}
