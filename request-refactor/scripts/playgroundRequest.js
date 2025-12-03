module.exports = function (action) {
  const url =
    PLAYGROUND_URL ||
    "https://funke.animo.id/api/offers/create";

  const body = JSON.stringify({
    credentialSupportedIds: ["mobile-drivers-license-mdoc"],
    authorization: "none",
    requireDpop: false,
    requireWalletAttestation: false,
    requireKeyAttestation: false
  });

  const response = http.post(url, {
    headers: { "Content-Type": "application/json" },
    body
  });

  const data = json(response.body);

  const uri =
    data?.issuanceSession?.credentialOfferUri ||
    data?.issuanceSession?.credential_offer_uri;

  if (!uri) {
    throw new Error("credentialOfferUri missing in response");
  }

  return {
    deeplink:
      "openid-credential-offer://?credential_offer_uri=" +
      encodeURIComponent(uri)
  };
};
