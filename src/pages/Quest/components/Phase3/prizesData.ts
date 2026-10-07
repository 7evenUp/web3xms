const COLORS = {
  common: "#D9D9D9",
  uncommon: "#008EFF",
  rare: "#615DFF",
  legendary: "#FF4654",
  immortal: "#FAC70E",
  contraband: "#fa940e",
}

export interface IPrizeItem {
  amount: number
  imgSrc: string[]
  name: string
  description: string
  link?: string
  rarity: keyof typeof COLORS
}

export const prizesData: IPrizeItem[] = [
  {
    name: "Красный Ford Mustang 2020 года",
    description:
      "NFT-билеты с шансом выиграть самый желанный подарок этого мероприятия - Ford Mustang 2020 в полной комплектации. Как же он горяч! Владелец одного из билетов получит ключи от заветной машины.",
    amount: 5000,
    rarity: "immortal",
    imgSrc: [
      "/prizes/mustang.png",
      "/prizes/ford-mustang.png",
      "/prizes/mustang-1.png",
      "/prizes/mustang-2.png",
      "/prizes/mustang-3.png",
      "/prizes/mustang-4.png",
    ],
    link: "https://www.ford.co.uk/cars/mustang",
  },
  {
    name: "Деталь «Щелкунчика»",
    description:
      "Таинственные части Щелкунчика, найденные во время путешествия в одной из глав нашего квеста. В наличии 6 частей, из которых собирается целый персонаж.",
    amount: 60000,
    rarity: "contraband",
    imgSrc: [
      "/prizes/nutcracker-1.png",
      "/prizes/nutcracker-4.png",
      "/prizes/nutcracker-3.png",
      "/prizes/nutcracker-2.png",
      "/prizes/nutcracker-5.png",
      "/prizes/nutcracker-6.png",
    ],
  },
  {
    name: "Свитер «Crypton WEB3 2024»",
    description:
      "Это не типичный предмет гардероба, а настоящее произведение искусства, пропитанное новогодним настроением и духом web3.",
    amount: 2000,
    rarity: "legendary",
    imgSrc: [
      "/prizes/sweater.png",
      "/prizes/sweater-1.png",
      "/prizes/sweater-2.png",
    ],
  },
  {
    name: "Скин CS2 «AK-47 | Redline»",
    description:
      "Стильный игровой скин на предмет AK-47 в игре Counter Strike 2. В новой версии игры он стал еще более редким и желанным!",
    amount: 75,
    rarity: "legendary",
    imgSrc: ["/prizes/redline.png"],
    link: "https://steamcommunity.com/market/listings/730/AK-47%20%7C%20Redline%20%28Field-Tested%29",
  },
  {
    name: "Наушники «Apple AirPods 2»",
    description:
      "Комфортное прослушивание музыки в любое время и без лишних проводов.",
    amount: 25,
    rarity: "legendary",
    imgSrc: ["/prizes/airpods.png"],
    link: "https://www.apple.com/airpods-2nd-generation/",
  },
  {
    name: "Портативная акустика «JBL Flip 6»",
    description:
      "Вместе с этой колонкой все окружающие по достоинству оценят ваши вкусы в музыке.",
    amount: 20,
    rarity: "legendary",
    imgSrc: ["/prizes/jbl.png"],
    link: "https://jbl-russia.ru/collection/jbl-flip-6",
  },
  {
    name: "Игровая консоль «Sony PlayStation 5»",
    description:
      "Отличный способ провести холодные новогодние вечера за игрой, которую давно хотел пройти.",
    amount: 5,
    rarity: "legendary",
    imgSrc: ["/prizes/play-station.png"],
    link: "https://www.mvideo.ru/playstation-4327/ps5-konsoli-8627",
  },
  {
    name: "Часы «Apple Watch SE 2022»",
    description:
      "Часы с узнаваемым дизайном и удобным функционалом для повседневного использования.",
    amount: 5,
    rarity: "legendary",
    imgSrc: ["/prizes/apple-watch.png"],
    link: "https://www.apple.com/shop/buy-watch/apple-watch-se",
  },
  {
    name: "Ноутбук «Apple MacBook Air M1»",
    description:
      "Незаменимый рабочий компьютер для криптана с невероятной автономностью.",
    amount: 3,
    rarity: "legendary",
    imgSrc: ["/prizes/macbook.png"],
    link: "https://www.apple.com/macbook-air-m1/",
  },
  {
    name: "Подвеска кит",
    description:
      "Чем дольше холд - тем длиннее яхта, материал: серебро, рисунок выгравирован",
    amount: 4,
    rarity: "legendary",
    imgSrc: ["/prizes/whale.png"],
    link: "https://www.instagram.com/vazhno_j/",
  },
  {
    name: "Подвеска хомяк",
    description:
      "Для ценителей лучших стрижек, материал: серебро, рисунок выгравирован",
    amount: 4,
    rarity: "legendary",
    imgSrc: ["/prizes/humster.png"],
    link: "https://www.instagram.com/vazhno_j/",
  },
  {
    name: "Кольцо «NO FOMO»",
    description:
      "Грустишь, что не заработал в своё время на Stepn, Sandbox, Binance NFT и Goldfinch? Радуйся, что не потерял на Amazy, Aptos NFT и P2E играх. NO FOMO.",
    amount: 4,
    rarity: "legendary",
    imgSrc: ["/prizes/ring-no-fomo.png"],
    link: "https://www.instagram.com/vazhno_j/",
  },
  {
    name: 'Кольцо "$ETH"',
    description:
      "Иногда это кольцо бывает дешевле транзакций в эфире. Материал: серебро",
    amount: 4,
    rarity: "legendary",
    imgSrc: ["/prizes/ring-eth.png"],
    link: "https://www.instagram.com/vazhno_j/",
  },
  {
    name: "Фен-стайлер «Dyson AirWrap»",
    description:
      "Уникальный и популярный инструмент по уходу за длинными волосами.",
    amount: 1,
    rarity: "legendary",
    imgSrc: ["/prizes/dyson.png"],
    link: "https://www.dyson.com/hair-care/hair-stylers/airwrap/complete-long-nickel-copper",
  },
  {
    name: "12.500 монет «MPX»",
    description:
      "MPX — первая монета блокчейна CrossFi Chain, которая служит вычислительной мощностью для добычи второй — XFI, которую уже можно продавать на бирже. Сам MPX не торгуется на отрытом рынке и имеет номинальную стоимость в $0.02",
    amount: 80,
    rarity: "rare",
    imgSrc: ["/prizes/mpx.png"],
    link: "https://crossfi.org/#journey",
  },
  {
    name: "Подписка на «Crypton Prime»",
    description:
      "Доступ на 1 месяц в приватное криптосообщество с экспертным контентом по заработку и уникальными инструментами.",
    amount: 300,
    rarity: "rare",
    imgSrc: [
      "/prizes/prime-1-month.png",
      "/prizes/prime-1.png",
      "/prizes/prime-2.png",
      "/prizes/prime-3.png",
    ],
    link: "https://in-prime.crypton.xyz/",
  },
  {
    name: "Месячные подписки от Dolphin: «Enterprise», «Team», «Base»",
    description:
      "Уникальный инструмент, позволяющий единовременно управлять десятками и тысячами отдельных браузеров! Мы подарим 90 подписок на общую сумму в $11,510!",
    amount: 90,
    rarity: "rare",
    imgSrc: ["/prizes/dolphin.png"],
    link: "https://dolphin-anty.com/ru/?utm_source=media&utm_medium=cpc&utm_campaign=crypton&utm_content=new_year",
  },
  {
    name: "Яндекс станция «Лайт»",
    description:
      "Колонка с помощником Алисой внутри для удобного прослушивания музыки и новостей о росте биткоина.",
    amount: 30,
    rarity: "rare",
    imgSrc: ["/prizes/yandex-lite.png"],
    link: "https://alice.yandex.ru/station-lite",
  },
  {
    name: "Набор ПО «Autosoft»",
    description:
      "AutoSoft - проверенный сервис, предоставляющий специальное ПО, через которое вы можете автоматизировать активности в блокчейнах для получения массовых аирдропов. Мы подарим 7 копий софта (Linea x2, Scroll x2, Zora x2, ZkSync x1) на общую сумму в $2443!",
    amount: 7,
    rarity: "rare",
    imgSrc: ["/prizes/autosoft.png"],
    link: "https://t.me/swiper_tools",
  },
  {
    name: "Аппаратный кошелек «Tangem»",
    description:
      "Надежный и безопасный аппаратный кошелек для вашей криптовалюты. Надёжность и безопасность в кармане с весёлым мем-коином на визуале.",
    amount: 120,
    rarity: "rare",
    imgSrc: [
      "/prizes/tangem.png",
      "/prizes/tangem-shiba.png",
      "/prizes/tangem-shiba-2.png",
    ],
    link: "https://tangem.com/ru/#pricing",
  },
  {
    name: "Худи «CommEX Blockchain Revolution»",
    description:
      "Надев это худи, вы станете полноценной частью глобальной блокчейн-революции!",
    amount: 100,
    rarity: "rare",
    imgSrc: ["/prizes/hoodie-commex.png"],
  },
  {
    name: "Худи «Crypton Web 3.0 DeFi»",
    description:
      "Стань частью удивительного мира децентрализованных финансов и измени мир будущего!",
    amount: 350,
    rarity: "rare",
    imgSrc: ["/prizes/hoodie-crypton.png"],
  },
  {
    name: "Набор мерча «Cryptus»",
    description:
      "Внутри мерч бокса от CRYPTUS все что бы выглядеть по криптовому!",
    amount: 15,
    rarity: "rare",
    imgSrc: [
      "/prizes/cryptus-0.png",
      "/prizes/cryptus-1.png",
      "/prizes/cryptus-2.png",
      "/prizes/cryptus-3.png",
    ],
    link: "https://t.me/CRYPTUS_MEDIA",
  },
  {
    name: "Подписка на «Crypton Calendar»",
    description:
      "Доступ на 1 месяц к инструменту со всеми топовыми события по заработку на криптовалюте в одном месте.",
    amount: 2000,
    rarity: "uncommon",
    imgSrc: ["/prizes/calendar-1-month.png"],
    link: "https://t.me/Crypton_Calendar_bot",
  },
  {
    name: "Подписка на «Gem Hunters» и «Moni Discover»",
    description:
      "Gem Hunters - приватное комьюнити от Moni Talks: ранние проекты, иксы, опытные участники и все это в приятной атмосфере. Чтобы заработать, нужно раньше всех найти проекты и зайти в них первым. С Moni Discover это сделать проще - ежедневно мы отбираем классные проекты и даем тебе.",
    amount: 130,
    rarity: "uncommon",
    imgSrc: ["/prizes/gem-hunters.png", "/prizes/moni-discover.png"],
  },
  {
    name: "Подписки на онлайн майнинг GoMining",
    description:
      "Майните биткоин без вложений с помощью облачных серверов нашего партнера.",
    amount: 13,
    rarity: "uncommon",
    imgSrc: ["/prizes/go-mining.png"],
    link: "https://affise-track.gmt.io/click?pid=67&offer_id=3",
  },
  {
    name: "Билеты на 0xConnect",
    description:
      "0xConnect - криптомитап нового формата, построенный вокруг нетворкинга и социальных связей. Тысячи криптанов, одна общая цель, одна семья.",
    amount: 20,
    rarity: "uncommon",
    imgSrc: ["/prizes/tickets-0xconnect.png"],
    link: "http://0xconnect.net/",
  },
  {
    name: "Футболка «CommEX Blockchain Revolution»",
    description:
      "Футболка, которая лишний раз подтверждает, что будущее в мире финансов уже наступило.",
    amount: 100,
    rarity: "uncommon",
    imgSrc: ["/prizes/tshirt-commex.png"],
  },
  {
    name: "Футболка «Crypton All Time High»",
    description:
      "Уникальная коллекция! Чем больше людей носят эту футболку, тем быстрее растет цена Биткоина :)",
    amount: 350,
    rarity: "uncommon",
    imgSrc: ["/prizes/tshirt-crypton.png"],
  },
  {
    name: "Футболка Crypto Wiki «I'm bullish»",
    description:
      "Какой ты сегодня? Лови удивительный вайб вместе с уникальной футболкой Crypto Wiki из первой капсульной коллекции. Diamond hands ONLY!",
    amount: 100,
    rarity: "uncommon",
    imgSrc: ["/prizes/tshirt-wiki.png"],
  },
  {
    name: "Набор мерча от «TTC»",
    description: "Только топовый мерч для самых топовых криптанов.",
    amount: 3,
    rarity: "uncommon",
    imgSrc: ["/prizes/ttc.png"],
    link: "https://t.me/nftTTC",
  },
  {
    name: "Шарф «Crypton New Year 2024»",
    description:
      "Наполнит вас новогодним настроением и зарядит на комфортные рождественские прогулки.",
    amount: 500,
    rarity: "uncommon",
    imgSrc: ["/prizes/scarf.png"],
  },
  {
    name: "Кепки «Ayaysee»",
    description:
      "Ayaysee — стиль от криптанов, для криптанов и не только. Головной убор, который подчеркивает вашу принадлежность к культуре.",
    amount: 30,
    rarity: "uncommon",
    imgSrc: ["/prizes/iic-0.png", "/prizes/iic-1.png", "/prizes/iic-2.png"],
    link: "https://t.me/ayayseewear",
  },
  {
    name: "3 криптодоллара «USDT»",
    description: "3 криптодоллара, которых точно хватит на топовую шаверму.",
    amount: 1000,
    rarity: "common",
    imgSrc: ["/prizes/usdt-3.png"],
    link: "https://coinmarketcap.com/currencies/tether/",
  },
  {
    name: "5 криптодолларов «USDT»",
    description:
      "5 криптодолларов, которые всегда можно обменять на реальные деньги или купить за них десятитысячную биткоина.",
    amount: 400,
    rarity: "common",
    imgSrc: ["/prizes/usdt-5.png"],
    link: "https://coinmarketcap.com/currencies/tether/",
  },
  {
    name: "10 криптодолларов «USDT»",
    description:
      "10 криптодолларов, которые никогда не будут лишними в вашем бумажнике.",
    amount: 200,
    rarity: "common",
    imgSrc: ["/prizes/usdt-10.png"],
    link: "https://coinmarketcap.com/currencies/tether/",
  },
  {
    name: "5 месячных proxy от сервиса «ProxyLine»",
    description:
      "Зарабатывайте и развивайтесь с помощью прекрасных прокси от нашего партнера. Каждому победителю будет доступно 5 месячных подписок на прокси любой страны!",
    amount: 200,
    rarity: "common",
    imgSrc: ["/prizes/proxyline.png"],
    link: "https://proxyline.net/",
  },
  {
    name: "Боксы от DeQuest",
    description:
      "DeQuest планирует эирдроп в первом квартале 2024. Бокс - ваш билет для дропа. Чем они реже, тем больше дроп. Следите за обновлениями DeQuest, чтобы получить больше боксов",
    amount: 270,
    rarity: "common",
    imgSrc: [
      "/prizes/dequest-1.png",
      "/prizes/dequest-2.png",
      "/prizes/dequest-3.png",
      "/prizes/dequest-4.png",
    ],
    link: "https://beta.dequest.io/realms/de-quest",
  },
  {
    name: "Кружка «Фиксирую прибыль»",
    description:
      "Переиздание уникальной кружки с изображением плана действий, который никогда не нужно воплощать в жизнь.",
    amount: 2000,
    rarity: "common",
    imgSrc: ["/prizes/mug.png"],
  },
  {
    name: "Носки «Crypton DYOR»",
    description:
      "Владельцы этих носков всегда в безопасности, т.к. детально изучают проекты прежде, чем инвестировать в них.",
    amount: 3000,
    rarity: "common",
    imgSrc: ["/prizes/socks.png"],
  },
]
