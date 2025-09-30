#!/bin/bash
# deployment.sh - Deploys the build folder to a remote EC2 instance

# Usage: ./deployment.sh <EC2_USER> <EC2_HOST> <PEM_FILE_PATH> <REMOTE_PATH>
# Example: ./deployment.sh ec2-user ec2-xx-xx-xx-xx.compute-1.amazonaws.com ~/my-key.pem /home/ec2-user/app

set -e

if [ "$#" -ne 4 ]; then
  echo "Usage: $0 <EC2_USER> <EC2_HOST> <PEM_FILE_PATH> <REMOTE_PATH>"
  exit 1
fi

EC2_USER=$1
EC2_HOST=$2
PEM_FILE=$3
REMOTE_PATH=$4

ARCHIVE_NAME=build.tar.gz

# Archive the build folder

tar -czf $ARCHIVE_NAME build/

echo "Uploading $ARCHIVE_NAME to $EC2_USER@$EC2_HOST:$REMOTE_PATH ..."

scp -i "$PEM_FILE" $ARCHIVE_NAME "$EC2_USER@$EC2_HOST:$REMOTE_PATH/"

# SSH into the EC2 instance and extract the build folder
ssh -i "$PEM_FILE" "$EC2_USER@$EC2_HOST" "cd $REMOTE_PATH && tar -xzf $ARCHIVE_NAME && rm $ARCHIVE_NAME"

echo "Deployment complete."
