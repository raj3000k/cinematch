import { Client, Account, OAuthProvider } from "appwrite";
import { makeRedirectUri } from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!); // Your project ID

const account = new Account(client);

// Create a deep link that works across Expo environments
// Ensure localhost is used for the hostname to validation error for success/failure URLs
const deepLink = new URL(makeRedirectUri({ preferLocalhost: true }));
if (!deepLink.hostname) {
  deepLink.hostname = "localhost";
}
const scheme = `${deepLink.protocol}//`; // e.g. 'exp://' or 'playground://'

// Start OAuth flow
export const login = async () => {
    console.log('login')
  try {
    const loginUrl = await account.createOAuth2Token(
      OAuthProvider.Google,
      `${deepLink}`,
      `${deepLink}`
    );

    // Open loginUrl and listen for the scheme redirect
    const result = await WebBrowser.openAuthSessionAsync(`${loginUrl}`, scheme);

    // Extract credentials from OAuth redirect URL
    if (result.type === "success" && result.url) {
      const url = new URL(result.url);
      const secret = url.searchParams.get("secret");
      const userId = url.searchParams.get("userId");

      // Create session with OAuth credentials
      const res = await account.createSession(userId!, secret!);
      return res
      console.log(res);
    } else {
      throw new Error("Authentication failed or was canceled.");
    }
  } catch (error) {
    console.log(error);
  }
};
export const getSession = async () => {
  const account = new Account(client);
  try {
    const res = await account.getSession("current");
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const getUser = async () => {

  let result = await account.get();
  if(result){
    return result;
  }
  
};

export const logout = async () => {
  try {
    const res = await account.deleteSession("current");
    console.log(res)
    return res;
  } catch (error) {
    console.log(error);
  }
};
