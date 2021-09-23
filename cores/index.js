String.prototype.shuffle = function () {
    var a = this.split(""), n = a.length;
    for (var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}
String.prototype.capitalize = function (all) {
    var a = this.trim(""), func = function (t) { return t.charAt(0).toUpperCase() + t.slice(1) };
    return all ? a.split(" ").map(func).join(" ") : func(a);
}
String.prototype.toNumeric = function () {
    return this.replace(/[^0-9\,]/g, "");
}
String.prototype.isEmail = function () {
    return (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(this.toLowerCase());
}