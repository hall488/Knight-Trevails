import DOM from "./DOM";
import Knight from "./knight";
import Observable from "./observable";

const clickObserver = Observable();
const boardObserver = Observable();

const dom = DOM(clickObserver);
const knight = Knight(boardObserver);

clickObserver.subscribe(knight.moveKnight);
boardObserver.subscribe(dom.moveKnight);
