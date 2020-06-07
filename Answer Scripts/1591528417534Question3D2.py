import sys
import pandas as pd
import numpy as np
import os

#Function for average performers (Q3)
def Q3():
    currentDirectory = os.getcwd()
    resultFile = sys.argv[1];
    storeDataset = pd.read_csv(currentDirectory +'\\'+resultFile)
    products = storeDataset[storeDataset['Cluster']==2]
    if os.path.exists(currentDirectory + '\\'+resultFile):
        os.remove(currentDirectory + '\\'+resultFile)
    products.to_csv(currentDirectory + '\\'+resultFile, mode='a', header=True,index=False)
    return 'Success'


status = Q3()
if (status == 'Success'):
    print('200')