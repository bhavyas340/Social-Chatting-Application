import { useState } from 'react'
import styles from '../styles/home.module.css';
import { useToasts } from 'react-toast-notifications';

import { addPost } from '../api';
import { usePosts } from '../hooks';

const CreatePost =()=>{
    const [post ,setPost]= useState('');
    const [addingPost, setAddingPost] = useState(false);
    const {addToast} = useToasts()
    const posts = usePosts();

    const handleAddPostClick= async ()=>{
        setAddingPost(true);
        //do some checks


        const response= await addPost(post);
        if(response.success){
            setPost('');
            posts.addPostsToState(response.data.post)
            addToast('Post Created Successfully',{
                appearance:'success'
            })
        }else{
            addToast(response.message,{
                appearance: 'error'
            })
        }

        setAddingPost(false);
    }

    return <div className={styles.createPost}>
        <textarea className={styles.addPost} onChange={(e)=> setPost(e.target.value)}/>
        <div>
            <button className={styles.addPostBtn} onClick={handleAddPostClick} disabled={addingPost}>{addingPost ?"Adding Post...":"Add Post"}</button>
        </div>
    </div>

}

export default CreatePost;