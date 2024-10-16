import React from 'react';
import '../css/style.css';
import {useState,useEffect} from 'react'
import {
    addComment,
    addPost,
    deletePost,
    fetchUserData,
    getCommentsById,
    sharePosts,
    userGetPost
} from "../Services/api";
import moment from 'moment';
import {Link, useNavigate, useParams} from "react-router-dom";

const UserProfile = () => {
    const navigate= useNavigate()
    const {id} =useParams();
    const [mainContentLoading, setMainContentLoading] = useState(true); //main conntent lodadin state
    //mIN CONTENT Loading
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


    const [createPost, setCreatePost] = useState({
        content: '',
        media: [], // Still keeping media array for handling files
        media_link: [], // Keep media_link as an array
        post_type: ''
    });

// Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCreatePost((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

// Handle file input for both images and videos
    const handleMediaChange = (e) => {
        const files = Array.from(e.target.files);
        console.log("Selected files:", files); // Debugging file selection
        setCreatePost((prevState) => ({
            ...prevState,
            media_link: [...prevState.media_link, ...files] // Storing files in media_link
        }));
    };

// Handle form submission create post
    const postHandleCreate = async (e) => {
        e.preventDefault();
        setError(null);
        const formData = new FormData();
        formData.append('content', createPost.content);

        // Determine post type (image/video/text)
        let postType = 'text';
        if (createPost.media_link.length > 0) {
            const mediaType = createPost.media_link[0].type.startsWith('image') ? 'image' : 'video';
            postType = mediaType;
        }
        formData.append('post_type', postType);

        // Append media_link (files)
        createPost.media_link.forEach((file) => {
            if (file && (file.type.startsWith('image') || file.type.startsWith('video'))) {
                formData.append('media_link', file); // Change 'media' to 'media_link'
            }
        });

        // API call
        try {
            const response = await addPost(formData); // Call the function to post the data
            console.log('Post created successfully:', response);
            // Clear the form after successful submission
            setCreatePost({
                content: '',
                media: [], // Clear media array
                media_link: [], // Clear media_link array
                post_type: ''
            });
        } catch (error) {
            console.error('Error creating post:', error);
            setError('Error occurred while creating the post.');
        }
    };


// This function should not call postHandleCreate without the event
    const handleCreatePostClick = (e) => {
        postHandleCreate(e); // Pass the event object to postHandleCreate
    };
    // hande Reomve Media
    const handleRemoveMedia = (index) => {
        setCreatePost((prevState) => {
            const updatedMedia = [...prevState.media_link];
            updatedMedia.splice(index, 1);
            return {...prevState, media_link: updatedMedia};
        });
    };

    const [userData, setUserData] = useState({
        username: '',
        email: '',
        image: '',
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        const getUserData = async () => {
            try {
                const data = await fetchUserData(); // Fetch user data from your API
                console.log('Fetched user data:', data);

                if (data && data.user) {
                    // Store the user_id in localStorage
                    localStorage.setItem('user_id', data.user.id); // Assuming `id` is the field for user ID

                    // Set the user data for display
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


    //handle fetch post user id
    const [posts, setPosts] = useState([]); // State to hold user posts
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {

        const fetchPosts = async () => {
            try {
                // Get the user_id from localStorage
                const userId = localStorage.getItem('user_id');
                if (!userId) {
                    console.error('No user ID found in localStorage.');
                    return;
                }

                // Pass the userId to your userGetPost function
                const data = await userGetPost(userId);
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
    }, []);

    const [isReactionActive, setIsReactionActive] = useState(null); // To track which post's emoji wrap is active
    const [likedPosts, setLikedPosts] = useState(new Map()); // Use a Map to track post IDs and like IDs

    //share post sate
    const [shareData, setShareData] = useState(null); //state share post
    const [shareError, setShareError] = useState(null); // state share error
    const [copySuccess, setCopySuccess] = useState(false); // State for copy success message


    // comment state
    const [comments, setComments] = useState([]);

    const [newComment, setNewComment] = useState('');
    const [activePost, setActivePost] = useState(null);  // Track the active post
    const [loadingComments, setLoadingComments] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    // Handle reaction click
    const handleReactionClick = (postId) => {
        // Toggle the emoji wrap for the clicked post
        setIsReactionActive((prevActivePost) => (prevActivePost === postId ? null : postId));
    };
    // handle share
    const handleShare = async (postId) => {
        console.log("Sharing post with ID:", postId);

        if (!postId) {
            console.log("postId or user_id is missing");
            return;
        }

        const shareData = {post_id: postId};

        try {
            const data = await sharePosts(shareData);
            setShareData(data);
            console.log("Shared successfully:", data);
        } catch (err) {
            console.log("Error response:", err.response);
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


// handle copy Link
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


    const [loadingAddComment, setLoadingAddComment] = useState(false);

// Fetch comments for the post
    const fetchComments = async (postId) => {
        setLoadingComments(true);
        try {
            const postComments = await getCommentsById(postId); // Fetch comments by post ID
            setComments(Array.isArray(postComments) ? postComments : []); // Ensure comments is an array
        } catch (err) {
            console.error("Error fetching comments:", err);
        } finally {
            setLoadingComments(false);
        }
    };

    const [commentsByPost, setCommentsByPost] = useState({});


    // Handle showing comments
    const handleShowComments = async (postId) => {
        if (activePost === postId) {
            setActivePost(null);
            setComments([]); // Clear comments when collapsing
        } else {
            setActivePost(postId);
            await fetchComments(postId); // Fetch comments when opening
        }
    };

    // Handle new comment submission
    const handleAddComment = async (e, postId) => {
        e.preventDefault();
        setLoadingAddComment(true);

        try {
            const addedComment = await addComment(postId, newComment); // Add the comment
            setComments([addedComment, ...comments]); // Add the new comment to the state
            setNewComment(''); // Clear the input field
        } catch (error) {
            console.error("Error adding comment:", error);
            alert("Failed to add comment: " + (error.response ? error.response.data.message : error.message));
        } finally {
            setLoadingAddComment(false);
            await fetchComments(postId); // Fetch updated comments for the specific post
        }
    };
    const [successMessage, setSuccessMessage] = useState('');

    const [selectedPostId, setSelectedPostId] = useState(null); // Store the post ID to delete
    const [showDeletePopup, setShowDeletePopup] = useState(false);

    const handleDeletePostClick = (postId) => {
        setSelectedPostId(postId); // Store the ID of the post to delete
        setShowDeletePopup(true);  // Show the modal
    };

    // Cancel the deletion and close the modal
    const cancelDelete = () => {
        setShowDeletePopup(false);  // Hide the modal
        setSelectedPostId(null);    // Reset the selected post ID
    };

    // Confirm and delete the post
    const confirmDeletePost = async () => {
        try {
            if (!selectedPostId) {
                throw new Error("Post ID is missing.");
            }

            // Use the post ID stored in the state
            const response = await deletePost(selectedPostId);

            if (response.status === 200 || response.status === 204) {
                console.log('Post deleted successfully');
                setSuccessMessage('Post deleted successfully');
                setShowDeletePopup(false); // Close the modal after deletion
            } else {
                setErrorMessage('Failed to delete the post.');
                console.error('Error:', response);
            }
        } catch (error) {
            if (error.response) {
                // Server responded with a status other than 2xx
                if (error.response.status === 404) {
                    setErrorMessage('The post was not found. It may have been deleted already.');
                } else {
                    setErrorMessage(error.response.data.message || 'Failed to delete the post.');
                }
                console.error('Error:', error.response.data);
            } else if (error.request) {
                setErrorMessage('No response from the server. Please try again later.');
                console.error('No response:', error.request);
            } else {
                setErrorMessage('An error occurred. Please try again.');
                console.error('Error:', error.message);
            }
        }
    };

// for time
    const formatTimeAgo = (createdAt) => {
        const now = new Date();
        const postTime = new Date(createdAt);
        const diffInMs = now - postTime;
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);

        if (diffInMinutes < 60) {
            return `${diffInMinutes} minutes ago`;
        } else if (diffInHours < 24) {
            return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
        } else {
            return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
        }
    };
    const handleNavigateToPost = (post_id) => {
        navigate(`/single-post/${post_id}`);
    };


    return (
        <div >
            <div className="middle-sidebar-bottom">
                <div className="middle-sidebar-left">
                    {/* Content or loader here */}
                    {mainContentLoading ? (
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
                    ) : (
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
                                        <li className="list-inline-item me-5">
                                            <Link
                                                className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block"
                                                to="/account-information"
                                                data-toggle="tab"
                                            >
                                                Update Profile
                                            </Link>
                                        </li>
                                        <li className="active list-inline-item me-5">
                                            <Link
                                                className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block active"
                                                to="/default-member"
                                                data-toggle="tab"
                                            >
                                                Friends
                                            </Link>
                                        </li>
                                        <li className="list-inline-item me-5">
                                            <Link
                                                className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block"
                                                to="/password"
                                                data-toggle="tab"
                                            >
                                                Change Password
                                            </Link>
                                        </li>
                                        <li className="list-inline-item me-5">
                                            <Link
                                                className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block"
                                                to="/account-information"
                                                data-toggle="tab"
                                            >
                                                Update Profile
                                            </Link>
                                        </li>

                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-xxl-3 col-lg-4 pe-0">

                            <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3 mt-3">
                                <div className="card-body d-flex align-items-center  p-4">
                                    <h4 className="fw-700 mb-0 font-xssss text-grey-900">Photos</h4>
                                    <a href="#" className="fw-600 ms-auto font-xssss text-primary">See all</a>
                                </div>
                                <div className="card-body d-block pt-0 pb-2">
                                    <div className="row">
                                        <div className="col-6 mb-2 pe-1"><a href="/images/e-2.jpg"
                                                                            data-lightbox="roadtrip"><img
                                            src="/images/e-2.jpg" alt="image" className="img-fluid rounded-3 w-100"/></a>
                                        </div>
                                        <div className="col-6 mb-2 ps-1"><a href="images/e-3.jpg"
                                                                            data-lightbox="roadtrip"><img
                                            src="/images/e-3.jpg" alt="image" className="img-fluid rounded-3 w-100"/></a>
                                        </div>
                                        <div className="col-6 mb-2 pe-1"><a href="images/e-4.jpg"
                                                                            data-lightbox="roadtrip"><img
                                            src="/images/e-4.jpg" alt="image" className="img-fluid rounded-3 w-100"/></a>
                                        </div>
                                        <div className="col-6 mb-2 ps-1"><a href="images/e-5.jpg"
                                                                            data-lightbox="roadtrip"><img
                                            src="/images/e-5.jpg" alt="image" className="img-fluid rounded-3 w-100"/></a>
                                        </div>
                                        <div className="col-6 mb-2 pe-1"><a href="images/e-2.jpg"
                                                                            data-lightbox="roadtrip"><img
                                            src="/images/e-2.jpg" alt="image" className="img-fluid rounded-3 w-100"/></a>
                                        </div>
                                        <div className="col-6 mb-2 ps-1"><a href="images/e-1.jpg"
                                                                            data-lightbox="roadtrip"><img
                                            src="/images/e-1.jpg" alt="image" className="img-fluid rounded-3 w-100"/></a>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body d-block w-100 pt-0">
                                    <a href="#"
                                       className="p-2 lh-28 w-100 d-block bg-grey text-grey-800 text-center font-xssss fw-700 rounded-xl"><i
                                        className="feather-external-link font-xss me-2"></i> More</a>
                                </div>
                            </div>

                        </div>
                        <div className="col-xl-8 col-xxl-9 col-lg-8 mt-3">
                            <div
                                className="card w-100 shadow-xss rounded-xxl border-0 ps-4 pt-4 pe-4 pb-3 mb-3">
                                <div className="card-body p-0">
                                    {/* Create Post Button */}
                                    <button
                                        className="font-xssss fw-600 card-body p-0 d-flex align-items-center"
                                        onClick={handleCreatePostClick}
                                        style={{
                                            color:
                                                (createPost.content.trim().length === 0 && createPost.media_link.length === 0) || !createPost.visibility
                                                    ? 'lightgrey'  // Gray color when content/media/visibility is not selected
                                                    : 'black',     // Black color when all conditions are met
                                            border: 'inherit',
                                            background: 'inherit'
                                        }}
                                        disabled={
                                            (createPost.content.trim().length === 0 && createPost.media_link.length === 0) || !createPost.visibility
                                        }>
                                        <i
                                            className={`btn-round-sm font-xs feather-edit-3 me-2 bg-greylight`}
                                            style={{
                                                color:
                                                    (createPost.content.trim().length === 0 && createPost.media_link.length === 0) || !createPost.visibility
                                                        ? 'lightgrey'  // Gray color when content/media/visibility is not selected
                                                        : 'black', // Dynamic icon color
                                            }}
                                        ></i>
                                        Create Post
                                    </button>


                                </div>
                                <form onSubmit={postHandleCreate}
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
                                    {/* Visibility Selector */}
                                    <div className="visibility-selector mt-3">
                                        <label className="font-xssss text-grey-500 fw-500">
                                            Select Visibility:
                                        </label>
                                        <select
                                            name="visibility"
                                            value={createPost.visibility}
                                            onChange={(e) => setCreatePost({
                                                ...createPost,
                                                visibility: e.target.value
                                            })}
                                            className="form-select"
                                        >
                                            <option value="">Select visibility</option>
                                            {/* Placeholder option */}
                                            <option value="public">Public</option>
                                            <option value="private">Private</option>
                                        </select>
                                    </div>


                                    {/* Display selected images and videos */}
                                    {Array.isArray(createPost.media_link) && createPost.media_link.length > 0 && (
                                        <div className="media-preview mt-3">
                                            <div
                                                className="image-grid"
                                                style={{
                                                    display: 'grid',
                                                    gridTemplateColumns: createPost.media_link.length === 2 ? 'repeat(2, 1fr)' :
                                                        createPost.media_link.length === 3 ? 'repeat(3, 1fr)' :
                                                            createPost.media_link.length === 4 ? 'repeat(2, 1fr)' :
                                                                'repeat(3, 1fr)',
                                                    gap: '10px',
                                                }}
                                            >
                                                {createPost.media_link.slice(0, 5).map((file, index) => (
                                                    <div key={index} className="media-item position-relative">
                                                        {file.type.startsWith('image') ? (
                                                            <img
                                                                src={URL.createObjectURL(file)}
                                                                alt="preview"
                                                                className="w-100 rounded-xxl"
                                                                style={{
                                                                    height: '150px',
                                                                    objectFit: 'cover'
                                                                }} // Adjust height for consistent size
                                                            />
                                                        ) : (
                                                            <video
                                                                src={URL.createObjectURL(file)}
                                                                controls
                                                                className="w-100 rounded-xxl"
                                                                style={{height: '150px', objectFit: 'cover'}}
                                                            ></video>
                                                        )}

                                                        {/* Close button for removing media */}
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

                                                        {/* Display indicator if there are more than 5 images */}
                                                        {index === 4 && createPost.media_link.length > 5 && (
                                                            <div
                                                                className="more-indicator position-absolute w-100 h-100 d-flex justify-content-center align-items-center"
                                                                style={{
                                                                    background: 'rgba(0, 0, 0, 0.5)',
                                                                    top: 0,
                                                                    left: 0,
                                                                    color: 'white',
                                                                    fontSize: '24px',
                                                                }}
                                                            >
                                                                +{createPost.media_link.length - 5}
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}


                                </form>


                                {/* Action buttons below the textarea */}
                                <div className="card-body d-flex p-0 mt-0">


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

                                </div>
                            </div>
                            {/*get post*/}
                            <>
                                {posts.map((post, index) => (
                                    <div key={index}
                                         className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-3">
                                        <div className="card-body p-0 d-flex">
                                            <figure className="avatar me-3">
                                                <img src={post.user_image || '/images/profile-2.png'} alt="user"
                                                     className="shadow-sm rounded-circle w45"/>
                                            </figure>
                                            <div className="post-visibility-icon">
                                                {post.visibility === 'public' ? (
                                                    <i className="icon-public" title="Public Post"></i> // Replace with your public icon
                                                ) : (
                                                    <i className="icon-private" title="Private Post"></i> // Replace with your private icon
                                                )}
                                            </div>
                                            <h4 className="fw-700 text-grey-900 font-xssss mt-1">
                                                {post.username}
                                                <span
                                                    className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500"> {formatTimeAgo(post.createdAt)}</span>
                                            </h4>
                                            <a href="#" className="ms-auto" id="dropdownMenu4"
                                               data-bs-toggle="dropdown" aria-expanded="false">
                                                <i className="ti-more-alt text-grey-900 btn-round-md bg-greylight font-xss"></i>
                                            </a>
                                            <div
                                                className="dropdown-menu dropdown-menu-start p-4 rounded-xxl border-0 shadow-lg"
                                                aria-labelledby="dropdownMenu4">

                                                <div className="card-body p-0 d-flex">
                                                    <Link to={`/update-post/${post.id}`}
                                                          className="fw-600 text-grey-900 font-xssss mt-0 me-4 d-flex align-items-center">
                                                        <i className="feather-edit text-grey-500 me-3 font-lg"></i>
                                                        Edit Post
                                                    </Link>
                                                </div>


                                                <div className="card-body p-0 d-flex"
                                                     onClick={() => handleDeletePostClick(post.id)}>
                                                    <i className="feather-trash text-grey-500 me-3 font-lg"></i>
                                                    <Link to="#"
                                                          className="fw-600 mb-0 text-grey-900 font-xssss mt-0 me-4">Delete
                                                        Post t<span
                                                            className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">Delete pos click on delet</span></Link>
                                                </div>
                                            </div>

                                            {/* Delete Confirmation Modal */}
                                            {showDeletePopup && (
                                                <div className="modal show"
                                                     style={{display: 'block', backdropFilter: 'blur(0.5px)'}}
                                                     onClick={cancelDelete}>
                                                    <div className="modal-dialog modal-dialog-centered">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <h5 className="modal-title">Confirm
                                                                    Deletion</h5>
                                                                <button type="button" className="btn-close"
                                                                        onClick={cancelDelete}></button>
                                                            </div>
                                                            <div className="modal-body">
                                                                <p>Are you sure you want to delete this
                                                                    post?</p>
                                                                {errorMessage &&
                                                                    <p className="text-danger">{errorMessage}</p>} {/* Show error message */}
                                                                {successMessage &&
                                                                    <p className="text-success">{successMessage}</p>} {/* Show success message */}
                                                            </div>
                                                            <div className="modal-footer">
                                                                <button type="button"
                                                                        className="btn btn-secondary"
                                                                        onClick={cancelDelete}>No
                                                                </button>
                                                                <button type="button" className="btn btn-danger"
                                                                        onClick={confirmDeletePost}> Yes
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>


                                        <div className="card-body p-0 me-lg-5">
                                            <p className="fw-500 text-grey-500 lh-26 font-xssss w-100 mb-2">
                                                {post.content.split(' ').length <= 20 ? (
                                                    post.content
                                                ) : (
                                                    <>
                                                        {post.content.split(' ').slice(0, 20).join(' ')}...
                                                        <Link
                                                            to="#"
                                                            className="fw-600 text-primary ms-2"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                handleNavigateToPost(post.id); // Navigate to the single post page
                                                            }}
                                                        >
                                                            See more
                                                        </Link>
                                                    </>
                                                )}
                                            </p>
                                        </div>


                                        {/* Combined media link and gallery images into a collage */}
                                        <div className="media-collage">
                                            {/* Display media link (image or video) */}
                                            <div className="row mb-2">
                                                {/* Combine media_link and gallery_images */}
                                                {post.media_link && (
                                                    <>
                                                        {/* One image (media_link only) */}
                                                        {(!post.gallery_images || post.gallery_images.length === 0) && (
                                                            <div className="col-12">
                                                                {post.post_type === "image" && (
                                                                    <img
                                                                        src={post.media_link}
                                                                        alt="Post media"
                                                                        className="w-100 mb-2"
                                                                        onClick={() => handleNavigateToPost(post.id)} // Navigate on image click
                                                                    />
                                                                )}
                                                                {post.post_type === "video" && (
                                                                    <video
                                                                        autoPlay
                                                                        loop
                                                                        className="w-100"
                                                                        controls
                                                                        muted
                                                                        onClick={() => handleNavigateToPost(post.id)} // Navigate on video click
                                                                    >
                                                                        <source src={post.media_link}
                                                                                type="video/mp4"/>
                                                                        Your browser does not support the video
                                                                        tag.
                                                                    </video>
                                                                )}
                                                            </div>
                                                        )}

                                                        {/* Handling other cases like gallery images */}
                                                        {post.gallery_images && post.gallery_images.length > 0 && (
                                                            <>
                                                                {post.gallery_images.map((image, idx) => (
                                                                    <div key={idx} className="col-4">
                                                                        <img
                                                                            src={image}
                                                                            alt={`Gallery image ${idx + 1}`}
                                                                            className="w-100 mb-2"
                                                                            onClick={() => handleNavigateToPost(post.id)} // Navigate on gallery image click
                                                                        />
                                                                    </div>
                                                                ))}
                                                            </>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        </div>


                                        <div className="card-body d-flex p-0 mt-3">
                                            <Link
                                                to="#"
                                                className="emoji-bttn d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss me-2"
                                                onClick={() => handleReactionClick(post.id)} // Only updates this specific post
                                            >
                                                <i className={`feather-thumbs-up ${likedPosts.has(post.id) ? 'bg-primary text-grey' : ''} me-1 btn-round-xs font-xss`}></i>
                                                Like {post.like_count || 0}
                                            </Link>


                                            {/* Comment button */}
                                            <Link
                                                to="#"
                                                className="d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss me-2"
                                                onClick={() => handleShowComments(post.id)}
                                            >
                                                <i className="feather-message-circle text-dark text-grey-900 btn-round-sm font-lg"></i>
                                                <span className="d-none-xss">{post.comments} Comment</span>
                                            </Link>
                                            <div
                                                className="dropdown-menu dropdown-menu-end p-4 rounded-xxl border-0 shadow-lg"
                                                aria-labelledby="dropdownMenu31"
                                            >
                                                <h4 className="fw-700 font-xss text-grey-900 d-flex align-items-center">
                                                    Share
                                                    <i className="feather-x ms-auto font-xssss btn-round-xs bg-greylight text-grey-900 me-2"></i>
                                                </h4>
                                                <div className="card-body p-0 d-flex">
                                                    <ul className="d-flex align-items-center justify-content-between mt-2">
                                                        <li className="me-1">
                                                            <a
                                                                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`http://localhost:3000/single-post/${post.id}`)}`}
                                                                className="btn-round-lg bg-facebook"
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                onClick={() => handleShare(post.id)}
                                                            >
                                                                <i className="font-xs ti-facebook text-white"></i>
                                                            </a>
                                                        </li>
                                                        <li className="me-1">
                                                            <a
                                                                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out this post: http://localhost:3000/single-post/${post.id}`)}`}
                                                                className="btn-round-lg bg-twitter"
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                onClick={() => handleShare(post.id)}
                                                            >
                                                                <i className="font-xs ti-twitter-alt text-white"></i>
                                                            </a>
                                                        </li>
                                                        <li className="me-1">
                                                            <a
                                                                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`http://localhost:3000/single-post/${post.id}`)}`}
                                                                className="btn-round-lg bg-linkedin"
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                onClick={() => handleShare(post.id)}
                                                            >
                                                                <i className="font-xs ti-linkedin text-white"></i>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>

                                                <h4 className="fw-700 font-xssss mt-4 text-grey-500 d-flex align-items-center mb-3">Copy
                                                    Link</h4>
                                                <i
                                                    className="feather-copy position-absolute right-35 mt-3 font-xs text-grey-500"
                                                    onClick={(event) => handleCopyLink(event, `http://localhost:3000/single-post/${post.id}`)}
                                                ></i>

                                                <input
                                                    type="text"
                                                    value={`http://localhost:3000/single-post/${post.id}`}
                                                    className="bg-grey text-grey-500 font-xssss border-0 lh-32 p-2 font-xssss fw-600 rounded-3 w-100 theme-dark-bg"
                                                    readOnly
                                                />
                                                {copySuccess &&
                                                    <span className="text-success mt-2">Link copied!</span>}
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
                                                        {commentsByPost[post.id] && commentsByPost[post.id].length > 0 ? (
                                                            commentsByPost[post.id].map((userComment, id) => (
                                                                <div key={id}
                                                                     className="d-flex align-items-start mb-3">
                                                                    <figure className="avatar me-3">
                                                                        <img
                                                                            src={userComment.user.image || '/images/profile-2.png'}
                                                                            alt="user"
                                                                            className="rounded-circle w30"
                                                                        />
                                                                    </figure>
                                                                    <div className="comment-content">
                                                                        <h5 className="fw-600 text-grey-900 font-xssss mb-1">
                                                                            {userComment.user.username || "Unknown User"}
                                                                            <span className="d-none-xss">
                                                                          {formatTimeAgo(userComment.createdAt)}
                                                                                 </span>
                                                                        </h5>
                                                                        <p className="fw-400 text-grey-500 lh-24 font-xss m-0 text-dark">
                                                                            {typeof userComment.content === 'string' ? userComment.content : 'Invalid comment'}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <p>No comments yet.</p> // This shows if there are no comments for this post
                                                        )}
                                                    </>
                                                )}

                                                {/* Show loader while adding a comment */}
                                                {loadingAddComment && <p>Adding a comment...</p>}

                                                <form className="comment-form d-flex mt-2"
                                                      onSubmit={(e) => handleAddComment(e, post.id)}>
                                                    <input
                                                        type="text"
                                                        className="form-control h75 rounded-xxl p-3"
                                                        placeholder="Write a comment..."
                                                        value={newComment}
                                                        onChange={(e) => setNewComment(e.target.value)}
                                                    />
                                                    <button type="submit"
                                                            className={`btn ms-2 border-0 ${newComment ? 'btn-primary' : ''}`}
                                                            disabled={!newComment}>
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
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
