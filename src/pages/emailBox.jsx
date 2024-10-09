import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

export const EmailBox = () => {
    const [isChatActive, setIsChatActive] = useState(false);
    const [mainContentLoading, setMainContentLoading] = useState(true);
    const [chatLoading, setChatLoading] = useState(true);
    const [isNavActive, setIsNavActive] = useState(false);

    const [isSearchVisible, setIsSearchVisible] = useState(false);
    // Toggle navigation active state
    const toggleNavActive = () => {
        setIsNavActive(prev => !prev);
    };

    // Toggle search visibility
    const toggleSearch = () => {
        console.log('search visible', isSearchVisible);
        setIsSearchVisible(!isSearchVisible);
    };

    // Toggle chat active state
    const handleChatToggle = () => {
        setIsChatActive(!isChatActive);
    };

    useEffect(() => {
        // Simulate loading for main content for 3 seconds
        const mainContentTimer = setTimeout(() => {
            setMainContentLoading(false);
        }, 3000);

        // Simulate loading for chat content for 2 seconds
        const chatTimer = setTimeout(() => {
            setChatLoading(false);
        }, 2000);

        // Cleanup the timers when the component unmounts
        return () => {
            clearTimeout(mainContentTimer);
            clearTimeout(chatTimer);
        };
    }, []);

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

    const menuItems = [
        {href: "#", icon: "feather-mail", text: "Inbox", count: 233, textColor: "text-grey-900"},
        {href: "#", icon: "feather-star", text: "Starred", count: 1235, textColor: "text-grey-600"},
        {href: "#", icon: "feather-send", text: "Sent", count: 54, textColor: "text-grey-600"},
        {href: "#", icon: "feather-file", text: "Draft", count: 66, textColor: "text-grey-600"},
        {href: "#", icon: "feather-alert-circle", text: "Span", count: 12, textColor: "text-grey-600"},
        {href: "#", icon: "feather-anchor", text: "Work", count: 12, textColor: "text-grey-600"},
        {href: "#", icon: "feather-trash-2", text: "Trash", count: 34, textColor: "text-grey-600"},
    ];

    const categories = [
        {href: "#", color: "bg-primary", text: "Primary", count: 233},
        {href: "#", color: "bg-danger", text: "Social", count: 1235},
        {href: "#", color: "bg-warning", text: "Works", count: 54},
        {href: "#", color: "bg-success", text: "Promotions", count: 66},
        {href: "#", color: "bg-secondary", text: "Friends", count: 23},
    ];


    return (
        <>
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


                <Link to="/default-setting" className="p-0 ms-3 menu-icon">
                    <img src="/images/profile-4.png" alt="user" className="w40 mt--1"/>

                </Link>
            </div>
            {/* navigation top end */}
            {/*nav left start*/}
            <nav className={`navigation scroll-bar ${isNavActive ? 'nav-active' : ''}`}>
                <div className="container ps-0 pe-0">
                    <div className="p-3 bg-white theme-dark-bg">
                        <Link
                            to="#"
                            className="bg-primary p-3 w-100 btn-block border-0 rounded-3 text-white text-center fw-500 font-xsss"
                        >
                            <i className="feather-edit me-2"></i> Write Message
                        </Link>
                        <ul className="mt-3">
                            {menuItems.map((item, index) => (
                                <li key={index} className="mt-1 mb-1">
                                    <Link
                                        to={item.href}
                                        className={`bg-white theme-dark-bg p-2 w-100 border-0 rounded-3 text-dark ${item.textColor} text-left fw-600 font-xsss d-flex align-items-center`}
                                    >
                                        <i className={`feather ${item.icon} font-md btn-round-sm me-2 p-0`}></i> {item.text}
                                        <span className="ms-auto font-xssss text-grey-500">{item.count}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <span className="fw-500 mt-3 font-xssss fw-700 text-uppercase ls-2 ps-3 text-grey-500">
            Categories
          </span>
                        <ul className="mt-3">
                            {categories.map((category, index) => (
                                <li key={index} className="mt-1 mb-1">
                                    <Link
                                        to={category.href}
                                        className="bg-white theme-dark-bg p-2 w-100 border-0 rounded-3 text-dark text-grey-500 text-left fw-600 font-xsss d-flex align-items-center"
                                    >
                                        <span
                                            className={`btn-round-xss ms-2 ${category.color} me-3`}></span> {category.text}
                                        <span className="ms-auto font-xssss text-grey-500">{category.count}</span>
                                    </Link>
                                </li>
                            ))}
                            <li className="mt-1 mb-0">
                                <Link
                                    to="#"
                                    className="bg-greylight p-2 w-100 border-0 rounded-3 text-grey-500 text-left fw-600 font-xsss d-flex align-items-center"
                                >
                                    <i className="feather-plus font-sm btn-round-sm me-2 p-0"></i> Create New Label
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            {/*nav left end*/}
            <div className="main-content ">
                <div className="middle-sidebar-bottom">
                    <div
                        className="middle-sidebar-left pe-0 ps-lg-3 ms-0 me-0"
                        style={{maxWidth: "100%"}}
                    >
                        <div className="row mail-box">
                            <div className="col-lg-12">
                                <div
                                    className="chat-wrapper p-3 w-100 position-relative scroll-bar bg-white theme-dark-bg">
                                    <ul className="email-message">
                                        <li>
                                            <Link
                                                to="/default-emailopen"
                                                className="rounded-3 bg-lightblue theme-light-bg"
                                            >
                                                <div className="form-check mt-1">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="blankCheckbox1"
                                                        value="option1"
                                                        aria-label=""
                                                    />
                                                    <label
                                                        className="text-grey-500 font-xssss"
                                                        htmlFor="blankCheckbox1"
                                                    ></label>
                                                </div>
                                                <div className="email-user">
                                                    <span className="btn-round-xss ms-0 bg-success me-2"></span>
                                                    <img
                                                        src="images/user-12.png"
                                                        alt="user"
                                                        className="w35 me-2"
                                                    />
                                                    <h6 className="font-xssss text-grey-900 mb-0 mt-0 fw-700">
                                                        Hurin Seary
                                                    </h6>
                                                </div>
                                                <div
                                                    className="email-subject text-grey-900 text-dark fw-600 font-xssss">
                                                    <i className="feather-star font-xss text-warning me-2"></i>
                                                    Mobile Apps Redesign
                                                </div>
                                                <div className="email-text text-grey-500 fw-600 font-xssss">
                                                    Hey Cak, Could you free now? Can you look and read the brief
                                                    first before...
                                                </div>
                                                <span className="email-file"><i
                                                    className="feather-paperclip font-xss btn-round-sm text-grey-500 me-2 p-0"></i></span>
                                                <div className="email-time text-grey-500 fw-600">12:48PM</div>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/default-emailopen" className="rounded-3 bg-transparent">
                                                <div className="form-check mt-1">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="blankCheckbox2"
                                                        value="option1"
                                                        aria-label=""
                                                    />
                                                    <label
                                                        className="text-grey-500 font-xssss"
                                                        htmlFor="blankCheckbox2"
                                                    ></label>
                                                </div>
                                                <div className="email-user">
                                                    <span className="btn-round-xss ms-0 bg-success me-2"></span>
                                                    <img
                                                        src="images/user-8.png"
                                                        alt="user"
                                                        className="w35 me-2"
                                                    />
                                                    <h6 className="font-xssss text-grey-900 mb-0 mt-0 fw-700">
                                                        Victor Exrixon
                                                    </h6>
                                                </div>
                                                <div
                                                    className="email-subject text-grey-900 text-dark fw-600 font-xssss">
                                                    <i className="feather-star font-xss text-warning me-2"></i>
                                                    Mobile Apps Redesign
                                                </div>
                                                <div className="email-text text-grey-500 fw-600 font-xssss">
                                                    Hey Cak, Could you free now? Can you look and read the brief
                                                    first before...
                                                </div>
                                                <span className="email-file"><i
                                                    className="feather-paperclip font-xss btn-round-sm text-grey-500 me-2 p-0"></i></span>
                                                <div className="email-time text-grey-500 fw-600">12:48PM</div>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/default-emailopen" className="rounded-3 bg-transparent">
                                                <div className="form-check mt-1">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="blankCheckbox3"
                                                        value="option1"
                                                        aria-label=""
                                                    />
                                                    <label
                                                        className="text-grey-500 font-xssss"
                                                        htmlFor="blankCheckbox3"
                                                    ></label>
                                                </div>
                                                <div className="email-user">
                                                    <span className="btn-round-xss ms-0 bg-success me-2"></span>
                                                    <img
                                                        src="images/user-7.png"
                                                        alt="user"
                                                        className="w35 me-2"
                                                    />
                                                    <h6 className="font-xssss text-grey-900 mb-0 mt-0 fw-700">
                                                        Surfiya Zakir
                                                    </h6>
                                                </div>
                                                <div
                                                    className="email-subject text-grey-900 text-dark fw-600 font-xssss">
                                                    <i className="feather-star font-xss text-warning me-2"></i>
                                                    Mobile Apps Redesign
                                                </div>
                                                <div className="email-text text-grey-500 fw-600 font-xssss">
                                                    Hey Cak, Could you free now? Can you look and read the brief
                                                    first before...
                                                </div>
                                                <span className="email-file"><i
                                                    className="feather-paperclip font-xss btn-round-sm text-grey-500 me-2 p-0"></i></span>
                                                <div className="email-time text-grey-500 fw-600">12:48PM</div>
                                            </Link>
                                        </li>
                                        <li>
                                            <a href="default-email-open.html" className="rounded-3 bg-transparent">
                                                <div className="form-check mt-1">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="blankCheckbox4"
                                                        value="option1"
                                                        aria-label=""
                                                    />
                                                    <label
                                                        className="text-grey-500 font-xssss"
                                                        htmlFor="blankCheckbox4"
                                                    ></label>
                                                </div>
                                                <div className="email-user">
                                                    <span className="btn-round-xss ms-0 bg-dark me-2"></span>
                                                    <img
                                                        src="images/user-6.png"
                                                        alt="user"
                                                        className="w35 me-2"
                                                    />
                                                    <h6 className="font-xssss text-grey-900 mb-0 mt-0 fw-700">
                                                        Goria Coast
                                                    </h6>
                                                </div>
                                                <div
                                                    className="email-subject text-grey-900 text-dark fw-600 font-xssss">
                                                    <i className="feather-star font-xss text-warning me-2"></i>
                                                    Mobile Apps Redesign
                                                </div>
                                                <div className="email-text text-grey-500 fw-600 font-xssss">
                                                    Hey Cak, Could you free now? Can you look and read the brief
                                                    first before...
                                                </div>
                                                <span className="email-file"></span>
                                                <div className="email-time text-grey-500 fw-600">12:48PM</div>
                                            </a>
                                        </li>
                                        <li>
                                            <Link
                                                to="/default-emailopen"
                                                className="rounded-3 bg-lightblue theme-light-bg"
                                            >
                                                <div className="form-check mt-1">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="blankCheckbox5"
                                                        value="option1"
                                                        aria-label=""
                                                    />
                                                    <label
                                                        className="text-grey-500 font-xssss"
                                                        htmlFor="blankCheckbox5"
                                                    ></label>
                                                </div>
                                                <div className="email-user">
                                                    <span className="btn-round-xss ms-0 bg-success me-2"></span>
                                                    <img
                                                        src="images/user-5.png"
                                                        alt="user"
                                                        className="w35 me-2"
                                                    />
                                                    <h6 className="font-xssss text-grey-900 mb-0 mt-0 fw-700">
                                                        Hurin Seary
                                                    </h6>
                                                </div>
                                                <div
                                                    className="email-subject text-grey-900 text-dark fw-600 font-xssss">
                                                    <i className="feather-star font-xss text-warning me-2"></i>
                                                    Mobile Apps Redesign
                                                </div>
                                                <div className="email-text text-grey-500 fw-600 font-xssss">
                                                    Hey Cak, Could you free now? Can you look and read the brief
                                                    first before...
                                                </div>
                                                <span className="email-file"><i
                                                    className="feather-paperclip font-xss btn-round-sm text-grey-500 me-2 p-0"></i></span>
                                                <div className="email-time text-grey-500 fw-600">12:48PM</div>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/default-emailopen"
                                                className="rounded-3 bg-lightblue theme-light-bg"
                                            >
                                                <div className="form-check mt-1">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="blankCheckbox6"
                                                        value="option1"
                                                        aria-label=""
                                                    />
                                                    <label
                                                        className="text-grey-500 font-xssss"
                                                        htmlFor="blankCheckbox6"
                                                    ></label>
                                                </div>
                                                <div className="email-user">
                                                    <span className="btn-round-xss ms-0 bg-success me-2"></span>
                                                    <img
                                                        src="images/user-12.png"
                                                        alt="user"
                                                        className="w35 me-2"
                                                    />
                                                    <h6 className="font-xssss text-grey-900 mb-0 mt-0 fw-700">
                                                        Hurin Seary
                                                    </h6>
                                                </div>
                                                <div
                                                    className="email-subject text-grey-900 text-dark fw-600 font-xssss">
                                                    <i className="feather-star font-xss text-warning me-2"></i>
                                                    Mobile Apps Redesign
                                                </div>
                                                <div className="email-text text-grey-500 fw-600 font-xssss">
                                                    Hey Cak, Could you free now? Can you look and read the brief
                                                    first before...
                                                </div>
                                                <span className="email-file"><i
                                                    className="feather-paperclip font-xss btn-round-sm text-grey-500 me-2 p-0"></i></span>
                                                <div className="email-time text-grey-500 fw-600">12:48PM</div>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/default-emailopen" className="rounded-3 bg-transparent">
                                                <div className="form-check mt-1">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="blankCheckbox7"
                                                        value="option1"
                                                        aria-label=""
                                                    />
                                                    <label
                                                        className="text-grey-500 font-xssss"
                                                        htmlFor="blankCheckbox7"
                                                    ></label>
                                                </div>
                                                <div className="email-user">
                                                    <span className="btn-round-xss ms-0 bg-success me-2"></span>
                                                    <img
                                                        src="images/user-8.png"
                                                        alt="user"
                                                        className="w35 me-2"
                                                    />
                                                    <h6 className="font-xssss text-grey-900 mb-0 mt-0 fw-700">
                                                        Victor Exrixon
                                                    </h6>
                                                </div>
                                                <div
                                                    className="email-subject text-grey-900 text-dark fw-600 font-xssss">
                                                    <i className="feather-star font-xss text-warning me-2"></i>
                                                    Mobile Apps Redesign
                                                </div>
                                                <div className="email-text text-grey-500 fw-600 font-xssss">
                                                    Hey Cak, Could you free now? Can you look and read the brief
                                                    first before...
                                                </div>
                                                <span className="email-file"><i
                                                    className="feather-paperclip font-xss btn-round-sm text-grey-500 me-2 p-0"></i></span>
                                                <div className="email-time text-grey-500 fw-600">12:48PM</div>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/default-emailopen" className="rounded-3 bg-transparent">
                                                <div className="form-check mt-1">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="blankCheckbox8"
                                                        value="option1"
                                                        aria-label=""
                                                    />
                                                    <label className="text-grey-500 font-xssss"
                                                           htmlFor="blankCheckbox8"></label>
                                                </div>
                                                <div className="email-user">
                                                    <span className="btn-round-xss ms-0 bg-warning me-2"></span>
                                                    <img src="images/user-2.png" alt="user" className="w35 me-2"/>
                                                    <h6 className="font-xssss text-grey-900 mb-0 mt-0 fw-700">Ana
                                                        Seary</h6>
                                                </div>
                                                <div
                                                    className="email-subject text-grey-900 text-dark fw-600 font-xssss">
                                                    <i className="feather-star font-xss text-warning me-2"></i>
                                                    Mobile Apps Redesign
                                                </div>
                                                <div className="email-text text-grey-500 fw-600 font-xssss">
                                                    Hey Cak, Could you free now? Can you look and read the brief first
                                                    before...
                                                </div>
                                                <span className="email-file"></span>
                                                <div className="email-time text-grey-500 fw-600">12:48PM</div>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/default-emailopen" className="rounded-3 bg-transparent">
                                                <div className="form-check mt-1">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="blankCheckbox9"
                                                        value="option1"
                                                        aria-label=""
                                                    />
                                                    <label className="text-grey-500 font-xssss"
                                                           htmlFor="blankCheckbox9"></label>
                                                </div>
                                                <div className="email-user">
                                                    <span className="btn-round-xss ms-0 bg-success me-2"></span>
                                                    <span
                                                        className="btn-round-sm bg-primary me-2 ls-3 text-white font-xssss fw-700">UD</span>
                                                    <h6 className="font-xssss text-grey-900 mb-0 mt-0 fw-700">Studio
                                                        Express</h6>
                                                </div>
                                                <div
                                                    className="email-subject text-grey-900 text-dark fw-600 font-xssss">
                                                    <i className="feather-star font-xss text-warning me-2"></i>
                                                    Mobile Apps Redesign
                                                </div>
                                                <div className="email-text text-grey-500 fw-600 font-xssss">
                                                    Hey Cak, Could you free now? Can you look and read the brief first
                                                    before...
                                                </div>
                                                <span className="email-file"><i
                                                    className="feather-paperclip font-xss btn-round-sm text-grey-500 me-2 p-0"></i></span>
                                                <div className="email-time text-grey-500 fw-600">12:48PM</div>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/default-emailopen"
                                                  className="rounded-3 bg-lightblue theme-light-bg">
                                                <div className="form-check mt-1">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="blankCheckbox10"
                                                        value="option1"
                                                        aria-label=""
                                                    />
                                                    <label className="text-grey-500 font-xssss"
                                                           htmlFor="blankCheckbox10"></label>
                                                </div>
                                                <div className="email-user">
                                                    <span className="btn-round-xss ms-0 bg-warning me-2"></span>
                                                    <span
                                                        className="btn-round-sm bg-gold-gradiant me-2 ls-3 text-white font-xssss fw-700">V</span>
                                                    <h6 className="font-xssss text-grey-900 mb-0 mt-0 fw-700">David
                                                        Goria</h6>
                                                </div>
                                                <div
                                                    className="email-subject text-grey-900 text-dark fw-600 font-xssss">
                                                    <i className="feather-star font-xss text-warning me-2"></i>
                                                    Mobile Apps Redesign
                                                </div>
                                                <div className="email-text text-grey-500 fw-600 font-xssss">
                                                    Hey Cak, Could you free now? Can you look and read the brief first
                                                    before...
                                                </div>
                                                <span className="email-file"></span>
                                                <div className="email-time text-grey-500 fw-600">12:48PM</div>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/default-emailopen" className="rounded-3 bg-transparent">
                                                <div className="form-check mt-1">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="blankCheckbox11"
                                                        value="option1"
                                                        aria-label=""
                                                    />
                                                    <label className="text-grey-500 font-xssss"
                                                           htmlFor="blankCheckbox11"></label>
                                                </div>
                                                <div className="email-user">
                                                    <span className="btn-round-xss ms-0 bg-success me-2"></span>
                                                    <img src="images/user-3.png" alt="user" className="w35 me-2"/>
                                                    <h6 className="font-xssss text-grey-900 mb-0 mt-0 fw-700">Seary
                                                        Victor</h6>
                                                </div>
                                                <div
                                                    className="email-subject text-grey-900 text-dark fw-600 font-xssss">
                                                    <i className="feather-star font-xss text-warning me-2"></i>
                                                    Mobile Apps Redesign
                                                </div>
                                                <div className="email-text text-grey-500 fw-600 font-xssss">
                                                    Hey Cak, Could you free now? Can you look and read the brief first
                                                    before...
                                                </div>
                                                <span className="email-file"><i
                                                    className="feather-paperclip font-xss btn-round-sm text-grey-500 me-2 p-0"></i></span>
                                                <div className="email-time text-grey-500 fw-600">12:48PM</div>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/default-emailopen" className="rounded-3 bg-transparent">
                                                <div className="form-check mt-1">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="blankCheckbox12"
                                                        value="option1"
                                                        aria-label=""
                                                    />
                                                    <label className="text-grey-500 font-xssss"
                                                           htmlFor="blankCheckbox12"></label>
                                                </div>
                                                <div className="email-user">
                                                    <span className="btn-round-xss ms-0 bg-warning me-2"></span>
                                                    <img src="images/user-2.png" alt="user" className="w35 me-2"/>
                                                    <h6 className="font-xssss text-grey-900 mb-0 mt-0 fw-700">Ana
                                                        Seary</h6>
                                                </div>
                                                <div
                                                    className="email-subject text-grey-900 text-dark fw-600 font-xssss">
                                                    <i className="feather-star font-xss text-warning me-2"></i>
                                                    Mobile Apps Redesign
                                                </div>
                                                <div className="email-text text-grey-500 fw-600 font-xssss">
                                                    Hey Cak, Could you free now? Can you look and read the brief first
                                                    before...
                                                </div>
                                                <span className="email-file"></span>
                                                <div className="email-time text-grey-500 fw-600">12:48PM</div>
                                            </Link>
                                        </li>
                                        <li>
                                            <a href="default-email-open.html" className="rounded-3 bg-transparent">
                                                <div className="form-check mt-1">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="blankCheckbox13"
                                                        value="option1"
                                                        aria-label=""
                                                    />
                                                    <label className="text-grey-500 font-xssss"
                                                           htmlFor="blankCheckbox13"></label>
                                                </div>
                                                <div className="email-user">
                                                    <span className="btn-round-xss ms-0 bg-success me-2"></span>
                                                    <span
                                                        className="btn-round-sm bg-primary me-2 ls-3 text-white font-xssss fw-700">UD</span>
                                                    <h6 className="font-xssss text-grey-900 mb-0 mt-0 fw-700">Studio
                                                        Express</h6>
                                                </div>
                                                <div
                                                    className="email-subject text-grey-900 text-dark fw-600 font-xssss">
                                                    <i className="feather-star font-xss text-warning me-2"></i>
                                                    Mobile Apps Redesign
                                                </div>
                                                <div className="email-text text-grey-500 fw-600 font-xssss">
                                                    Hey Cak, Could you free now? Can you look and read the brief first
                                                    before...
                                                </div>
                                                <span className="email-file"><i
                                                    className="feather-paperclip font-xss btn-round-sm text-grey-500 me-2 p-0"></i></span>
                                                <div className="email-time text-grey-500 fw-600">12:48PM</div>
                                            </a>
                                        </li>


                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Right chat sidebar */}
            <div className={`right-chat nav-wrap mt-2 right-scroll-bar ${isChatActive ? 'active-sidebar' : ''}`}>
                <div className="middle-sidebar-right-content bg-white shadow-xss rounded-xxl">
                    {/* Loader wrapper */}
                    {chatLoading && (
                        <div className="preloader-wrap p-3">
                            <div className="box shimmer">
                                <div className="lines">
                                    <div className="line s_shimmer"></div>
                                    <div className="line s_shimmer"></div>
                                    <div className="line s_shimmer"></div>
                                    <div className="line s_shimmer"></div>
                                </div>
                            </div>
                            <div className="box shimmer mb-3">
                                <div className="lines">
                                    <div className="line s_shimmer"></div>
                                    <div className="line s_shimmer"></div>
                                    <div className="line s_shimmer"></div>
                                    <div className="line s_shimmer"></div>
                                </div>
                            </div>
                            <div className="box shimmer">
                                <div className="lines">
                                    <div className="line s_shimmer"></div>
                                    <div className="line s_shimmer"></div>
                                    <div className="line s_shimmer"></div>
                                    <div className="line s_shimmer"></div>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* Right chat content */}
                    {!chatLoading && (
                        <>
                            <div className="section full pe-3 ps-4 pt-4 position-relative ">
                                <h4 className="font-xsssss text-grey-500 text-uppercase fw-700 ls-3">CONTACTS</h4>
                                <ul className="list-group list-group-flush">
                                    <li className="bg-transparent list-group-item no-icon pe-0 ps-0 pt-2 pb-2 border-0 d-flex align-items-center">
                                        <figure className="avatar float-left mb-0 me-2">
                                            <img src="images/user-8.png" alt="image" className="w35"/>
                                        </figure>
                                        <h3 className="fw-700 mb-0 mt-0">
                                            <a className="font-xssss text-grey-600 d-block text-dark model-popup-chat"
                                               href="#">Hurin Seary</a>
                                        </h3>
                                        <span
                                            className="badge badge-primary text-white badge-pill fw-500 mt-0">2</span>
                                    </li>
                                    <li className="bg-transparent list-group-item no-icon pe-0 ps-0 pt-2 pb-2 border-0 d-flex align-items-center">
                                        <figure className="avatar float-left mb-0 me-2">
                                            <img src="images/user-7.png" alt="image" className="w35"/>
                                        </figure>
                                        <h3 className="fw-700 mb-0 mt-0">
                                            <a className="font-xssss text-grey-600 d-block text-dark model-popup-chat"
                                               href="#">Victor Exrixon</a>
                                        </h3>
                                        <span className="bg-success ms-auto btn-round-xss"></span>
                                    </li>
                                    <li className="bg-transparent list-group-item no-icon pe-0 ps-0 pt-2 pb-2 border-0 d-flex align-items-center">
                                        <figure className="avatar float-left mb-0 me-2">
                                            <img src="images/user-6.png" alt="image" className="w35"/>
                                        </figure>
                                        <h3 className="fw-700 mb-0 mt-0">
                                            <a className="font-xssss text-grey-600 d-block text-dark model-popup-chat"
                                               href="#">Surfiya Zakir</a>
                                        </h3>
                                        <span className="bg-warning ms-auto btn-round-xss"></span>
                                    </li>
                                    <li className="bg-transparent list-group-item no-icon pe-0 ps-0 pt-2 pb-2 border-0 d-flex align-items-center">
                                        <figure className="avatar float-left mb-0 me-2">
                                            <img src="images/user-5.png" alt="image" className="w35"/>
                                        </figure>
                                        <h3 className="fw-700 mb-0 mt-0">
                                            <a className="font-xssss text-grey-600 d-block text-dark model-popup-chat"
                                               href="#">Goria Coast</a>
                                        </h3>
                                        <span className="bg-success ms-auto btn-round-xss"></span>
                                    </li>
                                    <li className="bg-transparent list-group-item no-icon pe-0 ps-0 pt-2 pb-2 border-0 d-flex align-items-center">
                                        <figure className="avatar float-left mb-0 me-2">
                                            <img src="images/user-4.png" alt="image" className="w35"/>
                                        </figure>
                                        <h3 className="fw-700 mb-0 mt-0">
                                            <a className="font-xssss text-grey-600 d-block text-dark model-popup-chat"
                                               href="#">Hurin Seary</a>
                                        </h3>
                                        <span
                                            className="badge mt-0 text-grey-500 badge-pill pe-0 font-xsssss">4:09 pm</span>
                                    </li>
                                    <li className="bg-transparent list-group-item no-icon pe-0 ps-0 pt-2 pb-2 border-0 d-flex align-items-center">
                                        <figure className="avatar float-left mb-0 me-2">
                                            <img src="images/user-3.png" alt="image" className="w35"/>
                                        </figure>
                                        <h3 className="fw-700 mb-0 mt-0">
                                            <a className="font-xssss text-grey-600 d-block text-dark model-popup-chat"
                                               href="#">David Goria</a>
                                        </h3>
                                        <span
                                            className="badge mt-0 text-grey-500 badge-pill pe-0 font-xsssss">2 days</span>
                                    </li>
                                    <li className="bg-transparent list-group-item no-icon pe-0 ps-0 pt-2 pb-2 border-0 d-flex align-items-center">
                                        <figure className="avatar float-left mb-0 me-2">
                                            <img src="images/user-2.png" alt="image" className="w35"/>
                                        </figure>
                                        <h3 className="fw-700 mb-0 mt-0">
                                            <a className="font-xssss text-grey-600 d-block text-dark model-popup-chat"
                                               href="#">Seary Victor</a>
                                        </h3>
                                        <span className="bg-success ms-auto btn-round-xss"></span>
                                    </li>
                                    <li className="bg-transparent list-group-item no-icon pe-0 ps-0 pt-2 pb-2 border-0 d-flex align-items-center">
                                        <figure className="avatar float-left mb-0 me-2">
                                            <img src="images/user-12.png" alt="image" className="w35"/>
                                        </figure>
                                        <h3 className="fw-700 mb-0 mt-0">
                                            <a className="font-xssss text-grey-600 d-block text-dark model-popup-chat"
                                               href="#">Ana Seary</a>
                                        </h3>
                                        <span className="bg-success ms-auto btn-round-xss"></span>
                                    </li>

                                </ul>
                            </div>
                            <div className="section full pe-3 ps-4 pt-4 pb-4 position-relative ">
                                <h4 className="font-xsssss text-grey-500 text-uppercase fw-700 ls-3">GROUPS</h4>
                                <ul className="list-group list-group-flush">
                                    <li className="bg-transparent list-group-item no-icon pe-0 ps-0 pt-2 pb-2 border-0 d-flex align-items-center">

                                            <span
                                                className="btn-round-sm bg-primary me-3 ls-3 text-white font-xssss fw-700">UD</span>
                                        <h3 className="fw-700 mb-0 mt-0">
                                            <a className="font-xssss text-grey-600 d-block text-dark model-popup-chat"
                                               href="#">Studio Express</a>
                                        </h3>
                                        <span
                                            className="badge mt-0 text-grey-500 badge-pill pe-0 font-xsssss">2 min</span>
                                    </li>
                                    <li className="bg-transparent list-group-item no-icon pe-0 ps-0 pt-2 pb-2 border-0 d-flex align-items-center">

                                            <span
                                                className="btn-round-sm bg-gold-gradiant me-3 ls-3 text-white font-xssss fw-700">AR</span>
                                        <h3 className="fw-700 mb-0 mt-0">
                                            <a className="font-xssss text-grey-600 d-block text-dark model-popup-chat"
                                               href="#">Armany Design</a>
                                        </h3>
                                        <span className="bg-warning ms-auto btn-round-xss"></span>
                                    </li>
                                    <li className="bg-transparent list-group-item no-icon pe-0 ps-0 pt-2 pb-2 border-0 d-flex align-items-center">

                                            <span
                                                className="btn-round-sm bg-mini-gradiant me-3 ls-3 text-white font-xssss fw-700">UD</span>
                                        <h3 className="fw-700 mb-0 mt-0">
                                            <a className="font-xssss text-grey-600 d-block text-dark model-popup-chat"
                                               href="#">De fabous</a>
                                        </h3>
                                        <span className="bg-success ms-auto btn-round-xss"></span>
                                    </li>
                                </ul>
                            </div>
                            <div className="section full pe-3 ps-4 pt-0 pb-4 position-relative ">
                                <h4 className="font-xsssss text-grey-500 text-uppercase fw-700 ls-3">Pages</h4>
                                <ul className="list-group list-group-flush">
                                    <li className="bg-transparent list-group-item no-icon pe-0 ps-0 pt-2 pb-2 border-0 d-flex align-items-center">

                                            <span
                                                className="btn-round-sm bg-primary me-3 ls-3 text-white font-xssss fw-700">AB</span>
                                        <h3 className="fw-700 mb-0 mt-0">
                                            <a className="font-xssss text-grey-600 d-block text-dark model-popup-chat"
                                               href="#">Armany Seary</a>
                                        </h3>
                                        <span className="bg-success ms-auto btn-round-xss"></span>
                                    </li>
                                    <li className="bg-transparent list-group-item no-icon pe-0 ps-0 pt-2 pb-2 border-0 d-flex align-items-center">

                                            <span
                                                className="btn-round-sm bg-gold-gradiant me-3 ls-3 text-white font-xssss fw-700">SD</span>
                                        <h3 className="fw-700 mb-0 mt-0">
                                            <a className="font-xssss text-grey-600 d-block text-dark model-popup-chat"
                                               href="#">Entropio Inc</a>
                                        </h3>
                                        <span className="bg-success ms-auto btn-round-xss"></span>
                                    </li>

                                </ul>
                            </div>
                        </>
                    )}
                </div>
            </div>
            {/* Search Bar with dynamic class */}
            <div className={`app-header-search ${isSearchVisible ? 'show' : ''}`}>
                <form className="search-form">
                    <div className="form-group searchbox mb-0 border-0 p-1">
                        <input type="text" className="form-control border-0" placeholder="Search..."/>
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

        </>

    )
}