# Usage: ./mov_mp3.sh MOV/tamil2.mov MP3/tamil2.mp3

ffmpeg -i $1 -map 0:a $2
