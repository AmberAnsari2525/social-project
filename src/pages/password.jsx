import React from 'react';
import {Link} from 'react-router-dom';

const ChangePassword = () => {
    return (
        <div className="main-content bg-lightblue theme-dark-bg right-chat-active">
            <div className="middle-sidebar-bottom">
                <div className="middle-sidebar-left">
                    <div className="middle-wrap">
                        <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                            <div className="card-body p-4 w-100 bg-current border-0 d-flex rounded-3">
                                <Link to="/default-setting" className="d-inline-block mt-2">
                                    <i className="ti-arrow-left font-sm text-white"></i>
                                </Link>
                                <h4 className="font-xs text-white fw-600 ms-4 mb-0 mt-2">Change Password</h4>
                            </div>
                            <div className="card-body p-lg-5 p-4 w-100 border-0">
                                <form action="#">
                                    <div className="row">
                                        <div className="col-lg-12 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xssss">Current Password</label>
                                                <input type="password" name="current-password" className="form-control" />
                                            </div>
                                        </div>

                                        <div className="col-lg-12 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xssss">New Password</label>
                                                <input type="password" name="new-password" className="form-control" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-12 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xssss">Confirm New Password</label>
                                                <input type="password" name="confirm-password" className="form-control" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-12 mb-0">
                                            <a href="#" className="bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-3 d-inline-block">Save</a>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
