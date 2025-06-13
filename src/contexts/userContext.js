import { createContext } from "react";

const userContext = createContext();


const initialUsers = [
  {
    id:"admin",
    password:"1234",
    email:"abc@google.com",
    wishlist: [1,2,3]
  },
  {
    id:"asd",
    password:"123",
    email:"asd@naver.com",
    wishlist: [4,5,6]
  }
]

export {userContext,initialUsers}