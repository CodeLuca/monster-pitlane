import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../context/ContextProvider.jsx";
import ReactPlayer from 'react-player'
import dayjs from 'dayjs'

export default function VideoForm() {
  const navigate = useNavigate();
  let { id } = useParams();
  const [video, setVideo] = useState({
    id: null,
    title: '',
    video: null
  })
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)
  const { setNotification } = useStateContext()

  if (id) {
    useEffect(() => {
      setLoading(true)
      axiosClient.get(`/videos/${id}`)
        .then(({ data }) => {
          setLoading(false)
          setVideo(data)
        })
        .catch(() => {
          setLoading(false)
        })
    }, [])
  }

  return (
    <div>
      {/* <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
        {video.id && <h1>{video.title}</h1>}
        <Link className="btn-add" to={"/videos"}>Go Back</Link>
      </div> */}
      <div className="card animated fadeInDown">
        {loading && (
          <div className="text-center">
            Loading...
          </div>
        )}
        {errors &&
          <div className="alert">
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        }
        {!loading && (
          <div className="flex">
            <div className="featured-content-video lg:w-1/6">

            </div>
            <div className="featured-content-video lg:w-2/3">
              <Link to="/videos"><img src="/goback.png" className="max-h-11 upload-button mb-8" /></Link>
              <ReactPlayer url={import.meta.env.VITE_API_BASE_URL + `/api/stream-video/${video.id}`}
                width="100%"
                height={"auto"}
                controls
                light={
                  <img className="w-full" src={import.meta.env.VITE_API_BASE_URL + `/thumbnails/` + video?.thumbnail} />
                }
              />
              <div className="featured-content-info mt-7 flex flex-col justify-center">
                <div className="featured-content-info__title green-gradient-text text-5xl md:text-6xl xl:text-7xl max-w-xl font-bold">
                  {video?.title || 'No videos yet'}
                </div>
                <div className="featured-content-info__data flex space-x-2 text-xl font-light uppercase mb-7 mt-2">
                  <div className="pr-2">{`${video?.news_tag ? 'new  ' : ''}${video?.educational_tag ? 'learn  ' : ''}${video?.events_tag ? 'news  ' : ''}`}</div>
                  <div>{new dayjs(video?.created_at).fromNow()}</div>
                  <div>{video?.author || 'No videos yet'}</div>
                </div>
                <div className="featured-content-info__description text-3xl font-light max-w-xl">
                  {video?.description || 'No videos yet'}
                </div>
              </div>
            </div>
            <div className="featured-content-video lg:w-1/6">

            </div>
          </div>
        )}
      </div>
    </div>
  )
}
