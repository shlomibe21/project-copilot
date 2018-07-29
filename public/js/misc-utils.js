'use strict';

function getParamValFromUrl(url, key) {
    let queryStr = url.slice(1);
    if(!queryStr) {
        return;
    }
	let params = queryStr.split('&');
	for (let i = 0; i < params.length; i++) {
        let pair = params[i].split('=');
        if(pair[0] === key) {
            return pair[1];
        }
    }
}