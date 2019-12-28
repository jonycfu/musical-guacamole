import { makeGuess, gameOver } from './../../actions/game.actions';
import * as fromGame from './../../reducers/game.reducer';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Input,
} from '@angular/core';

import { HANGMAN } from 'src/assets/hangman';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D;
  hangmanArray: Array<Array<Number>>;
  gallowsArray: Array<Array<Number>>;
  gameOver: fromGame.EndGameStatus;
  maxGuesses: number;
  totalGuesses: number;
  wrongGuesses: number;
  //TODO: Refactor Game props into observables
  constructor(private store: Store<fromGame.IGameState>) {}

  ngOnInit() {
    this.hangmanArray = [
      HANGMAN.torso,
      HANGMAN.rightArm,
      HANGMAN.leftArm,
      HANGMAN.rightLeg,
      HANGMAN.leftLeg,
    ];
    this.gallowsArray = HANGMAN.gallows;
    //TODO: Convert to this.observables$
    this.store
      .pipe(select(fromGame.getGameFeatureState))
      .subscribe(({ game: { totalGuesses, maxGuesses, gameOver } }) => {
        this.totalGuesses = totalGuesses;
        this.maxGuesses = maxGuesses;
        this.gameOver = gameOver;
      });
  }
  ngAfterViewInit() {
    // Setup Canvas
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.ctx.beginPath();
    this.ctx.strokeStyle = '#ccc';
    this.ctx.lineWidth = 2;
    // Draw
    this.drawGallows();
  }

  //TODO: Take into consideration that number of guesses may change in future
  guess() {
    // If guesses are within limit
    // if (this.wrongGuesses <= this.maxGuesses) {
    //   this.drawHangmanParts();
    //   this.store.dispatch(makeGuess({ guess: '' }));
    //   //check for final stroke after dispatch
    //   if (this.wrongGuesses > this.maxGuesses) {
    //     this.store.dispatch(gameOver());
    //     console.log("jim's dead!");
    //   }
    // } else {
    //   console.log("jim's dead already!");
    // }
  }
  //Credit of Hangman Implementation: https://codepen.io/cathydutton/pen/ldazc
  drawGallows() {
    this.gallowsArray.forEach((item: Array<number>, idx) => this.draw(...item));
  }

  //Uses maxGuesses and guesses to evaluate draw step
  //Caps drawings at hangman parts count (length).
  drawHangmanParts() {
    if (this.totalGuesses === 0) {
      this.ctx.arc(...HANGMAN.head);
    } else if (this.totalGuesses <= this.hangmanArray.length) {
      this.draw(...this.hangmanArray[this.totalGuesses - 1]);
    }
    this.ctx.stroke();
  }

  draw($pathFromx?, $pathFromy?, $pathTox?, $pathToy?) {
    this.ctx.moveTo($pathFromx, $pathFromy);
    this.ctx.lineTo($pathTox, $pathToy);
    this.ctx.stroke();
  }
}
