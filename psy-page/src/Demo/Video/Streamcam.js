import React, {useEffect, useRef} from "react";
import Webcam from "react-webcam";

const Streamcam = () => {

  const webcamRef = React.useRef(null);

  const capture = React.useCallback(
    () => {
      const imageSrc = webcamRef.current.getScreenshot();
    },
    [webcamRef]
  );


    return( 
        <Webcam
        audio={false}
        width={200}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
    )


}



export default Streamcam;