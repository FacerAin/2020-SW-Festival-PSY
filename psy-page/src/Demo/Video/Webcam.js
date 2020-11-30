import React, {useEffect, useRef} from "react";
import {
    useRecordWebcam,
    CAMERA_STATUS 
} from "react-record-webcam";

const Webcam = () => {
    const videoRef = useRef(null);
    const recordWebcam = useRecordWebcam();

    const startVideo = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({audio: true, video: true});
        if (videoRef && videoRef.current && !videoRef.current.srcObject) {
          videoRef.current.srcObject = stream;
        }
      };

    useEffect(()=>{
        startVideo()
    }, [])

    return(
        <video
        ref={videoRef}
        style ={{
            width: '100%',
            height: 'auto',
        }
        }
        autoPlay
        muted
      />
    )


}

export default Webcam;