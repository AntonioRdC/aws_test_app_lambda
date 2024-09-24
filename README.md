aws s3 mb s3://lambda-artifacts-12412412434

aws cloudformation package --template-file template.yaml --s3-bucket lambda-artifacts-12412412434 --output-template-file out.yaml

aws cloudformation deploy --template-file /home/cloudshell-user/aws_test_app_lambda/out.yaml --stack-name lambda-app-api --capabilities CAPABILITY_NAMED_IAM
