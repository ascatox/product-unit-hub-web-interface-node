import * as express from 'express'
import * as bodyParser from 'body-parser';
import { LedgerClient } from './LedgerClient';

class ProductUnitWebInterface {
  public express
  private dataLedgerClient: LedgerClient;

  constructor() {
    this.express = express()
    this.dataLedgerClient = new LedgerClient();
    this.mountRoutes()
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

  private mountRoutes(): void {
    const router = express.Router();
    router.use(bodyParser.urlencoded({ extended: false }));
    router.use(bodyParser.json())
    router.get('/api/get', (req, res) => {
      this.getProcessStep(req.query.id, req.query.component, req.query.subComponent).then(data => {
        res.json(data.toString());
      }, error => {
        res.status(error.status || 500).send(JSON.stringify(error));
      });
    });
    router.post('/api/store', (req, res) => {
      const body: string = req.body;
      this.storeProcessStepRouting(JSON.stringify(body)).then(data => {
        res.json(data);
      }, error => {
        res.status(error.staus || 500).send(JSON.stringify(error));
      });
    });
    this.express.use('/', router)
  }
}
export default new ProductUnitWebInterface().express
