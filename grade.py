import subprocess
import itertools
import glob
import json
import copy
import sys

main_worked = 0
main_total = 0
saved_results = []
saved_resources = []

for stack_root in ["lambda_stacks"]:
    results = {
        "basic": {
            "cantfind": 0,
            "extra": 0,
            "compilefailed": 0,
            "permsmissing": 0
        },
        "inter": {
            "cantfind": 0,
            "extra": 0,
            "compilefailed": 0,
            "permsmissing": 0
        },
        "adv": {
            "cantfind": 0,
            "extra": 0,
            "compilefailed": 0,
            "permsmissing": 0
        }
    }

    resources = {
        "basic": 0,
        "inter": 0,
        "adv": 0
    }

    for stack_path in itertools.chain(glob.glob(f"{stack_root}/*.ts")):
        print(stack_path)
        filename = stack_path.replace(f"{stack_root}/", "").replace(".ts", "")

        ground_truth = ""
        level = ""
        if "basic" in filename:
            level = "basic"
            ground_truth = open(f"ground_truth/{filename}.txt").read().strip()
        elif "inter" in filename:
            level = "inter"
            split_name = filename.split("-")
            file1 = f"basic-{split_name[1]}-{split_name[2]}.txt"
            file2 = f"basic-{split_name[3]}-{split_name[4].removesuffix('.ts')}.txt"
            ground_truth = open(f"ground_truth/{file1}").read().strip() + "\n"
            ground_truth += open(f"ground_truth/{file2}").read().strip()
        elif "adv" in filename:
            level = "adv"
            num = filename.removeprefix("adv-").removesuffix(".ts")
            ground_truth = open(f"ground_truth/basic-dynamo-{num}.txt").read().strip() + "\n"
            ground_truth += open(f"ground_truth/basic-s3-{num}.txt").read().strip() + "\n"
            ground_truth += open(f"ground_truth/basic-sqs-{num}.txt").read().strip()
        else:
            raise ValueError("Could not determine level!")

        ground_truth = ground_truth.split("\n")
        orig_ground_truth = copy.deepcopy(ground_truth)
        if "lambda" in stack_root:
            ground_truth.append("lambda")
        resources[level] += len(ground_truth)

        # Generate CDK
        child = subprocess.Popen(f"cdk synth --app 'npx ts-node {filename}.ts'", cwd=stack_root, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
        child.wait()
        if child.returncode != 0:
            print("CDK COMPILATION ERROR")
            results[level]["compilefailed"] += len(ground_truth)
            continue
        
        tree = json.loads(open(f"{stack_root}/cdk.out/tree.json").read())
        tree = tree["tree"]["children"]["CdkStack"]["children"]

        del tree["CDKMetadata"]
        if "lambda" in stack_root:
            del tree["AssetParameters"]

        for id in tree:
            resource_type = tree[id]["children"]["Resource"]["attributes"]["aws:cdk:cloudformation:type"]
            if resource_type == "AWS::DynamoDB::Table":
                table_name = id
                if "tableName" in tree[id]["children"]["Resource"]["attributes"]["aws:cdk:cloudformation:props"]:
                    table_name = tree[id]["children"]["Resource"]["attributes"]["aws:cdk:cloudformation:props"]["tableName"]
                
                try:
                    ground_truth.remove(f"table {table_name}")
                except ValueError:
                    print(f"-1 resource {table_name} should not exist")
                    results[level]["extra"] += 1
            elif resource_type == "AWS::S3::Bucket":
                bucket_name = id
                if "bucketName" in tree[id]["children"]["Resource"]["attributes"]["aws:cdk:cloudformation:props"]:
                    bucket_name = tree[id]["children"]["Resource"]["attributes"]["aws:cdk:cloudformation:props"]["bucketName"]
                
                try:
                    ground_truth.remove(f"bucket {bucket_name}")
                except ValueError:
                    print(f"-1 resource {bucket_name} should not exist")
                    results[level]["extra"] += 1
            elif resource_type == "AWS::SQS::Queue":
                queue_name = id
                if "queueName" in tree[id]["children"]["Resource"]["attributes"]["aws:cdk:cloudformation:props"]:
                    queue_name = tree[id]["children"]["Resource"]["attributes"]["aws:cdk:cloudformation:props"]["queueName"]
                
                try:
                    ground_truth.remove(f"queue {queue_name}")
                except ValueError:
                    print(f"-1 resource {queue_name} should not exist")
                    results[level]["extra"] += 1
            elif resource_type == "AWS::Lambda::Function":
                if "ServiceRole" in tree[id]["children"]:
                    service_role = json.dumps(tree[id]["children"]["ServiceRole"])
                    for infra in orig_ground_truth:
                        typ, _ = infra.split(" ")
                        if typ == "queue":
                            if "sqs:" not in service_role:
                                print(f"-1 missing sqs permissions")
                                results[level]["permsmissing"] += 1
                        elif typ == "table":
                            if "dynamodb:" not in service_role:
                                print(f"-1 missing dynamodb permissions")
                                results[level]["permsmissing"] += 1
                        elif typ == "bucket":
                            if "s3:" not in service_role:
                                print(f"-1 missing s3 permissions")
                                results[level]["permsmissing"] += 1
                        else:
                            raise ValueError("Unknown resource type!")
                
                try:
                    ground_truth.remove("lambda")
                except ValueError:
                    print(f"-1 resource lambda should not exist")
                    results[level]["extra"] += 1
            elif resource_type == "AWS::IAM::Role":
                continue
            else:
                raise ValueError("Unknown resource type!")

        extra_resources = len(ground_truth)
        if extra_resources > 0:
            print(f"-{extra_resources} couldn't find", ground_truth)
            results[level]["cantfind"] += extra_resources

        sys.stdout.flush()

    print(results)
    print(resources)
    main_total = sum(resources.values())
    main_worked = sum(resources.values()) - results["basic"]["cantfind"] - results["inter"]["cantfind"] - results["adv"]["cantfind"] - results["basic"]["compilefailed"] - results["inter"]["compilefailed"] - results["adv"]["compilefailed"]
    saved_results.append(results)
    saved_resources.append(resources)

with open("output.json", "w") as f:
    end = {
        "output": main_worked / main_total,
        "results": saved_results,
        "resources": saved_resources
    }
    
    f.write(json.dumps(end))