import React from 'react';
import '../css/style.css';
import {useState, useEffect} from 'react'
import {
    addComment,
    addPost,
    fetchUserData,
    getFriend,
    getCommentsById,
    sharePosts,
    gettingPostByID,
    gettingPost
} from "../Services/api";
import {Link} from "react-router-dom";

const UserProfile = ({userId }) => {
    const [isReactionActive, setIsReactionActive] = useState(null); // To track which post's emoji wrap is active

    // Handle reaction click
    const handleReactionClick = (postId) => {
        // Toggle the emoji wrap for the clicked post
        setIsReactionActive((prevActivePost) => (prevActivePost === postId ? null : postId));
    };
    const [shareData, setShareData] = useState(null); //state share post
    const [shareError, setShareError] = useState(null); // state share error
    const [copySuccess, setCopySuccess] = useState(false); // State for copy success message
    // State for managing the Create Post form visibility and data
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        image: '',
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        const getUserData = async () => {
            try {
                const data = await fetchUserData(); // Fetch from your API
                console.log('Fetched user data:', data);
                if (data && data.user) {
                    setUserData({
                        username: data.user.name,
                        email: data.user.email,
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
    }, []);
    //creatpost api

    const [createPost, setCreatePost] = useState({
        content: '',
        media: [], // Ensure media is initialized as an array
        media_link: [] // Ensure media_link is initialized as an array
    });


// Handle form field changes
    const handleChange = (e) => {
        const {name, value} = e.target;
        setCreatePost((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

// Handle file input for both images and videos
    const handleMediaChange = (e) => {
        const files = Array.from(e.target.files);
        console.log("Selected files:", files); // Log the files to see if they are correctly handled
        setCreatePost((prevState) => ({
            ...prevState,
            media_link: [...prevState.media_link, ...files]
        }));
    };

// Handle form submission
    const postHandleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        // Validation: Ensure either content or media is provided
        if (createPost.content.trim() === '' && createPost.media_link.length === 0) {
            setError("Post content or media is required.");
            return;
        }

        const formData = new FormData();
        formData.append('content', createPost.content);

        // Determine post type (image/video/text)
        let postType = 'text';
        if (createPost.media_link.length > 0) {
            const mediaType = createPost.media_link[0].type.startsWith('image') ? 'image' : 'video';
            postType = mediaType;
        }
        formData.append('post_type', postType);

        // Append media files
        createPost.media_link.forEach((file) => {
            if (file && (file.type.startsWith('image') || file.type.startsWith('video'))) {
                formData.append('media', file);
            }
        });

        // Log form data for debugging
        for (let pair of formData.entries()) {
            console.log(pair[0], pair[1]); // Check that media and content are properly appended
        }

        try {
            const result = await addPost(formData);
            console.log('Post added successfully:', result);

            // Check the API response structure for the correct media link path
            const mediaLinks = result.data.post.media_link || []; // Adjust based on your API response

            // Update state with new media links
            setCreatePost({
                content: '',
                media: [], // Reset media
                media_link: mediaLinks // Ensure media links are stored
            });
        } catch (err) {
            // Error handling
            if (err.response && err.response.data) {
                console.error('API Error:', err.response.data.message, err.response.data);
                setError(err.response.data.message || 'Failed to add the post.');
            } else {
                console.error('Unexpected error:', err);
                setError('An unexpected error occurred.');
            }
        }
    };


// This function should not call postHandleSubmit without the event
    const handleCreatePostClick = (e) => {
        postHandleSubmit(e); // Pass the event object to postHandleSubmit
    };

    const handleRemoveMedia = (index) => {
        setCreatePost((prevState) => {
            const updatedMedia = [...prevState.media_link];
            updatedMedia.splice(index, 1);
            return {...prevState, media_link: updatedMedia};
        });
    };

    //get post api

    const [getPost, setGetPost] = useState([]);
    const [loading, setLoading] = useState(true);


//fetching Posts by user uid
    useEffect(() => {

        const fetchPosts = async (userId ) => {

            try {
                const data = await gettingPostByID(userId );
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

                setGetPost(processedPosts);

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
    }, [userId ]);


//mIN CONTENT Loading
    const [mainContentLoading, setMainContentLoading] = useState(true);
    useEffect(() => {
        // Simulate loading for main content for 3 seconds
        const mainContentTimer = setTimeout(() => {
            setMainContentLoading(false);
        }, 3000);

        // Cleanup the timers when the component unmounts
        return () => {
            clearTimeout(mainContentTimer);

        };
    }, []);


    // handle share
    const handleShare = async (postId) => {

        // Log postId and user_id to verify their values
        console.log("Sharing post with ID:", postId,);

        if (!postId) {
            console.log("postId or user_id is missing");
            return;
        }

        const shareData = {post_id: postId,};

        try {
            const data = await sharePosts(shareData);
            setShareData(data);
            console.log("Shared successfully:", data);
        } catch (err) {
            console.log("Error response:", err.response); // Log the full response
            if (err.response && err.response.status === 404) {
                setShareError('Post not found. Please make sure the post exists.');
            } else if (err.response && err.response.data) {
                setShareError('Failed to share the post. Please try again.');
            } else {
                setShareError('An unexpected error occurred. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };


    const handleCopyLink = (event, link) => {
        event.stopPropagation();
        navigator.clipboard.writeText(link) // Copy the link to the clipboard
            .then(() => {
                setCopySuccess(true); // Show success message
                setTimeout(() => setCopySuccess(false), 2000); // Hide message after 2 seconds
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    };
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [activePost, setActivePost] = useState(null);  // Track the active post
    const [loadingComments, setLoadingComments] = useState(false);
    const [showComments, setShowComments] = useState(false);

    // Load comments when the comment icon is clicked
    const handleShowComments = async (postId) => {
        if (activePost === postId) {
            // Toggle off comments for the same post
            setActivePost(null);
            setShowComments(false);
        } else {
            // Set the new active post
            setActivePost(postId);
            setShowComments(true);
            setLoadingComments(true);
            try {
                const postComments = await getCommentsById(postId);
                setComments(postComments); // Save the comments for the active post
            } catch (error) {
                console.error('Error fetching comments:', error);
            } finally {
                setLoadingComments(false);
            }
        }
    };

    // Handle new comment submission

    // Handle new comment submission
    const handleAddComment = async (e, postId) => {
        e.preventDefault();

        // Validate comment
        if (!newComment.trim()) {
            console.error("Comment is required");
            return;
        }

        // Log to see if the data is correct
        console.log("New Comment:", newComment);
        console.log("Post ID:", postId);

        try {
            // Send request to add comment with both post ID and comment text
            const addedComment = await addComment(postId, newComment); // Updated to send comment
            setComments([addedComment, ...comments]); // Add new comment to the list
            setNewComment(''); // Clear the input after adding the comment
            console.log('comment add succfully')
        } catch (error) {
            // Safely access error properties
            const errorMessage = error.response ? (error.response.data ? error.response.data.message : "Unknown error occurred") : error.message;
            console.error("API Response Error:", errorMessage); // Centralized error handling
        }
    };


    return (
        <div>
            <div className="middle-sidebar-bottom">
                <div className="middle-sidebar-left">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card w-100 border-0 p-0 bg-white shadow-xss rounded-xxl">
                                <div className="card-body h250 p-0 rounded-xxl overflow-hidden m-3">
                                    <img src="images/u-bg.jpg" alt="background"/>
                                </div>
                                <div className="card-body p-0 position-relative">
                                    <figure
                                        className="avatar position-absolute w100 z-index-1"
                                        style={{top: '-40px', left: '30px'}}
                                    >
                                        <img
                                            src={userData.image || 'images/profile-2.png'}
                                            alt="user-avatar"
                                            className="float-right p-1 bg-white rounded-circle w-100"
                                        />
                                    </figure>
                                    <h4 className="fw-700 font-sm mt-2 mb-lg-5 mb-4 pl-15">
                                        {userData.username || 'User Name'}
                                        <span className="fw-500 font-xssss text-grey-500 mt-1 mb-3 d-block">
                    {userData.email || 'user@example.com'}
                </span>
                                    </h4>
                                    <div
                                        className="d-flex align-items-center justify-content-center position-absolute-md right-15 top-0 me-2">
                                        <a
                                            href="#"
                                            className="d-none d-lg-block bg-success p-3 z-index-1 rounded-3 text-white font-xsssss text-uppercase fw-700 ls-3"
                                        >
                                            Add Friend
                                        </a>
                                        <a
                                            href="#"
                                            className="d-none d-lg-block bg-greylight btn-round-lg ms-2 rounded-3 text-grey-700"
                                        >
                                            <i className="feather-mail font-md"></i>
                                        </a>
                                        <a
                                            href="#"
                                            id="dropdownMenu4"
                                            className="d-none d-lg-block bg-greylight btn-round-lg ms-2 rounded-3 text-grey-700"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                        >
                                            <i className="ti-more font-md text-dark"></i>
                                        </a>
                                        <div
                                            className="dropdown-menu dropdown-menu-end p-4 rounded-xxl border-0 shadow-lg"
                                            aria-labelledby="dropdownMenu4">
                                            {/* Dropdown menu items */}
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body d-block w-100 shadow-none mb-0 p-0 border-top-xs">
                                    <ul
                                        className="nav nav-tabs h55 d-flex product-info-tab border-bottom-0 ps-4"
                                        id="pills-tab"
                                        role="tablist"
                                    >
                                        <li className="active list-inline-item me-5">
                                            <a
                                                className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block active"
                                                href="#navtabs1"
                                                data-toggle="tab"
                                            >
                                                About
                                            </a>
                                        </li>
                                        <li className="list-inline-item me-5">
                                            <a
                                                className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block"
                                                href="#navtabs2"
                                                data-toggle="tab"
                                            >
                                                Membership
                                            </a>
                                        </li>
                                        <li className="list-inline-item me-5">
                                            <a
                                                className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block"
                                                href="#navtabs3"
                                                data-toggle="tab"
                                            >
                                                Discussion
                                            </a>
                                        </li>
                                        <li className="list-inline-item me-5">
                                            <a
                                                className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block"
                                                href="#navtabs4"
                                                data-toggle="tab"
                                            >
                                                Video
                                            </a>
                                        </li>
                                        <li className="list-inline-item me-5">
                                            <a
                                                className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block"
                                                href="#navtabs3"
                                                data-toggle="tab"
                                            >
                                                Group
                                            </a>
                                        </li>
                                        <li className="list-inline-item me-5">
                                            <a
                                                className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block"
                                                href="#navtabs1"
                                                data-toggle="tab"
                                            >
                                                Events
                                            </a>
                                        </li>
                                        <li className="list-inline-item me-5">
                                            <a
                                                className="fw-700 me-sm-5 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block"
                                                href="#navtabs7"
                                                data-toggle="tab"
                                            >
                                                Media
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-xxl-3 col-lg-4 pe-0">
                            <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3 mt-3">
                                <div className="card-body p-3 border-0">
                                    <div className="row">
                                        <div className="col-3">
                                            <div className="chart-container w50 h50">
                                                <div className="chart position-relative" data-percent="78"
                                                     style={{backgroundColor: '#a7d212'}}>
                                                    <span className="percent fw-700 font-xsss" data-after="%">78</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-8 ps-1">
                                            <h4 className="font-xsss d-block fw-700 mt-2 mb-0">Advanced Python
                                                Sass <span
                                                    className="float-right mt-2 font-xsssss text-grey-500">87%</span>
                                            </h4>
                                            <p className="font-xssss fw-600 text-grey-500 lh-26 mb-0">Designer</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3">
                                <div className="card-body d-block p-4">
                                    <h4 className="fw-700 mb-3 font-xsss text-grey-900">About</h4>
                                    <p className="fw-500 text-grey-500 lh-24 font-xssss mb-0">Lorem ipsum dolor sit
                                        amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non,
                                        feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed
                                        rhoncus</p>
                                </div>
                                <div className="card-body border-top-xs d-flex">
                                    <i className="feather-lock text-grey-500 me-3 font-lg"></i>
                                    <h4 className="fw-700 text-grey-900 font-xssss mt-0">Private <span
                                        className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">What's up, how are you?</span>
                                    </h4>
                                </div>

                                <div className="card-body d-flex pt-0">
                                    <i className="feather-eye text-grey-500 me-3 font-lg"></i>
                                    <h4 className="fw-700 text-grey-900 font-xssss mt-0">Visble <span
                                        className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">Anyone can find you</span>
                                    </h4>
                                </div>
                                <div className="card-body d-flex pt-0">
                                    <i className="feather-map-pin text-grey-500 me-3 font-lg"></i>
                                    <h4 className="fw-700 text-grey-900 font-xssss mt-1">Flodia, Austia </h4>
                                </div>
                                <div className="card-body d-flex pt-0">
                                    <i className="feather-users text-grey-500 me-3 font-lg"></i>
                                    <h4 className="fw-700 text-grey-900 font-xssss mt-1">Genarel Group</h4>
                                </div>
                            </div>
                            <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3">
                                <div className="card-body d-flex align-items-center  p-4">
                                    <h4 className="fw-700 mb-0 font-xssss text-grey-900">Photos</h4>
                                    <a href="#" className="fw-600 ms-auto font-xssss text-primary">See all</a>
                                </div>
                                <div className="card-body d-block pt-0 pb-2">
                                    <div className="row">
                                        <div className="col-6 mb-2 pe-1"><a href="images/e-2.jpg"
                                                                            data-lightbox="roadtrip"><img
                                            src="images/e-2.jpg" alt="image" className="img-fluid rounded-3 w-100"/></a>
                                        </div>
                                        <div className="col-6 mb-2 ps-1"><a href="images/e-3.jpg"
                                                                            data-lightbox="roadtrip"><img
                                            src="images/e-3.jpg" alt="image" className="img-fluid rounded-3 w-100"/></a>
                                        </div>
                                        <div className="col-6 mb-2 pe-1"><a href="images/e-4.jpg"
                                                                            data-lightbox="roadtrip"><img
                                            src="images/e-4.jpg" alt="image" className="img-fluid rounded-3 w-100"/></a>
                                        </div>
                                        <div className="col-6 mb-2 ps-1"><a href="images/e-5.jpg"
                                                                            data-lightbox="roadtrip"><img
                                            src="images/e-5.jpg" alt="image" className="img-fluid rounded-3 w-100"/></a>
                                        </div>
                                        <div className="col-6 mb-2 pe-1"><a href="images/e-2.jpg"
                                                                            data-lightbox="roadtrip"><img
                                            src="images/e-2.jpg" alt="image" className="img-fluid rounded-3 w-100"/></a>
                                        </div>
                                        <div className="col-6 mb-2 ps-1"><a href="images/e-1.jpg"
                                                                            data-lightbox="roadtrip"><img
                                            src="images/e-1.jpg" alt="image" className="img-fluid rounded-3 w-100"/></a>
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
                                <div className="card-body d-flex align-items-center  p-4">
                                    <h4 className="fw-700 mb-0 font-xssss text-grey-900">Event</h4>
                                    <a href="#" className="fw-600 ms-auto font-xssss text-primary">See all</a>
                                </div>
                                <div className="card-body d-flex pt-0 ps-4 pe-4 pb-3 overflow-hidden">
                                    <div className="bg-success me-2 p-3 rounded-xxl"><h4
                                        className="fw-700 font-lg ls-3 lh-1 text-white mb-0"><span
                                        className="ls-1 d-block font-xsss text-white fw-600">FEB</span>22</h4></div>
                                    <h4 className="fw-700 text-grey-900 font-xssss mt-2">Meeting with clients <span
                                        className="d-block font-xsssss fw-500 mt-1 lh-4 text-grey-500">41 madison ave, floor 24 new work, NY 10010</span>
                                    </h4>
                                </div>

                                <div className="card-body d-flex pt-0 ps-4 pe-4 pb-3 overflow-hidden">
                                    <div className="bg-warning me-2 p-3 rounded-xxl"><h4
                                        className="fw-700 font-lg ls-3 lh-1 text-white mb-0"><span
                                        className="ls-1 d-block font-xsss text-white fw-600">APR</span>30</h4></div>
                                    <h4 className="fw-700 text-grey-900 font-xssss mt-2">Developer Programe <span
                                        className="d-block font-xsssss fw-500 mt-1 lh-4 text-grey-500">41 madison ave, floor 24 new work, NY 10010</span>
                                    </h4>
                                </div>

                                <div className="card-body d-flex pt-0 ps-4 pe-4 pb-3 overflow-hidden">
                                    <div className="bg-primary me-2 p-3 rounded-xxl"><h4
                                        className="fw-700 font-lg ls-3 lh-1 text-white mb-0"><span
                                        className="ls-1 d-block font-xsss text-white fw-600">APR</span>23</h4></div>
                                    <h4 className="fw-700 text-grey-900 font-xssss mt-2">Aniversary Event <span
                                        className="d-block font-xsssss fw-500 mt-1 lh-4 text-grey-500">41 madison ave, floor 24 new work, NY 10010</span>
                                    </h4>
                                </div>

                            </div>
                        </div>
                        <div className="col-xl-8 col-xxl-9 col-lg-8">


                            <div className="card w-100 shadow-xss rounded-xxl border-0 ps-4 pt-4 pe-4 pb-3 mb-3 mt-3">
                                <div className="card-body p-0">
                                    <button
                                        className="font-xssss fw-600 card-body p-0 d-flex align-items-center"
                                        onClick={handleCreatePostClick}
                                        style={{
                                            color: createPost.content.trim().length === 0 && createPost.media_link.length === 0 ? 'lightgrey' : 'black',
                                            border: 'inherit',
                                            background: 'inherit',
                                        }}
                                        disabled={createPost.content.trim().length === 0 && createPost.media_link.length === 0}
                                    >
                                        <i
                                            className={`btn-round-sm font-xs feather-edit-3 me-2 bg-greylight`}
                                            style={{
                                                color: createPost.content.trim().length === 0 && createPost.media_link.length === 0 ? 'lightgrey' : 'black',
                                            }}
                                        ></i>
                                        Create Post
                                    </button>
                                </div>

                                <form onSubmit={postHandleSubmit}
                                      className="card-body p-0 mt-3 position-relative">
                                    <figure className="avatar position-absolute ms-2 mt-1 top-5">
                                        <img src="/images/user-8.png" alt="user"
                                             className="shadow-sm rounded-circle w30"/>
                                    </figure>

                                    <textarea
                                        name="content"
                                        value={createPost.content}
                                        onChange={handleChange}
                                        className="h100 bor-0 w-100 rounded-xxl p-2 ps-5 font-xssss text-grey-500 fw-500 border-light-md theme-dark-bg"
                                        cols="30"
                                        rows="10"
                                        placeholder="What's on your mind?"
                                    ></textarea>

                                    {error && <p className="text-danger">{error}</p>}

                                    {/* Display selected images and videos */}
                                    {Array.isArray(createPost.media_link) && createPost.media_link.length > 0 && (
                                        <div className="media-preview mt-3">
                                            {createPost.media_link.map((file, index) => (
                                                <div key={index} className="media-item position-relative">
                                                    {file.type.startsWith('image') ? (
                                                        <img src={URL.createObjectURL(file)} alt="preview"
                                                             className="w-100 rounded-xxl mb-2"/>
                                                    ) : (
                                                        <video src={URL.createObjectURL(file)} controls
                                                               className="w-100 rounded-xxl mb-2"></video>
                                                    )}
                                                    <button
                                                        className="close-icon"
                                                        onClick={() => handleRemoveMedia(index)}
                                                        style={{
                                                            position: 'absolute',
                                                            top: '5px',
                                                            right: '5px',
                                                            background: 'none',
                                                            border: 'none',
                                                            cursor: 'pointer',
                                                        }}
                                                    >
                                                        <div
                                                            className="bg-primary rounded-circle d-flex justify-content-center align-items-center"
                                                            style={{width: '30px', height: '30px'}}
                                                        >
                                                            <i className="feather-x text-white"></i>
                                                        </div>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </form>

                                {/* Action buttons below the textarea */}
                                <div className="card-body d-flex p-0 mt-0">
                                    <Link
                                        to="#"
                                        className="d-flex align-items-center font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4"
                                    >
                                        <i className="font-md text-danger feather-video me-2"></i>
                                        <span className="d-none-xs">Live Video</span>
                                    </Link>

                                    {/* File upload buttons */}
                                    <div className="d-flex" style={{cursor: 'pointer'}}>
                                        <label htmlFor="file-upload"
                                               className="d-flex align-items-center font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4"
                                               style={{cursor: 'pointer'}}>
                                            <i className="font-md text-success feather-image me-2"></i>
                                            <span className="d-none-xs">Photo/Video</span>
                                        </label>
                                        <input
                                            id="file-upload"
                                            type="file"
                                            multiple
                                            accept="image/*,video/*"
                                            style={{display: 'none'}}
                                            onChange={handleMediaChange}
                                        />
                                    </div>

                                    <Link
                                        to="#"
                                        className="d-flex align-items-center font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4"
                                    >
                                        <i className="font-md text-warning feather-camera me-2"></i>
                                        <span className="d-none-xs">Feeling/Activity</span>
                                    </Link>

                                    <Link to="#" className="ms-auto" id="dropdownMenu4"
                                          data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="ti-more-alt text-grey-900 btn-round-md bg-greylight font-xss"></i>
                                    </Link>
                                    <div
                                        className="dropdown-menu dropdown-menu-start p-4 rounded-xxl border-0 shadow-lg"
                                        aria-labelledby="dropdownMenu4">
                                        <div className="card-body p-0 d-flex">
                                            <i className="feather-bookmark text-grey-500 me-3 font-lg"></i>
                                            <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4">
                                                Save Link
                                                <span
                                                    className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">Add this to your saved items</span>
                                            </h4>
                                        </div>
                                        <div className="card-body p-0 d-flex mt-2">
                                            <i className="feather-alert-circle text-grey-500 me-3 font-lg"></i>
                                            <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4">
                                                Hide Post
                                                <span
                                                    className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">Save to your saved items</span>
                                            </h4>
                                        </div>
                                        <div className="card-body p-0 d-flex mt-2">
                                            <i className="feather-alert-octagon text-grey-500 me-3 font-lg"></i>
                                            <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4">
                                                Hide all from Group
                                                <span
                                                    className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">Save to your saved items</span>
                                            </h4>
                                        </div>
                                        <div className="card-body p-0 d-flex mt-2">
                                            <i className="feather-lock text-grey-500 me-3 font-lg"></i>
                                            <h4 className="fw-600 mb-0 text-grey-900 font-xssss mt-0 me-4">
                                                Unfollow Group
                                                <span
                                                    className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">Save to your saved items</span>
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            {/*get post*/}
                            <>
                                {getPost.map((post, index) => (
                                    <div key={index}
                                         className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-3">
                                        <div className="card-body p-0 d-flex">
                                            <figure className="avatar me-3">
                                                <img src={post.user_image || '/images/profile-2.png'} alt="user"
                                                     className="shadow-sm rounded-circle w45"/>
                                            </figure>
                                            <h4 className="fw-700 text-grey-900 font-xssss mt-1">
                                                {post.username}
                                                <span
                                                    className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">{post.timeAgo}</span>
                                            </h4>
                                            <a href="#" className="ms-auto" id="dropdownMenu4"
                                               data-bs-toggle="dropdown" aria-expanded="false"><i
                                                className="ti-more-alt text-grey-900 btn-round-md bg-greylight font-xss"></i></a>
                                            <div
                                                className="dropdown-menu dropdown-menu-start p-4 rounded-xxl border-0 shadow-lg"
                                                aria-labelledby="dropdownMenu4">
                                                <div className="card-body p-0 d-flex">
                                                    <i className="feather-bookmark text-grey-500 me-3 font-lg"></i>
                                                    <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4">Save
                                                        Link <span
                                                            className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">Add this to your saved items</span>
                                                    </h4>
                                                </div>
                                                <div className="card-body p-0 d-flex mt-2">
                                                    <i className="feather-alert-circle text-grey-500 me-3 font-lg"></i>
                                                    <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4">Hide
                                                        Post <span
                                                            className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">Save to your saved items</span>
                                                    </h4>
                                                </div>
                                                <div className="card-body p-0 d-flex mt-2">
                                                    <i className="feather-alert-octagon text-grey-500 me-3 font-lg"></i>
                                                    <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4">Hide
                                                        all from Group <span
                                                            className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">Save to your saved items</span>
                                                    </h4>
                                                </div>
                                                <div className="card-body p-0 d-flex mt-2">
                                                    <i className="feather-lock text-grey-500 me-3 font-lg"></i>
                                                    <h4 className="fw-600 mb-0 text-grey-900 font-xssss mt-0 me-4">Unfollow
                                                        Group <span
                                                            className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">Save to your saved items</span>
                                                    </h4>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card-body p-0 me-lg-5">
                                            <p className="fw-500 text-grey-500 lh-26 font-xssss w-100 mb-2">
                                                {post.content}
                                                <Link to="#" className="fw-600 text-primary ms-2">See
                                                    more</Link>
                                            </p>
                                        </div>

                                        {/* Display images */}
                                        {post.post_type === "image" && post.media_link && (
                                            <img src={post.media_link} alt="Post media" className="w-100 mb-2"/>
                                        )}

                                        {/* Display videos */}
                                        {post.post_type === "video" && post.media_link && (
                                            <video autoPlay loop className="float-right w-100 mb-2" controls
                                                   muted>
                                                <source src={post.media_link} type="video/mp4"/>
                                                Your browser does not support the video tag.
                                            </video>
                                        )}
                                        {/* Display the gallery images if present */}
                                        {post.gallery_images && post.gallery_images.length > 0 && (
                                            <div className="gallery">
                                                {post.gallery_images.map((image, imgIndex) => (
                                                    <img key={imgIndex} src={image}
                                                         alt={`Gallery image ${imgIndex + 1}`}
                                                         className="w-100 mb-2"/>
                                                ))}
                                            </div>
                                        )}

                                        <div className="card-body d-flex p-0 mt-3">
                                            <Link to="#"
                                                  className="emoji-bttn d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss me-2"
                                                  onClick={() => handleReactionClick(post.id)}>
                                                <i className="feather-thumbs-up text-white bg-primary me-1 btn-round-xs font-xss"></i>
                                                <i className="feather-heart text-white bg-red-gradiant me-2 btn-round-xs font-xss"></i>2.8K
                                                Like</Link>
                                            <div
                                                className={`emoji-wrap ${isReactionActive === post.id ? 'active' : ''}`}>
                                                <ul className="emojis list-inline mb-0">
                                                    <li className="emoji list-inline-item">
                                                        <i className="feather-heart text-white bg-red-gradiant me-2 btn-round-xs font-xss"></i>
                                                    </li>
                                                    <li className="emoji list-inline-item"><i
                                                        className="em em-angry"></i></li>
                                                    <li className="emoji list-inline-item">
                                                        <i className="feather-thumbs-up text-white bg-primary me-1 btn-round-xs font-xss"></i>
                                                    </li>
                                                    <li className="emoji list-inline-item"><i
                                                        className="em em-astonished"></i></li>
                                                    <li className="emoji list-inline-item"><i
                                                        className="em em-blush"></i></li>
                                                    <li className="emoji list-inline-item"><i
                                                        className="em em-clap"></i></li>
                                                    <li className="emoji list-inline-item"><i
                                                        className="em em-cry"></i></li>
                                                    <li className="emoji list-inline-item"><i
                                                        className="em em-full_moon_with_face"></i></li>
                                                </ul>
                                            </div>
                                            {/* Comment button */}
                                            <Link to="#"
                                                  className="d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss me-2"
                                                  onClick={() => handleShowComments(post.id)}>
                                                <i className="feather-message-circle text-dark text-grey-900 btn-round-sm font-lg"></i>
                                                <span className="d-none-xss">{post.comments} Comment</span>
                                            </Link>
                                            <div
                                                className="dropdown-menu dropdown-menu-end p-4 rounded-xxl border-0 shadow-lg"
                                                aria-labelledby="dropdownMenu31">
                                                <h4 className="fw-700 font-xss text-grey-900 d-flex align-items-center">Share <i
                                                    className="feather-x ms-auto font-xssss btn-round-xs bg-greylight text-grey-900 me-2"></i>
                                                </h4>
                                                <div className="card-body p-0 d-flex">
                                                    <ul className="d-flex align-items-center justify-content-between mt-2">
                                                        <li className="me-1">
                                                            <Link
                                                                to={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData ? shareData.link : `https://social.techxdeveloper.com/${post.id}`)}`}
                                                                className="btn-round-lg bg-facebook"
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                onClick={() => handleShare(post.id)} // Pass post.id here
                                                            >
                                                                <i className="font-xs ti-facebook text-white"></i>
                                                            </Link>
                                                        </li>
                                                        <li className="me-1">
                                                            <Link
                                                                to={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareData ? shareData.link : `https://social.techxdeveloper.com/${post.id}`)}&text=Check out this post!`}
                                                                className="btn-round-lg bg-twitter"
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                onClick={() => handleShare(post.id)} // Pass post.id here
                                                            >
                                                                <i className="font-xs ti-twitter-alt text-white"></i>
                                                            </Link>
                                                        </li>
                                                        <li className="me-1">
                                                            <Link
                                                                to={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareData ? shareData.link : `https://social.techxdeveloper.com/${post.id}`)}`}
                                                                className="btn-round-lg bg-linkedin"
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                onClick={() => handleShare(post.id)} // Pass post.id here
                                                            >
                                                                <i className="font-xs ti-linkedin text-white"></i>
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </div>

                                                <h4 className="fw-700 font-xssss mt-4 text-grey-500 d-flex align-items-center mb-3">Copy
                                                    Link</h4>
                                                <i
                                                    className="feather-copy position-absolute right-35 mt-3 font-xs text-grey-500"
                                                    onClick={(event) => handleCopyLink(event, shareData ? shareData.link : `https://social.techxdeveloper.com/${post.id}`)} // Call handleCopyLink on icon click
                                                ></i>
                                                <input
                                                    type="text"
                                                    value={shareData ? shareData.link : `https://social.techxdeveloper.com/${post.id}`}
                                                    className="bg-grey text-grey-500 font-xssss border-0 lh-32 p-2 font-xssss fw-600 rounded-3 w-100 theme-dark-bg"
                                                    readOnly
                                                />
                                                {copySuccess && <span
                                                    className="text-success mt-2">Link copied!</span>} {/* Success message */}
                                            </div>


                                            {/* Share button */}
                                            <Link to="#" id="dropdownMenu31" data-bs-toggle="dropdown"

                                                  aria-expanded="false"
                                                  className="ms-auto d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss"><i
                                                className="feather-share-2 text-grey-900 text-dark btn-round-sm font-lg"></i><span
                                                className="d-none-xs">Share</span> </Link>
                                        </div>
                                        {activePost === post.id && (
                                            <div className="card-body p-0">
                                                {loadingComments ? (
                                                    <p>Loading comments...</p>
                                                ) : (
                                                    <>
                                                        {comments.length > 0 ? (
                                                            <div className="comments-list">
                                                                {comments.map((comment, index) => (
                                                                    <div key={index}
                                                                         className="d-flex align-items-start mb-3">
                                                                        <figure className="avatar me-3">
                                                                            <img
                                                                                src={comment.user_image || '/images/profile-2.png'}
                                                                                alt="user"
                                                                                className="rounded-circle w30"
                                                                            />
                                                                        </figure>
                                                                        <div className="comment-content">
                                                                            <h5 className="fw-600 text-grey-900 font-xssss mb-1">{comment.username}</h5>
                                                                            <p className="fw-400 text-grey-500 lh-24 font-xss m-0 text-dark">{comment.content}</p>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        ) : (
                                                            <p>No comments yet. Be the first to comment!</p>
                                                        )}
                                                    </>
                                                )}

                                                <form className="comment-form d-flex mt-2"
                                                      onSubmit={(e) => handleAddComment(e, post.id)}>
                                                    <input
                                                        type="text"
                                                        className="form-control h75 rounded-xxl p-3"
                                                        placeholder="Write a comment..."
                                                        value={newComment}
                                                        onChange={(e) => setNewComment(e.target.value)}
                                                    />
                                                    <button type="submit" className="btn btn-primary ms-2">
                                                        <i className="feather-send"></i>
                                                    </button>
                                                </form>

                                            </div>
                                        )}
                                    </div>
                                ))}
                            </>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;