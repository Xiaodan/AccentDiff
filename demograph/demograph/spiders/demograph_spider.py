import scrapy
import json
from demograph.items import DemographItem

class DemoSpider(scrapy.Spider):
    name = "demo"
    allowed_domains = ["accent.gmu.edu"]
    base_url = "http://accent.gmu.edu/browse_language.php?function=detail&speakerid="
    start_urls = []
    start_urls.append(base_url+"239")
    start_urls.append(base_url+"240")
    start_urls.append(base_url+"241")

    def parse(self, response):

        item = DemographItem()
        unique_id = str(response.xpath('//div[@id="translation"]/h5/em/text()').extract()[0])
        result = response.xpath('//ul[@class="bio"]/li')
        bio_data = result.xpath('em/following-sibling::text()').extract()
        audio = str(response.xpath("//embed/@src").extract()[0])

        for i in range(0, len(bio_data)):
            bio_data[i] = str(bio_data[i]).strip()
        links = result.xpath('a/text()').extract()

        for i in range(0, len(links)):
            links[i] = str(links[i]).strip()
       
        item['birth_place'] = bio_data[0]
        item['native_language'] = links[1]
        item['other_language'] = bio_data[3]
        age_gender = bio_data[4].split(", ")
        item['age'] = age_gender[0]
        item['gender'] = age_gender[1]
        item['age_of_english_onset'] = bio_data[5]
        item['enlish_learning_method'] = bio_data[6]
        item['english_residence'] = bio_data[7]
        item['length_of_english_residence'] = bio_data[8] 
        item['audio_link'] = audio
        item['unique_id'] = unique_id

        yield item
       

        # Output a file containing the original data.
        # with open('../DATA/biographies.txt', 'a') as f:
        #    f.write(item)
        

