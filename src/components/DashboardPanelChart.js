import React, { useEffect, useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { CardBody } from 'reactstrap'; // Import CardBody from the appropriate library
import Chart from 'chart.js/auto';

const DashboardPanelChart = () => {
    const generateLast4Weeks = () => {
        const last4Weeks = Array.from({length: 4}, (_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - i*7);
            return i === 0 ? 'Cette Semaine' : `${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()}`;
        });
        return last4Weeks.reverse();
    };
    const [chartData, setChartData] = useState({
        labels: generateLast4Weeks(),
        datasets: [
            {
                label: "Reservations",
                borderColor: "#f96332",
                pointBorderColor: "#FFF",
                pointBackgroundColor: "#f96332",
                pointBorderWidth: 2,
                pointHoverRadius: 4,
                pointHoverBorderWidth: 1,
                pointRadius: 4,
                fill: true,
                backgroundColor: 'rgba(128, 182, 244, 0)', // Default color, will be replaced
                borderWidth: 2,
                tension: 0.4,
                data: Array(4).fill(0), // Initial data
            },
        ],
    });

    const chartOptions = {
        layout: {
            padding: {
                left: 20,
                right: 20,
                top: 0,
                bottom: 0,
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltips: {
                backgroundColor: "#fff",
                titleFontColor: "#333",
                bodyFontColor: "#666",
                bodySpacing: 4,
                xPadding: 12,
                mode: "nearest",
                intersect: 0,
                position: "nearest",
            },
        },
        maintainAspectRatio: false,
        scales: {
            y: {
                ticks: {
                    fontColor: "rgba(255,255,255,0.4)",
                    fontStyle: "bold",
                    beginAtZero: true,
                    maxTicksLimit: 5,
                    padding: 10,
                },
                grid: {
                    drawTicks: true,
                    drawBorder: false,
                    display: true,
                    color: "rgba(255,255,255,0.1)",
                    zeroLineColor: "transparent",
                },
            },
            x: {
                grid: {
                    display: false,
                    color: "rgba(255,255,255,0.1)",
                },
                ticks: {
                    padding: 10,
                    fontColor: "rgba(255,255,255,0.4)",
                    fontStyle: "bold",
                },
            },
        },
    };

    const chartRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://swift-car-django-server-4c51acec5937.herokuapp.com/reservations/sum-prices-by-week');
                const data = await response.json();

                setChartData((prevState) => {
                    const newDatasets = [...prevState.datasets];
                    newDatasets[0].data = data.reverse();
                    return { ...prevState, datasets: newDatasets };
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <CardBody>
            <div className="chart-area">
                <Line
                    ref={chartRef}
                    data={chartData}
                    options={chartOptions}
                />
            </div>
        </CardBody>
    );
};

export default DashboardPanelChart;
