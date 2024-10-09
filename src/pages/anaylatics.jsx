import React from 'react';
import {useState, useEffect} from 'react';
import {getEngagements} from "../Services/api";

import Chart from 'react-apexcharts';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register necessary chart elements
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

export const AnayLatics = () => {
    const [engagementData, setEngagementData] = useState({});
//fetch all activity
    const fetchEngagements = async () => {
        try {
            const response = await getEngagements();
            console.log("Fetched Engagement Data:", response);
            // Extract the first object from the data array
            const data = response.data[0] || {}; // Default to empty object if no data
            setEngagementData(data);
        } catch (error) {
            console.error("Failed to fetch engagements:", error);
        }
    };

    useEffect(() => {
        fetchEngagements();
    }, []);

    // Sample data for line chart
    const lineChartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Visitors',
                data: [1200, 1900, 3000, 5000, 4000, 6000, 7000],
                fill: false,
                borderColor: '#4bc0c0',
                tension: 0.1,
            },
        ],
    };

    // Configuration for stacked bar chart
    const stackedBarOptions = {
        chart: {
            type: 'bar',
            stacked: true,
            height: 350,
            toolbar: {
                show: false,
            },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                borderRadius: 10,
                dataLabels: {
                    position: 'top',
                },
            },
        },
        dataLabels: {
            enabled: true,
            offsetY: -20,
            style: {
                fontSize: '12px',
                colors: ['#304758']
            }
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['#fff']
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        },

        fill: {
            opacity: 1,
        },
        legend: {
            position: 'top',
            horizontalAlign: 'left',
        },
    };

    // Sample data for stacked bar chart
    const stackedBarSeries = [
        {
            name: 'Product A',
            data: [35, 66, 34, 56, 18, 35, 66, 34, 56, 18, 56, 18],
            color: '#008FFB',  // Blue color
        },
        {
            name: 'Product B',
            data: [12, 34, 12, 11, 7, 12, 34, 12, 11, 7, 11, 7],
            color: '#FFC0CB',  // Light pink color
        },
    ];

    const candlestickOptions = {
        chart: {
            type: 'candlestick',
            height: 350,
            toolbar: {
                show: false,   // Hides the toolbar
            },
            zoom: {
                enabled: false,  // Disables zoom functionality
            },
        },
        xaxis: {
            type: 'datetime',
        },
        yaxis: {
            tooltip: {
                enabled: true,
            },
        },
        plotOptions: {
            candlestick: {
                colors: {
                    upward: '#00B050',  // Green for upward movement
                    downward: '#FF0000' // Red for downward movement
                }
            }
        }
    };


    // Sample data for candlestick chart
    const candlestickSeries = [
        {
            data: [
                { x: new Date('2023-01-01').getTime(), y: [100, 110, 90, 105] },
                { x: new Date('2023-02-01').getTime(), y: [105, 115, 95, 110] },
                { x: new Date('2023-03-01').getTime(), y: [110, 120, 100, 115] },
                { x: new Date('2023-04-01').getTime(), y: [115, 125, 105, 120] },
                { x: new Date('2023-05-01').getTime(), y: [120, 130, 110, 125] },
            ],
        },
    ];

    return (
        <div className={` bg-white`}>
            <div className="middle-sidebar-bottom">
                <div className="middle-sidebar-left">
                    <div className="row">
                        <div className="col-xl-12 ">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="card w-100 border-0 shadow-none p-5 rounded-xxl bg-lightblue2 mb-3">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <img src="images/bg-2.png" alt="image" className="w-100"/>
                                            </div>
                                            <div className="col-lg-6 ps-lg-5">
                                                <h2 className="display1-size d-block mb-2 text-grey-900 fw-700">

                                                    Set up your Social website with Sociala</h2>
                                                <p className="font-xssss fw-500 text-grey-500 lh-26">After completing
                                                    this course you'll be confident to create any subtle to complex
                                                    animation that will turn any project a professional work.</p>

                                                <a href="#"
                                                   className="btn w200 border-0 bg-primaryp-3 text-white fw-600 rounded-3 d-inline-block font-xssss">Analysis</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 pe-2">
                                    <div className="card w-100 border-0 shadow-none p-4 rounded-xxl mb-3"
                                         style={{backgroundColor: '#e5f6ff'}}>
                                        <div className="card-body d-flex p-0">
                                            <i className="btn-round-lg d-inline-block me-3 bg-primary feather-home font-md text-white"></i>
                                            <h4 className="text-primary font-xl fw-700">{engagementData.userCount || '0'}
                                                <span className="fw-500 mt-0 d-block text-grey-500 font-xssss">total user</span>
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 pe-2 ps-2">
                                    <div className="card w-100 border-0 shadow-none p-4 rounded-xxl mb-3"
                                         style={{backgroundColor: '#f6f3ff'}}>
                                        <div className="card-body d-flex p-0">
                                            <i className="btn-round-lg d-inline-block me-3 bg-secondary feather-lock font-md text-white"></i>
                                            <h4 className="text-secondary font-xl fw-700">{engagementData.postCount || '0'}
                                                <span className="fw-500 mt-0 d-block text-grey-500 font-xssss">total post</span>
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 pe-2 ps-2">
                                    <div className="card w-100 border-0 shadow-none p-4 rounded-xxl mb-3"
                                         style={{backgroundColor: '#e2f6e9'}}>
                                        <div className="card-body d-flex p-0">
                                            <i className="btn-round-lg d-inline-block me-3 bg-success feather-command font-md text-white"></i>
                                            <h4 className="text-success font-xl fw-700">{engagementData.likeCount || '0'}
                                                <span className="fw-500 mt-0 d-block text-grey-500 font-xssss">likes</span>
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 ps-2">
                                    <div className="card w-100 border-0 shadow-none p-4 rounded-xxl mb-3"
                                         style={{backgroundColor: '#fff0e9'}}>
                                        <div className="card-body d-flex p-0">
                                            <i className="btn-round-lg d-inline-block me-3 bg-warning feather-shopping-bag font-md text-white"></i>
                                            <h4 className="text-warning font-xl fw-700">{engagementData.commentCount || '0'}
                                                <span
                                                    className="fw-500 mt-0 d-block text-grey-500 font-xssss">comments</span>
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12 mb-4">
                                    <div className="card w-100 border-0 mb-3 rounded-xxl bg-lightblue2 shadow-none">

                                        <Chart options={stackedBarOptions} series={stackedBarSeries} type="bar"
                                               height={350}/>
                                    </div>
                                </div>
                                {/* Candlestick Chart */}
                                <div className="col-lg-12">
                                    <div className="card w-100 border-0 mb-3 rounded-xxl bg-lightblue2 shadow-none">
                                        <Chart options={candlestickOptions} series={candlestickSeries}
                                               type="candlestick" height={350}/>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};