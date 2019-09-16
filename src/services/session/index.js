import Vue from 'vue'

let token = null;
let user = null;

let callback = null;

const LS_KEY = "lendbook_token";

function getToken() {
  return token;
}

function init(arg) {
  if (localStorage.getItem(LS_KEY) != null) {
    token = localStorage.getItem(LS_KEY);
    Vue.http.get('/api/auth/me/' + token).then(response => {
      if (!response.ok || !response.body.success) {
        localStorage.removeItem(LS_KEY);
        token = null;
        user = null;
        if (callback) callback();
        return;
      }

      token = localStorage.getItem(LS_KEY);
      user = response.body.user;

      console.log('[Session] Successfully fetched data about user');
      console.log(user);

      if (callback) callback();
      arg();
    }, error => {
         
    });
  } else {
    arg();
  }

}

function login(tok) {
  localStorage.setItem(LS_KEY, tok);

  init(() => {});
}

function subscribe(cb) {
  callback = cb;
}

function isLoggedIn() {
  return token != null;
}

function logout() {
  token = null;
  user = null;
  localStorage.removeItem(LS_KEY);

  if (callback) callback();

  console.log('[Session] Logged out.');
}

function getUser() {
  return user;
}

export default {
  getToken,
  isLoggedIn,
  login,
  subscribe,
  init,
  logout,
  getUser
}