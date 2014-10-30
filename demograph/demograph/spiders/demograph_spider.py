import scrapy
import string
from demograph.items import DemographItem

class DemoSpider(scrapy.Spider):
    name = "demo"
    allowed_domains = ["pronto.com"]
    base_url = "http://www.pronto.com/brands/"
    # There are 27 pages we need to crawl in total.
    start_urls = []
    start_urls.append(base_url + "num")
    a_to_z = string.lowercase
    for each_char in a_to_z:
        start_urls.append(base_url + each_char)


    def parse(self, response):
        brand_name_dict = {}
        # The div classes we use are based on the website source. 
        for sel in response.xpath('//div[@class="brandStoresAlphaList clearfix"]/ul/li'):
            item = DemographItem()
            item['brand_name'] = sel.xpath('a/text()').extract()
            item['link'] = sel.xpath('a/@href').extract()
            yield item

            # Output a file containing the original data.
            with open('valid_brand_list.txt', 'a') as f:
                f.write('{0}\n'.format(str(item['brand_name'][0])))
        

