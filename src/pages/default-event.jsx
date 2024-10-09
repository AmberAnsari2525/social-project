import React from "react";
import {useEffect, useRef} from "react";

export const DefaultEvent = () => {


    const mapRef = useRef(null);

    useEffect(() => {
        const initMap = () => {
            const uk = {lat: 53.990221, lng: -3.911132};

            const map = new window.google.maps.Map(mapRef.current, {
                zoom: 6,
                center: uk,
                disableDefaultUI: true,
                styles: [
                    {
                        featureType: 'all',
                        elementType: 'all',
                        stylers: [{visibility: 'on'}],
                    },
                    // Add your Google Maps style options here
                ],
            });

            const icons = {
                parking: {icon: 'images/map-marker.png'},
            };

            const airports = [
                {
                    position: {lat: 53.3588026, lng: -2.274919},
                    icon: 'parking',
                    content: '<div id="content"><div id="siteNotice"></div><h5 id="firstHeading" class="firstHeading"><b>Right here Right Now - Improv Comedy</b></h5></div>',
                },
                {
                    position: {lat: 53.8679434, lng: -1.6637193},
                    icon: 'parking',
                    content: '<div id="content"><div id="siteNotice"></div><h5 id="firstHeading" class="firstHeading"><b>Open Mic-Stand up Comedy and Poetry</b></h5></div>',
                },
                {
                    position: {lat: 54.661781, lng: -6.2184331},
                    icon: 'parking',
                    content: '<div id="content"><div id="siteNotice"></div><h5 id="firstHeading" class="firstHeading"><b>Mohd Suhels Guide to the Galaxy</b></h5></div>',
                },
                {
                    position: {lat: 55.950785, lng: -3.3636419},
                    icon: 'parking',
                    content: '<div id="content"><div id="siteNotice"></div><h5 id="firstHeading" class="firstHeading"><b>Charlotte De Witte India Tour- Goa</b></h5></div>',
                },
                {
                    position: {lat: 51.3985498, lng: -3.3416461},
                    icon: 'parking',
                    content: '<div id="content"><div id="siteNotice"></div><h5 id="firstHeading" class="firstHeading"><b>A Stand-up Comedy Show by Rahul Dua </b></h5></div>',
                },
                {
                    position: {lat: 51.4700223, lng: -0.4542955},
                    icon: 'parking',
                    content: '<div id="content"><div id="siteNotice"></div><h5 id="firstHeading" class="firstHeading"><b>Sunburn Holi Weekend 2021 ft Vini Vici- Goa </b></h5></div>',
                },
            ];

            const infoWindow = new window.google.maps.InfoWindow();

            airports.forEach((airport) => {
                const marker = new window.google.maps.Marker({
                    position: airport.position,
                    map: map,
                    icon: icons[airport.icon].icon,
                });

                marker.addListener('mouseover', () => {
                    infoWindow.setContent(airport.content);
                    infoWindow.open(map, marker);
                });
            });
        };

        if (window.google) {
            initMap();
        } else {
            const script = document.createElement('script');
            script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCOdKtT5fapH3_OfhV3HFeZjqFs4OfNIew&callback=initMap';
            script.async = true;
            script.defer = true;
            document.body.appendChild(script);

            script.onload = () => initMap();
            script.onerror = () => {
                console.error("Google Maps script failed to load.");
            };
        }

        return () => {
            // Clean up script
            const script = document.querySelector(`script[src^="https://maps.googleapis.com/maps/api/js"]`);
            if (script) script.remove();
        };
    }, []);


    /*map script end*/
// Sample events data
    const events = [
        {
            id: 1,
            image: "images/e-1.jpg",
            date: "FEB 22",
            title: "Right here Right Now - Comedy",
            location: "Goa, Mumbai",
        },
        {
            id: 2,
            image: "images/e-2.jpg",
            date: "FEB 22",
            title: "Open Mic-Stand up Comedy and Poetry",
            location: "Goa, Mumbai",
        },
        {
            id: 3,
            image: "images/e-3.jpg",
            date: "FEB 22",
            title: "Mohd Suhel's Guide to the Galaxy",
            location: "Goa, Mumbai",
        },
        {
            id: 4,
            image: "images/e-4.jpg",
            date: "FEB 22",
            title: "Charlotte De Witte India Tour",
            location: "Goa, Mumbai",
        },
        {
            id: 5,
            image: "images/e-5.jpg",
            date: "FEB 22",
            title: "A Stand-up Comedy Show by Rahul",
            location: "Goa, Mumbai",
        },
        {
            id: 6,
            image: "images/e-6.jpg",
            date: "FEB 22",
            title: "Sunburn Holi Weekend 2021",
            location: "Goa, Mumbai",
        },
    ];
    /*jsx object wnd*/

    return (
        <>

            <div>

                <div className="middle-sidebar-bottom">
                    <div className="middle-sidebar-left">
                        <div className="row">
                            <div className="col-xl-12">

                                <div ref={mapRef} style={{height: '400px', width: '100%'}}></div>


                                <div className="row">
                                    {events.map(event => (
                                        <div key={event.id} className="col-lg-4 col-md-6 pe-2 ps-2">
                                            <div
                                                className="card p-3 bg-white w-100 hover-card border-0 shadow-xss rounded-xxl border-0 mb-3 overflow-hidden">
                                                <div className="card-image w-100">
                                                    <img src={event.image} alt="event" className="w-100 rounded-3"/>
                                                </div>
                                                <div className="card-body d-flex ps-0 pe-0 pb-0">
                                                    <div
                                                        className="bg-greylight me-3 p-3 border-light-md rounded-xxl theme-dark-bg">
                                                        <h4 className="fw-700 font-lg ls-3 text-grey-900 mb-0">
                                                        <span
                                                            className="ls-3 d-block font-xsss text-grey-500 fw-500">{event.date}</span>
                                                        </h4>
                                                    </div>
                                                    <h2 className="fw-700 lh-3 font-xss">
                                                        {event.title}
                                                        <span
                                                            className="d-flex font-xssss fw-500 mt-2 lh-3 text-grey-500">
                <i className="ti-location-pin me-1"></i> {event.location}
              </span>
                                                    </h2>
                                                </div>
                                                <div className="card-body p-0">
                                                    <ul className="memberlist mt-4 mb-2 ms-0 d-inline-block">
                                                        <li><a href="#"><img src="images/user-6.png" alt="user"
                                                                             className="w30 d-inline-block"/></a></li>
                                                        <li><a href="#"><img src="images/user-7.png" alt="user"
                                                                             className="w30 d-inline-block"/></a></li>
                                                        <li><a href="#"><img src="images/user-8.png" alt="user"
                                                                             className="w30 d-inline-block"/></a></li>
                                                        <li><a href="#"><img src="images/user-3.png" alt="user"
                                                                             className="w30 d-inline-block"/></a></li>
                                                        <li className="last-member"><a href="#"
                                                                                       className="bg-greylight fw-600 text-grey-500 font-xssss ls-3 text-center">+2</a>
                                                        </li>
                                                    </ul>
                                                    <a href="#"
                                                       className="font-xsssss fw-700 ps-3 pe-3 lh-32 float-right mt-4 text-uppercase rounded-3 ls-2 bg-success d-inline-block text-white me-1">APPLY</a>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            { /* main content end*/}
        </>
    )

}