function getDeeplink() {
    const body = JSON.stringify({
        credentialSupportedIds: ["mobile-drivers-license-mdoc"],
        authorization: "none",
        requireDpop: false,
        requireWalletAttestation: false,
        requireKeyAttestation: false
    });

    const response = http.post(requestUrl, {
        headers: { "Content-Type": "application/json" },
        body: body
    });

    const data = json(response.body);

    if (!data || !data.issuanceSession) {
        throw new Error("issuanceSession missing");
    }

    const uri = data.issuanceSession.credentialOfferUri || data.issuanceSession.credential_offer_uri;

    if (!uri) {
        throw new Error("credentialOfferUri missing in issuanceSession");
    }

    const deeplink = "openid-credential-offer://?credential_offer_uri=" + encodeURIComponent(uri);

    return {
        deeplink: deeplink
    };
}

output.deeplink = getDeeplink();