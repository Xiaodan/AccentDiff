# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: http://doc.scrapy.org/en/latest/topics/item-pipeline.html
from scrapy.contrib.pipeline.media import MediaPipeline
from scrapy.http.request import Request
import os
import urllib

"""
class DemographPipeline(object):
    def process_item(self, item, spider):
        return item
"""

class DemographPipeline(MediaPipeline):

    VIDEOS_DIR = "../DATA/MOV"

    def get_media_requests(self, item, info):
                
        #os.system("vlc -vvv %s > /dev/null 2>&1 &" % item['video_url'][0])
        return Request(item["audio_link"], meta={"item":item})
    

    def media_downloaded(self, response, request, info):
        """
        File is downloaded available as response.body save it.
        """
        item = response.meta.get("item")
        video = response.body
        video_basename = item['audio_link'].split('/')[-1]
        url = item['audio_link']

        new_filename = os.path.join(self.VIDEOS_DIR, video_basename)
        urllib.urlretrieve(url, new_filename)
        return item
