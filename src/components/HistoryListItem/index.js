import React from 'react';

import './index.css';

function HistoryListItem(props) {
  const { id, selectHistory } = props;
  return (
    <li className="history">
      <button id={id} onClick={selectHistory}>
        Go to {id ? `move #${id}` : `game start`}
      </button>
    </li>
  );
}

export default HistoryListItem;
