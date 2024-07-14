"use strict";

const selectors = {
  allMessages: ".message",
};

// get elements
const dom = {
  loginForm: document.getElementById("welcome-form"),
  messagesSection: document.getElementById("messages-section"),
  messagesList: document.getElementById("messages-list"),
  addMessageForm: document.getElementById("add-messages-form"),
  userNameInput: document.getElementById("username"),
  messageContentInput: document.getElementById("message-content"),
};

let userName;

const messageElementHTML = (
  userName,
  messageContent,
  self = false
) => `<li class="message ${self ? "message--self" : ""} message--received">
            <h3 class="message__author">${userName}</h3>
            <div class="message__content">${messageContent}</div>
          </li>`;

const app = {
  init: function () {
    const thisApp = this;
    console.log("initializing app");
    thisApp.getElements();
    thisApp.initListeners();
    // thisApp.showMessages();
  },
  getElements: function () {
    const thisApp = this;
    thisApp.dom = {
      loginForm: document.getElementById("welcome-form"),
      messagesSection: document.getElementById("messages-section"),
      messagesList: document.getElementById("messages-list"),
      addMessageForm: document.getElementById("add-messages-form"),
      userNameInput: document.getElementById("username"),
      messageContentInput: document.getElementById("message-content"),
    };
  },
  initListeners: function () {
    const thisApp = this;
    thisApp.dom.loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      thisApp.login();
    });
    thisApp.dom.addMessageForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const messageContent = thisApp.dom.messageContentInput.value;
      thisApp.sendMessage(userName, messageContent);
    });
  },

  login: function () {
    const thisApp = this;
    console.log("login");
    userName = thisApp.dom.userNameInput.value;
    thisApp.hideLoginSection();
    thisApp.showMessages();
    thisApp.dom.userNameInput.value = "";
    thisApp.dom.messageContentInput.value = "";
  },

  showMessages: function () {
    const thisApp = this;
    console.log("showMessages");
    thisApp.dom.messagesSection.classList.add("show");
  },

  hideLoginSection: function () {
    const thisApp = this;
    console.log("hideLoginSection");
    thisApp.dom.loginForm.classList.remove("show");
  },

  sendMessage: function (author, content) {
    console.log("sendMessage");
    const thisApp = this;
    const messages = document.querySelectorAll(selectors.allMessages);

    // clear arrival animation from all messages
    for (let message of messages) {
      message.classList.remove("message--received");
    }

    if (content === "") {
      alert("Empty message not sent");
      return;
    }

    const self = author === userName;
    if (self === true) {
      author = "You";
    }

    const messageHTML = messageElementHTML(author, content, self);
    thisApp.dom.messagesList.innerHTML += messageHTML;

    thisApp.dom.messageContentInput.value = "";
  },
};

app.init();
