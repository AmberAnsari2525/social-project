import React from 'react';

import {useState, useEffect} from 'react'
import {fetchUserId, addFriend, userGetPost, rejectFriend} from "../Services/api";
import {useParams} from 'react-router-dom';

import {Link} from "react-router-dom";

const UserViewProfile = () => {
    const { id: receiverId } = useParams();
    // Get the user ID from the URL
    const [userData, setUserData] = useState({
        username: '',
        image: '',
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        const getUserData = async () => {
            try {
                const data = await fetchUserId(receiverId); // Fetch user data by ID
                if (data && data.user) {
                    setUserData({
                        username: data.user.name,
                        image: data.user.image,
                    });
                } else {
                    setError('Failed to load user data.');
                }
            } catch (err) {
                console.error('Failed to fetch user data:', err);
                setError(`An error occurred: ${err.message}`);
            }
        };
        getUserData();
    }, [receiverId]);

    //handle add friend
    const [isAdding, setIsAdding] = useState(false);
    const [isFriendAdded, setIsFriendAdded] = useState(false);

    //handel cancel request
    const handleAddFriend = async (e) => {
        e.preventDefault();
        setIsAdding(true); // Disable button while the request is being processed
        try {
            const result = await addFriend(receiverId); // Call API to add friend
            if (result.status === 0) { // Assuming status 0 means success
                setIsFriendAdded(true); // Change to show "Cancel Request"
                // Optionally: Show a notification for successful request
            }
        } catch (error) {
            console.error('Error adding friend:', error.message);
            // Optionally: Display error to the user
        } finally {
            setIsAdding(false); // Re-enable button after the request
        }
    };

    const handleCancelFriendRequest = async (e) => {
        e.preventDefault();
        setIsFriendAdded(false); // Hide "Cancel Request" button
        try {
            const result = await rejectFriend(id); // Call API to cancel friend request
            if (result.status === 0) { // Assuming status 0 means success
                // Optionally: Show a notification for successful cancellation
            }
        } catch (error) {
            console.error('Error canceling friend request:', error.message);
            // Optionally: Display error to the user
        }
    };
    //handle fetch post user id
    const { id } = useParams(); // Get the user ID from the URL params
    const [posts, setPosts] = useState([]); // State to hold user posts
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {

        const fetchPosts = async () => {

            try {
                const data = await userGetPost(id );
                console.log('Post fetch successfully by UserID:', data);

                // Process the posts to check for media link and gallery images
                const processedPosts = data.map(post => {
                    if (post.gallery_images && post.gallery_images.length > 0) {
                        return {
                            ...post,
                            media_link: post.media_link || post.gallery_images[0], // Store the first image in media_link
                            gallery_images: post.gallery_images.slice(1) // Store the remaining images in gallery_images
                        };
                    }
                    return post;
                });

                setPosts(processedPosts);

                // Log the fetched posts
                processedPosts.forEach(post => {
                    if (post.username && post.user_image) {
                        console.log(`Username fetched: ${post.username}, User Image: ${post.user_image}`);
                    }
                });
            } catch (err) {
                if (err.response && err.response.status === 401) {
                    console.log("Unauthorized access. Please log in.");
                } else {
                    console.error("Error fetching posts:", err.message);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [id]);
    return (
        <div>
            <div className="middle-sidebar-bottom">
                <div className="middle-sidebar-left">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card w-100 border-0 p-0 bg-white shadow-xss rounded-xxl">
                                <div className="card-body h250 p-0 rounded-xxl overflow-hidden m-3">
                                    <img src="/images/u-bg.jpg" alt="background"/>
                                </div>
                                <div className="card-body p-0 position-relative">
                                    <figure
                                        className="avatar position-absolute w100 z-index-1"
                                        style={{top: '-40px', left: '30px'}}
                                    >
                                        <img
                                            src={userData.image || '/images/profile-2.png'}
                                            alt="user-avatar"
                                            className="float-right p-1 bg-white rounded-circle w-100"
                                        />
                                    </figure>
                                    <h4 className="fw-700 font-sm mt-2 mb-lg-5 mb-4 pl-15">
                                        {userData.username || 'User Name'}

                                    </h4>
                                    <div className="d-flex align-items-center justify-content-center position-absolute-md right-15 top-0 me-2">
                                        {!isFriendAdded ? (
                                            <a
                                                href=""
                                                onClick={handleAddFriend}
                                                disabled={isAdding}
                                                className={`d-none d-lg-block bg-success p-3 z-index-1 rounded-3 text-white font-xsssss text-uppercase fw-700 ls-3 ${isAdding ? 'disabled' : ''}`}
                                            >
                                                {isAdding ? 'Adding...' : 'Add Friend'}
                                            </a>
                                        ) : (
                                            <a
                                                href=""
                                                onClick={handleCancelFriendRequest}
                                                className="d-none d-lg-block bg-danger p-3 z-index-1 rounded-3 text-white font-xsssss text-uppercase fw-700 ls-3"
                                            >
                                                Cancel Request
                                            </a>
                                        )}
                                        <Link to="/default-message"
                                           className="d-none d-lg-block bg-greylight btn-round-lg ms-2 rounded-3 text-grey-700">
                                            <i className="feather-mail font-md"></i>
                                        </Link>

                                        <div
                                            className="dropdown-menu dropdown-menu-end p-4 rounded-xxl border-0 shadow-lg"
                                            aria-labelledby="dropdownMenu4">
                                            {/* Dropdown menu items */}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="col-xl-4 col-xxl-3 col-lg-4 pe-0">

                            <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3 mt-3">
                                <div className="card-body d-flex align-items-center ">
                                    <h4 className="fw-700 mb-0 font-xssss text-grey-900 ">Photos</h4>
                                    <a href="#" className="fw-600 ms-auto font-xssss text-primary">See all</a>
                                </div>
                                <div className="card-body d-block pt-0 pb-2">
                                    <div className="row">
                                        <div className="col-6 mb-2 pe-1"><a href="/images/e-2.jpg"
                                                                            data-lightbox="roadtrip"><img
                                            src="/images/e-2.jpg" alt="image"
                                            className="img-fluid rounded-3 w-100"/></a>
                                        </div>
                                        <div className="col-6 mb-2 ps-1"><a href="/images/e-3.jpg"
                                                                            data-lightbox="roadtrip"><img
                                            src="/images/e-3.jpg" alt="image"
                                            className="img-fluid rounded-3 w-100"/></a>
                                        </div>
                                        <div className="col-6 mb-2 pe-1"><a href="/images/e-4.jpg"
                                                                            data-lightbox="roadtrip"><img
                                            src="/images/e-4.jpg" alt="image"
                                            className="img-fluid rounded-3 w-100"/></a>
                                        </div>
                                        <div className="col-6 mb-2 ps-1"><a href="/images/e-5.jpg"
                                                                            data-lightbox="roadtrip"><img
                                            src="/images/e-5.jpg" alt="image"
                                            className="img-fluid rounded-3 w-100"/></a>
                                        </div>
                                        <div className="col-6 mb-2 pe-1"><a href="/images/e-2.jpg"
                                                                            data-lightbox="roadtrip"><img
                                            src="/images/e-2.jpg" alt="image"
                                            className="img-fluid rounded-3 w-100"/></a>
                                        </div>
                                        <div className="col-6 mb-2 ps-1"><a href="/images/e-1.jpg"
                                                                            data-lightbox="roadtrip"><img
                                            src="/images/e-1.jpg" alt="image"
                                            className="img-fluid rounded-3 w-100"/></a>
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







                            </div>
                        </div>
                        <div className="col-xl-8 col-xxl-9 col-lg-8">

                                {posts.map((post, index) => (
                                    <div key={index} className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-3 mt-3">
                                        <div className="card-body p-0 d-flex">
                                            <figure className="avatar me-3">
                                                <img src= {userData.image ||"/images/user-7.png"}
                                                     alt="user avatar" className="shadow-sm rounded-circle w45" />
                                            </figure>
                                            <h4 className="fw-700 text-grey-900 font-xssss mt-1"> {userData.username || 'no user name'}
                                                <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">3 hour ago</span>
                                            </h4>
                                            <a href="#" className="ms-auto" id="dropdownMenu7" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <i className="ti-more-alt text-grey-900 btn-round-md bg-greylight font-xss"></i>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-end p-4 rounded-xxl border-0 shadow-lg" aria-labelledby="dropdownMenu7">
                                                {/* Dropdown items */}
                                            </div>
                                        </div>

                                        <div className="card-body p-0 me-lg-5">
                                            <p className="fw-500 text-grey-500 lh-26 font-xssss w-100">
                                                {post.content}
                                                {/* Optional see more */}
                                                <a href="#" className="fw-600 text-primary ms-2">See more</a>
                                            </p>
                                        </div>

                                        {/* Display media based on post_type */}
                                        {post.post_type === "image" && (
                                            <div className="card-body d-block p-0">
                                                <div className="row ps-2 pe-2">
                                                    <div className="col-xs-12 col-sm-12 p-1">
                                                        <a href={post.media_link} data-lightbox="roadtrip">
                                                            <img src={post.media_link} className="rounded-3 w-100" alt="post media" />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        <div className="card-body d-flex p-0 mt-3">
                                            <a href="#" className="d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss me-3">
                                                <i className="feather-thumbs-up text-white bg-primary me-1 btn-round-xs font-xss"></i>
                                                <i className="feather-heart text-white bg-red-gradiant me-2 btn-round-xs font-xss"></i>2.8K Like
                                            </a>
                                            <a href="#" className="d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss">
                                                <i className="feather-message-circle text-dark text-grey-900 btn-round-sm font-lg"></i>22 Comment
                                            </a>
                                            <a href="#" className="ms-auto d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss">
                                                <i className="feather-share-2 text-grey-900 text-dark btn-round-sm font-lg"></i>
                                                <span className="d-none-xs">Share</span>
                                            </a>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserViewProfile;
