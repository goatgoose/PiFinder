#!/bin/bash

sleep 30s

if [ -e /boot/id.txt ]
then
	IDENTITY=$(head -n 1 /boot/id.txt)
else
	IDENTITY="no_id.txt_found"
fi
HOSTNAME=$(hostname -I | tr ' ' ',')
MAC=$(ifconfig wlan0 | sed -n 5p | tr ' ' ',')

DATA="identity="$IDENTITY"&hostname="$HOSTNAME"&mac="$MAC
echo $DATA

curl http://www.goatgoose.com:5000/add_ips -d $DATA > "/tmp/rc_test.txt"

echo $IDENTITY >> "/tmp/rc_test.txt"
