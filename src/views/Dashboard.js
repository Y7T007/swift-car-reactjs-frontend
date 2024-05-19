/*!

=========================================================
* Now UI Dashboard React - v1.5.2
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
import { useEffect, useState, useRef } from 'react';

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Table,
  Button,
  Label,
  FormGroup,
  Input,
  UncontrolledTooltip,
} from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";

import {
  dashboardPanelChart,
  dashboardShippedProductsChart,
  dashboardAllProductsChart,
  dashboard24HoursPerformanceChart,
} from "variables/charts.js";
import DashboardPanelChart from "../components/DashboardPanelChart";

function Dashboard() {
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
  const generateLast30Days = () => {
    const last30Days = Array.from({length: 30}, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return i === 0 ? 'Today' : `${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()}`;
    });
    return last30Days.reverse();
  };

  const [chartData2, setChartData2] = useState({
    labels: generateLast30Days(),
    datasets: [
      {
        label: "Reservations",
        backgroundColor: "#f96332",
        data: Array(30).fill(0), // Initial data
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://swift-car-django-server-4c51acec5937.herokuapp.com/reservations/reservations-per-day');
        const data = await response.json();

        setChartData2((prevState) => {
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

  const [managers, setManagers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://swift-car-django-server-4c51acec5937.herokuapp.com/reservations/reservations-by-manager');
        const data = await response.json();
        setManagers(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <PanelHeader
        size="lg"
        content={
          <Line
              ref={chartRef}
              data={chartData}
              options={dashboardPanelChart.options}
          />
        }
      />
      <div className="content">
        <Row>
          <Col xs={12} md={6}>
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Reservation</h5>
                <CardTitle tag="h4">Reservations Par Semaine</CardTitle>
                <UncontrolledDropdown>
                  <DropdownToggle
                    className="btn-round btn-outline-default btn-icon"
                    color="default"
                  >
                    <i className="now-ui-icons loader_gear" />
                  </DropdownToggle>
                </UncontrolledDropdown>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <DashboardPanelChart/>
                </div>
              </CardBody>
              <CardFooter>
                <div className="stats">
                  <i className="now-ui-icons arrows-1_refresh-69" /> Just
                  Updated
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col xs={12} md={6}>
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">30 dernier jours</h5>
                <CardTitle tag="h4"> Nombre Reservations </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Bar
                      data={chartData2}
                    options={dashboard24HoursPerformanceChart.options}
                  />
                </div>
              </CardBody>
              <CardFooter>
                <div className="stats">
                  <i className="now-ui-icons ui-2_time-alarm" /> 30 dernier jours
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12}>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Best Managers</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                  <tr>
                    <th>Reservation Count</th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Contact Number</th>
                    <th>Address</th>
                    <th>Email</th>
                  </tr>
                  </thead>
                  <tbody>
                  {managers.sort((a, b) => b.reservation_count - a.reservation_count).map((manager) => (
                      <tr key={manager._id}>
                        <td style={{fontWeight: 'bold', color: 'green'}}>{manager.reservation_count}</td>
                        <td>{manager.name}</td>
                        <td>{manager.gender}</td>
                        <td>{manager.contact_number}</td>
                        <td>{manager.address}</td>
                        <td>{manager.email}</td>
                      </tr>
                  ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
