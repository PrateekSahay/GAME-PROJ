import { Component, OnInit, AfterViewInit } from '@angular/core';
// import {Observable} from 'rxjs/Observable';
// import 'rxjs/add/observable/interval';
import {Router} from '@angular/router';
import { Player } from './game.model';
import { CallserviceService } from '../callservice.service';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements AfterViewInit {
  // mainClock:any;
  idButton: number;
  blueCard: any;
  timer = 2000;
  counter = 20;
  multiplier = 1;
  correctClicked = 0;
  rand = 3;
  interval: any;
  point = 0;

  constructor(private router: Router, private callPost: CallserviceService) {
    // this.startTimer();
   }
  ngAfterViewInit() {
    // this.firstColor();
    this.changeColor();
    this.gameClock();
    this.colorClock();
  }


  click(hashName: HTMLInputElement) {
     // console.log("sdsd",typeof parseInt(hashName.id, 10));
     // console.log("*****", typeof this.idButton);
      // const id = parseInt(hashName.id, 10);
      const id = parseInt(hashName.id, 10);
      // this.changeColor();

      if (id === this.idButton) {
       // console.log("working");
        this.correctClick();
      } else {
        this.inCorrectClick();
      }
    }


  firstColor() {
    const firstButton = this.getRandCardNo();
    const blueCard = document.getElementById(firstButton.toString());

    blueCard.style.backgroundColor = 'blue';
    const list = [1, 2, 3, 4];
      for (const i of list) {
        if (i.toString() !== firstButton.toString()) {
          const otherButton = document.getElementById(i.toString());
          otherButton.style.backgroundColor = 'white';
        }
      }

  }

  changeColor() {
    this.idButton = this.getRandCardNo();
    const blueCard = document.getElementById(this.idButton.toString());
   // console.log("blueCard", blueCard);
    blueCard.style.backgroundColor = 'blue';
    const list = [1, 2, 3, 4];
      for (const i of list) {
        if (i.toString() !== this.idButton.toString()) {
          const otherButton = document.getElementById(i.toString());
          otherButton.style.backgroundColor = 'white';
        }
      }
    }


  getRandCardNo() {
    const min = 1;
    const max = 4;
    let newRand = Math.floor(Math.random() * (max - min + 1) ) + min;
    while (newRand === this.rand) {
      // return this.getRandCardNo();
      newRand = Math.floor(Math.random() * (max - min + 1) ) + min;
    }
    this.rand = newRand;
    return this.rand;

}
  gameClock() {
    const intervalMain = setInterval(() => {
    // this.mainClock=counter;
    this.counter--;
    if (this.counter <= 0) {
     // this.mainClock="Time Up :p"
      clearInterval(intervalMain);
      this.endGame();
    }
  }, 1000);
}


  colorClock() {
        this.interval = setInterval(() => {
        if (this.counter <= 0) {
          clearInterval(this.interval);
        }
        this.changeColor();
        }, (this.timer / this.multiplier));
        // console.log(this.timer/this.multiplier);
  }

  correctClick() {
    this.changeColor();
    this.correctClicked++;
    // console.log("click-",this.correctClicked);
    if ((this.correctClicked > 10)) {
        this.multiplier = 3;
        clearInterval(this.interval);
        this.colorClock();
    } else if ((this.correctClicked > 7) && (this.correctClicked <= 10)) {
      this.multiplier = 2.25;
      clearInterval(this.interval);
      this.colorClock();
    } else if ((this.correctClicked > 3) && (this.correctClicked <= 7)) {
      this.multiplier = 1.75;
      clearInterval(this.interval);
      this.colorClock();
    } else {
      this.multiplier = 1;
    }
    // clearInterval(this.interval);
    // this.colorClock();
    this.calcPoints();

  }

  inCorrectClick() {
     this.changeColor();
    this.correctClicked = 0;
    clearInterval(this.interval);
    this.multiplier = 1;
    this.colorClock();
    this.calcPoints();
  }

  calcPoints() {
    let localPoint;
    if ((this.correctClicked >= 1) && (this.correctClicked <= 2)) {
      localPoint = 10;
    } else if ((this.correctClicked >= 3) && (this.correctClicked <= 7)) {
      localPoint = 20;
    } else if ((this.correctClicked >= 7) && (this.correctClicked <= 10)) {
      localPoint = 30;
    } else if (this.correctClicked > 10) {
      localPoint = 40;
    } else if (this.correctClicked === 0) {
      localPoint = 0;
    }
    this.point = this.point + localPoint * this.multiplier;
  //  console.log(this.point);
  }

  endGame() {
    const currentinfo = new Date();
    const user: Player = {
      score: this.point,
      time: currentinfo.toLocaleTimeString(),
    };
    this.callPost.postMethod(user).subscribe(() =>
    this.router.navigate(['/score'])
    );
  }

}
