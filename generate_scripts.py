from langchain.llms import OpenAI
from langchain.prompts import PromptTemplate
from tqdm import tqdm

llm = OpenAI(max_tokens=2048)
for i in tqdm(range(10)):
    output = llm.predict("Generate a Python script that uses boto3 to access an SQS queue in some way. Feel free to reference specific resources by name, without regard for whether they exist. Be creative with resource names.")
    output = output.replace("```python", "").replace("```py", "").replace("```", "").strip()
    with open(f"scripts/basic-sqs-{i}.py", "w") as f:
        f.write(output)