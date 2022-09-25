import { TimerType } from "./timer-type";

export interface TimerConfiguration {
    remainingSecond: number;
    isRunning: boolean;
    type: TimerType;
}