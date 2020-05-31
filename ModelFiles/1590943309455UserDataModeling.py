import pickle
import sys
import pandas as pd
import numpy as np
import os

currentDirectory = os.getcwd()
directory = sys.argv[1]
userData = pd.read_csv(currentDirectory + '\\'+sys.argv[2])
testData = pd.read_csv(currentDirectory + '\\'+sys.argv[2])
Model = pickle.load(open(currentDirectory +directory, "rb"))
testResult = Model.predict(testData)
userData['Cluster'] = testResult
userData.to_csv(currentDirectory +'\\'+sys.argv[3],index=False)
print('200')