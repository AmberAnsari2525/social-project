import React from 'react';
import {useState, useEffect} from "react";
import {Link} from 'react-router-dom';
import {AuthContext} from '../Context/Authcontext'
import Spinner from 'react-bootstrap/Spinner';
import {sharePosts} from "../Services/api";
import {
    addPost,
    gettingPost,
    getCommentsById,
    sharePost,
    addComment,
    deleteComment,
    updateComment,
    getFriend
} from "../Services/api";


export const DefaultPage = () => {
    const [mainContentLoading, setMainContentLoading] = useState(true); //main conntent lodadin state

    // State for managing the Create Post form visibility and data
    const [createPost, setCreatePost] = useState({
        content: '',
        media: [], // Ensure media is initialized as an array
        media_link: [] // Ensure media_link is initialized as an array
    });

    const [isReactionActive, setIsReactionActive] = useState(null); // To track which post's emoji wrap is active

    //share post sate
    const [shareData, setShareData] = useState(null); //state share post
    const [shareError, setShareError] = useState(null); // state share error
    const [copySuccess, setCopySuccess] = useState(false); // State for copy success message
    const [error, setError] = useState(null);

    // comment state
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [activePost, setActivePost] = useState(null);  // Track the active post
    const [loadingComments, setLoadingComments] = useState(false);
    const [showComments, setShowComments] = useState(false);

    //get post state
    const [getPost, setGetPost] = useState([]);
    const [loading, setLoading] = useState(true);
    //friends state
    const [friends, setFriends] = useState([]);

    // Handle reaction click
    const handleReactionClick = (postId) => {
        // Toggle the emoji wrap for the clicked post
        setIsReactionActive((prevActivePost) => (prevActivePost === postId ? null : postId));
    };

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

// Handle form submission create post
    const postHandleCreate = async (e) => {
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


//fetching Posts
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await gettingPost();
                console.log('Post fetch successfully:', data);

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
    }, []);

//friend fetch api
    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const response = await getFriend();// Assuming this returns the response object
                if (response.status) {
                    setFriends(response.friends);
                    console.log(response)// Correctly setting the friends array
                } else {
                    setError("Failed to fetch friends.");
                }
            } catch (error) {
                console.error("Error fetching friends:", error);

                if (error.response && error.response.status === 401) {
                    setError("Unauthorized access. Please log in.");
                } else {
                    setError(error.message);
                }
            }
        };
        fetchFriends();
    }, []);

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


    // handle share
    const handleShare = async (postId) => {
        console.log("Sharing post with ID:", postId);

        if (!postId) {
            console.log("postId or user_id is missing");
            return;
        }

        const shareData = { post_id: postId };

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


    // Load comments when the comment icon is clicked
    const handleShowComments = async (postId) => {
        if (activePost === postId) {
            // If the same post is clicked, toggle off the comments
            setActivePost(null);
            setShowComments(false);
        } else {
            // Set the new active post
            setActivePost(postId);
            setShowComments(true);
            setLoadingComments(true);
            try {
                const postComments = await getCommentsById(postId);
                setComments(postComments);
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
        <>
            {/* Navbar Component, passing handleChatToggle as a prop */}

            { /* main content  start */}

            <div>
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
                                <div className="col-xl-8 col-xxl-9 col-lg-8">


                                    <div
                                        className="card w-100 shadow-none bg-transparent bg-transparent-card border-0 p-0 mb-0">
                                        <div
                                            className="owl-carousel category-card owl-theme overflow-hidden nav-none owl-loaded owl-drag  ">
                                            <div className='owl-stage-outer '>
                                                <div className='owl-stage d-flex' style={{
                                                    transform: 'translate3d(0px, 0px, 0px)',
                                                    transition: 'all 0.5s',
                                                    width: '825px'
                                                }}>
                                                    <div className='owl-item active'
                                                         style={{width: 'auto', marginRight: '7px'}}>
                                                        <div className="item">
                                                            <div data-bs-toggle="modal"
                                                                 data-bs-target="#Modalstory"
                                                                 className="card w125 h200 d-block border-0 shadow-none rounded-xxxl bg-dark overflow-hidden mb-3 mt-3">
                                                                <div
                                                                    className="card-body d-block p-3 w-100 position-absolute bottom-0 text-center">
                                                                    <a href="#">
                                                                <span className="btn-round-lg bg-white"><i
                                                                    className="feather-plus font-lg"></i></span>
                                                                        <div className="clearfix"></div>
                                                                        <h4 className="fw-700 position-relative z-index-1 ls-1 font-xssss text-white mt-2 mb-1">Add
                                                                            Story </h4>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='owl-item active'
                                                         style={{width: 'auto', marginRight: '7px'}}>
                                                        <div className="item">
                                                            <div data-bs-toggle="modal"
                                                                 data-bs-target="#Modalstory"
                                                                 className="card w125 h200 d-block border-0 shadow-xss rounded-xxxl bg-primary-bottom overflow-hidden cursor-pointer mb-3 mt-3"

                                                                 style={{backgroundImage: 'url(images/s-1.jpg)'}}>

                                                                <div
                                                                    className="card-body d-block p-3 w-100 position-absolute bottom-0 text-center">
                                                                    <a href="#">
                                                                        <figure
                                                                            className="avatar ms-auto me-auto mb-0 position-relative w50 z-index-1">
                                                                            <img src="images/user-11.png"
                                                                                 alt="image"
                                                                                 className="float-right p-0 bg-white rounded-circle w-100 shadow-xss"/>
                                                                        </figure>
                                                                        <div className="clearfix"></div>
                                                                        <h4 className="fw-600 position-relative z-index-1 ls-1 font-xssss text-white mt-2 mb-1">Victor
                                                                            Exrixon </h4>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='owl-item active'
                                                         style={{width: 'auto', marginRight: '7px'}}>
                                                        <div className="item">
                                                            <div data-bs-toggle="modal"
                                                                 data-bs-target="#Modalstory"
                                                                 className="card w125 h200 d-block border-0 shadow-xss rounded-xxxl bg-primary-bottom overflow-hidden cursor-pointer mb-3 mt-3"
                                                                 style={{backgroundImage: 'url(images/s-2.jpg)'}}>
                                                                <div
                                                                    className="card-body d-block p-3 w-100 position-absolute bottom-0 text-center">
                                                                    <a href="#">
                                                                        <figure
                                                                            className="avatar ms-auto me-auto mb-0 position-relative w50 z-index-1">
                                                                            <img src="images/user-12.png"
                                                                                 alt="image"
                                                                                 className="float-right p-0 bg-white rounded-circle w-100 shadow-xss"/>
                                                                        </figure>
                                                                        <div className="clearfix"></div>
                                                                        <h4 className="fw-600 position-relative z-index-1 ls-1 font-xssss text-white mt-2 mb-1">Surfiya
                                                                            Zakir </h4>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className='owl-item active'
                                                         style={{width: 'auto', marginRight: '7px'}}>
                                                        <div className="item">
                                                            <div data-bs-toggle="modal"
                                                                 data-bs-target="#Modalstory"
                                                                 className="card w125 h200 d-block border-0 shadow-xss rounded-xxxl bg-primary-bottom overflow-hidden cursor-pointer mb-3 mt-3">
                                                                <video autoPlay loop
                                                                       className="float-right w-100">
                                                                    <source src="images/s-4.mp4"
                                                                            type="video/mp4"/>
                                                                </video>
                                                                <div
                                                                    className="card-body d-block p-3 w-100 position-absolute bottom-0 text-center">
                                                                    <a href="#">
                                                                        <figure
                                                                            className="avatar ms-auto me-auto mb-0 position-relative w50 z-index-1">
                                                                            <img src="images/user-9.png"
                                                                                 alt="image"
                                                                                 className="float-right p-0 bg-white rounded-circle w-100 shadow-xss"/>
                                                                        </figure>
                                                                        <div className="clearfix"></div>
                                                                        <h4 className="fw-600 position-relative z-index-1 ls-1 font-xssss text-white mt-2 mb-1">Goria
                                                                            Coast </h4>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='owl-item'
                                                         style={{width: 'auto', marginRight: '7px'}}>
                                                        <div className="item">
                                                            <div data-bs-toggle="modal"
                                                                 data-bs-target="#Modalstory"
                                                                 className="card w125 h200 d-block border-0 shadow-xss rounded-xxxl bg-primaryt-bottom overflow-hidden cursor-pointer mb-3 mt-3 me-1">
                                                                <video autoPlay loop
                                                                       className="float-right w-100">
                                                                    <source src="images/s-3.mp4"
                                                                            type="video/mp4"/>
                                                                </video>
                                                                <div
                                                                    className="card-body d-block p-3 w-100 position-absolute bottom-0 text-center">
                                                                    <a href="#">
                                                                        <figure
                                                                            className="avatar ms-auto me-auto mb-0 position-relative w50 z-index-1">
                                                                            <img src="images/user-4.png"
                                                                                 alt="image"
                                                                                 className="float-right p-0 bg-white rounded-circle w-100 shadow-xss"/>
                                                                        </figure>
                                                                        <div className="clearfix"></div>
                                                                        <h4 className="fw-600 position-relative z-index-1 ls-1 font-xssss text-white mt-2 mb-1">Hurin
                                                                            Seary </h4>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className='owl-item active'
                                                         style={{width: 'auto', marginRight: '7px'}}>
                                                        <div className="item">
                                                            <div data-bs-toggle="modal"
                                                                 data-bs-target="#Modalstory"
                                                                 className="card w125 h200 d-block border-0 shadow-xss rounded-xxxl bg-primary-bottom overflow-hidden cursor-pointer mb-3 mt-3"
                                                                 style={{backgroundImage: 'url(images/s-5.jpg)'}}>
                                                                <div
                                                                    className="card-body d-block p-3 w-100 position-absolute bottom-0 text-center">
                                                                    <Link to="#">
                                                                        <figure
                                                                            className="avatar ms-auto me-auto mb-0 position-relative w50 z-index-1">
                                                                            <img src="images/user-3.png"
                                                                                 alt="image"
                                                                                 className="float-right p-0 bg-white rounded-circle w-100 shadow-xss"/>
                                                                        </figure>
                                                                        <div className="clearfix"></div>
                                                                        <h4 className="fw-600 position-relative z-index-1 ls-1 font-xssss text-white mt-2 mb-1">David
                                                                            Goria </h4>
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className='owl-item active'
                                                         style={{width: 'auto', marginRight: '7px'}}>
                                                        <div className="item">
                                                            <div data-bs-toggle="modal"
                                                                 data-bs-target="#Modalstory"
                                                                 className="card w125 h200 d-block border-0 shadow-xss rounded-xxxl bg-primary-bottom overflow-hidden cursor-pointer mb-3 mt-3"

                                                                 style={{backgroundImage: 'url(images/s-6.jpg)'}}>

                                                                <div
                                                                    className="card-body d-block p-3 w-100 position-absolute bottom-0 text-center">
                                                                    <a href="#">
                                                                        <figure
                                                                            className="avatar ms-auto me-auto mb-0 position-relative w50 z-index-1">
                                                                            <img src="images/user-2.png"
                                                                                 alt="image"
                                                                                 className="float-right p-0 bg-white rounded-circle w-100 shadow-xss"/>
                                                                        </figure>
                                                                        <div className="clearfix"></div>
                                                                        <h4 className="fw-600 position-relative z-index-1 ls-1 font-xssss text-white mt-2 mb-1">Seary
                                                                            Victor </h4>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>


                                                </div>
                                            </div>


                                        </div>
                                    </div>


                                    <div
                                        className="card w-100 shadow-xss rounded-xxl border-0 ps-4 pt-4 pe-4 pb-3 mb-3">
                                        <div className="card-body p-0">
                                            {/* Create Post Button */}
                                            <button
                                                className="font-xssss fw-600 card-body p-0 d-flex align-items-center"
                                                onClick={handleCreatePostClick}
                                                style={{
                                                    color: createPost.content.trim().length === 0 && createPost.media.length === 0 ? 'lightgrey' : 'black', // Dynamic text color
                                                    border: 'inherit',
                                                    background: 'inherit'
                                                }}
                                                disabled={createPost.content.trim().length === 0 && createPost.media.length === 0} // Disable when both content and media are empty
                                            >
                                                <i
                                                    className={`btn-round-sm font-xs feather-edit-3 me-2 bg-greylight`}
                                                    style={{
                                                        color: createPost.content.trim().length === 0 && createPost.media.length === 0 ? 'lightgrey' : 'black', // Dynamic icon color
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

                                            {error && <p className="text-danger">{error}</p>}

                                            {/* Display selected images and videos */}
                                            {Array.isArray(createPost.media_link) && createPost.media_link.length > 0 && (
                                                <div className="media-preview mt-3">
                                                    {createPost.media_link.map((file, index) => (
                                                        <div key={index} className="media-item position-relative">
                                                            {file.type.startsWith('image') ? (
                                                                <img
                                                                    src={URL.createObjectURL(file)}
                                                                    alt="preview"
                                                                    className="w-100 rounded-xxl mb-2"
                                                                />
                                                            ) : (
                                                                <video
                                                                    src={URL.createObjectURL(file)}
                                                                    controls
                                                                    className="w-100 rounded-xxl mb-2"
                                                                ></video>
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
                                            <Link to="#"
                                                  className="d-flex align-items-center font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4">
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
                                            <Link to="#"
                                                  className="d-flex align-items-center font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4">
                                                <i className="font-md text-warning feather-camera me-2"></i>
                                                <span className="d-none-xs">Feeling/Activity</span>
                                            </Link>
                                            <Link to="#" className="ms-auto" id="dropdownMenu4"
                                                  data-bs-toggle="dropdown"
                                                  aria-expanded="false"><i
                                                className="ti-more-alt text-grey-900 btn-round-md bg-greylight font-xss"></i></Link>
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
                                                    <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4">Hide all
                                                        from Group <span
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
                                    </div>


                                    <div className="card w-100 ">
                                        <div
                                            className="owl-carousel category-card owl-theme overflow-hidden nav-none owl-loaded owl-drag d-flex">
                                            <div className='owl-item active'
                                                 style={{width: 'auto', marginRight: "7px"}}>
                                                <div className="item">
                                                    <div
                                                        className="card w200 d-block border-0 shadow-xss rounded-xxl overflow-hidden mb-3 me-2 mt-3">
                                                        <div
                                                            className="card-body position-relative h100 bg-image-cover bg-image-center"

                                                            style={{backgroundImage: 'url(images/u-bg.jpg)'}}>


                                                        </div>
                                                        <div
                                                            className="card-body d-block w-100 ps-4 pe-4 pb-4 text-center">
                                                            <figure
                                                                className="avatar ms-auto me-auto mb-0 mt--6 position-relative w75 z-index-1">
                                                                <img src="/images/user-11.png" alt="image"
                                                                     className="float-right p-1 bg-white rounded-circle w-100"/>
                                                            </figure>
                                                            <div className="clearfix"></div>
                                                            <h4 className="fw-700 font-xsss mt-2 mb-1">Aliqa
                                                                Macale </h4>
                                                            <p className="fw-500 font-xsssss text-grey-500 mt-0 mb-2">support@gmail.com</p>
                                                            <span
                                                                className="live-tag mt-2 mb-0 bg-danger p-2 z-index-1 rounded-3 text-white font-xsssss text-uppersace fw-700 ls-3">LIVE</span>
                                                            <div className="clearfix mb-2"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='owl-item active'
                                                 style={{width: 'auto', marginRight: "7px"}}>
                                                <div className="item">
                                                    <div
                                                        className="card w200 d-block border-0 shadow-xss rounded-xxl overflow-hidden mb-3 me-2 mt-3">
                                                        <div
                                                            className="card-body position-relative h100 bg-image-cover bg-image-center"
                                                            style={{backgroundImage: 'url(images/s-2.jpg)'}}></div>
                                                        <div
                                                            className="card-body d-block w-100 ps-4 pe-4 pb-4 text-center">
                                                            <figure
                                                                className="avatar ms-auto me-auto mb-0 mt--6 position-relative w75 z-index-1">
                                                                <img src="/images/user-2.png" alt="image"
                                                                     className="float-right p-1 bg-white rounded-circle w-100"/>
                                                            </figure>
                                                            <div className="clearfix"></div>
                                                            <h4 className="fw-700 font-xsss mt-2 mb-1">Seary
                                                                Victor </h4>
                                                            <p className="fw-500 font-xsssss text-grey-500 mt-0 mb-2">support@gmail.com</p>
                                                            <span
                                                                className="live-tag mt-2 mb-0 bg-danger p-2 z-index-1 rounded-3 text-white font-xsssss text-uppersace fw-700 ls-3">LIVE</span>
                                                            <div className="clearfix mb-2"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='owl-item active'
                                                 style={{width: 'auto', marginRight: "7px"}}>
                                                <div className="item">
                                                    <div
                                                        className="card w200 d-block border-0 shadow-xss rounded-xxl overflow-hidden mb-3 me-2 mt-3">
                                                        <div
                                                            className="card-body position-relative h100 bg-image-cover bg-image-center"
                                                            style={{backgroundImage: 'url(images/s-6.jpg)'}}></div>
                                                        <div
                                                            className="card-body d-block w-100 ps-4 pe-4 pb-4 text-center">
                                                            <figure
                                                                className="avatar ms-auto me-auto mb-0 mt--6 position-relative w75 z-index-1">
                                                                <img src="/images/user-3.png" alt="image"
                                                                     className="float-right p-1 bg-white rounded-circle w-100"/>
                                                            </figure>
                                                            <div className="clearfix"></div>
                                                            <h4 className="fw-700 font-xsss mt-2 mb-1">John
                                                                Steere </h4>
                                                            <p className="fw-500 font-xsssss text-grey-500 mt-0 mb-2">support@gmail.com</p>
                                                            <span
                                                                className="live-tag mt-2 mb-0 bg-danger p-2 z-index-1 rounded-3 text-white font-xsssss text-uppersace fw-700 ls-3">LIVE</span>
                                                            <div className="clearfix mb-2"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='owl-item active'
                                                 style={{width: 'auto', marginRight: "7px"}}>
                                                <div className="item">
                                                    <div
                                                        className="card w200 d-block border-0 shadow-xss rounded-xxl overflow-hidden mb-3 me-2 mt-3">
                                                        <div
                                                            className="card-body position-relative h100 bg-image-cover bg-image-center"
                                                            style={{backgroundImage: 'url(images/bb-16.png)'}}
                                                        ></div>
                                                        <div
                                                            className="card-body d-block w-100 ps-4 pe-4 pb-4 text-center">
                                                            <figure
                                                                className="avatar ms-auto me-auto mb-0 mt--6 position-relative w75 z-index-1">
                                                                <img src="/images/user-4.png" alt="image"
                                                                     className="float-right p-1 bg-white rounded-circle w-100"/>
                                                            </figure>
                                                            <div className="clearfix"></div>
                                                            <h4 className="fw-700 font-xsss mt-2 mb-1">Mohannad
                                                                Zitoun </h4>
                                                            <p className="fw-500 font-xsssss text-grey-500 mt-0 mb-2">support@gmail.com</p>
                                                            <span
                                                                className="live-tag mt-2 mb-0 bg-danger p-2 z-index-1 rounded-3 text-white font-xsssss text-uppersace fw-700 ls-3">LIVE</span>
                                                            <div className="clearfix mb-2"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='owl-item active'
                                                 style={{width: 'auto', marginRight: "7px"}}>
                                                <div className="item">
                                                    <div
                                                        className="card w200 d-block border-0 shadow-xss rounded-xxl overflow-hidden mb-3 me-2 mt-3">
                                                        <div
                                                            className="card-body position-relative h100 bg-image-cover bg-image-center"
                                                            style={{backgroundImage: 'url(images/e-4.jpg)'}}
                                                        ></div>
                                                        <div
                                                            className="card-body d-block w-100 ps-4 pe-4 pb-4 text-center">
                                                            <figure
                                                                className="avatar ms-auto me-auto mb-0 mt--6 position-relative w75 z-index-1">
                                                                <img src="/images/user-7.png" alt="image"
                                                                     className="float-right p-1 bg-white rounded-circle w-100"/>
                                                            </figure>
                                                            <div className="clearfix"></div>
                                                            <h4 className="fw-700 font-xsss mt-2 mb-1">Studio
                                                                Express </h4>
                                                            <p className="fw-500 font-xsssss text-grey-500 mt-0 mb-2">support@gmail.com</p>
                                                            <span
                                                                className="live-tag mt-2 mb-0 bg-danger p-2 z-index-1 rounded-3 text-white font-xsssss text-uppersace fw-700 ls-3">LIVE</span>
                                                            <div className="clearfix mb-2"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='owl-item active'
                                                 style={{width: 'auto', marginRight: "7px"}}>


                                                <div className="item">
                                                    <div
                                                        className="card w200 d-block border-0 shadow-xss rounded-xxl overflow-hidden mb-3 me-2 mt-3">
                                                        <div
                                                            className="card-body position-relative h100 bg-image-cover bg-image-center"
                                                            style={{backgroundImage: 'url(images/coming-soon.png)'}}
                                                        ></div>
                                                        <div
                                                            className="card-body d-block w-100 ps-4 pe-4 pb-4 text-center">
                                                            <figure
                                                                className="avatar ms-auto me-auto mb-0 mt--6 position-relative w75 z-index-1">
                                                                <img src="/images/user-5.png" alt="image"
                                                                     className="float-right p-1 bg-white rounded-circle w-100"/>
                                                            </figure>
                                                            <div className="clearfix"></div>
                                                            <h4 className="fw-700 font-xsss mt-2 mb-1">Hendrix
                                                                Stamp </h4>
                                                            <p className="fw-500 font-xsssss text-grey-500 mt-0 mb-2">support@gmail.com</p>
                                                            <span
                                                                className="live-tag mt-2 mb-0 bg-danger p-2 z-index-1 rounded-3 text-white font-xsssss text-uppersace fw-700 ls-3">LIVE</span>
                                                            <div className="clearfix mb-2"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='owl-item active'
                                                 style={{width: 'auto', marginRight: "7px"}}>

                                                <div className="item">
                                                    <div
                                                        className="card w200 d-block border-0 shadow-xss rounded-xxl overflow-hidden mb-3 me-2 mt-3">
                                                        <div
                                                            className="card-body position-relative h100 bg-image-cover bg-image-center"
                                                            style={{backgroundImage: 'url(images/bb-9.jpg)'}}
                                                        ></div>
                                                        <div
                                                            className="card-body d-block w-100 ps-4 pe-4 pb-4 text-center">
                                                            <figure
                                                                className="avatar ms-auto me-auto mb-0 mt--6 position-relative w75 z-index-1">
                                                                <img src="/images/user-6.png" alt="image"
                                                                     className="float-right p-1 bg-white rounded-circle w-100"/>
                                                            </figure>
                                                            <div className="clearfix"></div>
                                                            <h4 className="fw-700 font-xsss mt-2 mb-1">Mohannad
                                                                Zitoun </h4>
                                                            <p className="fw-500 font-xsssss text-grey-500 mt-0 mb-2">support@gmail.com</p>
                                                            <span
                                                                className="live-tag mt-2 mb-0 bg-danger p-2 z-index-1 rounded-3 text-white font-xsssss text-uppersace fw-700 ls-3">LIVE</span>
                                                            <div className="clearfix mb-2"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div
                                        className="card w-100 shadow-none bg-transparent bg-transparent-card border-0 p-0 mb-0">
                                        <div
                                            className="owl-carousel category-card owl-theme overflow-hidden nav-none owl-loaded owl-drag d-flex ">
                                            <div className='owl-stage-outer '>
                                                <div className='owl-stage' style={{
                                                    transform: 'translate3d(0px, 0px, 0px)',
                                                    transition: 'all 0.5s',
                                                    width: '825px'
                                                }}>
                                                    <div className='owl-item active'
                                                         style={{width: 'auto', marginRight: '7px'}}>
                                                        <div className="item">
                                                            <div
                                                                className="card w150 d-block border-0 shadow-xss rounded-3 overflow-hidden mb-3 me-2 mt-3">
                                                                <div
                                                                    className="card-body d-block w-100 ps-3 pe-3 pb-4 text-center">
                                                                    <figure
                                                                        className="avatar ms-auto me-auto mb-0 position-relative w65 z-index-1">
                                                                        <img src="/images/user-11.png"
                                                                             alt="image"
                                                                             className="float-right p-0 bg-white rounded-circle w-100 shadow-xss"/>
                                                                    </figure>
                                                                    <div className="clearfix"></div>
                                                                    <h4 className="fw-700 font-xssss mt-3 mb-1">Richard
                                                                        Bowers </h4>
                                                                    <p className="fw-500 font-xsssss text-grey-500 mt-0 mb-3">@macale343</p>
                                                                    <Link to="#"
                                                                          className="text-center p-2 lh-20 w100 ms-1 ls-3 d-inline-block rounded-xl bg-success font-xsssss fw-700 ls-lg text-white">FOLLOW</Link>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className='owl-item active'
                                                         style={{width: 'auto', marginRight: '7px'}}>
                                                        <div className="item">
                                                            <div
                                                                className="card w150 d-block border-0 shadow-xss rounded-3 overflow-hidden mb-3 me-2 mt-3">
                                                                <div
                                                                    className="card-body d-block w-100 ps-3 pe-3 pb-4 text-center">
                                                                    <figure
                                                                        className="avatar ms-auto me-auto mb-0 position-relative w65 z-index-1">
                                                                        <img src="/images/user-9.png"
                                                                             alt="image"
                                                                             className="float-right p-0 bg-white rounded-circle w-100 shadow-xss"/>
                                                                    </figure>
                                                                    <div className="clearfix"></div>
                                                                    <h4 className="fw-700 font-xssss mt-3 mb-1">David
                                                                        Goria </h4>
                                                                    <p className="fw-500 font-xsssss text-grey-500 mt-0 mb-3">@macale343</p>
                                                                    <Link to="#"
                                                                          className="text-center p-2 lh-20 w100 ms-1 ls-3 d-inline-block rounded-xl bg-success font-xsssss fw-700 ls-lg text-white">FOLLOW</Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='owl-item active'
                                                         style={{width: 'auto', marginRight: '7px'}}>
                                                        <div className="item">
                                                            <div
                                                                className="card w150 d-block border-0 shadow-xss rounded-3 overflow-hidden mb-3 me-2 mt-3">
                                                                <div
                                                                    className="card-body d-block w-100 ps-3 pe-3 pb-4 text-center">
                                                                    <figure
                                                                        className="avatar ms-auto me-auto mb-0 position-relative w65 z-index-1">
                                                                        <img src="/images/user-7.png"
                                                                             alt="image"
                                                                             className="float-right p-0 bg-white rounded-circle w-100 shadow-xss"/>
                                                                    </figure>
                                                                    <div className="clearfix"></div>
                                                                    <h4 className="fw-700 font-xssss mt-3 mb-1">Aliqa
                                                                        Macale </h4>
                                                                    <p className="fw-500 font-xsssss text-grey-500 mt-0 mb-3">@macale343</p>
                                                                    <Link to="#"
                                                                          className="text-center p-2 lh-20 w100 ms-1 ls-3 d-inline-block rounded-xl bg-success font-xsssss fw-700 ls-lg text-white">FOLLOW</Link>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className='owl-item active'
                                                         style={{width: 'auto', marginRight: '7px'}}>
                                                        <div className="item">
                                                            <div
                                                                className="card w150 d-block border-0 shadow-xss rounded-3 overflow-hidden mb-3 me-2 mt-3">
                                                                <div
                                                                    className="card-body d-block w-100 ps-3 pe-3 pb-4 text-center">
                                                                    <figure
                                                                        className="avatar ms-auto me-auto mb-0 position-relative w65 z-index-1">
                                                                        <img src="/images/user-8.png"
                                                                             alt="image"
                                                                             className="float-right p-0 bg-white rounded-circle w-100 shadow-xss"/>
                                                                    </figure>
                                                                    <div className="clearfix"></div>
                                                                    <h4 className="fw-700 font-xssss mt-3 mb-1">Studio
                                                                        Express </h4>
                                                                    <p className="fw-500 font-xsssss text-grey-500 mt-0 mb-3">@macale343</p>
                                                                    <Link to="#"
                                                                          className="text-center p-2 lh-20 w100 ms-1 ls-3 d-inline-block rounded-xl bg-success font-xsssss fw-700 ls-lg text-white">FOLLOW</Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='owl-item active'
                                                         style={{width: 'auto', marginRight: '7px'}}>
                                                        <div className="item">
                                                            <div
                                                                className="card w150 d-block border-0 shadow-xss rounded-3 overflow-hidden mb-3 me-2 mt-3">
                                                                <div
                                                                    className="card-body d-block w-100 ps-3 pe-3 pb-4 text-center">
                                                                    <figure
                                                                        className="avatar ms-auto me-auto mb-0 position-relative w65 z-index-1">
                                                                        <img src="/images/user-7.png"
                                                                             alt="image"
                                                                             className="float-right p-0 bg-white rounded-circle w-100 shadow-xss"/>
                                                                    </figure>
                                                                    <div className="clearfix"></div>
                                                                    <h4 className="fw-700 font-xssss mt-3 mb-1">Aliqa
                                                                        Macale </h4>
                                                                    <p className="fw-500 font-xsssss text-grey-500 mt-0 mb-3">@macale343</p>
                                                                    <Link to="#"
                                                                          className="text-center p-2 lh-20 w100 ms-1 ls-3 d-inline-block rounded-xl bg-success font-xsssss fw-700 ls-lg text-white">FOLLOW</Link>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>

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
                                                            className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">{post.createdAt}</span>
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
                                                        <h4 className="fw-700 font-xss text-grey-900 d-flex align-items-center">
                                                            Share <i
                                                            className="feather-x ms-auto font-xssss btn-round-xs bg-greylight text-grey-900 me-2"></i>
                                                        </h4>
                                                        <div className="card-body p-0 d-flex">
                                                            <ul className="d-flex align-items-center justify-content-between mt-2">
                                                                <li className="me-1">
                                                                    <Link
                                                                        to={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData?.shareableLink || `https://social.techxdeveloper.com/${post.id}`)}`}
                                                                        className="btn-round-lg bg-facebook"
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        onClick={() => handleShare(post.id)}
                                                                    >
                                                                        <i className="font-xs ti-facebook text-white"></i>
                                                                    </Link>
                                                                </li>
                                                                <li className="me-1">
                                                                    <Link
                                                                        to={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareData?.shareableLink || `https://social.techxdeveloper.com/${post.id}`)}&text=Check out this post!`}
                                                                        className="btn-round-lg bg-twitter"
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        onClick={() => handleShare(post.id)}
                                                                    >
                                                                        <i className="font-xs ti-twitter-alt text-white"></i>
                                                                    </Link>
                                                                </li>
                                                                <li className="me-1">
                                                                    <Link
                                                                        to={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareData?.shareableLink || `https://social.techxdeveloper.com/${post.id}`)}`}
                                                                        className="btn-round-lg bg-linkedin"
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        onClick={() => handleShare(post.id)}
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
                                                            onClick={(event) => handleCopyLink(event, shareData?.shareableLink || `https://social.techxdeveloper.com/${post.id}`)}
                                                        ></i>
                                                        <input
                                                            type="text"
                                                            value={shareData?.shareableLink || `https://social.techxdeveloper.com/${post.id}`}
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
                                                                                    <h5 className="fw-600 text-grey-900 font-xssss mb-1">{comment.username}
                                                                                        <span
                                                                                            className="d-none-xss">{post.createdAt} </span>
                                                                                    </h5>
                                                                                    <p className="fw-400 text-grey-500 lh-24 font-xss m-0 text-dark">{comment.comment}</p>

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


                                    <div
                                        className="card w-100 text-center shadow-xss rounded-xxl border-0 p-4 mb-3 mt-3">
                                        <div className="snippet mt-2 ms-auto me-auto color-theme-blue "
                                             data-title=".dot-typing">
                                            <div className="stage">
                                                <div className="dot-typing"></div>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                                <div className="col-xl-4 col-xxl-3 col-lg-4 ps-lg-0">
                                    {/* Pending Friends Card */}
                                    <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3">
                                        <div className="card-body d-flex align-items-center p-4">
                                            <h4 className="fw-700 mb-0 font-xssss text-grey-900">Friend Request</h4>
                                            <Link to="/default-member"
                                                  className="fw-600 ms-auto font-xssss text-primary">See all</Link>
                                        </div>

                                        {/* Map through friends array to show friend requests */}
                                        {Array.isArray(friends) && friends.length > 0 ? (
                                            friends.map((friend, index) => (
                                                friend.status === 0 && ( // Check if status is 0
                                                    <div key={index}>
                                                        <div
                                                            className="card-body d-flex pt-3 ps-4 pe-4 pb-0 border-top-xs bor-0">
                                                            <figure className="avatar me-3">
                                                                <img
                                                                    src={friend.receiver?.image || 'images/profile-2.png'}
                                                                    alt="image"
                                                                    className="shadow-sm rounded-circle w45"/>
                                                            </figure>
                                                            <h4 className="fw-700 text-grey-900 font-xssss mt-1">
                                                                {friend.receiver?.username || "No username available"}
                                                                <span
                                                                    className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">12 mutual friends</span>
                                                            </h4>
                                                        </div>
                                                        <div
                                                            className="card-body d-flex align-items-center pt-0 ps-4 pe-4 pb-4">
                                                            <a href="#"
                                                               className="p-2 lh-20 w100 bg-primary me-2 text-white text-center font-xssss fw-600 ls-1 rounded-xl">Confirm</a>
                                                            <a href="#"
                                                               className="p-2 lh-20 w100 bg-grey text-grey-800 text-center font-xssss fw-600 ls-1 rounded-xl">Delete</a>
                                                        </div>
                                                    </div>
                                                )
                                            ))
                                        ) : (
                                            <p>No friend requests to display.</p>
                                        )}
                                    </div>


                                    {/* Confirmed Friends Card */}
                                    <div className="card w-100 shadow-xss rounded-xxl border-0 p-0">
                                        <div className="card-body d-flex align-items-center p-4 mb-0">
                                            <h4 className="fw-700 mb-0 font-xssss text-grey-900">Confirm Friend</h4>
                                            <Link to="/default-member"
                                                  className="fw-600 ms-auto font-xssss text-primary">See all</Link>
                                        </div>

                                        {/* Map through friends array to show friends with status 1 */}
                                        {Array.isArray(friends) && friends.length > 0 ? (
                                            friends.map((friend, index) => (
                                                friend.status === 1 && ( // Check if status is 1
                                                    <div key={index}
                                                         className="card-body bg-transparent-card d-flex p-3 bg-greylight m-3 rounded-3">
                                                        <figure className="avatar me-2 mb-0">
                                                            <img
                                                                src={friend.receiver?.image || '/images/female-profile.png'}
                                                                className="shadow-sm rounded-circle w45"/>
                                                        </figure>
                                                        <h4 className="fw-700 text-grey-900 font-xssss mt-2">
                                                            {friend.receiver?.username || "No username available"}
                                                            <span
                                                                className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">12 mutual friends</span>
                                                        </h4>
                                                        <a href="#"
                                                           className="btn-round-sm bg-white text-grey-900 feather-plus font-xss ms-auto mt-2"></a>
                                                    </div>
                                                )
                                            ))
                                        ) : (
                                            <p>No friends with status 1 to display.</p>
                                        )}
                                    </div>


                                    <div className="card-body dd-block pt-0 ps-4 pe-4 pb-4">
                                        <ul className="memberlist mt-1 mb-2 ms-0 d-block">
                                            <li className="w20">
                                                <Link to="#">
                                                    <img
                                                        src="/images/user-6.png"
                                                        alt="user"
                                                        className="w35 d-inline-block"
                                                        style={{opacity: 1}}
                                                    />
                                                </Link>
                                            </li>
                                            <li className="w20">
                                                <Link to="#">
                                                    <img
                                                        src="/images/user-7.png"
                                                        alt="user"
                                                        className="w35 d-inline-block"
                                                        style={{opacity: 1}}
                                                    />
                                                </Link>
                                            </li>
                                            <li className="w20">
                                                <Link to="#">
                                                    <img
                                                        src="/images/user-8.png"
                                                        alt="user"
                                                        className="w35 d-inline-block"
                                                        style={{opacity: 1}}
                                                    />
                                                </Link>
                                            </li>
                                            <li className="w20">
                                                <Link to="#">
                                                    <img
                                                        src="/images/user-3.png"
                                                        alt="user"
                                                        className="w35 d-inline-block"
                                                        style={{opacity: 1}}
                                                    />
                                                </Link>
                                            </li>
                                            <li className="last-member">
                                                <Link
                                                    to="#"
                                                    className="bg-greylight fw-600 text-grey-500 font-xssss w35 ls-3 text-center"
                                                    style={{height: '35px', lineHeight: '35px'}}
                                                >
                                                    +2
                                                </Link>
                                            </li>
                                            <li className="ps-3 w-auto ms-1">
                                                <Link
                                                    to="#"
                                                    className="fw-600 text-grey-500 font-xssss"
                                                >
                                                    Member apply
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>


                                    <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3">
                                        <div className="card-body d-flex align-items-center p-4">
                                            <h4 className="fw-700 mb-0 font-xssss text-grey-900">Suggest
                                                Pages</h4>
                                            <Link to="/default-group.html"
                                                  className="fw-600 ms-auto font-xssss text-primary">See
                                                all</Link>
                                        </div>
                                        <div
                                            className="card-body d-flex pt-4 ps-4 pe-4 pb-0 overflow-hidden border-top-xs bor-0">
                                            <img src="/images/g-2.jpg" alt="img"
                                                 className="img-fluid rounded-xxl mb-2"/>
                                        </div>
                                        <div
                                            className="card-body d-flex align-items-center pt-0 ps-4 pe-4 pb-4">
                                            <Link to="#"
                                                  className="p-2 lh-28 w-100 bg-grey text-grey-800 text-center font-xssss fw-700 rounded-xl"><i
                                                className="feather-external-link font-xss me-2"></i> Like
                                                Page</Link>
                                        </div>

                                        <div
                                            className="card-body d-flex pt-0 ps-4 pe-4 pb-0 overflow-hidden">
                                            <img src="/images/g-3.jpg" alt="img"
                                                 className="img-fluid rounded-xxl mb-2 bg-lightblue"/>
                                        </div>
                                        <div
                                            className="card-body d-flex align-items-center pt-0 ps-4 pe-4 pb-4">
                                            <Link to="#"
                                                  className="p-2 lh-28 w-100 bg-grey text-grey-800 text-center font-xssss fw-700 rounded-xl"><i
                                                className="feather-external-link font-xss me-2"></i> Like
                                                Page</Link>
                                        </div>


                                    </div>


                                    <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3">
                                        <div className="card-body d-flex align-items-center  p-4">
                                            <h4 className="fw-700 mb-0 font-xssss text-grey-900">Event</h4>
                                            <Link to="/default-event.html"
                                                  className="fw-600 ms-auto font-xssss text-primary">See
                                                all</Link>
                                        </div>
                                        <div
                                            className="card-body d-flex pt-0 ps-4 pe-4 pb-3 overflow-hidden">
                                            <div className="bg-success me-2 p-3 rounded-xxl"><h4
                                                className="fw-700 font-lg ls-3 lh-1 text-white mb-0"><span
                                                className="ls-1 d-block font-xsss text-white fw-600">FEB</span>22
                                            </h4>
                                            </div>
                                            <h4 className="fw-700 text-grey-900 font-xssss mt-2">Meeting
                                                with
                                                clients <span
                                                    className="d-block font-xsssss fw-500 mt-1 lh-4 text-grey-500">41 madison ave, floor 24 new work, NY 10010</span>
                                            </h4>
                                        </div>

                                        <div
                                            className="card-body d-flex pt-0 ps-4 pe-4 pb-3 overflow-hidden">
                                            <div className="bg-warning me-2 p-3 rounded-xxl"><h4
                                                className="fw-700 font-lg ls-3 lh-1 text-white mb-0"><span
                                                className="ls-1 d-block font-xsss text-white fw-600">APR</span>30
                                            </h4>
                                            </div>
                                            <h4 className="fw-700 text-grey-900 font-xssss mt-2">Developer
                                                Programe <span
                                                    className="d-block font-xsssss fw-500 mt-1 lh-4 text-grey-500">41 madison ave, floor 24 new work, NY 10010</span>
                                            </h4>
                                        </div>

                                        <div
                                            className="card-body d-flex pt-0 ps-4 pe-4 pb-3 overflow-hidden">
                                            <div className="bg-primary me-2 p-3 rounded-xxl"><h4
                                                className="fw-700 font-lg ls-3 lh-1 text-white mb-0"><span
                                                className="ls-1 d-block font-xsss text-white fw-600">APR</span>23
                                            </h4>
                                            </div>
                                            <h4 className="fw-700 text-grey-900 font-xssss mt-2">Aniversary
                                                Event <span
                                                    className="d-block font-xsssss fw-500 mt-1 lh-4 text-grey-500">41 madison ave, floor 24 new work, NY 10010</span>
                                            </h4>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>


            { /* main content  end */}


        </>
    )

}