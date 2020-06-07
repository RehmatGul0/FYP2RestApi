import math
import os
import pandas as pd
import numpy as np
import sys
import json

cwd = os.getcwd()
file = sys.argv[1]
features = sys.argv[2]
dataset = pd.read_csv(cwd+'\\'+file)
if all(x in list(dataset.columns) for x in json.loads(features)):
    dataset = dataset[json.loads(features)]
    dataset.to_csv(file,index=False)
    print('200')
else:
    print('500')