<template>
<div>
  <div class="container-fluid pricing">
    <h2>{{ $t('pricing.title') }}</h2>
    <p>{{ $t('pricing.text') }}</p>
    <div class="row justify-content-center">

      <div class="card subscription col-lg-6 col-md-4 col-sm-4">
        <div class="card-header"><b>{{ $t('pricing.card.title') }}</b></div><br>
        <h2 class="float-left"> {{ $t('pricing.card.price') }}</h2>
        <div class="card-body">
          <p>
            <font-awesome-icon icon="hand-point-up"/>
            {{$t('pricing.card.pros.first')}}
          </p>
        </div>
        <div class="card-body">
          <p>
            <font-awesome-icon icon="star"/>
            {{$t('pricing.card.pros.wishlist')}}
          </p>
        </div>
        <div class="card-body">
          <p>
            <font-awesome-icon icon="infinity"/>
            {{$t('pricing.card.pros.nolimit')}}
          </p>
        </div>
        <!--<div class="card-body">
          <p>
            <font-awesome-icon icon="ban"/>
            Полное отсутствие рекламы
          </p>
        </div>-->
        <div class="card-body">
          <p>
            <font-awesome-icon icon="crown"/>
            {{$t('pricing.card.pros.vip')}}
          </p>
        </div>

        <div class="card-footer text-center">
          <button class="btn btn-success btn-lg" @click="buySubscription()" v-if="loggedIn && !user.subscribed">
            <font-awesome-icon icon="check"/>
           {{$t('pricing.card.buy')}}
          </button>

          <p v-if="loggedIn && user.subscribed">
            {{$t('pricing.card.already')}}
          </p>

          <b v-if="!loggedIn">
            {{$t('pricing.card.notLoggedIn')}}
          </b>
          </div>
      </div>
    </div>


  </div>

  <b-modal
    class=""
    ref="subscribeModal"
    title="Покупка подписки"
    header-bg-variant="warning"
    cancel-title="Отмена"
    ok-only
    ok-title="Отмена"
    ok-variant="danger"
    lazy
    no-fade
    >
    <div class="pricing-modal">


    <p>Подписка будет оформлена в течении дня с момента покупки.</p>

    <p>Подтверждение будет отправлено в раздел уведомлений.  </p>

    <p>Стоимость подписки - <b>30 грн / месяц</b>. Указывайте эту сумму в соотвествующее поле при оплате.</p>

      <p>При возникновении вопросов относительно подписки Вы всегда можете <router-link to="/about"> связаться с нами. </router-link></p>
      <p>
        <b>В поле "Комментарий к платежу" указывайте ваш логин <b-badge><font-awesome-icon icon="user"/> {{ user.username }}</b-badge> или электронную почту <b-badge><font-awesome-icon icon="envelope"/> {{ user.email }}</b-badge>.</b></p>
    <p class="text-danger">Внимание! При указании меньшей или большей суммы чем стоимость подписки - Ваши средства не возвращаются.Если Вы перевели ошибочное количество денег при оплате - напишите нам на почту <a href="mailto:contact.lendbook@gmail.com">contact.lendbook <font-awesome-icon icon="at"/>
          gmail.com</a></p>
    </div>
    <button ok-title="Перейти к оплате" class="btn btn-primary" @click="paySubscripton()">Перейти к оплате</button>

  </b-modal>
</div>
</template>
<style scoped>

.pricing-modal p{
  margin: 0; padding: 5px;
}

  @media only screen and (max-width: 850px) {
    .card{width: 90%;}
    .btn{padding: 5px;}
  }

.card.subscription {
  padding: 0;
  margin: 5px auto;
}

.pricing {
  text-align: center;
}

.pricing-modal > p {
  font-family: 'Arial', sans-serif;
}

.card-body {
  padding: 5px;
  margin: 0;
}

.card.subscription,
.subscription b,
.subscription .card-body,
.subscription .card-footer p {
  background-color: #ff9900;
  color: white;
}
</style>
<script>
import Session from '../services/session'

export default {
  data() {
    return{
      loggedIn: false,
      user: {}
    }
  },
  methods: {
    buySubscription() {
      this.$refs.subscribeModal.show();
    },
    paySubscripton(){
      window.location.href = 'https://www.liqpay.ua/ru/checkout/card/lendbook';
    }
  },
  created() {
    this.loggedIn = Session.isLoggedIn();
    if (this.loggedIn) this.user = Session.getUser();
  }
};
</script>
