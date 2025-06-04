import { useReducer, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import Recruit from './Pages/Recruit';
import Login from './Pages/Login';
import Register from './Pages/Register';
import { initialPosts, postContext } from './contexts/postContext';
import { initialUsers, userContext } from './contexts/userContext'
import './App.css';
import Mypage from './Pages/Mypage';
import CommunityBoard from './Pages/CommunityBoard';
import { loginContext } from './contexts/loginContext';
import Notfound from './Pages/Notfound';

const userReducer = (users, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return [...users, action.payload]

    case 'DELETE_USER':
      return users.filter(user => user.id != action.payload);

    case 'UPDATE_USER':
      return users.map(user =>
        user.id === action.payload.id ? { ...user, ...action.payload } : user
      );
  }

}


function App() {

  const [posts, setPosts] = useState(initialPosts);
  const [users, userDispatch] = useReducer(userReducer, initialUsers)
  const [isLogin, setIsLogin] = useState(false)


  return (
    <>
      <loginContext.Provider value={{ isLogin, setIsLogin }}>
        <postContext.Provider value={{ posts, setPosts }}>
          <userContext.Provider value={{ users, userDispatch }}>

            {/* 테스트용 코드 */}
            <button onClick={() => {
              const user = users.map(user => user)
              console.log(user)
            }}>user</button>
            <button onClick={() => { console.log(isLogin) }}>로그인 상태</button>

            <Header />

            <Routes>
              <Route path='/' element={<Main />} />
              <Route path='/recruit' element={<Recruit />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/mypage' element={isLogin ? <Mypage /> : <Login />} />
              <Route path='/community' element={<CommunityBoard />} />
              <Route path='*' element={<Notfound/>}/>
            </Routes>

            <Footer />

          </userContext.Provider>
        </postContext.Provider>
      </loginContext.Provider>

    </>


  );
}

export default App;
