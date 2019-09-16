<template>
   <div>
      <div class="container">
         <h2 align='center'>{{ $t("about.title") }}</h2>
         <div class="card card-about">
            <div class="card-body">
               <h6> <b>{{ $t("about.createdBy") }}</b></h6>
               <p>
                  <a href="https://instagram.com/grabchaked" target='_blank'>{{ $t("about.creator1") }}</a>
                  <small>{{ $t("about.rank1") }}</small>
               </p>
               <p>
                  <a href="https://instagram.com/_mronlinecoder_" target='_blank'>{{ $t("about.creator2") }}</a>
                  <small>{{ $t("about.rank2") }}</small>
               </p>
               <hr style="width:50%;">
               <h6> <b>{{ $t("general.email") }}</b></h6>
               <a href="mailto:contact.lendbook@gmail.com">
                  contact.lendbook
                  <font-awesome-icon icon="at"/>
                  gmail.com
               </a>
               <br>
            </div>
            <p class="text-center">С ❤ Lendbook</p>
         </div>
      </div>
   </div>
</template>
<script>
   export default {};
</script>
<style scoped>
   p{padding: 5px 0 5px 0;margin: 0;}
   .card-body {
   text-align: center;
   padding: 10px;
   margin: 10px;
   }
   .badge {
   margin: 5px;
   }
   .card.card-about {
   margin: 2% 5%;
   }
</style>
