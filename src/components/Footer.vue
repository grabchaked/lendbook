<template>
<div>
  <footer>
    &copy; Lendbook 2018<br>
    <router-link to="/termsofservice"> {{ $t('footer.tos')}} |</router-link>
    <router-link to="/privacy-policy">  {{ $t('footer.privacypolicy')}} |</router-link>
    <router-link to="/pricing">  {{ $t('general.subscription')}} |</router-link>
    <router-link to="/about"> {{ $t('footer.contacts')}}</router-link>
   
    <br>
    <span class="language">
      <a href="#" @click.prevent @click="switchLocale('uk')"><img src="https://emojipedia-us.s3.amazonaws.com/thumbs/120/twitter/141/flag-for-ukraine_1f1fa-1f1e6.png" class="img-resonsive"></a>
      |
      <a href="#" @click.prevent @click="switchLocale('ru')"><img src="https://emojipedia-us.s3.amazonaws.com/thumbs/120/twitter/141/flag-for-russia_1f1f7-1f1fa.png" class="img-resonsive"></a>
    </span>
  </footer>
</div>
</template>

<script>
import Locale from '../services/locale'

export default {
  methods: {
    switchLocale(l) {
      Locale.switchLocale(l);

      this.$i18n.locale = l;
    }
  }
}
</script>

<style>

footer {
  bottom: 0;
  width: 100%;
  font-size: 14px;
  position: relative;
  display: block;
  color: black;
  text-align: center;
  font-weight: bold;
  padding:20px 0 5px 0;
}

.language img{
  margin:5px;
  width:30px;
  height:auto;
}

footer a{color: grey;}
footer a:hover{color: #363738; text-decoration: none;}

</style>
