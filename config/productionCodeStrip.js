"use strict";

var loaderUtils = require("loader-utils");

function productionCodeStrip(content) {
    var options = loaderUtils.getOptions(this) || {};
    if (options.codeStrip) {
        var startComment = options.start || 'develblock:start';
        var endComment = options.end || 'develblock:end';
        var regexPattern = new RegExp("[\\t ]*\\/\\* ?" + startComment + " ?\\*\\/[\\s\\S]*?\\/\\* ?" + endComment + " ?\\*\\/[\\t ]*\\n?", "g");
        content = content.replace(regexPattern, '');
        if (this.cacheable) {
            this.cacheable(true);
        }
    }
    // if(options.images){
    //     content = content.replace(/images//g, 'https://www2.foodservicedirect.com/fsd-react/integration/build/images/');
    // }
    return content;
}

module.exports = productionCodeStrip;