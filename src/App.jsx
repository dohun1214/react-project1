import { useReducer, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header, Footer } from './components';
import {
  Main, Login, Register, Mypage, Notfound,
  CommunityBoard, CommunityNew, CommunityUpdate, CommunityDetail,
  RecruitBoard, RecruitNew, RecruitUpdate, RecruitDetail,
  UserEditPage,
  CustomerService,
  ForgotPassword,
  SearchResults, Quiz,ResumeManagement
} from './Pages';
import {
  jobPostContext, initialJobPosts,
  userContext, initialUsers,
  loginContext,
  communityContext, initialCommunityPosts
} from './contexts';
import { QuizProvider } from './contexts/QuizContext';




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
    case 'WISHLIST_ADD':
      return users.map(user => {
        if (user.id === action.payload.userId) {
          return {
            ...user,
            wishlist: [...user.wishlist, action.payload.postId]
          }
        }
        return user
      })
    case 'WISHLIST_DELETE':
      return users.map(user => {
        if (user.id === action.payload.userId) {
          return {
            ...user,
            wishlist: user.wishlist.filter(id => id !== action.payload.postId)
          }
        }
        return user;
      })
    case 'APPLY_JOB':
      return users.map(u => {
        if (u.id === action.payload.userId) {
          const apps = u.applications || [];
          return { ...u, applications: [...apps, action.payload.job] };
        }
        return u;
      });
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

  const [jobPosts, setJobPosts] = useState(initialJobPosts);
  const [users, userDispatch] = useReducer(userReducer, initialUsers)
  const [communityPosts, communityPostDispatch] = useReducer(communityPostReducer, initialCommunityPosts)
  const [isLogin, setIsLogin] = useState(() => {
    return sessionStorage.getItem("isLogin") === "true"
  })
  const [currentUser, setCurrentUser] = useState(() => {
    return sessionStorage.getItem("currentUser")
  })

  return (
    <>
      <QuizProvider>
        <communityContext.Provider value={{ communityPosts, communityPostDispatch }}>
          <loginContext.Provider value={{ isLogin, setIsLogin, currentUser, setCurrentUser }}>
            <jobPostContext.Provider value={{ jobPosts, setJobPosts }}>
              <userContext.Provider value={{ users, userDispatch }}>


                <Header />

                <Routes>
                  <Route path='/' element={<Main />} />
                  <Route path="/search" element={<SearchResults />} />
                  <Route path="/recruit" element={<RecruitBoard />} />
                  <Route path="/recruit/new" element={<RecruitNew />} />
                  <Route path="/recruit/edit/:id" element={<RecruitUpdate />} />
                  <Route path="/recruit/:id" element={<RecruitDetail />} />
                  <Route path='/login' element={<Login />} />
                  <Route path='/register' element={<Register />} />
                  <Route path='/forgot-password' element={<ForgotPassword />} />
                  <Route path='/mypage' element={isLogin ? <Mypage /> : <Login />} />
                  <Route path="/user/edit" element={isLogin ? <UserEditPage /> : <Login />} />
                  <Route path='/communityboard' element={<CommunityBoard />} />
                  <Route path="/communitynew" element={<CommunityNew />} />
                  <Route path="/edit/:id" element={<CommunityUpdate />} />
                  <Route path="/post/:id" element={<CommunityDetail />} />
                  <Route path="/resume" element={isLogin ? <ResumeManagement /> : <Login />} />
                  <Route path="/customer-service" element={<CustomerService />} />
                  <Route path='/quiz' element={<Quiz />} />
                  <Route path='*' element={<Notfound />} />
                </Routes>

                <Footer />

              </userContext.Provider>
            </jobPostContext.Provider>
          </loginContext.Provider>
        </communityContext.Provider>
      </QuizProvider>
    </>


  );
}

export default App;