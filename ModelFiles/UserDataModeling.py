import pickle
import sys
import pandas as pd
import numpy as np
import os
from sklearn.cluster import KMeans

currentDirectory = os.getcwd()
path = sys.argv[1]
userData = pd.read_csv(currentDirectory + path)
testData = pd.read_csv(currentDirectory + path)
userData.rename(columns=sys.argv[2])
testData = testData[['SSC Marks','HSSC Marks','Entry Test Score Marks']]
Model = pickle.load(open(currentDirectory +"/ModelingData/modelstate.bin", "rb"))
testResult = Model.predict(testData)
userData['Cluster'] = testResult
userData.to_csv(currentDirectory + path,index=False)
print('200')