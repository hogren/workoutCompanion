import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TimerType } from '../timer-type';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit {
  @Input() remainingSecond!: number;
  @Input() isRunning!: boolean;
  @Input() type!: TimerType;

  @Output() notify = new EventEmitter();

  bipNumberBeforeStop: number;
  bip: any;


  constructor() {
    this.bipNumberBeforeStop = 5;
    this.bip = new Audio();


    setInterval(() => {
      this.tick();
    }, 1000);
  }

  ngOnInit(): void {
    console.log(this.type);
    
    if (this.type == TimerType.Effort) {
      this.bip.src = '/assets/audio/321585__waxxman__bip.mp3';
    } else {
      this.bip.src = '/assets/audio/ROBTVox_Notification lasomarie 3 (ID 2061)_BSB.wav';
    }
    this.bip.load();
  }

  tick(): void {
    console.log('tick')
    if (this.isRunning) {
      this.remainingSecond--;
      if (this.remainingSecond <= 0) {
        this.isRunning = false;
        this.notify.emit();
      }

      if (this.remainingSecond <= this.bipNumberBeforeStop
        && this.remainingSecond > 0)
      {
        this.bip.pause();
        this.bip.load();
        this.bip.play();
      }
    }
  }

  start(): void {
    this.isRunning = true;
  }

  stop(): void {
    this.isRunning = false;
  }

  print(): string {
    let seconds = this.remainingSecond % 60;
    let minutes = ((this.remainingSecond - seconds) / 60) % 60;
    let hours = ((this.remainingSecond - seconds - minutes * 60) / 3600) % 60;
    return (
      hours.toString().padStart(2, '0') +
      ':' +
      minutes.toString().padStart(2, '0') +
      ':' +
      seconds.toString().padStart(2, '0')
    );
  }
}
