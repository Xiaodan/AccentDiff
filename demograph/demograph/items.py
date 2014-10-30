# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# http://doc.scrapy.org/en/latest/topics/items.html

import scrapy


class DemographItem(scrapy.Item):
    # define the fields for your item here like:
    
    birth_place = scrapy.Field()
    native_language = scrapy.Field()
    other_language = scrapy.Field()
    age = scrapy.Field()
    gender = scrapy.Field()
    age_of_english_onset = scrapy.Field()
    enlish_learning_method = scrapy.Field()
    english_residence = scrapy.Field()
    length_of_english_residence = scrapy.Field()
    
    pass
