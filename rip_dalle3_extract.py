import os
import re
import shutil

#exctract any files which match *_WORD_* for a list of words, and rename them to target zone like word0, word1, ...

patterns=["46_WORD_close","a_WORD_look","an_WORD_look", "looks_WORD_close"]
word_groups = {}
#~ import ipdb;ipdb.set_trace()
basedir = "/mnt/d/proj/dalle3/output/out2m"
move_base_target_folder = "/mnt/d/proj/reading-mind/reading-mind-ais/images/dalle3-NOH-masks"
files=[f for f in os.listdir(basedir) if f.endswith('.png') and not 'outline_' in f]
for pattern in patterns:
    a,b=pattern.split("WORD")
    a=a.strip("_")
    b=b.strip("_")
    for image_file in files:
        fp=os.path.join(basedir,image_file)
        if os.path.getsize(fp)==0:
            continue
        mm=re.search(f'{a}_(\w+)_{b}', fp)
        if mm:
            word=mm.groups(1)[0].lower()
            if word not in word_groups:
                word_groups[word] = []
            word_groups[word].append(image_file)


#~ import ipdb;ipdb.set_trace()
tot=0
thematches=[]
for word, matchingPaths in word_groups.items():
    for i, matching_fn in enumerate(matchingPaths):
        tot=tot+1
        thematches.append(matching_fn)
        target_fn=f"{word}{i}.png"
        #~ import ipdb;ipdb.set_trace()
        target_path = os.path.join(move_base_target_folder, target_fn)

        if not os.path.exists(target_path):
            source_path = os.path.join(basedir, matching_fn)
            if os.path.exists(target_path):
                print("you were trying to ovewritne something, probably bad.")
                print(target_path)
                sys.exit();
            shutil.copy(source_path, target_path)
            print(f"{tot} Copied {matching_fn} to {target_path}")
        else:
            print(f"Target path {target_path} already exists. Skipping.")
            break

print(','.join(sorted((word_groups.keys()))))
import ipdb;ipdb.set_trace()
print("matched tot:",tot,'of',len(files))
for um in [f for f in files if f not in thematches]:
    print(um)
