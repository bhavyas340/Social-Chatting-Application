import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import React from 'react';

import { useAuth } from '../hooks';
import { Home, Login, Signup, Settings, UserProfile } from '../pages';
import { Loader, Navbar } from './';

//children is here Setings. coz v are pution it inside private fun
function PrivateRoute({ children }) {
  const auth = useAuth();
  return auth.user ? children : <Navigate to="/login" />;
}
const Page404 = () => {
  return (
    <h1>Page 404</h1>
    // alert.window("Error 404")
  );
};

function App() {
  const auth = useAuth();

  if (auth.loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home posts={[]} />}></Route>

          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Signup />}></Route>
          {/* <Route path="/settings" element={   <Settings/> }
          ></Route>         */}
          <Route exact path="/settings"element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          />
          <Route exact path="/user/:userId"element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<Page404 />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
