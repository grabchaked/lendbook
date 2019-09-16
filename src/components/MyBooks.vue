<template>
<div>

  <div class="container-fluid">
    <br>
    <h2 align="center">{{$t("mybooks.title")}} <b-btn class="btn btn-warning float-right" v-b-modal.wishlist v-if="user.subscribed">
      <font-awesome-icon icon="bookmark"/>
      {{$t("mybooks.wishlist")}}</b-btn>
    </h2>
<br>


 <b-modal ok-only :ok-title="$t('general.cancel')" nofade id="wishlist" :title="$t('mybooks.wishmodal.title')">
   <p class="my-4">{{$t("mybooks.wishmodal.text")}}</p>
   <div class="form-inline">
     <input type="text" :placeholder="$t('mybooks.wishmodal.ph')" maxlength="48" class="form-control col-9" v-model="wishlistItem">
     <button class="btn btn-success" style="margin-left:10px" @click="addToWishlist">
       <font-awesome-icon icon="plus"/>
     </button>
   </div>
  <br>
    <b-alert variant="danger" :show="!!err">
      {{ err }}
    </b-alert>

   <br>
   <ol>
     <li v-for="item,idx in user.wishlist">
        {{ item }}
        <button class="btn btn-danger float-right" @click="removeFromWishlist(item, idx)">
          <font-awesome-icon icon="times"/>
        </button>
      </li>
      <span v-if="!user.wishlist || user.wishlist.length == 0">
        {{$t("mybooks.wishmodal.empty")}}
      </span>
   </ol>
 </b-modal>

    <b-alert variant="danger" :show="!ok && !busy">
      {{$t("mybooks.fail")}}
    </b-alert>

    <div class="text-center">
        <b-alert variant="info" :show="mybooks.length == 0">
         {{$t("mybooks.empty")}}
        </b-alert>
    </div>

    <b-alert :show="!!err" variant="danger">
      {{ err }}
    </b-alert>

    <div class="row" v-if="ok && !busy">
      <div class="col-lg-3 col-md-4 col-sm-6" v-for="book in mybooks">
        <div class="card">
          <img class="card-img-top img-responsive" :src="book.img" alt="Card image" style="max-height:300px;">
          <div class="card-body">
            <h4 class="card-title text-center">{{book.title}}</h4>
            <p class="card-text">Автор: {{ book.author }}</p>
            <p class="card-text">Жанр:
              <span class="badge badge-warning">{{ book.genre[0] }}</span>
              <span class="badge badge-success">{{ book.genre[1] || ''}}</span>
            </p>
            <p class="card-text">{{ $t('bookinfo.pages')}}: {{ book.pages }}</p>
            <p class="price">{{ $t('general.price')}} <b><span class="badge badge-pill badge-dark">{{ book.trading ? $t('bookinfo.trading') : book.price+' грн.'}} </span></b></p>
            <hr>
            <p class="card-text">{{ $t('bookinfo.published')}} {{ book.date | prettyDate}}</p>
            <p class="card-text">{{ $t('bookinfo.views') }} {{ book.views }}</p>
            <!-- here on edit button shows up a modal box -->
            <b-alert variant="warning" :show="book.archived">
              <font-awesome-icon icon="archive"/>
              {{ $t('bookinfo.sold') }}
            </b-alert>
            <!--<a href="#" class="btn btn-primary float-left">Редактировать </a>-->
            <button class="btn btn-outline-danger float-right" @click="eliminateBook(book)">{{ $t('general.remove')}}</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <b-modal
    :title="$t('mybooks.removemodal.title')"
    header-bg-variant="danger"
    :ok-title="$t('mybooks.removemodal.ok')"
    :cancel-title="$t('mybooks.removemodal.cancel')"
    ref="deleteBookModal"
    @ok="sendBookRemove()"
    lazy
    no-fade>
   {{$t('mybooks.removemodal.text') }} <b>{{ targetBook.title }}</b>?
    <br>
    {{$t('mybooks.removemodal.text2') }}
  </b-modal>
</div>
</template>

<style scoped>

input[type='checkbox']{
  width: 15px;
  height: 15px;
  margin: 5px;
  font-size: 17px;
}

ol li {
  font-size: 18px;
  padding: 5px;
  margin: 0;
}

li button{
  padding:0 5px;
  border-radius:0;
  margin: 0;
}

.btn.btn-primary,
.btn.btn-outline-danger {
  margin: 0;
}
</style>

<script>
import Session from '../services/session'

export default {
  data() {
    return {
      user: {},
      mybooks: [],
      busy: true,
      ok: false,
      targetBook: {},
      err: null,

      wishlistItem: null
    }
  },
  methods: {
    eliminateBook(b) {
      this.targetBook = b;
      this.$refs.deleteBookModal.show();
    },
    sendBookRemove() {
      this.$http.post('/api/books/remove', {
        token: Session.getToken(),
        id: this.targetBook._id
      }).then(response => {
        if (!response.ok || !response.body.success) {
          this.err = response.body.message || 'Ошибка запроса.';
          return;
        }

        this.fetchData();
      }, error => {
        this.err = 'Не удалось выполнить запрос на удалении книги.';
      });
    },
    fetchData() {
      this.$http.post('/api/books/library', {
        token: Session.getToken()
      }).then(response => {
        if (!response.ok || !response.body.success) {
          this.busy = false;
          this.ok = false;
          return;
        }

        this.ok = true;
        this.busy = false;
        this.mybooks = response.body.list;
        this.user = Session.getUser();
      });
    },
    addToWishlist() {
      if (!this.wishlistItem || this.wishlistItem.length < 5) {
        this.err = 'Введите как мимнум 5 символов.';
        return;
      }

      this.$http.post('/api/books/wishlist/add', {
        token: Session.getToken(),
        item: this.wishlistItem
      }).then(response => {
        if (!response.body.success) {
          this.err = response.body.message;
          return;
        }

        this.user.wishlist.push(this.wishlistItem);
        this.wishlistItem = null;
        this.err = null;
      });
    },
    removeFromWishlist(item, idx) {
      this.$http.post('/api/books/wishlist/remove', {
        token: Session.getToken(),
        item: item
      }).then(response => {
        if (!response.body.success) {
          this.err = response.body.message;
          return;
        }

        this.user.wishlist.splice(idx, 1);
      });
    }
  },
  created() {
    if (!Session.isLoggedIn()) {
      this.$router.push('/home');
      return;
    }



    this.fetchData();
  }
}
</script>
