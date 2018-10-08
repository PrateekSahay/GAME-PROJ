import { Component, OnInit } from '@angular/core';
import { CallserviceService } from 'src/app/callservice.service';
// import { Player } from '../game/game.model';




@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {
  response: any;

  constructor(private callObj: CallserviceService) {

   }

  ngOnInit() {
    const obs = this.callObj.getMethod();
    obs.subscribe((resp) => {
        this.response = resp;
  });


  }
}

