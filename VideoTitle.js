const VideoTitle = ({title, overview}) => {
    return(
        <div className="videotitle">
           <h1 className="title">{title}</h1>
           <p className="view">{overview}</p>
           <div>
            <button className="play">Play </button>
            <button className="more">More Info</button>
           </div>
        </div>
    );
};

export default VideoTitle;