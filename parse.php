<?php

require 'vendor/autoload.php';
use Symfony\Component\DomCrawler\Crawler;

$client = new GuzzleHttp\Client();

$res = $client->request('GET', 'https://bookmakersrating.ru/news_homepage/');

$res->getBody();
$crawler = new Crawler($res->getBody()->getContents());

$filter = $crawler->filterXPath('//*[@class="block-content"]');
$result = array();

if (iterator_count($filter) > 1) {
    foreach ($filter as $i => $content) {
        $crawler = new Crawler($content);
        $result[$i] = array(
            'heading' => $crawler->filterXPath('//*[@class="post-heading"]/h2')->text(),
            'img' => $crawler->filterXPath('//*[@class="image"]')->attr('style'),
            'meta' => $crawler->filterXPath('//*[@class="text-fade"]')->text()
        );
    }
}

shuffle($result);

$result = array_slice($result, 0, 6);


echo json_encode($result);