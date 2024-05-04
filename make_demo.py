import cv2
import dlib
import numpy as np

# Load the detector and predictor
detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor('../shape_predictor_68_face_landmarks.dat')

# Load a sample image
image_path = '/mnt/c/screenshots/Screenshot_20240504083558.png'
image = cv2.imread(image_path)
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# Detect the face
faces = detector(gray)

for face in faces:
    landmarks = predictor(gray, face)
    for n in range(0, 68):
        x = landmarks.part(n).x
        y = landmarks.part(n).y
        cv2.circle(image, (x, y), 2, (255, 0, 0), -1)
        #~ cv2.putText(image, (x, y), 2, (255, 0, 0), -1)
        cv2.putText(image, str(n), (x, y-5), cv2.FONT_HERSHEY_SIMPLEX, 0.3, (0, 255, 0), 1)
    marked_path=image_path.replace(".png","_marked2.png")
    cv2.imwrite(marked_path, image)
