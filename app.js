"use strict";

// get elements
const dom = {
  loginForm: document.getElementById("welcome-form"),
  messagesSection: document.getElementById("messages-section"),
  messagesList: document.getElementById("messages-list"),
  addMessageForm: document.getElementById("add-messages-form"),
  userNameInput: document.getElementById("username"),
  messageContentInput: document.getElementById("message-content"),
};

// get elements and print elements
for (let key in dom) {
  console.log(key, dom[key]);
}

let userName;
