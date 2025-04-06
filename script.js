window.onload = function() {
  const urlParams = new URLSearchParams(window.location.search);

  const webhookUrl = urlParams.get('webhook');

  if (webhookUrl && webhookUrl.includes("discord.com/api/webhooks")) {
    sendMessageToWebhook(webhookUrl);
  } else {
    console.error("Invalid or missing webhook URL.");
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
