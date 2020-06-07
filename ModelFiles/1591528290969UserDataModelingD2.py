import pickle
import sys
import pandas as pd
import numpy as np
import os
from sklearn.preprocessing import StandardScaler

currentDirectory = os.getcwd()
directory = sys.argv[1]

Scaler = StandardScaler()
testData = pd.read_csv(currentDirectory + '\\'+sys.argv[2])
scaledStoreDatasetArray = Scaler.fit_transform(testData)
testData = pd.DataFrame(scaledStoreDatasetArray,columns = testData.columns)

Model = pickle.load(open(currentDirectory +directory, "rb"))
testResult = Model.fit_predict(testData)
userData = Scaler.inverse_transform(testData.values) 
userData = pd.DataFrame(userData,columns=testData.columns)
userData['Cluster'] = testResult
userData.to_csv(currentDirectory +'\\'+sys.argv[3],index=False)
print('200')

