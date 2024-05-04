import cv2
import dlib
import numpy as np
import os

# Initialize dlib's face detector and load the facial landmark predictor
detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor('../shape_predictor_68_face_landmarks.dat')

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
    for filename in os.listdir(folder):
        if not filename.endswith(".png"):
            continue
        fp=os.path.join(folder, filename)
        doImage(fp)

def doImage(image_path):
    image = cv2.imread(image_path)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    faces = detector(gray)

    save_individual=False
    save_marked=True

    ii=0
    for face in sorted(faces, key= lambda face: -1*(face.width()*face.height())):
        ii=ii+1
        # Get the landmarks/parts for the face
        landmarks = predictor(gray, face).parts()

        included=[[p.x, p.y] for p in landmarks[17:30]]
        included.extend([[p.x, p.y] for p in landmarks[36:47]])

        # Focus on the landmarks for eyes, eyebrows, and the top of the nose (index 17 to 27)
        relevant_points = np.array(included)

        # Compute the bounding box coordinates
        x, y, w, h = cv2.boundingRect(relevant_points)

        x=max(x,0)
        y=max(y,0)
        x=min(x,image.shape[1])
        y=min(y,image.shape[0])
        roi = image[y:y+h, x:x+w]
        base_name = os.path.basename(image_path)

        #this marks the points we actually include just to confirm. we lost the indices from above.
        for singlePt in included:
            x=singlePt[0]
            y=singlePt[1]
            cv2.circle(image, (x, y), 2, (255, 0, 0), -1)


        if save_individual:
            new_filename = os.path.splitext(base_name)[0] + "_face_only"+str(ii)+".png"
            new_file_path = os.path.join(os.path.dirname(image_path), new_filename)
            cv2.imwrite(new_file_path, roi)
            print(new_file_path)
        if save_marked:
            cv2.rectangle(image, (x, y), (x+w, y+h), (0, 255, 0), 2)

    if save_marked and ii>0:
        marked_filename = os.path.splitext(base_name)[0] + "_outline"+str(ii)+".png"
        marked_path = os.path.join(os.path.dirname(image_path), marked_filename)

        cv2.imwrite(marked_path, image)
        print(marked_path)

#~ import ipdb;ipdb.set_trace()
#doFolder("/mnt/d/proj/dalle3/output/dogs")
#~ doFolder("/mnt/c/screenshots")
doImage("/mnt/c/Screenshots/Screenshot_20240504083558.png")
