emotions="""aggressive, aloof, anguished, ambitious, angry, anxious, ashamed, astonished, awed, bored, calm, cautious, condescending, confused, contented, curious, determined, diligent, disgusted, ecstatic, empathetic, encouraging, enlightened, envious, exhausted, exhilarated, fascinated, fearful, foolish, forgiving, flirtatious, frustrated, giddy, gloomy, grateful, greedy, grieving, guilty, happy, hopeful, horrified, hostile, humiliated, impatient, in love, indignant, inspired, intimidated, irritated, jealous, lonely, loyal, melancholic, mischievous, mournful, oblivious, overwhelmed, passionate, perplexed, pitiful, pompous, proud, regretful, relieved, remorseful, resentful, restless, reverent, sad, serene, skeptical, stressed, surprised, sympathetic, transcendent, triumphant, trusting, uneasy, vulnerable, wistful, yearning"""

pat = "a very {WORD} old man from Florida, 1990s high school style photo, close up, very sharp and clear color photo, looking at camera, centered --ar 3:2 --seed 555949 --c 1"
pat="a very {WORD} teacher from Florida, 1990s high school style photo, close up, very sharp and clear color photo, looking at camera, centered --chaos 1 --ar 3:2 --seed 555949"
words=emotions.split(',')


while words:
    #~ import ipdb;ipdb.set_trace()
    theseWord=words[-4:]
    words=words[:-4]
    #~ print(words)

    mp=pat.replace("WORD",','.join(theseWord))
    print(mp)
