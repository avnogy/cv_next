"use client";
import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth, GoogleAuthProvider } from "firebase/auth";
import Definitions from "../base/definitions";
import MyLogger from "../base/logger";

// https://firebase.google.com/docs/web/setup#available-libraries

export default class FirebaseAuthHelper {
  private firebaseAppInstance?: FirebaseApp;
  private firebaseAuthInstance?: Auth;

  constructor() {
    MyLogger.logInfo("building auth helper");
  }

  /**
   * Method initiates the firebase app if not initiated yet
   * @returns FirebaseApp instance
   */
  public getFirebaseInstance(): FirebaseApp {
    if (
      this.firebaseAppInstance === null ||
      this.firebaseAppInstance === undefined
    ) {
      this.firebaseAppInstance = initializeApp(Definitions.FIREBASE_CONFIG);
    }
    return this.firebaseAppInstance;
  }

  /**
   * Method initiates the firebase app if not initiated yet
   * @returns FirebaseApp instance
   */
  public getFirebaseAuthInstance(): Auth {
    if (
      this.firebaseAuthInstance === null ||
      this.firebaseAuthInstance === undefined
    ) {
      MyLogger.logInfo("Getting new auth instance");
      this.firebaseAuthInstance = getAuth(this.getFirebaseInstance());
    }
    return this.firebaseAuthInstance;
  }

  public getAuthUiConfig() {
    let config = {
      callbacks: {
        signInSuccessWithAuthResult: function (
          authResult: any,
          redirectUrl: any
        ) {
          // User successfully signed in.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          //MyLogger.logInfo("sign in", authResult);
          MyLogger.logInfo("sign in", authResult.user.email); //V
          MyLogger.logInfo("sign in", authResult.user.displayName); //V
          MyLogger.logInfo("sign in", authResult.additionalUserInfo.isNewUser); //V
          MyLogger.logInfo("sign in", authResult.credential); //V
          return false;
        },
        uiShown: function () {
          // The widget is rendered.
          // Hide the loader.
          if (
            document.getElementById("loader") !== null &&
            document.getElementById("loader") !== undefined
          ) {
            document.getElementById("loader")!.style.display = "none";
          }
        },
      },
      // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
      signInFlow: "popup",
      //signInSuccessUrl: "<url-to-redirect-to-on-success>",

      signInOptions: [
        // List of OAuth providers supported.
        GoogleAuthProvider.PROVIDER_ID,
      ],
      tosUrl: "<your-tos-url>",
      // Privacy policy url.
      privacyPolicyUrl: "<your-privacy-policy-url>",
    };
    return config;
  }
}
