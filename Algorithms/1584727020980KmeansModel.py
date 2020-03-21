import pickle
import sys
import pandas as pd
import numpy as np
import os
from sklearn.cluster import KMeans

currentDirectory = os.getcwd()
path = sys.argv[1]
features = pd.read_csv(currentDirectory +'\\'+ path)
kmeans = KMeans(n_clusters=3 , init='random',max_iter=1000, n_init=10, random_state=5000);
model = kmeans.fit(features);
model = pickle.dumps(model)
print(model)