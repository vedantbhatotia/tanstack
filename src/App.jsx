import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import PostsRQ from './components/postrq';
import Home from './components/home';
import PostDetails from './components/postdetails';
import PostTraditional from './components/postTraditrional';
import PaginatedQueries from './components/paginatedqueries';
function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/posts">Traditional Posts</Link>
            </li>
            <li>
              <Link to="/rq-posts">RQ Posts</Link>
            </li>
            <li>
              <Link to="/fruits">Fruits</Link>
              </li>
          </ul>
        </nav>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path = '/fruits' element={<PaginatedQueries/>} />
          <Route exact path='/posts' element={<PostTraditional/>} />
          <Route exact path='/rq-posts' element={<PostsRQ />} />
          <Route path="/rq-posts/:id" element={<PostDetails/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;