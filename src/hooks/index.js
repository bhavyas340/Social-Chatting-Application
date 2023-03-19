import { useContext, useEffect, useState } from "react";
import jwt from 'jwt-decode';
import { AuthContext , PostsContext } from "../providers";
import { editProfile, fetchUserFriends, login as userLogin, register, getPosts} from "../api";
import { setItemInLocalStorage, LOCALSTORAGE_TOKEN_KEY, removeItemFromLocalStorage, getItemFromLocalStorage } from "../utils";

export const useAuth = ()=>{
    return useContext(AuthContext);
};

export const useProvideAuth = ()=>{
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const getUser =  async()=>{
            const userToken = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);

            if(userToken){
                const user = jwt(userToken);
                const response =await fetchUserFriends();

                let friends  =[];
                if(response.success){
                    friends= response.data.friends
                }
                setUser({
                    ...user,
                    friends
                })
            }
            setLoading(false);
        }
        getUser();
    },[]);

    const updateUser= async (userId, name, password, confirmPassword)=>{
        const response = await editProfile(userId, name, password, confirmPassword);

        console.log("response",response);
        if(response.success){
            setUser(response.data.user)
            // setUser(response.data.user);
            setItemInLocalStorage(LOCALSTORAGE_TOKEN_KEY, response.data.token ?response.data.token: null)
            return {
                success: true,
            };
        }else{
            return{
                success:false,
                message:response.message
            }
        }

    }
    const login = async (email, password) =>{
        // console.log("I am Hooks");
        const response = await userLogin(email, password);

        if(response.success){
            setUser(response.data.user);
            setItemInLocalStorage(LOCALSTORAGE_TOKEN_KEY, response.data.token ?response.data.token: null)
            return {
                success: true,
            };
        }else{
            return{
                success:false,
                message:response.message
            }
        }
    }
    const signup = async (name, email, password, confirmPassword) => {
        const response = await register(name, email, password, confirmPassword);
    
        if (response.success) {
          return {
            success: true,
          };
        } else {
          return {
            success: false,
            message: response.message,
          };
        }
      };

    const logout = () =>{
        setUser(null);
        removeItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY)
    };

    const updateUserFriends = (addFriend, friend) => {
    console.log("friend", friend);
    if (addFriend) {
      setUser({
        ...user,
        friends: [...user.friends, friend],
      });
      return;
    } else {
      console.log("Am here");

      const newFriend = user.friends.filter(
        (f) => f.to_user._id !== friend.to_user._id
      );

      console.log(newFriend);
      setUser({
        ...user,
        friends: newFriend,
      });
    }
  };
    
    return{
        user, 
        login,
        logout,
        signup,
        loading,
        updateUser,
        updateUserFriends,
    }
    
}

//   ********** Posts provides***************/////

export const usePosts = ()=>{
  return useContext(PostsContext);
};

export const useProvidePosts = ()=>{
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{

    const fatchPosts = async ()=>{
      const response = await getPosts();
      // console.log('response',response);

      if(response.success){
        setPosts(response.data.posts)
      }
      setLoading(false);
    }

    fatchPosts();
  },[]);
  
  const addPostsToState =(post)=>{
    const newPosts = [post, ...posts];
    setPosts(newPosts);

  }

  const addComment = (comment, postId)=>{
    const newPosts = posts.map((post)=>{
      if(post._id === postId){

      return { ...post, comments:[...post.comments, comment]}
    }
      return post;
    })
    setPosts(newPosts);
  }

  return {
    data: posts,
    loading,
    addPostsToState,
    addComment
  }
}