import { Component, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    //RouterOutlet,
    FormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'guess-my-number';
  number: any;
  guessNumber: any;
  score: any;
  highscore: any;
  message: any;
  secretNumber: number;
  success: boolean = false;

  constructor(private elementRef: ElementRef) {
    this.number = '?';
    this.score = 20;
    this.highscore = 0;
    this.message = 'Start guessing...';
    this.secretNumber = Math.trunc(Math.random() * 20) + 1;
  }

  again() {
    this.score = 20;
    this.secretNumber = Math.trunc(Math.random() * 20) + 1;

    // document.querySelector('.message').textContent = 'Start guessing...';
    this.displayMessage('Start guessing...');
    this.number = '?';
    this.guessNumber = '';
    this.success = false;
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor =
      '#222';
    // document.querySelector('body').style.backgroundColor = '#222';
  }

  check() {
    const guess = this.guessNumber;
    console.log(guess, typeof guess);

    // When there is no input
    if (!guess) {
      // document.querySelector('.message').textContent = '⛔️ No number!';
      this.displayMessage('⛔️ No number!');

      // When player wins
    } else if (guess === this.secretNumber) {
      // document.querySelector('.message').textContent = '🎉 Correct Number!';
      this.displayMessage('🎉 Correct Number!');
      this.number = this.secretNumber;
      this.success = true;

      this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor =
        '#60b347';
      // let body: HTMLBodyElement = document.querySelector('body');
      // body.style.backgroundColor = '#60b347';
      // document.querySelector('.number').style.width = '30rem';

      if (this.score > this.highscore) {
        this.highscore = this.score;
        // this.highscore = this.highscore;
      }

      // When guess is wrong
    } else if (guess !== this.secretNumber) {
      if (this.score > 1) {
        // document.querySelector('.message').textContent =
        // guess > secretNumber ? '📈 Too high!' : '📉 Too low!';
        this.displayMessage(
          guess > this.secretNumber ? '📈 Too high!' : '📉 Too low!'
        );
        this.score--;
        // this.score = this.score;
      } else {
        // document.querySelector('.message').textContent = '💥 You lost the game!';
        this.displayMessage('💥 You lost the game!');
        this.score = 0;
      }
    }
  }

  displayMessage(message: string) {
    this.message = message;
  }
}
