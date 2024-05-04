import cv2
import dlib
import numpy as np
import os

cnn_face_detector= dlib.cnn_face_detection_model_v1("../mmod_human_face_detector.dat")

def doFolder(folder):
    for filename in os.listdir(folder):
        if not filename.endswith(".png"):
            continue
        fp=os.path.join(folder, filename)
        doImage(fp)

def doImage(image_path):
    image = cv2.imread(image_path)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    detections = cnn_face_detector(gray, 1)

    ii=0
    for detection in detections:
        ii=ii+1
        x, y, w, h = detection.rect.left(), detection.rect.top(), detection.rect.width(), detection.rect.height()
        cv2.rectangle(image, (x, y), (x + w, y + h), (124, 255, 0), 2)

    base_name = os.path.basename(image_path)


    marked_filename = os.path.splitext(base_name)[0] + "_outline_CNN.png"
    marked_path = os.path.join(os.path.dirname(image_path), marked_filename)

    cv2.imwrite(marked_path, image)
    print(marked_path)

#~ doFolder("/mnt/d/proj/dalle3/output/dogs")
doFolder("/mnt/c/screenshots")
#~ doImage("/mnt/c/Screenshots/Screenshot_20240504083558.png")
