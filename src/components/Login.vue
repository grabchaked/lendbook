<template>
  <div>
    <div class="container py-5">
      <div class="row">
        <div class="col-md-6 mx-auto">

          <div class="card rounded-2">
            <div class="card-header">
              <h3 class="mb-0">Войти</h3>
            </div>
            <div class="card-body">
              <div class="alert alert-danger" v-if="!!err">
                {{ err }}
              </div>
                <form class="form" @submit="login" v-on:submit.prevent>
                    <div class="form-group">
                      <label>{{ $t('login.username')}}</label>
                      <input type="text" class="form-control" :placeholder="$t('login.username')" autocomplete="on" v-model="username" required>
                    </div>
                    <div class="form-group">
                      <label>{{ $t('login.pass')}}</label>
                      <input type="password" class="form-control" placeholder="Пароль" v-model="password" required>
                    </div>
                  {{ $t('login.noprofile')}} <a href="#/register">{{ $t('login.createIt')}}</a>
                    <button type="submit" class="btn btn-success float-right login" :disabled="busy">
                      <font-awesome-icon icon="sign-in-alt"/>
                      {{ busy ? $t("general.busy") : $t("general.login")}}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import Session from "../services/session";

import snakeify from 'snake-case';

export default {
  data() {
    return {
      username: "",
      password: "",
      err: "",
      busy: false
    };
  },
  methods: {
    login() {
      this.busy = true;
      this.$http
        .post("/api/auth/login", {
          username: snakeify(this.username),
          password: this.password
        })
        .then(response => {
          if (!response.ok) {
            this.err = "Ошибка при выполнении запроса.";
            this.busy = false;
            return;
          }

          if (!response.body.success) {
            this.err = response.body.message;
            this.busy = false;
            return;
          }

          this.err = null;

          Session.login(response.body.token);

          this.$router.push("/dashboard");
        });
    }
  }
};
</script>
<style scoped>
.card {
  box-shadow: 1px 1px 1px 1px #ccc;
  transition: 0.3s;
}
.card:hover {
  box-shadow: 2px 2px 3px 3px #ccc;
}
.login a {
  color: white;
}
.login a {
  text-decoration: none;
}
</style>
