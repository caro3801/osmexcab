function City(osmCity) {
    this.osmCity = osmCity;
}

City.prototype.getOsmId = function() {
    return this.osmCity.osm_id;
};

City.prototype.getName = function() {
    return this.osmCity.display_name;
};

City.prototype.getBoundaries = function() {
    return this.osmCity.geojson;
};

module.exports = City;