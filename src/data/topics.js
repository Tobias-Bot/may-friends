const topics = [
  {
    title: "ищу друга",
    color: "#7DC5D5",
    description: "ищу друга",
    icon: "fas fa-user-friends",
    form: [
      {
        type: "textarea",
        title: "О себе",
        hint: "Интересы, хобби, сериалы, музыка (кратко)",
        rows: 5,
      },
      {
        type: "textarea",
        title: "Кого хочу найти",
        hint: "Описание",
        rows: 4,
      },
      {
        type: "input",
        title: "Город",
        hint: "(необязательное поле)",
      },
      {
        type: "input",
        title: "Знак зодиака",
        hint: "(необязательное поле)",
      },
      {
        type: "input",
        title: "Возраст",
        hint: "(необязательное поле)",
      },
      {
        type: "input",
        title: "Любимая песня",
        hint: "(необязательное поле)",
      },
    ],
  },
  {
    title: "посмотрим фильм?",
    color: "#C1BEFF",
    description:
      "посмотреть с кем-нибудь фильм через сайт совместного просмотра",
    icon: "fas fa-video",
    form: [
      {
        type: "input",
        title: "Название фильма",
        hint: "Что хотел бы посмотреть?",
      },
      {
        type: "textarea",
        title: "",
        hint: "P.S.",
        rows: 3,
      },
    ],
  },
  {
    title: "поболтаем?",
    color: "#FFCDFA",
    description: "поговорить о том, что тебя волнует",
    icon: "fas fa-comment-dots",
    form: [
      {
        type: "textarea",
        title: "Тема",
        hint: "О чем хочешь поговорить?",
        rows: 4,
      },
      {
        type: "input",
        title: "",
        hint: "P.S.",
      },
    ],
  },
  {
    title: "поиграем?",
    color: "#FFF197",
    description: "поиграть с кем-нибудь онлайн",
    icon: "fas fa-gamepad",
    form: [
      {
        type: "input",
        title: "Название игры",
        hint: "Во что хочешь поиграть?",
      },
      {
        type: "textarea",
        title: "",
        hint: "P.S.",
        rows: 3,
      },
    ],
  },
  {
    title: "идем гулять?",
    color: "#9DD8FF",
    description: "найти того, с кем можно погулять",
    icon: "fas fa-walking",
    form: [
      {
        type: "input",
        title: "Город",
        hint: "Где хочешь погулять?",
      },
      {
        type: "textarea",
        title: "О себе",
        hint: "Расскажи немного о себе",
      },
      {
        type: "input",
        title: "Возраст",
        hint: "Сколько тебе лет?",
      },
    ],
  },
  {
    title: "хочу спросить",
    color: "#FFB4A3",
    description: "задать вопрос или попросить совет",
    icon: "fas fa-question-circle",
    form: [
      {
        type: "textarea",
        title: "Вопрос",
        hint: "О чем хочешь спросить?",
      },
      {
        type: "input",
        title: "",
        hint: "P.S.",
      },
    ],
  },
];

export default topics;
