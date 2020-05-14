const truffleContract = require('@truffle/contract');
const contractData = require('../../build/contracts/Auction.json');

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
        this._account = account;
    }

    async deploy() {
        try {
            const instance = await this._contract.new({from: this._account});
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }

    }

    async getContractInformation(address) {
        const instance = await this._contract.at(address);
    }

    async getInstance(address) {
        const instance = await this._contract.at(address);
    }

    errorType(truffleError) {
        if (truffleError.message && truffleError.message.includes('Invalid address')) {
            return this.errors.INVALID_ADDRESS_FORMAT;
        }
    }

}

module.exports = ContractController;