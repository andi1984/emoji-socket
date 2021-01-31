const drawEmojiOnCanvas = (canvas: HTMLCanvasElement, emoji: string) => {
  const ctx = canvas.getContext("2d");
  if (!!ctx) {
    ctx.font = `${getRandomFontSize()}px serif`;
    ctx.fillText(
      emoji,
      getRandomMax(canvas.width),
      getRandomMax(canvas.height)
    );
  }
};

const getRandomMax = (max: number): number => {
  return Math.floor(Math.random() * Math.floor(max));
};

const getRandomFontSize = (): number => {
  return Math.max(Math.floor(Math.random() * Math.floor(100)), 40);
};

// Create WebSocket connection.
const ws = location.origin.replace(/^http/, "ws");
const socket = new WebSocket(ws);

// Connection opened
socket.addEventListener("open", function (event) {
  console.log("Connected to websocket");
});

// Overlay Data handler
// Listen for messages from the websocket server
const canvas = <HTMLCanvasElement>document.getElementById("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

socket.addEventListener("message", function (event) {
  console.log("Message from server ", event.data);
  if (!!canvas) {
    const emoji = event.data;
    drawEmojiOnCanvas(canvas, emoji);
  }
});

// Emoji Button Click handler
const buttonElements = document.querySelectorAll("button");
buttonElements.forEach((buttonElement: HTMLButtonElement) => {
  buttonElement.addEventListener("click", () => {
    // Send the Emoji
    socket.send(buttonElement.value);
  });
});
