from langchain.llms import OpenAI
from langchain.prompts import PromptTemplate

import argparse
import glob
import itertools
import json
import os.path
import sys

llm = OpenAI(max_tokens=2048)
# Test generation prompt
stack_prompt = PromptTemplate.from_template("""Create an AWS CDK Stack class in TypeScript that creates the following resources:
{code}

```""")

for function in itertools.chain(glob.glob("infra/*.txt")):
    if "__init__" in function:
        continue

    filename = function.replace("infra/", "").replace(".txt", "")
    if os.path.isfile(f"stacks/{filename}.ts"):
        print(f"Skipping {filename}, test already exists.")
        continue

    # Get code and create prompt
    print(f"Generating stack for {function}.")
    with open(function) as f:
        code = f.read()
    code_prompt = stack_prompt.format(code=code)
    
    # Generate tests and clean up output
    output = llm.predict(code_prompt)
    output = output.replace("```ts", "").replace("```typescript", "").replace("```", "").strip()

    # Write out final code
    with open(f"stacks/{filename}.ts", "w") as f:
        f.write(output)