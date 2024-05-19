import React, { useEffect, useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { CardBody } from 'reactstrap'; // Import CardBody from the appropriate library
import Chart from 'chart.js/auto';

const DashboardPanelChart = () => {
    const generateLast12Months = () => {
        const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        const currentMonth = new Date().getMonth();
        const last12Months = [];

        for (let i = 0; i < 12; i++) {
            const monthIndex = (currentMonth - i + 12) % 12;
            last12Months.unshift(monthNames[monthIndex]);
        }

        return last12Months;
    };
    const [chartData, setChartData] = useState({
        labels: generateLast12Months(),
        datasets: [
            {
                label: "Active Users",
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
                data: Array(12).fill(0), // Initial data
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
                const response = await fetch('https://swift-car-django-server-4c51acec5937.herokuapp.com/reservations/sum-prices-per-month');
                const data = await response.json();

                console.log('Fetched data:', data);

                const updatedData = Array(12).fill(0);
                for (let i = 0; i < data.length; i++) {
                    updatedData[updatedData.length - data.length + i] = data[i];
                }

                setChartData((prevState) => {
                    const newDatasets = [...prevState.datasets];
                    newDatasets[0].data = updatedData;
                    return { ...prevState, datasets: newDatasets };
                });

                if (chartRef.current) {
                    const chart = chartRef.current.chartInstance;
                    const ctx = chart.ctx;
                    const gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
                    gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
                    gradientFill.addColorStop(1, "rgba(249, 99, 59, 0.40)");
                    chart.data.datasets[0].backgroundColor = gradientFill;
                    chart.update();
                }

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
