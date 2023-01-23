import '../styles/App.css';
import {getPosts } from "../api"
import {useEffect} from "react"
import {Home} from '../pages';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
function App() {
  useEffect(()=>{
    const fetchPosts = async()=>{
      const response = await getPosts();
      console.log(response)
    };
    fetchPosts()
  },[])
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
