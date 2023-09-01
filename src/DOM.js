import "./style.css";
import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/brands";

const DOM = (clickObserver) => {
  const container = document.querySelector(".container");

  const board = document.createElement("div");
  board.classList.add("board");

  const handleClick = (x, y) => {
    clickObserver.notify([x, y]);
  };

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const square = document.createElement("div");
      square.classList.add("square", i % 2 ? "even" : "odd");
      square.setAttribute("x", i);
      square.setAttribute("y", j);

      square.addEventListener("click", () => {
        handleClick(i, j);
      });

      board.append(square);
    }
  }

  const knight = document.createElement("i");
  knight.classList.add("fa-solid", "fa-chess-knight");

  board.querySelector("[x='4'][y='4']").append(knight);

  container.append(board);

  const moveKnight = ([x, y]) => {
    board.querySelector(".fa-chess-knight").remove();
    board.querySelector(`[x="${x}"][y="${y}"]`).append(knight);
  };

  const mobile = () => {
    if (document.documentElement.clientWidth < 900) {
      board.classList.add("mobile");
    } else {
      board.classList.remove("mobile");
    }
  };

  window.addEventListener("load", mobile);
  window.addEventListener("resize", mobile);

  return { moveKnight };
};

export default DOM;
