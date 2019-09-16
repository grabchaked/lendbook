<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-3 col-md-4 col-sm-6" v-for="book in data">
        <div class="card text-dark bg-white">

          <img class="card-img-top img-responsive" :src="book.img" alt="error">
          <div class="card-body">
            <h5 class="mb-2 card-title text-center overflow ellipsis">{{book.title}}</h5>
            <p class="card-text overflow ellipsis">Автор: <b>{{book.author}}</b></p>
            <p class="card-text overflow ellipsis">Жанр:
              <span class="badge badge-warning">{{book.genre[0]}}</span>
              <span class="badge badge-success">{{book.genre[1] || ''}}</span>
            </p>
            <p class="card-text">{{ $t('book.pages')}} <b>{{book.pages}}</b></p>
            <p class="card-text overflow ellipsis">
              <font-awesome-icon icon="crown" v-if="book.premium" style="color: orange;"/> {{$t('book.published')}} <b>
              {{book.publisher || 'Nickname'}}
            </b></p>
            <p class="price" v-if="!book.trading"><b><span class="badge badge-pill badge-dark">{{book.price}} грн.</span></b></p>
            <p class="price" v-if="book.trading"><span class="badge badge-pill badge-dark">{{ $t('bookinfo.trading') }}</span></p>
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

.ellipsis { text-overflow: ellipsis; }
.overflow {
    width: 99%;
  margin:0px auto;
  white-space: nowrap;
    overflow: hidden;
}

.card img {
  width: auto;
  height: 280px;
  transition: all 0.3s ease-in-out;
}

  .card{height: auto;}

small{display: inline-block;float: left;margin-top: 5px; color: grey;}
.form-group span{margin: 5px;}
.badge{margin:0; font-size: 14px;padding: 5px;}
.price .badge{padding: 5px 8px; margin: 0;}

.select-view{
  font-size: 30px;
  margin:10px 20px;
  cursor: pointer;
  color: darkgrey;
  transition: 0.3s;
}

.select-view:hover{
  color: black;
}

  @media only screen and (max-width: 850px) {

.buy-btn{
margin-top: 10px;

}

.col-sm-3,.col-sm-4{padding:5px 20%;}

    .form-inline .form-group{ margin: 0 auto;  width: 100%;}
    .form-group{font-size: 14px; text-align: left;}

    .col-6 {padding:0;}

    .card img{
      height: 250px;
      width: auto;
    }
    .card{width: 95%; margin: 5px auto;height: auto;}


  }
</style>
