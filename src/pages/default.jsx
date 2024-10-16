import React from 'react';
import {useState, useEffect} from "react";
import {Link, useNavigate} from 'react-router-dom';
import {AuthContext} from '../Context/Authcontext'
import Spinner from 'react-bootstrap/Spinner';
import {deletePost, fetchUserData, sharePosts} from "../Services/api";
import moment from "moment";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton } from 'react-share';
import {
    addPost,
    gettingPost,
    getCommentsById,
    addComment,
    deleteComment,
    updateComment,
    deleteLike,
    getFriend,
    acceptFriendRequest,
    deleteFriend,
    likePost,
} from "../Services/api";

import { Carousel, Modal } from 'react-bootstrap';
export const DefaultPage = ({post}) => {
    const visibleSlides = 4; // Number of slides to show at once

    const [showFullContent, setShowFullContent] = useState(false); // State for managing full content visibility
    const [expandedPosts, setExpandedPosts] = useState({}); // State to track expanded posts
    const navigate = useNavigate();
    const toggleExpandPost = (postId) => {
        setExpandedPosts((prev) => ({
            ...prev,
            [postId]: !prev[postId], // Toggle the visibility of the specific post
        }));
    };



    const [mainContentLoading, setMainContentLoading] = useState(true); //main conntent lodadin state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const [commentsByPost, setCommentsByPost] = useState({});



    // Function to open modal with additional images
    const handleIndicatorClick = () => {
        setSelectedImages(post.gallery_images.slice(5)); // Get additional images
        setIsModalOpen(true); // Open modal
    };

    // Function to close modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const [isReactionActive, setIsReactionActive] = useState(null); // To track which post's emoji wrap is active
    const [showComments, setShowComments] = useState(false);
    //share post sate
    const [shareData, setShareData] = useState(null); //state share post
    const [shareError, setShareError] = useState(null); // state share error
    const [copySuccess, setCopySuccess] = useState(false); // State for copy success message
    const [error, setError] = useState(null)

//const fetch profile






    // create psot state
    const [createPost, setCreatePost] = useState({
        content: '',
        media: [],
        media_link: [],
        post_type: '',
        visibility: '',
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
        formData.append('visibility', createPost.visibility); // Append visibility

        let postType = 'text';
        if (createPost.media_link.length > 0) {
            const mediaType = createPost.media_link[0].type.startsWith('image') ? 'image' : 'video';
            postType = mediaType;
        }
        formData.append('post_type', postType);

        createPost.media_link.forEach((file) => {
            if (file && (file.type.startsWith('image') || file.type.startsWith('video'))) {
                formData.append('media_link', file);
            }
        });

        try {
            const response = await addPost(formData);
            console.log('Post created successfully:', response);
            setCreatePost({
                content: '',
                media: [],
                media_link: [],
                post_type: '',
                visibility: 'public', // Reset visibility
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

    const [userData, setuserData] = useState({
        image:'',

    })



        useEffect(() => {
            const getUserData = async () => {
                try {
                    const data = await fetchUserData();
                    console.log('fetch user data in home');

                    if (data && data.user) {
                        localStorage.setItem('user_id', data.user.id); // Assuming `id` is the field for user ID

                        setuserData({
                            image: data.user.image
                        });
                    }
                } catch (error) {
                    console.error("failed to fetch user image", error);
                }
            }

            getUserData();
        }, []);

//get post state
    const [getPost, setGetPost] = useState([]);
    const [loading, setLoading] = useState(true);

//getinging Posts
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await gettingPost();
                console.log('Post fetch successfully:', data);

                const processedPosts = data.map(post => {
                    // Initialize likes count from fetched data
                    setLikesCount((prevCounts) => ({
                        ...prevCounts,
                        [post.id]: post.like_count || 0,
                    }));

                    if (post.gallery_images && post.gallery_images.length > 0) {
                        return {
                            ...post,
                            media_link: post.media_link || post.gallery_images[0],
                            gallery_images: post.gallery_images.slice(1),
                        };
                    }
                    return post;
                });

                setGetPost(processedPosts);
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
//Liks handle and state
    // Use optional chaining to handle undefined post or likes
    const [likedPosts, setLikedPosts] = useState(new Map()); // Use a Map to track post IDs and like IDs
    const [likesCount, setLikesCount] = useState({}); // Track likes count for each post


    const handleReactionClick = async (postId) => {
        try {
            // Check if the post is already liked
            const isLiked = likedPosts.has(postId);

            if (isLiked) {
                // Get the like ID for this post from the state
                const likeId = likedPosts.get(postId);

                // Call the API to unlike the post
                await deleteLike(likeId);

                // Remove the post from the likedPosts map
                setLikedPosts((prev) => {
                    const newLikedPosts = new Map(prev);
                    newLikedPosts.delete(postId);
                    return newLikedPosts;
                });

                // Decrement the like count for the post
                setLikesCount((prevCounts) => ({
                    ...prevCounts,
                    [postId]: (prevCounts[postId] || 1) - 1,
                }));

            } else {
                // Call the API to like the post
                const response = await likePost(postId);

                // Add the post and its like ID to the likedPosts map
                setLikedPosts((prev) => {
                    const newLikedPosts = new Map(prev);
                    newLikedPosts.set(postId, response.like.id); // Store the like ID
                    return newLikedPosts;
                });

                // Increment the like count for the post
                setLikesCount((prevCounts) => ({
                    ...prevCounts,
                    [postId]: (prevCounts[postId] || 0) + 1,
                }));
            }
        } catch (error) {
            console.error("Error handling like/unlike action:", error);
        }
    };


    const [showDeletePopup, setShowDeletePopup] = useState(false);

    const [selectedPostId, setSelectedPostId] = useState(null); // Store the post ID to delete

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




//comment state


    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loadingComments, setLoadingComments] = useState(false);
    const [loadingAddComment, setLoadingAddComment] = useState(false);

    const [activePost, setActivePost] = useState(null);
    const fetchComments = async (postId) => {
        setLoadingComments(true);
        try {
            const postComments = await getCommentsById(postId); // Fetch comments by post ID
            setCommentsByPost((prev) => ({ ...prev, [postId]: Array.isArray(postComments) ? postComments : [] })); // Update comments for specific post
        } catch (err) {
            console.error("Error fetching comments:", err);
        } finally {
            setLoadingComments(false);
        }
    };


    // Handle showing comments
    const handleShowComments = async (postId) => {
        if (activePost === postId) {
            setActivePost(null);
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
            setCommentsByPost((prev) => ({
                ...prev,
                [postId]: [addedComment, ...(prev[postId] || [])] // Update comments for the specific post
            }));
            setNewComment(''); // Clear the input field
        } catch (error) {
            console.error("Error adding comment:", error);
            alert("Failed to add comment: " + (error.response ? error.response.data.message : error.message));
        } finally {
            setLoadingAddComment(false);
            await fetchComments(postId); // Fetch updated comments after adding
        }
    };
    //get friend
    const [friends, setFriends] = useState([]);

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

// Handle confirm (accept request)
    const handleConfirm = async (id) => {
        console.log('Accepting friend request with ID:', id); // Log before acceptance
        if (id) {
            try {
                const result = await acceptFriendRequest(id);
                console.log('Friend request accepted:', result);
                // You can add logic here after successful acceptance (e.g., updating the UI)
            } catch (error) {
                console.error('Error accepting friend request:', error.message);
            }
        } else {
            console.error('Friend ID is undefined, cannot accept request.');
        }
    };
// Handle delete (remove request)
    const handleDeleteFriend = async (id) => {
        console.log('Deleting friend with ID:', id); // Log before deletion
        if (id) {
            try {
                const result = await deleteFriend(id);
                console.log('Friend deleted:', result);
                // You can add more logic after successful deletion (e.g., update the UI)
            } catch (error) {
                console.error('Error deleting friend:', error.message);
            }
        } else {
            console.error('Friend ID is undefined, cannot delete.'); // Log if id is undefined
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


    const [store, setStories] = useState([]);
    const [totalSlides, setTotalSlides] = useState(0); // Initialize with 0 or any starting value

    // Load stories from local storage on mount
    const [files, setFiles] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedStory, setSelectedStory] = useState(null);
    // Load stories from local storage on mount
    useEffect(() => {
        const savedStories = JSON.parse(localStorage.getItem('stories')) || [];
        setStories(savedStories);
        setTotalSlides(savedStories.length + 1); // +1 for the 'Add Story' slide
    }, []);

    // Handle file upload
    const handleFileUpload = (e) => {
        setFiles([...e.target.files]);
        setShowModal(true); // Open the preview modal
    };
    // Save story to local storage
    // Save story to local storage
    const createStory = () => {
        const newStories = files.map((file, index) => ({
            id: stories.length + index + 1,
            url: URL.createObjectURL(file),
            type: file.type.startsWith('video/') ? 'video' : 'image',
            user: `User ${stories.length + index + 1}`, // Example username
        }));

        const updatedStories = [...stories, ...newStories];
        setStories(updatedStories);
        localStorage.setItem('stories', JSON.stringify(updatedStories));
        setTotalSlides(updatedStories.length + 1); // Update total slides
        setShowModal(false);
        setFiles([]); // Clear file input
    };
    // Sample story data
    const stories = [
        { id: 1, title: 'Victor Exrixon', image: 'images/s-1.jpg', userImage: 'images/user-11.png' },
        { id: 2, title: 'Surfiya Zakir', image: 'images/s-2.jpg', userImage: 'images/user-12.png' },
        { id: 3, title: 'Goria Coast', video: 'images/s-4.mp4', userImage: 'images/user-9.png' },
        { id: 4, title: 'amber', image: 'images/s-5.jpg' , userImage: 'images/user-6.png' },

        { id: 5, title: 'moeez', image: 'images/s-6.jpg', userImage: 'images/user-8.png' },
        { id: 6, title: 'merab', image: 'images/s-7.jpg', userImage: 'images/user-8.png' },
        { id: 7, title: 'maria', image: 'images/s-8.jpg', userImage: 'images/user-8.png' },
        { id: 8, title: 'ariba', image: 'images/s-9.jpg', userImage: 'images/user-8.png' },

        // Add other stories as needed
    ];



    const handleStoryClick = (story) => {
        setSelectedStory(story);
    };
    const handleNextStory = () => {
        if (!selectedStory) return; // Safeguard against null
        const currentIndex = stories.findIndex(story => story.id === selectedStory.id);
        const nextIndex = (currentIndex + 1) % stories.length; // Loop back to the start
        setSelectedStory(stories[nextIndex]);
    };

    const handlePrevStory = () => {
        if (!selectedStory) return; // Safeguard against null
        const currentIndex = stories.findIndex(story => story.id === selectedStory.id);
        const prevIndex = (currentIndex - 1 + stories.length) % stories.length; // Loop back to the end
        setSelectedStory(stories[prevIndex]);
    };

    useEffect(() => {
        if (!selectedStory) return; // Safeguard to avoid starting timer when no story is selected

        // Automatically move to the next story after 10 seconds (10000 milliseconds)
        const timer = setTimeout(() => {
            handleNextStory();
        }, 10000);

        // Clear the timer when the modal is closed or unmounted
        return () => {
            clearTimeout(timer);
        };
    }, [selectedStory]); // Removed handleNextStory from dependencies since it's defined in the same scope


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

                                    <div className="card w-100 shadow-none bg-transparent border-0 p-0 mb-0 d-flex">
                                        <div className="d-flex justify-content-center overflow-hidden">
                                            <Carousel className="w-100" interval={null} controls={true} wrap={false}>
                                                {/* First Slide: Add Story Slide */}
                                                <Carousel.Item>
                                                    <div className="d-flex justify-content-between">
                                                        <div className="item d-flex flex-column align-items-center">
                                                            <input type="file" multiple onChange={handleFileUpload}
                                                                   style={{display: 'none'}} id="fileUpload"/>
                                                            <label htmlFor="fileUpload"
                                                                   className="card w125 h200 d-block border-0 shadow-none rounded-xxxl bg-dark overflow-hidden mb-3 mt-3">
                                                                <div
                                                                    className="card-body d-block p-3 w-100 position-absolute bottom-0 text-center">
                                        <span className="btn-round-lg bg-white">
                                            <i className="feather-plus font-lg"></i>
                                        </span>
                                                                    <div className="clearfix"></div>
                                                                    <h4 className="fw-700 position-relative z-index-1 ls-1 font-xssss text-white mt-2 mb-1">Add
                                                                        Story</h4>
                                                                </div>
                                                            </label>
                                                        </div>
                                                        {/* Story Slides */}
                                                        {stories.slice(0, 4).map((story) => (
                                                            <div className="item d-flex flex-column align-items-center"
                                                                 key={story.id}>
                                                                <div onClick={() => handleStoryClick(story)}
                                                                     className={`card w125 h200 d-block border-0 shadow-xss rounded-xxxl bg-primary-bottom overflow-hidden cursor-pointer mb-3 mt-3`}
                                                                     style={story.video ? {} : {backgroundImage: `url(${story.image})`}}>
                                                                    {story.video && (
                                                                        <video autoPlay loop
                                                                               className="float-right w-100">
                                                                            <source src={story.video} type="video/mp4"/>
                                                                        </video>
                                                                    )}
                                                                    <div
                                                                        className="card-body d-block p-3 w-100 position-absolute bottom-0 text-center">
                                                                        <Link to="#"
                                                                              onClick={() => handleStoryClick(story)}>
                                                                            <figure
                                                                                className="avatar ms-auto me-auto mb-0 position-relative w50 z-index-1">
                                                                                <img src={story.userImage} alt="image"
                                                                                     className="float-right p-0 bg-white rounded-circle w-100 shadow-xss"/>
                                                                            </figure>
                                                                            <div className="clearfix"></div>
                                                                            <h4 className="fw-600 position-relative z-index-1 ls-1 font-xssss text-white mt-2 mb-1">{story.title}</h4>
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </Carousel.Item>

                                                {/* Second Slide: Add More Stories */}
                                                <Carousel.Item>
                                                    <div className="d-flex justify-content-between">
                                                        {stories.slice(4).map((story) => (
                                                            <div className="item d-flex flex-column align-items-center"
                                                                 key={story.id}>
                                                                <div onClick={() => handleStoryClick(story)}
                                                                     className={`card w125 h200 d-block border-0 shadow-xss rounded-xxxl bg-primary-bottom overflow-hidden cursor-pointer mb-3 mt-3`}
                                                                     style={story.video ? {} : {backgroundImage: `url(${story.image})`}}>
                                                                    {story.video && (
                                                                        <video autoPlay loop
                                                                               className="float-right w-100">
                                                                            <source src={story.video} type="video/mp4"/>
                                                                        </video>
                                                                    )}
                                                                    <div
                                                                        className="card-body d-block p-3 w-100 position-absolute bottom-0 text-center">
                                                                        <Link to="#"
                                                                              onClick={() => handleStoryClick(story)}>
                                                                            <figure
                                                                                className="avatar ms-auto me-auto mb-0 position-relative w50 z-index-1">
                                                                                <img src={story.userImage} alt="image"
                                                                                     className="float-right p-0 bg-white rounded-circle w-100 shadow-xss"/>
                                                                            </figure>
                                                                            <div className="clearfix"></div>
                                                                            <h4 className="fw-600 position-relative z-index-1 ls-1 font-xssss text-white mt-2 mb-1">{story.title}</h4>
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </Carousel.Item>
                                            </Carousel>

                                            {/* Modal to Display Story */}
                                            {selectedStory && (
                                                <div className="modal fade show" id="Modalstory" tabIndex="-1" role="dialog" style={{display: 'block'}}>
                                                    <div className="modal-dialog" role="document">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <h5 className="modal-title">{selectedStory.title}</h5>
                                                                <button type="button" className="btn-close" onClick={() => setSelectedStory(null)} aria-label="Close">
                                                                    <span>&times;</span>
                                                                </button>
                                                            </div>
                                                            <div className="modal-body">
                                                                {selectedStory.video ? (
                                                                    <video controls className="w-100">
                                                                        <source src={selectedStory.video} type="video/mp4" />
                                                                    </video>
                                                                ) : (
                                                                    <img src={selectedStory.image} alt={selectedStory.title} className="w-100" />
                                                                )}
                                                            </div>
                                                            {/* Centered Navigation Icons */}
                                                            <div className="carousel-controls d-flex justify-content-between align-items-center w-100 position-absolute" style={{ top: '50%', transform: 'translateY(-50%)' }}>
                                                                <a className="carousel-control-prev text-dark" href="#Modalstory" role="button" onClick={handlePrevStory}>
                                                                    <span className="carousel-control-prev-icon" aria-hidden="true" style={{ fontSize: '30px' }}></span>
                                                                    <span className="sr-only">Previous</span>
                                                                </a>
                                                                <a className="carousel-control-next text-dark" href="#Modalstory" role="button" onClick={handleNextStory}>
                                                                    <span className="carousel-control-next-icon" aria-hidden="true" style={{ fontSize: '30px' }}></span>
                                                                    <span className="sr-only">Next</span>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}


                                            {/* Modal for File Preview */}
                                            <Modal show={showModal} onHide={() => setShowModal(false)}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Confirm Your Story</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <h5>Selected Files:</h5>
                                                    {files.map((file, index) => (
                                                        <div key={index}>
                                                            {file.type.startsWith("video/") ? (
                                                                <video controls className="uploaded-media w-100 mb-2">
                                                                    <source src={URL.createObjectURL(file)}
                                                                            type={file.type}/>
                                                                    Your browser does not support the video tag.
                                                                </video>
                                                            ) : (
                                                                <img src={URL.createObjectURL(file)}
                                                                     alt={`uploaded-${index}`}
                                                                     className="uploaded-media w-100 mb-2"/>
                                                            )}
                                                        </div>
                                                    ))}
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <button className="btn btn-secondary"
                                                            onClick={() => setShowModal(false)}>
                                                        Cancel
                                                    </button>
                                                    <button className="btn btn-primary" onClick={createStory}>
                                                        Create Story
                                                    </button>
                                                </Modal.Footer>
                                            </Modal>
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
                                                <img src={userData.image || '/images/profile-2.png'} alt="user"
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
                                        {getPost.map((post, index) => (
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
                                                                    src={friend.friend?.image || '/images/profile-2.png'}
                                                                    alt="image"
                                                                    className="shadow-sm rounded-circle w45"/>
                                                            </figure>
                                                            <h4 className="fw-700 text-grey-900 font-xssss mt-1">
                                                                {friend.friend?.username || "No username available"}
                                                                <span
                                                                    className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">12 mutual friends</span>
                                                            </h4>
                                                        </div>
                                                        <div
                                                            className="card-body d-flex align-items-center pt-0 ps-4 pe-4 pb-4">
                                                            <a
                                                                href=""
                                                                onClick={() => handleConfirm(friend.id)}
                                                                className="p-2 lh-20 w100 bg-primary me-2 text-white text-center font-xssss fw-600 ls-1 rounded-xl">
                                                                Confirm
                                                            </a>
                                                            <a
                                                                href=""
                                                                onClick={() => handleDeleteFriend(friend.id)}
                                                                className="p-2 lh-20 w100 bg-grey text-grey-800 text-center font-xssss fw-600 ls-1 rounded-xl">
                                                                Delete
                                                            </a>
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
                                                            <img src={friend.friend?.image || '/images/profile-2.png'}
                                                                 className="shadow-sm rounded-circle w45"/>
                                                        </figure>
                                                        <h4 className="fw-700 text-grey-900 font-xssss mt-2">
                                                            {friend.friend?.username || "No username available"}
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