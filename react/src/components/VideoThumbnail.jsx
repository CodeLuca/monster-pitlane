import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

dayjs.extend(advancedFormat)
dayjs.extend(relativeTime)

const VideoThumbnail = ({ data }) => {
  const createdAt = new dayjs(data?.created_at);

  return (
    <Link to={`/videos/${data?.id}`}>
      <div className="video-thumbnail-component">
        <div style={{ aspectRatio: "16/9" }} className="overflow-hidden">
          <img src={import.meta.env.VITE_API_BASE_URL + `/thumbnails/` + data?.thumbnail} className="w-full grayscale hover:grayscale-0" />
        </div>
        <div className="video-thumbnail-info flex pt-3">
          <div className="profile-pic rounded min-w-max">
            <img src={data.profile_pic ? `${import.meta.env.VITE_API_BASE_URL}/profiles/${data.profile_pic}` : "/Avatar.png"} alt="" className="h-9 w-9 rounded-full" />
          </div>
          <div className="video-thumbnail-text ml-3 uppercase">
            <div className="text-xl mr-4">
              {data?.title}
            </div>
            <div className="text-gray-400">
              <div>
                {data?.author}<span className="ml-4">{createdAt.fromNow()}</span>
              </div>
              <div className="flex">
                {data.news_tag ? <div className="mr-3">news</div> : ''}
                {data.educational_tag ? <div className="mr-3">learn</div> : ''}
                {data.events_tag ? <div className="mr-3">event</div> : ''}
              </div>
            </div>
          </div>
        </div >
      </div >
    </Link >
  );
};

VideoThumbnail.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    profile_pic: PropTypes.string,
    news_tag: PropTypes.bool.isRequired,
    educational_tag: PropTypes.bool.isRequired,
    events_tag: PropTypes.bool.isRequired,
  }).isRequired,
};

export default VideoThumbnail;