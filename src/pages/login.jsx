import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import {LoginModal} from "../Modal/loginModal";
import {Regmodal} from "../Modal/regmodal";
import {AuthContext} from "../Context/Authcontext";
import {Loginuser} from '../Services/api'
import {Spinner} from 'react-bootstrap';

export const Loginpage = () => {
    const {login} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
    const [isNavActive, setNavActive] = useState(false); // State for nav button
    const handleLoginClick = () => {
        setLoginModalOpen(true);
        setRegisterModalOpen(false); // Close register modal if open
    };

    const handleRegisterClick = () => {
        setRegisterModalOpen(true);
        setLoginModalOpen(false); // Close login modal if open
    };

    const closeModal = () => {
        setLoginModalOpen(false);
        setRegisterModalOpen(false);
    };
    const toggleNavActive = () => {
        setNavActive(prevState => !prevState); // Toggle active state
    };
    const [userData, setuserData] = useState({

        email: '',
        password: '',
    });
    const [error, setError] = useState(null);
    const [formError, setFormError] = useState(null);// error for form validiation
    //handle input change
    const handleChange = (e) => {
        setuserData({...userData, [e.target.name]: e.target.value});
        setFormError(null);

    }

// Handle login Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError(null);

        // Validate email and password
        if (!userData.email || !userData.password) {
            setFormError("Email and password are required");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            console.log("Sending user data");
            const response = await Loginuser(userData);
            console.log("Response received:", response);

            if (response && response.token) {
                console.log("Login successfully, token:", response.token);
                const userId = response.user_id; // Fetching user_id from response
                console.log("User ID:", userId); // Printing user ID to the console
                localStorage.setItem('user_id', userId); // Store user_id in local storage
                login(response.token);
            } else if (response.error) {
                console.error("Error occurred", response.error);
                setError(response.error);
            } else {
                console.log("Unexpected response format:", response);
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error("Error occurred", error.response.data);
                setError('Invalid email or password, please try again.');
            } else {
                console.error("Error occurred", error);
                setError('Error occurred, please try again.');
            }
        } finally {
            setLoading(false);
        }
    };


    return (
        <div>
            <div className="main-wrap">
                <div className="nav-header bg-transparent shadow-none border-0">
                    <div className="nav-top w-100">
                        <Link to="#">
                            <i className="feather-zap text-success display1-size me-2 ms-0"></i>
                            <span
                                className="d-inline-block fredoka-font ls-3 fw-600 text-current font-xxl logo-text mb-0">
                                Sociala.
                            </span>
                        </Link>
                        <Link to="#" className="mob-menu ms-auto me-2 chat-active-btn">
                            <i className="feather-message-circle text-grey-900 font-sm btn-round-md bg-greylight"></i>
                        </Link>
                        <Link to="/default-video" className="mob-menu me-2">
                            <i className="feather-video text-grey-900 font-sm btn-round-md bg-greylight"></i>
                        </Link>
                        <Link to="#" className="me-2 menu-search-icon mob-menu">
                            <i className="feather-search text-grey-900 font-sm btn-round-md bg-greylight"></i>
                        </Link>
                        {/* Login Button */}
                        <button type='button'
                                className={`nav-menu me-0 ms-2 ${isNavActive ? 'active' : ''}`} // Apply 'active' class if isNavActive is true
                                onClick={toggleNavActive} // Toggle active state on click
                        ></button>

                        <Link
                            to="/log-in"
                            className="header-btn d-none d-lg-block bg-dark fw-500 text-white font-xsss p-3 ms-auto w100 text-center lh-20 rounded-xl"
                          /*  onClick={handleLoginClick}*/
                        >
                            Login
                        </Link>

                        {/* Register Button */}
                        <Link
                            to="/sign-up"
                            className="header-btn d-none d-lg-block bg-current fw-500 text-white font-xsss p-3 ms-2 w100 text-center lh-20 rounded-xl"
                            /*onClick={handleRegisterClick}*/
                        >
                            Register
                        </Link>
                    </div>
                </div>

                <div className="row">

                    <div
                        className="col-xl-5 d-none d-xl-block p-0 vh-100 bg-image-cover bg-no-repeat"
                        style={{backgroundImage: 'url(images/login-bg.jpg)'}}
                    ></div>

                    <div className="col-xl-7 vh-100 align-items-center d-flex bg-white rounded-3 overflow-hidden">
                        <div className="card shadow-none border-0 ms-auto me-auto login-card">
                            <form onSubmit={handleSubmit}>
                                <div className="card-body rounded-0 text-left">
                                    <h2 className="fw-700 display1-size display2-md-size mb-3">
                                        Login into <br/>
                                        your account
                                    </h2>

                                    <div className="form-group icon-input mb-3">
                                        <i className="font-sm ti-email text-grey-500 pe-0"></i>
                                        <input
                                            type="email"
                                            id='email'
                                            className={`style2-input ps-5 form-control text-grey-900 font-xsss fw-600 form-control ${formError ? 'is-invalid' : ''}`}
                                            placeholder="Your Email Address"
                                            name='email'
                                            value={userData.email}
                                            onChange={handleChange}


                                        />
                                    </div>
                                    <div className="form-group icon-input mb-1">
                                        <input
                                            type="password"
                                            className={`style2-input ps-5 form-control text-grey-900 font-xss ls-3 form-control ${formError ? 'is-invalid' : ''}`}

                                            placeholder="Password"
                                            id='password'
                                            name="password"
                                            value={userData.password}
                                            onChange={handleChange}
                                        />
                                        <i className="font-sm ti-lock text-grey-500 pe-0"></i>
                                    </div>
                                    <div className="form-check text-left mb-3">
                                        <input
                                            type="checkbox"
                                            className="form-check-input mt-2"
                                            id="exampleCheck5"
                                        />
                                        <label
                                            className="form-check-label font-xsss text-grey-500"
                                            htmlFor="exampleCheck5"
                                        >
                                            Remember me
                                        </label>
                                        <Link
                                            to="/forgot"
                                            className="fw-600 font-xsss text-grey-700 mt-1 float-right"
                                        >
                                            Forgot your Password?
                                        </Link>
                                    </div>


                                    <div className="col-sm-12 p-0 text-left">
                                        <div className="form-group mb-1">
                                            {formError && <div className="alert alert-danger">{formError}</div>}
                                            {error && <div className="alert alert-danger">{error}</div>}
                                            <button
                                                className="form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0"
                                                disabled={loading}>
                                                {loading ? (
                                                    <>
                                                        <Spinner as="span" animation="border" size="sm"
                                                                 role="status"
                                                                 aria-hidden="true"/>
                                                        {' '}Login In...
                                                    </>
                                                ) : (
                                                    "Login"
                                                )}
                                            </button>
                                        </div>
                                        <h6 className="text-grey-500 font-xsss fw-500 mt-0 mb-0 lh-32">
                                            Don’t have an account?{' '}
                                            <Link to="/sign-up" className="fw-700 ms-1">
                                                Register
                                            </Link>
                                        </h6>
                                    </div>
                                    <div className="col-sm-12 p-0 text-center mt-2">
                                        <h6 className="mb-0 d-inline-block bg-white fw-500 font-xsss text-grey-500 mb-3">
                                            Or, Sign in with your social account
                                        </h6>
                                        <div className="form-group mb-1">
                                            <a
                                                href="#"
                                                className="form-control text-left style2-input text-white fw-600 bg-google border-0 p-0 mb-2"
                                            >
                                                <img
                                                    src="images/icon-1.png"
                                                    alt="icon"
                                                    className="ms-2 w40 mb-1 me-5"
                                                />{' '}
                                                Sign in with Google
                                            </a>
                                        </div>
                                        <div className="form-group mb-1">
                                            <a
                                                href="#"
                                                className="form-control text-left style2-input text-white fw-600 bg-facebook border-0 p-0"
                                            >
                                                <img
                                                    src="images/icon-3.png"
                                                    alt="icon"
                                                    className="ms-2 w40 mb-1 me-5"
                                                />{' '}
                                                Sign in with Facebook
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>


                {/* Login Modal */}
                {isLoginModalOpen && (
                    <>
                        <LoginModal closeModal={closeModal}/>
                    </>
                )}

                {/* Register Modal */}
                {/* Register Modal */}
                {isRegisterModalOpen && (
                    <>
                        <Regmodal closeModal={closeModal}/>
                    </>
                )}
            </div>
        </div>
    );
};
