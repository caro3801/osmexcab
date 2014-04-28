var URL = require('url');
var http = require('http');
var City = require('./city');

function OsmCityServices() {
    this.urlObject = {
        protocol:"http",
        hostname:"nominatim.openstreetmap.org",
        pathname:"search",
        query:{
            "accept-language":"fr,fr-fr;",
            format:"json",
            polygon_geojson:1
        }
    };
}
OsmCityServices.prototype.createUrl = function(cityName, countryCode, postalcode) {
    if(cityName === null){
        throw new Error('City name can not be null or empty');
    }
    this.urlObject.query.city = cityName;
    if(countryCode){
        this.urlObject.query.countrycodes = countryCode;
    }
    if(postalcode){
        this.urlObject.query.postalcode = postalcode;
    }
    return URL.format(this.urlObject);
};

OsmCityServices.prototype.getCity= function(cityName, countryCode, postalcode, callBack){
    var url = this.createUrl(cityName, countryCode, postalcode);
    http.get(url, function(res) {
        res.setEncoding('utf8');
        var data = "";
        res.on('data', function (chunk) {
            data+=chunk;
        });
        res.on('end', function() {
            var osmData = JSON.parse(data);
            var relations = [];
            for(var i = 0; i< osmData.length; i++) {
                var elem = osmData[i];
                if(elem.osm_type==="relation" && elem.type==="administrative"){
                    relations.push(elem);
                }
            }
            if(relations.length>1){
                throw new Error('Multi city match query, refine your query');
            }
            if(relations.length === 0){
                throw new Error('No city match query');
            }
            callBack(new City(relations[0]));
        })
    });
};
module.exports = OsmCityServices;