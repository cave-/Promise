function Promise(func) {
    var self = this;
    this.promiseStatus = 'Pending'

    func(function (value) {
        self.promiseStatus = 'Fulfilled'
        self._onFulfilled(value)
    }, function (reason) {
        self.promiseStatus = 'Rejected'
        self._onFulfilled(reason)
    })
}

Promise.prototype.then = function (onFulfilled, onRejected) {
    switch (this.promiseStatus) {
        case 'Pending':
            if (typeof onFulfilled === 'function') {
                this._onFulfilled = onFulfilled
            }        
            if (typeof onRejected === 'function') {
                this._onRejected = onRejected
            }
            break;
        case 'Fulfilled':
            if (typeof onFulfilled === 'function') {
                onFulfilled(this.value)
            }
            break;
        case 'Rejected':
            if (typeof onRejected === 'function') {
                onRejected(this.reason)
            }
            break;
        default:
            break;
    }
    
    return this;
}

Promise.prototype._onFulfilled = function (value) {
    this.value = value
}

Promise.prototype._onRejected = function (reason) {
    this.reason = reason
}

var p = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve('hohoho')
    }, 3000)
})

p.then(function (res) {
    console.log(res, '1')
}, function (rej) {
    console.log(rej, '1')
}).then(function (res) {
    console.log(res, '2')
}, function (rej) {
    console.log(rej, '2')
})
