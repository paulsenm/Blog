import { createContext, useId, useState } from "react";
import axios from 'axios';

const PostsContext = createContext();

function Provider( { children } ){
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [userPosts, setUserPosts] = useState([]);
    //const baseURL = "http://localhost:5000/";
    const baseURL = process.env.REACT_APP_SERVER_URL;

    const fetchAllPosts = async () => {
        const postsDataContainer = await axios.get(baseURL + "posts");
        //console.log("Posts container was: ", postsDataContainer);
        const posts = postsDataContainer.data;
        //console.log("First book was: ", posts[0]);
        setPosts(posts);
    }

    const fetchAllCategories = async () => {
        const categoriesDataContainer = await axios.get(baseURL + "categories");
        //console.log("categories data was", categoriesDataContainer);
        setCategories(categoriesDataContainer.data);
    }
    
    const fetchPostsByUserId = async (userId) => {
        //useId = 1;
        const userSearchString = "posts?userId=" + useId;
        const postsDataContainer = await axios.get(baseURL + userSearchString);
        //console.log("Search posts by user container: ", postsDataContainer);
        const userPosts = postsDataContainer.data;
        console.log("Posts: ", userPosts);
    }

    const deletePostById = async (postId) => {
        const deleteURL = "posts?postId=";
        const deletePostRequest = await axios.delete(baseURL + deleteURL);
        console.log("Delete request got: ", deletePostRequest);
    }






    const valuesToShare = {
        fetchAllPosts,
        fetchAllCategories,
        fetchPostsByUserId
    }

    return (
        <PostsContext.Provider value={valuesToShare}>
            { children }
        </PostsContext.Provider>
    )
}

export { Provider };
export default PostsContext;