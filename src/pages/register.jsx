import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import {Regmodal} from "../Modal/regmodal";
import {LoginModal} from "../Modal/loginModal";
import {AuthContext} from "../Context/Authcontext";
import {registerUser} from "../Services/api";
import {Spinner} from "react-bootstrap";


export const RegisterPage = () => {
    const {signup} = useContext(AuthContext);
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


    const [userData, setUserData] = useState({
        username: '', email: '', password: '', role: 'user', // Keep the dateOfBirth field but make it optional
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formError, setFormError] = useState({
        username: '', email: '', password: '', role: 'user',
    }); // Error for individual form fields
    const [successMessage, setSuccessMessage] = useState(''); // Add successMessage state

    // Handle input changes
    const handleChange = (e) => {
        setUserData({...userData, [e.target.name]: e.target.value});
        setFormError({...formError, [e.target.name]: ''}); // Reset specific field error on input change
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        let hasError = false;
        const newFormError = {};

        // Validate form fields
        if (!userData.username) {
            newFormError.username = "Name is required.";
            hasError = true;
        }
        if (!userData.email) {
            newFormError.email = "Email is required.";
            hasError = true;
        }
        if (!userData.password) {
            newFormError.password = "Password is required.";
            hasError = true;
        }
        if (!userData.role) {
            newFormError.role = "Role is required.";
            hasError = true;
        }

        setFormError(newFormError);

        if (hasError) {
            return;
        }

        setLoading(true);
        setError(null);
        setSuccessMessage(''); // Clear success message before new submission

        try {
            console.log("Sending request with data:", userData);
            const response = await registerUser(userData); // Assuming this returns { token, user_id }
            console.log("Response received:", response);

            if (response && response.token) {
                console.log("Signup successful, token:", response.token);
                setSuccessMessage("Signup successful!");

                // Store the token and user_id in local storage
                localStorage.setItem('token', response.token);
                localStorage.setItem('user_id', response.user_id); // Assuming user_id is in the response

                signup(response.token);
            } else if (response.error) {
                console.error("API returned an error:", response.error);
                setError(response.error);
            } else {
                console.log("Unexpected response format:", response);
                setError("Email already exists. Please try a different email.");
            }
        } catch (err) {
            console.error("An unexpected error occurred:", err);
            setError("An unexpected error occurred. Please try again later.");
        } finally {
            setLoading(false); // Ensure loading state is turned off after completion
        }
    };


    return (<div>
            <div className="main-wrap">
                <div className="nav-header bg-transparent shadow-none border-0">
                    <div className="nav-top w-100">
                        <Link to="/">
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
                        <button
                            className={`nav-menu me-0 ms-2 ${isNavActive ? 'active' : ''}`} // Apply 'active' class if isNavActive is true
                            onClick={toggleNavActive} // Toggle active state on click
                        ></button>
                        {/* Login Button */}
                        <Link
                            to="#"
                            className="header-btn d-none d-lg-block bg-dark fw-500 text-white font-xsss p-3 ms-auto w100 text-center lh-20 rounded-xl"
                            onClick={handleLoginClick}
                        >
                            Login
                        </Link>

                        {/* Register Button */}
                        <Link
                            to="#"
                            className="header-btn d-none d-lg-block bg-current fw-500 text-white font-xsss p-3 ms-2 w100 text-center lh-20 rounded-xl"
                            onClick={handleRegisterClick}
                        >
                            Register
                        </Link>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xl-5 d-none d-xl-block p-0 vh-100 bg-image-cover bg-no-repeat"
                         style={{backgroundImage: 'url(images/login-bg-2.jpg)'}}></div>

                    <div className="col-xl-7 vh-100 align-items-center d-flex bg-white rounded-3 overflow-hidden">
                        <div className="card shadow-none border-0 ms-auto me-auto login-card">
                            <div className="card-body rounded-0 text-left">
                                <h2 className="fw-700 display1-size display2-md-size mb-4">Create <br/>your account</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group icon-input mb-3">
                                        <i className="font-sm ti-user text-grey-500 pe-0"></i>
                                        <input
                                            type="text"
                                            name="username"
                                            className={`style2-input ps-5 form-control text-grey-900 font-xsss fw-600 form-control ${formError.username ? 'is-invalid' : ''}`}
                                            placeholder="Your Name"
                                            value={userData.username}
                                            onChange={handleChange}
                                        />
                                        {formError.username &&
                                            <div className="invalid-feedback">{formError.username}</div>}
                                    </div>
                                    <div className="form-group icon-input mb-3">
                                        <i className="font-sm ti-email text-grey-500 pe-0"></i>
                                        <input
                                            type="email"
                                            name="email"
                                            className={`style2-input ps-5 form-control text-grey-900 font-xsss fw-600 form-control ${formError.email ? 'is-invalid' : ''}`}
                                            placeholder="Your Email Address"
                                            value={userData.email}
                                            onChange={handleChange}
                                        />
                                        {formError.email && <div className="invalid-feedback">{formError.email}</div>}
                                    </div>
                                    <div className="form-group icon-input mb-3">
                                        <input
                                            type="password"
                                            name="password"
                                            className={`style2-input ps-5 form-control text-grey-900 font-xsss fw-600 form-control ${formError.password ? 'is-invalid' : ''}`}
                                            placeholder="Password"
                                            value={userData.password}
                                            onChange={handleChange}
                                        />
                                        <i className="font-sm ti-lock text-grey-500 pe-0"></i>
                                        {formError.password &&
                                            <div className="invalid-feedback">{formError.password}</div>}
                                    </div>
                                    <div className="form-group icon-input mb-3">
                                        <i className="font-sm ti-briefcase text-grey-500 pe-0"></i>
                                        <select
                                            name="role"
                                            className={`style2-input ps-5 form-control text-grey-900 font-xsss fw-600 form-control ${formError.role ? 'is-invalid' : ''}`}
                                            value={userData.role}
                                            onChange={handleChange}
                                            style={{lineHeight: '45px'}}
                                        >
                                            <option value="">Select Role</option>
                                            <option value="user">User</option>
                                            <option value="admin">Admin</option>
                                        </select>

                                    </div>

                                    <div className="form-check text-left mb-3">
                                        <input type="checkbox" className="form-check-input mt-2" id="exampleCheck2"/>
                                        <label className="form-check-label font-xsss text-grey-500">Accept Term and
                                            Conditions</label>
                                    </div>

                                    <div className="col-sm-12 p-0 text-left">
                                        <div className="form-group mb-1">
                                            <button
                                                type="submit"
                                                className="form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0"
                                                disabled={loading}
                                            >
                                                {loading ? <Spinner animation="border" size="sm"/> : "Register"}
                                            </button>
                                        </div>
                                        <h6 className="text-grey-500 font-xsss fw-500 mt-0 mb-0 lh-32">
                                            Already have an account?{" "}
                                            <Link to="/log-in" className="fw-700 ms-1">
                                                Login
                                            </Link>
                                        </h6>
                                    </div>
                                </form>
                                {error && <div className="alert alert-danger">{error}</div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Login Modal */}
            {isLoginModalOpen && (<>
                    <LoginModal closeModal={closeModal}/>
                </>)}

            {/* Register Modal */}
            {/* Register Modal */}
            {isRegisterModalOpen && (<>
                    <Regmodal closeModal={closeModal}/>
                </>)}

        </div>);
};
