import * as express from 'express'
import * as bodyParser from 'body-parser';
import { logger } from "../Logger";
import { SmartBay } from '../ledger/SmartBay';

class ProductUnitWebInterface {
  public express
 
  readonly smartBay; 

  constructor() {
    this.express = express()
    this.mountRoutes()
    this.smartBay = new SmartBay();
  }

  private mountRoutes(): void {
    const router = express.Router();
    router.use(bodyParser.urlencoded({ extended: false }));
    router.use(bodyParser.json())

    router.get('/getMapAssignment', (req, res) => {
      this.smartBay.getProcessStep(req.query.id, req.query.component, req.query.subComponent).then(data => {
        res.json(data.toString());
      }, error => {
        logger.error(JSON.stringify(error));
        res.status(error.status || 500).send(error);
      });
    });

    router.post('/storeItem', (req, res) => {
      const body: string = req.body;
      this.smartBay.storeProcessStepRouting(JSON.stringify(body)).then(data => {
        res.json(data);
      }, error => {
        logger.error(JSON.stringify(error));
        res.status(error.staus || 500).send(error);
      });
    });
    router.post('/storeBay', (req, res) => {
      const body: string = req.body;
      this.smartBay.storeProcessStepRouting(JSON.stringify(body)).then(data => {
        res.json(data);
      }, error => {
        logger.error(JSON.stringify(error));
        res.status(error.staus || 500).send(error);
      });
    });

    router.post('/assignItemToBay', (req, res) => {
      const body: string = req.body;
      this.smartBay.storeProcessStepRouting(JSON.stringify(body)).then(data => {
        res.json(data);
      }, error => {
        logger.error(JSON.stringify(error));
        res.status(error.staus || 500).send(error);
      });
    });

    this.express.use('/api', router)
  }
}
export default new ProductUnitWebInterface().express
