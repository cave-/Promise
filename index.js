function Promise(func) {
    var self = this;
    this.promiseStr = 'pending'

    function _resolve(param) {
        self.promiseStr = 'resolved'
        self._resolve(param)
    }

    function _reject(param) {
        self.promiseStr = 'rejected'
        self._reject(param)
    }

    func(_resolve, _reject)
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
    console.log(res)
}, function () {

})
