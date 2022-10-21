FROM python:alpine3.16

COPY server/ server/
COPY ui/ ui/

WORKDIR server

RUN pip install --upgrade pip
RUN pip install -r requirements.txt
