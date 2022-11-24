import React from "react"

const Video = React.forwardRef(({className,id,playing,startPauseHandler,label},ref) => {
    return <div onClick={() => startPauseHandler(playing ? 'pause' : 'play')} className={`${className ? className : ""} videoStyle`}>
         <video ref={ref} id={id}  className={`video `}>
          <source
            src="https://res.cloudinary.com/ifeomaimoh/video/upload/v1650567487/speech_ofvfzq.mp4"
            type="video/mp4"
            label={label}
          />
          <source
            src="https://res.cloudinary.com/ifeomaimoh/video/upload/v1650567487/speech_ofvfzq.mp4"
            type="video/webm"
            label={label}
          />
          <p>Your browser doesn't support HTML5 video.</p>
        </video>
    </div>
  })

  export default Video