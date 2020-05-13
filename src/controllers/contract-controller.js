const truffleContract = require('@truffle/contract');
const contractData = require('../../build/contracts/SimpleStorage.json');

module.exports = class ContractController {
    constructor(web3Connector) {
        this.web3Connector = web3Connector;
        this.contract = truffleContract(contractData);
        this.contract.setProvider(web3Connector);
    }

    world() {
        return 'Hello World';
    }

    async deploy() {
        try {
            const instance = await this.contract.new({from:'0x420952C36d821eDD39a8c39dE02fA8f7F907f8Db'});
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }

    }

}