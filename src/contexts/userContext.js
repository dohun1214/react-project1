import { createContext } from "react";

const userContext = createContext();


const initialUsers = [
  {
    id:"admin",
    password:"1234",
    email:"abc@google.com",
    wishlist: ["dd", "ee", "ff"]
  },
  {
    id:"asd",
    password:"123",
    email:"asd@naver.com",
    wishlist: ["aa", "bb", "cc"]
  }
]

export {userContext,initialUsers}