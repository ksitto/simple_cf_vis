var express = require('express');
var router = express.Router();

var cfenv = require('cfenv'),
    elasticsearch = require('elasticsearch'),
    fs = require('fs'),
    Feed = require('../lib/feed'), //should require the normal feed project but that's broken so I'm using my patched version
    util = require('util');

var appEnv = cfenv.getAppEnv();
var esServiceCreds = appEnv.getServiceCreds(/elastic.*/);

var uri = esServiceCreds ? esServiceCreds["sslUri"] : "http://gopivotal:878f3325b1dd852f8756a86cf49a595b@fili-us-east-1.searchly.com";
var serverOptions = {
    host: uri,
    log: "debug",
};
var client = new elasticsearch.Client(serverOptions);

var _index = "keyword";
var _type = "record";

router.get('/', function(req, res, next) {
    var keyword = req.param('q');
    var format = req.param('format') || 'html';
    var results;
    client.search({
        index: _index,
        q: 'keyword:' + keyword
    }, function(error, response) {
        var records = [];
        if (response.hits && response.hits.hits) {
            response.hits.hits.forEach(function(item) {
                records.push(item);
            });
        }

        switch (format) {
            case 'html':
                res.render('search', {
                    title: keyword,
                    data: records
                });
                break;
            case 'atom':
                var feed = new Feed({
                    classification: "U",
                    ownerProducer: "USA",
                    id: "TODO",
                    title: 'Simple Query Results for CDR Atom Support: searchTerms="' + keyword + '"',
                    link: 'http://example.com/'
                });
                records.forEach(function(record) {
                    var item = {
                        classification: "U",
                        ownerProducer: "USA",
                        id: record._id,
                        date: new Date(record._source.date_updated),
                        title: record._source.keyword,
                        updated: new Date(record._source.date_updated),
                        link: util.format('%s/%s/%s/%s', uri, _index, _type, record._id),
                        //content: record._source,
                        score: record._score,
                        point: util.format('%s %s', record._source.location.lat, record._source.location.lon)
                    }
                    feed.addItem(item);
                });
                // Setting the appropriate Content-Type
                res.set('Content-Type', 'text/xml');

                // Sending the feed as a response
                res.send(feed.render('atom-1.0'));
                break;
            default:
                throw 'foo!';
        }
    });
});

router.get('/clear', function(req, res, next) {
    client.indices.delete({
        index: _index
    });
});

router.get('/load', function(req, res, next) {
    client.indices.create({
        index: _index,
        body: {
            "mappings": {
                "record": {
                    "properties": {
                        "keyword": {
                            "type": "string"
                        },
                        "date_updated": {
                            "type": "date",
                            "format": "date_time_no_millis"
                        },
                        "location": {
                            "type": "geo_point",
                        }
                    }
                }
            }
        }

    }, function(error, response) {
        fs.readFile('sample_data.json', 'utf8', function(err, data) {
            if (err) throw err;
            var sampleDataSet = JSON.parse(data).records.record;

            var body = [];

            sampleDataSet.forEach(function(item) {
                new_item = {
                    "keyword": item.keyword,
                    "date_updated": item.date_updated,
                    "location": {
                        "lat": parseFloat(item.latitude),
                        "lon": parseFloat(item.longitude)
                    }
                }
                console.info(new_item);
                body.push({
                    "index": {
                        "_index": _index,
                        "_type": _type
                    }
                });
                body.push(new_item);
            });

            client.bulk({
                body: body
            }, function(err, resp) {
                res.render('index', {
                    error: JSON.stringify(err),
                    result: JSON.stringify(resp)
                });
            })
        });
    })
});

router.get('/:keyword', function(req, res, next) {
    console.info('keyword search');
    client.search({
        index: _index,
        q: 'keyword:' + 'foo'
            //q: 'keyword:' + req.params.keyword
    }, function(error, response) {
        console.info(response);
    });
});


module.exports = router;
