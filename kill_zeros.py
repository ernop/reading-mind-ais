import os,shutil

folder = "/mnt/d/proj/dalle3/output/efef/eval/done"
image_files = [f for f in os.listdir(folder)]

for image_file in image_files:
    fp=os.path.join(folder,image_file)
    #~ print(os.path.getsize(fp))
    if os.path.getsize(fp)==0:
        print('remove:',fp)
        os.remove(fp)
