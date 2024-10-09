import React from 'react';
import {useState , useEffect} from "react";
import {Link} from 'react-router-dom';


export const Navbar = ({handleChatToggle}) => {
    const [isNavActive, setIsNavActive] = useState(false);
    const [isSearchVisible, setIsSearchVisible] = useState(false);


    // Toggle navigation active state
    const toggleNavActive = () => {
        setIsNavActive(prev => !prev);
    };



    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    //notification drop down
    const [isNotifDropdown, setIsNotifDropdown] = useState(false);

    // Toggle dropdown visibility
    const handleDropdownToggle = () => {
        setIsNotifDropdown(!isNotifDropdown);
    };

// Setting dropdown color
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };


    // Toggle search visibility
    const toggleSearch = () => {
        console.log('search visible' , isSearchVisible);
        setIsSearchVisible(!isSearchVisible);
    };






    return(
        <div>
            { /* navigation top start */}
            <div className="nav-header bg-white shadow-xs border-0">
                <div className="nav-top">
                    <Link to="/default">
                        <i className="feather-zap text-success display1-size me-2 ms-0"></i>
                        <span
                            className="d-inline-block fredoka-font ls-3 fw-600 text-current font-xxl logo-text mb-0">Sociala.</span>
                    </Link>
                    <Link to="#" className="mob-menu ms-auto me-2 chat-active-btn">
                        <i className="feather-message-circle text-grey-900 font-sm btn-round-md bg-greylight"
                           onClick={handleChatToggle}></i>
                    </Link>
                    <Link to="/default-video" className="mob-menu me-2">
                        <i className="feather-video text-grey-900 font-sm btn-round-md bg-greylight"></i>
                    </Link>
                    {/* Search Icon */}
                    <Link to="#" onClick={toggleSearch} className="me-2 menu-search-icon mob-menu">
                        <i className="feather-search text-grey-900 font-sm btn-round-md bg-greylight"></i>
                    </Link>
                    <button
                        type='button'
                        className={`nav-menu me-0 ms-2 ${isNavActive ? 'active' : ''}`} // Apply 'active' class if isNavActive is true
                        onClick={toggleNavActive} // Toggle active state on click
                    >
                        Toggle Menu
                    </button>
                </div>

                <form action="#" className="float-left header-search">
                    <div className="form-group mb-0 icon-input">
                        <i className="feather-search font-sm text-grey-400"></i>
                        <input
                            type="text"
                            placeholder="Start typing to search.."
                            className="bg-grey border-0 lh-32 pt-2 pb-2 ps-5 pe-3 font-xssss fw-500 rounded-xl w350 theme-dark-bg"
                        />
                    </div>
                </form>

                <Link to="/default" className="p-2 text-center ms-3 menu-icon center-menu-icon">
                    <i className="feather-home font-lg alert-primary btn-round-lg theme-dark-bg text-current"></i>
                </Link>
                <Link to="/default-stories" className="p-2 text-center ms-0 menu-icon center-menu-icon">
                    <i className="feather-zap font-lg bg-greylight btn-round-lg theme-dark-bg text-grey-500"
                       style={{padding: 'inherit'}}></i>
                </Link>
                <Link to="/default-video" className="p-2 text-center ms-0 menu-icon center-menu-icon">
                    <i className="feather-video font-lg bg-greylight btn-round-lg theme-dark-bg text-grey-500"
                       style={{padding: 'inherit'}}></i>
                </Link>
                <Link to="/default-group" className="p-2 text-center ms-0 menu-icon center-menu-icon">
                    <i className="feather-user font-lg bg-greylight btn-round-lg theme-dark-bg text-grey-500"
                       style={{padding: 'inherit'}}></i>
                </Link>
                <Link to="/shop-2" className="p-2 text-center ms-0 menu-icon center-menu-icon">
                    <i className="feather-shopping-bag font-lg bg-greylight btn-round-lg theme-dark-bg text-grey-500"
                       style={{padding: 'inherit'}}></i>
                </Link>


                {/* Notification Icon */}
                <Link
                    to="#"
                    className={`p-2 text-center ms-auto menu-icon ${isNotifDropdown ? 'show' : ''}`}
                    id="dropdownMenu3"
                    onClick={handleDropdownToggle}
                    aria-expanded={isNotifDropdown ? 'true' : 'false'}
                >
                    <span className="dot-count bg-warning"></span>
                    <i className="feather-bell font-xl text-current"></i>
                </Link>

                {/* Notification Dropdown */}
                <div
                    className={`dropdown-menu dropdown-menu-end p-4 rounded-3 border-0 shadow-lg ${isNotifDropdown ? 'show' : ''}`}
                    aria-labelledby="dropdownMenu3"
                    style={{
                        margin: '0px',
                        display: isNotifDropdown ? 'block' : 'none',
                        position: isNotifDropdown ? 'absolute' : 'static',
                        inset: isNotifDropdown ? '0px auto auto 0px' : '',
                        transform: isNotifDropdown ? 'translate3d(794.5px, 75.5px, 0px)' : ''
                    }}
                    data-popper-placement={isNotifDropdown ? 'bottom-end' : undefined}
                >
                    <h4 className="fw-700 font-xss mb-4">Notification</h4>
                    <div className="card bg-transparent-card w-100 border-0 ps-5 mb-3">
                        <img src="images/user-8.png" alt="user" className="w40 position-absolute left-0"/>
                        <h5 className="font-xsss text-grey-900 mb-1 mt-0 fw-700 d-block">
                            Hendrix Stamp
                            <span className="text-grey-400 font-xsssss fw-600 float-right mt-1"> 3 min</span>
                        </h5>
                        <h6 className="text-grey-500 fw-500 font-xssss lh-4">There are many variations of pass..</h6>
                    </div>
                    <div className="card bg-transparent-card w-100 border-0 ps-5 mb-3">
                        <img src="images/user-4.png" alt="user" className="w40 position-absolute left-0"/>
                        <h5 className="font-xsss text-grey-900 mb-1 mt-0 fw-700 d-block">
                            Goria Coast
                            <span className="text-grey-400 font-xsssss fw-600 float-right mt-1"> 2 min</span>
                        </h5>
                        <h6 className="text-grey-500 fw-500 font-xssss lh-4">Mobile Apps UI Designer is require..</h6>
                    </div>
                    <div className="card bg-transparent-card w-100 border-0 ps-5 mb-3">
                        <img src="images/user-7.png" alt="user" className="w40 position-absolute left-0"/>
                        <h5 className="font-xsss text-grey-900 mb-1 mt-0 fw-700 d-block">
                            Surfiya Zakir
                            <span className="text-grey-400 font-xsssss fw-600 float-right mt-1"> 1 min</span>
                        </h5>
                        <h6 className="text-grey-500 fw-500 font-xssss lh-4">Mobile Apps UI Designer is require..</h6>
                    </div>
                    <div className="card bg-transparent-card w-100 border-0 ps-5">
                        <img src="images/user-6.png" alt="user" className="w40 position-absolute left-0"/>
                        <h5 className="font-xsss text-grey-900 mb-1 mt-0 fw-700 d-block">
                            Victor Exrixon
                            <span className="text-grey-400 font-xsssss fw-600 float-right mt-1"> 30 sec</span>
                        </h5>
                        <h6 className="text-grey-500 fw-500 font-xssss lh-4">Mobile Apps UI Designer is require..</h6>
                    </div>
                </div>
                {/* Notification Dropdown  end*/}
                {/* setting ic end*/}
                <Link to="#" className="p-2 text-center ms-3 menu-icon chat-active-btn " onClick={handleChatToggle}>
                    <i className="feather-message-square font-xl text-current"></i>
                </Link>
                {/* seting Dropdown  start*/}


                <Link to="/default-settings" className="p-0 ms-3 menu-icon">
                    <img src="/images/profile-4.png" alt="user" className="w40 mt--1"/>

                </Link>
            </div>
            {/* navigation top end */}

            {/* navigation left start */}

            <nav className={`navigation scroll-bar ${isNavActive ? 'nav-active' : ''}`}>
                <div className="container ps-0 pe-0">
                    <div className="nav-content">
                        <div
                            className="nav-wrap bg-white bg-transparent-card rounded-xxl shadow-xss pt-3 pb-1 mb-2 mt-2">
                            <div className="nav-caption fw-600 font-xssss text-grey-500"><span>New </span>Feeds
                            </div>
                            <ul className="mb-1 top-content">
                                <li className="logo d-none d-xl-block d-lg-block"></li>
                                <li>
                                    <Link to="/default" className="nav-content-bttn open-font">
                                        <i className="feather-tv btn-round-md bg-blue-gradiant me-3"></i>
                                        <span>Newsfeed</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/default-badge" className="nav-content-bttn open-font">
                                        <i className="feather-award btn-round-md bg-red-gradiant me-3"></i>
                                        <span>Badges</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/default-stories" className="nav-content-bttn open-font">
                                        <i className="feather-globe btn-round-md bg-gold-gradiant me-3"></i>
                                        <span>Explore Stories</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/default-group" className="nav-content-bttn open-font">
                                        <i className="feather-zap btn-round-md bg-mini-gradiant me-3"></i>
                                        <span>Popular Groups</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/user-page" className="nav-content-bttn open-font">
                                        <i className="feather-user btn-round-md bg-primary me-3"></i>
                                        <span>Author Profile </span>
                                    </Link>
                                </li>

                            </ul>
                        </div>

                        <div
                            className="nav-wrap bg-white bg-transparent-card rounded-xxl shadow-xss pt-3 pb-1 mb-2">
                            <div className="nav-caption fw-600 font-xssss text-grey-500"><span>More </span>Pages
                            </div>
                            <ul className="mb-3">
                                <li>
                                    <Link to="/default-emailbox" className="nav-content-bttn open-font">
                                        <i className="font-xl text-current feather-inbox me-3"></i>
                                        <span>Email Box</span>
                                        <span className="circle-count bg-warning mt-1">584</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/default-hotel" className="nav-content-bttn open-font">
                                        <i className="font-xl text-current feather-home me-3"></i>
                                        <span>Near Hotel</span>
                                    </Link>
                                </li>


                                <li>
                                    <Link to="/default-event" className="nav-content-bttn open-font">
                                        <i className="font-xl text-current feather-map-pin me-3"></i>
                                        <span>Latest Event</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/default-live-stream" className="nav-content-bttn open-font">
                                        <i className="font-xl text-current feather-youtube me-3"></i>
                                        <span>Live Stream</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className="nav-wrap bg-white bg-transparent-card rounded-xxl shadow-xss pt-3 pb-1">
                            <div className="nav-caption fw-600 font-xssss text-grey-500"><span></span> Account
                            </div>
                            <ul className="mb-1">
                                <li className="logo d-none d-xl-block d-lg-block"></li>
                                <li>
                                    <Link to="/default-settings"
                                          className="nav-content-bttn open-font h-auto pt-2 pb-2">
                                        <i className="font-sm feather-settings me-3 text-grey-500"></i>
                                        <span>Settings</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/user"
                                          className="nav-content-bttn open-font h-auto pt-2 pb-2">
                                        <i className="font-sm feather-user me-3 text-grey-500"></i>
                                        <span>Users</span>
                                    </Link>
                                </li>


                                <li>
                                    <Link to="/default-analytics"
                                          className="nav-content-bttn open-font h-auto pt-2 pb-2">
                                        <i className="font-sm feather-pie-chart me-3 text-grey-500"></i>
                                        <span>Analytics</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/default-message"
                                          className="nav-content-bttn open-font h-auto pt-2 pb-2">
                                        <i className="font-sm feather-message-square me-3 text-grey-500"></i>
                                        <span>Chat</span>
                                        <span className="circle-count bg-warning mt-0">23</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            { /* navigation left end */}
            { /* app footer*/}
            <div className="app-footer border-0 shadow-lg bg-primary">
                <Link to="/default" className="nav-content-bttn nav-center"><i className="feather-home"></i></Link>

                <Link to="/default-video" className="nav-content-bttn"><i className="feather-package"></i></Link>

                <Link to="/default-live-stream" className="nav-content-bttn" data-tab="chats"><i
                    className="feather-layout"></i></Link>

                <Link to="/shop-2" className="nav-content-bttn"><i className="feather-layers"></i></Link>

                <Link to="/default-settings" className="nav-content-bttn">
                    <img src="images/female-profile.png" alt="user" className="w30 shadow-xss"/></Link>
            </div>
            {/* Search Bar with dynamic class */}
            <div className={`app-header-search ${isSearchVisible ? 'show' : ''}`}>
                <form className="search-form">
                    <div className="form-group searchbox mb-0 border-0 p-1">
                        <input type="text" className="form-control border-0" placeholder="Search..." />
                        <i className="input-icon">
                            <ion-icon
                                name="search-outline"
                                role="img"
                                className="md hydrated"
                                aria-label="search outline"
                            ></ion-icon>
                        </i>

                        {/* Close Button */}
                        <Link to="#" onClick={toggleSearch} className="ms-1 mt-1 d-inline-block close searchbox-close">
                            <i className="ti-close font-xs"></i>
                        </Link>
                    </div>
                </form>
            </div>

        </div>
    )

}

