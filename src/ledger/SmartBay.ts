import { LedgerClient } from './LedgerClient';
import { logger } from "../Logger";
import { ConveyorItem } from '../model/ConveyorItem';
import { ConveyorBay } from '../model/ConveyorBay';

class SmartBay {
    private dataLedgerClient: LedgerClient;
    private mapItemBay: any;
   
    constructor() {
        this.dataLedgerClient = new LedgerClient();
        this.mapItemBay = new Map();
    }

    private async storeConveyorItem(item: ConveyorItem) {
        try {
            const json = JSON.stringify(item);
            return await this.dataLedgerClient.doInvoke('storeConveyorItem', [json]);
        } catch (err) {
            throw new Error(err);
        }
    }
    //HeartBit
    private async editConveyorBay(bay: ConveyorBay) {
        try {
            const json = JSON.stringify(bay);
            return await this.dataLedgerClient.doInvoke('editConveyorBay', [json]);
        } catch (err) {
            throw new Error(err);
        }
    }

    private async assignementConveyorItemToConveyorBay(item: ConveyorItem) {
        try {
            const json = JSON.stringify(item);
            return await this.dataLedgerClient.doInvoke('assignementConveyorItemToConveyorBay', [json]);
        } catch (err) {
            throw new Error(err);
        }
    }

    private async getMapAssignment(bayId: string){
        try {
           let mapItemBay = await this.dataLedgerClient.doQuery('getMapAssignment', [bayId]);
            //TODO

        } catch (err) {
            throw new Error(err);
        }
    }
}
export { SmartBay };