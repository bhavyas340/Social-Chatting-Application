import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { searchUser } from '../api';
import { useAuth } from '../hooks';
import styles from '../styles/navbar.module.css'
 
const Navbar =()=>{
  const [results, setResults] = useState([]);
  const [searchText, setSearchText] = useState('');
  const auth = useAuth();

  useEffect(()=>{
    const fetchUsers= async ()=>{
      const response = await searchUser(searchText);

      if(response.success){
        setResults(response.data.users);

      }
    }
    if(searchText.length >2){
      fetchUsers();
    }else{
      setResults([]);
    }
  }, [searchText])

    return (
      <div className={styles.nav}>
        <div className={styles.leftDiv}>
          <Link to="/">
            <img className={styles.logoIcon} alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAABHBJREFUeF7t2GWobVUUBeDv2R2Y2PXDwg7kYaAYWCioiC2KiWK3otiNKBaoGH9ExcZ4zxZFxS4UUbFbUFExUMZjHdhs7r376MPre+es9ecezp57rTXHHGPMee4EQ74mDHn+KgCVAUOOQJXAkBOgmmCVQJXAkCNQJTDkBKhdoEqgSmDIEagSGHIC1C5QJVAlMOQIVAmMQYCZcArWwvajxC2Fj6ZnEo3FgEtxBM7Eaf8CgLmwE9ZHPn+IO/DKOAK2CT7Be6OdORoAM+MHPIJd8PM/BGBL3IhFyrs/YaGyx3U4BL+PAxB/4XIc3gXAHNgHq+NtPI11sSBWxQe4Hu+2NhpJApvhgYL8YXgQf2JxnIvPcfw4JJ8j+gJgHjxZkh/rXr9gHbzVCGoDMAveQQCNd3w6TomOdkxfAFyAY/u46IU4roMBW+P+UuHs28+KDHfEBvgR9+GlxoszFhmGkd/gbrzZeB7Q98BqeB2vFvBvwG8NCcyAXQuzPysS/SqHv49lO24aD4iG217QZsCJOKcY3/ONPXfDkq0zIrPncC+2wheYs7AnBYkJz45JmFjYNB/iTwchCc6Lx7EGPi6e80fZI8yOj8UDjiyy3LzkuyjiSxMDwK+YtQOA6HaxEWLaAJyEs7EeXmjEP4GNWu+fj69xEY4qCUc6tyImuiZ2R0DdGzeVhO8pUlwRJxQwdihALlH8a2k0AXgD15TY/I1PPYTJAeBLLNwHV5NsUG6uNgDbloscg4sbgXMjc0VWLv4MjkYuHvY12ZHEI4EYZRJPRWPOvbVp6U7746xi2vmut/LeeS0Awt6AenDpQBsiRbkyAERz2/QBQFpitBqd9lYbgDApnSK6TCKhdXsFmFQ8SV1VmNWU4CpIxU7GXoWqMd/eyuVj2pFBAHixSKj3PHS/pAVAKL9zkcTNSbxn5gFg39Li+sDALdhzDADyKEjHCOMtQfzR0o6i30yWueBtxZAyYJ1R9szeYUnmh5hVZBQA0kq3K3sG4NuxBQJU3k/sxngW8xcJrNwCIJ3pChyIa5nyb4AAPCkfZis0WqYDgbSUmFEOGo0Bve9z4cwNmSO+L1VMFWJgd5WEY0JJKFRMsnHvBYocUtlTSxKRy0p4ubAl+0RiqXKkGyPNjJEJc7nyTs5pekAYFzMNUGFMirFC/Kc3CUZDMYWeTkfComcizWdj/RaIQ6c6aW8ZheMfMbDHWpvnstFzrw0GoFy2t1KgVC4gfVvY81TjeRI9tLTB10pyadd5L90k3ehhpJ0egIzHkfGdYVVzFE4vvay0m7So70o7W7vQb7/SV/sFoB9JTW1M7pZ7xfh63jQZy/fR2qecPbU/h//vX4Pp6xm7I58MSGFJDD0dJhLpXNM7AEkwQ9TpxRQjsww+Vxfj/c8B6DxgWg+YWgZM6/l13q8C0AnRgAdUBgx4gTvTqwzohGjAAyoDBrzAnelVBnRCNOABlQEDXuDO9CoDOiEa8IDKgAEvcGd6lQGdEA14QGXAgBe4M73KgE6IBjzgb25+5DSqt6smAAAAAElFTkSuQmCC" />
          </Link>
        </div>
        <div className={styles.searchContainer}>
          <img className={styles.searchIcon} src='https://www.apple.com/v/app-store/b/images/overview/icon_search__d0w979yulru6_large_2x.png'/>
          <input placeholder='Search users' value={searchText} onChange={(e)=>setSearchText(e.target.value)}/>
          {results.length>0 && <div className={styles.searchResults}>
            <ul>
              {results.map(user=><li className={styles.searchResultsRow} key={`user-${user._id}`}>

                <Link to={`/user/${user._id}`}>
                  <img src='https://i.pinimg.com/originals/e5/63/46/e56346cf2916063035418d1ee9a7c5ad.png' alt=''/>
                  <span>{user.name}</span>
                </Link>
              </li>)}
            </ul>
          </div>}
        </div>
        <div className={styles.rightNav}>
          {auth.user && <div className={styles.user}>
            <Link to="/settings">
              <img alt="" src="https://i.pinimg.com/originals/e5/63/46/e56346cf2916063035418d1ee9a7c5ad.png" className={styles.userDp} />
            </Link>
            <span>{auth.user.name}</span>
          </div>}
          <div className={styles.navLinks}>
            <ul>
              {auth.user? (
                <>
                  <li onClick={auth.logout}> Log Out</li>
                </>):(
                <>
                  <li>
                   <Link to="/login">Log In</Link>
                  </li>
                
                  <li>
                    <Link to="/register">Register</Link>
                  </li>
                </>)
              }
              
            </ul>
          </div>
        </div>
      </div>
    );

}

export default Navbar;