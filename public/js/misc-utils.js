'use strict';

function getParamValFromUrl(url, key) {
    var queryStr = url.slice(1);
    if(!queryStr) {
        return;
    }
	var vars = queryStr.split('&');
	for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if(pair[0] === key) {
            return pair[1];
        }
    }
}