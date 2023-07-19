import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider.jsx";
import ReactPlayer from 'react-player'
import VideoThumbnail from "../components/VideoThumbnail.jsx";
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(advancedFormat)
dayjs.extend(relativeTime)

export default function Users() {
  const [videos, setVideos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(false);
  const { setNotification } = useStateContext()

  useEffect(() => {
    getVideos();
  }, [])

  const onDeleteClick = video => {
    if (!window.confirm("Are you sure you want to delete this video?")) {
      return
    }
    axiosClient.delete(`/videos/${video.id}`)
      .then(() => {
        setNotification('User was successfully deleted')
        getVideos()
      })
  }

  const getVideos = () => {
    setLoading(true)
    axiosClient.get('/videos')
      .then(({ data }) => {
        setLoading(false)
        setVideos(data)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const featuredVideoID = 0;

  return (
    <div>
      <Link to={`/videos/${videos[featuredVideoID]?.id}`} className="opacity-hover featured-content bg-black flex flex-col lg:flex-row">
        <div className="featured-content-video lg:w-1/2 p-6">
          <div className="green-gradient-border">
            <div className="bg-black">
              <ReactPlayer url={import.meta.env.VITE_API_BASE_URL + `/api/stream-video/1`} controls width="100%" playing={true} />
            </div>
          </div>
        </div>
        <div className="featured-content-info lg:w-1/2 p-7 flex flex-col justify-center">
          <div className="featured-content-info__title green-gradient-text text-5xl md:text-6xl xl:text-7xl max-w-xl font-bold">
            {videos[featuredVideoID]?.title || 'No videos yet'}
          </div>
          <div className="featured-content-info__description text-3xl font-light max-w-xl my-4">
            {videos[featuredVideoID]?.description.substring(0, 240) || 'No videos yet'}
          </div>
          <div className="featured-content-info__data flex flex-col text-xl font-light uppercase">
            <div>
              {videos[featuredVideoID]?.author}<span className="ml-4">{new dayjs(videos[featuredVideoID]?.created_at).fromNow()}</span>
            </div>
            <div className="flex mt-1">
              {videos[featuredVideoID]?.news_tag ? <div className="mr-3">news</div> : ''}
              {videos[featuredVideoID]?.educational_tag ? <div className="mr-3">learn</div> : ''}
              {videos[featuredVideoID]?.events_tag ? <div className="mr-3">event</div> : ''}
            </div>
          </div>
        </div>
      </Link>
      <div className="buttons flex justify-between items-center flex-col-reverse md:flex-row mt-10">
        <div className="categories text-xl uppercase font-bold flex">
          <div
            className={`button mr-7 category ${selectedCategory === 'all' && 'green-gradient-underline'}`}
            onClick={() => setSelectedCategory('all')}>
            All
          </div>
          <div
            className={`button mr-7 category ${selectedCategory === 'news_tag' && 'green-gradient-underline'}`}
            onClick={() => setSelectedCategory('news_tag')}>
            News
          </div>
          <div
            className={`button mr-7 category ${selectedCategory === 'events_tag' && 'green-gradient-underline'}`}
            onClick={() => setSelectedCategory('events_tag')}>
            Events
          </div>
          <div
            className={`button mr-7 category ${selectedCategory === 'educational_tag' && 'green-gradient-underline'}`}
            onClick={() => setSelectedCategory('educational_tag')}>
            Learn
          </div>
        </div>
        <Link to="/videos/new"><img src="/UploadButton.png" className="max-h-10 upload-button mb-8 md:mb-0" /></Link>
      </div>
      <div className="video-list-wrapper xl:grid-cols-4 md:grid-cols-2 grid gap-5 mt-5">
        {videos.filter((x) => x[selectedCategory] || selectedCategory === 'all' && x).map((k, i) => <VideoThumbnail data={k} key={i} />)}
      </div>
    </div>
  )
}
