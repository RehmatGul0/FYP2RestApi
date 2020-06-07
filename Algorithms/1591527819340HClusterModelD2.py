import pickle
import sys
import pandas as pd
import numpy as np
import os
from sklearn.cluster import AgglomerativeClustering
import math
import datetime;


currentDirectory = os.getcwd()
path = sys.argv[1]
features = pd.read_csv(currentDirectory +'\\'+ path)
H_clus = AgglomerativeClustering(n_clusters=4, affinity='euclidean', linkage='ward')
model = H_clus.fit(features)
directory = "\\PickledData\\"+str(math.floor(datetime.datetime.now().timestamp()))+"modelstate.bin"
model = pickle.dump(model,open(currentDirectory +directory , "wb"))
print(directory)