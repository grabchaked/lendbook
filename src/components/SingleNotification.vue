<template>
  <div>
    <div v-if="data.type == 'system'">
      <span class="badge badge-danger">
        <font-awesome-icon icon="info-circle"/>
        {{ $t('notification.system.title')}}
      </span> 
      <small>{{ data.date | prettyDate }}</small>
      <br>
      <span v-html="data.content.message"></span>
    </div>

    <div v-if="data.type == 'subscription'">
      <span class="badge badge-warning">
        <font-awesome-icon icon="crown"/>
        {{ $t('notification.subscription.title')}}
      </span> 
      <small>{{ data.date | prettyDate }}</small>
      <br>
      {{ $t('notification.subscription.text')}}  <b>{{ data.content.end | subDate }} </b>
    </div>

    <div v-if="data.type == 'subscription_end'">
      <span class="badge badge-info">
        <font-awesome-icon icon="calendar-times"/>
         {{ $t('notification.subscription_end.title')}}
      </span> 
      <small>{{ data.date | prettyDate }}</small>
      <br>
      <span v-html="$t('notification.subscription_end.text')"></span>
    </div>

    <div v-if="data.type == 'purchase'">
      <span class="badge badge-success">
        <font-awesome-icon icon="cart-plus"/>
        {{ $t('notification.purchase.title')}}
      </span> 
      <small>{{ data.date | prettyDate }}</small>
      <br>
      <b>{{ data.content.buyer }}</b> {{ $t('notification.purchase.madeOrder')}} <router-link :to='"/book/"+data.content.bookID'>{{data.content.title}}</router-link>.
      <br>
      <br>
      {{ $t('notification.purchase.sendTo') }} <b>{{ data.content.address }}</b>
      <br>
      <br>
      {{ $t('notification.purchase.fio') }} <b>{{ data.content.fullname }}</b>
      <br>
       {{ $t('notification.purchase.contact') }} <b>{{data.content.phone}}</b>
    </div>

    <div v-if="data.type == 'purchase_accepted'">
      <span class="badge badge-success">
        <font-awesome-icon icon="cart-plus"/>
        {{$t('notification.purchase_accept.title') }}
      </span> 
      <small>{{ data.date | prettyDate }}</small>
      <br>
      {{$t('notification.purchase_accept.order') }} <router-link :to='"/book/"+data.content.bookID'>"{{data.content.title}}"</router-link> {{$t('notification.purchase_accept.send') }} <b>{{ data.content.seller }}</b>.
      <br>
      <br>
      {{$t('notification.purchase_accept.contact') }} <b>{{data.content.phone}}</b>
    </div>

    <div v-if="data.type == 'wishlist'">
      <span class="badge badge-primary">
        <font-awesome-icon icon="bookmark"/>
         {{$t('notification.wishlist.title') }}
      </span> 
      <small>{{ data.date | prettyDate }}</small>
      <br>
      {{$t('notification.wishlist.book') }} <router-link :to="'/book/'+data.content.bookID">{{ data.content.title }}</router-link> {{$t('notification.wishlist.appear') }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["data"]
};
</script>
