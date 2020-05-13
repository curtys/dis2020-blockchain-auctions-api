const dotenv = require('dotenv');
const ContractController = require('../controllers/contract-controller');

function loadConfig() {
    dotenv.config();
    return {
        port: process.env.NODE_PORT,
        prettyLog: process.env.NODE_ENV == 'development',

        influx: {
            hostname: process.env.INFLUXDB_HOST,
            port: process.env.INFLUXDB_PORT,
            dbname: process.env.INFLUXDB_DBNAME,
            user: process.env.INFLUXDB_ADMIN_USER,
            password: process.env.INFLUXDB_ADMIN_PASSWORD,
        },

        web3: {
            provider: process.env.WEB3_PROVIDER
        }
    };
}

class Container {
    constructor() {
        this.config = loadConfig();
        this.contractController = new ContractController(this.config.web3.provider);
    }
}

module.exports = Container;