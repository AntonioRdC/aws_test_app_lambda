aws s3 mb s3://lambda-artifacts-12412412434

aws cloudformation package --template-file template.yaml --s3-bucket lambda-api --output-template-file out.yaml

aws cloudformation deploy --template-file out.yml --stack-name nodejs-apig --capabilities CAPABILITY_NAMED_IAM
