const truffleContract = require('@truffle/contract');
const contractData = require('../../build/contracts/SimpleStorage.json');

module.exports = class ContractController {
    constructor(web3provider, account) {
        this._web3Connector = web3provider;
        this._contract = truffleContract(contractData);
        this._contract.setProvider(web3provider);
        this._account = account;
    }

    async deploy() {
        try {
            const instance = await this.contract.new({from: this._account});
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }

    }

}