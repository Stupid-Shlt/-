window.onload = function() {
  // Extract the webhook URL from the URL path (after the first /)
  const path = window.location.pathname;
  const webhookUrl = decodeURIComponent(path.slice(1));

  // Check if the URL is a valid Discord webhook URL
  if (webhookUrl.includes("discord.com/api/webhooks")) {
    sendMessageToWebhook(webhookUrl);
  } else {
    console.log("Invalid webhook URL.");
  }
};

// Function to send the "Hi" message to the webhook
function sendMessageToWebhook(webhookUrl) {
  const payload = {
    content: "Hi"
  };

  // Send the POST request to Discord webhook
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
