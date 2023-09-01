const Knight = (boardObserver) => {
  const position = { x: 4, y: 4 };
  let processingMoves = false;

  const moves = [
    [2, 1],
    [1, 2],
    [-2, 1],
    [1, -2],
    [-1, 2],
    [2, -1],
    [-2, -1],
    [-1, -2],
  ];

  const updatePosition = (move) => {
    position.x = move.x;
    position.y = move.y;

    boardObserver.notify([move.x, move.y]);
  };

  const checkBounds = (x, y) => x >= 0 && x < 8 && y >= 0 && y < 8;

  const moveKnight = ([x, y]) => {
    if (processingMoves) return;

    if (position.x === x && position.y === y) return;

    let paths = [];

    moves.forEach((m) => {
      if (checkBounds(position.x + m[0], position.y + m[1])) {
        paths.push([{ x: position.x + m[0], y: position.y + m[1] }]);
      }
    });

    for (;;) {
      const solution = paths.find((path) => {
        const lastVisited = path[path.length - 1];

        return lastVisited.x === x && lastVisited.y === y;
      });

      if (solution !== undefined) {
        processingMoves = true;
        let time = 0;
        const interval = setInterval(() => {
          if (time < solution.length) {
            updatePosition(solution[time]);
            time++;
          } else {
            processingMoves = false;
            clearInterval(interval);
          }
        }, 500);

        return;
      }

      const toBeRemoved = paths;
      paths = [];

      for (let i = 0; i < toBeRemoved.length; i++) {
        const path = toBeRemoved[i];
        const lastVisited = path[path.length - 1];
        for (let j = 0; j < moves.length; j++) {
          const m = moves[j];
          if (checkBounds(lastVisited.x + m[0], lastVisited.y + m[1])) {
            paths.push([
              ...path,
              {
                x: lastVisited.x + m[0],
                y: lastVisited.y + m[1],
              },
            ]);
          }
        }
      }
    }
  };
  return { moveKnight };
};

export default Knight;
