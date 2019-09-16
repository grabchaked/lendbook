<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12" v-for="book in data">
        <div class="card text-dark bg-white">

          <img class="card-img-top img-responsive col-4" :src="book.img" alt="error">

          <div class="card-body col-8">
            <h5 class="mb-2 card-title text-center overflow ellipsis">{{book.title}}</h5>
            <p class="card-text overflow ellipsis">Автор: <b>{{book.author}}</b></p>
            <p class="card-text overflow ellipsis">Жанр:
              <span class="badge badge-warning">{{book.genre[0]}}</span>
              <span class="badge badge-success">{{book.genre[1] || ''}}</span>
            </p>
            <p class="card-text">{{ $t('book.pages')}}: <b>{{book.pages}}</b></p>
            <p class="card-text overflow ellipsis">
              <font-awesome-icon icon="crown" v-if="book.premium" style="color: orange;"/> {{ $t('book.published')}}: <b>
              {{book.publisher || 'Nickname'}}
            </b></p>
            <p class="price" v-if="!book.trading">{{ $t('book.price')}} <b><span class="badge badge-pill badge-dark">{{book.price}} грн.</span></b></p>
            <p class="price" v-if="book.trading"><b><span class="badge badge-pill badge-dark">{{$t('bookinfo.trading')}}</span></b></p>
            <small class="date">{{ book.date | prettyDate }}</small>
            <div class="sm-btn">

            <button class="btn btn-primary float-right buy-btn" @click="$emit('buy', book)">
              <font-awesome-icon icon="eye" />
              {{ $t('book.view')}}
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  props:['data']
}
</script>

<style scoped>
@media only screen and (max-width: 850px) {

.card{
  width: 100% !important;

}


.buy-btn{
margin-top: 10px;
}

.date{
  font-size: 12px;
  margin-left: 15%;
}

.card img{

  padding: 5px !important;
  width: auto;
  height: 160px !important;
}

.btn{font-size: 14px; }

.card-body, .card-text, .price, small{
 text-align: left !important;
 margin-left: 20% !important;
 font-size: 13px;
}

.badge{font-size: 13px;}

}



.ellipsis { text-overflow: ellipsis; }
.overflow {
    width: 99%;
  margin:0px auto;
  white-space: nowrap;
    overflow: hidden;
}

.card{
  width: 80%;
  margin: 10px auto;
  height: auto;
}

.card img{
  position: absolute;
  padding: 10px;
  width: auto;
  height: 260px;
}

.btn-primary{
margin-right: -20%;
}

 .card-body, .card-text, .price, .card-title, small{
  text-align: left !important;
  margin-left: 20%;
}

.card-body{
float: right;
}

</style>
