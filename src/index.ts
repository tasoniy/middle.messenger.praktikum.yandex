// import HomePage from "./pages/HomePage";

// window.addEventListener("DOMContentLoaded", () => {
//   const root = document.querySelector("#app");

//   const homePage = new HomePage({
//     title: "Home page"
//   });

//   root?.append(homePage.getContent()!);
// })

import ErrorClient from "./pages/ErrorClient/errorClient";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { renderDOM } from "./utils/renderDOM";

document.addEventListener("DOMContentLoaded", () => {
  const path = document.location.pathname;

  switch(path) {
    case "/":
      renderDOM("#app", new SignUp())
      break;
    case "/signUp":
      renderDOM("#app", new SignUp())
      break;
    case "/signIn":
      renderDOM("#app", new SignIn())
      break;
    case "/errorClient":
      renderDOM("#app", new ErrorClient())
      break;
    case "/errorServer":
      renderDOM("#app", new ErrorClient())
      break;
  }
})

