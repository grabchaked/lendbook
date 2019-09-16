<template>
  <div class="container">
    <div class="modal hide hide-animation" tabindex="-1" role="dialog" id="publishModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Добавить книгу</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" v-if="canPublish">
            <form class="form" autocomplete="off" @submit="addBook" v-on:submit.prevent>
              <div class="form-group row">


              <div class="col-12">
                <b-form-file @change="fileChange" accept="image/jpeg, image/png" class="form-control" required :placeholder="$t('newbook.photo')"></b-form-file>
              </div></div>
              <div class="form-group">
                <input type="text" class="form-control" :placeholder="$t('newbook.titlePh')" autocomplete="on" maxlength="99" v-model="book.title" required>
              </div>
              <div class="form-group">
                <input type="text" class="form-control" :placeholder="$t('newbook.authorPh')" autocomplete="on" maxlength="22" v-model="book.author" required>
              </div>
              <div class="form-group">
                <span class="badge badge-warning">
                  <select class="form-control" v-model="book.genre[0]" required>
                    <option value="" selected disabled>-- {{ $t('newbook.genrePh') }} --</option>
                    <option disabled>--По размеру--</option>
                    <option v-for="genre in avaliableArchGenres" :value="genre">{{ genre }}</option>
                    <option disabled>--По содержанию--</option>
                    <option v-for="genre in avaliableGenres" :value="genre">{{ genre }}</option>
                  </select>
                </span>
                <span class="badge badge-success">
                  <select class="form-control" v-model="book.genre[1]">
                    <option :value="null" selected>-- не обязательно --</option>
                    <option disabled>-- По размеру --</option>
                    <option v-for="genre in avaliableArchGenres" :value="genre">{{ genre }}</option>
                    <option disabled>-- По содержанию --</option>
                    <option v-for="genre in avaliableGenres" :value="genre">{{ genre }}</option>
                  </select>
                </span>
              </div>
              <div class="form-inline">
                <div class="form-group m-1">
                  <input type="number" class="form-control col-12" :placeholder="$t('newbook.pagesPh')" autocomplete="on" v-model="book.pages" required>
                </div><br><br><br>
                <div class="form-group m-1">
                  <input type="number" class="form-control col-12" :placeholder="$t('newbook.pricePh')" autocomplete="on" v-model="book.price" :disabled="book.trading" required>
                </div>
              </div>

              <b-form-checkbox
                     v-model="book.trading">
                {{ $t('newbook.trade') }}
              </b-form-checkbox>
              <br>
              <label v-if="book.trading">
                {{ $t('newbook.tradefor') }}
                <b-form-select v-model="book.tradeData" class="mb-3">
                  <option :value="0">{{ $t('newbook.tradeTypes[0]') }}</option>
                  <option :value="1">{{ $t('newbook.tradeTypes[1]') }}</option>
                  <option :value="2">{{ $t('newbook.tradeTypes[2]') }}</option>
                  <option :value="3">{{ $t('newbook.tradeTypes[3]') }}</option>
                  <option :value="4">{{ $t('newbook.tradeTypes[4]') }}</option>
                </b-form-select>
              </label>
              

            </form>
          </div>

          <div class="modal-body" v-if="!canPublish">
            <b-alert variant="danger" :show="!!err">
              {{ err }}
            </b-alert>
            <div v-if="!canPublish && !err">
              <font-awesome-icon icon="exclamation-circle"/> {{ $t('newbook.limitText') }}
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-success" @click="publish" v-if="canPublish" :disabled="busy">
              <font-awesome-icon icon="check"/>
              {{ busy ? $t('general.busy') : $t('newbook.publish') }}
            </button>

            <button type="button" class="btn btn-primary" v-if="!canPublish" @click="closeModal()">
              {{ $t('newbook.ok' )}}
            </button>

          </div>
          <span class="alert alert-danger" v-if="!!err">
              {{ err }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (max-width: 850px) {
.col-7 input {float: left;width:140%; display: block;}
span#or{width:140%; display: block; padding: 5px 0 5px 20px;}
}
  span{margin-top: 5px;}
</style>

<script>
import Session from '../services/session'
import Utils from '../services/utils'

let _file = null;

export default {
  data() {
    return {
      err: '',
      busy: false,
      file: null,
      book: {
        title: '',
        author: '',
        genre: [
          '',
          null
        ],
        pages: null,
        price: null,
        img: '',
        tradeData: 0,
        trading: false
      },
      avaliableArchGenres: Utils.avaliableArchGenres,
      avaliableGenres: Utils.avaliableGenres,
      canPublish: true,
      isTrading: false
    }
  },
  methods: {
    actualPublish(imgURL) {
      this.book.img = imgURL;
      this.$http.post('/api/books/publish', {
        token: Session.getToken(),
        book: this.book,
      }).then(response => {
        if (!response.ok) {
          this.err = this.$t('newbook.errors.request');
          this.busy = false;
          return;
        }

        if (!response.body.success) {
          this.err = response.body.message;
          this.busy = false;
          return;
        }

        jQuery('#publishModal').modal('hide');

        this.$router.push({
          name: 'book',
          params: {
            bookID: response.body.id
          }
        });

        this.busy = false;
      });
    },
    fileChange(ev) {
      _file = ev.target.files[0];
    },
    closeModal() {
      jQuery('#publishModal').modal('hide');
    },
    publish() {
      if (!this.canPublish) return;

      if (!_file) {
        this.err = this.$t('newbook.errors.photo');
        return;
      }

      if (!this.book.title || this.book.title.length < 2) {
        this.err = this.$t('newbook.errors.title');
        return;
      }

      if (!this.book.author || this.book.author.length < 2) {
        this.err = this.$t('newbook.errors.author');
        return;
      }

      if (!this.book.pages || this.book.pages == 0 || this.book.pages < 1  || this.book.pages > 9999) {
        this.err = this.$t('newbook.errors.pages');
        return;
      }

      if (!this.book.trading) if (!this.book.price || this.book.pages == 0 || this.book.price < 1 || this.book.price > 1000) {
        this.err = this.$t('newbook.errors.price');
        return;
      }

      this.book.price = Math.round(this.book.price);

      this.busy = true;

      var formData = new FormData();
      formData.append('image', _file, _file.name);

      this.$http.post('/api/books/uploadImage/'+Session.getToken(), formData,
      {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
      }).then(iresp => {
        if (!iresp.ok || !iresp.body.success) {
          this.err = this.$t('newbook.errors.photoUpload');
          this.busy = false;
          return;
        }

        this.actualPublish(iresp.body.url);
      });
    },
    check() {
      this.$http.post('/api/books/canPublish', {
        token: Session.getToken()
      }).then(response => {
        if (!response.body.success ) {
          this.canPublish = false;
          this.err = this.$t('newbook.errors.request');
          return;
        }

        this.canPublish = response.body.result;
      }, error => {
        if (!response.body.success ) {
          this.canPublish = false;
          this.err = this.$t('newbook.errors.server');
          return;
        }
      });
    }
  },
  created() {
    this.check();
  }
}
</script>
