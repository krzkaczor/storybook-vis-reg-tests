#!/bin/sh

# This script requires ffmpeg to be installed and present in PATH
# Requires attribute pointing to path of directory containing gifs to be converted

 for i in "$1/*.gif" ;
 do ffmpeg -i "$i" -b:v 0 -crf 25  -pix_fmt yuv420p $(basename "${i/.gif}").mp4; sleep 5 ;
 done
