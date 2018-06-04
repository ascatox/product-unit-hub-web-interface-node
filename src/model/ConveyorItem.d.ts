import { ConveyorItemType } from "./ConveyorItemType";
export declare class ConveyorItem {
    typeObject: string;
    id: string;
    type: ConveyorItemType;
    state: ConveyorItem.State;
}
export declare module ConveyorItem {
    enum State {
        InConveyorBelt = 0,
        InBay = 1,
        Released = 2,
        Error = 3,
    }
}
