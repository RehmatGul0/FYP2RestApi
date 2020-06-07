import sys
import pandas as pd
import numpy as np
import os

#Function for average performers (Q3)
def find_bestPerformers():
    currentDirectory = os.getcwd()
    resultFile = sys.argv[1];
    studentsData = pd.read_csv(currentDirectory +'\\'+resultFile)
    best_performers = studentsData[studentsData['Cluster']==1]
    if os.path.exists(currentDirectory + '\\'+resultFile):
        os.remove(currentDirectory + '\\'+resultFile)
    best_performers.to_csv(currentDirectory + '\\'+resultFile, header=True,index=False)
    return 'Success'


status = find_bestPerformers()
if (status == 'Success'):
    print('200')