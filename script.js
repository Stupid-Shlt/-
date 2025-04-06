window.onload = function() {
  const path = window.location.pathname;
  const webhookUrl = decodeURIComponent(path.slice(1));
  if (webhookUrl.includes("discord.com/api/webhooks")) {
    sendMessageToWebhook(webhookUrl);
  } else {
    console.log("Invalid webhook URL.");
  }
};

function sendMessageToWebhook(webhookUrl) {
  const payload = {
    content: "Hi"
  };
  fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })
    .then(response => {
      if (response.ok) {
        console.log("Message sent successfully!");
      } else {
        console.error("Failed to send message to the webhook.");
      }
    })
    .catch(error => {
      console.error("Error:", error);
    });
}
