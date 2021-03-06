import scrapy
import json
from demograph.items import DemographItem

class DemoSpider(scrapy.Spider):
    name = "demo"
    allowed_domains = ["accent.gmu.edu"]
    base_url = "http://accent.gmu.edu/browse_language.php?function=detail&speakerid="
    start_urls = []
    # India: tamil2, hindi2, poonchi1, kannada1
    for i in ['429', '587', '425', '228']:
        start_urls.append(base_url + i)
    # China: mandarin2, cantonese2, mandarin6, taiwanese2
    for i in ['257', '46', '261', '364']:
        start_urls.append(base_url + i)
    # United States: english32, english82, english105, english62
    for i in ['91', '146', '407', '124']:
        start_urls.append(base_url + i)
    # Russia: tatar1, russian8, russian4, russian9
    for i in ['368', '308', '304', '307']:
        start_urls.append(base_url + i)
    # Great Britain: english2, english108, english110, english306
    for i in ['77', '419', '421', '1093']:
        start_urls.append(base_url + i)
    # Japan: japanese1, japanese7
    for i in ['221', '227']:
        start_urls.append(base_url + i)
    # Australia: english152, english84, english3
    for i in ['529', '148', '88']:
        start_urls.append(base_url + i)
    # Brazil: portuguese10, portuguese1, portuguese9
    for i in ['282', '281', '290']:
        start_urls.append(base_url + i)
    # Kenya: kiswahili3
    for i in ['236']:
        start_urls.append(base_url + i)
    # Korea: korean2, korean3, korean4
    for i in ['239', '240', '241']:
        start_urls.append(base_url + i)

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
        

