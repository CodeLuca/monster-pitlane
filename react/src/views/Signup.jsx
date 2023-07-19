import { Link } from "react-router-dom";
import { createRef, useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../context/ContextProvider.jsx";

export default function Signup() {
  const nameRef = createRef()
  const emailRef = createRef()
  const passwordRef = createRef()
  const passwordConfirmationRef = createRef()
  const { setUser, setToken } = useStateContext()
  const [errors, setErrors] = useState(null)

  const onSubmit = ev => {
    ev.preventDefault()

    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    }
    axiosClient.post('/signup', payload)
      .then(({ data }) => {
        setUser(data.user)
        setToken(data.token);
      })
      .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors)
        }
      })
  }

  return (

    <div className="w-full flex flex-col justify-center items-center" style={{ minHeight: '100vh' }}>
      <img src="/Logo.png" alt="Logo" className="max-w-xs p-5" />
      <div className="w-full max-w-md">
        <form className="bg-black shadow-md px-8 pt-6 pb-8 mb-4" onSubmit={onSubmit}>
          <h1 className="text-5xl py-5 green-gradient-text font-bold">REGISTER</h1>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">
              NAME
            </label>
            <input ref={nameRef} placeholder="NAME" className="uppercase shadow appearance-none border w-full px-3" type="text" />
          </div>
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
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2">
              CONFIRM PASSWORD
            </label>
            <input ref={passwordConfirmationRef} placeholder="PASSWORD" className="uppercase shadow appearance-none border w-full px-3" type="password" />
          </div>
          <div className="mb-4">
            {errors &&
              <div className="alert">
                {Object.keys(errors).map(key => (
                  <p key={key}>{errors[key][0]}</p>
                ))}
              </div>
            }
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-lime-600 hover:bg-lime-700 font-semibold py-2 px-4 w-full text-xl focus:outline-none focus:shadow-outline" type="submit">
              SIGN UP
            </button>
            {/* {JSON.stringify(video)} */}
          </div>
        </form>
        <div className="text-center text-xl pt-2">
          <Link to="/login" className="text-gray-500 hover:text-white">
            I ALREADY HAVE AN ACCOUNT, LOGIN
          </Link>
        </div>
      </div>
    </div>
  )
}
