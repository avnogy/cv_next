"use client";
import LandingLayout from "@/app/ui/landing/landingLayout";
import App from "next/app";
import { Router } from "next/router";
import FirebaseAuthHelper from "./services/firebaseAuthHelper";
import MyLogger from "./base/logger";

const _firebaseAuthHelper = new FirebaseAuthHelper();

export default class MyApp extends App {
  static firebaseAuthHelper = _firebaseAuthHelper;

  componentDidMount() {
    // Attach onAuthStateChanged listener
    MyApp.firebaseAuthHelper.getFirebaseAuthInstance().onAuthStateChanged((user) => {
      MyLogger.logInfo("login change", user);
      if (user) {
        // User is logged in
        console.log("User is logged in");
        // Perform any necessary actions for logged-in user
      } else {
        // User is not logged in
        console.log("User is not logged in");
        // Perform any necessary actions for non-logged-in user
      }
    });

    // Listen for route changes
    Router.events.on("routeChangeComplete", this.handleRouteChange);
  }

  componentWillUnmount() {
    // Remove the listener when the component is unmounted
    Router.events.off("routeChangeComplete", this.handleRouteChange);
  }

  handleRouteChange = () => {
    // Perform any necessary actions on route change
    console.log("Route changed");
  };

  render() {
    return (
      <main>
        <LandingLayout />
      </main>
    );
  }
}
