//### Problem 7. Parse URL
//*	Write a script that parses an URL address given in the format: `[protocol]://[server]/[resource]`
//and extracts from it the `[protocol]`, `[server]` and `[resource]` elements.
//*	Return the elements in a JSON object.
//    _Example:_
//|                 URL                  |                                     result                                     |
//|:------------------------------------:|:----------------------------------------------------------------------------------------:|
//| `http://telerikacademy.com/Courses/Courses/Details/239` |  { protocol: `http`, <br> server: `telerikacademy.com` <br> resource: `/Courses/Courses/Details/239` |


function parseUri (str) {
    var	o   = parseUri.options,
        m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
        uri = {},
        i   = 14;

    while (i--) uri[o.key[i]] = m[i] || "";

    uri[o.q.name] = {};
    uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
        if ($1) uri[o.q.name][$1] = $2;
    });

    return uri;
};

parseUri.options = {
    strictMode: false,
    key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
    q:   {
        name:   "queryKey",
        parser: /(?:^|&)([^&=]*)=?([^&]*)/g
    },
    parser: {
        strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
        loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
    }
};

var uri = parseUri('http://www.devbg.org/forum/index.php');
var parsed = {
    protocol: uri.protocol,
    server: uri.host,
    resource: uri.path};

console.log(parsed);

