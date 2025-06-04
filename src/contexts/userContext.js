import { createContext } from "react";

const userContext = createContext();


const initialUsers = [
  {
    id:"admin",
    password:"1234",
    email:"abc@google.com"
  },
  {
    id:"asd",
    password:"123",
    email:"asd@naver.com"
  }
]

export {userContext,initialUsers}