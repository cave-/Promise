try {
    module.exports = Train
} catch (e) {}

function Train(func) {
    this.status = 'Pending'
    this._onFulfilledCallbacks = []
    this._onRejectedCallbacks = []
    
    if (typeof func === 'function') {
        func(this._fulfilled.bind(this), this._rejected.bind(this))
    }
}

Train.prototype._fulfilled = function (value) {
    var self = this
    this.status = 'Fulfilled'
    this.value = value
    
    setTimeout(function () {
        if (self._onFulfilledCallbacks.length > 0) {
            self._onFulfilledCallbacks.map(function (item) {
                item.call(undefined, value)
            })
        }
    })
}

Train.prototype._rejected = function (reason) {
    var self = this
    this.status = 'Rejected'
    this.reason = reason

    setTimeout(function () {
        if (self._onRejectedCallbacks.length > 0) {
            self._onRejectedCallbacks.map(function (item) {
                item.call(undefined, reason)
            })
        }
    })
}

Train.prototype.then = function (onFulfilled, onRejected) {
    var self = this
    var train2 = new Train()

    switch (this.status) {
        case 'Pending':
                this._onFulfilledCallbacks.push(r)
                this._onRejectedCallbacks.push(j)
            break;
        case 'Fulfilled':
            setTimeout(r)
            break;
        case 'Rejected':
            setTimeout(j)
            break;
        default:
            break;
    }

    // resolve function
    function r() {
        if (typeof onFulfilled === 'function') {
            try {
                promiseResolve(train2, onFulfilled(self.value))
            } catch (error) {
                train2._rejected(error)
            }
        } else {
            train2._fulfilled(self.value)
        }
    }

    // reject function
    function j() {
        if (typeof onRejected === 'function') {
            try {
                promiseResolve(train2, onRejected(self.reason))
            } catch (error) {
                train2._rejected(error)
            }
        } else {
            train2._rejected(self.reason)
        }
    }
    
    return train2
}

function promiseResolve(promise, x) {
    if (promise === x) {
        return promise._rejected(new TypeError());
    } else if (x && (typeof x === 'function' || typeof x === 'object')) {
        var called = false, then

        try {
            then = x.then
            if (typeof then === 'function') {
                then.call(x, function (y) {
                    if (!called) {
                        called = true
                        promiseResolve(promise, y)
                    }
                }, function (r) {
                    if (!called) {
                        called = true
                        promise._rejected(r)
                    }
                });
            } else {
                promise._fulfilled(x)
            }
        } catch (e) {
            if (!called) {
                called = true
                promise._rejected(e)
            }
        }
    } else {
        promise._fulfilled(x)
    }
}

Train.deferred = Train.defer = function () {
    var dfd = {}
    dfd.promise = new Train(function (resolve, reject) {
        dfd.resolve = resolve
        dfd.reject = reject
    })
    return dfd
}