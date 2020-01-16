import React, { Component } from 'react';
import uuid from 'uuid';

import './Game.css';
import HistoryList from './components/HistoryList';
import HistoryListItem from './components/HistoryListItem';
import Board from './components/Board';
import Square from './components/Square';

class Game extends Component {
  defaultState = {
    history: [
      {
        player: false,
        winner: '',
      },
    ],
    currentIdx: 0,
    boardWidth: 3,
  };

  state = this.defaultState;

  countMove = arr => {
    const bingo = ['012', '345', '789', '036', '147', '258', '246', '048'];

    for (let i = 0; i < bingo.length; i++) {
      let count = 0;
      for (let j = 0; j < bingo[i].length; j++) {
        if (arr.indexOf(bingo[i].charAt(j)) >= 0) count += 1;
      }
      if (count === 3) return true;
    }
    return false;
  };

  componentDidUpdate() {
    const { history, currentIdx, boardWidth } = this.state;
    if (history[currentIdx].winner) return;
    let oIdx = [];
    let xIdx = [];

    Object.keys(history[currentIdx]).forEach(key => {
      if (history[currentIdx][key] === 'O') oIdx.push(key);
      else if (history[currentIdx][key] === 'X') xIdx.push(key);
    });

    if (oIdx.length >= boardWidth) {
      if (this.countMove(oIdx)) {
        const updatedHistory = {
          ...history[currentIdx],
          winner: 'O',
        };

        this.setState(ps => ({
          history: [
            ...ps.history.filter((h, i) => i < currentIdx),
            updatedHistory,
          ],
        }));
      }
    }

    if (xIdx.length >= boardWidth) {
      if (this.countMove(xIdx)) {
        const updatedHistory = {
          ...history[currentIdx],
          winner: 'X',
        };

        this.setState(ps => ({
          history: [
            ...ps.history.filter((h, i) => i < currentIdx),
            updatedHistory,
          ],
        }));
      }
    }
  }

  handleHistory = ({ target }) => {
    this.setState({
      currentIdx: +target.id,
    });
  };

  handleMove = ({ target }) => {
    const { history, currentIdx } = this.state;
    if (history[currentIdx][target.id] || history[currentIdx].winner) return;

    this.setState(ps => {
      const newHistory = {
        ...ps.history[ps.currentIdx],
        player: !ps.history[ps.currentIdx].player,
        [target.id]: ps.history[ps.currentIdx].player ? 'O' : 'X',
      };

      const h =
        ps.currentIdx < ps.history.length - 1
          ? [...ps.history.filter((h, i) => i <= ps.currentIdx), newHistory]
          : [...ps.history, newHistory];
      const c = h.length - 1;

      return {
        history: h,
        currentIdx: c,
      };
    });
  };

  render() {
    const { history, currentIdx, boardWidth } = this.state;
    return (
      <div className="game">
        <Board>
          {((squares, i) => {
            let idx = i;
            while (idx < boardWidth ** 2) {
              squares.push(
                <Square
                  key={uuid.v4()}
                  id={idx}
                  val={history[currentIdx][idx] || ''}
                  selectMove={this.handleMove}
                />,
              );
              idx += 1;
            }
            return squares;
          })([], 0)}
        </Board>
        <HistoryList
          winner={history[currentIdx].winner}
          nextPlayer={history[currentIdx].player}
        >
          {history.map((h, i) => (
            <HistoryListItem
              key={uuid.v4()}
              id={i}
              selectHistory={this.handleHistory}
            />
          ))}
        </HistoryList>
      </div>
    );
  }
}

export default Game;
