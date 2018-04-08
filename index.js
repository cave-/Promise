function Promise(func) {
    var self = this;
    this.promiseStr = 'Pending'

    function _resolve(param) {
        self.promiseStr = 'Fulfilled'
        self._resolve(param)
    }

    function _reject(param) {
        self.promiseStr = 'Rejected'
        self._reject(param)
    }

    func(_resolve, _reject)
}

Promise.prototype.then = function (resolve, reject) {
    if (typeof resolve != 'function' || typeof reject != 'function') return;

    if (this.promiseStr == 'Fulfilled') {
        resolve(this.resolved)
    }

    if (this.promiseStr == 'Pending') {
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
