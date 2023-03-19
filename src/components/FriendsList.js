import { Link } from 'react-router-dom';
import { useAuth } from '../hooks'
import styles from '../styles/home.module.css'

const FriendsList=()=>{
    const auth = useAuth();
    const { friends=[]}= auth.user;
    return (
        <div className={styles.friendsList}>
          <div className={styles.header}>Friends</div>

          {friends && friends.length === 0 && <div className={styles.noFriends}>No friends found!!</div>}

          {friends && friends.map(friend =><div key={`friend-${friend._id}`}>
            <Link className={styles.friendsItem} to={`/user/${friend._id}`}>
                <div className={styles.friendsImg}>
                   <img src='https://i2.wp.com/techynickk.com/wp-content/uploads/2021/09/Free-Avatar-Creator-Apps-for-Android-and-iOS.jpg?fit=1280%2C720&ssl=1' alt=''/>
                </div>
                <div className={styles.friendsName}>{friend.to_user.email}</div>
            </Link>
          </div>
          )}
        </div>
    )

}

export default FriendsList;