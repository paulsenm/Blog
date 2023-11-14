import { useEffect, useContext } from "react";

import PostsContext from "./context/PostsContext";


function App(){
    const {fetchAllPosts} = useContext(PostsContext);
    const {fetchAllCategories} = useContext(PostsContext);
    const {fetchPostsByUserId} = useContext(PostsContext);

    useEffect(() => {
        fetchAllPosts();
        fetchAllCategories();
        fetchPostsByUserId();
    }, []);
    return (
        <div>
            App div
        </div>
    )
}

export default App;