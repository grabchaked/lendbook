<template>
  <div>
    <div class="form-group row justify-content-center">
      <div class="col-sm-6">
        <input type="text" id="search" class="form-control" placeholder="Поиск 🔍" autocomplete="off" v-model="filter.search">
      </div>
    </div>
    <br>
    <div v-if="loggedIn">
    <h4 class="filters" v-show="!seen" @click="seen = !seen">{{ $t('posts.filters') }}</h4>
      <form v-if="seen" class="form-inline justify-content-center">
        <div class="form-group col-sm-4">
          <span>Жанр</span>
          <select class="form-control" v-model="filter.genre">
            <option :value="null">[ любой ]</option>
            <option selected disabled>--По размеру--</option>
            <option v-for="genre in avaliableArchGenres" :value="genre">{{ genre }}</option>
            <option disabled>--По содержанию--</option>
            <option v-for="genre in avaliableGenres" :value="genre">{{ genre }}</option>
          </select>
        </div>
        <div class="form-group col-sm-3">
          <span>{{ $t('posts.filterPages') }}</span>
          <input type="number" min="1" max="1000" class="form-control" placeholder="1" v-model="filter.pages">
        </div>
        <div class="form-group col-sm-3">
          <span>{{ $t('posts.filterPrice') }}</span>
          <input type="number" min="1" max="1000" class="form-control" placeholder="1 грн" v-model="filter.price">

        </div>
      </form>
    </div>

    <br>
    <h4 align='center'>{{ hasFilter ?  $t('posts.all') : $t('posts.last')}}</h4>
    <hr style="width:30%;margin:10px auto;">

    <div class="alert alert-danger" v-if="err">
      >{{ $t('posts.error') }}
    </div>
    <div class="grid-select">
      <font-awesome-icon class="select-view" icon="th" @click="displayMode = 0"/>
      <font-awesome-icon class="select-view" icon="list-ul" @click="displayMode = 1"/>

    </div>

    <h5 align="center" v-if="!loaded"><font-awesome-icon icon="spinner" spin/> {{$t('posts.loading') }}</h5>
    <div class="row" v-if="loaded && !err">

      <PostsGridView v-if="displayMode == 0" :data="filteredBooks" @buy="buy" />
      <PostsListView v-if="displayMode == 1" :data="filteredBooks" @buy="buy" />

    </div>
    <br>
    <b-pagination class="pagination" align='center' :total-rows="books.length" v-model="currentPage" :per-page="pageSize"></b-pagination>
  </div>
</template>

<style>
input#search{width: 60%; margin: 0 auto;transition: 0.3s;}
input#search:focus{width: 80%;}
.pagination{
  margin-top: 50px;
}

.filters{
  text-align: center;
  background-color:transparent;
  padding: 5px;
  border: 1px solid black;
  border-radius: 30px;
  width: 20%;
  margin: 0 auto;
  cursor: pointer;
  transition: 0.3s;
  font-size: 18px;
}

.filters:hover{
  color: white;
  background-color: black;
}

@media screen and (max-width:850px) {
  .filters{width: 35%; font-size: 16px;}
}

.select-view{
  font-size: 30px;
  margin:10px 20px;
  cursor: pointer;
  color: darkgrey;
  transition: 0.3s;
}

.grid-select{
  text-align: center;
}

.select-view:hover{
  color: black;
}

</style>

<script>
import PostsGridView from './PostsGridView.vue'
import PostsListView from './PostsListView.vue'

import Utils from '../services/utils'
import Session from '../services/session'


export default {
  data() {
    return {
      err: false,
      loaded: false,
      books: [],
      currentPage: 0,
      pageSize: 32,
      loggedIn: false,
      avaliableGenres: Utils.avaliableGenres,
      avaliableArchGenres: Utils.avaliableArchGenres,
      filter: {
        genre: null,
        pages: null,
        search: null,
        price: null
      },
      displayMode:0,
      seen:false
    };
  },
  components:{
    PostsGridView,
    PostsListView
  },
  methods: {
    buy(item) {
      this.$router.push({
        name: 'book',
        params: {
          bookID: item._id
        }
      });
    },

    getSearch() {
      this.$http.get('/api/books/search/'+this.filter.search).then(response => {
        if (!response.ok || !response.body.success) {
          this.err = true;
          this.loaded = false;
          return;
        }

        this.books = response.body.results;
        this.err = false;
      });
    },
    fetchLatest() {
      this.$http.get("/api/books/latest").then(response => {

        if (!response.ok || !response.body.success) {
          this.err = true;
          this.loaded = true;
          return;
        }

        this.err = false;

        this.books = Utils.sortBookList(response.body.books);

        this.loaded = true;
      }, response => {
        this.err = true;
        this.loaded = true;
        return;
      });
    }
  },
  created() {
    this.loggedIn = Session.isLoggedIn();
    this.fetchLatest();
  },
  computed: {
    filteredBooks() {
      if (!this.hasFilter) return this.books.slice((this.currentPage-1) * this.pageSize, (this.currentPage) * this.pageSize);
      let searchPhrase = !!this.filter.search ? this.filter.search.toLowerCase() : '';

      return this.books.filter(book => {
        if (this.filter.pages && book.pages > this.filter.pages) return false;
        if (this.filter.price && book.price > this.filter.price) return false;
        if (this.filter.genre && !book.genre.includes(this.filter.genre)) return false;


        return book.title.toLowerCase().match(searchPhrase) || book.author.toLowerCase().match(searchPhrase);
      }).slice((this.currentPage-1) * this.pageSize, (this.currentPage) * this.pageSize);
    },
    hasFilter() {
      return !!(this.filter.search || this.filter.pages || this.filter.genre || this.filter.price);
    }
  },
  watch: {
    'filter.search'() {
      if (this.filter.search.length == 3) {
        this.getSearch();
        return;
      }

      if (this.filter.search.length == 0) {
        this.fetchLatest();
      }
    }
  }
};
</script>
