import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';  // import useParams to get postId from URL
import { getPostById, updatePostData } from '../Services/api';

export const UpdatePost = ({ onUpdate }) => {
    const { id } = useParams();  // Get the postId from the URL
    const [updatePost, setUpdatePost] = useState({
        content: '',
        media_link: [],
    });
    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState(null);

    // Fetching post by ID
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await getPostById(id);  // Pass postId to fetch specific post
                if (data) {
                    setPost(data);
                    // Set content and media_link from the fetched data
                    setUpdatePost({
                        content: data.content || '',
                        media_link: data.media_link ? [data.media_link, ...data.gallery_images] : data.gallery_images || [], // Merge media_link and gallery_images if media_link exists
                    });
                }
            } catch (err) {
                console.error('Error fetching post:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUpdatePost((prev) => ({ ...prev, [name]: value }));
    };

    const handleMediaChange = (event) => {
        const files = Array.from(event.target.files);
        setUpdatePost((prev) => ({ ...prev, media_link: [...prev.media_link, ...files] }));
    };

    const handleRemoveMedia = (index) => {
        setUpdatePost((prev) => ({
            ...prev,
            media_link: prev.media_link.filter((_, i) => i !== index),
        }));
    };

    const handleUpdatePost = async () => {
        try {
            const formData = new FormData();
            formData.append('content', updatePost.content);
            updatePost.media_link.forEach((file) => {
                if (file instanceof File) {
                    formData.append('media_link', file); // Append files to FormData
                } else {
                    formData.append('media_link', file); // Append URLs as needed
                }
            });

            const response = await updatePostData(id, formData); // Ensure your API can handle FormData
            console.log('Post updated successfully:', response);
            if (onUpdate) onUpdate(response);
        } catch (error) {
            console.error('Failed to update post:', error);
        }
    };


    const handleUpdatePostClick = (e) => {
        e.preventDefault();
        handleUpdatePost();
    };

    return loading ? (
        <div>Loading post...</div>
    ) : (
        <div className="card w-100 shadow-xss rounded-xxl border-0 ps-4 pt-4 pe-4 pb-3 mb-3">
            <div className="card-body p-0">
                <button
                    className="font-xssss fw-600 card-body p-0 d-flex align-items-center"
                    onClick={handleUpdatePostClick}
                    style={{
                        color: updatePost.content.trim().length === 0 && updatePost.media_link.length === 0 ? 'lightgrey' : 'black',
                        border: 'inherit',
                        background: 'inherit'
                    }}
                    disabled={updatePost.content.trim().length === 0 && updatePost.media_link.length === 0}
                >
                    <i
                        className={`btn-round-sm font-xs feather-edit-3 me-2 bg-greylight`}
                        style={{
                            color: updatePost.content.trim().length === 0 && updatePost.media_link.length === 0 ? 'lightgrey' : 'black',
                        }}
                    ></i>
                    Update Post
                </button>
            </div>

            <form onSubmit={handleUpdatePostClick} className="card-body p-0 mt-3 position-relative">
                <textarea
                    name="content"
                    value={updatePost.content}
                    onChange={handleChange}
                    className="h100 bor-0 w-100 rounded-xxl p-2 ps-5 font-xssss text-grey-500 fw-500 border-light-md theme-dark-bg"
                    cols="30"
                    rows="10"
                    placeholder="What's on your mind?"
                ></textarea>

                {/* Display selected images and videos */}
                {Array.isArray(updatePost.media_link) && updatePost.media_link.length > 0 && (
                    <div className="media-preview mt-3">
                        <div
                            className="image-grid"
                            style={{
                                display: 'grid',
                                gridTemplateColumns: updatePost.media_link.length === 2 ? 'repeat(2, 1fr)' :
                                    updatePost.media_link.length === 3 ? 'repeat(3, 1fr)' :
                                        updatePost.media_link.length === 4 ? 'repeat(2, 1fr)' :
                                            'repeat(3, 1fr)',
                                gap: '10px',
                            }}
                        >
                            {updatePost.media_link.slice(0, 5).map((file, index) => (
                                <div key={index} className="media-item position-relative">
                                    {typeof file === 'string' ? (
                                        <img
                                            src={file}
                                            alt="media"
                                            className="w-100 rounded-xxl"
                                            style={{ height: '150px', objectFit: 'cover' }}
                                        />
                                    ) : (
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt="preview"
                                            className="w-100 rounded-xxl"
                                            style={{ height: '150px', objectFit: 'cover' }}
                                        />
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
                                            style={{ width: '30px', height: '30px' }}
                                        >
                                            <i className="feather-x text-white"></i>
                                        </div>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </form>

            <div className="card-body d-flex p-0 mt-0">
                <div className="d-flex" style={{ cursor: 'pointer' }}>
                    <label htmlFor="file-upload" className="d-flex align-items-center font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4" style={{ cursor: 'pointer' }}>
                        <i className="font-md text-success feather-image me-2"></i>
                        <span className="d-none-xs">Photo/Video</span>
                    </label>
                    <input
                        id="file-upload"
                        type="file"
                        multiple
                        accept="image/*,video/*"
                        style={{ display: 'none' }}
                        onChange={handleMediaChange}
                    />
                </div>
            </div>
        </div>
    );
};
