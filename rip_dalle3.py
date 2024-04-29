import os
import re
import shutil

pat = "A_woman_who_looks_like_Taylor_Swift_is_WORD_in_a_clear_daytime_color_photo_looking_at_the_camera_close_up_of_her_face_2010_portrai_19__10015-20240429-hd-h_0_annotated"
folder = "/mnt/d/proj/dalle3/output/"
move_base_target_folder = "/mnt/d/proj/reading-mind/reading-mind-ais/images/dalle3-taylor-swift"
move_filename_pattern = "{WORD}{N}.png"

base_pattern = re.escape(pat.split('WORD')[0])

image_files = [f for f in os.listdir(folder) if re.match(base_pattern, f)]

word_groups = {}
for image_file in image_files:
    match = re.search(r'{}(\w+)'.format(re.escape(base_pattern)), image_file)
    if match:
        word = match.group(1).split('_')[0]
        if word not in word_groups:
            word_groups[word] = []
        word_groups[word].append(image_file)

for word, files in word_groups.items():
    for i, file in enumerate(files):
        target_filename = move_filename_pattern.format(WORD=word, N=i)
        target_path = os.path.join(move_base_target_folder, target_filename)

        if not os.path.exists(target_path):
            source_path = os.path.join(folder, file)
            shutil.copy(source_path, target_path)
            print(f"Moved {file} to {target_path}")
        else:
            print(f"Target path {target_path} already exists. Skipping.")
            break
