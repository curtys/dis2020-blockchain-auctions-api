const truffleContract = require('@truffle/contract');
const contractData = require('../../build/contracts/Auction.json');
const Auction = require('../models/auction');

class ContractController {

    errors = {
        INVALID_ADDRESS_FORMAT: 'invalid-address-format',
        NOT_FOUND: 'not-found',
        CONNECTION: 'connection-error'
    }

    constructor(web3provider, account) {
        this._web3Connector = web3provider;
        this._contract = truffleContract(contractData);
        this._contract.setProvider(web3provider);
        this._contract.defaults({from: account});
        this._account = account;
    }
    
    async newContract(auction) {
        const instance = await this._contract.new(auction.seller, auction.title, 
            auction.description);
        console.debug(`Created new auction at ${instance.address}`);
        return instance.address;
    }

    async getContractInformation(address) {
        const instance = await this._contract.at(address);
        const result = await instance.getInformation();
        const auction = new Auction({seller: result['0'], title: result['1'], description: result['2']});
        auction.id = address;
        console.debug(`Retrieved contract information at address ${address}:`);
        console.debug(auction);
        return auction;
    }

    async getInstance(address) {
        const instance = await this._contract.at(address);
    }

    errorType(truffleError) {
        if (truffleError.message && truffleError.message.includes('Invalid address')) {
            return this.errors.INVALID_ADDRESS_FORMAT;
        }
        if (truffleError.message && truffleError.message.includes('no code at address')) {
            return this.errors.NOT_FOUND;
        }
    }

}

module.exports = ContractController;