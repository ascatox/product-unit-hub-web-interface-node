import { ConveyorItemType } from './ConveyorItemType';
export declare class ConveyorBay {
    typeObject: string;
    id: string;
    capacity: number;
    load: number;
    preference: Array<ConveyorItemType>;
    enable: boolean;
    position: number;
    datetime: Date;
    constructor(id: string, capacity: number, load: number, enable: boolean, position: number);
    addPreference(conveyorItemType: ConveyorItemType): void;
}
