import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { changePassword } from "../Services/api"; // Ensure this path is correct

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate passwords
        if (newPassword !== confirmPassword) {
            setError('New Password and Confirm Password do not match.');
            return;
        }

        const userData = {
            oldPassword: currentPassword,
            newPassword: newPassword
        };

        try {
            const response = await changePassword(userData);
            if (response.message === "Password has been changed successfully") {
                setSuccess('Password changed successfully!');
                setError('');
            }
        } catch (err) {
            setError('Failed to change password.');
        }
    };

    return (
        <div className=" bg-lightblue theme-dark-bg right-chat-active">
            <div className="middle-sidebar-bottom">
                <div className="middle-sidebar-left">
                    <div className="middle-wrap">
                        <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                            <div className="card-body p-4 w-100 bg-current border-0 d-flex rounded-3">
                                <Link to="/default-settings" className="d-inline-block mt-2">
                                    <i className="ti-arrow-left font-sm text-white"></i>
                                </Link>
                                <h4 className="font-xs text-white fw-600 ms-4 mb-0 mt-2">Change Password</h4>
                            </div>
                            <div className="card-body p-lg-5 p-4 w-100 border-0">
                                {error && <p className="text-danger">{error}</p>}
                                {success && <p className="text-success">{success}</p>}
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        {/* Current Password */}
                                        <div className="col-lg-12 mb-3">
                                            <div className="form-group position-relative">
                                                <label className="mont-font fw-600 font-xssss">Current Password</label>
                                                <input
                                                    type={showCurrentPassword ? "text" : "password"}
                                                    name="current-password"
                                                    className="form-control"
                                                    value={currentPassword}
                                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                                    required
                                                />
                                                <i
                                                    className={`feather-${showCurrentPassword ? 'eye-off' : 'eye'} me-3 position-absolute`}
                                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                                    style={{ right: '15px', top: '40px', cursor: 'pointer' }}
                                                ></i>
                                            </div>
                                        </div>

                                        {/* New Password */}
                                        <div className="col-lg-12 mb-3">
                                            <div className="form-group position-relative">
                                                <label className="mont-font fw-600 font-xssss">New Password</label>
                                                <input
                                                    type={showNewPassword ? "text" : "password"}
                                                    name="new-password"
                                                    className="form-control"
                                                    value={newPassword}
                                                    onChange={(e) => setNewPassword(e.target.value)}
                                                    required
                                                />
                                                <i
                                                    className={`feather-${showNewPassword ? 'eye-off' : 'eye'} me-3 position-absolute`}
                                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                                    style={{ right: '15px', top: '40px', cursor: 'pointer' }}
                                                ></i>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Confirm New Password */}
                                    <div className="row">
                                        <div className="col-lg-12 mb-3">
                                            <div className="form-group position-relative">
                                                <label className="mont-font fw-600 font-xssss">Confirm New Password</label>
                                                <input
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    name="confirm-password"
                                                    className="form-control"
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    required
                                                />
                                                <i
                                                    className={`feather-${showConfirmPassword ? 'eye-off' : 'eye'} me-3 position-absolute`}
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    style={{ right: '15px', top: '40px', cursor: 'pointer' }}
                                                ></i>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Save Button */}
                                    <div className="row">
                                        <div className="col-lg-12 mb-0">
                                            <button
                                                type="submit"
                                                className="bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-3 d-inline-block"
                                            >
                                                Save
                                            </button>
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
