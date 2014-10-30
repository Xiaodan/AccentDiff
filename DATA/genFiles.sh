MOV_DIR="./MOV"
MP3_DIR="./MP3"
DAT_DIR="./DAT"
PNG_DIR="./PNG"
JSON_DIR="./JSON"

# Usage: ./mov_mp3.sh MOV/tamil2.mov MP3/tamil2.mp3
filename=$(basename "$1")
extension="${filename##*.}"
filename="${filename%.*}"


movfile="$1"
mp3file="$MP3_DIR/${filename}.mp3"
datfile="$DAT_DIR/${filename}.dat"
pngfile="$PNG_DIR/${filename}.png"
jsonfile="$JSON_DIR/${filename}.json"

ffmpeg -i $movfile -map 0:a $mp3file; # Get MP3 file from MOV
audiowaveform -i $mp3file -o $datfile -z 256 -b 8; # Get waveform data from MP3 in DAT file.
audiowaveform -i $datfile -o $pngfile -z 512 -s 0.0 -w 1200 -h 400 --background-color 000000 --waveform 69D2E7 --border-color FFFFFF --axis-label-color FFFFFF; # Convert DAT to PNG
audiowaveform -i $datfile -o $jsonfile; # Convert DAT file to JSON histogram data format.
