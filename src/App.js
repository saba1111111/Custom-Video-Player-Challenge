import React,{useRef,useReducer} from "react";
import "./App.css";
import Video from "./components/Video";
import Controller from "./components/Controller";

function App() {
  const firstVideoRef = useRef(null);
  const SecondvideoRef = useRef(null);
  const [states,dispachAction] = useReducer((state,action) => ({...state,...action}),{vIdeoLine: 0,volume: 1,currentTime: 0,videoTime: 0,playing: false,speed: 1,label: 'fullHD'});
   const {vIdeoLine,volume,currentTime,videoTime,playing,speed,label} = states;

  const startPauseHandler = (control) => {
    if (control === "play") {
      firstVideoRef.current.play();
      SecondvideoRef.current.play();
      dispachAction({playing: true});
      let vid = document.getElementById("video1");
      dispachAction({videoTime: vid.duration});
    } else if (control === "pause") {
      SecondvideoRef.current.pause();
      firstVideoRef.current.pause();
      dispachAction({playing: false});
    }
  };
  const fastForward = () => {
    firstVideoRef.current.currentTime += 10;  
    SecondvideoRef.current.currentTime += 10;
    dispachAction({vIdeoLine: vIdeoLine + 0.01});
  };
  const revert = () => {
    firstVideoRef.current.currentTime -= 10;
    SecondvideoRef.current.currentTime -= 10;
    dispachAction({vIdeoLine: vIdeoLine - 0.01});
  };
   const changeTime = () => {
    const VideoLineTime = firstVideoRef.current.currentTime / firstVideoRef.current.duration;
    dispachAction({vIdeoLine: vIdeoLine > VideoLineTime ? vIdeoLine : VideoLineTime});
    dispachAction({currentTime: firstVideoRef.current?.currentTime});
   }
  firstVideoRef.current?.addEventListener("timeupdate", changeTime);
  const progressLineListener = (e) => {
    const scrubTime = e.target.value * firstVideoRef.current.duration;
    if (!isNaN(scrubTime)) {
      dispachAction({vIdeoLine: scrubTime / firstVideoRef.current.duration});
      firstVideoRef.current.currentTime = scrubTime;
      SecondvideoRef.current.currentTime = scrubTime;
    }
  }
  const handleRangeUpdate = (e) => {
    dispachAction({volume: e.target.value});
    firstVideoRef.current.volume = e.target.value
    SecondvideoRef.current.volume = e.target.value
  }
  const handleVideoSpeed = (e) => {
     dispachAction({speed: e.target.value});
     firstVideoRef.current.playbackRate = e.target.value;
     SecondvideoRef.current.playbackRate = e.target.value; 
  }
  return <div className="app">
      <div className="video-conteiner">
        <Video label={label}  playing={playing} startPauseHandler={startPauseHandler}  id="video1" className="videoMargin" ref={firstVideoRef} />
        <Video label={label} playing={playing} startPauseHandler={startPauseHandler} ref={SecondvideoRef} />
      </div>
     <Controller dispachAction={dispachAction} label={label} handleVideoSpeed={handleVideoSpeed} speed={speed} vIdeoLine={vIdeoLine} progressLineListener={progressLineListener} currentTime={currentTime} videoTime={videoTime} volume={volume} handleRangeUpdate={handleRangeUpdate} revert={revert} playing={playing} startPauseHandler={startPauseHandler} fastForward={fastForward} />
  </div>;
}

export default App;