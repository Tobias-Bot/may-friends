const topics = [
  {
    title: "ищу друга",
    color: "#7DC5D5",
    description: "Поиск друзей",
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
      "Посмотреть с кем-нибудь фильм/мультфильм/сериал через сайт совместного просмотра",
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
    description: "Поговорить на какую-либо тему",
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
    description: "Найти того, с кем можно поиграть во что-нибудь по сети",
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
    description: "Найти того, с кем можно погулять",
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
    description: "Задать вопрос или попросить совет",
    icon: "fas fa-question-circle",
    form: [
      {
        type: "textarea",
        title: "Вопрос",
        hint: "О чем хочешь спросить?",
        rows: 5,
      },
      {
        type: "input",
        title: "",
        hint: "P.S.",
      },
    ],
  },
  {
    title: "видео-чат",
    color: "#BC92F8",
    description: "Поболтать с кем-нибудь по видеосвязи",
    icon: "fas fa-desktop",
    form: [
      {
        type: "textarea",
        title: "О себе",
        hint: "Интересы, хобби, сериалы, музыка (кратко)",
        rows: 5,
      },
      {
        type: "input",
        title: "Сервис",
        hint: "Например, дискорд или вк",
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
    ],
  },
  {
    title: "поддержка",
    color: "#F887A0",
    description: "Попросить совет, поддержку или помощь",
    icon: "fas fa-heart",
    form: [
      {
        type: "textarea",
        title: "О проблеме",
        hint: "Расскажи, что тебя волнует, о чем ты хотел бы поговорить?",
        rows: 5,
      },
      {
        type: "input",
        title: "",
        hint: "P.S.",
      },
    ],
  },
  {
    title: "учеба",
    color: "#9AF892",
    description: "Совместная подготовки к экзаменам, помощь с дз друг другу и тому подобное",
    icon: "fas fa-graduation-cap",
    form: [
      {
        type: "textarea",
        title: "О себе",
        hint: "Расскажи немного о себе",
        rows: 4,
      },
      {
        type: "textarea",
        title: "Чем займемся",
        hint: "Например, помощь с дз или подготовка к экзаменам",
        rows: 3,
      },
      {
        type: "input",
        title: "Возраст",
        hint: "(необязательное поле)",
      },
      {
        type: "input",
        title: "Класс/курс",
        hint: "(необязательное поле)",
      },
      {
        type: "input",
        title: "Любимый предмет",
        hint: "(необязательное поле)",
      },
      {
        type: "input",
        title: "",
        hint: "P.S.",
      },
    ],
  },
  {
    title: "саморазвитие",
    color: "#F8DAB4",
    description: "Заниматься саморазвитием вместе",
    icon: "fas fa-apple-alt",
    form: [
      {
        type: "textarea",
        title: "Чем хотел бы заниматься",
        hint: "Например, выработать привычку читать книги или бегать по утрам",
        rows: 3,
      },
      {
        type: "textarea",
        title: "О себе",
        hint: "Расскажи немного о себе",
        rows: 4,
      },
      {
        type: "input",
        title: "",
        hint: "P.S.",
      },
    ],
  },
  // {
  //   title: "ищу для проекта",
  //   color: "#6BAFF8",
  //   description: "Заниматься саморазвитием вместе",
  //   icon: "fas fa-apple-alt",
  //   form: [
  //     {
  //       type: "textarea",
  //       title: "Чем хотел бы заниматься",
  //       hint: "Например, выработать привычку читать книги или бегать по утрам",
  //       rows: 3,
  //     },
  //     {
  //       type: "textarea",
  //       title: "О себе",
  //       hint: "Расскажи немного о себе",
  //       rows: 4,
  //     },
  //     {
  //       type: "input",
  //       title: "",
  //       hint: "P.S.",
  //     },
  //   ],
  // },
];

export default topics;
