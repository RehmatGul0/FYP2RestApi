import sys
import pandas as pd
import numpy as np
import os

#Function for average performers (Q1)
def Q1():
    currentDirectory = os.getcwd()
    resultFile = sys.argv[1];
    storeDataset = pd.read_csv(currentDirectory +'\\'+resultFile)
    products = storeDataset[storeDataset['Cluster']==3]
    if os.path.exists(currentDirectory + '\\'+resultFile):
        os.remove(currentDirectory + '\\'+resultFile)
    products.to_csv(currentDirectory + '\\'+resultFile , header=True,index=False)
    return 'Success'


status = Q1()
if (status == 'Success'):
    print('200')