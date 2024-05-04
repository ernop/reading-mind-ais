import os
import re
import shutil

#move and rename a bunch of files, based on a PREFIX_WORD_SUFFIX pattern.

pat = "A_woman_who_looks_exactly_like_Taylor_Swift_is__WORD__in_a_clear_daytime_color_photo"
#~ pat="_A_dog_with WORD look"
pat=pat.replace(' ','_')
folder = "/mnt/d/proj/dalle3/output2/"
move_base_target_folder = "/mnt/d/proj/reading-mind/reading-mind-ais/images/dalle3-taylor-swift-eyes"
move_filename_pattern = "{WORD}{N}.png"
import ipdb;ipdb.set_trace()
base_pattern = re.escape(pat.split('WORD')[0])
tail_pattern=pat.split('WORD')[1]

image_files = [f for f in os.listdir(folder) if re.match(base_pattern, f) and 'face_only' in f]

word_groups = {}
for image_file in image_files:
    match = re.search(r'{}(\w+)'.format(re.escape(base_pattern)), image_file)
    if match:
        word = match.group(1).split(tail_pattern)[0]
        if word not in word_groups:
            word_groups[word] = []
        word_groups[word].append(image_file)

for word, files in word_groups.items():
    for i, file in enumerate(files):
        target_filename = move_filename_pattern.format(WORD=word, N=i)
        target_path = os.path.join(move_base_target_folder, target_filename.replace("a_","").replace("an_",""))

        if not os.path.exists(target_path):
            source_path = os.path.join(folder, file)
            if os.path.exists(target_path):
                print("you were trying to ovewritne something, probably bad.")
                print(target_path)
                sys.exit();
            shutil.copy(source_path, target_path)
            print(f"Moved {file} to {target_path}")
        else:
            print(f"Target path {target_path} already exists. Skipping.")
            break
