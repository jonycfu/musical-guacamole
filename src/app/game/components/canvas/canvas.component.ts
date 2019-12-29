import { EndGameStatus } from './../../reducers/game.reducer';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Input,
  OnChanges,
  SimpleChange,
} from '@angular/core';

import { HANGMAN } from 'src/assets/hangman';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D;
  hangmanArray: Array<Array<any>>;
  gallowsArray: Array<Array<Number>>;
  @Input() gameStatus: EndGameStatus;
  @Input() totalGuesses: number;
  @Input() maxGuesses: number;
  @Input() wrongGuesses: number;

  constructor() {}

  ngOnInit() {
    this.hangmanArray = [
      HANGMAN.head,
      HANGMAN.torso,
      HANGMAN.rightArm,
      HANGMAN.leftArm,
      HANGMAN.rightLeg,
      HANGMAN.leftLeg,
    ];
    this.gallowsArray = HANGMAN.gallows;
  }
  ngAfterViewInit() {
    // Setup Canvas
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.ctx.strokeStyle = '#ccc';
    this.ctx.lineWidth = 2;
    // Draw
    this.resetCanvas();
  }
  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    const wrongGuesses = changes.wrongGuesses;
    if (wrongGuesses && !wrongGuesses.isFirstChange()) {
      if (wrongGuesses.currentValue > 0) {
        this.drawHangmanParts();
      }
      // Redraw when totalGuesses is zero (reset)
      else if (this.totalGuesses === 0) {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.resetCanvas();
      }
    }
  }

  resetCanvas() {
    this.ctx.beginPath();
    this.drawGallows();
  }
  //Credit of Hangman Implementation: https://codepen.io/cathydutton/pen/ldazc
  drawGallows() {
    this.gallowsArray.forEach((item: Array<number>, idx) => this.draw(...item));
  }

  //Uses maxGuesses and guesses to evaluate draw step
  //Caps drawings at maxGuesses.
  drawHangmanParts() {
    const guessesLeft = this.maxGuesses - this.wrongGuesses;
    if (this.wrongGuesses === 1) {
      //first, draw head
      this.ctx.arc(...HANGMAN.head);
    } else if (guessesLeft <= 0) {
      //last, draw rest
      this.hangmanArray
        .slice(this.wrongGuesses - 1)
        .forEach((bodyPart: number[]) => this.draw(...bodyPart));
    } else {
      // draw per wrong guess index
      this.draw(...this.hangmanArray[this.wrongGuesses - 1]);
    }
    this.ctx.stroke();
  }

  draw($pathFromx?, $pathFromy?, $pathTox?, $pathToy?) {
    this.ctx.moveTo($pathFromx, $pathFromy);
    this.ctx.lineTo($pathTox, $pathToy);
    this.ctx.stroke();
  }
}
