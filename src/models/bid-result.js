class BidResult {
    accepted = false;
    reason = '';

    constructor(obj) {
        Object.assign(this, obj);
    }
}

module.exports = BidResult;