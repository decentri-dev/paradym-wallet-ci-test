module.exports = function (action, env) {
  const apiKey = env.PARADYM_API_KEY;
  if (!apiKey) {
    throw new Error("PARADYM_API_KEY missing");
  }

  const url =
    env.PARADYM_URL ||
    "https://api.paradym.io/credential-offer";

  const response = http.post(url, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      type: action.type,
      format: action.format,
      flow: action.flow
    })
  });

  const data = json(response.body);

  if (!data.credential_offer_uri) {
    throw new Error("credential_offer_uri missing in Paradym response");
  }

  return {
    deeplink:
      "openid-credential-offer://?credential_offer_uri=" +
      encodeURIComponent(data.credential_offer_uri)
  };
};
