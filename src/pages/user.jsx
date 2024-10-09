import React, {useState, useEffect} from 'react';
import {getUser} from "../Services/api";
import {useNavigate} from "react-router-dom";

const Users = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getUser();
                if (response.status) {
                    setUsers(response.users);
                    console.log(response);
                } else {
                    setError("Failed to fetch users.");
                }
            } catch (error) {
                console.error("Error fetching users:", error);
                if (error.response && error.response.status === 401) {
                    setError("Unauthorized access. Please log in.");
                } else {
                    setError(error.message);
                }
            }
        };
        fetchUsers();
    }, []);

    const handleUser = (userId) => {
        navigate(`/user-view-profile/${userId}`);
    };

    return (<div className="middle-sidebar-bottom">
        <div className="middle-sidebar-left pe-0">
            <div className="row">
                <div className="col-xl-12">
                    <div className="card shadow-xss w-100 d-block d-flex border-0 p-4 mb-3">
                        <div className="card-body d-flex align-items-center p-0">
                            <h2 className="fw-700 mb-0 mt-0 font-md text-grey-900">Users</h2>
                            <div className="search-form-2 ms-auto">
                                <i className="ti-search font-xss"></i>
                                <input type="text"
                                       className="form-control text-grey-500 mb-0 bg-greylight theme-dark-bg border-0"
                                       placeholder="Search here."/>
                            </div>
                            <a href="#" className="btn-round-md ms-2 bg-greylight theme-dark-bg rounded-3">
                                <i className="feather-filter font-xss text-grey-500"></i>
                            </a>
                        </div>
                    </div>

                    <div className="row ps-2 pe-2">
                        {Array.isArray(users) && users.length > 0 ? (users.map((user, index) => (
                            <div key={index} className="col-md-3 col-sm-4 pe-2 ps-2">
                                <div
                                    className="card d-block border-0 shadow-xss rounded-3 overflow-hidden mb-3">
                                    <div className="card-body d-block w-100 ps-3 pe-3 pb-4 text-center">
                                        <figure className="avatar position-absolute w100 z-index-1"
                                                style={{top: '21px', left: '60px'}}>
                                            <img src={user.image || 'images/profile-2.png'} alt="user-avatar"
                                                 className="float-right p-1 bg-white rounded-circle w-100"/>
                                        </figure>
                                        <div style={{marginTop: '115px'}}>
                                            <h4 className="fw-700 font-xsss mt-3 mb-1">
                                                {user.name || "No username available"}
                                            </h4>
                                            <p className="fw-500 font-xsssss text-grey-500 mt-0 mb-3">
                                                @{user.email || "No email available"}
                                            </p>
                                            <button
                                                onClick={() => handleUser(user.id)}
                                                className="mt-0 btn pt-2 pb-2 ps-3 pe-3 lh-24 ms-1 ls-3 d-inline-block rounded-xl bg-success font-xsssss fw-700 ls-lg text-white"
                                            >
                                                VIEW PROFILE
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>))) : (<p>No users to display.</p>)}
                    </div>
                </div>
            </div>
        </div>
    </div>);
};

export default Users;
