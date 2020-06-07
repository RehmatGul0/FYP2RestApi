import sys
import pandas as pd
import numpy as np
import os

#Function for average performers (Q2)
def Q2():
    currentDirectory = os.getcwd()
    resultFile = sys.argv[1];
    storeDataset = pd.read_csv(currentDirectory +'\\'+resultFile)
    products = storeDataset[storeDataset['Cluster']==1]
    if os.path.exists(currentDirectory + '\\'+resultFile):
        os.remove(currentDirectory + '\\'+resultFile)
    products.to_csv(currentDirectory + '\\'+resultFile, header=True,index=False)
    return 'Success'


status = Q2()
if (status == 'Success'):
    print('200')