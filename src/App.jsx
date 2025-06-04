import { useReducer, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import Recruit from './Pages/Recruit';
import Login from './Pages/Login';
import Register from './Pages/Register';
import { initialPosts, jobPostContext } from './contexts/jobPostContext';
import { initialUsers, userContext } from './contexts/userContext'
import './App.css';
import Mypage from './Pages/Mypage';
import CommunityBoard from './Pages/CommunityBoard';
import { loginContext } from './contexts/loginContext';
import Notfound from './Pages/Notfound';
import { communityContext, initialCommunityPosts } from './contexts/communityContext';
import CommunityNew from './Pages/CommunityNew';
import CommunityUpdate from './Pages/CommunityUpdate';

const userReducer = (users, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return [...users, action.payload]

    case 'DELETE_USER':
      return users.filter(user => user.id !== action.payload);

    case 'UPDATE_USER':
      return users.map(user =>
        user.id === action.payload.id ? { ...user, ...action.payload } : user
      );
    default:
      return users
  }

}


const communityPostReducer = (posts, action) => {
  switch (action.type) {
    case 'ADD_POST':
      return [action.payload, ...posts];
    case 'UPDATE_POSTS':
      return action.payload;
    case 'DELETE_POSTS':
      return posts.filter(post => post.id !== action.payload);
    default:
      return posts;
  }
}


function App() {

  const [jobPosts, setJobPosts] = useState(initialPosts);
  const [users, userDispatch] = useReducer(userReducer, initialUsers)
  const [communityPosts, communityPostDispatch] = useReducer(communityPostReducer, initialCommunityPosts)
  const [isLogin, setIsLogin] = useState(false)

  return (
    <>
      <communityContext.Provider value={{ communityPosts, communityPostDispatch }}>
        <loginContext.Provider value={{ isLogin, setIsLogin }}>
          <jobPostContext.Provider value={{ jobPosts, setJobPosts }}>
            <userContext.Provider value={{ users, userDispatch }}>

              {/* 테스트용 코드 */}
              <button onClick={() => {
                console.log(users)
              }}>user</button>
              <button onClick={() => { console.log(isLogin) }}>로그인 상태</button>

              <Header />

              <Routes>
                <Route path='/' element={<Main />} />
                <Route path='/recruit' element={<Recruit />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/mypage' element={isLogin ? <Mypage /> : <Login />} />
                <Route path='/communityboard' element={<CommunityBoard />} />
                <Route path="/communitynew" element={<CommunityNew />} />
                <Route path="/edit/:id" element={<CommunityUpdate />} />
                <Route path='*' element={<Notfound />} />
              </Routes>

              <Footer />

            </userContext.Provider>
          </jobPostContext.Provider>
        </loginContext.Provider>
      </communityContext.Provider>

    </>


  );
}

export default App;
