import Header from "./components/Header";
import './App.css';
import Footer from "./components/Footer";
import Main from "./components/Main";
import { postContext } from "./contexts/postContext";
import { useState } from "react";
import Recruit from "./Pages/Recruit";

const post = [
  {
    id: 0,
    title: "",
    pay: 1000000,
    date: "",
    time: 5,
    company:"",
  },{
    
  }
]




const App = () => {
  const [posts, setPosts] = useState(post)

  return (
    <postContext.Provider value={{posts,setPosts}}>
      <div className="px-15 py-5">
        <Header />
        {/* <Main /> */}
        <Recruit/>
        <Footer />
      </div>
    </postContext.Provider>
  )

}

export default App;