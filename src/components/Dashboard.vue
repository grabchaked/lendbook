<template>
   <div>
      <br>
      <div class="container-fluid">
         <div class="text-center">
            <button class="btn btn-outline-success" data-toggle="modal" data-target="#publishModal">
               <font-awesome-icon icon="plus"/>
               {{ $t('dashboard.sell ')}}
            </button>
            <router-link to="/mybooks">
               <a class="btn btn-outline-primary" role="button">
                  <font-awesome-icon icon="book"/>
                  {{ $t('dashboard.mybooks ')}}
               </a>
            </router-link>
         </div>
         <br>
         <Posts></Posts>
         <NewBook></NewBook>
      </div>
   </div>
</template>
<style scoped>
   @media (max-width: 850px) {
   .sm-center{justify-content: center;}
   .btn-outline-success{
   margin: 20px;
   }
   }
   a.btn {
   margin: 0 10px 0 20px;
   }
   a.btn.btn-outline-primary {
   color: #007bff;
   }
   a:hover.btn.btn-outline-primary {
   color: white;
   }
</style>
<script>
   import Posts from './Posts.vue';
   import NewBook from './NewBook.vue';

   import Utils from '../services/utils'

   import Session from '../services/session'

   export default {
     data() {
       return {
         search: "",
         book:{
           genre:[]
         },
         avaliableGenres: Utils.avaliableGenres,
         avaliableArchGenres: Utils.avaliableArchGenres
       };
     },
     created() {
       if (!Session.isLoggedIn()) {
         this.$router.push('/home');
       }
     },
     components: {
       Posts,
       NewBook
     }
   };
</script>
