
var WordCount = function () {
    
    // Uncomprehensive list of stop words
    var stoplist = ["a", "am", "an", "and", "as", "at", "be", "by", "has", "i", "in", "is", "it", "of", "on", "so", "than", "that", "the", "then", "this", "to", "we", "will"];
    
    function bsearch (items, word) {
        var low = 0,
            high = items.length - 1;
        while (low <= high) {
            var mid = Math.floor(low + ((high - low) / 2)),
                val = items[mid];
            if (val < word) {
                low = mid + 1;
            } else if (val > word) {
                high = mid - 1;
            } else 
                return mid; // found
        }
        return -1; // not found
    }
    
    return {
        
        // "word" is valid IF it is not on the stop list
        isValid: function (word) {
            if (!word) { return 0; }

            var result = bsearch(stoplist, word);
            return (result === -1) ? 1 : 0; 
        },
        
        mapWords: function (v) {
            var w = v.values[0].data.toLowerCase().match(/\w+/g),
                r = [];
            var i, len;
            for (i = 0, len = w.length; i < len; i += 1) {
                if (this.isValid(w[i])) {
                    var o = {};
                    o[w[i]] = 1;
                    r.push(o);
                }
            }
            return r;
        },
        
        reduceWords: function (v) {
            var r = {}, i, len, w;
            for (i = 0, len = v.length; i < len; i += 1) {
                for (w in v[i]) {
                    if (v[i].hasOwnProperty(w)) {
                        if (r[w]) { r[w] += v[i][w]; }
                        else { r[w] = v[i][w]; }
                    }
                }
            }
            return [r];
        }
    }; 
}();