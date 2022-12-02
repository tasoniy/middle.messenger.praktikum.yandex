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
import { renderDOM } from "./utils/renderDOM";

// document.addEventListener("DOMContentLoaded", () => {
//   const signUpPage = new SignUp({
//     buttonLabel:"Dont click"
//   });

//   renderDOM("#app", signUpPage);
// })

const path = document.location.pathname;

switch(path) {
  case "/":
    renderDOM("#app", new ErrorClient())
    break;
  case "/signUp":
    renderDOM("#app", new SignUp({
      buttonLabel:"Dont click"
    }))
    break;
}