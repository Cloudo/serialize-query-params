"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var query_string_1 = require("query-string");
/**
 * remove query params that are nully or an empty strings.
 * note: these values are assumed to be already encoded as strings.
 */
function filterNully(query) {
    var filteredQuery = Object.keys(query).reduce(function (queryAccumulator, queryParam) {
        // get encoded value for this param
        var encodedValue = query[queryParam];
        // if it isn't null or empty string, add it to the accumulated obj
        if (encodedValue != null && encodedValue !== '') {
            queryAccumulator[queryParam] = encodedValue;
        }
        return queryAccumulator;
    }, {});
    return filteredQuery;
}
/**
 * Update a location, wiping out parameters not included in encodedQuery
 */
function updateLocation(encodedQuery, location) {
    var encodedSearchString = query_string_1.stringify(filterNully(encodedQuery));
    var newLocation = __assign({}, location, { key: "" + Date.now(), search: encodedSearchString.length ? "?" + encodedSearchString : '' });
    return newLocation;
}
exports.updateLocation = updateLocation;
/**
 * Update a location while retaining existing parameters
 */
function updateInLocation(encodedQueryReplacements, location) {
    // if a query is there, use it, otherwise parse the search string
    var currQuery = location.query || query_string_1.parse(location.search);
    var newQuery = __assign({}, currQuery, encodedQueryReplacements);
    return updateLocation(filterNully(newQuery), location);
}
exports.updateInLocation = updateInLocation;
