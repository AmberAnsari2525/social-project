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
export const profile = async (userData) => {
    try {
        const response = await axiosinstance.post("auth/protected", userData);
        if (response.data.token) {
            setToken(response.data.token);
        }
        return response.data;
    } catch (error) {
        console.error("profile error", error);
        throw error;
    }
};

export const fetchUserData = async () => {
    try {
        const response = await axiosinstance.get("auth/profile");
        return response.data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
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

export const gettingPostByID = async (userId ) => {
    if (!userId ) {
        console.error("User ID is undefined");
        throw new Error("User ID is not fecth");
    }

    try {
        const response = await axiosinstance.get(`user/${userId }/posts`);
        console.log(`Fetched posts for user by Id ${userId }`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            console.error("Error fetching posts:", error.message);
        }
        throw error;
    }
};


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
export const sharePosts = async (sharepost) => {
    try {
        const response = await axiosinstance.post(`/posts/${sharepost.post_id}/shares`, {user_id: sharepost.user_id});
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error(error.message);
    }
};

//get comment post by id

export const getCommentsById = async (post_id) => {
    try {
        const response = await axiosinstance.get(`posts/${post_id}/comments`);
        return response.data;
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
//add friend
export const addFriend = async () => {
    try {
        const response = await axiosinstance.post('friends'); // No need for 'data' here as it is a GET request
        return response.data; // Assuming the response contains the friends data directly
    } catch (error) {
        console.error("Error fetching all friends:", error);
        throw error; // Rethrow error for handling in the component
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
export const getEngagements = async () => {
    try {
        const response = await axiosinstance.get('engagements');
        return response.data;
    } catch (error) {
        console.error("Error fetching engagements:", error.response ? error.response.data : error.message);
        throw error;
    }
};