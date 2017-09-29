
function deepKeyFind(key, object) {
    if (object[key]) {
        return object[key];
    }
    for (let k of Object.keys(object)) {
        if (typeof object[k] === 'object') {
            return deepKeyFind(key, object[k]);
        }
    }
}

module.exports.deepKeyFind = deepKeyFind;