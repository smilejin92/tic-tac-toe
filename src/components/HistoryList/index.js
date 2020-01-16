import React from 'react';

import './index.css';

function HistoryList(props) {
  const { winner, nextPlayer, children } = props;
  return (
    <div className="wrapper">
      <h3>
        {winner
          ? `Winner: ${winner}`
          : `Next Player: ${nextPlayer ? 'O' : 'X'}`}
      </h3>
      <ol className="history-list">{children}</ol>
    </div>
  );
}

export default HistoryList;
