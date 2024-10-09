import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
// import { fetchUserById } from '../Services/api'; // Assume this is an API call to get user by ID

const UserViewProfile = () => {
    const {userId} = useParams(); // Get userId from the URL
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await (userId); // Fetch user data using the ID
                if (response.status) {
                    setUserData(response.user);
                } else {
                    setError("Failed to load user data.");
                }
            } catch (err) {
                setError(`An error occurred: ${err.message}`);
            }
        };
        fetchUser();
    }, [userId]);

    if (error) {
        return <p>{error}</p>;
    }

    if (!userData) {
        return <p>Loading...</p>;
    }
    return (
        <div>
            <div className="middle-sidebar-bottom">
                <div className="middle-sidebar-left">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="user-profile">
                                <div className="card w-100 border-0 p-0 bg-white shadow-xss rounded-xxl">
                                    <div className="card-body h250 p-0 rounded-xxl overflow-hidden m-3">
                                        <img src="images/u-bg.jpg" alt="background"/>
                                    </div>
                                    <div className="card-body p-0 position-relative">
                                        <figure className="avatar position-absolute w100 z-index-1"
                                                style={{top: '-40px', left: '30px'}}>
                                            <img src={userData.image || 'images/profile-2.png'} alt="user-avatar"
                                                 className="float-right p-1 bg-white rounded-circle w-100"/>
                                        </figure>
                                        <h4 className="fw-700 font-sm mt-2 mb-lg-5 mb-4 pl-15">
                                            {userData.name || 'User Name'}
                                            <span className="fw-500 font-xssss text-grey-500 mt-1 mb-3 d-block">
                            {userData.email || 'user@example.com'}
                        </span>
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-xxl-3 col-lg-4 pe-0">
                            <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3 mt-3">
                                <div className="card-body p-3 border-0">
                                    <div className="row">
                                        <div className="col-3">
                                            <div className="chart-container w50 h50">
                                                <div className="chart position-relative" data-percent="78"
                                                     style={{backgroundColor: '#a7d212'}}>
                                                    <span className="percent fw-700 font-xsss" data-after="%">78</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-8 ps-1">
                                            <h4 className="font-xsss d-block fw-700 mt-2 mb-0">Advanced Python
                                                Sass <span
                                                    className="float-right mt-2 font-xsssss text-grey-500">87%</span>
                                            </h4>
                                            <p className="font-xssss fw-600 text-grey-500 lh-26 mb-0">Designer</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3">
                                <div className="card-body d-block p-4">
                                    <h4 className="fw-700 mb-3 font-xsss text-grey-900">About</h4>
                                    <p className="fw-500 text-grey-500 lh-24 font-xssss mb-0">Lorem ipsum dolor sit
                                        amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non,
                                        feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed
                                        rhoncus</p>
                                </div>
                                <div className="card-body border-top-xs d-flex">
                                    <i className="feather-lock text-grey-500 me-3 font-lg"></i>
                                    <h4 className="fw-700 text-grey-900 font-xssss mt-0">Private <span
                                        className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">What's up, how are you?</span>
                                    </h4>
                                </div>

                                <div className="card-body d-flex pt-0">
                                    <i className="feather-eye text-grey-500 me-3 font-lg"></i>
                                    <h4 className="fw-700 text-grey-900 font-xssss mt-0">Visble <span
                                        className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">Anyone can find you</span>
                                    </h4>
                                </div>
                                <div className="card-body d-flex pt-0">
                                    <i className="feather-map-pin text-grey-500 me-3 font-lg"></i>
                                    <h4 className="fw-700 text-grey-900 font-xssss mt-1">Flodia, Austia </h4>
                                </div>
                                <div className="card-body d-flex pt-0">
                                    <i className="feather-users text-grey-500 me-3 font-lg"></i>
                                    <h4 className="fw-700 text-grey-900 font-xssss mt-1">Genarel Group</h4>
                                </div>
                            </div>
                            <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3">
                                <div className="card-body d-flex align-items-center  p-4">
                                    <h4 className="fw-700 mb-0 font-xssss text-grey-900">Photos</h4>
                                    <a href="#" className="fw-600 ms-auto font-xssss text-primary">See all</a>
                                </div>
                                <div className="card-body d-block pt-0 pb-2">
                                    <div className="row">
                                        <div className="col-6 mb-2 pe-1"><a href="images/e-2.jpg"
                                                                            data-lightbox="roadtrip"><img
                                            src="images/e-2.jpg" alt="image" className="img-fluid rounded-3 w-100"/></a>
                                        </div>
                                        <div className="col-6 mb-2 ps-1"><a href="images/e-3.jpg"
                                                                            data-lightbox="roadtrip"><img
                                            src="images/e-3.jpg" alt="image" className="img-fluid rounded-3 w-100"/></a>
                                        </div>
                                        <div className="col-6 mb-2 pe-1"><a href="images/e-4.jpg"
                                                                            data-lightbox="roadtrip"><img
                                            src="images/e-4.jpg" alt="image" className="img-fluid rounded-3 w-100"/></a>
                                        </div>
                                        <div className="col-6 mb-2 ps-1"><a href="images/e-5.jpg"
                                                                            data-lightbox="roadtrip"><img
                                            src="images/e-5.jpg" alt="image" className="img-fluid rounded-3 w-100"/></a>
                                        </div>
                                        <div className="col-6 mb-2 pe-1"><a href="images/e-2.jpg"
                                                                            data-lightbox="roadtrip"><img
                                            src="images/e-2.jpg" alt="image" className="img-fluid rounded-3 w-100"/></a>
                                        </div>
                                        <div className="col-6 mb-2 ps-1"><a href="images/e-1.jpg"
                                                                            data-lightbox="roadtrip"><img
                                            src="images/e-1.jpg" alt="image" className="img-fluid rounded-3 w-100"/></a>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body d-block w-100 pt-0">
                                    <a href="#"
                                       className="p-2 lh-28 w-100 d-block bg-grey text-grey-800 text-center font-xssss fw-700 rounded-xl"><i
                                        className="feather-external-link font-xss me-2"></i> More</a>
                                </div>
                            </div>

                            <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3">
                                <div className="card-body d-flex align-items-center  p-4">
                                    <h4 className="fw-700 mb-0 font-xssss text-grey-900">Event</h4>
                                    <a href="#" className="fw-600 ms-auto font-xssss text-primary">See all</a>
                                </div>
                                <div className="card-body d-flex pt-0 ps-4 pe-4 pb-3 overflow-hidden">
                                    <div className="bg-success me-2 p-3 rounded-xxl"><h4
                                        className="fw-700 font-lg ls-3 lh-1 text-white mb-0"><span
                                        className="ls-1 d-block font-xsss text-white fw-600">FEB</span>22</h4></div>
                                    <h4 className="fw-700 text-grey-900 font-xssss mt-2">Meeting with clients <span
                                        className="d-block font-xsssss fw-500 mt-1 lh-4 text-grey-500">41 madison ave, floor 24 new work, NY 10010</span>
                                    </h4>
                                </div>

                                <div className="card-body d-flex pt-0 ps-4 pe-4 pb-3 overflow-hidden">
                                    <div className="bg-warning me-2 p-3 rounded-xxl"><h4
                                        className="fw-700 font-lg ls-3 lh-1 text-white mb-0"><span
                                        className="ls-1 d-block font-xsss text-white fw-600">APR</span>30</h4></div>
                                    <h4 className="fw-700 text-grey-900 font-xssss mt-2">Developer Programe <span
                                        className="d-block font-xsssss fw-500 mt-1 lh-4 text-grey-500">41 madison ave, floor 24 new work, NY 10010</span>
                                    </h4>
                                </div>

                                <div className="card-body d-flex pt-0 ps-4 pe-4 pb-3 overflow-hidden">
                                    <div className="bg-primary me-2 p-3 rounded-xxl"><h4
                                        className="fw-700 font-lg ls-3 lh-1 text-white mb-0"><span
                                        className="ls-1 d-block font-xsss text-white fw-600">APR</span>23</h4></div>
                                    <h4 className="fw-700 text-grey-900 font-xssss mt-2">Aniversary Event <span
                                        className="d-block font-xsssss fw-500 mt-1 lh-4 text-grey-500">41 madison ave, floor 24 new work, NY 10010</span>
                                    </h4>
                                </div>

                            </div>
                        </div>
                        <div className="col-xl-8 col-xxl-9 col-lg-8">


                            <div className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-3">
                                <div className="card-body p-0 d-flex">
                                    <figure className="avatar me-3"><img src="images/user-7.png" alt="image"
                                                                         className="shadow-sm rounded-circle w45"/>
                                    </figure>
                                    <h4 className="fw-700 text-grey-900 font-xssss mt-1">Anthony Daugloi <span
                                        className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">3 hour ago</span>
                                    </h4>
                                    <a href="#" className="ms-auto" id="dropdownMenu7" data-toggle="dropdown"
                                       aria-haspopup="true" aria-expanded="false"><i
                                        className="ti-more-alt text-grey-900 btn-round-md bg-greylight font-xss"></i></a>
                                    <div className="dropdown-menu dropdown-menu-end p-4 rounded-xxl border-0 shadow-lg"
                                         aria-labelledby="dropdownMenu7">
                                        <div className="card-body p-0 d-flex">
                                            <i className="feather-bookmark text-grey-500 me-3 font-lg"></i>
                                            <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4">Save Link <span
                                                className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">Add this to your saved items</span>
                                            </h4>
                                        </div>
                                        <div className="card-body p-0 d-flex mt-2">
                                            <i className="feather-alert-circle text-grey-500 me-3 font-lg"></i>
                                            <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4">Hide Post <span
                                                className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">Save to your saved items</span>
                                            </h4>
                                        </div>
                                        <div className="card-body p-0 d-flex mt-2">
                                            <i className="feather-alert-octagon text-grey-500 me-3 font-lg"></i>
                                            <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4">Hide all from
                                                Group <span
                                                    className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">Save to your saved items</span>
                                            </h4>
                                        </div>
                                        <div className="card-body p-0 d-flex mt-2">
                                            <i className="feather-lock text-grey-500 me-3 font-lg"></i>
                                            <h4 className="fw-600 mb-0 text-grey-900 font-xssss mt-0 me-4">Unfollow
                                                Group <span
                                                    className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">Save to your saved items</span>
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body p-0 me-lg-5">
                                    <p className="fw-500 text-grey-500 lh-26 font-xssss w-100">Lorem ipsum dolor sit
                                        amet,
                                        consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat
                                        non
                                        nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus <a
                                            href="#" className="fw-600 text-primary ms-2">See more</a></p>
                                </div>
                                <div className="card-body d-block p-0">
                                    <div className="row ps-2 pe-2">
                                        <div className="col-xs-4 col-sm-4 p-1"><a href="images/t-10.jpg"
                                                                                  data-lightbox="roadtrip"><img
                                            src="images/t-10.jpg" className="rounded-3 w-100" alt="image"/></a></div>
                                        <div className="col-xs-4 col-sm-4 p-1"><a href="images/t-11.jpg"
                                                                                  data-lightbox="roadtrip"><img
                                            src="images/t-11.jpg" className="rounded-3 w-100" alt="image"/></a></div>
                                        <div className="col-xs-4 col-sm-4 p-1"><a href="images/t-12.jpg"
                                                                                  data-lightbox="roadtrip"
                                                                                  className="position-relative d-block"><img
                                            src="images/t-12.jpg" className="rounded-3 w-100" alt="image"/><span
                                            className="img-count font-sm text-white ls-3 fw-600"><b>+2</b></span></a>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body d-flex p-0 mt-3">
                                    <a href="#"
                                       className="d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss me-3"><i
                                        className="feather-thumbs-up text-white bg-primary me-1 btn-round-xs font-xss"></i>
                                        <i className="feather-heart text-white bg-red-gradiant me-2 btn-round-xs font-xss"></i>2.8K
                                        Like</a>
                                    <a href="#"
                                       className="d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss"><i
                                        className="feather-message-circle text-dark text-grey-900 btn-round-sm font-lg"></i>22
                                        Comment</a>
                                    <a href="#"
                                       className="ms-auto d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss"><i
                                        className="feather-share-2 text-grey-900 text-dark btn-round-sm font-lg"></i><span
                                        className="d-none-xs">Share</span></a>
                                </div>
                            </div>

                            <div className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-0">
                                <div className="card-body p-0 d-flex">
                                    <figure className="avatar me-3"><img src="images/user-8.png" alt="image"
                                                                         className="shadow-sm rounded-circle w45"/>
                                    </figure>
                                    <h4 className="fw-700 text-grey-900 font-xssss mt-1">Anthony Daugloi <span
                                        className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">2 hour ago</span>
                                    </h4>
                                    <a href="#" className="ms-auto" id="dropdownMenu2" data-toggle="dropdown"
                                       aria-haspopup="true" aria-expanded="false"><i
                                        className="ti-more-alt text-grey-900 btn-round-md bg-greylight font-xss"></i></a>
                                    <div className="dropdown-menu dropdown-menu-end p-4 rounded-xxl border-0 shadow-lg"
                                         aria-labelledby="dropdownMenu2">
                                        <div className="card-body p-0 d-flex">
                                            <i className="feather-bookmark text-grey-500 me-3 font-lg"></i>
                                            <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4">Save Link <span
                                                className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">Add this to your saved items</span>
                                            </h4>
                                        </div>
                                        <div className="card-body p-0 d-flex mt-2">
                                            <i className="feather-alert-circle text-grey-500 me-3 font-lg"></i>
                                            <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4">Hide Post <span
                                                className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">Save to your saved items</span>
                                            </h4>
                                        </div>
                                        <div className="card-body p-0 d-flex mt-2">
                                            <i className="feather-alert-octagon text-grey-500 me-3 font-lg"></i>
                                            <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4">Hide all from
                                                Group <span
                                                    className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">Save to your saved items</span>
                                            </h4>
                                        </div>
                                        <div className="card-body p-0 d-flex mt-2">
                                            <i className="feather-lock text-grey-500 me-3 font-lg"></i>
                                            <h4 className="fw-600 mb-0 text-grey-900 font-xssss mt-0 me-4">Unfollow
                                                Group <span
                                                    className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">Save to your saved items</span>
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body p-0 me-lg-5">
                                    <p className="fw-500 text-grey-500 lh-26 font-xssss w-100">Lorem ipsum dolor sit
                                        amet,
                                        consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat
                                        non
                                        nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus <a
                                            href="#" className="fw-600 text-primary ms-2">See more</a></p>
                                </div>
                                <div className="card-body d-flex p-0">
                                    <a href="#"
                                       className="d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss me-3"><i
                                        className="feather-thumbs-up text-white bg-primary me-1 btn-round-xs font-xss"></i>
                                        <i className="feather-heart text-white bg-red-gradiant me-2 btn-round-xs font-xss"></i>2.8K
                                        Like</a>
                                    <a href="#"
                                       className="d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss"><i
                                        className="feather-message-circle text-dark text-grey-900 btn-round-sm font-lg"></i>22
                                        Comment</a>
                                    <a href="#"
                                       className="ms-auto d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss"><i
                                        className="feather-share-2 text-grey-900 text-dark btn-round-sm font-lg"></i><span
                                        className="d-none-xs">Share</span></a>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserViewProfile;
