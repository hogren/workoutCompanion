import { Component } from '@angular/core';
import { TimerConfiguration } from './timer-configuration';
import { TimerType } from './timer-type';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  title = 'workoutCompanion';
  timers: Array<TimerConfiguration>;
  activeTimers: Array<TimerConfiguration>;

  constructor () {
    this.timers = [];
    let restingDuration = 10;
    let effortDuration = 15;
    this.activeTimers = [];
    for(let i=0; i<10; i++) {
      this.timers.push({remainingSecond: restingDuration, isRunning: true, type: TimerType.Resting});
      this.timers.push({remainingSecond: effortDuration, isRunning: true, type: TimerType.Effort});
    }
    this.shiftTimers();
  }
  
  shiftTimers () {
    this.activeTimers.shift();
    let newTimer = this.timers.shift();
    if (newTimer) {
      this.activeTimers.push(newTimer);
    }
  }
  
  onNotify () {
    this.shiftTimers();
  }

  ngOnInit() {
    console.log(TimerType.Effort);
  }
}
