
const API_URL = "COLOQUE_A_URL_DO_SERVIDOR_AQUI";

const chat = document.getElementById("chat");
const input = document.getElementById("message");
const send = document.getElementById("send");

function addMessage(text, type) {
  const message = document.createElement("div");
  message.className = "message " + type;
  message.textContent = text;
  chat.appendChild(message);
  chat.scrollTop = chat.scrollHeight;
  return message;
}

async function sendMessage() {
  const question = input.value.trim();

  if (!question || send.disabled) return;

  const welcome = document.querySelector(".welcome");
  if (welcome) welcome.remove();

  addMessage(question, "user");
  input.value = "";

  const loading = addMessage("Pensando...", "ai");
  send.disabled = true;

  try {
    if (API_URL.includes("COLOQUE_A_URL")) {
      throw new Error("Servidor ainda não configurado.");
    }

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: question
      })
    });

    if (!response.ok) {
      throw new Error("Erro no servidor: " + response.status);
    }

    const data = await response.json();

    loading.textContent =
      data.reply || "Não consegui gerar uma resposta.";

  } catch (error) {
    loading.textContent =
      "Não consegui conectar à inteligência artificial. " +
      error.message;

  } finally {
    send.disabled = false;
    input.focus();
  }
}

send.addEventListener("click", sendMessage);

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    sendMessage();
  }
});
