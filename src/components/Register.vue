<template>
<div>

  <div class="container py-5">
    <div class="row">
      <div class="col-md-12">

        <div class="row">
          <div class="col-md-6 mx-auto">

            <!-- form card login -->
            <div class="card rounded-2">
              <div class="card-header">
                <h3 class="mb-0">{{ $t("register.title") }}</h3>
              </div>
              <div class="card-body">
                <form class="form" autocomplete="off" @submit="register" v-on:submit.prevent>
                  <div class="form-group">
                    <label for="">{{ $t("register.username") }}</label>
                    <input type="text" class="form-control form-control" placeholder="Имя пользователя" autocomplete="on" v-model="user.username" maxlength="24" required>
                    <br>
                    <span v-if="user.username">
                       {{ $t("register.targetName") }} <b>{{ goodName }}</b>
                    </span>
                  </div>

                  <div class="form-group">
                    <label for="">{{ $t("general.email") }}</label>
                    <input type="email" class="form-control form-control" placeholder="user@example.com" autocomplete="on" v-model="user.email" required>
                  </div> 

                  <div class="form-group">
                    <label for="">{{ $t("register.phone") }}</label>
                    <input type="text" class="form-control form-control" placeholder="XXX YYY YY YY" autocomplete="on" v-model="user.phone" required>
                  </div>

                  <div class="form-group">
                    <label for="">{{ $t("register.city") }}</label>
                    <select class="form-control" required v-model="user.city">
                      <option value='Авдеевка'>Авдеевка</option>
                      <option value='Александрия'>Александрия</option>
                      <option value='Александровск'>Александровск</option>
                      <option value='Алмазная'>Алмазная</option>
                      <option value='Алупка'>Алупка</option>
                      <option value='Алушта'>Алушта</option>
                      <option value='Алчевск'>Алчевск</option>
                      <option value='Ананьев'>Ананьев</option>
                      <option value='Андрушёвка'>Андрушёвка</option>
                      <option value='Антрацит'>Антрацит</option>
                      <option value='Апостолово'>Апостолово</option>
                      <option value='Армянск'>Армянск</option>
                      <option value='Артёмовск'>Артёмовск</option>
                      <option value='Артёмовск'>Артёмовск</option>
                      <option value='Арциз'>Арциз</option>
                      <option value='Ахтырка'>Ахтырка</option>
                      <option value='Балаклея'>Балаклея</option>
                      <option value='Балта'>Балта</option>
                      <option value='Бар'>Бар</option>
                      <option value='Барановка'>Барановка</option>
                      <option value='Барвенково'>Барвенково</option>
                      <option value='Бахмач'>Бахмач</option>
                      <option value='Бахчисарай'>Бахчисарай</option>
                      <option value='Баштанка'>Баштанка</option>
                      <option value='Белая Церковь'>Белая Церковь</option>
                      <option value='Белгород-Днестровский'>Белгород-Днестровский</option>
                      <option value='Белз'>Белз</option>
                      <option value='Белогорск'>Белогорск</option>
                      <option value='Белополье'>Белополье</option>
                      <option value='Бердичев'>Бердичев</option>
                      <option value='Бердянск'>Бердянск</option>
                      <option value='Берегово'>Берегово</option>
                      <option value='Бережаны'>Бережаны</option>
                      <option value='Березань'>Березань</option>
                      <option value='Березне'>Березне</option>
                      <option value='Берестечко'>Берестечко</option>
                      <option value='Берислав'>Берислав</option>
                      <option value='Бершадь'>Бершадь</option>
                      <option value='Бобринец'>Бобринец</option>
                      <option value='Бобрка'>Бобрка</option>
                      <option value='Бобровица'>Бобровица</option>
                      <option value='Богодухов'>Богодухов</option>
                      <option value='Богуслав'>Богуслав</option>
                      <option value='Болград'>Болград</option>
                      <option value='Болехов'>Болехов</option>
                      <option value='Борзна'>Борзна</option>
                      <option value='Борислав'>Борислав</option>
                      <option value='Борисполь'>Борисполь</option>
                      <option value='Борщёв'>Борщёв</option>
                      <option value='Боярка'>Боярка</option>
                      <option value='Бровары'>Бровары</option>
                      <option value='Броды'>Броды</option>
                      <option value='Брянка'>Брянка</option>
                      <option value='Бурштын'>Бурштын</option>
                      <option value='Бурынь'>Бурынь</option>
                      <option value='Буск'>Буск</option>
                      <option value='Буча'>Буча</option>
                      <option value='Бучач'>Бучач</option>
                      <option value='Валки'>Валки</option>
                      <option value='Васильевка'>Васильевка</option>
                      <option value='Васильков'>Васильков</option>
                      <option value='Ватутино'>Ватутино</option>
                      <option value='Вахрушево'>Вахрушево</option>
                      <option value='Вашковцы'>Вашковцы</option>
                      <option value='Великие Мосты'>Великие Мосты</option>
                      <option value='Великий Бурлук'>Великий Бурлук</option>
                      <option value='Верхнеднепровск'>Верхнеднепровск</option>
                      <option value='Вижница'>Вижница</option>
                      <option value='Винница'>Винница</option>
                      <option value='Виноградов'>Виноградов</option>
                      <option value='Вишнёвое'>Вишнёвое</option>
                      <option value='Владимир-Волынский'>Владимир-Волынский</option>
                      <option value='Вознесенск'>Вознесенск</option>
                      <option value='Волноваха'>Волноваха</option>
                      <option value='Волочиск'>Волочиск</option>
                      <option value='Волчанск'>Волчанск</option>
                      <option value='Вольногорск'>Вольногорск</option>
                      <option value='Вольнянск'>Вольнянск</option>
                      <option value='Вышгород'>Вышгород</option>
                      <option value='Гадяч'>Гадяч</option>
                      <option value='Гайворон'>Гайворон</option>
                      <option value='Гайсин'>Гайсин</option>
                      <option value='Галич'>Галич</option>
                      <option value='Геническ'>Геническ</option>
                      <option value='Герца'>Герца</option>
                      <option value='Глиняны'>Глиняны</option>
                      <option value='Глобино'>Глобино</option>
                      <option value='Глухов'>Глухов</option>
                      <option value='Голая Пристань'>Голая Пристань</option>
                      <option value='Горловка'>Горловка</option>
                      <option value='Горное'>Горное</option>
                      <option value='Городенка'>Городенка</option>
                      <option value='Городище'>Городище</option>
                      <option value='Городня'>Городня</option>
                      <option value='Городок'>Городок</option>
                      <option value='Городок'>Городок</option>
                      <option value='Горохов'>Горохов</option>
                      <option value='Гребёнка'>Гребёнка</option>
                      <option value='Гуляйполе'>Гуляйполе</option>
                      <option value='Дебальцево'>Дебальцево</option>
                      <option value='Деражня'>Деражня</option>
                      <option value='Дергачи'>Дергачи</option>
                      <option value='Десна'>Десна</option>
                      <option value='Джанкой'>Джанкой</option>
                      <option value='Дзержинск'>Дзержинск</option>
                      <option value='Димитров'>Димитров</option>
                      <option value='Днепродзержинск'>Днепродзержинск</option>
                      <option value='Днепропетровск'>Днепропетровск</option>
                      <option value='Добромиль'>Добромиль</option>
                      <option value='Доброполье'>Доброполье</option>
                      <option value='Докучаевск'>Докучаевск</option>
                      <option value='Долина'>Долина</option>
                      <option value='Долинская'>Долинская</option>
                      <option value='Донецк'>Донецк</option>
                      <option value='Дрогобыч'>Дрогобыч</option>
                      <option value='Дружковка'>Дружковка</option>
                      <option value='Дубляны'>Дубляны</option>
                      <option value='Дубно'>Дубно</option>
                      <option value='Дубровица'>Дубровица</option>
                      <option value='Дунаевцы'>Дунаевцы</option>
                      <option value='Евпатория'>Евпатория</option>
                      <option value='Енакиево'>Енакиево</option>
                      <option value='Жашков'>Жашков</option>
                      <option value='Ждановка'>Ждановка</option>
                      <option value='Жёлтые Воды'>Жёлтые Воды</option>
                      <option value='Жидачов'>Жидачов</option>
                      <option value='Житомир'>Житомир</option>
                      <option value='Жмеринка'>Жмеринка</option>
                      <option value='Жолква'>Жолква</option>
                      <option value='Залещики'>Залещики</option>
                      <option value='Запорожье'>Запорожье</option>
                      <option value='Заставна'>Заставна</option>
                      <option value='Збараж'>Збараж</option>
                      <option value='Зборов'>Зборов</option>
                      <option value='Звенигородка'>Звенигородка</option>
                      <option value='Здолбунов'>Здолбунов</option>
                      <option value='Зеньков'>Зеньков</option>
                      <option value='Зимогорье'>Зимогорье</option>
                      <option value='Змиев'>Змиев</option>
                      <option value='Знаменка'>Знаменка</option>
                      <option value='Золотое'>Золотое</option>
                      <option value='Золотоноша'>Золотоноша</option>
                      <option value='Золочев'>Золочев</option>
                      <option value='Зоринск'>Зоринск</option>
                      <option value='Зугрэс'>Зугрэс</option>
                      <option value='Ивано-Франковск'>Ивано-Франковск</option>
                      <option value='Измаил'>Измаил</option>
                      <option value='Изюм'>Изюм</option>
                      <option value='Изяслав'>Изяслав</option>
                      <option value='Ильичёвск'>Ильичёвск</option>
                      <option value='Ирпень'>Ирпень</option>
                      <option value='Иршава'>Иршава</option>
                      <option value='Ичня'>Ичня</option>
                      <option value='Кагарлык'>Кагарлык</option>
                      <option value='Казатин'>Казатин</option>
                      <option value='Калиновка'>Калиновка</option>
                      <option value='Калуш'>Калуш</option>
                      <option value='Каменец-Подольский'>Каменец-Подольский</option>
                      <option value='Каменка'>Каменка</option>
                      <option value='Каменка-Бугская'>Каменка-Бугская</option>
                      <option value='Каменка-Днепровская'>Каменка-Днепровская</option>
                      <option value='Камень-Каширский'>Камень-Каширский</option>
                      <option value='Канев'>Канев</option>
                      <option value='Карловка'>Карловка</option>
                      <option value='Каховка'>Каховка</option>
                      <option value='Керчь'>Керчь</option>
                      <option value='Киверцы'>Киверцы</option>
                      <option value='Киев'>Киев</option>
                      <option value='Килия'>Килия</option>
                      <option value='Кировоград'>Кировоград</option>
                      <option value='Кировское'>Кировское</option>
                      <option value='Кицмань'>Кицмань</option>
                      <option value='Кобеляки'>Кобеляки</option>
                      <option value='Ковель'>Ковель</option>
                      <option value='Кодыма'>Кодыма</option>
                      <option value='Коломыя'>Коломыя</option>
                      <option value='Комсомольск'>Комсомольск</option>
                      <option value='Конотоп'>Конотоп</option>
                      <option value='Константиновка'>Константиновка</option>
                      <option value='Корец'>Корец</option>
                      <option value='Коростень'>Коростень</option>
                      <option value='Коростышев'>Коростышев</option>
                      <option value='Корсунь-Шевченковский'>Корсунь-Шевченковский</option>
                      <option value='Корюковка'>Корюковка</option>
                      <option value='Косов'>Косов</option>
                      <option value='Костополь'>Костополь</option>
                      <option value='Котовск'>Котовск</option>
                      <option value='Краматорск'>Краматорск</option>
                      <option value='Красилов'>Красилов</option>
                      <option value='Красноармейск'>Красноармейск</option>
                      <option value='Красноград'>Красноград</option>
                      <option value='Краснодон'>Краснодон</option>
                      <option value='Краснопартизанск'>Краснопартизанск</option>
                      <option value='Красноперекопск'>Красноперекопск</option>
                      <option value='Красный Лиман'>Красный Лиман</option>
                      <option value='Красный Луч'>Красный Луч</option>
                      <option value='Кременец'>Кременец</option>
                      <option value='Кременчуг'>Кременчуг</option>
                      <option value='Кривой Рог'>Кривой Рог</option>
                      <option value='Кролевец'>Кролевец</option>
                      <option value='Кузнецовск'>Кузнецовск</option>
                      <option value='Купянск'>Купянск</option>
                      <option value='Ладыжин'>Ладыжин</option>
                      <option value='Лановцы'>Лановцы</option>
                      <option value='Лебедин'>Лебедин</option>
                      <option value='Лисичанск'>Лисичанск</option>
                      <option value='Лозовая'>Лозовая</option>
                      <option value='Лохвица'>Лохвица</option>
                      <option value='Лубны'>Лубны</option>
                      <option value='Луганск'>Луганск</option>
                      <option value='Лутугино'>Лутугино</option>
                      <option value='Луцк'>Луцк</option>
                      <option value='Львов'>Львов</option>
                      <option value='Любомль'>Любомль</option>
                      <option value='Люботин'>Люботин</option>
                      <option value='Майорск'>Майорск</option>
                      <option value='Макеевка'>Макеевка</option>
                      <option value='Малая Виска'>Малая Виска</option>
                      <option value='Малин'>Малин</option>
                      <option value='Марганец'>Марганец</option>
                      <option value='Мариуполь'>Мариуполь</option>
                      <option value='Мелитополь'>Мелитополь</option>
                      <option value='Мена'>Мена</option>
                      <option value='Мерефа'>Мерефа</option>
                      <option value='Миргород'>Миргород</option>
                      <option value='Мироновка'>Мироновка</option>
                      <option value='Миусинск'>Миусинск</option>
                      <option value='Могилёв-Подольский'>Могилёв-Подольский</option>
                      <option value='Молодогвардейск'>Молодогвардейск</option>
                      <option value='Молочанск'>Молочанск</option>
                      <option value='Монастыриска'>Монастыриска</option>
                      <option value='Монастырище'>Монастырище</option>
                      <option value='Мостиска'>Мостиска</option>
                      <option value='Мукачево'>Мукачево</option>
                      <option value='Надворная'>Надворная</option>
                      <option value='Нежин'>Нежин</option>
                      <option value='Немиров'>Немиров</option>
                      <option value='Нетешин'>Нетешин</option>
                      <option value='Николаев'>Николаев</option>
                      <option value='Николаев'>Николаев</option>
                      <option value='Никополь'>Никополь</option>
                      <option value='Новая Каховка'>Новая Каховка</option>
                      <option value='Новая Одесса'>Новая Одесса</option>
                      <option value='Новгород-Северский'>Новгород-Северский</option>
                      <option value='Нововолынск'>Нововолынск</option>
                      <option value='Новоград-Волынский'>Новоград-Волынский</option>
                      <option value='Новогродовка'>Новогродовка</option>
                      <option value='Новоднестровск'>Новоднестровск</option>
                      <option value='Новодружеск'>Новодружеск</option>
                      <option value='Новомиргород'>Новомиргород</option>
                      <option value='Новомосковск'>Новомосковск</option>
                      <option value='Новопсков'>Новопсков</option>
                      <option value='Новоселица'>Новоселица</option>
                      <option value='Новоукраинка'>Новоукраинка</option>
                      <option value='Новый Буг'>Новый Буг</option>
                      <option value='Новый Роздол'>Новый Роздол</option>
                      <option value='Носовка'>Носовка</option>
                      <option value='Обухов'>Обухов</option>
                      <option value='Овруч'>Овруч</option>
                      <option value='Одесса'>Одесса</option>
                      <option value='Орджоникидзе'>Орджоникидзе</option>
                      <option value='Орехов'>Орехов</option>
                      <option value='Острог'>Острог</option>
                      <option value='Очаков'>Очаков</option>
                      <option value='Павлоград'>Павлоград</option>
                      <option value='Первомайск'>Первомайск</option>
                      <option value='Первомайск'>Первомайск</option>
                      <option value='Первомайский'>Первомайский</option>
                      <option value='Перевальск'>Перевальск</option>
                      <option value='Перемышляны'>Перемышляны</option>
                      <option value='Перечин'>Перечин</option>
                      <option value='Перещепино'>Перещепино</option>
                      <option value='Переяслав-Хмельницкий'>Переяслав-Хмельницкий</option>
                      <option value='Першотравенск'>Першотравенск</option>
                      <option value='Петровское'>Петровское</option>
                      <option value='Пирятин'>Пирятин</option>
                      <option value='Погребище'>Погребище</option>
                      <option value='Подволочиск'>Подволочиск</option>
                      <option value='Подгайцы'>Подгайцы</option>
                      <option value='Подгородное'>Подгородное</option>
                      <option value='Пологи'>Пологи</option>
                      <option value='Полонное'>Полонное</option>
                      <option value='Полтава'>Полтава</option>
                      <option value='Попасная'>Попасная</option>
                      <option value='Почаев'>Почаев</option>
                      <option value='Приволье'>Приволье</option>
                      <option value='Прилуки'>Прилуки</option>
                      <option value='Приморск'>Приморск</option>
                      <option value='Припять'>Припять</option>
                      <option value='Пустомыты'>Пустомыты</option>
                      <option value='Путивль'>Путивль</option>
                      <option value='Пятихатки'>Пятихатки</option>
                      <option value='Рава-Русская'>Рава-Русская</option>
                      <option value='Радехов'>Радехов</option>
                      <option value='Радивилов'>Радивилов</option>
                      <option value='Радомышль'>Радомышль</option>
                      <option value='Рахов'>Рахов</option>
                      <option value='Ржищев'>Ржищев</option>
                      <option value='Ровеньки'>Ровеньки</option>
                      <option value='Ровно'>Ровно</option>
                      <option value='Рогатин'>Рогатин</option>
                      <option value='Рожище'>Рожище</option>
                      <option value='Ромны'>Ромны</option>
                      <option value='Рубежное'>Рубежное</option>
                      <option value='Рудки'>Рудки</option>
                      <option value='Саки'>Саки</option>
                      <option value='Самбор'>Самбор</option>
                      <option value='Сарны'>Сарны</option>
                      <option value='Свалява'>Свалява</option>
                      <option value='Сватово'>Сватово</option>
                      <option value='Свердловск'>Свердловск</option>
                      <option value='Светловодск'>Светловодск</option>
                      <option value='Севастополь'>Севастополь</option>
                      <option value='Северодонецк'>Северодонецк</option>
                      <option value='Седнев'>Седнев</option>
                      <option value='Селидово'>Селидово</option>
                      <option value='Семёновка'>Семёновка</option>
                      <option value='Середина-Буда'>Середина-Буда</option>
                      <option value='Симферополь'>Симферополь</option>
                      <option value='Синельниково'>Синельниково</option>
                      <option value='Скадовск'>Скадовск</option>
                      <option value='Скалат'>Скалат</option>
                      <option value='Сквира'>Сквира</option>
                      <option value='Сколе'>Сколе</option>
                      <option value='Славута'>Славута</option>
                      <option value='Славутич'>Славутич</option>
                      <option value='Славянск'>Славянск</option>
                      <option value='Смела'>Смела</option>
                      <option value='Снежное'>Снежное</option>
                      <option value='Снигирёвка'>Снигирёвка</option>
                      <option value='Снятын'>Снятын</option>
                      <option value='Сокаль'>Сокаль</option>
                      <option value='Сокиряны'>Сокиряны</option>
                      <option value='Соледар'>Соледар</option>
                      <option value='Старобельск'>Старобельск</option>
                      <option value='Староконстантинов'>Староконстантинов</option>
                      <option value='Старый Крым'>Старый Крым</option>
                      <option value='Старый Самбор'>Старый Самбор</option>
                      <option value='Стаханов'>Стаханов</option>
                      <option value='Сторожинец'>Сторожинец</option>
                      <option value='Стрый'>Стрый</option>
                      <option value='Судак'>Судак</option>
                      <option value='Сумы'>Сумы</option>
                      <option value='Суходольск'>Суходольск</option>
                      <option value='Счастье'>Счастье</option>
                      <option value='Таврийск'>Таврийск</option>
                      <option value='Тальное'>Тальное</option>
                      <option value='Тараща'>Тараща</option>
                      <option value='Татарбунары'>Татарбунары</option>
                      <option value='Теплогорск'>Теплогорск</option>
                      <option value='Теплодар'>Теплодар</option>
                      <option value='Теребовля'>Теребовля</option>
                      <option value='Терновка'>Терновка</option>
                      <option value='Тернополь'>Тернополь</option>
                      <option value='Тетиев'>Тетиев</option>
                      <option value='Тлумач'>Тлумач</option>
                      <option value='Токмак'>Токмак</option>
                      <option value='Торез'>Торез</option>
                      <option value='Тростянец'>Тростянец</option>
                      <option value='Трускавец'>Трускавец</option>
                      <option value='Тульчин'>Тульчин</option>
                      <option value='Тысменица'>Тысменица</option>
                      <option value='Тячев'>Тячев</option>
                      <option value='Угледар'>Угледар</option>
                      <option value='Угнев'>Угнев</option>
                      <option value='Ужгород'>Ужгород</option>
                      <option value='Узин'>Узин</option>
                      <option value='Украинка'>Украинка</option>
                      <option value='Умань'>Умань</option>
                      <option value='Устилуг'>Устилуг</option>
                      <option value='Фастов'>Фастов</option>
                      <option value='Феодосия'>Феодосия</option>
                      <option value='Харцызск'>Харцызск</option>
                      <option value='Харьков'>Харьков</option>
                      <option value='Херсон'>Херсон</option>
                      <option value='Хмельник'>Хмельник</option>
                      <option value='Хмельницкий'>Хмельницкий</option>
                      <option value='Хорол'>Хорол</option>
                      <option value='Хотин'>Хотин</option>
                      <option value='Христиновка'>Христиновка</option>
                      <option value='Хуст'>Хуст</option>
                      <option value='Хыров'>Хыров</option>
                      <option value='Цюрупинск'>Цюрупинск</option>
                      <option value='Червоноград'>Червоноград</option>
                      <option value='Червонозаводское'>Червонозаводское</option>
                      <option value='Черкассы'>Черкассы</option>
                      <option value='Чернигов'>Чернигов</option>
                      <option value='Чернобыль'>Чернобыль</option>
                      <option value='Черновцы'>Черновцы</option>
                      <option value='Чигирин'>Чигирин</option>
                      <option value='Чоп'>Чоп</option>
                      <option value='Чортков'>Чортков</option>
                      <option value='Чугуев'>Чугуев</option>
                      <option value='Шаргород'>Шаргород</option>
                      <option value='Шахтёрск'>Шахтёрск</option>
                      <option value='Шепетовка'>Шепетовка</option>
                      <option value='Шостка'>Шостка</option>
                      <option value='Шпола'>Шпола</option>
                      <option value='Шумск'>Шумск</option>
                      <option value='Щёлкино'>Щёлкино</option>
                      <option value='Щорс'>Щорс</option>
                      <option value='Энергодар'>Энергодар</option>
                      <option value='Южное'>Южное</option>
                      <option value='Южноукраинск'>Южноукраинск</option>
                      <option value='Яворов'>Яворов</option>
                      <option value='Яготин'>Яготин</option>
                      <option value='Ялта'>Ялта</option>
                      <option value='Ямполь'>Ямполь</option>
                      <option value='Яремче'>Яремче</option>
                    </select>
                  </div>

                  <div class="form-group">
                    <label>{{ $t("register.pass") }}</label>
                    <input type="password" class="form-control form-control" v-model="user.password" maxlength="48" required>
                  </div>

                  <div class="form-group">
                    <label for="">{{ $t("register.repeatPass") }}</label>
                    <input type="password" class="form-control form-control" v-model="repeatPass" maxlength="48" autocomplete="on" required>
                  </div>

                  <div>
                    <label class="custom-control custom-checkbox">
                    <input type="checkbox" v-model="acceptTerms"> <span v-html="$t('register.acceptTos')"></span></label>
                  </div>
                  <div class="alert alert-danger" v-if="!!err">
                    {{ err }}
                  </div>
                  <div class="alert alert-success" v-if="ok" v-html="$t('register.success')">
                    
                  </div>
                  <!-- <router-link to="/home">Назад</router-link> --><br>
                  <button class="btn btn-primary" :disabled="ok">
                    <font-awesome-icon icon="user-plus"/>
                    {{ $t("register.createAcc") }}
                  </button>
                </form>
              </div>

            </div>


          </div>


        </div>


      </div>

    </div>

  </div>

</div>
</template>

<style>

input[type='checkbox']{
  margin-right: 10px;
}

form .btn {
  margin: auto;
  display: block;
}

a:hover {
  text-decoration: none;
  color: blue;
}
/* .btn{display: block;margin: auto;} */
input[type="checkbox"] {
  width: 20px;
  height: 20px;
}
</style>

<script>
import snakeify from 'snake-case'

export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
        city: "",
        phone: ""
      },
      repeatPass: "",
      err: null,
      ok: false,
      acceptTerms: false
    };
  },
  methods: {
    register() {
      if (this.user.password != this.repeatPass) {
        this.err = this.$t('register.errors.diffPasses');
        return;
      }

      if (this.user.password.length < 6) {
        this.err = this.$t('register.errors.weakPass');
        return;
      }

      if (!this.acceptTerms) {
        this.err = this.$t('register.errors.noTos');
        return;
      }

      this.$http
        .post("/api/auth/register", {
          user: this.user
        })
        .then(response => {
          if (!response.ok) {
            this.err = this.$t('register.errors.request');
            return;
          }
          if (!response.body.success) {
            this.err = response.body.message;
            return;
          }

          this.err = null;
          this.ok = true;

          setTimeout(() => {
            this.$router.push("/login");
          }, 3000);
        });
    }
  },
  computed: {
    goodName() {
      return snakeify(this.user.username);
    }
  },
  created() {

  }
};
</script>
