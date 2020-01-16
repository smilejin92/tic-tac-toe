import React from 'react';

import './index.css';

function Board(props) {
  return <div className="board">{props.children}</div>;
}

export default Board;
