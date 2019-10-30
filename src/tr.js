const messages = {
  ru: {
    general: {
      email: 'Электронная почта',
      login: 'Войти',
      cancel: 'Отмена',
      send: 'Отправить',
      subscription: 'Подписка',
      busy: 'Обработка...',
      price: 'Цена: ',
      remove: 'Удалить'
    },
    about: {
      title: 'Контакты',
      createdBy: 'Проект разработали:',
      creator2: 'Никита Когут',
      creator1: 'Едуард Грабчак',
      rank1: 'Основатель, Frontend Engineer',
      rank2: 'Со-основатель, Backend Engineer',
    },
    bookinfo: {
      title: 'Информация о книге',
      error: 'Не удалось загрузить информацию о книге. Возможно, ее уже нет.',
      searching: 'Ищем книгу в библиотеке...',
      report: 'Пожаловаться',
      pages: 'Количество страниц:',
      views: 'Просмотров:',
      city: 'Город:',
      seller: 'Продавец',
      published: 'Опубликовано: ',
      subscribed: 'Эту книгу продает пользователь с платной подпиской.',
      own: ' Вы - автор этого объявления.',
      sold: 'Эта книга уже заказана и находится в архиве.',
      onlyForRegistered: 'Покупка доступна только зарегистрованным пользователям',
      buy: 'Купить',

      buymodal: {
        title: 'Оформление покупки книги',
        pages: 'страниц.',
        selling: 'Продает:',
        warning: 'Внимание!',
        warnText: 'Для избежения недоразумений и мошенничества, оплачивайте заказ только наложенным платежом в отделении Новой Почты при получении',
        setFIO: 'Укажите ФИО и <a href="https://novaposhta.ua/timetable" target="_blank">адрес отделения "Нова Пошта"</a> для получения книги:',
        FIOph: 'ФИО получателя',
        confirm: 'Подтвердить',
        success: 'Поздравляем! Ваша заявка на покупку отправлена продавцу. Подтверждение прийдет Вам в раздел <router-link to="/notifcations">Уведомления</router-link>',
        fail: 'К сожалению, при обработке вашего запроса произошла ошибка. Попробуйте, пожалуйста, позже.',
      },

      reportmodal: {
        title: 'Отправка жалобы на объявление',
        text: 'Введите краткое содержание жалобы на книгу "<b>{title}</b>" пользователя <b>{publisher}</b>:',
        warn: 'Внимание! Злоупотребление функции отправки жалоб приведет к блокировке Вашего аккаунта.',
      },

      trading: 'Обмен',
      tradeText: 'Пользователь обменяет эту книгу на ',
      tradeContact: 'Свяжитесь с пользователем для выполнения обмена.'
    },

    dashboard: {
      sell: 'Создать обьявление',
      mybooks: 'Мои книги'
    },

    footer: {
      tos: 'Условия использования',
      privacypolicy: 'Политика конфиденциальности',
      contacts: 'Контакты'
    },

    home: {
      header: 'Сервис объявлений по обмене, продаже и покупке подержанных книг',
      subheader: 'Удобно. Быстро. Выгодно.',

      hiw: {
        title: 'Как работает Lendbook?',
        steps: [
          '1. Человек находит прочитанную книгу у себя на полке',
          '2. Публикует обьявление на сайт',
          '3. Покупатель находит из списка книг вашу и делает заказ',
          '4. Продавец получает уведомление что покупателя заинтересовала ваша книга',
          '5. Покупатель получает информацию об отправке и доставке книги',
          '6. Осмотр книги и оплата',
        ]
      },

      cards: [
        {
          title: 'Скорость',
          data: 'С помощью уведомлений пользователь быстро получает информацию об активности на сайте.'
        },
        {
          title: 'Многообразие',
          data: 'В нашей "библиотеке" вы найдёте более 20-ти разных жанров книг на любой вкус.'
        },
        {
          title: 'Выгода',
          data: 'Продавец отдает не нужную ему книгу, а покупатель экономит преобретая её, тем самым оба остаются в плюсе.'
        }
      ],
      whatbook: 'Какая книга вас интересует?'
    },

    login: {
      title: 'Войти',
      username: 'Имя пользователя или электронная почта',
      pass: 'Пароль',

      noprofile: 'Нет профиля?',
      createIt: 'Создайте его!'
    },

    mybooks: {
      title: 'Мои книги',
      wishlist: 'Список желаний',

      wishmodal: {
        title: 'Желаемые книги',
        text: 'Получать уведомления о наличии книг которые находятся в этом списке.',

        ph: 'Название книги',
        empty: 'Список желаний пуст.'
      },

      fail: 'Не удалось загрузить ваши книги.',
      empty: ' Ваш прилавок пуст! Создайте объявление на главной странице.',

      removemodal: {
        title: 'Удаление книги',
        ok: 'Сжечь книгу',
        cancel: 'Вернуть на полку',
        text: 'Вы уверены что хотите удалить книгу',
        text2: 'Она больше не будет доступна для покупки другим пользователям.',
      },
    },

    navbar: {
      login: 'Войти',
      register: 'Регистрация',
      notifications: 'Уведомления',
      subscription: 'Подписка',
      logout: 'Выйти'
    },

    newbook: {
      title: 'Добавить книгу',
      photo: 'Загрузить фото...',
      titlePh: 'Название книги',
      authorPh: 'Автор книги',
      genrePh: 'Жанр книги',
      pagesPh: 'Количество страниц',
      pricePh: 'Цена',

      publish: 'Опубликовать',
      ok: 'Хорошо',

      limitText: ' Ваш лимит одновременных объявлений исчерпан (на Вашем прилавке больше нет места). <br> <br> Вы можете оформить <router-link to="/pricing">подписку</router-link> и получить возможность публиковать неограниченное количество книг, список желаний, личный значок и многое другое. <br> <br> Для продолжения публикации объявлений без подписки, удалите старые либо дождитесь пока у вас кто-то их купит.',

      errors: {
        photo: 'Загрузите фото книги! (размером до 10 МБ)',
        title: 'Введите название книги!',
        author: 'Введите имя автора книги!',
        pages:  'Количество страниц должно быть от 1 до 9999!',
        price: 'Цена должна быть от 1 до 1000 грн.',
        photoUpload: 'Ой! Не удалось загрузить фото. Максимальный размер фото: 10 Мб. Формат: PNG/JPG',
        request: 'Ошибка обработки запроса. Пожалуйста, попробуйте позже.',
        server: 'Ошибка сервера. Пожалуйста, попробуйте позже.'
      },

      trade: 'Создать объявление обмена',
      tradefor: 'Обмен на:',
      tradeTypes: [
        "книгу из этой серии",
        "книгу такого-же жанра",
        "книгу этого-же автора",
        "книгу такой-же ценовой категории",
        "другую книгу, свяжитесь для уточнения"
      ]
    },

    notifications: {
      title: 'Уведомления',
      error: 'Не удалось загрузить уведомления.',
      loading: 'Загрузка...'
    },

    posts: {
      filters: 'Фильтры',
      filterPages: 'К-во страниц (до)',
      filterPrice: 'Цена (до)',

      error: 'Ошибка! Попробуйте обновить страницу.',

      all: 'Все объявления',
      last: 'Последние объявления',

      loading: 'Входим в библиотеку...'
    },

    book: {
      title: 'Название книги',
      pages: 'Количество страниц:',
      published: 'Опубликовал: ',
      view: 'Посмотреть',
      price: 'Цена: '
    },

    pricing: {
      title: 'Подписка',
      text: 'Получите все возможности сайта с помощью платной подписки!',

      card: {
        title: 'ПЛАТНАЯ ПОДПИСКА',
        price: '30 грн / месяц',
        pros: {
          first: 'Ваши обьявления будут первыми в поиске',
          wishlist: 'Получение уведомлений о наличии книг которые Вас интересуют',
          nolimit: 'Возможность публиковать неограниченное число книг',
          vip: 'Личный значок VIP'
        },
        buy: 'Купить',
        already: 'Подписка уже оформлена.',
        notLoggedIn: 'Подписка доступна только для зарегистрированных пользователей.',
      }
    },

    register: {
      title: 'Регистрация',
      username: 'Имя пользователя',
      targetName: 'Вы будете зарегестрированы как:',
      phone: 'Мобильный телефон',
      city: 'Город',
      pass: 'Пароль',
      acceptTos: 'Я принимаю <a href="#/termsofservice" target="_blank">условия использования сайта</a>',
      repeatPass: 'Повторите пароль',
      success: 'Ваш аккаунт успешно создан! Теперь вы можете войти.<br>Вы будете переадресованы на страницу входа через 3 сек.',
      createAcc: 'Создать аккаунт',

      errors: {
        diffPasses: 'Пароли не совпадают!',
        weakPass: 'Пароль должен быть не менее 6 символов в длинну!',
        noTos: 'Для завершения регистрации приймите наши условия пользования.',
        request: 'Запрос не удался. Обратитесь к администрации и попробуйте попытку позже',
      }
    },

    notification: {
      system: {
        title: 'Сообщение от Администрации'
      },
      subscription: {
        title: 'Подписка оформлена',
        text: 'Спасибо за подписку! Теперь вам доступны все функции сайта. Ваша подписка закончится '
      },
      subscription_end: {
        title: 'Подписка закончилась',
        text: ' Вы можете возобновить действие подписки <router-link to="/pricing">здесь</router-link>'
      },
      purchase: {
        title: 'Новая покупка книги',

        madeOrder: 'сделал заказ книги ',
        sendTo: 'Пожалуйста, отправьте книгу по адресу отделения Новой Почты',
        fio: 'ФИО покупателя:',
        contact: ' В случае возникновения вопросов Вы можете связатся с покупателем по номеру:'
      },
      purchase_accept: {
        title: 'Запрос на покупку отправлен',
        order: 'Ваш запрос на покупку',
        send: ' отправлен пользователю ',
        contact: ' В случае возникновения вопросов Вы можете связаться с продавцом по номеру:'
      },
      wishlist: {
        title: 'Список желаний',
        book: 'Книга ',
        appear: ' из Вашего списка желаний появилась в продаже.'
      }
    }
  },



  // UKRANIAN TRANSLATION



  uk: {
    general: {
      email: 'Електронна пошта',
      login: 'Увійти',
      cancel: 'Відміна',
      send: 'Відправити',
      subscription: 'Підписка',
      busy: 'Обробка...',
      price: 'Ціна: ',
      remove: 'Видалити'
    },
    about: {
      title: 'Контакти',
      createdBy: 'Проект розробили:',
      creator2: 'Нікіта Когут',
      creator1: 'Едуард Грабчак',
      rank1: 'Засновник, Frontend Engineer',
      rank2: 'Спів-засновник, Backend Engineer',
    },
    bookinfo: {
      title: 'Інформація про книгу',
      error: 'Не вдалось завантажити інформацію про книгу',
      searching: 'Шукаємо книгу в бібліотеці...',
      report: 'Поскаржитись',
      pages: 'Кількість сторінок:',
      views: 'Переглядів:',
      city: 'Місто:',
      seller: 'Продавець',
      published: 'Опубліковано: ',
      subscribed: 'Цю книгу продає користувач з платною підпискою',
      own: ' Ви - автор цієї об\'яви.',
      sold: 'Цю книгу уже замовили і знаходиться в архіві.',
      onlyForRegistered: 'Покупка доступна тільки зареєстрованим користувачам',
      buy: 'Придбати',

      buymodal: {
        title: 'Оформлення покупки книги',
        pages: 'сторінок.',
        selling: 'Продає:',
        warning: 'Увага!',
        warnText: 'Для уникнення недорозумінь і шахрайства, оплачуйте заказ тільки накладеним платежем у відділенні Нової Пошти.',
        setFIO: 'Укажіть ПІБ і <a href="https://novaposhta.ua/timetable" target="_blank">адресу відділення "Нова Пошта"</a> для отримання книги:',
        FIOph: 'ПІБ одержувача',
        confirm: 'Підтвердити',
        success: 'Вітаємо! Ваша заявка на покупку відправлена продавцю. Підтверждення прийде Вам в розділ <router-link to="/notifcations">Оповіщень</router-link>',
        fail: 'На жаль, при обробці Вашого запиту виникла помилка. Будь-ласка, спробуйте пізніше.',
      },

      reportmodal: {
        title: 'Відправка скарги',
        text: 'Введіть короткий зміст скарги на книгу "<b>{title}</b>" користувача <b>{publisher}</b>:',
        warn: 'Увага! Зловживання цієї функції приведе до повного блокування Вашого профіля.',
      },

      trading: 'Обмін',
      tradeText: 'Користувач обміняє цю книгу на ',
      tradeContact: 'Зв\'яжіться з автором оголошення для обміну.'
    },

    dashboard: {
      sell: 'Створити оголошення',
      mybooks: 'Мої книги'
    },

    footer: {
      tos: 'Умови використання',
      privacypolicy: 'Політика конфіденційності',
      contacts: 'Контакти'
    },

    home: {
      header: 'Сервіс по обміну, продажу та покупці б/у книг',
      subheader: 'Зручно. Швидко. Вигідно.',

      hiw: {
        title: 'Як працює Lendbook?',
        steps: [
          '1. Читач находить прочитану книгу у себе на полиці',
          '2. Публікує оголошення на сайт про її продаж',
          '3. Покупець знаходить це оголошення і робить замовлення',
          '4. Продавець отримує оповіщення що покупця зацікавила його книга',
          '5. Покупець отримує інформацію про доставку книги через Нову Пошту',
          '6. Огляд книги і оплата',
        ]
      },

      cards: [
        {
          title: 'Швидкість',
          data: 'За допомогою оповіщень користувач дізнається про активність на сайті.'
        },
        {
          title: 'Різноманітність',
          data: 'В нашій "бібліотеці" Ви знайдете книг на більше чим 20 різних жанрів'
        },
        {
          title: 'Вигодність',
          data: 'Продавець продає уже прочитану книгу, а покупець економить на її покупці.'
        }
      ],
      whatbook: 'Яка книга Вас цікавить?'
    },

    login: {
      title: 'Вхід',
      username: 'Логін користувача або електронна пошта',
      pass: 'Пароль',

      noprofile: 'Немає профіля?',
      createIt: 'Зареєструйтесь!'
    },

    mybooks: {
      title: 'Мої книги',
      wishlist: 'Список бажань',

      wishmodal: {
        title: 'Бажані книги',
        text: 'Отримуйте оповіщення про наявність книг з цього списку.',

        ph: 'Назва книги',
        empty: 'Список бажань порожній.'
      },

      fail: 'Не вдалось завантажити Ваші книги.',
      empty: ' Ваш прилавок порожній! Опублікуйте оголошення на головній сторінці',

      removemodal: {
        title: 'Видалення книги',
        ok: 'Спалити книгу',
        cancel: 'Повернути на полицю',
        text: 'Ви впевнені що хочете видалити цю книгу?',
        text2: 'Вона більше не буде доступна для покупки',
      },
    },

    navbar: {
      login: 'Вхід',
      register: 'Реєстрація',
      notifications: 'Оповіщення',
      subscription: 'Підписка',
      logout: 'Вийти'
    },

    newbook: {
      title: 'Додати книгу',
      photo: 'Загрузити фото...',
      titlePh: 'Назва книги',
      authorPh: 'Автор книги',
      genrePh: 'Жанр книги',
      pagesPh: 'Кількість сторінок',
      pricePh: 'Ціна',

      publish: 'Опублікувати',
      ok: 'Добре',

      limitText: ' Ваш ліміт активних оголошень вичерпано. <br><br> Ви можете придбати підписку та отпримати можливість публікувати необмежену кількість оголошень або дочекатись поки хтось купить попередні книги.',

      errors: {
        photo: 'Завантажте фотографію книги! (макс. розмір 10 МБ)',
        title: 'Введіть назву книги!',
        author: 'Введіть і\'мя автора книги!',
        pages:  'Кількість сторінок має бути в межах від 1 до 9999!',
        price: 'Ціна має бути від 1 до 1000 грн.',
        photoUpload: 'Ой! Не вдалось завантажити фотографію. Максимальний розмір 10 Мб. Формат: PNG/JPG',
        request: 'Помилка запиту. Будь-ласка, спробуйте пізніше.',
        server: 'Помилка сервера. Спробуйте, будь-ласка, пізніше.'
      },

      trade: 'Створити оголошення обміну',
      tradefor: 'Обмін на:',
      tradeTypes: [
        "книгу із цієї серії",
        "книгу такого-ж жанру",
        "книгу цього ж автора",
        "книгу з такої ж цінової категорії",
        "іншу книгу, зв'яжіться для подробиць"
      ]
    },

    notifications: {
      title: 'Оповіщення',
      error: 'Не вдалось завантажити список оповіщень.',
      loading: 'Завантаження...'
    },

    posts: {
      filters: 'Фільтри',
      filterPages: 'Кількість сторінок (до)',
      filterPrice: 'Ціна (до)',

      error: 'Помилка! Спопробуйте оновити сторінку.',

      all: 'Всі оголошення',
      last: 'Останні оголошення',

      loading: 'Заходим в бібліотеку...'
    },

    book: {
      title: 'Назва книги',
      pages: 'Кількість сторінок:',
      published: 'Опублікував: ',
      view: 'Переглянути',
      price: 'Ціна: '
    },

    pricing: {
      title: 'Підписка',
      text: 'Отримайте всі можливості сайту придбавши платну підписку!',

      card: {
        title: 'ПЛАТНА ПІДПИСКА',
        price: '30 грн / місяць',
        pros: {
          first: 'Ваші оголошення будуть першими в списку',
          wishlist: 'Отримуйте оповіщення про наявність книг, що Вас цікавлять',
          nolimit: 'Можливість публікувати необмежену кількість оголошень',
          vip: 'Особистий значок VIP'
        },
        buy: 'Придбати',
        already: 'Підписка вже оформлена.',
        notLoggedIn: 'Підписка доступна тільки для зареєстрованих користувачів.',
      }
    },

    register: {
      title: 'Реєстрація',
      username: 'Логін користувача',
      targetName: 'Ви будете зареєстровані як:',
      phone: 'Мобільний телефон',
      city: 'Місто',
      pass: 'Пароль',
      acceptTos: 'Я приймаю <a href="#/termsofservice" target="_blank">умови використання</a>',
      repeatPass: 'Повторіть пароль',
      success: 'Ваш профіль створено! Тепер Ви можете увійти. <br> Ви будете переадресовані на сторінку входу через 3 сек.',
      createAcc: 'Створити аккаунт',

      errors: {
        diffPasses: 'Паролі не співпадають!',
        weakPass: 'Пароль має бути не менше 6 символів в довжину!',
        noTos: 'Для завершення реєстрації прийміть наші умови використання',
        request: 'Помилка запиту. Зверніться будь-ласка до адміністрації або спробуйте пізніше.',
      }
    },

    notification: {
      system: {
        title: 'Повідомлення від Адмінстрації'
      },
      subscription: {
        title: 'Підписка оформлена',
        text: 'Дякуємо! Тепер Вам доступні всі функції сайту. Ваша підписка закінчиться '
      },
      subscription_end: {
        title: 'Підписка закінчилась',
        text: 'Ви можете відновити підписку <router-link to="/pricing">тут</router-link>'
      },
      purchase: {
        title: 'Нове замовлення книги',

        madeOrder: 'зробив заказ книги ',
        sendTo: 'Будь-ласка, відправте книгу на адрес відділення Нової Пошти ',
        fio: 'ПІБ покупця:',
        contact: ' В випадку виникнення питань звертайтесь до покупця за номером: '
      },
      purchase_accept: {
        title: 'Замовлення відправлено',
        order: 'Ваш запит на покупку',
        send: ' відправлено користувачу ',
        contact: ' У випадку виникнення питань звертайтесь до продавця за номером: '
      },
      wishlist: {
        title: 'Список бажань',
        book: 'Книга ',
        appear: ' із Вашого списка бажань з\'явилась у продажу.'
      }
    }
  }
};

export default {
  messages
}