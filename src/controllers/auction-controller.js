const crypto = require('crypto');

const NS_BIDDER = 'bidders';
const NS_OWNER = 'owners';
const NS_AUCTION = 'auctions';

class AuctionController {
    constructor(connector, contractController) {
        this.connector = connector;
        this.contractController = contractController;
    }

    async getAuctions(onlyActive) {
        return this._getAuctions(NS_AUCTION, 'all', onlyActive);
    }

    async getAuction(id) {
        const exists = await this.connector.existsHash(NS_AUCTION, id);
        if (!exists) return null;
        const hash = await this.connector.getHash(NS_AUCTION, id);
        return hash;
    }

    async getAuctionsOfUser(username, role, onlyActive) {
        let namespace = NS_BIDDER;
        if (role === 'owner') namespace = NS_OWNER;
        return this._getAuctions(namespace, username, onlyActive);;
    }

    async createAuction(auction) {
        const id = crypto.randomBytes(16).toString("hex");
        const success = await this.connector.addHash(NS_AUCTION, id, {active:true});
        let setRes1, setRes2;
        if (success) {
            setRes1 = await this.connector.addSet(NS_AUCTION, 'all', id);
            setRes2 = await this.connector.addSet(NS_OWNER, auction.owner, id);
        }
        if (!success || !setRes1 || !setRes2) {
            throw new Error('Could not create entries in Redis');
        }
    }

    async _filterActive(set) {
        console.debug('filter active auctions');
        for (const key in set) {
            if (set.hasOwnProperty(key)) {
                const id = set[key];
                const active = await this.connector.getHashField(NS_AUCTION, id, 'active');
                if (!!active) activeAuctions.push(id);
            }
        }
    }

    async _getAuctions(namespace, principal, onlyActive) {
        const auctionIds = await this.connector.getSet(namespace, principal);
        if (!!onlyActive) auctionIds = this._filterActive(auctionIds);
        return auctionIds;
    }
}

module.exports = AuctionController;