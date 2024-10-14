import axiosinstance from "./AxiosInstance";
import {setToken} from "./Auth";


//Regsiteration user

export const registerUser = async (userData) => {
    try {
        const response = await axiosinstance.post('auth/register', userData)
        if (response.data.token) {
            setToken(response.data.token);
        }
        return response.data;
    } catch (error) {
        console.error(" Registartion Error", error);
        throw error;
    }
};
//Login Api
export const Loginuser = async (userData) => {
    try {
        const response = await axiosinstance.post("auth/login", userData);
        if (response.data.token) {
            setToken(response.data.token);
        }
        return response.data;

    } catch (error) {
        console.error(" Login Error", error);
        throw error;
    }
};

//user profile


export const fetchUserData = async () => {
    try {
        const response = await axiosinstance.get("auth/profile");
        return response.data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
};


//update profile
export const updateProfile = async (userData) => {
    try {
        const response = await axiosinstance.put('auth/update', userData);
        return response.data; // return updated profile data
    } catch (error) {
        console.error('Error updating profile:', error.response ? error.response.data : error.message);
        throw error; // rethrow error to handle it in the UI if needed
    }
};
//update
export const updateUserData = async (data) => {
    try {
        const response = await axiosinstance.post("user/update", data);
        return response.data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
};
export const getProduct = async (data) => {
    try {
        const response = await axiosinstance.get('products', data)
        return response.data
    } catch (error) {
        console.error("product lit error", error)
        throw error;
    }

}

//getting product
export const getSingleProduct = async (id) => {
    try {
        const response = await axiosinstance.get("products/" + id);
        return response.data;
    } catch (error) {
        console.error("Product list error", error);
        throw error;
    }
};
// add post
export const addPost = async (postData) => {
    try {
        const response = await axiosinstance.post('posts', postData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Ensure correct Content-Type for file uploads
            },
        });
        console.log('API call successful:', response); // Additional log
        return response;
    } catch (error) {
        console.error('Error post create:', error);
        throw error;
    }
};

// Edit post
export const updatePostData = async (postId, updatedData) => {
    try {
        const response = await axiosinstance.put(`posts/${postId}`, updatedData);
        console.log('Post edited:', response);
        return response;
    } catch (error) {
        console.error('Error editing post:', error);
        throw error;
    }
};
// Function to get a post by its ID
export const getPostById = async (postId) => {
    try {
        const response = await axiosinstance.get(`/posts/${postId}`);

        console.log('Post retrieved:', response.data);
        return response.data; // Return the retrieved post data
    } catch (error) {
        console.error('Error retrieving post:', error);
        throw error; // Propagate the error
    }
};

//delete post
export const deletePost = async (id) => {
    try {
        const response = await axiosinstance.delete(`posts/${id}`);
        console.log('Post deleted:', response);
        return response;
    } catch (error) {
        console.error('Error deleting post:', error);
        throw error;
    }
};



//gettingPost API
export const gettingPost = async () => {
    try {
        const response = await axiosinstance.get('posts');
        return response.data;
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw error;
    }
};

//get post by id
export const userGetPost = async (id) => {
    try {
        const response = await axiosinstance.get(`user/${id}/posts`); // Use the user ID in the URL
        return response.data; // Return the response data
    } catch (error) {
        console.error("Error fetching user posts by ID:", error);
        throw error;
    }
};
//get user by id
export const fetchUserId = async (id) => {
    try {
        const response = await axiosinstance.get(`auth/users/${id}/profile`); // Use the user ID in the URL
        return response.data;
    } catch (error) {
        console.error("Error fetching user data by ID:", error);
        throw error;
    }
};

// delete post

// order detail API
export const getOrderDetail = async (id) => {
    try {
        const response = await axiosinstance.get(`orders/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching order detail:", error);
        throw error;
    }
};

//confirm order
export const confirmOrder = async (orderdata) => {
    try {
        const response = await axiosinstance.get('orders', orderdata);
        return response.data;
    } catch (error) {
        console.error("Error fetching orders list:", error);
        throw error;
    }
}

/*share api*/
export const sharePosts = async (post_id) => {
    try {
        const response = await axiosinstance.post(`/shares/${post_id}`);
        return response.data;  // Ensure backend returns { shareableLink: "..."}
    } catch (error) {
        throw error.response ? error.response.data : new Error(error.message);
    }
};

//get comment post by id
export const getCommentsById = async (post_id) => {
    try {
        const response = await axiosinstance.get(`posts/${post_id}/comments`);
        return response.data; // Ensure this is an array of comments
    } catch (error) {
        throw error.response ? error.response.data : new Error(error.message);
    }
};


// Add a new comment
export const addComment = async (post_id, comment) => {
    try {
        const response = await axiosinstance.post(`/posts/${post_id}/comments`, {comment});
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error(error.message);
    }
};

// Like post API
export const likePost = async (postId) => {
    try {
        console.log(`Liking post with ID: ${postId}`);  // Debug log
        const response = await axiosinstance.post(`/posts/${postId}/likes`);
        console.log('Response from likePost:', response.data);  // Debug log
        return response.data;  // Ensure it returns the like object
    } catch (error) {
        console.error('Error in likePost API:', error);
        throw error.response ? error.response.data : new Error(error.message);
    }
};

export const deleteLike = async (id) => {
    try {
        console.log(`Deleting like with ID: ${id}`); // Debug log
        const response = await axiosinstance.delete(`/likes/${id}`);
        console.log('Response from deleteLike:', response.data); // Debug log
        return response.data;
    } catch (error) {
        console.error('Error in deleteLike API:', error);
        throw error.response ? error.response.data : new Error(error.message);
    }
};





// Get likes by post ID
export const getLikesByPostId = async (post_id) => {
    const response = await  axiosinstance.get(`/posts/${post_id}/likes`);
    if (!response.ok) {
        throw new Error(`Error fetching likes for post with ID: ${post_id} - Status: ${response.status}`);
    }
    return response.json(); // Parse the response as JSON
};





// Update an existing comment
export const updateComment = async (commentId, data) => {
    try {
        const response = await axiosinstance.put(`comments/${commentId}`, data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error(error.message);
    }
};


// Delete a comment
export const deleteComment = async (commentId) => {
    try {
        const response = await axiosinstance.delete(`comments/${commentId}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error(error.message);
    }
};

export const getUser = async () => {
    try {
        const response = await axiosinstance.get("auth/users");
        return response.data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
};


export const getEngagements = async () => {
    try {
        const response = await axiosinstance.get('engagements');
        return response.data;
    } catch (error) {
        console.error("Error fetching engagements:", error.response ? error.response.data : error.message);
        throw error;
    }
};



//add friend
export const addFriend = async (receiverId) => {
    try {
        // Use the correct URL with the receiverId
        const response = await axiosinstance.post(`add/${receiverId}`);
        return response.data;  // Return the response data
    } catch (error) {
        if (error.response) {
            console.error("Error response:", error.response.data);  // Log the API error response
        } else {
            console.error("Error adding friend:", error);  // Log the error
        }
        throw error;  // Rethrow the error for handling in the component
    }
};
//accept friend
export const acceptFriend = async (id) => {
    try {
        const response = await axiosinstance.put(`friend-requests/${id}/accept`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to accept friend request with ID ${id}: ${error.message}`);
    }
};

//Get all friends
export const getFriend = async () => {
    try {
        const response = await axiosinstance.get('friends'); // No need for 'data' here as it is a GET request
        return response.data; // Assuming the response contains the friends data directly
    } catch (error) {
        console.error("Error fetching all friends:", error);
        throw error; // Rethrow error for handling in the component
    }
};

// API call to accept friend request
export const acceptFriendRequest = async (id) => {
    try {
        const response = await axiosinstance.put(`friend-requests/${id}/accept`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to accept friend request with ID ${id}: ${error.message}`);
    }
};
export const rejectFriend = async (id) => {
    try {
        const response = await axiosinstance.put(`friends/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to delete friend with ID ${id}: ${error.message}`);
    }
};
// API call to delete friend request
export const deleteFriend = async (id) => {
    try {
        const response = await axiosinstance.delete(`friends/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to delete friend with ID ${id}: ${error.message}`);
    }
};
//get notification
export const getNotifications = async () => {
    try {
        const response = await axiosinstance.get('notifications');
        return response.data;  // Adjust based on API response
    } catch (error) {
        console.error('Error fetching notifications:', error);
        throw error;
    }
};