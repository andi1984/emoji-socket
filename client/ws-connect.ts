// Create WebSocket connection.
const socket = new WebSocket("ws://localhost:4000");

const randomNumber = Math.random();

// Connection opened
socket.addEventListener("open", function (event) {
  console.log("Connected to websocket");
});

// Overlay Data handler
// Listen for messages from the websocket server
const messagesListElement = document.querySelector('[data-js="messages"]');
const canvas = <HTMLCanvasElement>document.getElementById("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const getRandomX = (): number => {
  return Math.floor(Math.random() * Math.floor(canvas.width));
};

const getRandomY = (): number => {
  return Math.floor(Math.random() * Math.floor(canvas.height));
};

const getRandomFontSize = (): number => {
  return Math.max(Math.floor(Math.random() * Math.floor(100)), 40);
};

const drawEmojiOnCanvas = (emoji: string) => {
  const ctx = canvas.getContext("2d");
  if (!!ctx) {
    ctx.font = `${getRandomFontSize()}px serif`;
    ctx.fillText(emoji, getRandomX(), getRandomY());
  }
};
socket.addEventListener("message", function (event) {
  console.log("Message from server ", event.data);
  if (!!messagesListElement) {
    const emoji = event.data;
    drawEmojiOnCanvas(emoji);

    // const liElement = document.createElement("li");
    // liElement.textContent = emoji;

    // messagesListElement.appendChild(liElement);
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
