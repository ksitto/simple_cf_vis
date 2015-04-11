var cfenv = require('cfenv'),
    elasticsearch = require('elasticsearch');

var appEnv = cfenv.getAppEnv();
var esServiceCreds = appEnv.getServiceCreds(/elastic.*/);

var uri = esServiceCreds ? esServiceCreds["sslUri"] : "http://gopivotal:878f3325b1dd852f8756a86cf49a595b@fili-us-east-1.searchly.com";
var serverOptions = {
    host: uri,
    log: "debug",
};


describe("ElasticSearch", function() {
    it("is there a server running at " + uri, function(done) {
        var client = new elasticsearch.Client(serverOptions);
	done();
    });
});

