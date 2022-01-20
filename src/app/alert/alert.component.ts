import { Component, OnInit, Input } from '@angular/core';

interface Alert {
  type: string;
  message: string;
}

const ALERTS: Alert[] = [{
  type: 'success',
  message: "O Wins!",
}, {
  type: 'info',
  message: 'DRAW!',
}, {
  type: 'warning',
  message: "X Wins!",
}
];

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  alerts: Alert[] = [] as Alert[];
  alert: Alert | undefined;
  constructor() {
    this.reset();
  }

  @Input() set message(message: string){
    this.alert = this.alerts.find(element => element.message==message);
  };

  close(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
    console.log(this.alerts.find(element => element.message==this.message));

  }

  reset() {
    this.alerts = Array.from(ALERTS);
  }

  ngOnInit(): void {
  }


}
