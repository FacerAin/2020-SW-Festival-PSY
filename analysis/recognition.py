#Refer to https://github.com/ukayzm/opencv/blob/master/face_recognition/face_recog.py
#Refer to https://velog.io/@choiiis/Python%EC%97%90%EC%84%9C-dlib%EC%9D%84-%EC%9D%B4%EC%9A%A9%ED%95%98%EC%97%AC-Facial-Landmark-%EA%B2%80%EC%B6%9C%ED%95%98%EC%97%AC-%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%A5%BC-json-%EC%A0%80%EC%9E%A5%ED%95%98%EA%B8%B0

import dlib
import face_recognition
import cv2
import camera
import os
import numpy as np
from keras.preprocessing.image import img_to_array
from keras.models import load_model
from imutils import face_utils
import math
from scipy.spatial import distance as dist

emotion_classifier = load_model('model/emotion_model.hdf5', compile=False)

# Parameters

EYE_AR_THRESH = 0.2
EYE_AR_CONSEC_SEC = 1 #2 SEC
HEAD_TH = 100 # 130도

# create list for landmarks
ALL = list(range(0, 68))
RIGHT_EYEBROW = list(range(17, 22))
LEFT_EYEBROW = list(range(22, 27))
RIGHT_EYE = list(range(36, 42))
LEFT_EYE = list(range(42, 48))
NOSE = list(range(27, 36))
MOUTH_OUTLINE = list(range(48, 61))
MOUTH_INNER = list(range(61, 68))
JAWLINE = list(range(0, 17))

(lStart, lEnd) = face_utils.FACIAL_LANDMARKS_IDXS["left_eye"]
(rStart, rEnd) = face_utils.FACIAL_LANDMARKS_IDXS["right_eye"]

# for 7 emotion classification
EMOTIONS = ["Angry" ,"Disgusting","Fearful", "Happy", "Sad", "Surpring", "Neutral"]


class Recognition():
    def __init__(self, video_src = 0):
        self.detector = dlib.get_frontal_face_detector()
        self.predictor = dlib.shape_predictor('./model/shape_predictor_68_face_landmarks.dat')
        self.camera = camera.VideoCamera(video_src)
        # TODO
        # -> Identifying Webcam and Video

        
        self.emotion_classifier = load_model('model/emotion_model.hdf5', compile=False)
        EMOTIONS = ["Angry" ,"Disgusting","Fearful", "Happy", "Sad", "Surpring", "Neutral"]
        self.face_detector = []
        self.face_locations = []
        self.face_encodings = []
        self.face_names = []
        self.process_this_frame = True
        self.HEAD_TOTAL_COUNTER = 0
        self.EYE_TOTAL_COUNTER = 0
        self.EYE_COUNTER = 0
        self.SLEEP_COUNT = 0
        self.HEAD_COUNTER = 0
        self.TOTAL = 0
        self.emotions_time_list = []
        self.is_focus = False

    def __del__(self):
        print(self.emotions_time_list)
        del self.camera

    def eye_aspect_ratio(self, eye):
        A = dist.euclidean(eye[1], eye[5])
        B = dist.euclidean(eye[2], eye[4])
        C = dist.euclidean(eye[0], eye[3])
        ear = (A + B) / (2.0 * C)
        return ear
        
    def get_frame(self):
        fps = self.camera.get_fps()
        frame = self.camera.get_frame()
        canvas = np.zeros((300, 300, 3), dtype = "uint8")
        # Resize frame of video to 640*480 size for faster face recognition processing
        small_frame = cv2.resize(frame, dsize=(640, 480), interpolation=cv2.INTER_AREA)
        size = small_frame.shape

        #Convert RGB To Gray
        small_frame_gray = cv2.cvtColor(small_frame, cv2.COLOR_BGR2GRAY)
        if self.process_this_frame:
        # Find face location and face encodings
            self.face_detector = self.detector(small_frame_gray, 1)
        self.process_this_frame = not self.process_this_frame

        for face in self.face_detector:
            # face wrapped with rectangle
            cv2.rectangle(small_frame, (face.left(), face.top()), (face.right(), face.bottom()),
                            (0, 0, 255), 3)

            # make prediction and transform to numpy array
            landmarks = self.predictor(small_frame, face)  # ?��굴에?�� 68�? ?�� 찾기
            shape0 = np.array(face_utils.shape_to_np(landmarks))
    
            #2D image points. If you change the image, you need to change vector
            image_points = np.array([
                                        (shape0[33, :]),     # Nose tip
                                        (shape0[8,  :]),     # Chin
                                        (shape0[36, :]),     # Left eye left corner
                                        (shape0[45, :]),     # Right eye right corne
                                        (shape0[48, :]),     # Left Mouth corner
                                        (shape0[54, :])      # Right mouth corner
                                    ], dtype="double")
            
            # 3D model points.
            model_points = np.array([
                                        (0.0, 0.0, 0.0),             # Nose tip
                                        (0.0, -330.0, -65.0),        # Chin
                                        (-225.0, 170.0, -135.0),     # Left eye left corner
                                        (225.0, 170.0, -135.0),      # Right eye right corne
                                        (-150.0, -150.0, -125.0),    # Left Mouth corner
                                        (150.0, -150.0, -125.0)      # Right mouth corner                     
                                    ])

            focal_length = size[1]
            center = (size[1]/2, size[0]/2)
            camera_matrix = np.array(
                            [[focal_length, 0, center[0]],
                            [0, focal_length, center[1]],
                            [0, 0, 1]], dtype = "double"
                            )



            dist_coeffs = np.zeros((4,1))
            (success, rotation_vector, translation_vector) = cv2.solvePnP(model_points, image_points, camera_matrix, dist_coeffs, flags=cv2.SOLVEPNP_ITERATIVE)
            (nose_end_point2D, jacobian) = cv2.projectPoints(np.array([(0.0, 0.0, 1000.0)]), rotation_vector, translation_vector, camera_matrix, dist_coeffs)

            p1 = ( int(image_points[0][0]), int(image_points[0][1]))
            p2 = ( int(nose_end_point2D[0][0][0]), int(nose_end_point2D[0][0][1]))

            # calculate rotation angles
            theta = cv2.norm(rotation_vector, cv2.NORM_L2)

            # transformed to quaterniond
            w = math.cos(theta / 2)
            x = math.sin(theta / 2)*rotation_vector[0][0] 
            y = math.sin(theta / 2)*rotation_vector[1][0] 
            z = math.sin(theta / 2)*rotation_vector[2][0]

            ysqr = y * y

            # pitch (x-axis rotation)
            t0 = 2.0 * (w * x + y * z)
            t1 = 1.0 - 2.0 * (x * x + ysqr)
            pitch = math.atan2(t0, t1)
            
            # yaw (y-axis rotation)
            t2 = 2.0 * (w * y - z * x)
            if t2 > 1.0:
                t2 = 1.0
            if t2 < -1.0:
                t2 = -1.0
            yaw = math.asin(t2)
            
            # roll (z-axis rotation)
            t3 = 2.0 * (w * z + x * y)
            t4 = 1.0 - 2.0 * (ysqr + z * z)
            roll = math.atan2(t3, t4)
            Z = int((roll/math.pi)*180)

            # Estimate EAR
            leftEye = shape0[lStart:lEnd]
            rightEye = shape0[rStart:rEnd]
            leftEAR = self.eye_aspect_ratio(leftEye)
            rightEAR = self.eye_aspect_ratio(rightEye)

            ear = (leftEAR + rightEAR) / 2.0



            # EYE ANALIYSIS

            if self.EYE_TOTAL_COUNTER > 5 * fps:
                self.EYE_TOTAL_COUNTER = 0
                self.SLEEP_COUNT = 0
            else:
                if(self.SLEEP_COUNT >= 3):
                    self.SLEEP_COUNT = 0

            if ear < EYE_AR_THRESH:
                self.EYE_COUNTER += 1
            else:
                self.EYE_COUNTER = 0

            if self.EYE_COUNTER >= EYE_AR_CONSEC_SEC * fps:
                self.EYE_COUNTER = 0
                self.SLEEP_COUNT += 1

            if(Z > abs(HEAD_TH)):

            
            cv2.line(small_frame, p1, p2, (255,0,0), 2) 

            #create list to contain landmarks
            landmark_list = []

            '''

            # Resize the image to 48x48 for neural network
            roi = small_frame_gray[face.left():face.right(), face.top():face.bottom()]
            roi = cv2.resize(roi, (48, 48))
            roi = roi.astype("float") / 255.0
            roi = img_to_array(roi)
            roi = np.expand_dims(roi, axis=0)

            # Emotion predict
            preds = emotion_classifier.predict(roi)[0]
            emotion_probability = np.max(preds)
            label = EMOTIONS[preds.argmax()]

            if(self.fps_count % int(fps) == 0):
                print('check')
                print(preds)
                self.emotions_time_list.append(preds)
            # Label printing
            for (i, (emotion, prob)) in enumerate(zip(EMOTIONS, preds)):
                text = "{}: {:.2f}%".format(emotion, prob * 100)    
                w = int(prob * 300)
                cv2.rectangle(canvas, (7, (i * 35) + 5), (w, (i * 35) + 35), (0, 0, 255), -1)
                cv2.putText(canvas, text, (10, (i * 35) + 23), cv2.FONT_HERSHEY_SIMPLEX, 0.45, (255, 255, 255), 2)
            '''


            # append (x, y) in landmark_list
            for p in landmarks.parts():
                landmark_list.append([p.x, p.y])
                cv2.circle(small_frame, (p.x, p.y), 2, (0, 255, 0), -1)

            
            #만약 3초간 다른 곳으로 고개를 보고 있으면 집중 X 우선순위 2
            #인식이 안될때도 포함
        
        return small_frame, canvas


        def get_jpg_bytes(self):
            frame = self.get_frame()
            # We are using Motion JPEG, but OpenCV defaults to capture raw images,
            # so we must encode it into JPEG in order to correctly display the
            # video stream.
            ret, jpg = cv2.imencode('.jpg', frame)
            return jpg.tobytes()

