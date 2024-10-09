
import {Link} from 'react-router-dom';
import React, { useRef, useEffect } from 'react';
export  const DefaultVideo = () => {
    const videoRef1 = useRef(null);
    const videoRef2 = useRef(null);
    const videoRef3 = useRef(null);




    useEffect(() => {
        const video1 = videoRef1.current;
        const video2 = videoRef2.current;
        const video3 = videoRef3.current;

        // Add any custom JavaScript behavior for the videos here if needed
        // For example, if you're using a third-party video library, you can initialize it here

        return () => {
            // Cleanup if necessary
        };
    }, []);

    return (
   
        <div >

            <div className="middle-sidebar-bottom">
                <div className="middle-sidebar-left">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">

                            <div className="card w-100 border-0 shadow-xss rounded-xxl border-0 p-4 mb-3 overflow-hidden">
                                <div className="card-body p-0 d-flex align-items-center mb-3">
                                    <h4 className="fw-700 font-xss text-grey-900 pt-0 mb-0">Featured Stories</h4>
                                    <a href="#" className="ps-3 pe-2 lh-32 d-flex align-items-center font-xssss fw-600 alert-primary rounded-xxl text-primary ms-auto">See more <i className="font-xsss feather-chevron-right ms-1"></i></a>
                                </div>
                                <div className="card-body p-0 d-block mb-4">
                                    <div className="owl-carousel owl-theme category-card {/*overflow-visible*/} owl-dot-nav nav-none style2 chatlist owl-loaded owl-drag ">
                                        <div className='owl-stage-outer d-flex'>
                                            <div className='owl-stage'
                                                  /*style = {{transform: 'translate3d(0px, 0px, 0px)',
                                                transition: 'all',
                                                width: '620px'
                                           } }*/>
                                                <div className="owl-item acive"
                                                     style={{width: 'auto', marginRight: '7px'}}>
                                                    <div className="item no-ouline">
                                                        <div
                                                            className="card w-100 border-0 shadow-none bg-transparent bg-transparent-card">
                                                            <a href="#" data-target="#Modalstries" data-toggle="modal"
                                                               className="w-100 btn-round-lg"><i
                                                                className="feather-plus text-grey-600 font-md"></i>
                                                                <span
                                                                    className="d-block fw-600 font-xssss text-grey-600 text-dark mt-0">My story</span></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="owl-item acive"
                                                 style={{width: 'auto', marginRight: '7px'}}>
                                                <div className="item dashed online">
                                                    <div
                                                        className="card bg-transparent bg-transparent-card border-0 shadow-none">
                                                        <div className="card-image text-center"><a href="#"
                                                                                                   data-target="#Modalstries"
                                                                                                   data-toggle="modal"><img
                                                            src="images/user-22.png" alt="image"
                                                            className="d-inline p-0"/> <span
                                                            className="d-block fw-600 font-xssss text-grey-600 text-dark">Ana</span></a>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="owl-item acive"
                                                 style={{width: 'auto', marginRight: '7px'}}>
                                                <div className="item online">
                                                    <div
                                                        className="card bg-transparent bg-transparent-card border-0 shadow-none">
                                                        <div className="card-image text-center"><a href="#"
                                                                                                   data-target="#Modalstries"
                                                                                                   data-toggle="modal"><img
                                                            src="images/user-23.png" alt="image"
                                                            className="d-inline p-0"/> <span
                                                            className="d-block fw-600 font-xssss text-grey-600 text-dark">Devid</span></a>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="owl-item acive"
                                                 style={{width: 'auto', marginRight: '7px'}}>
                                                <div className="item online">
                                                    <div
                                                        className="card bg-transparent bg-transparent-card border-0 shadow-none">
                                                        <div className="card-image text-center"><a href="#"
                                                                                                   data-target="#Modalstries"
                                                                                                   data-toggle="modal"><img
                                                            src="images/user-24.png" alt="image"
                                                            className="d-inline p-0"/> <span
                                                            className="d-block fw-600 font-xssss text-grey-600 text-dark">Anton</span></a>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="owl-item acive"
                                                 style={{width: 'auto', marginRight: '7px'}}>
                                                <div className="item">
                                                    <div
                                                        className="card bg-transparent bg-transparent-card border-0 shadow-none">
                                                        <div className="card-image text-center"><a href="#"
                                                                                                   data-target="#Modalstries"
                                                                                                   data-toggle="modal"><img
                                                            src="images/user-21.png" alt="image"
                                                            className="d-inline p-0"/> <span
                                                            className="d-block fw-600 font-xssss text-grey-600 text-dark">Jane</span></a>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="owl-item acive"
                                                 style={{width: 'auto', marginRight: '7px'}}>
                                                <div className="item">
                                                    <div
                                                        className="card bg-transparent bg-transparent-card border-0 shadow-none">
                                                        <div className="card-image text-center"><a href="#"
                                                                                                   data-target="#Modalstries"
                                                                                                   data-toggle="modal"><img
                                                            src="images/user-25.png" alt="image"
                                                            className="d-inline p-0"/> <span
                                                            className="d-block fw-600 font-xssss text-grey-600 text-dark">Wade</span></a>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="owl-item acive"
                                                 style={{width: 'auto', marginRight: '7px'}}>
                                                <div className="item">
                                                    <div
                                                        className="card bg-transparent bg-transparent-card border-0 shadow-none">
                                                        <div className="card-image text-center"><a href="#"
                                                                                                   data-target="#Modalstries"
                                                                                                   data-toggle="modal"><img
                                                            src="images/user-12.png" alt="image"
                                                            className="d-inline shadow p-0"/> <span
                                                            className="d-block fw-600 font-xssss text-grey-600 text-dark">Cabe</span></a>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="owl-item acive"
                                                 style={{width: 'auto', marginRight: '7px'}}>
                                                <div className="item online">
                                                    <div
                                                        className="card bg-transparent bg-transparent-card border-0 shadow-none">
                                                        <div className="card-image text-center"><a href="#"
                                                                                                   data-target="#Modalstries"
                                                                                                   data-toggle="modal"><img
                                                            src="images/user-24.png" alt="image"
                                                            className="d-inline p-0"/> <span
                                                            className="d-block fw-600 font-xssss text-grey-600 text-dark">Anton</span></a>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="owl-item acive"
                                                 style={{width: 'auto', marginRight: '7px'}}>
                                                <div className="item">
                                                    <div
                                                        className="card bg-transparent bg-transparent-card border-0 shadow-none">
                                                        <div className="card-image text-center"><a href="#"
                                                                                                   data-target="#Modalstries"
                                                                                                   data-toggle="modal"><img
                                                            src="images/user-21.png" alt="image"
                                                            className="d-inline p-0"/> <span
                                                            className="d-block fw-600 font-xssss text-grey-600 text-dark">Jane</span></a>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="owl-item acive"
                                                 style={{width: 'auto', marginRight: '7px'}}>

                                                <div className="item">
                                                    <div
                                                        className="card bg-transparent bg-transparent-card border-0 shadow-none">
                                                        <div className="card-image text-center"><a href="#"
                                                                                                   data-target="#Modalstries"
                                                                                                   data-toggle="modal"><img
                                                            src="images/user-25.png" alt="image"
                                                            className="d-inline p-0"/> <span
                                                            className="d-block fw-600 font-xssss text-grey-600 text-dark">Wade</span></a>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>


                            {/*video content*/}
                            <div>
                                {/* First video card */}
                                <div className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-3">
                                    <div className="card-body p-0 d-flex">
                                        <figure className="avatar me-3">
                                            <img src="images/user-8.png" alt="avatar"
                                                 className="shadow-sm rounded-circle w45"/>
                                        </figure>
                                        <h4 className="fw-700 text-grey-900 font-xssss mt-1">
                                            Anthony Daugloi
                                            <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">2 hours ago</span>
                                        </h4>
                                        <a href="#" className="ms-auto">
                                            <i className="ti-more-alt text-grey-900 btn-round-md bg-greylight font-xss"></i>
                                        </a>
                                    </div>
                                    <div className="card-body p-0 mb-3 rounded-3 overflow-hidden">
                                        <div className="player bg-transparent shadow-none">
                                            <video
                                                ref={videoRef1}
                                                controls
                                                preload="auto"
                                                poster="images/poster-1.png"
                                                style={{width: '100%', height: 'auto'}}
                                            >
                                                <source src="images/v-2.mp4" type="video/mp4"/>
                                                <p>
                                                    To view this video, please enable JavaScript, and consider upgrading
                                                    to a web browser that
                                                    <a href="https://videojs.com/html5-video-support/" target="_blank"
                                                       rel="noopener noreferrer">
                                                        supports HTML5 video
                                                    </a>
                                                </p>
                                            </video>
                                        </div>
                                    </div>
                                    <div className="card-body p-0 me-lg-5">
                                        <p className="fw-500 text-grey-500 lh-26 font-xssss w-100 mb-0">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus
                                            <a href="#" className="fw-600 text-primary ms-2">See more</a>
                                        </p>
                                    </div>
                                    <div className="card-body d-flex p-0 mt-3">
                                        <a href="#"
                                           className="d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss me-3">
                                            <i className="feather-thumbs-up text-white bg-primary me-1 btn-round-xs font-xss"></i>
                                            <i className="feather-heart text-white bg-red-gradiant me-2 btn-round-xs font-xss"></i>2.8K
                                            Like
                                        </a>
                                        <a href="#"
                                           className="d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss">
                                            <i className="feather-message-circle text-dark text-grey-900 btn-round-sm font-lg"></i>22
                                            Comment
                                        </a>
                                        <a href="#"
                                           className="ms-auto d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss">
                                            <i className="feather-share-2 text-grey-900 text-dark btn-round-sm font-lg"></i>
                                            <span className="d-none-xs">Share</span>
                                        </a>
                                    </div>
                                </div>

                                {/* Additional video cards (Second and Third) */}
                                <div className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-3">
                                    {/* Similar structure as above for the second and third cards */}
                                    <div className="card-body p-0 d-flex">
                                        <figure className="avatar me-3">
                                            <img src="images/user-8.png" alt="avatar"
                                                 className="shadow-sm rounded-circle w45"/>
                                        </figure>
                                        <h4 className="fw-700 text-grey-900 font-xssss mt-1">
                                            Anthony Daugloi
                                            <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">2 hours ago</span>
                                        </h4>
                                        <a href="#" className="ms-auto">
                                            <i className="ti-more-alt text-grey-900 btn-round-md bg-greylight font-xss"></i>
                                        </a>
                                    </div>
                                    <div className="card-body p-0 mb-3 rounded-3 overflow-hidden">
                                        <div className="player bg-transparent shadow-none">
                                            <video
                                                ref={videoRef2}
                                                controls
                                                preload="auto"
                                                poster="images/poster-2.png"
                                                style={{width: '100%', height: 'auto'}}
                                            >
                                                <source src="images/v-1.mp4" type="video/mp4"/>
                                                <p>
                                                    To view this video, please enable JavaScript, and consider upgrading
                                                    to a web browser that
                                                    <a href="https://videojs.com/html5-video-support/" target="_blank"
                                                       rel="noopener noreferrer">
                                                        supports HTML5 video
                                                    </a>
                                                </p>
                                            </video>
                                        </div>
                                    </div>
                                    <div className="card-body p-0 me-lg-5">
                                        <p className="fw-500 text-grey-500 lh-26 font-xssss w-100 mb-0">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor,
                                            ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra.
                                            Proin blandit ac massa sed rhoncus
                                            <a href="#" className="fw-600 text-primary ms-2">See more</a>
                                        </p>
                                    </div>
                                    <div className="card-body d-flex p-0 mt-3">
                                        <a href="#"
                                           className="d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss me-3">
                                            <i className="feather-thumbs-up text-white bg-primary me-1 btn-round-xs font-xss"></i>
                                            <i className="feather-heart text-white bg-red-gradiant me-2 btn-round-xs font-xss"></i>2.8K
                                            Like
                                        </a>
                                        <a href="#"
                                           className="d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss">
                                            <i className="feather-message-circle text-dark text-grey-900 btn-round-sm font-lg"></i>22
                                            Comment
                                        </a>
                                        <a href="#"
                                           className="ms-auto d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss">
                                            <i className="feather-share-2 text-grey-900 text-dark btn-round-sm font-lg"></i>
                                            <span className="d-none-xs">Share</span>
                                        </a>
                                    </div>
                                </div>

                                <div className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-3">
                                    <div className="card-body p-0 d-flex">
                                        <figure className="avatar me-3">
                                            <img src="images/user-7.png" alt="avatar"
                                                 className="shadow-sm rounded-circle w45"/>
                                        </figure>
                                        <h4 className="fw-700 text-grey-900 font-xssss mt-1">
                                            Anthony Daugloi
                                            <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">2 hours ago</span>
                                        </h4>
                                        <a href="#" className="ms-auto">
                                            <i className="ti-more-alt text-grey-900 btn-round-md bg-greylight font-xss"></i>
                                        </a>
                                    </div>
                                    <div className="card-body p-0 mb-3 rounded-3 overflow-hidden">
                                        <div className="player bg-transparent shadow-none">
                                            <video
                                                ref={videoRef3}
                                                controls
                                                preload="auto"
                                                poster="images/poster-3.png"
                                                style={{width: '100%', height: 'auto'}}
                                            >
                                                <source src="images/v-4.mp4" type="video/mp4"/>
                                                <p>
                                                    To view this video, please enable JavaScript, and consider upgrading
                                                    to a web browser that
                                                    <a href="https://videojs.com/html5-video-support/" target="_blank"
                                                       rel="noopener noreferrer">
                                                        supports HTML5 video
                                                    </a>
                                                </p>
                                            </video>
                                        </div>
                                    </div>
                                    <div className="card-body p-0 me-lg-5">
                                        <p className="fw-500 text-grey-500 lh-26 font-xssss w-100 mb-0">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor,
                                            ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra.
                                            Proin blandit ac massa sed rhoncus
                                            <a href="#" className="fw-600 text-primary ms-2">See more</a>
                                        </p>
                                    </div>
                                    <div className="card-body d-flex p-0 mt-3">
                                        <a href="#"
                                           className="d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss me-3">
                                            <i className="feather-thumbs-up text-white bg-primary me-1 btn-round-xs font-xss"></i>
                                            <i className="feather-heart text-white bg-red-gradiant me-2 btn-round-xs font-xss"></i>2.8K
                                            Like
                                        </a>
                                        <a href="#"
                                           className="d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss">
                                            <i className="feather-message-circle text-dark text-grey-900 btn-round-sm font-lg"></i>22
                                            Comment
                                        </a>
                                        <a href="#"
                                           className="ms-auto d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss">
                                            <i className="feather-share-2 text-grey-900 text-dark btn-round-sm font-lg"></i>
                                            <span className="d-none-xs">Share</span>
                                        </a>
                                    </div>
                                </div>

                                {/* Typing indicator card */}
                                <div className="card w-100 text-center shadow-xss rounded-xxl border-0 p-4 mb-3">
                                    <div className="snippet mt-2 ms-auto me-auto color-theme-blue" data-title=".dot-typing">
                                        <div className="stage">
                                            <div className="dot-typing"></div>
                                        </div>
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
