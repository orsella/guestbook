const form = document.getElementById("guestbook-form");

async function fetchAndRenderMessages() {
  const response = await fetch("http://localhost:8000/message");
  const messageList = await response.json();
  // console.log(messageList);
  const messageListDiv = document.getElementById("message-list");
  messageListDiv.innerHTML = "";
  messageList.forEach((message) => {
    const responseDiv = document.createElement("div");
    responseDiv.classList.add("message-div");
    const usernameDiv = document.createElement("div");
    const messageDiv = document.createElement("div");
    usernameDiv.innerHTML = `<span style="color: #d33a2c;"<p>Username: ${message.username}</p></span>`;
    messageDiv.innerHTML = `<p>Message: ${message.message}</p>`;
    responseDiv.appendChild(usernameDiv);
    responseDiv.appendChild(messageDiv);
    messageListDiv.appendChild(responseDiv);
  });
}
fetchAndRenderMessages();

form.addEventListener("submit", handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();
  const formData = new FormData(form);
  // giving formData obj the formData values
  const formValues = Object.fromEntries(formData);
  // post formValues to the server using fetch

  // try allows you to define a block of code to be tested for errors while it is being executed
  try {
    const response = await fetch("http://localhost:8000/message", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formValues),
    });

    const data = await response.json();

    if (data.success) {
      fetchAndRenderMessages();
    } else {
      console.log("data not successful :(");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
