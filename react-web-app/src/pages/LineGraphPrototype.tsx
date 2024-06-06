import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, ChartOptions, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';

Chart.register(...registerables);

interface LineGraphProps {
  data: { x: Date; y: number }[];
}

const LineGraph = ({ data }: LineGraphProps) => {
  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        mode: 'index', // TypeScript will infer the correct type
        intersect: false,
      },
    },
    scales: {
      x: {
        type: 'time',
        title: {
          display: true,
          text: 'Time',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Dollar Amount',
        },
      },
    },
  };


    const chartData = {
        datasets: [
            {
                label: 'Dollar Amount Over Time',
                data: data,
                fill: false,
                borderColor: 'rgba(75,192,192,1)',
                tension: 0.1,
            },
        ],
    };

    return (
      <>
        <Line data={chartData} options={options} />
        hoi
      </>
    );
};

export default LineGraph;