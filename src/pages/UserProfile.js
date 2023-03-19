import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { addFriend, fetchUserProfile, removeFriend } from '../api';
import { Loader } from '../components';
import { useAuth } from '../hooks';
import style from '../styles/Settings.module.css';
 
const UserProfile= ()=>{
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [requestInProcess, setRequestInProgress] = useState(false);
  const { userId} = useParams();
  const { addToast} = useToasts();
  const {history} = useNavigate();
  const  auth  = useAuth();


  // console.log("userId",user);
    // const {user ={}} = location.state;     // to destructure we use {}
    useEffect(() => {
      const getUser = async () => {
        const response = await fetchUserProfile(userId);
  
        if (response.success) {
          setUser(response.data.user);
        } else {
          addToast(response.message, {
            appearance: 'error',
          });
          return history.push('/messageMe');
        }
  
        setLoading(false);
      };
  
      getUser();
    }, [userId, history, addToast]);
  
    if (loading) {
      return <Loader />;
    }

    const checkIfUserIsFriend =()=>{
      console.log('friends check',auth.user);
      const friends  = auth.user.friends;

      const friendIds = friends.map((friend) => friend.to_user._id);
      const index  = friendIds.indexOf(userId);

      if(index !== -1){
        return true;
      }
      return false;

    };

    const handleRemoveFriendClick = async ()=>{
      setRequestInProgress(true);
      console.log('you click on handel add');
  
      const response = await removeFriend(userId);
      console.log("response", response);
      if (response.success) {
        const friendship = auth.user.friends.filter(
          (friend) => friend.to_user._id === userId
          );
        console.log("friendship", friendship);
  
        auth.updateUserFriends(false, friendship[0]);
        addToast("Friend remove successfully", {
          appearance: "success",
        });
      } else {
        console.log("Error", response)
        addToast(response.message, {
          appearance: "error",
        });
      }
  
      setRequestInProgress(false);
    }

    
    const handleAddFriendClick = async () => {
      setRequestInProgress(true);
      console.log('you click on handel add');
  
      const response = await addFriend(userId);
      console.log("response", response);
      if (response.success) {
        const { friendship } = response.data;
        // console.log("frndship", friendship);
  
        auth.updateUserFriends(true, friendship);
        addToast("Friend added successfully", {
          appearance: "success",
        });
      } else {
        console.log("Error", response)
        addToast(response.message, {
          appearance: "error",
        });
      }
  
      setRequestInProgress(false);
    };



    
    return (
      <div className={style.settings}>
        <div className={style.imgContainer}>
          <img
            src="https://highxtar.com/wp-content/uploads/2020/07/highxtar-apple-new-emojis-2-1024x1024.png"
            alt=""
          />
        </div>

        <div className={style.field}>
          <div className={style.fieldLabel}>Email</div>
          <div className={style.fieldValue}>{user.email}</div>
        </div>

        <div className={style.field}>
          <div className={style.fieldLabel}>Name</div>
          <div className={style.fieldValue}>{user.name}</div>
          
        </div>


        <div className={style.btnGrp}>
        {checkIfUserIsFriend()?(
          <button className={`button ${style.saveBtn}`} onClick={handleRemoveFriendClick} disabled={requestInProcess}>{requestInProcess?'Removing friend..': 'Remove friend'}</button>
        ):(
          <button className={`button ${style.saveBtn}`} onClick={handleAddFriendClick} disabled={requestInProcess}>{requestInProcess?'Adding friend..': 'Add Friend'}</button>)}
        </div>
      </div>
    );
};

export default UserProfile;