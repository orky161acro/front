#vars
tag=1
REPO=orky161
ORGANIZATION=acro
PROJECT=frontend
IMAGE=${REPO}/${ORGANIZATION}-${PROJECT}:${tag}

build:
	    @docker image build -t ${IMAGE} .

push:
	    @docker push ${IMAGE}

all: build push
