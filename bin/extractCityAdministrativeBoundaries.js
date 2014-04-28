#!/usr/local/bin/node

var OsmCityServices = require('../src/osmCityServices');
var FileWriter = require('../src/fileWriter');
var SystemWriter = require('../src/systemWriter');

var argv = require('optimist')
    .usage('Usage: exPolyCom -c [city name]')
    .demand(['c'])
    .alias('c', 'city')
    .string('c')
    .alias('C', 'country_code')
    .string('C')
    .alias('f', 'file')
    .string('f')
    .alias('p', 'postal_code')
    .string('p')
    .argv;

var osmCityServices = new OsmCityServices();

var writer = null;
if(argv.f != null) {
    var fileName = '';
    if(argv.f) {
        fileName+=argv.f;
    } else {
        fileName+=argv.c;
        if(argv.C != null){
            fileName+='-'+argv.C;
        }
        if(argv.p != null){
            fileName+='-'+argv.p;
        }
        fileName+='.json';
    }
    writer = new FileWriter(fileName);
} else {
    writer = new SystemWriter();
}

osmCityServices.getCity(argv.c, argv.C, argv.p, function (city) {
    var output = {
        osm_id: city.getOsmId(),
        city_name: city.getName(),
        polygon: city.getBoundaries()
    };
    writer.write(output);
});

process.on('uncaughtException', function (err) {
    console.log(err);
    process.exit(1);
});

