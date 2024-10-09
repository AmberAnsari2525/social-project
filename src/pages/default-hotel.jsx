import React from 'react';
import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
export const DefaultHotel = () =>{

/* map script start*/
    useEffect(() => {
        const initMap = () => {
            const uk = { lat: 53.990221, lng: -3.911132 };

            const map = new window.google.maps.Map(document.getElementById('map'), {
                zoom: 6,
                center: uk,
                disableDefaultUI: true,
                styles: [
                    {
                        featureType: 'all',
                        elementType: 'all',
                        stylers: [{ visibility: 'on' }],
                    },
                    // Add your Google Maps style options here
                ],
            });

            const icons = {
                parking: {
                    icon: 'images/map-marker.png',
                },
            };

            const airports = [
                {
                    position: { lat: 53.3588026, lng: -2.274919 },
                    icon: 'parking',
                    content:
                        '<div id="content"><div id="siteNotice"></div><h5 id="firstHeading" class="firstHeading"><b>Right here Right Now - Improv Comedy</b> </h5></div>',
                },
                {
                    position: { lat: 53.8679434, lng: -1.6637193 },
                    icon: 'parking',
                    content:
                        '<div id="content"><div id="siteNotice"></div><h5 id="firstHeading" class="firstHeading"><b>Open Mic-Stand up Comedy and Poetry</b></h5></div>',
                },
                {
                    position: { lat: 54.661781, lng: -6.2184331 },
                    icon: 'parking',
                    content:
                        '<div id="content"><div id="siteNotice"></div><h5 id="firstHeading" class="firstHeading"><b>Mohd Suhels Guide to the Galaxy</b></h5></div>',
                },
                {
                    position: { lat: 55.950785, lng: -3.3636419 },
                    icon: 'parking',
                    content:
                        '<div id="content"><div id="siteNotice"></div><h5 id="firstHeading" class="firstHeading"><b>Charlotte De Witte India Tour- Goa</b></h5></div>',
                },
                {
                    position: { lat: 51.3985498, lng: -3.3416461 },
                    icon: 'parking',
                    content:
                        '<div id="content"><div id="siteNotice"></div><h5 id="firstHeading" class="firstHeading"><b>A Stand-up Comedy Show by Rahul Dua </b></h5></div>',
                },
                {
                    position: { lat: 51.4700223, lng: -0.4542955 },
                    icon: 'parking',
                    content:
                        '<div id="content"><div id="siteNotice"></div><h5 id="firstHeading" class="firstHeading"><b>Sunburn Holi Weekend 2021 ft Vini Vici- Goa </b></h5></div>',
                },
            ];

            const InfoWindows = new window.google.maps.InfoWindow({});

            airports.forEach((airport) => {
                const marker = new window.google.maps.Marker({
                    position: airport.position,
                    map: map,
                    icon: icons[airport.icon].icon,
                });

                marker.addListener('mouseover', function () {
                    InfoWindows.open(map, marker);
                    InfoWindows.setContent(airport.content);
                });
            });
        };

        if (window.google) {
            initMap();
        } else {
            const script = document.createElement('script');
            script.src =
                'https://maps.googleapis.com/maps/api/js?key=AIzaSyCOdKtT5fapH3_OfhV3HFeZjqFs4OfNIew&callback=initMap';
            script.async = true;
            script.defer = true;
            document.head.appendChild(script);
            script.onload = () => initMap();
        }
    }, []);
    /*map script end*/
    return (

        <div className='container-fluid'>
            <div className="middle-sidebar-bottom">
                <div className="middle-sidebar-left pe-0 ms-0 me-0" style={{maxWidth: '100%'}}>
                    <div className="row mail-box" >
                        <div className="col-xl-6  chat-left scroll-bar">
                            <div className="card shadow-xss w-100 d-block d-flex border-0 p-4 mb-3">
                                <div className="card-body d-flex align-items-center p-0">
                                    <h2 className="fw-700 mb-0 mt-0 font-md text-grey-900">Hotel</h2>
                                    <div className="search-form-2 ms-auto">
                                        <i className="ti-search font-xss"></i>
                                        <input type="text"
                                               className="form-control text-grey-500 mb-0 bg-greylight theme-dark-bg border-0"
                                               placeholder="Search here."/>
                                    </div>
                                    <Link to="#" className="btn-round-md ms-2 bg-greylight theme-dark-bg rounded-3"><i
                                        className="feather-filter font-xss text-grey-500"></i></Link>
                                </div>
                            </div>
                            <div className="row ps-2 pe-2">
                                <div className="col-lg-6 col-md-6 col-sm-6 mb-3 pe-2 ps-2">
                                    <div
                                        className="card w-100 p-0 hover-card shadow-xss border-0 rounded-3 overflow-hidden me-1">
                                        <span
                                            className="font-xsssss fw-700 ps-3 pe-3 lh-32 text-uppercase rounded-3 ls-2 bg-primary d-inline-block text-white position-absolute mt-3 ms-3 z-index-1">Featured</span>
                                        <div className="card-image w-100 mb-3">
                                            <Link to="/hotel-detail"
                                                  className="position-relative d-block"><img src="images/h-1.jpg"
                                                                                             alt="image"
                                                                                             className="w-100"/></Link>
                                        </div>
                                        <div className="card-body pt-0">
                                            <i className="feather-bookmark font-md text-grey-500 position-absolute right-0 me-3"></i>
                                            <h4 className="fw-700 font-xss mt-0 lh-28 mb-0"><Link
                                                to="/hotel-detail" className="text-dark text-grey-900">Montana
                                                Hotel</Link></h4>
                                            <h6 className="font-xsssss text-grey-500 fw-600 mt-0 mb-2"> 323 Geldenfe Ave
                                                Park, Flodia City</h6>
                                            <div className="star d-block w-100 text-left mt-0">
                                                <img src="images/star.png" alt="star" className="w15 me-1 float-left"/>
                                                <img src="images/star.png" alt="star" className="w15 me-1 float-left"/>
                                                <img src="images/star.png" alt="star" className="w15 me-1 float-left"/>
                                                <img src="images/star.png" alt="star" className="w15 me-1 float-left"/>
                                                <img src="images/star-disable.png" alt="star"
                                                     className="w15 me-1 float-left me-2"/>
                                            </div>
                                            <div className="clearfix"></div>
                                            <h5 className="mt-3 d-inline-block font-xssss fw-600 text-grey-500 me-2"><i
                                                className="btn-round-sm bg-greylight ti-ruler-pencil text-grey-500 me-1"></i> 200
                                                sq</h5>
                                            <h5 className="mt-3 d-inline-block font-xssss fw-600 text-grey-500 me-2"><i
                                                className="btn-round-sm bg-greylight ti-rss-alt text-grey-500 me-1"></i> WiFi
                                            </h5>
                                            <h5 className="mt-3 d-inline-block font-xssss fw-600 text-grey-500"><i
                                                className="btn-round-sm bg-greylight ti-credit-card text-grey-500 me-1"></i> Card
                                            </h5>
                                            <div className="clearfix"></div>
                                            <span
                                                className="font-lg fw-700 mt-0 pe-3 ls-2 lh-32 d-inline-block text-success float-left"><span
                                                className="font-xsssss">$</span> 320 <span
                                                className="font-xsssss text-grey-500">/ mo</span> </span>
                                            <Link to="#" className="position-absolute bottom-15 mb-2 right-15"><i
                                                className="btn-round-sm bg-primary text-white font-sm feather-chevron-right"></i></Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-6 col-md-6 col-sm-6 mb-3 pe-2 ps-2">
                                    <div
                                        className="card w-100 p-0 hover-card shadow-xss border-0 rounded-3 overflow-hidden me-1">
                                        <span
                                            className="font-xsssss fw-700 ps-3 pe-3 lh-32 text-uppercase rounded-3 ls-2 bg-primary d-inline-block text-white position-absolute mt-3 ms-3 z-index-1">Featured</span>
                                        <div className="card-image w-100 mb-3">
                                            <Link to="/hotel-detail"
                                                  className="position-relative d-block"><img src="images/h-2.jpg"
                                                                                             alt="image"
                                                                                             className="w-100"/></Link>
                                        </div>
                                        <div className="card-body pt-0">
                                            <i className="feather-bookmark font-md text-grey-500 position-absolute right-0 me-3"></i>
                                            <h4 className="fw-700 font-xss mt-0 lh-28 mb-0"><Link
                                                to="/hotel-detail" className="text-dark text-grey-900">Himalayan
                                                Wind Horse</Link></h4>
                                            <h6 className="font-xsssss text-grey-500 fw-600 mt-0 mb-2"> 323 Geldenfe Ave
                                                Park, Flodia City</h6>
                                            <div className="star d-block w-100 text-left mt-0">
                                                <img src="images/star.png" alt="star" className="w15 me-1 float-left"/>
                                                <img src="images/star.png" alt="star" className="w15 me-1 float-left"/>
                                                <img src="images/star.png" alt="star" className="w15 me-1 float-left"/>
                                                <img src="images/star.png" alt="star" className="w15 me-1 float-left"/>
                                                <img src="images/star-disable.png" alt="star"
                                                     className="w15 me-1 float-left me-2"/>
                                            </div>
                                            <div className="clearfix"></div>
                                            <h5 className="mt-3 d-inline-block font-xssss fw-600 text-grey-500 me-2"><i
                                                className="btn-round-sm bg-greylight ti-ruler-pencil text-grey-500 me-1"></i> 200
                                                sq</h5>
                                            <h5 className="mt-3 d-inline-block font-xssss fw-600 text-grey-500 me-2"><i
                                                className="btn-round-sm bg-greylight ti-rss-alt text-grey-500 me-1"></i> WiFi
                                            </h5>
                                            <h5 className="mt-3 d-inline-block font-xssss fw-600 text-grey-500"><i
                                                className="btn-round-sm bg-greylight ti-credit-card text-grey-500 me-1"></i> Card
                                            </h5>
                                            <div className="clearfix"></div>
                                            <span
                                                className="font-lg fw-700 mt-0 pe-3 ls-2 lh-32 d-inline-block text-success float-left"><span
                                                className="font-xsssss">$</span> 450 <span
                                                className="font-xsssss text-grey-500">/ mo</span> </span>
                                            <Link to="#" className="position-absolute bottom-15 mb-2 right-15"><i
                                                className="btn-round-sm bg-primary text-white font-sm feather-chevron-right"></i></Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6 mb-3 pe-2 ps-2">
                                    <div
                                        className="card w-100 p-0 hover-card shadow-xss border-0 rounded-3 overflow-hidden me-1">
                                        <span
                                            className="font-xsssss fw-700 ps-3 pe-3 lh-32 text-uppercase rounded-3 ls-2 bg-primary d-inline-block text-white position-absolute mt-3 ms-3 z-index-1">Featured</span>
                                        <div className="card-image w-100 mb-3">
                                            <Link to="/hotel-detail"
                                               className="position-relative d-block"><img src="images/h-3.jpg"
                                                                                          alt="image"
                                                                                          className="w-100"/></Link>
                                        </div>
                                        <div className="card-body pt-0">
                                            <i className="feather-bookmark font-md text-grey-500 position-absolute right-0 me-3"></i>
                                            <h4 className="fw-700 font-xss mt-0 lh-28 mb-0">
                                                <Link
                                                to="/hotel-detail" className="text-dark text-grey-900">Hotel
                                                Sonar Bangla</Link></h4>
                                            <h6 className="font-xsssss text-grey-500 fw-600 mt-0 mb-2"> 323 Geldenfe Ave
                                                Park, Flodia City</h6>
                                            <div className="star d-block w-100 text-left mt-0">
                                                <img src="images/star.png" alt="star" className="w15 me-1 float-left"/>
                                                <img src="images/star.png" alt="star" className="w15 me-1 float-left"/>
                                                <img src="images/star.png" alt="star" className="w15 me-1 float-left"/>
                                                <img src="images/star.png" alt="star" className="w15 me-1 float-left"/>
                                                <img src="images/star-disable.png" alt="star"
                                                     className="w15 me-1 float-left me-2"/>
                                            </div>
                                            <div className="clearfix"></div>
                                            <h5 className="mt-3 d-inline-block font-xssss fw-600 text-grey-500 me-2"><i
                                                className="btn-round-sm bg-greylight ti-ruler-pencil text-grey-500 me-1"></i> 200
                                                sq</h5>
                                            <h5 className="mt-3 d-inline-block font-xssss fw-600 text-grey-500 me-2"><i
                                                className="btn-round-sm bg-greylight ti-rss-alt text-grey-500 me-1"></i> WiFi
                                            </h5>
                                            <h5 className="mt-3 d-inline-block font-xssss fw-600 text-grey-500"><i
                                                className="btn-round-sm bg-greylight ti-credit-card text-grey-500 me-1"></i> Card
                                            </h5>
                                            <div className="clearfix"></div>
                                            <span
                                                className="font-lg fw-700 mt-0 pe-3 ls-2 lh-32 d-inline-block text-success float-left"><span
                                                className="font-xsssss">$</span> 50 <span
                                                className="font-xsssss text-grey-500">/ mo</span> </span>
                                            <Link to="#" className="position-absolute bottom-15 mb-2 right-15"><i
                                                className="btn-round-sm bg-primary text-white font-sm feather-chevron-right"></i></Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-6 col-md-6 col-sm-6 mb-3 pe-2 ps-2">
                                    <div
                                        className="card w-100 p-0 hover-card shadow-xss border-0 rounded-3 overflow-hidden me-1">
                                        <span
                                            className="font-xsssss fw-700 ps-3 pe-3 lh-32 text-uppercase rounded-3 ls-2 bg-primary d-inline-block text-white position-absolute mt-3 ms-3 z-index-1">Featured</span>
                                        <div className="card-image w-100 mb-3">
                                            <Link to="/hotel-detail"
                                               className="position-relative d-block"><img src="images/h-4.jpg"
                                                                                          alt="image"
                                                                                          className="w-100"/></Link>
                                        </div>
                                        <div className="card-body pt-0">
                                            <i className="feather-bookmark font-md text-grey-500 position-absolute right-0 me-3"></i>
                                            <h4 className="fw-700 font-xss mt-0 lh-28 mb-0"><Link
                                               to="/hotel-detaill" className="text-dark text-grey-900">House
                                                Pool Party</Link></h4>
                                            <h6 className="font-xsssss text-grey-500 fw-600 mt-0 mb-2"> 323 Geldenfe Ave
                                                Park, Flodia City</h6>
                                            <div className="star d-block w-100 text-left mt-0">
                                                <img src="images/star.png" alt="star" className="w15 me-1 float-left"/>
                                                <img src="images/star.png" alt="star" className="w15 me-1 float-left"/>
                                                <img src="images/star.png" alt="star" className="w15 me-1 float-left"/>
                                                <img src="images/star.png" alt="star" className="w15 me-1 float-left"/>
                                                <img src="images/star-disable.png" alt="star"
                                                     className="w15 me-1 float-left me-2"/>
                                            </div>
                                            <div className="clearfix"></div>
                                            <h5 className="mt-3 d-inline-block font-xssss fw-600 text-grey-500 me-2"><i
                                                className="btn-round-sm bg-greylight ti-ruler-pencil text-grey-500 me-1"></i> 200
                                                sq</h5>
                                            <h5 className="mt-3 d-inline-block font-xssss fw-600 text-grey-500 me-2"><i
                                                className="btn-round-sm bg-greylight ti-rss-alt text-grey-500 me-1"></i> WiFi
                                            </h5>
                                            <h5 className="mt-3 d-inline-block font-xssss fw-600 text-grey-500"><i
                                                className="btn-round-sm bg-greylight ti-credit-card text-grey-500 me-1"></i> Card
                                            </h5>
                                            <div className="clearfix"></div>
                                            <span
                                                className="font-lg fw-700 mt-0 pe-3 ls-2 lh-32 d-inline-block text-success float-left"><span
                                                className="font-xsssss">$</span> 60 <span
                                                className="font-xsssss text-grey-500">/ mo</span> </span>
                                            <Link to="#" className="position-absolute bottom-15 mb-2 right-15"><i
                                                className="btn-round-sm bg-primary text-white font-sm feather-chevron-right"></i></Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-6 col-md-6 col-sm-6 mb-3 pe-2 ps-2">
                                    <div
                                        className="card w-100 p-0 hover-card shadow-xss border-0 rounded-3 overflow-hidden me-1">
                                        <span
                                            className="font-xsssss fw-700 ps-3 pe-3 lh-32 text-uppercase rounded-3 ls-2 bg-primary d-inline-block text-white position-absolute mt-3 ms-3 z-index-1">Featured</span>
                                        <div className="card-image w-100 mb-3">
                                            <Link to="/hotel-detail"
                                               className="position-relative d-block"><img src="images/h-5.jpg"
                                                                                          alt="image"
                                                                                          className="w-100"/></Link>
                                        </div>
                                        <div className="card-body pt-0">
                                            <i className="feather-bookmark font-md text-grey-500 position-absolute right-0 me-3"></i>
                                            <h4 className="fw-700 font-xss mt-0 lh-28 mb-0"><Link
                                                to="/hotel-detail" className="text-dark text-grey-900">Silver
                                                Star Boutique</Link></h4>
                                            <h6 className="font-xsssss text-grey-500 fw-600 mt-0 mb-2"> 323 Geldenfe Ave
                                                Park, Flodia City</h6>
                                            <div className="star d-block w-100 text-left mt-0">
                                                <img src="images/star.png" alt="star" className="w15 me-1 float-left"/>
                                                <img src="images/star.png" alt="star" className="w15 me-1 float-left"/>
                                                <img src="images/star.png" alt="star" className="w15 me-1 float-left"/>
                                                <img src="images/star.png" alt="star" className="w15 me-1 float-left"/>
                                                <img src="images/star-disable.png" alt="star"
                                                     className="w15 me-1 float-left me-2"/>
                                            </div>
                                            <div className="clearfix"></div>
                                            <h5 className="mt-3 d-inline-block font-xssss fw-600 text-grey-500 me-2"><i
                                                className="btn-round-sm bg-greylight ti-ruler-pencil text-grey-500 me-1"></i> 200
                                                sq</h5>
                                            <h5 className="mt-3 d-inline-block font-xssss fw-600 text-grey-500 me-2"><i
                                                className="btn-round-sm bg-greylight ti-rss-alt text-grey-500 me-1"></i> WiFi
                                            </h5>
                                            <h5 className="mt-3 d-inline-block font-xssss fw-600 text-grey-500"><i
                                                className="btn-round-sm bg-greylight ti-credit-card text-grey-500 me-1"></i> Card
                                            </h5>
                                            <div className="clearfix"></div>
                                            <span
                                                className="font-lg fw-700 mt-0 pe-3 ls-2 lh-32 d-inline-block text-success float-left"><span
                                                className="font-xsssss">$</span> 760 <span
                                                className="font-xsssss text-grey-500">/ mo</span> </span>
                                            <Link to="#" className="position-absolute bottom-15 mb-2 right-15"><i
                                                className="btn-round-sm bg-primary text-white font-sm feather-chevron-right"></i></Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-6 col-md-6 col-sm-6 mb-3 pe-2 ps-2">
                                    <div
                                        className="card w-100 p-0 hover-card shadow-xss border-0 rounded-3 overflow-hidden me-1">
                                        <span
                                            className="font-xsssss fw-700 ps-3 pe-3 lh-32 text-uppercase rounded-3 ls-2 bg-primary d-inline-block text-white position-absolute mt-3 ms-3 z-index-1">Featured</span>
                                        <div className="card-image w-100 mb-3">
                                            <Link to="/hotel-detail"
                                               className="position-relative d-block"><img src="/images/h-6.jpg"
                                                                                          alt="image"
                                                                                          className="w-100"/></Link>
                                        </div>
                                        <div className="card-body pt-0">
                                            <i className="feather-bookmark font-md text-grey-500 position-absolute right-0 me-3"></i>
                                            <h4 className="fw-700 font-xss mt-0 lh-28 mb-0"><Link
                                                to="/hotel-detail" className="text-dark text-grey-900">Crown
                                                Retreat Hotel</Link></h4>
                                            <h6 className="font-xsssss text-grey-500 fw-600 mt-0 mb-2"> 323 Geldenfe Ave
                                                Park, Flodia City</h6>
                                            <div className="star d-block w-100 text-left mt-0">
                                                <img src="images/star.png" alt="star" className="w15 me-1 float-left"/>
                                                <img src="images/star.png" alt="star" className="w15 me-1 float-left"/>
                                                <img src="images/star.png" alt="star" className="w15 me-1 float-left"/>
                                                <img src="images/star.png" alt="star" className="w15 me-1 float-left"/>
                                                <img src="images/star-disable.png" alt="star"
                                                     className="w15 me-1 float-left me-2"/>
                                            </div>
                                            <div className="clearfix"></div>
                                            <h5 className="mt-3 d-inline-block font-xssss fw-600 text-grey-500 me-2"><i
                                                className="btn-round-sm bg-greylight ti-ruler-pencil text-grey-500 me-1"></i> 200
                                                sq</h5>
                                            <h5 className="mt-3 d-inline-block font-xssss fw-600 text-grey-500 me-2"><i
                                                className="btn-round-sm bg-greylight ti-rss-alt text-grey-500 me-1"></i> WiFi
                                            </h5>
                                            <h5 className="mt-3 d-inline-block font-xssss fw-600 text-grey-500"><i
                                                className="btn-round-sm bg-greylight ti-credit-card text-grey-500 me-1"></i> Card
                                            </h5>
                                            <div className="clearfix"></div>
                                            <span
                                                className="font-lg fw-700 mt-0 pe-3 ls-2 lh-32 d-inline-block text-success float-left"><span
                                                className="font-xsssss">$</span> 840 <span
                                                className="font-xsssss text-grey-500">/ mo</span> </span>
                                            <Link to="#" className="position-absolute bottom-15 mb-2 right-15"><i
                                                className="btn-round-sm bg-primary text-white font-sm feather-chevron-right"></i></Link>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="col-xl-6 d-none d-xl-block ps-0 chat-left">
                            <div className="card w-100 border-0 shadow-none rounded-3 border-0 mb-4 overflow-hidden">
                                <div id="map" className="rounded-3 chat-left"></div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>


    )
}


