# Refer to https://github.com/ukayzm/opencv/blob/master/face_recognition/camera.py

import cv2

class VideoCamera(object):
    def __init__(self, video_src=0):
        # Using OpenCV to capture from device 0.
        self.video = cv2.VideoCapture(video_src)
        
        # If you decide to use video.mp4, you must have this file in the folder
        # as the main.py.
        # self.video = cv2.VideoCapture('video.mp4')

    def __del__(self):
        self.video.release()
    
    def get_fps(self):
        fps = self.video.get(cv2.CAP_PROP_FPS)
        return fps

    def get_frame(self):
        # Grab a single frame of video
        ret, frame = self.video.read()
        return ret, frame


if __name__ == '__main__':
    camera = VideoCamera()
    while True:
        frame = camera.get_frame()

        # show the frame
        cv2.imshow("Frame", frame)
        key = cv2.waitKey(1) & 0xFF

        # if the `q` key was pressed, break from the loop
        if key == ord("q"):
            break

    # do a bit of cleanup
    cv2.destroyAllWindows()
    print('finish')