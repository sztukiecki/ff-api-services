import {FlywheelPhase} from './FlywheelPhase';
import {Captions} from '@flowfact/types';

export type Flywheel = {
    id: number;
    name: string;
    captions: Captions;
    phases: FlywheelPhase[];
    global: false;
};
