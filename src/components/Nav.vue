<template>
<div>
  <nav class="navbar stroke navbar-expand-md bg-dark navbar-dark fixed-top">
    <a class="navbar-brand"
    href="#/" v-on:click.prevent @click="scrollTop()"
    id="top_link">Lendbook</a>

    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
      </button>
    <div class="collapse navbar-collapse" id="collapsibleNavbar">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item" v-if="!loggedIn">
          <router-link to="/login" data-toggle="collapse" data-target=".navbar-collapse.show" class="nav-link">
          <font-awesome-icon icon="sign-in-alt"/>
          {{ $t('navbar.login')}}
          </router-link>
        </li>
        <li class="nav-item" v-if="!loggedIn">
          <router-link to="/register" data-toggle="collapse" data-target=".navbar-collapse.show" class="nav-link">
          <font-awesome-icon icon="user-plus"/>
          {{ $t('navbar.register')}}
          </router-link>
        </li>
        <li class="nav-item" v-if="loggedIn && user">
          <router-link to="/dashboard"  data-toggle="collapse" data-target=".navbar-collapse.show" class="nav-link">
            <b><font-awesome-icon icon="user"/> {{ user.username }}</b>
          </router-link>
        </li>
        <li class="nav-item" v-if="loggedIn">
          <a href="#" @click.prevent="goToNotifications" data-toggle="collapse" data-target=".navbar-collapse.show" class="nav-link">
            <font-awesome-icon icon="bell"/>
            {{ $t('navbar.notifications')}}
            <span class="badge badge-success"  v-if="notificationsCount > 0">{{notificationsCount}}</span>
          </a>
        </li>
        <li class="nav-item">
          <router-link to="/pricing" data-toggle="collapse" data-target=".navbar-collapse.show" class="nav-link">
          <font-awesome-icon icon="crown"/>
           {{ $t('navbar.subscription')}}
          </router-link>
        </li>
        <li class="nav-item" v-if="loggedIn">
          <a class="nav-link" @click="logout()" href="#" data-toggle="collapse" data-target=".navbar-collapse.show">
            <font-awesome-icon icon="sign-out-alt"/>
            {{ $t('navbar.logout')}}
          </a>
        </li>
      </ul>
    </div>
  </nav>
  <br>

</div>
</template>
<style>

.nav-item {
  background-color: #343a40;
}
.nav-link {
  color: white !important;
}

a.navbar-brand {
  font-family: 'Righteous', serif;


  text-shadow: 2px 2px grey;
}

nav {
  margin-bottom: 5px;
  margin: 0;
  padding: 0;
  opacity: 0.95;
  box-shadow: 0 0 5px rgba(0,0,0,0.5);
}

nav ul li {
  display: inline-block;
}

nav ul li a {
  display: block;
  text-transform: uppercase;
}

nav ul li a,
nav ul li a:after,
nav ul li a:before {
  transition: all 0.5s;
}

nav ul li a:hover {
  color: #555;
}

nav.stroke ul li a {
  position: relative;
  transition: 0.3s;
}

nav.stroke ul li a:after {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 0%;
  content: ".";
  color: transparent;
  background: #aaa;
  height: 1px;
}

nav.stroke ul li a:hover:after {
  width: 100%;
}


</style>


<script>
import Session from "../services/session";

let options = {
    el: '#top_link',
    easing: 'linear',
    x: false,
    y: true,
    duration:200
}

export default {
  data() {
    return {
      loggedIn: Session.isLoggedIn(),
      user: {},
      notificationsCount: 0
    };
  },
  created() {
    Session.subscribe(this.sessionCallback);

    this.sessionCallback();
  },
  methods: {

    scrollTop(){
      if(this.$route.path == "/home" || (this.$route.path == "/dashboard") || (this.$route.path == "/termsofservice") || (this.$route.path == "/privacy-policy")){
        this.$scrollTo('#top_link', 200, options);
      } else {
        this.$router.push('/home')
      }
    },

    sessionCallback() {
      this.loggedIn = Session.isLoggedIn();
      this.user = Session.getUser();

      this.$http
        .get("/api/notifications/" + Session.getToken() + "/unread")
        .then(response => {
          if (!response.ok || !response.body.success) {
            return;
          }

          this.notificationsCount = response.body.count;
        });
    },
    logout() {
      Session.logout();
      this.$router.push("/home");
    },
    goToNotifications() {
      this.notificationsCount = 0;
      this.$router.push("/notifications");
    }
  }
};
</script>
