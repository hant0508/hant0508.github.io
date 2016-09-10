#!/bin/bash

if [[ "$1" == "add" ]]
then
	s=`echo "$2" | tr ' ' '\n'`
	echo "$s" >> dic.txt
	sort -u dic.txt > dic.back
	cp dic.back dic.txt
	rm dic.back
elif [[ "$1" == "rm" ]]
then
	sed -i "/\<$2\>/d" dic.txt
else
	echo "add \"word\" or rm \"word\""
fi
