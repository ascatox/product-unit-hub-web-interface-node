import * as express from 'express';
import * as bodyParser from 'body-parser';
import { LedgerClient } from 'node-ledger-client';
import { logger } from "./Logger";
const config = require('../resources/config-fabric-network.json');
class ProductUnitWebInterface {
  public express
  private dataLedgerClient: LedgerClient;

  constructor() {
    this.init();
  }

  async init() {
    this.express = express();
    this.dataLedgerClient = await LedgerClient.init(config);
    this.mountRoutes();

  }

  private async getProcessStep(chassisId: string, component: string, subComponent) {
    try {
      return await this.dataLedgerClient.doQuery('getProcessStep', [chassisId, component, subComponent]);
    } catch (err) {
      throw new Error(err);
    }
  }

  private async storeProcessStepRouting(json: string) {
    try {
      return await this.dataLedgerClient.doInvoke('storeProcessStepRouting', [json]);
    } catch (err) {
      throw new Error(err);
    }
  }

  private async getAnalytics(key: string) {
    try {
      return await this.dataLedgerClient.doQuery('getData', [key]);
    } catch (err) {
      throw new Error(err);
    }
  }

  private async putAnalytics(key: string, data: string) {
    try {
      return await this.dataLedgerClient.doInvoke('putData', [key, data]);
    } catch (err) {
      throw new Error(err);
    }
  }

  private async chaincodeEventSubscribe(eventId: string, peerName: string) {
    return this.dataLedgerClient.registerChaincodeEvent(eventId, peerName, this.onEvent, this.onError);
  }

  onEvent(name, payload) {
    console.log('Event arrived!');
  }

  onError(err) {
    console.log('Error arrived!');
  }
  private mountRoutes(): void {
    const router = express.Router();
    router.use(bodyParser.urlencoded({ extended: false }));
    router.use(bodyParser.json())

    router.get('/get', (req, res) => {
      this.getProcessStep(req.query.id, req.query.component, req.query.subComponent).then(data => {
        res.json(data.toString());
      }, error => {
        logger.error(error.message);
        res.status(error.status || 500).send(error.message);
      });
    });

    router.post('/store', (req, res) => {
      const body: string = req.body;
      this.storeProcessStepRouting(JSON.stringify(body)).then(data => {
        res.json(data);
      }, error => {
        logger.error(error.message);
        res.status(error.staus || 500).send(error.message);
      });
    });


    router.get('/getData', (req, res) => {
      this.getAnalytics(req.query.key).then(data => {
        res.json(JSON.stringify(data));
      }, error => {
        logger.error(error.message);
        res.status(error.status || 500).send(error.message);
      });
    });

    router.post('/putData', (req, res) => {
      const body = req.body;
      this.putAnalytics(body.key, body.data).then(data => {
        res.json(data);
      }, error => {
        logger.error(error.message);
        res.status(error.staus || 500).send(error.message);
      });
    });
   /* this.chaincodeEventSubscribe("EVENT", "peer0.org1.example.com").then((handler) => {
      console.log('Handler received ' + JSON.stringify(handler));
    }, (err) => {
      console.log('Handler received ' + err);
    });
    */

    this.express.use('/api', router)
  }
}
export default new ProductUnitWebInterface().express
