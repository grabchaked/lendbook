<template>
  <div>
    <b-alert variant="danger" :show="!!err">
      {{ err }}
    </b-alert>
    <div class="text-center">
      <b-form-input placeholder="Введите ID объявления" v-model="target"/>
      <br>
      <b-button variant="info" size="lg" @click="searchBook()">Найти</b-button>
    </div>
    <br>
    
    <b-card v-if="found">
      <b-form v-on:submit.prevent>
        <b-form-group label="Картинка:">
          <img :src="book.img" style="width: 200px; height: 200px">
          <br>
          <br>
          <b-form-input v-model="book.img" required></b-form-input>
        </b-form-group>
        <b-form-group label="Название:">
          <b-form-input v-model="book.title" required></b-form-input>
        </b-form-group>
        <b-form-group label="Автор:">
          <b-form-input v-model="book.author" required></b-form-input>
        </b-form-group>
        <b-form-group label="Создатель объявления:">
         <font-awesome-icon icon="user"/> {{ book.publisher }}
        </b-form-group>
        <b-form-group label="Жанр:">
          <b-badge variant="success">{{book.genre[0]}}</b-badge>
          <b-badge variant="warning">{{book.genre[1] || ''}}</b-badge>
        </b-form-group>
        <b-form-group label="Страницы:">
          <b-form-input type="number" v-model="book.pages" required></b-form-input>
        </b-form-group>
        <b-form-group label="Цена:">
          <b-form-input type="number" v-model="book.price" required></b-form-input>
        </b-form-group>
        <b-form-group label="Просмотров:">
          <b-badge>{{ book.views }}</b-badge>
        </b-form-group>
        <b-form-checkbox v-model="book.archived">В архиве</b-form-checkbox>
        <b-form-checkbox v-model="book.premium">Премиум</b-form-checkbox>
        <br>
        <br>
        <b-button-group>
          <b-button variant="success" @click="save()">Сохранить</b-button>
          <b-button variant="warning" @click="searchBook()">Сбросить изменения</b-button>
          <b-button variant="danger" @click="destroy()">Сжечь книгу</b-button>
        </b-button-group>
        </b-form>      
    </b-card>
  </div>
</template>

<script>
import Session from '../../services/session'

export default {
  data() {
    return {
      err: null,
      target: null,
      book: {},
      found: false
    }
  },
  methods: {
    searchBook() {
      this.$http.post('/api/admin/getBook', {
        token: Session.getToken(),
        id: this.target
      }).then(response => {
        if (!response.ok || !response.body.success) {
          this.err = response.body.message || '???';
          return;
        }

        this.book = response.body.book;
        this.found = true;
        this.err = false;
      });
    },
    destroy() {
      if (!confirm('Вы уверены что хотите удалить эту книгу?')) {
        return;
      }

      this.$http.post('/api/admin/deleteBook', {
        token: Session.getToken(),
        id: this.book._id
      }).then(response => {
        if (!response.ok || !response.body.success) {
          this.err = response.body.message || '???';
          return;
        }

        this.found = false;
        this.target = null;
        alert('Книга удалена.');
      });
    },
    save() {
      this.$http.post('/api/admin/updateBook', {
        token: Session.getToken(),
        id: this.book._id,
        data: this.book
      }).then(response => {
        if (!response.ok || !response.body.success) {
          this.err = response.body.message || '???';
          return;
        }

        this.searchBook();
        alert('Книга изменена.');
      });
    }
  }
}
</script>
