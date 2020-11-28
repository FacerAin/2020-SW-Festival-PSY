import React, {useEffect} from "react";
import {
    useRecordWebcam,
} from "react-record-webcam";

const Webcam = () => {
    const recordWebcam = useRecordWebcam();

    useEffect(()=>{
        recordWebcam.open()
        recordWebcam.start()
    }, [])

    return(
        <video
        ref={recordWebcam.webcamRef}
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