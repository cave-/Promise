try {
    module.exports = Train
} catch (e) {}

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

Train.deferred = Train.defer = function () {
    var dfd = {}
    dfd.promise = new Train(function (resolve, reject) {
        dfd.resolve = resolve
        dfd.reject = reject
    })
    return dfd
}