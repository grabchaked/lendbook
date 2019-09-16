<template>
  <div class="container">
    <h2 v-if="ok">Админ-панель</h2>
    <hr>
    <b-alert variant="danger" :show="!ok">
      У вас недостаточно прав для доступа к этой странице.
    </b-alert>
    <br>
    <div v-if="ok">
      <b-tabs pills>
        <b-tab title="Статистика" active>
          <br>
          <Stats></Stats>
        </b-tab>
        <b-tab title="Управление объявлениями">
          <br>
          <BookManager />
        </b-tab>
        <b-tab title="Пользователи">
          <br>
          <Users />
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import Session from '../services/session'

import Stats from './admin/Stats.vue'
import Users from './admin/Users.vue'
import BookManager from './admin/BookManager.vue'

export default {
  data() {
    return {
      ok: false
    }
  },
  methods: {
  },
  created() {
    this.$http.get('/api/admin/verify/'+Session.getToken()).then(response => {
      if (!response.ok || !response.body.success) {
        this.ok = false;
        return;
      }

      this.ok = true;
    });
  },
  components: {
    Stats,
    Users,
    BookManager
  }
}
</script>
