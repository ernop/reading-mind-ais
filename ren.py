import os,sys, shutil

src="/mnt/c/screenshots/"
files=os.listdir(src)
target='/mnt/d/proj/reading-mind/reading-mind-ais/images/ideogram-taylor-swift-magic-off'
ii=0

n=sys.argv[1].strip()

for f in files:
    if f.endswith('.png'):
        srcfp=os.path.join(src,f)
        new=n+str(ii)+'.png'
        ii=ii+1
        destfp=os.path.join(target,new)
        print(srcfp)
        print(destfp)
        if (os.path.exists(destfp)):
            print("Bad target, probably you are making a mistake by not having adjusted the above. ending")
            sys.exit()
        shutil.move(srcfp,destfp)
