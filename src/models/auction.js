class Auction {
    id = '';
    seller = '';
    title = '';
    description = '';

    constructor(obj) {
        Object.assign(this, obj);
    }
}

module.exports = Auction;