secretApp.factory('Secret', function($http) {

    var urlBase = "http://localhost:3000";
    $http.defaults.headers.common['X-Auth-Key'] = "abc123";

    var Secret = {};

    function toStringifyAndEncode(inp) {
        var input = JSON.stringify(inp);
        var encodedInput = btoa(input);
        return encodedInput;
    }

    Secret.getAllSecrets = function() {
        return $http.get(urlBase + '/secrets');
    }

    Secret.getFiveSecrets = function(val) {
        var encodedData = toStringifyAndEncode(val);
        return $http.get(urlBase + '/secrets/viewfive?input=' + encodedData);
    }

    Secret.viewSecret = function(val) {
        var encodedData = toStringifyAndEncode(val);
        return $http.get(urlBase + '/secret/view?input=' + encodedData);
    }

    Secret.createSecret = function(val) {
        var encodedData = toStringifyAndEncode(val);
        return $http.post(urlBase + '/secret/create?input=' + encodedData);
    }

    Secret.updateSecret = function(val) {
        var encodedData = toStringifyAndEncode(val);
        return $http.put(urlBase + '/secret/update?input=' + encodedData);
    }

    Secret.deleteSecret = function(val) {
        var encodedData = toStringifyAndEncode(val);
        return $http.delete(urlBase + '/secret/delete?input=' + encodedData);
    }

    return Secret;

});
