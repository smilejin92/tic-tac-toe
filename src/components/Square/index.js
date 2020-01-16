import React from 'react';

import './index.css';

function Square(props) {
  const { id, selectMove, val } = props;
  return (
    <div className="square" id={id} onClick={selectMove}>
      {val}
    </div>
  );
}

export default Square;
