import math
import os
import pandas as pd
import numpy as np
import sys

cwd = os.getcwd()
file = sys.argv[1]
dataset = pd.read_csv(cwd+'\\'+file)
numeric_Columns = list(dataset._get_numeric_data().columns)
for NumericalColumn in numeric_Columns:
  dataset[NumericalColumn] = dataset[NumericalColumn].replace(0, np.nan)
dataset = dataset.fillna(dataset.mean())
dataset = dataset.round(2)
dataset.to_csv(file,index=False)
print('200')