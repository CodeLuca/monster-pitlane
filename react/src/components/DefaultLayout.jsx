import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client.js";
import { useEffect } from "react";
import Sidebar from "./Sidebar";

export default function DefaultLayout() {
  const { user, token, setUser, setToken, notification } = useStateContext();

  if (!token) {
    return <Navigate to="/login" />
  }

  const onLogout = ev => {
    ev.preventDefault()

    axiosClient.post('/logout')
      .then(() => {
        setUser({})
        setToken(null)
      })
  }

  useEffect(() => {
    axiosClient.get('/user')
      .then(({ data }) => {
        setUser(data)
      })
  }, [])

  return (
    <div id="defaultLayout" className="bg-dark">

      {/* Sidebar */}
      <div className="hidden md:block">
        <Sidebar user={user} onLogout={onLogout} />
      </div>

      {/* Mobile Sidebar */}
      <div className="md:hidden">
        <div className="flex items-center justify-center w-16 h-screen bg-gray-800">
          <Sidebar />
        </div>
      </div>

      <div className="content">
        <main>
          <Outlet />
        </main>
        {notification &&
          <div className="notification">
            {notification}
          </div>
        }
      </div>
    </div >
  )
}
