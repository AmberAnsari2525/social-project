import React from "react";
import {Carousel} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import {Link} from "react-router-dom";

export const Shop = () => {
    return (
        <div className=" bg-white">
            <div className="middle-sidebar-bottom">
                <div className="middle-sidebar-left pe-0">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="banner-wrapper bg-greylight overflow-hidden rounded-3">
                                        <Carousel>
                                            <Carousel.Item>
                                                <div className="item d-flex align-items-center bg-lightblue">
                                                    <div className="row">
                                                        <div className="col-lg-6 p-lg-5 ps-5 pe-5 pt-4">
                                                            <div
                                                                className="card w-100 border-0 ps-lg-5 ps-0 bg-transparent bg-transparent-card">
                                                                <h4 className="font-xssss text-danger ls-3 fw-700 ms-0 mt-4 mb-3">
                                                                    TRENDING
                                                                </h4>
                                                                <h2 className="fw-300 display2-size display2-md-size lh-2 text-grey-900">
                                                                    New Arrival Buds <br/>
                                                                    <b className="fw-700">Collection</b>
                                                                </h2>
                                                                <p className="fw-500 text-grey-500 lh-26 font-xssss pe-lg-5">
                                                                    Lorem ipsum dolor sit amet, consectetur adipiscing
                                                                    elit.
                                                                    Morbi nulla dolor, ornare at commodo non, feugiat
                                                                    non nisi.
                                                                    Phasellus faucibus mollis pharetra.
                                                                </p>
                                                                <a href="#"
                                                                   className="fw-700 text-white rounded-xl bg-primary font-xsssss text-uppercase ls-3 lh-30 mt-0 text-center d-inline-block p-2 w150">
                                                                    Shop Now
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <img src="/images/pl-22.png" alt="product"
                                                                 className="img-fluid p-md-5 p-4"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Carousel.Item>
                                            <Carousel.Item>
                                                <div className="item d-flex align-items-center bg-cyan">
                                                    <div className="row">
                                                        <div className="col-lg-6 p-lg-5 ps-5 pe-5 pt-4">
                                                            <div
                                                                className="card w-100 border-0 ps-lg-5 ps-0 bg-transparent bg-transparent-card">
                                                                <h4 className="font-xssss text-white ls-3 fw-700 ms-0 mt-4 mb-3">
                                                                    TRENDING
                                                                </h4>
                                                                <h2 className="fw-300 display2-size display2-md-size lh-2 text-white">
                                                                    New Arrival Buds <br/>
                                                                    <b className="fw-700">Collection</b>
                                                                </h2>
                                                                <p className="fw-500 text-grey-100 lh-26 font-xssss pe-lg-5">
                                                                    Lorem ipsum dolor sit amet, consectetur adipiscing
                                                                    elit.
                                                                    Morbi nulla dolor, ornare at commodo non, feugiat
                                                                    non nisi.
                                                                    Phasellus faucibus mollis pharetra.
                                                                </p>
                                                                <a href="#"
                                                                   className="fw-700 text-grey-900 rounded-xl bg-white font-xsssss text-uppercase ls-3 lh-30 mt-0 text-center d-inline-block p-2 w150">
                                                                    Shop Now
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <img src="/images/pl-23.png" alt="product"
                                                                 className="img-fluid p-md-5 p-4"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Carousel.Item>
                                        </Carousel>
                                    </div>
                                </div>

                                {/* Additional Content Below Carousels */}

                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="card w-100 border-0 mt-4">
                                <div className="card-image w-100 p-0 text-center bg-greylight rounded-3 mb-2">
                                    <Link to="/single-product"><img src="images/pp-9.png" alt="product-image"
                                                                    className="w-100 mt-0 mb-0 p-5"/></Link>
                                </div>
                                <div className="card-body w-100 p-0 text-center">
                                    <div className="star w-100 d-block text-left mt-0 text-center">
                                        <img src="images/star.png" alt="star" className="w15"/>
                                        <img src="images/star.png" alt="star" className="w15"/>
                                        <img src="images/star.png" alt="star" className="w15"/>
                                        <img src="images/star.png" alt="star" className="w15"/>
                                        <img src="images/star-disable.png" alt="star" className="w15 me-1 me-2"/>
                                    </div>
                                    <h2 className="mt-1 mb-1"><Link to="/single-product"
                                                                    className="text-black fw-700 font-xsss lh-26">Textured
                                        Sleeveless Camisole</Link></h2>
                                    <h6 className="font-xsss fw-600 text-grey-500 ls-2">$449</h6>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="card w-100 border-0 mt-4">
                                <div className="card-image w-100 p-0 text-center bg-greylight rounded-3 mb-2">
                                    <Link to="/single-product"><img src="images/pp-10.png" alt="product-image"
                                                                    className="w-100 mt-0 mb-0 p-5"/></Link>
                                </div>
                                <div className="card-body w-100 p-0 text-center">
                                    <div className="star w-100 d-block text-left mt-0 text-center">
                                        <img src="images/star.png" alt="star" className="w15"/>
                                        <img src="images/star.png" alt="star" className="w15"/>
                                        <img src="images/star.png" alt="star" className="w15"/>
                                        <img src="images/star.png" alt="star" className="w15"/>
                                        <img src="images/star-disable.png" alt="star" className="w15 me-1 me-2"/>
                                    </div>
                                    <h2 className="mt-1 mb-1"><Link to="/single-product"
                                                                    className="text-black fw-700 font-xsss lh-26">Adjustable
                                        Shoulder Straps</Link></h2>
                                    <h6 className="font-xsss fw-600 text-grey-500 ls-2">$449</h6>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="card w-100 border-0 mt-4">
                                <div className="card-image w-100 p-0 text-center bg-greylight rounded-3 mb-2">
                                    <Link to="/single-product"><img src="images/pp-13.png" alt="product-image"
                                                                    className="w-100 mt-0 mb-0 p-5"/></Link>
                                </div>
                                <div className="card-body w-100 p-0 text-center">
                                    <div className="star w-100 d-block text-left mt-0 text-center">
                                        <img src="images/star.png" alt="star" className="w15"/>
                                        <img src="images/star.png" alt="star" className="w15"/>
                                        <img src="images/star.png" alt="star" className="w15"/>
                                        <img src="images/star.png" alt="star" className="w15"/>
                                        <img src="images/star-disable.png" alt="star" className="w15 me-1 me-2"/>
                                    </div>
                                    <h2 className="mt-1 mb-1"><Link to="/single-product"
                                                                    className="text-black fw-700 font-xsss lh-26">Neck
                                        Strappy Camisole</Link></h2>
                                    <h6 className="font-xsss fw-600 text-grey-500 ls-2">$449</h6>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="card w-100 border-0 mt-4">
                                <div className="card-image w-100 p-0 text-center bg-greylight rounded-3 mb-2">
                                    <Link to="/single-product"><img src="images/pp-14.png" alt="product-image"
                                                                    className="w-100 mt-0 mb-0 p-5"/></Link>
                                </div>
                                <div className="card-body w-100 p-0 text-center">
                                    <div className="star w-100 d-block text-left mt-0 text-center">
                                        <img src="images/star.png" alt="star" className="w15"/>
                                        <img src="images/star.png" alt="star" className="w15"/>
                                        <img src="images/star.png" alt="star" className="w15"/>
                                        <img src="images/star.png" alt="star" className="w15"/>
                                        <img src="images/star-disable.png" alt="star" className="w15 me-1 me-2"/>
                                    </div>
                                    <h2 className="mt-1 mb-1"><Link to="/single-product"
                                                                    className="text-black fw-700 font-xsss lh-26">Scoop-Neck
                                        Strappy</Link></h2>
                                    <h6 className="font-xsss fw-600 text-grey-500 ls-2">$449</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="card w-100 border-0 mt-4">
                                <div className="card-image w-100 p-0 text-center bg-greylight rounded-3 mb-2">
                                    <Link to="/single-product"><img src="images/pp-8.png" alt="product-image"
                                                                    className="w-100 mt-0 mb-0 p-5"/></Link>
                                </div>
                                <div className="card-body w-100 p-0 text-center">
                                    <div className="star w-100 d-block text-left mt-0 text-center">
                                        <img src="images/star.png" alt="star" className="w15"/>
                                        <img src="images/star.png" alt="star" className="w15"/>
                                        <img src="images/star.png" alt="star" className="w15"/>
                                        <img src="images/star.png" alt="star" className="w15"/>
                                        <img src="images/star-disable.png" alt="star" className="w15 me-1 me-2"/>
                                    </div>
                                    <h2 className="mt-1 mb-1"><Link to="/single-product"
                                                                    className="text-black fw-700 font-xsss lh-26">Butler
                                        Stool Ladder</Link></h2>
                                    <h6 className="font-xsss fw-600 text-grey-500 ls-2">$449</h6>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="card w-100 border-0 mt-4">
                                <div className="card-image w-100 p-0 text-center bg-greylight rounded-3 mb-2">
                                    <Link to="/single-product"><img src="images/pp-22.png" alt="product-image"
                                                                    className="w-100 mt-0 mb-0 p-5"/></Link>
                                </div>
                                <div className="card-body w-100 p-0 text-center">
                                    <div className="star w-100 d-block text-left mt-0 text-center">
                                        <img src="images/star.png" alt="star" className="w15"/>
                                        <img src="images/star.png" alt="star" className="w15"/>
                                        <img src="images/star.png" alt="star" className="w15"/>
                                        <img src="images/star.png" alt="star" className="w15"/>
                                        <img src="images/star-disable.png" alt="star" className="w15 me-1 me-2"/>
                                    </div>
                                    <h2 className="mt-1 mb-1"><Link to="/single-product"
                                                                    className="text-black fw-700 font-xsss lh-26">Butler
                                        Stool Ladder</Link></h2>
                                    <h6 className="font-xsss fw-600 text-grey-500 ls-2">$449</h6>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="card w-100 border-0 mt-4">
                                <div className="card-image w-100 p-0 text-center bg-greylight rounded-3 mb-2">
                                    <Link to="/single-product"><img src="images/pp-23.png" alt="product-image"
                                                                    className="w-100 mt-0 mb-0 p-5"/></Link>
                                </div>
                                <div className="card-body w-100 p-0 text-center">
                                    <div className="star w-100 d-block text-left mt-0 text-center">
                                        <img src="images/star.png" alt="star" className="w15"/>
                                        <img src="images/star.png" alt="star" className="w15"/>
                                        <img src="images/star.png" alt="star" className="w15"/>
                                        <img src="images/star.png" alt="star" className="w15"/>
                                        <img src="images/star-disable.png" alt="star" className="w15 me-1 me-2"/>
                                    </div>
                                    <h2 className="mt-1 mb-1"><Link to="/single-product"
                                                                    className="text-black fw-700 font-xsss lh-26">Butler
                                        Stool Ladder</Link></h2>
                                    <h6 className="font-xsss fw-600 text-grey-500 ls-2">$449</h6>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="card w-100 border-0 mt-4">
                                <div className="card-image w-100 p-0 text-center bg-greylight rounded-3 mb-2">
                                    <Link to="/single-product"><img src="images/pp-8.png" alt="product-image"
                                                                    className="w-100 mt-0 mb-0 p-5"/></Link>
                                </div>
                                <div className="card-body w-100 p-0 text-center">
                                    <div className="star w-100 d-block text-left mt-0 text-center">
                                        <img src="images/star.png" alt="star" className="w15"/>
                                        <img src="images/star.png" alt="star" className="w15"/>
                                        <img src="images/star.png" alt="star" className="w15"/>
                                        <img src="images/star.png" alt="star" className="w15"/>
                                        <img src="images/star-disable.png" alt="star" className="w15 me-1 me-2"/>
                                    </div>
                                    <h2 className="mt-1 mb-1"><Link to="/single-product"
                                                                    className="text-black fw-700 font-xsss lh-26">Butler
                                        Stool Ladder</Link></h2>
                                    <h6 className="font-xsss fw-600 text-grey-500 ls-2">$449</h6>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="card w-100 border-0 mt-4">
                                <div className="card-image w-100 p-0 text-center bg-greylight rounded-3 mb-2">
                                    <Link to="/single-product"><img src="images/pp-9.png" alt="product-image"
                                                                    className="w-100 mt-0 mb-0 p-5"/></Link>
                                </div>
                                <div className="card-body w-100 p-0 text-center">
                                    <div className="star w-100 d-block text-left mt-0 text-center">
                                        <img src="images/star.png" alt="star" className="w15"/>
                                        <img src="images/star.png" alt="star" className="w15"/>
                                        <img src="images/star.png" alt="star" className="w15"/>
                                        <img src="images/star.png" alt="star" className="w15"/>
                                        <img src="images/star-disable.png" alt="star" className="w15 me-1 me-2"/>
                                    </div>
                                    <h2 className="mt-1 mb-1"><Link to="/single-product"
                                                                    className="text-black fw-700 font-xsss lh-26">Textured
                                        Sleeveless Camisole</Link></h2>
                                    <h6 className="font-xsss fw-600 text-grey-500 ls-2">$449</h6>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="card w-100 border-0 mt-4">
                                <div className="card-image w-100 p-0 text-center bg-greylight rounded-3 mb-2">
                                    <Link to="/single-product"><img src="images/pp-10.png" alt="product-image"
                                                                    className="w-100 mt-0 mb-0 p-5"/></Link>
                                </div>
                                <div className="card-body w-100 p-0 text-center">
                                    <div className="star w-100 d-block text-left mt-0 text-center">
                                        <img src="images/star.png" alt="star" className="w15"/>
                                        <img src="images/star.png" alt="star" className="w15"/>
                                        <img src="images/star.png" alt="star" className="w15"/>
                                        <img src="images/star.png" alt="star" className="w15"/>
                                        <img src="images/star-disable.png" alt="star" className="w15 me-1 me-2"/>
                                    </div>
                                    <h2 className="mt-1 mb-1"><Link to="/single-product"
                                                                    className="text-black fw-700 font-xsss lh-26">Adjustable
                                        Shoulder Straps</Link></h2>
                                    <h6 className="font-xsss fw-600 text-grey-500 ls-2">$449</h6>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="card w-100 border-0 mt-4">
                                <div className="card-image w-100 p-0 text-center bg-greylight rounded-3 mb-2">
                                    <Link to="/single-product"><img src="images/pp-11.png" alt="product-image"
                                                                    className="w-100 mt-0 mb-0 p-5"/></Link>
                                </div>
                                <div className="card-body w-100 p-0 text-center">
                                    <div className="star w-100 d-block text-left mt-0 text-center">
                                        <img src="images/star.png" alt="star" className="w15"/>
                                        <img src="images/star.png" alt="star" className="w15"/>
                                        <img src="images/star.png" alt="star" className="w15"/>
                                        <img src="images/star.png" alt="star" className="w15"/>
                                        <img src="images/star-disable.png" alt="star" className="w15 me-1 me-2"/>
                                    </div>
                                    <h2 className="mt-1 mb-1"><Link to="/single-product"
                                                                    className="text-black fw-700 font-xsss lh-26">Neck
                                        Strappy Camisole</Link></h2>
                                    <h6 className="font-xsss fw-600 text-grey-500 ls-2">$449</h6>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="card w-100 border-0 mt-4">
                                <div className="card-image w-100 p-0 text-center bg-greylight rounded-3 mb-2">
                                    <Link to="/single-product"><img src="images/pp-4.png" alt="product-image"
                                                                    className="w-100 mt-0 mb-0 p-5 mt-4 mb-4"/></Link>
                                </div>
                                <div className="card-body w-100 p-0 text-center">
                                    <div className="star w-100 d-block text-left mt-0 text-center">
                                        <img src="images/star.png" alt="star" className="w15"/>
                                        <img src="images/star.png" alt="star" className="w15"/>
                                        <img src="images/star.png" alt="star" className="w15"/>
                                        <img src="images/star.png" alt="star" className="w15"/>
                                        <img src="images/star-disable.png" alt="star" className="w15 me-1 me-2"/>
                                    </div>
                                    <h2 className="mt-1 mb-1"><Link to="/single-product"
                                                                    className="text-black fw-700 font-xsss lh-26">Scoop-Neck
                                        Strappy</Link></h2>
                                    <h6 className="font-xsss fw-600 text-grey-500 ls-2">$449</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12 mt-3 mb-5 text-center">
                        <a href="#"
                           className="fw-700 text-white font-xssss text-uppercase ls-3 lh-32 rounded-3 mt-3 text-center d-inline-block p-2 bg-current w150">
                            Load More
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

