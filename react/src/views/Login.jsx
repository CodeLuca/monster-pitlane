import { Link } from "react-router-dom";
import axiosClient from "../axios-client.js";
import { createRef } from "react";
import { useStateContext } from "../context/ContextProvider.jsx";
import { useState } from "react";

export default function Login() {
  const emailRef = createRef()
  const passwordRef = createRef()
  const { setUser, setToken } = useStateContext()
  const [message, setMessage] = useState(null)

  const onSubmit = ev => {
    ev.preventDefault()

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }
    axiosClient.post('/login', payload)
      .then(({ data }) => {
        setUser(data.user)
        setToken(data.token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setMessage(response.data.message)
        }
      })
  }

  // return (
  //   <div className="login-signup-form animated fadeInDown">
  //     <div className="form">
  //       <form onSubmit={onSubmit}>
  //         <h1 className="title">LOGIN TO YOUR MONSTER ENERGY: PIT LANE</h1>

  //         {message &&
  //           <div className="alert">
  //             <p>{message}</p>
  //           </div>
  //         }

  //         <input ref={emailRef} type="email" placeholder="EMAIL" />
  //         <input ref={passwordRef} type="password" placeholder="PASSWORD" />
  //         <button className="btn w-full">LOGIN</button>
  //         <p className="message">Not registered? <Link to="/signup">Create an account</Link></p>
  //       </form>
  //     </div>
  //   </div>
  // );


  return (
    <div className="w-full flex flex-col justify-center items-center" style={{ minHeight: '100vh' }}>
      <img src="/logo.png" alt="Logo" className="max-w-xs p-5" />
      <div className="w-full max-w-md">
        <form className="bg-black shadow-md px-8 pt-6 pb-8 mb-4" onSubmit={onSubmit}>
          <h1 className="text-5xl py-5 green-gradient-text font-bold">LOGIN</h1>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">
              EMAIL
            </label>
            <input ref={emailRef} placeholder="EMAIL" className="uppercase shadow appearance-none border w-full px-3" type="text" />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2">
              PASSWORD
            </label>
            <input ref={passwordRef} placeholder="PASSWORD" className="uppercase shadow appearance-none border w-full px-3" type="password" />
          </div>
          <div className="mb-4">
            {message &&
              <div className="alert">
                <p>{message}</p>
              </div>
            }
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-lime-600 hover:bg-lime-700 font-semibold py-2 px-4 w-full text-xl focus:outline-none focus:shadow-outline" type="submit">
              LOGIN
            </button>
            {/* {JSON.stringify(video)} */}
          </div>
        </form>
        <div className="text-center text-xl pt-2">
          <Link to="/signup" className="text-gray-500 hover:text-white">
            CREATE AN ACCOUNT
          </Link>
        </div>
      </div>
    </div>
  )
}
