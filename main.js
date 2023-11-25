import "./style.css";

const SQUARE_SIZE = 100;
const SQUARE_POSITION_STORAGE_KEY = "squarePosition";

const squareEl = createSquareEl();

setInterval(() => squareEl._syncPosition(getStoragePositionSquare()), 10);

onMouseMove(([x, y]) => {
  squareEl._syncPosition([x - SQUARE_SIZE / 2, y - SQUARE_SIZE / 2]);
});

function createSquareEl() {
  const div = document.createElement("div");

  Object.assign(div.style, {
    position: "absolute",
    height: `${SQUARE_SIZE}px`,
    width: `${SQUARE_SIZE}px`,
    backgroundColor: "#dc2626",
    display: "flex",
    justifyContent: "center",
    alignItems: "end",
    fontSize: "13px",
    fontWeight: "bold",
    padding: "5px",
    borderRadius: "5px",
  });

  div._syncPosition = (position) => {
    setStoragePositionSquare(position);

    div.textContent = `X: ${position[0]}, Y: ${position[1]}`;

    Object.assign(div.style, {
      left: `${position[0]}px`,
      top: `${position[1]}px`,
    });
  };

  document.body.appendChild(div);

  return div;
}

function getStoragePositionSquare() {
  const positionSquareStorage = window.localStorage.getItem(
    SQUARE_POSITION_STORAGE_KEY
  );
  return positionSquareStorage ? JSON.parse(positionSquareStorage) : [0, 0];
}

function setStoragePositionSquare(position) {
  window.localStorage.setItem(
    SQUARE_POSITION_STORAGE_KEY,
    JSON.stringify(position)
  );
}

function onMouseMove(cb) {
  document.addEventListener("mousemove", (event) =>
    cb([event.clientX, event.clientY])
  );
}
