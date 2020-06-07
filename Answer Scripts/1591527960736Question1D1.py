import math
import pickle
import sys
import pandas as pd
import numpy as np
import os


# Function for Q1
def find_Sections():
    currentDirectory = os.getcwd()
    resultFile = sys.argv[1];
    studentsData = pd.read_csv(currentDirectory +'\\'+resultFile)
    avg_performers = studentsData[studentsData['Cluster'] == 0]
    best_performers = studentsData[studentsData['Cluster'] == 1]
    poor_performers = studentsData[studentsData['Cluster'] == 2]
    avg_performers_count = avg_performers.count().Cluster
    best_performers_count = best_performers.count().Cluster
    poor_performers_count = poor_performers.count().Cluster
    total_students = studentsData.count().Cluster
    students_per_sec = int(sys.argv[2])
    total_sections = math.ceil(total_students / int(students_per_sec))
    ratio_for_avg = avg_performers_count / total_students
    ratio_for_best = best_performers_count / total_students
    ratio_for_poor = poor_performers_count / total_students
    Avg_in_sec_count = math.floor(ratio_for_avg * int(students_per_sec))
    Best_in_sec_count = math.floor(ratio_for_best * int(students_per_sec))
    Poor_in_sec_count = math.floor(ratio_for_poor * int(students_per_sec))
    if os.path.exists(currentDirectory + '\\'+resultFile):
        os.remove(currentDirectory + '\\'+resultFile)
    for no_of_sec in range(0, total_sections):
        Section = avg_performers.iloc[:Avg_in_sec_count].append(best_performers.iloc[:Best_in_sec_count]).append(
            poor_performers.iloc[:Poor_in_sec_count])
        SectionName = 'Section ' + str(no_of_sec + 1)
        Section_file = open(currentDirectory + '\\'+resultFile, "a+")
        Section_file.write(SectionName)
        Section_file.close()
        Section.to_csv(currentDirectory + '\\'+resultFile, mode='a', header=Section.columns)
        avg_performers = avg_performers.iloc[Avg_in_sec_count:]
        best_performers = best_performers.iloc[Best_in_sec_count:]
        poor_performers = poor_performers.iloc[Poor_in_sec_count:]
    print(avg_performers)
    print(best_performers)
    print(poor_performers)
    if (not avg_performers.empty):
        avg_performers.to_csv(currentDirectory + '\\'+resultFile, mode='a', header=False)
        avg_performers = avg_performers[0:0]
    if (not best_performers.empty):
        best_performers.to_csv(currentDirectory + '\\'+resultFile, mode='a', header=False)
        best_performers = best_performers[0:0]
    if (not poor_performers.empty):
        poor_performers.to_csv(currentDirectory + '\\'+resultFile, mode='a', header=False)
        poor_performers = poor_performers[0:0]
    return 'Success'


status = find_Sections()
if (status == 'Success'):
    print('200')
