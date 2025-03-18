const socket = io(); // Connect to the server via Socket.IO

const messageInput = document.getElementById("message_box");
const send_btn = document.getElementById("send_btn");
const userMessages = document.getElementById("messages");

// Listen for incoming messages from the server (messages from other users)
socket.on("message", (message) => {
  displayMessage(message, "receiver"); // Display received message on the left
});

// Listen for the send button click event
send_btn.addEventListener("click", () => {
  const message = messageInput.value;

  if (message.trim()) {
    displayMessage(message, "sender"); // Display sent message on the right
    socket.emit("input_message", message); // Emit the message to the server
    messageInput.value = ""; // Clear the input box after sending
  }
});

// Function to display the message in the chat
function displayMessage(message, type) {
  const div = document.createElement("div");
  div.classList.add("message", type); // Add sender or receiver class to the message

  const p = document.createElement("p");
  p.innerText = message;
  div.appendChild(p);

  userMessages.appendChild(div);

  // Auto-scroll to the bottom when new messages are added
  userMessages.scrollTop = userMessages.scrollHeight;
}
