#the images match this pattern. The part after __ varies and can be ignores.
pat="A_woman_who_looks_like_Taylor_Swift_is_WORD_in_a_clear_daytime_color_photo_looking_at_the_camera_close_up_of_her_face_2010_portrai_19__10015-20240429-hd-h_0_annotated"
#But, WORD is not really "WORD" - it is an emotion word, for example, happy, sad, angry etc.

#the images all start with A_woman_who_looks... and that continues til you get to WORD which VARIES. Everything after that doesn't matter.

folder="/mnt/d/proj/dalle3/output/annotated/"
#we want to list the images in that folder which match the base pattern (just the first part before WORD)
#then we want to group them all by word.  So excluding the prefix and everything after word, when the word is happy, we will generate images happy0.png, happy1.png, happy2.png, and happy3.png.

#there will be 4 of each, so four times the WORD may be "happy" or something.
#once they are grouped, rename and move them:

move_base_target_folder="/mnt/d/proj/reading-mind/reading-mind-ais/images/dalle3-taylor-swift"
move_filename_pattern="{WORD}{N}.png" #n varies from 0 to 3, but for some images, there may be fewer
#we only want to move them if the target full path is empty. If it's not, just quit, cause something is screwed up.

#so, basically we have a foldre of images, we match the term then group and move them, while renaming.
