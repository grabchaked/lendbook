let avaliableArchGenres = [
  'Роман-эпопея',
  'Роман',
  'Повесть',
  'Новелла',
  'Поэма',
];

let avaliableGenres = [
  'Классика',
  'Детектив',
  'Фэнтези',
  'Фантастика',
  'Современное',
  'Приключения',
  'Ужасы',
  'Мистика',
  'Для подростков',
  'Любовные',
  'Боевик',
  'Бизнес',
  'Биография',
  'Наука',
  'Комиксы',
  'Манга',
  'Культура',
  'Юмор',
  'Религия',
  'Словарь',
  'Справочник',
  'Здоровье и спорт',
  'IT-книги',
  'Эротика',
  'Учебники'
];


function sortBookList(list) {
  let vipList = list.filter((item) => {
    return item.premium;
  }).sort((a,b) => {
    return new Date(b.date) - new Date(a.date);
  });
  let normalList = list.filter((item) => {
    return !item.premium;
  }).sort((a,b) => {
    return new Date(b.date) - new Date(a.date);
  });


   return (vipList.concat(normalList));
}

export default {
  avaliableArchGenres,
  avaliableGenres,
  sortBookList
}
