import os, shutil

base='/mnt/d/dl/kid'

for f in os.listdir(base):

    fp=os.path.join(base,f)
    if not os.path.isfile(fp):
        continue
    print(fp)
    if f.endswith("_1.png"):
        t='1'
    if f.endswith("_2.png"):
        t='2'
    if f.endswith("_3.png"):
        t='3'
    if f.endswith("_0.png"):
        t='0'

    nfp=os.path.join(base,t,f)
    print(fp,'==>',nfp)
    #~ continue
    shutil.move(fp,nfp)
