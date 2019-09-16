<template>
   <div>
      <div class="container-fluid">
         <h2 align='center'>{{ $t("bookinfo.title") }}</h2>
         <b-alert variant="danger" :show="err">
            {{ $t("bookinfo.error") }}
         </b-alert>
         <div class="alert alert-primary" v-if="busy && !err">
            <font-awesome-icon icon="spinner" spin />
             {{ $t("bookinfo.searching") }}
         </div>
         <div class="row text-center" v-if="!busy && !err">
            <div class="col-lg-3 col-md-4 col-sm-5">
               <div class="card">
                  <img class="card-img-top img-responsive" :src="book.img" alt="Card image">
               </div>
            </div>
            <div class="col-lg-6 col-md-5 col-sm-5">
               <div class="card">
                  <div class="card-body">
                     <h4 class="card-text">
                        <b>{{book.title}}</b>
                        <b-button
                           variant="outline-danger"
                           class="float-right"
                           v-b-tooltip.hover :title="$t('bookinfo.report')"
                           v-if="loggedIn && !myself"
                           @click="openReportModal()"
                           v-b-modal.reportModal>
                           <font-awesome-icon icon="flag"/>
                        </b-button>
                     </h4>
                     <p class="card-text">
                        <font-awesome-icon icon="pen-fancy" />
                        Автор: <b>{{book.author}}</b>
                     </p>
                     <p class="card-text">
                        <font-awesome-icon icon="code-branch" />
                        Жанр:
                        <span class="badge badge-warning">{{book.genre[0]}}</span>
                        <span class="badge badge-success">{{ book.genre[1] || '' }}</span>
                     </p>
                     <p class="card-text">
                        <font-awesome-icon icon="book-open" />
                         {{ $t("bookinfo.pages") }} <b>{{ book.pages }}</b>
                     </p>
                     <hr>
                     <p class="card-text">
                        <font-awesome-icon icon="eye" />
                         {{ $t("bookinfo.views") }} <b>{{ book.views }}</b>
                        <br>
                        <span v-if="loggedIn">
                           <font-awesome-icon icon="map-marker-alt"/>
                            {{ $t("bookinfo.city") }} <b>{{ user.city }}<br></b>
                        </span>
                        <font-awesome-icon :icon="book.premium ? 'crown' : 'user' " />
                         {{ $t("bookinfo.seller") }} <b>{{ myself ? 'Я' : book.publisher }}</b>
                     </p>
                     <hr>
                     <div class="alert alert-warning vip-block" v-if="book.premium">
                        <font-awesome-icon icon="crown" style="color: orange;" />
                         {{ $t("bookinfo.subscribed") }}
                     </div>
                     <div class="alert alert-info vip-block" v-if="myself">
                        <font-awesome-icon icon="child" />
                         {{ $t("bookinfo.own") }}
                     </div>
                     <div class="alert alert-warning vip-block" v-if="book.archived">
                        <font-awesome-icon icon="archive" />
                         {{ $t("bookinfo.sold") }}
                     </div>
                      <div class="alert alert-info vip-block" v-if="book.trading">
                        <font-awesome-icon icon="retweet" />
                         {{ $t("bookinfo.tradeText") }}<b> {{ $t('newbook.tradeTypes['+book.tradeData+']') }}</b>
                     </div>
                     <small v-if="!loggedIn">
                      {{ $t("bookinfo.onlyForRegistered") }}
                     </small>
                     <br><br>
                     <span class="float-right badge badge-pill badge-dark">
                        <p class="price" v-if="!book.trading">{{book.price}} грн.</p>
                        <p class="price" v-if="book.trading">{{ $t('bookinfo.trading') }}</p>
                     </span>
                     <button class="float-left btn btn-success btn-lg" @click="openBuy()" v-if="loggedIn && !myself && !book.archived" :disabled="purchase.done">
                        <font-awesome-icon icon="cart-arrow-down" />
                        {{ book.trading ? $t('bookinfo.trading') : $t('bookinfo.buy')}}
                     </button>
                     <div v-if="!loggedIn" class="float-left">
                        <router-link to="/login">
                           <button class="float-left btn btn-success">
                            {{ $t("general.login") }}
                           </button>
                        </router-link>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <b-modal
         ref="buyModal"
         :title="$t('bookinfo.buymodal.title')"
         header-text-variant="white"
         header-bg-variant="success"
         cancel-title="Назад"
         :ok-title="$t('general.cancel')"
         ok-only
         no-fade
         size="lg">
         <h4>{{book.title}}</h4>
         <hr>
         <ul style="list-style-type: none;">
            <li><b>{{ book.author}}</b> </li>
            <li>
               <b-badge>
                  {{ book.pages}}
               </b-badge>
               {{ $t('bookinfo.buymodal.pages') }}
            </li>
            <li>
               <span class="badge badge-warning">{{book.genre[0]}}</span>
               <span class="badge badge-success">{{ book.genre[1] || '' }}</span>
            </li>
         </ul>
         <hr>
         <p>
            {{ $t('bookinfo.buymodal.selling') }}: <b>{{book.publisher}}</b>
            <br>
            <font-awesome-icon icon="phone"/>
            {{ user.phone }}

            <p v-if="book.trading">{{$t('bookinfo.tradeContact')}}</p>
         </p>
         <b v-if="!book.trading"><p class="text-danger"> {{ $t('bookinfo.buymodal.warning') }}! </p> {{ $t('bookinfo.buymodal.warnText') }}</b>
         <hr>
         <b-form-group v-if="!book.trading">
            <img src="img/novaposhta.png" class="img-fluid" style="width: 5%; height: 5%">
            <span v-html="$t('bookinfo.buymodal.setFIO')"></span>
            <br>
            <br>
            <b-form-input :placeholder="$t('bookinfo.buymodal.FIOph')" required v-model="purchase.fullname"/>
            <br>
            <b-form-input placeholder="город Киев, отделение №1" required v-model="purchase.address"/>
         </b-form-group>
         <hr>
         <h3 align="center" v-if="!book.trading">
            {{ book.price }} грн.
         </h3>
         <div style="text-align: center;" v-if="!book.trading">
            <b-button variant="success" size="lg" @click="doThePurchase()" v-if="!purchase.done">
               {{ $t('bookinfo.buymodal.confirm') }}
            </b-button>
         </div>
         <b-alert variant="success" :show="purchase.done" v-html="$t('bookinfo.buymodal.success')">
         </b-alert>
         <b-alert variant="danger" :show="purchase.error && !purchase.done">
            {{ $t('bookinfo.buymodal.fail') }}
          </b-alert>
      </b-modal>
      <b-modal
         id="reportModal"
         header-bg-variant="danger"
         :title="$t('bookinfo.reportmodal.title')"
         ok-title="Отправить"
         cancel-title="Отмена"
         @ok="reportBook"
         lazy
         no-fade>
        <span v-html="$t('bookinfo.reportmodal.text', {title: book.title, publisher: book.publisher})"></span>
         <br>
         <br>
         <b-form-input maxlength="128" v-model="reportText" placeholder=""/>
         <br>
         <br>
         <p class="text-danger">
            {{ $t('bookinfo.reportmodal.warn') }}
         </p>
      </b-modal>
   </div>
</template>
<style scoped>
   @media (max-width: 850px) {
   .badge-dark p{font-size: 16px;}
   }
   li{padding: 5px;}
   .card-text{margin: 5px;}
   .badge{margin: 5px;}
   .badge-dark{font-size: 20px; padding-top: 10px; margin-right: 10px;}
   .btn-lg{font-size: 20px; font-weight: bold; padding: 8px;}
   .card img {
   width: auto;
   margin-left: 0 auto;
   }
   .card img {
   width: auto;
   height: 400px;
   transition: all 0.3s ease-in-out;
   }
   .vip-block {
   text-align: left;
   }
</style>
<script>
   import Session from '../services/session'

   export default {
     data() {
       return {
         busy: true,
         book: {
           title: '',
           author: '',
           pages: 0,
           img: '',
           price: 0,
           publisher: '',
           premium: false,
           genre: [],
           date: new Date(),
           views: 0
         },
         purchase: {
           address: null,
           fullname: null,
           done: false,
           error: false
         },
         user:{
           city:'',
           phone: ''
         },
         myself: false,
         loggedIn: Session.isLoggedIn(),
         err: false,
         reportText: null,
       }
     },
     methods: {
       fetchData() {
         this.$http.get('/api/books/info/'+this.$route.params.bookID).then(response => {
           if (!response.ok || !response.body.success) {
             this.err = true;
             return;
           }

           this.book = response.body.book;
           this.busy = false;
           this.myself = Session.getUser().username == this.book.publisher;
           this.loadPhone();
         }, error => {
           this.err = true;

         });
       },
       loadPhone() {
         this.$http.post('/api/books/getBookPhone', {
           token: Session.getToken(),
           target: this.book.publisher
         }).then(response => {
           if (!response.ok || !response.body.success) {
             this.err = true;
             return;
           }


           this.busy = false;
           this.user.phone = response.body.phone;
           this.user.city = response.body.city;
         });
       },
       openBuy() {
         this.$refs.buyModal.show();
       },
       reportBook() {
         this.$http.post('/api/books/report/'+this.book._id, {
           token: Session.getToken(),
           content: this.reportText
         });
       },
       doThePurchase(data, event) {
         this.$http.post('/api/books/purchase', {
           address: this.purchase.address,
           fullname: this.purchase.fullname,
           book: this.$route.params.bookID,
           token: Session.getToken()
         }).then(response => {
           if (!response.ok || !response.body.success) {
             this.purchase.error = true;
             return;
           }

           this.purchase.done = true;
           this.purchase.error = false;
         }, error => {
           this.purchase.done = false;
           this.purchase.error = true;
         });
       }
     },
     created() {
       this.fetchData();
     }
   }
</script>
