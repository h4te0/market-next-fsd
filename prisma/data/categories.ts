import { CategoryType } from '@prisma/client';

interface ICategories {
  title: string;
  slug: string;
  image?: string;
  type: CategoryType;
  parentId?: number;
  brandId?: number;
}

export const categories: ICategories[] = [
  {
    title: 'Смартфоны и гаджеты',
    slug: 'smartfony_i_gadzhety',
    image:
      'https://www.technodom.kz/_next/image?url=https%3A%2F%2Fapi.technodom.kz%2Ff3%2Fapi%2Fv1%2Fimages%2FApple_iOS-update-iphone12pro-watchseries6-unlocking-screen_042621.png_8c2e44ef5a60e3dab90b4d45c8dfc342&w=48&q=75',
    type: 'RootCategory',
  },
  {
    title: 'Ноутбуки и компьютеры',
    slug: 'noutbuki_i_kompyutery',
    image:
      'https://www.technodom.kz/_next/image?url=https%3A%2F%2Fapi.technodom.kz%2Ff3%2Fapi%2Fv1%2Fimages%2FApple_iOS-update-iphone12pro-watchseries6-unlocking-screen_042621.png_7e9c29b98779f3e0c92076445260c828&w=48&q=75',
    type: 'RootCategory',
  },
  {
    title: 'Бытовая техника',
    slug: 'bytovaya_tekhnika',
    image:
      'https://www.technodom.kz/_next/image?url=https%3A%2F%2Fapi.technodom.kz%2Ff3%2Fapi%2Fv1%2Fimages%2FApple_iOS-update-iphone12pro-watchseries6-unlocking-screen_04262.png_e934f7bb08ef63ce2a56abbd921557d0&w=48&q=75',
    type: 'RootCategory',
  },
  {
    title: 'Смартфоны и телефоны',
    slug: 'smartfony_i_telefony',
    image:
      'https://www.technodom.kz/_next/image?url=https%3A%2F%2Fapi.technodom.kz%2Ff3%2Fapi%2Fv1%2Fimages%2Fimage141.png_bd0712b62609d255db4db2e75d499a61&w=32&q=75',
    type: 'MiddleCategory',
    parentId: 1,
  },
  {
    title: 'Планшеты и электронные книги',
    slug: 'planshety',
    image:
      'https://www.technodom.kz/_next/image?url=https%3A%2F%2Fapi.technodom.kz%2Ff3%2Fapi%2Fv1%2Fimages%2Fimage39%402x.png_d23ddbb211b792141b52cd50ae0db3b3&w=32&q=75',
    type: 'MiddleCategory',
    parentId: 1,
  },
  {
    title: 'Гаджеты',
    slug: 'gadzhety',
    image:
      'https://www.technodom.kz/_next/image?url=https%3A%2F%2Fapi.technodom.kz%2Ff3%2Fapi%2Fv1%2Fimages%2Fimage39%402x.png_fe1be4e878fc870524964a594e724835&w=32&q=75',
    type: 'MiddleCategory',
    parentId: 1,
  },
  {
    title: 'Аксессуары для смартфонов',
    slug: 'aksessuary_dlya_smartfonov',
    image:
      'https://www.technodom.kz/_next/image?url=https%3A%2F%2Fapi.technodom.kz%2Ff3%2Fapi%2Fv1%2Fimages%2Fimage152.png_207e9c85c90b14f15bc8a0a479aa7d25&w=32&q=75',
    type: 'MiddleCategory',
    parentId: 1,
  },
  {
    title: 'Наушники',
    slug: 'naushniki',
    image:
      'https://www.technodom.kz/_next/image?url=https%3A%2F%2Fapi.technodom.kz%2Ff3%2Fapi%2Fv1%2Fimages%2Fimage39.png_357c4d85ad5cbeefd773ad0b903096b7&w=32&q=75',
    type: 'MiddleCategory',
    parentId: 1,
  },
  {
    title: 'Программное обеспечение',
    slug: 'programmnoye_obespecheniye',
    image:
      'https://www.technodom.kz/_next/image?url=https%3A%2F%2Fapi.technodom.kz%2Ff3%2Fapi%2Fv1%2Fimages%2Fimage36%402x.png_f8685e4a34076c980be09a631ee5cd9d&w=32&q=75',
    type: 'MiddleCategory',
    parentId: 1,
  },
  {
    title: 'Умный дом',
    slug: 'umnyy_dom',
    image:
      'https://www.technodom.kz/_next/image?url=https%3A%2F%2Fapi.technodom.kz%2Ff3%2Fapi%2Fv1%2Fimages%2Fimage142.png_380adec6cd2f8781cc103d33bb92596e&w=32&q=75',
    type: 'MiddleCategory',
    parentId: 1,
  },
  {
    title: 'Ноутбуки и аксессуары',
    slug: 'noutbuki_i_aksessuary',
    image:
      'https://www.technodom.kz/_next/image?url=https%3A%2F%2Fapi.technodom.kz%2Ff3%2Fapi%2Fv1%2Fimages%2Fimage39%402x.png_05dec9e176e3dd046784c207e55326a3&w=32&q=75',
    type: 'MiddleCategory',
    parentId: 2,
  },
  {
    title: 'Компьютеры и мониторы',
    slug: 'kompyutery_i_monitory',
    image:
      'https://www.technodom.kz/_next/image?url=https%3A%2F%2Fapi.technodom.kz%2Ff3%2Fapi%2Fv1%2Fimages%2Fimage30%402x.png_a2b388b77af8583c7cef55fd247f0f2a&w=32&q=75',
    type: 'MiddleCategory',
    parentId: 2,
  },
  {
    title: 'Компьютерные аксессуары',
    slug: 'kompyuternyye_aksessuary',
    image:
      'https://www.technodom.kz/_next/image?url=https%3A%2F%2Fapi.technodom.kz%2Ff3%2Fapi%2Fv1%2Fimages%2Fimage32%402x.png_4b79708556b9af9bf37f118b504bd88b&w=32&q=75',
    type: 'MiddleCategory',
    parentId: 2,
  },
  {
    title: 'Комплектующие',
    slug: 'komplektuyushchiye',
    image:
      'https://www.technodom.kz/_next/image?url=https%3A%2F%2Fapi.technodom.kz%2Ff3%2Fapi%2Fv1%2Fimages%2Fimage33.png_726247f4f737078e01d51684d59e217f&w=32&q=75',
    type: 'MiddleCategory',
    parentId: 2,
  },
  {
    title: 'Холодильное и морозильное оборудование',
    slug: 'kholodilnoye_i_morozilnoye_oborudovaniye',
    image:
      'https://www.technodom.kz/_next/image?url=https%3A%2F%2Fapi.technodom.kz%2Ff3%2Fapi%2Fv1%2Fimages%2Fimage72.png_8fa34f5e0cd22cf59fbd59a150cd56a7&w=32&q=75',
    type: 'MiddleCategory',
    parentId: 3,
  },
  {
    title: 'Уход за домом',
    slug: 'ukhod_za_domom',
    image:
      'https://www.technodom.kz/_next/image?url=https%3A%2F%2Fapi.technodom.kz%2Ff3%2Fapi%2Fv1%2Fimages%2Fimage73.png_2a6d148981666204fc713b65eb40fc45&w=32&q=75',
    type: 'MiddleCategory',
    parentId: 3,
  },
  {
    title: 'Аксессуары к технике для дома',
    slug: 'aksessuary_k_tekhnike_dlya_doma',
    image:
      'https://www.technodom.kz/_next/image?url=https%3A%2F%2Fapi.technodom.kz%2Ff3%2Fapi%2Fv1%2Fimages%2Fimage156%402x.png_d934da9cc588c083b192138bbcd6aff2&w=32&q=75',
    type: 'MiddleCategory',
    parentId: 3,
  },
  {
    title: 'Рукоделие',
    slug: 'rukodeliye',
    image:
      'https://www.technodom.kz/_next/image?url=https%3A%2F%2Fapi.technodom.kz%2Ff3%2Fapi%2Fv1%2Fimages%2Fimage155%402x.png_c89abc140c9b12ede61130fe35d04a22&w=32&q=75',
    type: 'MiddleCategory',
    parentId: 3,
  },

  {
    title: 'Смартфоны',
    slug: 'smartfony',
    parentId: 4,
    type: 'SubCategory',
  },
  {
    title: 'Смартфоны Samsung',
    slug: 'smartfony',
    brandId: 2,
    parentId: 4,
    type: 'SubCategory',
  },
  {
    title: 'Смартфоны Apple',
    slug: 'smartfony',
    brandId: 1,
    parentId: 4,
    type: 'SubCategory',
  },
  {
    title: 'Смартфоны HUAWEI',
    slug: 'smartfony',
    brandId: 3,
    parentId: 4,
    type: 'SubCategory',
  },
  {
    title: 'Смартфоны HONOR',
    slug: 'smartfony',
    brandId: 5,
    parentId: 4,
    type: 'SubCategory',
  },
  {
    title: 'Смартфоны Xiaomi',
    slug: 'smartfony',
    brandId: 4,
    parentId: 4,
    type: 'SubCategory',
  },
  {
    title: 'Смартфоны OPPO',
    slug: 'smartfony',
    brandId: 6,
    parentId: 4,
    type: 'SubCategory',
  },
  {
    title: 'Смартфоны Vivo',
    slug: 'smartfony',
    brandId: 7,
    parentId: 4,
    type: 'SubCategory',
  },
  {
    title: 'Смартфоны Motorola',
    slug: 'smartfony',
    brandId: 8,
    parentId: 4,
    type: 'SubCategory',
  },
  {
    title: 'Смартфоны Redmi',
    slug: 'smartfony',
    brandId: 9,
    parentId: 4,
    type: 'SubCategory',
  },
  {
    title: 'Смартфоны Poco',
    slug: 'smartfony',
    brandId: 10,
    parentId: 4,
    type: 'SubCategory',
  },
  {
    title: 'Смартфоны Tecno',
    slug: 'smartfony',
    brandId: 11,
    parentId: 4,
    type: 'SubCategory',
  },
  {
    title: 'Смартфоны Realme',
    slug: 'smartfony',
    brandId: 12,
    parentId: 4,
    type: 'SubCategory',
  },
  {
    title: 'Смартфоны Infinix',
    slug: 'smartfony',
    brandId: 13,
    parentId: 4,
    type: 'SubCategory',
  },
  {
    title: 'Мобильные телефоны',
    slug: 'mobilnyye_telefony',
    parentId: 4,
    type: 'SubCategory',
  },
  {
    title: 'Смартфоны ZTЕ',
    slug: 'smartfony',
    brandId: 14,
    parentId: 4,
    type: 'SubCategory',
  },
  {
    title: 'Планшеты',
    slug: 'planshety',
    parentId: 5,
    type: 'SubCategory',
  },
  {
    title: 'Планшеты Samsung',
    slug: 'planshety',
    brandId: 2,
    parentId: 5,
    type: 'SubCategory',
  },
  {
    title: 'Планшеты Apple iPad',
    slug: 'planshety',
    brandId: 1,
    parentId: 5,
    type: 'SubCategory',
  },
  {
    title: 'Аксессуары для iPad',
    slug: 'aksessuary_dlya_ipad',
    parentId: 5,
    type: 'SubCategory',
  },
  {
    title: 'Чехлы для планшетов',
    slug: 'chekhly_dlya_planshetov',
    parentId: 5,
    type: 'SubCategory',
  },
  {
    title: 'Планшеты Lenovo',
    slug: 'planshety',
    brandId: 15,
    parentId: 5,
    type: 'SubCategory',
  },
  {
    title: 'Аксессуары для планшетов',
    slug: 'aksessuary_dlya_planshetov',
    parentId: 5,
    type: 'SubCategory',
  },
  {
    title: 'Электронные книги',
    slug: 'elektronnyye_knigi',
    parentId: 5,
    type: 'SubCategory',
  },
  {
    title: 'Смарт часы',
    slug: 'smart_chasy',
    parentId: 6,
    type: 'SubCategory',
  },
  {
    title: 'Смарт часы Apple',
    slug: 'smart_chasy',
    brandId: 1,
    parentId: 6,
    type: 'SubCategory',
  },
  {
    title: 'Смарт часы Samsung',
    brandId: 2,
    slug: 'smart_chasy',
    parentId: 6,
    type: 'SubCategory',
  },
  {
    title: 'Смарт часы HUAWEI',
    brandId: 3,
    slug: 'smart_chasy',
    parentId: 6,
    type: 'SubCategory',
  },
  {
    title: 'Смарт часы Xiaomi',
    brandId: 4,
    slug: 'smart_chasy',
    parentId: 6,
    type: 'SubCategory',
  },
  {
    title: 'Аксессуары для смарт часов',
    slug: 'aksessuary_dlya_smart_chasov',
    parentId: 6,
    type: 'SubCategory',
  },
  {
    title: 'Фитнес браслеты',
    slug: 'fitnes_braslety',
    parentId: 6,
    type: 'SubCategory',
  },
  {
    title: 'Детские часы с GPS',
    slug: 'detskiye_chasy_s_gps',
    parentId: 6,
    type: 'SubCategory',
  },
  {
    title: 'Экшн-камеры',
    slug: 'ekshn-kamery',
    parentId: 6,
    type: 'SubCategory',
  },
  {
    title: 'Аксессуары для экшн камер',
    slug: 'aksessuary_dlya_ekshn_kamer',
    parentId: 6,
    type: 'SubCategory',
  },
  {
    title: 'Bluetooth-трекер',
    slug: 'bluetooth-treker',
    parentId: 6,
    type: 'SubCategory',
  },

  {
    title: 'Умные колонки',
    slug: 'umnyye_kolonki',
    parentId: 7,
    type: 'SubCategory',
  },
  {
    title: 'Портативные колонки',
    slug: 'portativnyye_kolonki',
    parentId: 7,
    type: 'SubCategory',
  },
  {
    title: 'Внешние аккумуляторы',
    slug: 'vneshniye_akkumulyatory',
    parentId: 7,
    type: 'SubCategory',
  },
  {
    title: 'Чехлы',
    slug: 'chekhly',
    parentId: 7,
    type: 'SubCategory',
  },
  {
    title: 'Защита экрана',
    slug: 'zashchita_ekrana',
    parentId: 7,
    type: 'SubCategory',
  },
  {
    title: 'Карты памяти',
    slug: 'karty_pamyati',
    parentId: 7,
    type: 'SubCategory',
  },
  {
    title: 'Зарядные устройства',
    slug: 'zaryadnyye_ustroystva',
    parentId: 7,
    type: 'SubCategory',
  },
  {
    title: 'Беспроводные зарядные устройства',
    slug: 'besprovodnyye_zaryadnyye_ustroystva',
    parentId: 7,
    type: 'SubCategory',
  },
  {
    title: 'Кабели для смартфонов',
    slug: 'kabeli_dlya_smartfonov',
    parentId: 7,
    type: 'SubCategory',
  },
  {
    title: 'Переходники для смартфонов',
    slug: 'perekhodniki_dlya_smartfonov',
    parentId: 7,
    type: 'SubCategory',
  },
  {
    title: 'Авто аксессуары для смартфонов',
    slug: 'avto_aksessuary_dlya_smartfonov',
    parentId: 7,
    type: 'SubCategory',
  },
  {
    title: 'Подставки',
    slug: 'podstavki',
    parentId: 7,
    type: 'SubCategory',
  },
  {
    title: 'Селфи моноподы',
    slug: 'selfi_monopody',
    parentId: 7,
    type: 'SubCategory',
  },
  {
    title: 'Стабилизаторы (Стедикамы)',
    slug: 'stabilizatory_stedikamy',
    parentId: 7,
    type: 'SubCategory',
  },

  {
    title: 'AirPods',
    brandId: 1,
    slug: 'naushniki',
    parentId: 8,
    type: 'SubCategory',
  },
  {
    title: 'Наушники Xiaomi',
    brandId: 4,
    slug: 'naushniki',
    parentId: 8,
    type: 'SubCategory',
  },
  {
    title: 'Беспроводные',
    slug: 'besprovodnyye',
    parentId: 8,
    type: 'SubCategory',
  },
  {
    title: 'Проводные',
    slug: 'provodnyye',
    parentId: 8,
    type: 'SubCategory',
  },
  {
    title: 'Антивирусы и безопасность для смартфонов',
    slug: 'antivirusy_i_bezopasnost_dlya_smartfonov',
    parentId: 9,
    type: 'SubCategory',
  },
  {
    title: 'Офисные программы для смартфонов',
    slug: 'ofisnyye_programmy_dlya_smartfonov',
    parentId: 9,
    type: 'SubCategory',
  },
  {
    title: 'Учеба и развитие для смартфонов',
    slug: 'ucheba_i_razvitiye_dlya_smartfonov',
    parentId: 9,
    type: 'SubCategory',
  },
  {
    title: 'Онлайн-кинотеатры для смартфонов',
    slug: 'onlayn-kinoteatry_dlya_smartfonov',
    parentId: 9,
    type: 'SubCategory',
  },
  {
    title: 'Удаленный сервис для смартфонов',
    slug: 'udalennyy_servis_dlya_smartfonov',
    parentId: 9,
    type: 'SubCategory',
  },
  {
    title: 'Блокировщики рекламы',
    slug: 'blokirovshchiki_reklamy',
    parentId: 9,
    type: 'SubCategory',
  },
  {
    title: 'Родительский контроль',
    slug: 'roditelskiy_kontrol',
    parentId: 9,
    type: 'SubCategory',
  },

  {
    title: 'Умный дом Xiaomi',
    slug: 'umnyy_dom',
    brandId: 4,
    parentId: 10,
    type: 'SubCategory',
  },
  {
    title: 'Управление для умного дома',
    slug: 'upravleniye_dlya_umnogo_doma',
    parentId: 10,
    type: 'SubCategory',
  },
  {
    title: 'Пульты управления для умного дома',
    slug: 'pulty_upravleniya_dlya_umnogo_doma',
    parentId: 10,
    type: 'SubCategory',
  },
  {
    title: 'Умные лампы',
    slug: 'umnyye_lampy',
    parentId: 10,
    type: 'SubCategory',
  },
  {
    title: 'Умные розетки',
    slug: 'umnyye_rozetki',
    parentId: 10,
    type: 'SubCategory',
  },
  {
    title: 'Датчики',
    slug: 'datchiki',
    parentId: 10,
    type: 'SubCategory',
  },
  {
    title: 'Яндекс (Алиса)',
    slug: 'yandeks_alisa',
    parentId: 10,
    type: 'SubCategory',
  },
  {
    title: 'Ноутбуки',
    slug: 'noutbuki',
    parentId: 11,
    type: 'SubCategory',
  },
  {
    title: 'Игровые ноутбуки',
    slug: 'igrovyye_noutbuki',
    parentId: 11,
    type: 'SubCategory',
  },
  {
    title: 'Apple MacBook',
    slug: 'apple_macbook',
    parentId: 11,
    type: 'SubCategory',
  },
  {
    title: 'Сумки',
    slug: 'sumki',
    parentId: 11,
    type: 'SubCategory',
  },
  {
    title: 'Рюкзаки',
    slug: 'ryukzaki',
    parentId: 11,
    type: 'SubCategory',
  },
  {
    title: 'Чехлы для ноутбуков',
    slug: 'chekhly_dlya_noutbukov',
    parentId: 11,
    type: 'SubCategory',
  },
  {
    title: 'Подставки для ноутбуков',
    slug: 'podstavki_dlya_noutbukov',
    parentId: 11,
    type: 'SubCategory',
  },
  {
    title: 'Зарядные устройства для ноутбуков',
    slug: 'zaryadnyye_ustroystva_dlya_noutbukov',
    parentId: 11,
    type: 'SubCategory',
  },
  {
    title: 'Кабели и адаптеры для ноутбуков и ПК',
    slug: 'kabeli_i_adaptery_dlya_noutbukov_i_pk',
    parentId: 11,
    type: 'SubCategory',
  },

  {
    title: 'Компьютеры',
    slug: 'kompyutery',
    parentId: 12,
    type: 'SubCategory',
  },
  {
    title: 'Игровые компьютеры',
    slug: 'igrovyye_kompyutery',
    parentId: 12,
    type: 'SubCategory',
  },
  {
    title: 'Компьютеры TechnoGaming',
    slug: 'kompyutery_technogaming',
    parentId: 12,
    type: 'SubCategory',
  },
  {
    title: 'Моноблоки',
    slug: 'monobloki',
    parentId: 12,
    type: 'SubCategory',
  },
  {
    title: 'Моноблоки Apple iMac',
    slug: 'monobloki_apple_imac',
    parentId: 12,
    type: 'SubCategory',
  },
  {
    title: 'Мониторы',
    slug: 'monitory',
    parentId: 12,
    type: 'SubCategory',
  },
  {
    title: 'Крепления и стойки',
    slug: 'krepleniya_i_stoyki',
    parentId: 12,
    type: 'SubCategory',
  },

  {
    title: 'Мыши',
    slug: 'myshi',
    parentId: 13,
    type: 'SubCategory',
  },
  {
    title: 'Клавиатуры',
    slug: 'klaviatury',
    parentId: 13,
    type: 'SubCategory',
  },
  {
    title: 'Комплект клавиатура + мышь',
    slug: 'komplekt_klaviatura_i_mysh',
    parentId: 13,
    type: 'SubCategory',
  },
  {
    title: 'Коврики для мыши',
    slug: 'kovriki_dlya_myshi',
    parentId: 13,
    type: 'SubCategory',
  },
  {
    title: 'Веб-камеры',
    slug: 'veb-kamery',
    parentId: 13,
    type: 'SubCategory',
  },
  {
    title: 'Камеры для конференц-залов',
    slug: 'kamery_dlya_konferents-zalov',
    parentId: 13,
    type: 'SubCategory',
  },
  {
    title: 'Гарнитуры',
    slug: 'garnitury',
    parentId: 13,
    type: 'SubCategory',
  },
  {
    title: 'Колонки для ПК',
    slug: 'kolonki_dlya_pk',
    parentId: 13,
    type: 'SubCategory',
  },
  {
    title: 'UPS (источники бесперебойного питания)',
    slug: 'ups_istochniki_bespereboynogo_pitaniya',
    parentId: 13,
    type: 'SubCategory',
  },
  {
    title: 'Стабилизаторы напряжения',
    slug: 'stabilizatory_napryazheniya',
    parentId: 13,
    type: 'SubCategory',
  },
  {
    title: 'Сетевые фильтры',
    slug: 'setevyye_filtry',
    parentId: 13,
    type: 'SubCategory',
  },
  {
    title: 'Чистящие средства',
    slug: 'chistyashchiye_sredstva',
    parentId: 13,
    type: 'SubCategory',
  },
  {
    title: 'Графические планшеты',
    slug: 'graficheskiye_planshety',
    parentId: 13,
    type: 'SubCategory',
  },
  {
    title: 'Адаптеры Bluetooth',
    slug: 'adaptery_bluetooth',
    parentId: 13,
    type: 'SubCategory',
  },

  {
    title: 'Процессоры',
    slug: 'protsessory',
    parentId: 14,
    type: 'SubCategory',
  },
  {
    title: 'Материнские платы',
    slug: 'materinskiye_platy',
    parentId: 14,
    type: 'SubCategory',
  },
  {
    title: 'Видеокарты',
    slug: 'videokarty',
    parentId: 14,
    type: 'SubCategory',
  },
  {
    title: 'Оперативная память',
    slug: 'operativnaya_pamyat',
    parentId: 14,
    type: 'SubCategory',
  },
  {
    title: 'SSD диски',
    slug: 'ssd_diski',
    parentId: 14,
    type: 'SubCategory',
  },
  {
    title: 'Кулеры для процессоров',
    slug: 'kulery_dlya_protsessorov',
    parentId: 14,
    type: 'SubCategory',
  },
  {
    title: 'Системы жидкостного охлаждения',
    slug: 'sistemy_zhidkostnogo_okhlazhdeniya',
    parentId: 14,
    type: 'SubCategory',
  },
  {
    title: 'Блоки питания',
    slug: 'bloki_pitaniya',
    parentId: 14,
    type: 'SubCategory',
  },
  {
    title: 'Кейсы',
    slug: 'keysy',
    parentId: 14,
    type: 'SubCategory',
  },
  {
    title: 'Кулеры для кейса',
    slug: 'kulery_dlya_keysa',
    parentId: 14,
    type: 'SubCategory',
  },
  {
    title: 'Кастомное водяное охлаждение',
    slug: 'kastomnoye_vodyanoye_okhlazhdeniye',
    parentId: 14,
    type: 'SubCategory',
  },
  {
    title: 'Термопасты',
    slug: 'termopasty',
    parentId: 14,
    type: 'SubCategory',
  },
  {
    title: 'Звуковые карты',
    slug: 'zvukovyye_karty',
    parentId: 14,
    type: 'SubCategory',
  },
  {
    title: 'Аксессуары для комплектующих',
    slug: 'aksessuary_dlya_komplektuyushchikh',
    parentId: 14,
    type: 'SubCategory',
  },
  {
    title: 'Холодильники',
    slug: 'kholodilniki',
    parentId: 15,
    type: 'SubCategory',
  },
  {
    title: 'Холодильники Hotpoint',
    slug: 'kholodilniki',
    brandId: 16,
    parentId: 15,
    type: 'SubCategory',
  },
  {
    title: 'Холодильники для хранения напитков',
    slug: 'kholodilniki_dlya_khraneniya_napitkov',
    parentId: 15,
    type: 'SubCategory',
  },
  {
    title: 'Холодильники для шуб',
    slug: 'kholodilniki_dlya_shub',
    parentId: 15,
    type: 'SubCategory',
  },
  {
    title: 'Холодильники для ферментации мяса',
    slug: 'kholodilniki_dlya_fermentatsii_myasa',
    parentId: 15,
    type: 'SubCategory',
  },
  {
    title: 'Морозильные камеры',
    slug: 'morozilnyye_kamery',
    parentId: 15,
    type: 'SubCategory',
  },
  {
    title: 'Аксессуары для холодильников',
    slug: 'aksessuary_dlya_kholodilnikov',
    parentId: 15,
    type: 'SubCategory',
  },
  {
    title: 'Вакууматоры',
    slug: 'vakuumatory',
    parentId: 15,
    type: 'SubCategory',
  },
  {
    title: 'Бытовая химия для холодильников',
    slug: 'bytovaya_khimiya_dlya_kholodilnikov',
    parentId: 15,
    type: 'SubCategory',
  },

  {
    title: 'Пылесосы Dreame',
    slug: 'pylesosy',
    brandId: 17,
    parentId: 16,
    type: 'SubCategory',
  },
  {
    title: 'Пылесосы',
    slug: 'pylesosy',
    parentId: 16,
    type: 'SubCategory',
  },
  {
    title: 'Вертикальные пылесосы',
    slug: 'vertikalnyye_pylesosy',
    parentId: 16,
    type: 'SubCategory',
  },
  {
    title: 'Робот-пылесосы',
    slug: 'robot-pylesosy',
    parentId: 16,
    type: 'SubCategory',
  },
  {
    title: 'Моющие пылесосы',
    slug: 'moyushchiye_pylesosy',
    parentId: 16,
    type: 'SubCategory',
  },
  {
    title: 'Аксессуары для пылесосов',
    slug: 'aksessuary_dlya_pylesosov',
    parentId: 16,
    type: 'SubCategory',
  },
  {
    title: 'Мойки высокого давления',
    slug: 'moyki_vysokogo_davleniya',
    parentId: 16,
    type: 'SubCategory',
  },
  {
    title: 'Аксессуары для моек высокого давления',
    slug: 'aksessuary_dlya_moyek_vysokogo_davleniya',
    parentId: 16,
    type: 'SubCategory',
  },
  {
    title: 'Мойщики окон',
    slug: 'moyshchiki_okon',
    parentId: 16,
    type: 'SubCategory',
  },
  {
    title: 'Пароочистители',
    slug: 'paroochistiteli',
    parentId: 16,
    type: 'SubCategory',
  },
  {
    title: 'Аксессуары для мойщиков окон',
    slug: 'aksessuary_dlya_moyshchikov_okon',
    parentId: 16,
    type: 'SubCategory',
  },
  {
    title: 'Швабры и ведра',
    slug: 'shvabry_i_vedra',
    parentId: 16,
    type: 'SubCategory',
  },
  {
    title: 'Принадлежности для уборки',
    slug: 'prinadlezhnosti_dlya_uborki',
    parentId: 16,
    type: 'SubCategory',
  },

  {
    title: 'Аксессуары для утюгов и гладильных досок',
    slug: 'aksessuary_dlya_utyugov_i_gladilnykh_dosok',
    parentId: 17,
    type: 'SubCategory',
  },
  {
    title: 'Аксессуары для стиральных и сушильных машин',
    slug: 'aksessuary_dlya_stiralnykh_i_sushilnykh_mashin',
    parentId: 17,
    type: 'SubCategory',
  },
  {
    title: 'Машинки для удаления катышков',
    slug: 'mashinki_dlya_udaleniya_katyshkov',
    parentId: 17,
    type: 'SubCategory',
  },
  {
    title: 'Бытовая химия для стиральных машин',
    slug: 'bytovaya_khimiya_dlya_stiralnykh_mashin',
    parentId: 17,
    type: 'SubCategory',
  },

  {
    title: 'Швейные машины',
    slug: 'shveynyye_mashiny',
    parentId: 18,
    type: 'SubCategory',
  },
  {
    title: 'Оверлоки',
    slug: 'overloki',
    parentId: 18,
    type: 'SubCategory',
  },
  {
    title: 'Аксессуары для швейных машин',
    slug: 'aksessuary_dlya_shveynykh_mashin',
    parentId: 18,
    type: 'SubCategory',
  },
  {
    title: 'Портновские манекены',
    slug: 'portnovskiye_manekeny',
    parentId: 18,
    type: 'SubCategory',
  },
  {
    title: 'Портновские колодки',
    slug: 'portnovskiye_kolodki',
    parentId: 18,
    type: 'SubCategory',
  },
];
