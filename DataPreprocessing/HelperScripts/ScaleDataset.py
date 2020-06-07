import math
import os
import pandas as pd
import numpy as np
import sys
from sklearn.preprocessing import StandardScaler


cwd = os.getcwd()
file = sys.argv[1]
dataset = pd.read_csv(cwd+'\\'+file)
Scaler = StandardScaler()
scaledStoreDatasetArray = Scaler.fit_transform(dataset)
dataset = pd.DataFrame(scaledStoreDatasetArray,columns = dataset.columns)
dataset.to_csv(file,index=False)
print('200')