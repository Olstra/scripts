# Sript used to strip code-skeleton from PDF task
# Author: Oliver Strassmann
# 04. April 2019

from bs4 import BeautifulSoup
import os

# general stuff
nums = ['0','1','2','3','4','5','6','7','8','9']
unwanted = "DEPARTMENT OF INFORMATICS"
bTags = []

# get user iput
print("\nHoi du!\n")
taskNr = str(input("Welle task nr?: "))
fileName = "Ex" + taskNr + ".html"
#path = taskNr + "_Ex/" + fileName
newFile = taskNr + "_task.c"

os.chdir(taskNr+"_Ex")

f = open(newFile, "w+")

f.write("#include <stdio.h>\n")

soup = BeautifulSoup(open(fileName), 'lxml')

# inside all <span> tags in html there is the info we need
for span in soup.find_all('span'):
    bTags.append(span.string)

for x in range(0, len(bTags)-1):
    # Add all FUNCTIONS - if first char = "BULLET"->it's a function
    if(bTags[x][0] == u'\u2022'):
        s = "\n\n"
        for char in bTags[x][2:]:
            s += char
            if(char == ")"): 
                s += "{}"
                break
        f.write(s)

    # add all STRUCTS
    if(bTags[x] in nums):
        if(bTags[x+1].upper() != unwanted):
           #print type(bTags[x+1].string)
            s = "\n" + bTags[x+1]
            f.write(s.encode('utf-8'))
            
f.write("\n\n\nint main(){\n\n\treturn 0;\n}")
f.close()
