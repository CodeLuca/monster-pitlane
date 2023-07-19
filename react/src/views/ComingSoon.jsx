import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../context/ContextProvider.jsx";
import ReactPlayer from 'react-player'
import dayjs from 'dayjs'

export default function VideoForm() {
  return (
    <div>
      {/* <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
        {video.id && <h1>{video.title}</h1>}
        <Link className="btn-add" to={"/videos"}>Go Back</Link>
      </div> */}
      <div className="card animated fadeInDown">
        <div className="flex">
          <div className="featured-content-video lg:w-1/6">

          </div>
          <div className="featured-content-video lg:w-2/3">
            <div className="featured-content-info mt-7 flex flex-col justify-center">
              <div className="featured-content-info__title green-gradient-text text-5xl md:text-6xl xl:text-7xl font-bold">
                Feature Coming Soon...
              </div>
              <div className="featured-content-info__description text-3xl font-light max-w-xl mt-1">
                We're still working on this, check back soon to see this feature!
              </div>
            </div>

            <Link to="/videos"><img src="/goback.png" className="max-h-11 upload-button mt-10" /></Link>
          </div>
          <div className="featured-content-video lg:w-1/6">

          </div>
        </div>
      </div>
    </div>
  )
}
