function request() {
  const actionRaw = ACTION || "{}";

  let action;
  try {
    action = JSON.parse(actionRaw);
  } catch (e) {
    throw new Error("Invalid ACTION JSON: " + actionRaw);
  }

  const scriptPath = WALLET_RELYING_PARTY_SCRIPT;
  if (!scriptPath) {
    throw new Error("WALLET_RELYING_PARTY_SCRIPT not set");
  }

  const loadedScript = require(scriptPath);

  if (typeof loadedScript !== "function") {
    throw new Error("Backend script must export a function: " + scriptPath);
  }

  console.log("Running the script")
  const result = loadedScript(action);
  console.log(result)

  if (!result || !result.deeplink) {
    throw new Error("Backend script did not return deeplink");
  }

  output.deeplink = result.deeplink;
}

output.request = request();