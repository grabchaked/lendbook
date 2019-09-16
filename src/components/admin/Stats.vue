<template>
  <div>
    <b-alert variant="danger" :show="err">
      Не удалось загрузить статистику.
    </b-alert>

    <div v-if="!err">
      <ul>
        <li><font-awesome-icon icon="user" /> Всего аккаунтов: <b-badge> {{ stats.users }} </b-badge></li>
        <li><font-awesome-icon icon="crown" /> Подписок: <b-badge> {{ stats.premiumCount }} </b-badge></li>
        <li><font-awesome-icon icon="book" /> Всего книг: <b-badge> {{ stats.books }} </b-badge></li>
      </ul>
    </div>
  </div>
</template>


<script>
import Session from '../../services/session'

export default {
  data() {
    return {
      err: false,
      stats: {}
    }
  },
  created() {
    this.$http.get('/api/admin/stats/'+Session.getToken()).then(response => {
      if (!response.ok || !response.body.success) {
        this.err = true;
        return;
      }

      this.stats = response.body.stats;
    });
  }
}
</script>
