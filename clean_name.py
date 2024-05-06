import os, shutil

basedir='/mnt/d/proj/reading-mind/reading-mind-ais/images/fface'

for file in os.listdir(basedir):
    if not file.endswith('.png'):
        continue
    newfn=file.replace("_face_only_1","")
    fp=os.path.join(basedir,file)
    newfp=os.path.join(basedir,newfn)
    shutil.move(fp,newfp)
