<template>
  <div>
    <table class="table table-hover">
      <thead>
        <th>Логин</th>
        <th>Почта</th>
        <th>Телефон</th>
        <th>Подписка</th>
        <th>Сообщение</th>
        <th>Забанить</th>
      </thead>
      <tbody>
        <tr v-for="user in users">
          <td :class="user.banned ? 'text-danger' : ''">{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.phone }} </td>
          <td>
            <font-awesome-icon icon="crown" style="color: orange;" v-if="user.subscribed" />
            <b-button v-if="!user.subscribed" @click="openGiveSub(user.username)">Выдать</b-button>
          </td>
          <td>
            <b-button variant="primary" @click="openMessage(user)">
              <font-awesome-icon icon="envelope"/>
            </b-button>
          </td>
          <td>
            <b-button variant="danger" @click="openBan(user)" v-if="!user.banned">
              <font-awesome-icon icon="ban"/>
            </b-button>
            <span v-if="user.banned">Забанен</span>
          </td>
        </tr>
      </tbody>
    </table>

    <b-modal ref="msgModal" 
            title="Отправить сообщение пользователю"
            ok-title="Отправить"
            cancel-title="Отмена"
            @ok="sendMessage()">
      <p>
        Напишите сообщение для <b>{{ msg.target }}</b>:
      </p>
      <br>
      <textarea v-model="msg.content" class="form-control"></textarea>
    </b-modal>

     <b-modal ref="banModal" 
            title="Забанить пользователя"
            ok-title="Умножить на 0"
            cancel-title="Отменяй, Джим!"
            header-bg-variant="danger"
            @ok="sendBan()">
      <p>
        Вы пытаетесь забанить пользователя <b>{{ banTarget }}</b>.
        <br>
        Это действие переместит все активные объявления пользователя в архив а также запретит доступ к сайту.
        <br>
        Продолжить?
      </p>
    </b-modal>

    <b-modal ref="subModal"
              title="Выдача подписки"
              cancel-title="Отмена"
              @ok="giveSubscription()">
      Выдать подписку пользователю <b>{{subTarget}} </b>?
    </b-modal>
  </div>
</template>

<script>
import Session from '../../services/session'

export default {
  data() {
    return {
      err: false,
      users: {},
      msg: {
        target: '',
        content: ''
      },
      banTarget: '',
      subTarget: '',
    }
  },
  created() {
    this.$http.get('/api/admin/users/'+Session.getToken()).then(response => {
      if (!response.ok || !response.body.success) {
        this.err = true;
        return;
      }

      this.users = response.body.users;
    });
  },
  methods: {
    openMessage(user) {
      this.msg.target = user.username;
      
      this.$refs.msgModal.show();
    },
    openBan(user) {
      this.banTarget = user.username;

      this.$refs.banModal.show();
    },
    sendMessage() {
      this.$http.post('/api/admin/sendMessage', {
        token: Session.getToken(),
        message: this.msg
      }).then(response => {
        if (!response.ok || !response.body.success) {
          alert('Не удалось отправить сообщение!');
          return;
        }

        alert('Отправлено.');
        this.$refs.msgModal.hide();
      });
    },
    sendBan() {
      this.$http.post('/api/admin/ban', {
        token: Session.getToken(),
        target: this.banTarget
      }).then(response => {
        if (!response.ok || !response.body.success) {
          alert('Не удалось забанить пользователя!');
          return;
        }

        this.$refs.banModal.hide();
      });
    },
    giveSubscription() {
      this.$http.post('/api/admin/giveSubscription', {
        token: Session.getToken(),
        target: this.subTarget
      }).then(response => {
        alert('Запрос выполнен. Результат: '+response.body.success);
      }, error => {
        alert('Ошибка запроса.');
      });
    },
    openGiveSub(user) {
      this.$refs.subModal.show();
      this.subTarget = user;
    }
  }
}
</script>
