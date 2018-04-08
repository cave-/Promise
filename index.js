function Train(func) {
    this.status = 'Pending'
    this._onFulfilled = []
    this._onRejected = []

    func(this._Fulfilled.bind(this), this._Rejected.bind(this))
}

Train.prototype._Fulfilled = function (value) {
    this.status = 'Fulfilled'
    this.value = value

    if (this._onFulfilled.length > 0) {
        this._onFulfilled.map(function (item) {
            item.call(undefined, value)
        })
    }
}

Train.prototype._Rejected = function (reason) {
    this.status = 'Rejected'
    this.reason = reason

    if (this._onRejected.length > 0) {
        this._onRejected.map(function (item) {
            item.call(undefined, reason)
        })
    }
}

Train.prototype.then = function (onFulfilled, onRejected) {
    var thenReturn = new Train()

    switch (this.status) {
        case 'Pending':
            if (typeof onFulfilled === 'function') {
                this._onFulfilled.push(onFulfilled)
            }        
            if (typeof onRejected === 'function') {
                this._onRejected.push(onRejected)
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
    
    return thenReturn;
}

var p = new Train(function (resolve, reject) {
    setTimeout(function () {
        resolve('hohoho')
    }, 3000)
})

p.then(function (res) {
    var x = true;
    console.log(res, '1')
    return x
}, function (rej) {
    console.log(rej, '1')
    throw new Error();
}).then(function (res) {
    console.log(res, '11')
}, function (rej) {
    console.log(rej, '1')
})

p.then(function (res) {
    console.log(res, '2')
}, function (rej) {
    console.log(rej, '2')
})