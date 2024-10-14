import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { gettingPostById } from '../Services/api'; // Assuming you have an API service for fetching a post by ID
import Spinner from 'react-bootstrap/Spinner';

const PostDetail = () => {
    const { postId } = useParams(); // Get postId from URL parameters
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const fetchedPost = await gettingPostById(postId); // Fetch post data by ID
                setPost(fetchedPost);
            } catch (err) {
                setError('Failed to load post data. Please try again.');
                console.error('Error fetching post:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [postId]);

    if (loading) {
        return <Spinner animation="border" />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="post-detail">
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <img src={post.media_link} alt="Post media" />
            {/* Add other post details as necessary */}
        </div>
    );
};

export default PostDetail;
