import cv2
import dlib
import numpy as np
import os

# Initialize dlib's face detector and load the facial landmark predictor
detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor('../shape_predictor_68_face_landmarks.dat')
#~ cnn_face_detector= dlib.cnn_face_detection_model_v1("../mmod_human_face_detector.dat")

#~ Points 1-17: Jawline
#~ Points 18-22: Right eyebrow
#~ Points 23-27: Left eyebrow
#~ Points 28-31: Nose bridge
#~ Points 32-36: Lower nose
#~ Points 37-42: Right eye
#~ Points 43-48: Left eye
#~ Points 49-60: Outer lip
#~ Points 61-68: Inner lip

def doFolder(folder):
    for filename in sorted(os.listdir(folder), key=lambda fn:fn):
        if '(1)' in filename or '(2)' in filename or '(3)' in filename or '(4)' in filename:
            continue
        if not filename.endswith(".png"):
            continue
        fp=os.path.join(folder, filename)
        res1=doImage(fp)
        #~ if not res1:
            #~ doImageCnn(fp)

def doImage(image_path):
    image = cv2.imread(image_path)

    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    faces = detector(gray)
    if not faces:
        print("no faces found in:",image_path)
        return False
    #~ import ipdb;ipdb.set_trace()

    save_eyes=True
    save_marked=False
    if save_marked:
        marked_image = cv2.imread(image_path)

    ii=0
    for face in sorted(faces, key= lambda face: -1*(face.width()*face.height())):
        ii = ii+1
        landmarks = predictor(gray, face).parts()

        #try to make sure we bound the points we care about (eye region)
        included=[[p.x, p.y] for p in landmarks[17:30]]
        included.extend([[p.x, p.y] for p in landmarks[36:47]])

        # Focus on the landmarks for eyes, eyebrows, and the top of the nose (index 17 to 27)
        relevant_points = np.array(included)

        # Bounding box for the region we care about.
        x, y, w, h = cv2.boundingRect(relevant_points)


        #note we calculate this first since x can be ngative from the above, for example.
        eye_region = image[y:y+h, x:x+w]

        # Now clamp them to be within the image.
        x=max(x,0)
        y=max(y,0)
        x=min(x,image.shape[1])
        y=min(y,image.shape[0])

        base_name = os.path.basename(image_path)

        if save_marked:
            #this marks the points we actually include just to confirm. we lost the indices from above.
            for singlePt in included:
                xx=singlePt[0]
                yy=singlePt[1]
                #add a small circle
                cv2.circle(marked_image, (xx, yy), 2, (255, 0, 0), -1)

        if save_eyes:
            eye_filename = os.path.splitext(base_name)[0] + "_face_only_"+str(ii)+".png"
            eye_path = os.path.join(os.path.dirname(image_path), eye_filename)
            cv2.imwrite(eye_path, eye_region)
            print(eye_path)

        if save_marked:
            cv2.rectangle(image, (x, y), (x+w, y+h), (0, 255, 0), 2)

    if save_marked and ii>0:
        marked_filename = os.path.splitext(base_name)[0] + "_marked"+str(ii)+".png"
        marked_path = os.path.join(os.path.dirname(image_path), marked_filename)
        cv2.imwrite(marked_path, marked_image)
        print(marked_path)
    return True

def doImageCnn(image_path):
    image = cv2.imread(image_path)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    detections = cnn_face_detector(gray, 1)

    ii=0

    if not detections:
        print("no CNN faces found in",image_path)
        return
    for detection in detections:
        ii=ii+1
        x, y, w, h = detection.rect.left(), detection.rect.top(), detection.rect.width(), detection.rect.height()
        cv2.rectangle(image, (x, y), (x + w, y + h), (124, 255, 0), 2)

    base_name = os.path.basename(image_path)


    marked_filename = os.path.splitext(base_name)[0] + "_outline_CNN.png"
    marked_path = os.path.join(os.path.dirname(image_path), marked_filename)

    cv2.imwrite(marked_path, image)
    print(marked_path)

#doFolder("/mnt/d/proj/dalle3/output/")
doFolder("/mnt/d/proj/reading-mind/reading-mind-ais/images/mj-teacher/")
#doImage("/mnt/c/Screenshots/Screenshot_20240504083558.png")
