<template>
   <div>
      <div class="container-fluid text-center">
         <img src="img/logo.png" class="logo">
         <br><br>
         <h5 id="intro">{{ $t('home.header')}}</h5>
         <br>
         <h6>{{ $t('home.subheader')}}</h6>
         <br>
         <button class="btn btn-outline-primary" v-show="!seen" @click="seen = !seen">Подробнее</button>
         <br>
         <div class="info" v-if="seen">
            <h4>{{ $t('home.hiw.title')}}</h4>
            <div class="card card-info">
               <div class="carousel slide" data-ride="carousel" id="info">
                  <div class="carousel-inner">
                     <div class="carousel-item active">
                        <p>{{ $t('home.hiw.steps[0]')}}</p>
                     </div>
                     <div class="carousel-item">
                        <p>{{ $t('home.hiw.steps[1]')}}</p>
                     </div>
                     <div class="carousel-item">
                        <p>{{ $t('home.hiw.steps[2]')}}</p>
                     </div>
                     <div class="carousel-item">
                        <p>{{ $t('home.hiw.steps[3]')}}</p>
                     </div>
                     <div class="carousel-item">
                        <p>{{ $t('home.hiw.steps[4]')}}</p>
                     </div>
                     <div class="carousel-item">
                        <p>{{ $t('home.hiw.steps[5]')}}</p>
                     </div>
                  </div>
                  <a class="carousel-control-prev" href="#info" data-slide="prev">
                  <span class="carousel-control-prev-icon"></span>
                  </a>
                  <a class="carousel-control-next" href="#info" data-slide="next">
                  <span class="carousel-control-next-icon"></span>
                  </a>
               </div>
            </div>
            <br>
            <div class="row">
               <div class="col-sm-4">
                  <div class="card">
                     <h5>{{ $t('home.cards[0].title') }}</h5>
                     <p>{{ $t('home.cards[0].data') }}</p>
                  </div>
               </div>
               <div class="col-sm-4">
                  <div class="card">
                     <h5>{{ $t('home.cards[1].title') }}</h5>
                     <p>{{ $t('home.cards[1].data') }}</p>
                  </div>
               </div>
               <div class="col-sm-4">
                  <div class="card">
                     <h5>{{ $t('home.cards[2].title') }}</h5>
                     <p>{{ $t('home.cards[2].data') }}</p>
                  </div>
               </div>
            </div>
            
         </div>
         <br>
         <!-- <hr style="width:80%;margin:5px auto"> -->
         <br>
         <h5>{{ $t('home.whatbook') }}</h5>
         <Posts></Posts>
      </div>
   </div>
</template>
<style scoped>
   .card.card-info,
   .card.card-info p {
   background-color: #ff9900;
   color: white;
   margin: 5px;
   }
   kbd{
   font-size: 14px;
   font-style: italic;
   padding: 10px;
   opacity: 0.8;
   font-family: 'Comfortaa', serif;
   box-shadow: 1px 2px lightgrey;
   border-radius: 20px;
   }
   .card h5 {
   color: #ff9900;
   }
   .carousel-control-prev-icon,
   .carousel-control-next-icon {
   background-color: black;
   border-radius: 50%;
   opacity: 0.5;
   font-size: 14px;
   }
   .info .card {
   width: 90%;
   margin: 0 auto;
   padding: 10px;
   }
   @media (max-width: 850px) {
   .col-5 {
   padding: 0;
   }
   }
</style>
<script>
   import Posts from "./Posts.vue";

   import Session from "../services/session";

   export default {
     data(){
       return {seen:false, hidebtn:true}
     },
     components: {
       Posts
     },
     created() {
       if (Session.isLoggedIn()) {
         this.$router.push("/dashboard");
       }

     }
   };
</script>
