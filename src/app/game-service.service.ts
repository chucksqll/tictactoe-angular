import { Injectable } from '@angular/core';

interface Square {
  id: number;
  value: any;
}

@Injectable({
  providedIn: 'root',
})
export class GameService {
  board: Square[] = [] as Square[];
  activePlayer: string = 'X';
  movesCounter: number = 0;
  gameOver: boolean = false;
  gameResultMessage: string = '';

  constructor() {
    this.board = this.createBoard();
  }

  createBoard(): Square[] {
    let board = [];
    for (let i = 0; i < 9; i++) {
      board.push({ id: i, value: null });
    }
    return board;
  }

  onSquareClick(square: Square) {
    if (this.gameOver) {
      return;
    }
    if (this.setSquareValue(square.id, this.activePlayer)) {
      this.activePlayer = this.activePlayer === 'X' ? 'O' : 'X';
      this.movesCounter += 1;
    }
    let result = this.checkIfOver()
    if (result !== null) {
      this.gameOver = true;
      if (result==='DRAW'){
        this.gameResultMessage = 'DRAW!'
      }
      else {
        this.gameResultMessage = result + ' Wins!'
      }
    };
  }

  setSquareValue(id: number, value: null | string): boolean {
    if (this.board[id].value === null) {
      this.board[id].value = value;
      return true;
    }
    return false;
  }

  restart() {
    this.board = this.createBoard();
    this.activePlayer = 'X';
    this.movesCounter = 0;
    this.gameOver = false;
    this.gameResultMessage = '';
  }

  checkIfOver(): null | string {
    if (this.movesCounter >= 9) {
      return 'DRAW'
    }
    // check diagonal
    if (this.board[4].value !== null) {
      if (this.board[0].value === this.board[4].value && this.board[0].value === this.board[8].value) {
        return this.board[0].value;
      }
      else if (this.board[6].value === this.board[4].value && this.board[6].value === this.board[2].value) {
        return this.board[4].value;
      }
    }
    // check horizontal
    for(let i=0;i<7;i+=3){
      if (this.board[i].value === this.board[i+1].value && this.board[i].value === this.board[i+2].value && this.board[i].value !== null) {
        return this.board[i].value;
      }
    }
    // check vertical
    for(let i=0;i<3;i+=1){
      if (this.board[i].value === this.board[i+3].value && this.board[i].value === this.board[i+6].value && this.board[i].value !== null) {
        return this.board[i].value;
      }
    }

    return null
  }
}
