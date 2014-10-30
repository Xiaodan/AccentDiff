AccentDiff
==========

Compare the accent of different countries and regions. Data set from http://accent.gmu.edu
Description of the project can be seen at: https://www.youtube.com/watch?v=tgxDyflGskc

Add the following packages:
```sh
sudo apt-get install git-core make cmake gcc g++ libmad0-dev libsndfile1-dev \
  libgd2-xpm-dev libboost-filesystem-dev libboost-program-options-dev libboost-regex-dev
sudo apt-get install ffmpeg
sudo apt-get install ubuntu-restricted-extras
```

Install AudioWaveform:
----------------------
* Source: https://github.com/bbcrd/audiowaveform
* Make sure the gmock files are in the audiowaveform folder.

Run Program:
-----------
```sh
cd DATA
./genFiles.sh MOV/tamil2.mov
```

All the generated files will be in the various folders in DATA.

Contributors:
-------------
* Shubhanshu Mishra
* Sally Xiaodan Zhang
