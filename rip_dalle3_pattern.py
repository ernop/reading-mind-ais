import os
import re
import shutil

#move and rename a bunch of files, based on more hacky methods.

pat = "_A_Japanese_NOH_mask_which_has_WORD_close_up"
pat="_A_dog_with WORD look"
pat="_A_dog_with_a_WORD_look_Exclude_all_textual_elements"
pat = "WORD look"
pat=pat.replace(' ','_')
folder = "/mnt/d/proj/dalle3/output/"
move_base_target_folder = "/mnt/d/proj/reading-mind/reading-mind-ais/images/dalle3-dogs"
move_filename_pattern = "{WORD}{N}.png"
import ipdb;ipdb.set_trace()

image_files = [f for f in os.listdir(folder) if re.search('([^_]+)_look_', f) and not "NOH" in f and "italian" not in f and not "extremis" in f and not "still_life" in f and not "vivid" in f and not "perspective" in f and not "Noh" in f and not '_mask_' in f and not '_dog_' in f and not "_mime_" in f and not "Ells" in f and not "makes_her" in f and not "natural_looking" in f and not '_vivid' in f]

word_groups = {}

for image_file in image_files:
    match = re.search('([^_]+)_look_', image_file)

    #~ match = re.search(r'_([^_]+)_look)', image_file)
    if match:
        fp=os.path.join(folder,image_file)
        if os.path.getsize(fp)==0:
            print("skip",fp)
            continue
        word = match.group(1).lower()

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
