
if (typeof LogAnalyzer === "undefined" || !LogAnalyzer) {
    var LogAnalyzer = {
        
        mapLogEntry: function (v) {
            var i, lines = v.values[0].data.split(/\r?\n/), 
                r = [];
                
            for (i = 0; i < lines.length; i += 1) {
                var match = /(?:GET|POST)\s([^\s]+)/.exec(lines[i]);
                if (match) {
                    var obj = {};
                    obj[match[1]] = 1;
                    r.push(obj);
                }
            }
            return r;
        },
        
        reduceLogEntry: function (v) {
            var i, j, r = {}, w;
            for (i = 0; i < v.length; i += 1) {
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
}