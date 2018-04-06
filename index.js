function Promise(func) {
    this.promiseStr = 'pending'
    var self = this;
    var funcString = func.toString();
    funcString = funcString.replace(/resolve\((.*)\)/ig, function (m, p1) {
        return m + ';_resolve(' + p1 + ')'
    })
    eval('!' + funcString + '(function(){})');

    function _resolve(param) {
        self.promiseStr = 'resolved'
        self._resolve(param)
    }
}

Promise.prototype.then = function (resolve, reject) {
    if (typeof resolve != 'function' || typeof reject != 'function') return;

    if (this.promiseStr == 'resolved') {
        resolve(this.resolved)
    }

    if (this.promiseStr == 'pending') {
        this._resolve = resolve;
    }
}

Promise.prototype._resolve = function (res) {
    this.resolved = res;
}

var p = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve('hohoho')
    }, 3000)
})

p.then(function (res) {
    alert(res)
}, function () {

})
