import {Link} from 'react-router-dom'; // Assuming you're using React Router for navigation
import AuthContext from "../Context/Authcontext";
import React, {useContext} from 'react';

const Settings = () => {
    const {logout} = useContext(AuthContext);
    return (
        <div className=" bg-lightblue theme-dark-bg">
            <div className="middle-sidebar-bottom">
                <div className="middle-sidebar-left">
                    <div className="middle-wrap">
                        <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                            <div className="card-body p-lg-5 p-4 w-100 border-0">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <h4 className="mb-4 font-xxl fw-700 mont-font mb-lg-5 mb-4 font-md-xs">Settings</h4>
                                        <div className="nav-caption fw-600 font-xsss text-grey-500 mb-2">General</div>
                                        <ul className="list-inline mb-4">
                                            <li className="list-inline-item d-block border-bottom me-0">
                                                <Link to="/account-information"
                                                      className="pt-2 pb-2 d-flex align-items-center">
                                                    <i className="btn-round-md bg-primary text-white feather-home font-md me-3"></i>
                                                    <h4 className="fw-600 font-xsss mb-0 mt-0">Account Information</h4>
                                                    <i className="ti-angle-right font-xsss text-grey-500 ms-auto mt-3"></i>
                                                </Link>
                                            </li>
                                            <li className="list-inline-item d-block border-bottom me-0">
                                                <Link to="/contact-information"
                                                      className="pt-2 pb-2 d-flex align-items-center">
                                                    <i className="btn-round-md bg-gold-gradiant text-white feather-map-pin font-md me-3"></i>
                                                    <h4 className="fw-600 font-xsss mb-0 mt-0">Saved Address</h4>
                                                    <i className="ti-angle-right font-xsss text-grey-500 ms-auto mt-3"></i>
                                                </Link>
                                            </li>
                                            <li className="list-inline-item d-block me-0">
                                                <Link to="/social" className="pt-2 pb-2 d-flex align-items-center">
                                                    <i className="btn-round-md bg-red-gradiant text-white feather-twitter font-md me-3"></i>
                                                    <h4 className="fw-600 font-xsss mb-0 mt-0">Social Account</h4>
                                                    <i className="ti-angle-right font-xsss text-grey-500 ms-auto mt-3"></i>
                                                </Link>
                                            </li>
                                        </ul>

                                        <div className="nav-caption fw-600 font-xsss text-grey-500 mb-2">Account</div>
                                        <ul className="list-inline mb-4">
                                            <li className="list-inline-item d-block border-bottom me-0">
                                                <Link to="/payment" className="pt-2 pb-2 d-flex align-items-center">
                                                    <i className="btn-round-md bg-mini-gradiant text-white feather-credit-card font-md me-3"></i>
                                                    <h4 className="fw-600 font-xsss mb-0 mt-0">My Cards</h4>
                                                    <i className="ti-angle-right font-xsss text-grey-500 ms-auto mt-3"></i>
                                                </Link>
                                            </li>
                                            <li className="list-inline-item d-block me-0">
                                                <Link to="/password" className="pt-2 pb-2 d-flex align-items-center">
                                                    <i className="btn-round-md bg-blue-gradiant text-white feather-inbox font-md me-3"></i>
                                                    <h4 className="fw-600 font-xsss mb-0 mt-0">Password</h4>
                                                    <i className="ti-angle-right font-xsss text-grey-500 ms-auto mt-3"></i>
                                                </Link>
                                            </li>
                                        </ul>

                                        <div className="nav-caption fw-600 font-xsss text-grey-500 mb-2">Other</div>
                                        <ul className="list-inline">
                                            <li className="list-inline-item d-block border-bottom me-0">
                                                <Link to="/default-notification"
                                                      className="pt-2 pb-2 d-flex align-items-center">
                                                    <i className="btn-round-md bg-gold-gradiant text-white feather-bell font-md me-3"></i>
                                                    <h4 className="fw-600 font-xsss mb-0 mt-0">Notification</h4>
                                                    <i className="ti-angle-right font-xsss text-grey-500 ms-auto mt-3"></i>
                                                </Link>
                                            </li>
                                            <li className="list-inline-item d-block border-bottom me-0">
                                                <Link to="/help-box" className="pt-2 pb-2 d-flex align-items-center">
                                                    <i className="btn-round-md bg-primary text-white feather-help-circle font-md me-3"></i>
                                                    <h4 className="fw-600 font-xsss mb-0 mt-0">Help</h4>
                                                    <i className="ti-angle-right font-xsss text-grey-500 ms-auto mt-3"></i>
                                                </Link>
                                            </li>
                                            <li className="list-inline-item d-block me-0">
                                                <a href="#" className="pt-2 pb-2 d-flex align-items-center">
                                                    <i className="btn-round-md bg-red-gradiant text-white feather-lock font-md me-3"></i>
                                                    <h4 className="fw-600 font-xsss mb-0 mt-0"
                                                        onClick={logout}>Logout</h4>
                                                    <i className="ti-angle-right font-xsss text-grey-500 ms-auto mt-3"></i>
                                                </a>
                                            </li>
                                        </ul>
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

export default Settings;
