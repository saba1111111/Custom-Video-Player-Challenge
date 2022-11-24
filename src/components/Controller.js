import React from "react";
import {VscDebugStart} from "react-icons/vsc";
import {AiOutlinePause} from "react-icons/ai";
import {BsSkipForward} from "react-icons/bs";
import {BsSkipBackward} from "react-icons/bs";
import {BsFillVolumeDownFill} from "react-icons/bs";
function Controller({vIdeoLine,progressLineListener,currentTime,videoTime,volume,handleRangeUpdate,revert,playing,startPauseHandler,fastForward,handleVideoSpeed,speed,label,dispachAction}) {
  return (
    <div className="videos-contoller">
    <input 
      type="range" 
      name="progress" 
      className="progress" 
      min="0" max="1" step="0.01" value={vIdeoLine}
      onChange={(e) => progressLineListener(e)}
    />

<div className="controller-conteiner">
  <div className="center-elements">
  <p className="controlsTime">
  {Math.floor(currentTime / 60) + ":" + ("0" + Math.floor(currentTime % 60)).slice(-2)} {" "}
  /
  {" "}  {Math.floor(videoTime / 60) + ":" + ("0" + Math.floor(videoTime % 60)).slice(-2)}
   </p>
   <div className="center-elements">
    <select
            className="option-style"
            value={speed}
            onChange={(e) => handleVideoSpeed(e)}
          >
            <option value="0.50">0.50x</option>
            <option value="1">1x</option>
            <option value="1.25">1.25x</option>
            <option value="2">2x</option>
          </select>
      </div>
  </div>
   <div className="center-elements">
   <div className="center-elements startPause">
  <div className="center-elements">
  <BsSkipBackward className="icons" onClick={revert} />
  </div>
  {playing ? (
  <div className="center-elements">
    <AiOutlinePause onClick={() => startPauseHandler("pause")} className="icon"  />
    </div>
  ) : (
  <div className="center-elements">
    <VscDebugStart onClick={() => startPauseHandler("play")} className="icon" />
   </div>
  )}
  <div className="center-elements">
  <BsSkipForward onClick={fastForward} className="icons"/>
  </div>
  </div>
  <div className="center-elements">
    <BsFillVolumeDownFill className="icons" />
    <input 
      type="range" 
      name="volume" 
      className="player__slider" 
      min="0" max="1" step="0.05" value={volume}
      onChange={(e) => handleRangeUpdate(e)}
    />
   </div>
      <div className="center-elements">
    <select
            className="option-style"
            value={label}
            onChange={(e) => dispachAction({label: e.target.value})}
          >
            <option value="fullHD">Auto</option>
            <option value="360p">360p</option>
            <option value="720p">720p</option>
            <option value="1080p">1080p</option>
          </select>
      </div>
      </div>
  </div>

</div>
  )
}

export default Controller
