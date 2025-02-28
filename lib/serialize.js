"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Encodes a date as a string in YYYY-MM-DD format.
 *
 * @param {Date} date
 * @return {String} the encoded date
 */
function encodeDate(date) {
    if (date == null) {
        return undefined;
    }
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    return year + "-" + (month < 10 ? "0" + month : month) + "-" + (day < 10 ? "0" + day : day);
}
exports.encodeDate = encodeDate;
/**
 * Converts a date in the format 'YYYY-mm-dd...' into a proper date, because
 * new Date() does not do that correctly. The date can be as complete or incomplete
 * as necessary (aka, '2015', '2015-10', '2015-10-01').
 * It will not work for dates that have times included in them.
 *
 * If an array is provided, only the first entry is used.
 *
 * @param  {String} input String date form like '2015-10-01'
 * @return {Date} parsed date
 */
function decodeDate(input) {
    if (input == null || !input.length) {
        return undefined;
    }
    var dateString = input instanceof Array ? input[0] : input;
    if (dateString == null || !dateString.length) {
        return undefined;
    }
    var parts = dateString.split('-');
    // may only be a year so won't even have a month
    if (parts[1] != null) {
        parts[1] -= 1; // Note: months are 0-based
    }
    else {
        // just a year, set the month and day to the first
        parts[1] = 0;
        parts[2] = 1;
    }
    var decoded = new (Date.bind.apply(Date, [void 0].concat(parts)))();
    if (isNaN(decoded.getTime())) {
        return undefined;
    }
    return decoded;
}
exports.decodeDate = decodeDate;
/**
 * Encodes a boolean as a string. true -> "1", false -> "0".
 *
 * @param {Boolean} bool
 * @return {String} the encoded boolean
 */
function encodeBoolean(bool) {
    if (bool === undefined) {
        return undefined;
    }
    return bool ? '1' : '0';
}
exports.encodeBoolean = encodeBoolean;
/**
 * Decodes a boolean from a string. "1" -> true, "0" -> false.
 * Everything else maps to undefined.
 *
 * If an array is provided, only the first entry is used.
 *
 * @param {String} input the encoded boolean string
 * @return {Boolean} the boolean value
 */
function decodeBoolean(input) {
    if (input == null) {
        return undefined;
    }
    var boolStr = input instanceof Array ? input[0] : input;
    if (boolStr === '1') {
        return true;
    }
    else if (boolStr === '0') {
        return false;
    }
    return undefined;
}
exports.decodeBoolean = decodeBoolean;
/**
 * Encodes a number as a string.
 *
 * @param {Number} num
 * @return {String} the encoded number
 */
function encodeNumber(num) {
    if (num == null) {
        return undefined;
    }
    return String(num);
}
exports.encodeNumber = encodeNumber;
/**
 * Decodes a number from a string. If the number is invalid,
 * it returns undefined.
 *
 * If an array is provided, only the first entry is used.
 *
 * @param {String} input the encoded number string
 * @return {Number} the number value
 */
function decodeNumber(input) {
    if (input == null) {
        return undefined;
    }
    var numStr = input instanceof Array ? input[0] : input;
    if (numStr == null || numStr === '') {
        return undefined;
    }
    var result = +numStr;
    if (isNaN(result)) {
        return undefined;
    }
    return result;
}
exports.decodeNumber = decodeNumber;
/**
 * Encodes a string while safely handling null and undefined values.
 *
 * @param {String} str a string to encode
 * @return {String} the encoded string
 */
function encodeString(str) {
    if (str == null) {
        return undefined;
    }
    return String(str);
}
exports.encodeString = encodeString;
/**
 * Decodes a string while safely handling null and undefined values.
 *
 * If an array is provided, only the first entry is used.
 *
 * @param {String} input the encoded string
 * @return {String} the string value
 */
function decodeString(input) {
    if (input == null) {
        return undefined;
    }
    var str = input instanceof Array ? input[0] : input;
    if (str == null) {
        return undefined;
    }
    return String(str);
}
exports.decodeString = decodeString;
/**
 * Encodes anything as a JSON string.
 *
 * @param {Any} any The thing to be encoded
 * @return {String} The JSON string representation of any
 */
function encodeJson(any) {
    if (any == null) {
        return undefined;
    }
    return JSON.stringify(any);
}
exports.encodeJson = encodeJson;
/**
 * Decodes a JSON string into javascript
 *
 * If an array is provided, only the first entry is used.
 *
 * @param {String} input The JSON string representation
 * @return {Any} The javascript representation
 */
function decodeJson(input) {
    if (input == null) {
        return undefined;
    }
    var jsonStr = input instanceof Array ? input[0] : input;
    if (!jsonStr) {
        return undefined;
    }
    var result;
    try {
        result = JSON.parse(jsonStr);
    }
    catch (e) {
        /* ignore errors, returning undefined */
    }
    return result;
}
exports.decodeJson = decodeJson;
/**
 * Encodes an array as a JSON string.
 *
 * @param {Array} array The array to be encoded
 * @return {String[]} The array of strings to be put in the URL
 * as repeated query parameters
 */
function encodeArray(array) {
    if (!array) {
        return undefined;
    }
    return array;
}
exports.encodeArray = encodeArray;
/**
 * Decodes an array or singular value and returns it as an array
 * or undefined if falsy. Filters out undefined values.
 *
 * @param {String | Array} input The input value
 * @return {Array} The javascript representation
 */
function decodeArray(input) {
    if (!input) {
        return undefined;
    }
    if (!(input instanceof Array)) {
        return [input];
    }
    return input
        .map(function (item) { return (item === '' ? undefined : item); })
        .filter(function (item) { return item !== undefined; });
}
exports.decodeArray = decodeArray;
/**
 * Encodes a numeric array as a JSON string.
 *
 * @param {Array} array The array to be encoded
 * @return {String[]} The array of strings to be put in the URL
 * as repeated query parameters
 */
function encodeNumericArray(array) {
    if (!array) {
        return undefined;
    }
    return array.map(function (d) { return "" + d; });
}
exports.encodeNumericArray = encodeNumericArray;
/**
 * Decodes an array or singular value and returns it as an array
 * or undefined if falsy. Filters out undefined and NaN values.
 *
 * @param {String | Array} input The input value
 * @return {Array} The javascript representation
 */
function decodeNumericArray(input) {
    var arr = decodeArray(input);
    if (!arr) {
        return undefined;
    }
    return arr
        .map(function (item) { return +item; })
        .filter(function (item) { return item !== undefined && !isNaN(item); });
}
exports.decodeNumericArray = decodeNumericArray;
/**
 * Encodes an array as a delimited string. For example,
 * ['a', 'b'] -> 'a_b' with entrySeparator='_'
 *
 * @param array The array to be encoded
 * @param entrySeparator The string used to delimit entries
 * @return The array as a string with elements joined by the
 * entry separator
 */
function encodeDelimitedArray(array, entrySeparator) {
    if (entrySeparator === void 0) { entrySeparator = '_'; }
    if (!array) {
        return undefined;
    }
    return array.join(entrySeparator);
}
exports.encodeDelimitedArray = encodeDelimitedArray;
/**
 * Decodes a delimited string into javascript array. For example,
 * 'a_b' -> ['a', 'b'] with entrySeparator='_'
 *
 * If an array is provided as input, only the first entry is used.
 *
 * @param {String} input The JSON string representation
 * @param entrySeparator The array as a string with elements joined by the
 * entry separator
 * @return {Array} The javascript representation
 */
function decodeDelimitedArray(input, entrySeparator) {
    if (entrySeparator === void 0) { entrySeparator = '_'; }
    if (input == null) {
        return undefined;
    }
    var arrayStr = input instanceof Array ? input[0] : input;
    if (!arrayStr) {
        return undefined;
    }
    return arrayStr
        .split(entrySeparator)
        .map(function (item) { return (item === '' ? undefined : item); })
        .filter(function (item) { return item !== undefined; });
}
exports.decodeDelimitedArray = decodeDelimitedArray;
/**
 * Encodes a numeric array as a delimited string. (alias of encodeDelimitedArray)
 * For example, [1, 2] -> '1_2' with entrySeparator='_'
 *
 * @param {Array} array The array to be encoded
 * @return {String} The JSON string representation of array
 */
exports.encodeDelimitedNumericArray = encodeDelimitedArray;
/**
 * Decodes a delimited string into javascript array where all entries are numbers
 * For example, '1_2' -> [1, 2] with entrySeparator='_'
 *
 * If an array is provided as input, only the first entry is used.
 *
 * @param {String} jsonStr The JSON string representation
 * @return {Array} The javascript representation
 */
function decodeDelimitedNumericArray(arrayStr, entrySeparator) {
    if (entrySeparator === void 0) { entrySeparator = '_'; }
    var decoded = decodeDelimitedArray(arrayStr, entrySeparator);
    if (!decoded) {
        return undefined;
    }
    return decoded
        .map(function (d) { return (d == null ? undefined : +d); })
        .filter(function (d) { return d !== undefined && !isNaN(d); });
}
exports.decodeDelimitedNumericArray = decodeDelimitedNumericArray;
/**
 * Encode simple objects as readable strings. Works only for simple,
 * flat objects where values are numbers, strings.
 *
 * For example { foo: bar, boo: baz } -> "foo-bar_boo-baz"
 *
 * @param {Object} object The object to encode
 * @param {String} keyValSeparator="-" The separator between keys and values
 * @param {String} entrySeparator="_" The separator between entries
 * @return {String} The encoded object
 */
function encodeObject(obj, keyValSeparator, entrySeparator) {
    if (keyValSeparator === void 0) { keyValSeparator = '-'; }
    if (entrySeparator === void 0) { entrySeparator = '_'; }
    if (!obj || !Object.keys(obj).length) {
        return undefined;
    }
    return Object.keys(obj)
        .map(function (key) { return "" + key + keyValSeparator + obj[key]; })
        .join(entrySeparator);
}
exports.encodeObject = encodeObject;
/**
 * Decodes a simple object to javascript. Currently works only for simple,
 * flat objects where values are strings.
 *
 * For example "foo-bar_boo-baz" -> { foo: bar, boo: baz }
 *
 * If an array is provided as input, only the first entry is used.
 *
 * @param {String} input The object string to decode
 * @param {String} keyValSeparator="-" The separator between keys and values
 * @param {String} entrySeparator="_" The separator between entries
 * @return {Object} The javascript object
 */
function decodeObject(input, keyValSeparator, entrySeparator) {
    if (keyValSeparator === void 0) { keyValSeparator = '-'; }
    if (entrySeparator === void 0) { entrySeparator = '_'; }
    if (input == null) {
        return undefined;
    }
    var objStr = input instanceof Array ? input[0] : input;
    if (!objStr || !objStr.length) {
        return undefined;
    }
    var obj = {};
    objStr.split(entrySeparator).forEach(function (entryStr) {
        var _a = entryStr.split(keyValSeparator), key = _a[0], value = _a[1];
        obj[key] = value === '' ? undefined : value;
    });
    return obj;
}
exports.decodeObject = decodeObject;
/**
 * Encode simple objects as readable strings. Alias of encodeObject.
 *
 * For example { foo: 123, boo: 521 } -> "foo-123_boo-521"
 *
 * @param {Object} object The object to encode
 * @param {String} keyValSeparator="-" The separator between keys and values
 * @param {String} entrySeparator="_" The separator between entries
 * @return {String} The encoded object
 */
exports.encodeNumericObject = encodeObject;
/**
 * Decodes a simple object to javascript where all values are numbers.
 * Currently works only for simple, flat objects.
 *
 * For example "foo-123_boo-521" -> { foo: 123, boo: 521 }
 *
 * If an array is provided as input, only the first entry is used.
 *
 * @param {String} input The object string to decode
 * @param {String} keyValSeparator="-" The separator between keys and values
 * @param {String} entrySeparator="_" The separator between entries
 * @return {Object} The javascript object
 */
function decodeNumericObject(input, keyValSeparator, entrySeparator) {
    if (keyValSeparator === void 0) { keyValSeparator = '-'; }
    if (entrySeparator === void 0) { entrySeparator = '_'; }
    var decoded = decodeObject(input, keyValSeparator, entrySeparator);
    if (!decoded) {
        return undefined;
    }
    // convert to numbers
    Object.keys(decoded).forEach(function (key) {
        if (decoded[key] !== undefined) {
            decoded[key] = decodeNumber(decoded[key]);
        }
    });
    return decoded;
}
exports.decodeNumericObject = decodeNumericObject;
