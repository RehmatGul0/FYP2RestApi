import math
import os
import pandas as pd
import numpy as np
import sys

cwd = os.getcwd()
file = sys.argv[1]
dataset = pd.read_csv(cwd +'\\'+file)
for columnName in dataset.columns.values:
    factor = 3
    upper_lim = dataset[columnName].mean() + dataset[columnName].std() * factor
    lower_lim = dataset[columnName].mean() - dataset[columnName].std() * factor
    dataset= dataset[(dataset[columnName] <= upper_lim) & (dataset[columnName] >= lower_lim)]
print('200')