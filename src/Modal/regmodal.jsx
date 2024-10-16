import React, {useState} from "react";
import {Link} from "react-router-dom";


export const Regmodal = ({closeModal}) => {

    return (

        <>
            <div
                className="modal-backdrop fade show"
                style={{display: 'block'}}
            ></div>
            <div
                className="modal bottom fade show"
                style={{display: 'block', overflowY: 'scroll'}}
                id="Modalregister"
                tabIndex="-1"
                role="dialog"
            >
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content border-0">
                        <button type="button" className="close" onClick={closeModal} aria-label="Close">
                            <i className="ti-close text-grey-500"></i>
                        </button>
                        <div className="modal-body p-3 d-flex align-items-center bg-none">
                            <div className="card shadow-none rounded-0 w-100 p-2 pt-3 border-0">
                                <div className="card-body rounded-0 text-left p-3">
                                    <h2 className="fw-700 display1-size display2-md-size mb-4">
                                        Create <br/> your account
                                    </h2>
                                    <form>
                                        <div className="form-group icon-input mb-3">
                                            <i className="font-sm ti-user text-grey-500 pe-0"></i>
                                            <input
                                                type="text"
                                                className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
                                                placeholder="Your Name"
                                            />
                                        </div>
                                        <div className="form-group icon-input mb-3">
                                            <i className="font-sm ti-email text-grey-500 pe-0"></i>
                                            <input
                                                type="text"
                                                className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
                                                placeholder="Your Email Address"
                                            />
                                        </div>
                                        <div className="form-group icon-input mb-3">
                                            <input
                                                type="password"
                                                className="style2-input ps-5 form-control text-grey-900 font-xss ls-3"
                                                placeholder="Password"
                                            />
                                            <i className="font-sm ti-lock text-grey-500 pe-0"></i>
                                        </div>
                                        <div className="form-group icon-input mb-1">
                                            <input
                                                type="password"
                                                className="style2-input ps-5 form-control text-grey-900 font-xss ls-3"
                                                placeholder="Confirm Password"
                                            />
                                            <i className="font-sm ti-lock text-grey-500 pe-0"></i>
                                        </div>
                                        <div className="form-check text-left mb-3">
                                            <input
                                                type="checkbox"
                                                className="form-check-input mt-2"
                                                id="exampleCheck7"
                                            />
                                            <label
                                                className="form-check-label font-xsss text-grey-500"
                                                htmlFor="exampleCheck7"
                                            >
                                                Accept Terms and Conditions
                                            </label>
                                        </div>
                                    </form>

                                    <div className="col-sm-12 p-0 text-left">
                                        <div className="form-group mb-1">
                                            <Link
                                                to="/sign-up"
                                                className="form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0"
                                            >
                                                Register
                                            </Link>
                                        </div>
                                        <h6 className="text-grey-500 font-xsss fw-500 mt-0 mb-0 lh-32">
                                            Already have an account?
                                            <Link to="/log-in" className="fw-700 ms-1">
                                                Login
                                            </Link>
                                        </h6>
                                    </div>
                                    <div className="col-sm-12 p-0 text-center mt-3">
                                        <h6 className="mb-0 d-inline-block bg-white fw-600 font-xsss text-grey-500 mb-4">
                                            Or, Sign in with your social account
                                        </h6>
                                        <div className="form-group mb-1">
                                            <Link
                                                to="#"
                                                className="form-control text-left style2-input text-white fw-600 bg-google border-0 p-0 mb-2"
                                            >
                                                <img
                                                    src="images/icon-1.png"
                                                    alt="Google icon"
                                                    className="ms-2 w40 mb-1 me-5"
                                                />
                                                Sign in with Google
                                            </Link>
                                        </div>
                                        <div className="form-group mb-1">
                                            <Link
                                                to="#"
                                                className="form-control text-left style2-input text-white fw-600 bg-facebook border-0 p-0"
                                            >
                                                <img
                                                    src="images/icon-3.png"
                                                    alt="Facebook icon"
                                                    className="ms-2 w40 mb-1 me-5"
                                                />
                                                Sign in with Facebook
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}