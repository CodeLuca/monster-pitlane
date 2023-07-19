import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../context/ContextProvider.jsx";

export default function VideoForm() {
  const navigate = useNavigate();
  let { id } = useParams();
  const [video, setVideo] = useState({
    id: null,
    title: '',
    video: null,
    news: false,
    events: false,
    educational: false,
  })
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)
  const { setNotification } = useStateContext()

  if (id) {
    useEffect(() => {
      setLoading(true)
      axiosClient.get(`/users/${id}`)
        .then(({ data }) => {
          setLoading(false)
          setVideo(data)
        })
        .catch(() => {
          setLoading(false)
        })
    }, [])
  }

  const onSubmit = ev => {
    ev.preventDefault()
    if (video.id) {
      axiosClient.put(`/users/${video.id}`, video)
        .then(() => {
          setNotification('Video was successfully updated')
          navigate('/users')
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    } else {
      const formData = new FormData();
      formData.append('title', video.name);
      formData.append('video', video.video);

      axiosClient.post('/upload', video, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(() => {
          setNotification('Video was successfully uploaded')
          navigate('/videos')
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    }
  }

  return (
    <div className="w-full flex flex-col justify-center items-center" style={{ minHeight: '80vh' }}>
      <h1 className="text-7xl py-5 green-gradient-text font-bold">UPLOAD VIDEO</h1>
      <div className="w-full max-w-md">
        <form className="bg-black shadow-md px-8 pt-6 pb-8 mb-4" onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">
              VIDEO TITLE
            </label>
            <input value={video.title} onChange={ev => setVideo({ ...video, title: ev.target.value })} placeholder="Video Title" className="uppercase shadow appearance-none border w-full px-3" id="title" type="text" />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2">
              VIDEO FILE
            </label>
            <input
              type="file" accept="video/*" onChange={ev => setVideo({ ...video, video: ev.target.files[0] })} encType="multipart/form-data"
              className="shadow appearance-none w-full uppercase focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2">
              VIDEO THUMBNAIL
            </label>
            <input
              type="file" accept="image/*" onChange={ev => setVideo({ ...video, thumbnail: ev.target.files[0] })} encType="multipart/form-data"
              className="shadow appearance-none w-full uppercase focus:outline-none focus:shadow-outline" />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-bold mb-2">
              VIDEO DESCRIPTION
            </label>
            <textarea
              className="shadow appearance-none w-full  focus:outline-none focus:shadow-outline bg-black text-white"
              value={video.description}
              onChange={ev => setVideo({ ...video, description: ev.target.value })}
              placeholder="Description"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-bold mb-2">
              VIDEO TYPE
            </label>
            <div className=" w-100 flex justify-between">
              <div className="flex items-center">
                <input
                  className="mr-2 text-lime-600"
                  type="checkbox"
                  checked={video.news}
                  onChange={ev => setVideo({ ...video, news: ev.target.checked })}
                />
                <span className="text-sm">
                  News
                </span>
              </div>
              <div className="flex items-center">
                <input
                  className="mr-2 text-lime-600"
                  type="checkbox"
                  checked={video.events}
                  onChange={ev => setVideo({ ...video, events: ev.target.checked })}
                />
                <span className="text-sm">
                  Events
                </span>
              </div>
              <div className="flex items-center">
                <input
                  className="mr-2 text-lime-600"
                  type="checkbox"
                  checked={video.educational}
                  onChange={ev => setVideo({ ...video, educational: ev.target.checked })}
                />
                <span className="text-sm">
                  Educational
                </span>
              </div>
            </div>
          </div>
          <div className="mb-4">

            {
              errors && Array.isArray(errors) && (
                <p className="text-red-500 italic">
                  {Object.keys(errors).map(key => (
                    <p key={key}>{errors[key][0]}</p>
                  ))}
                </p>
              )
            }
            {
              errors && !Array.isArray(errors) && (
                <p className="text-red-500 italic">
                  {errors}
                </p>
              )
            }
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-lime-600 hover:bg-lime-700 font-semibold py-2 px-4 w-full text-xl focus:outline-none focus:shadow-outline" type="submit">
              UPLOAD
            </button>
            {/* {JSON.stringify(video)} */}
          </div>
        </form>
        <div className="text-center text-xl pt-2">
          <Link to="/videos" className="text-gray-500 hover:text-white">
            <img src="/goback.png" className="max-h-11 upload-button m-auto" />
          </Link>
        </div>
      </div>
    </div>
  )
}
