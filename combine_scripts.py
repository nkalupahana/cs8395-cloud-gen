import argparse
import glob
import itertools
import json
import os.path
import sys

for pair in [("dynamo", "s3"), ("dynamo", "sqs"), ("s3", "sqs")]:
    for i in range(3):
        for j in range(3):
            file1 = open(f"scripts/basic-{pair[0]}-{i}.py").read()
            file2 = open(f"scripts/basic-{pair[1]}-{j}.py").read()
            file = file1 + "\n" + file2
            open(f"scripts/inter-{pair[0]}-{i}-{pair[1]}-{j}.py", "w").write(file)

for i in range(9):
    file1 = open(f"scripts/basic-dynamo-{i}.py").read()
    file2 = open(f"scripts/basic-s3-{i}.py").read()
    file3 = open(f"scripts/basic-sqs-{i}.py").read()
    file = file1 + "\n" + file2 + "\n" + file3
    open(f"scripts/adv-{i}.py", "w").write(file)