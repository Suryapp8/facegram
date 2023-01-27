import '../styles/App.css';
import {getPosts } from "../api"
import {useEffect, useState} from "react"
import {Home, Login, Logout, Settings, UserProfile} from '../pages';
import {Loader, Navbar } from "./"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { useAuth } from '../hooks';
import Register from '../pages/Register';
import { Navigate } from 'react-router-dom';


function PrivateRoute({ children }) {
  const auth = useAuth();
  return auth.user ? children : <Navigate to="/login" />;
}

function App() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const auth = useAuth()

  useEffect(()=>{
    const fetchPosts = async()=>{
      const response = await getPosts();
      console.log(response)
      if(response.success){
        setPosts(response.data.posts)
      }
      setLoading(false)
      
    };
    fetchPosts()
  },[])

  if(auth.loading){
    return <Loader />
  }
  return (
    <div className="App">
      

      <Router>
      <Navbar />
        <Routes>
          <Route exact path="/" element={<Home posts={posts} />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/logout" element={<Logout />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/settings"
          element={<PrivateRoute> <Settings /> </PrivateRoute>} />
        <Route exact path="/user/:userId"
          element={<PrivateRoute> <UserProfile /> </PrivateRoute>} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
