Web Crawl The Speech Accent Archive
===================================

Scrapy Tutorial link: [Scrapy Tutorial](http://doc.scrapy.org/en/latest/intro/tutorial.html)  
Audio Source link: [Speech Accent Archive](http://accent.gmu.edu/)  

## Creating the demograph project
```sh
scrapy startproject demograph
```
This creates the `demograph` directory with the follwing contents:
```sh
demograph/
    scrapy.cfg
    demograph/
        __init__.py
        items.py
        pipelines.py
        settings.py
        spiders/
            __init__.py
```

## Defining the Item  
Edit the `items.py` file and add `birth_place`, `native_language`, `other_language`, `age`, `gender`, `age_of_english_onset`, `english_learning_method`, `english_residence`, `length_of_english_residence`, `audio_link` and `unique_id` fields. 

## Creating the Spider
Create a file named `demograph_spider.py` under the `spiders/` directory.  
Steps:   
1. Identify the Spider by giving it a name, `demo`.  
2. Fill in a list of URLs, `start_urls`, where the Spider will begin to crawl from.   
3. Modify the `parse()` method that parses the response data and extracts scraped data.   

#### Trying the Selectors in the Shell  
First, start a shell.
```sh
scrapy shell "http://accent.gmu.edu/browse_language.php?function=detail&speakerid=241"
```  
Now, we have the response fetched in a local `response` variable. We use this to test the pattern to pass in to the `xpath` method.  

## Pipeline for downloading audio files 
Since we want to save actual `.mov` files to local directory, we need to utilize Scrapy Media Pipeline.  
We need to modify the `pipelines.py` file.  
First, We create a class called `DemographPipeline` that is inherited from the `MediaPipeline` class.   
Next, we write two functions, `get_media_requests` and `media_downloaded` to save the files, where we use `urllib` library to retrieve them.    
## Crawling
Simply type the following command to the Terminal and the spider would start to work.
Make sure you are in the root directory, `demograph/`.

```sh
scrapy crawl demo
```
After running the above command, we download all MOV files we need to the `MOV/` folder under `DATA/`.

## Saving the Scraped Data 

Also make sure you are in the root directory, `demograph/` when you run the command. We want to save the scraped JSON data in `DATA/` folder. The following command not only downloads the MOV files, but it also generates a JSON file containing all scraped data.
```sh
scrapy crawl demo -o "../DATA/biography.json"
```
Then, a new file `biography.json` containing all scraped items, serialized in JSON is generated under the directory `DATA/` under `AccentDiff/`.

  
  