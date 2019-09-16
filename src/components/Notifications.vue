<template>
  <div>
    <div class="container-fluid">
      <h2 align="center">{{$t('notifications.title')}}</h2>
      <div class="alert alert-danger" v-if="err">
        {{$t('notifications.error')}}
      </div>
      <div v-if="!loaded">
        <h3 align="center">
          <font-awesome-icon icon="spinner" spin />
          {{$t('notifications.loading')}}
          </h3>
      </div>
      <div class="row" v-if="loaded">
        <div class="col-sm-5 card">

          <hr>
          <div class="card-body">
            <div v-for="item in list">
              <SingleNotification :data="item"></SingleNotification>
              <hr>
            </div>

          </div>
        </div>

     </div>
    </div>
  </div>
</template>
<style scoped>

@media only screen and (max-width: 850px) {
  .card{width: 90%;}
}

.card {
  height: 450px;
  overflow-y: auto;
}

.card-body {
  margin: 0 auto;
}

p.card-body {
  text-align: left;
}

.card {
  margin: 0 auto;
}

.card-body {
  padding: 5px;
  margin: 0;
}
</style>
<script>
import Session from "../services/session";

import moment from "moment";

import SingleNotification from "./SingleNotification.vue";

export default {
  data() {
    return {
      err: false,
      loaded: false,
      list: [],
      allList: [
        {
          type: "purchase",
          content: {
            buyer: "mronlinecoder",
            phone: "+380501112233",
            address: "Отделение №3 (Нова Пошта), город Киев, улица Вовкина, 32",

            title: "Гари Протер и Философский кирпич",
            bookID: "asdasd"
          },
          date: new Date()
        },
        {
          type: "system",
          content: {
            message: "Добро пожаловать на Lendbook!"
          },
          date: moment("12.02.2018", "DD.MM.YYYY").toDate()
        },
        {
          type: "subscription_end",
          content: {},
          date: moment("12.02.2018", "DD.MM.YYYY").toDate()
        },
        {
          type: "subscription",
          content: {
            end: new Date()
          },
          date: moment("12.02.2018", "DD.MM.YYYY").toDate()
        }
      ]
    };
  },
  created() {
    if (!Session.isLoggedIn()) {
      this.$router.push("/login");
      return;
    }

    this.$http
      .get("/api/notifications/" + Session.getToken())
      .then(response => {
        if (!response.ok || !response.body.success) {
          this.err = true;
          return;
        }

        this.list = response.body.list;
        this.loaded = true;
      });
  },
  components: {
    SingleNotification
  }
};
</script>
