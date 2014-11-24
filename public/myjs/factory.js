secretApp.factory('Secret', function($http) {

    // var urlBase = "http://localhost:3000";
    var urlBase = "http://secretypost-prasanthc.rhcloud.com";
    // $http.defaults.headers.common['X-Auth-Key'] = "abc123";
    var jsonpSupport = "&callback=JSON_CALLBACK";
    var Secret = {};

    function toStringifyAndEncode(inp) {
        var input = JSON.stringify(inp);
        var encodedInput = btoa(input);
        return encodedInput;
    }

    Secret.getAllSecrets = function() {
        return $http.jsonp(urlBase + '/secrets');
    }

    Secret.getFiveSecrets = function(val) {
        var encodedData = toStringifyAndEncode(val);
        return $http.jsonp(urlBase + '/secrets/viewfive?input=' + encodedData + jsonpSupport);
    }

    Secret.viewSecret = function(val) {
        var encodedData = toStringifyAndEncode(val);
        return $http.jsonp(urlBase + '/secret/view?input=' + encodedData + jsonpSupport);
    }

    Secret.createSecret = function(val) {
        var encodedData = toStringifyAndEncode(val);
        return $http.jsonp(urlBase + '/secret/create?input=' + encodedData + jsonpSupport);
    }

    Secret.updateSecret = function(val) {
        var encodedData = toStringifyAndEncode(val);
        return $http.jsonp(urlBase + '/secret/update?input=' + encodedData + jsonpSupport);
    }

    Secret.deleteSecret = function(val) {
        var encodedData = toStringifyAndEncode(val);
        return $http.jsonp(urlBase + '/secret/delete?input=' + encodedData + jsonpSupport);
    }

    return Secret;

});
