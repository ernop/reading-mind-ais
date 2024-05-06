import os
import re
import shutil
import hashlib

#exctract any files which match *_WORD_* for a list of words, and rename them to target zone like word0, word1, ...

patterns=["a_very_WORD_teacher"] #, "looks_WORD_close" "46_WORD_close"
word_groups = {}
#~ basedir = "/mnt/d/proj/dalle3/output/still"
basedir = "/mnt/d/dl"
move_base_target_folder = "/mnt/d/proj/reading-mind/reading-mind-ais/images/mj-teacher"
files=[f for f in os.listdir(basedir) if f.endswith('.png') and not 'outline_' in f]

#for translating mixed terminology sources.
maps={}
#~ maps = {
    #~ "astonished": "astonishment",
    #~ "aggressive": "aggression",
    #~ "ambitious": "ambition",
    #~ "angry": "anger",
    #~ "anguished": "anguish",
    #~ "anxious": "anxiety",
    #~ "betrayed": "betrayal",
    #~ "astonished": "astonishment",
    #~ "awed": "awe",
    #~ "bored": "boredom",
    #~ "calm": "calm",
    #~ "comradely": "camaraderie",
    #~ "condescending": "condescension",
    #~ "content": "contentment",
    #~ "creative": "creativity",
    #~ "curious": "curiosity",
    #~ "defeated": "defeat",
    #~ "determined": "determination",
    #~ "diligent": "diligence",
    #~ "disgusted": "disgust",
    #~ "ecstatic": "ecstasy",
    #~ "empathetic": "empathy",
    #~ "encouraged": "encouragement",
    #~ "enchanted": "enchantment",
    #~ "enlightened": "enlightenment",
    #~ "envious": "envy",
    #~ "exasperated": "exasperation",
    #~ "exhausted": "exhaustion",
    #~ "exhilarated": "exhilaration",
    #~ "fascinated": "fascination",
    #~ "fearful": "fear",
    #~ "foolish": "foolishness",
    #~ "free": "freedom",
    #~ "frustrated": "frustration",
    #~ "gloomy": "gloom",
    #~ "grandiose": "grandiosity",
    #~ "grateful": "gratitude",
    #~ "greedy": "greed",
    #~ "grumpy": "grumpiness",
    #~ "guilty": "guilt",
    #~ "happy": "happiness",
    #~ "hopeful": "hope",
    #~ "hostile": "hostility",
    #~ "humble": "humility",
    #~ "impatient": "impatience",
    #~ "ungrateful": "ingratitude",
    #~ "loving": "love",
    #~ "indignant": "indignation",
    #~ "insane": "insanity",
    #~ "irritated": "irritation",
    #~ "jealous": "jealousy",
    #~ "lonely": "loneliness",
    #~ "loyal": "loyalty",
    #~ "melancholic": "melancholy",
    #~ "mischievous": "mischievousness",
    #~ "mourning": "mourning",
    #~ "nostalgic": "nostalgia",
    #~ "oblivious": "obliviousness",
    #~ "optimistic": "optimism",
    #~ "overwhelmed": "overwhelm",
    #~ "passionate": "passion",
    #~ "perplexed": "perplexity",
    #~ "pitying": "pity",
    #~ "pompous": "pomposity",
    #~ "proud": "pride",
    #~ "rebellious": "rebellion",
    #~ "regretful": "regret",
    #~ "relieved": "relief",
    #~ "remorseful": "remorse",
    #~ "resentful": "resentment",
    #~ "respectful": "respect",
    #~ "vengeful": "revenge",
    #~ "reverent": "reverence",
    #~ "sacrificial": "sacrifice",
    #~ "sad": "sadness",
    #~ "sanctimonious": "sanctimoniousness",
    #~ "sarcastic": "sarcasm",
    #~ "seductive": "seduction",
    #~ "serene": "serenity",
    #~ "ashamed": "shame",
    #~ "skeptical": "skepticism",
    #~ "stressed": "stress",
    #~ "surprised": "surprise",
    #~ "sympathetic": "sympathy",
    #~ "thrilled": "thrill",
    #~ "transcendent": "transcendence",
    #~ "triumphant": "triumph",
    #~ "trusting": "trust",
    #~ "uneasy": "unease",
    #~ "united": "unity",
    #~ "valorous": "valor",
    #~ "venerated": "veneration",
    #~ "vigilant": "vigilance",
    #~ "vulnerable": "vulnerability",
    #~ "yearning": "yearning"
#~ }

def makeHash(fp):
    with open(fp, "rb") as f:
        # Read the binary content
        binary_content = f.read()
        # Compute the hash
        hash_value = hashlib.sha256(binary_content).hexdigest()
        return hash_value

done=set()
#~ import ipdb;ipdb.set_trace()
seenhashes=set()
for pattern in patterns:
    a,b=pattern.split("WORD")
    for image_file in files:
        if image_file in done:
            continue
        fp=os.path.join(basedir,image_file)
        if os.path.getsize(fp)==0:
            continue
        hash=makeHash(fp)
        if hash in seenhashes:
            print("re-seeing",fp)
            continue
        seenhashes.add(hash)
        mm=re.search(f'{a}([\w]+){b}', fp.lower())
        if mm:
            #~ import ipdb;ipdb.set_trace()
            word=mm.groups(1)[0].lower().replace("a_","").replace("an_","").replace("_look","")
            if word in maps.keys():
                #~ print(word, maps[word])
                word=maps[word]
            if word not in word_groups:
                word_groups[word] = []
            #~ print(word,len(word))
            word_groups[word].append(image_file)
            done.add(image_file)


#~ import ipdb;ipdb.set_trace()
tot=0
thematches=[]
for word, matchingPaths in word_groups.items():
    for i, matching_fn in enumerate(matchingPaths):
        tot=tot+1
        thematches.append(matching_fn)
        target_fn=f"{word}{i}.png".lower()
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
#~ import ipdb;ipdb.set_trace()
print("matched tot:",tot,'of',len(files))
#~ for um in [f for f in files if f not in thematches]:
    #~ print("unmatched.",um)
