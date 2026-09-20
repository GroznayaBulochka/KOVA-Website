(() => {
  'use strict';

  const LANGUAGE_KEY = 'kova_site_language';
  const CONSENT_COOKIE = 'kova_cookie_consent';
  const ANALYTICS_ID_COOKIE = 'kova_analytics_id';
  const ANALYTICS_SESSION_COOKIE = 'kova_analytics_session';
  const ANALYTICS_COUNT_COOKIE = 'kova_analytics_page_count';
  const dictionaries = {
    pl: {
      skip:'Przejdź do treści', tagline:'Finanse w jednym miejscu.', language:'Język', openMenu:'Otwórz menu', close:'Zamknij', navFeatures:'Funkcje', navScreens:'Ekrany', navSecurity:'Bezpieczeństwo', navLegal:'Dokumenty', navRoadmap:'Roadmapa',
      heroKicker:'KOVA na Androida', heroTitle:'Finanse<br><em>w jednym miejscu.</em>', heroCopy:'Wydatki, budżety, cele i dochód z pracy w jednej aplikacji.', projectStatus:'Sprawdź stan projektu', watchVideo:'Obejrzyj prezentację', pauseVideo:'Pauza', playVideo:'Odtwórz', releaseNote:'Projekt jest w aktywnym rozwoju.',
      trustPrivacy:'Prywatność przede wszystkim', trustPrivacyCopy:'Jasne granice danych lokalnych i online', trustReports:'Praktyczne podsumowania', trustReportsCopy:'Raporty oparte na zapisanych danych', trustOffline:'Działa offline', trustOfflineCopy:'Podstawowe finanse pozostają dostępne', trustLife:'Zbudowana do życia', trustLifeCopy:'Budżet, cele, praca i rodzina',
      featureExpenses:'Wydatki', featureExpensesCopy:'Transakcje i kategorie', featureBudgets:'Budżety', featureBudgetsCopy:'Limity i postęp', featureWork:'Praca i dochód', featureWorkCopy:'Godziny i wypłaty', featureCalendar:'Kalendarz', featureCalendarCopy:'Zdarzenia finansowe', featureReports:'Raporty', featureReportsCopy:'Trendy i prognozy', featureGoals:'Cele', featureGoalsCopy:'Plan i postęp', featureAiCopy:'Kontekstowe wyjaśnienia',
      clarityKicker:'Aplikacja', clarityTitle:'Prawdziwe ekrany KOVA.', clarityCopy:'Zrzuty pochodzą z działającej kompilacji na telefonie.', clarityAccounts:'Konta, transakcje i kategorie', clarityReports:'Raporty oraz prognozy', clarityWork:'Praca i dochód', clarityGoals:'Cele i majątek netto', clarityCurrency:'Wiele walut z właściwą precyzją', clarityOffline:'Działanie offline dla podstawowych danych', exploreScreens:'Poznaj ekrany', screenOverview:'Podgląd', screenOverviewCopy:'Bieżący obraz finansów', screenFeatures:'Funkcje', screenFeaturesCopy:'Moduły aplikacji', screenWork:'Praca i dochód', screenWorkCopy:'Profil, godziny i wypłaty',
      aiQuestion:'„Co najbardziej wpłynęło na mój miesiąc?”', aiTitle:'Poznaj KOVA AI', aiSubtitle:'Asystent, który wyjaśnia Twoje dane', aiCopy:'KOVA AI może pomagać interpretować zapisane informacje i konfigurację. Nie zastępuje porady finansowej, podatkowej ani prawnej.', aiInsight:'Kontekstowe wnioski', aiInsightCopy:'Na podstawie danych w aplikacji', aiExplain:'Jasne wyjaśnienia', aiExplainCopy:'Bez ukrywania niepewności', aiControl:'Kontrola użytkownika', aiControlCopy:'AI nie wybiera za Ciebie wartości prawnych',
      securityKicker:'Prywatność', securityTitle:'Jak KOVA chroni dane.', securityCopy:'Podstawowe dane finansowe są przechowywane lokalnie w szyfrowanej bazie. Funkcje online są oddzielone i opisane.', securityModel:'Czytaj o bezpieczeństwie', secureLocal:'Szyfrowanie lokalne', secureOwner:'Izolacja danych', secureOwnerCopy:'Rekordy są przypisane do użytkownika', secureNoBank:'Bez haseł bankowych', secureNoBankCopy:'KOVA nie łączy się z bankiem', secureOnline:'Funkcje online', secureOnlineCopy:'Używane tylko tam, gdzie są potrzebne',
      legalKicker:'Dokumenty', legalTitle:'Zasady KOVA.', legalCopy:'Prywatność, warunki korzystania i cookies w jednym miejscu.', privacyTitle:'Polityka prywatności', privacyCopy:'Dane lokalne i funkcje online.', termsTitle:'Warunki korzystania', termsCopy:'Zakres i zasady produktu.', cookiesTitle:'Cookies', cookiesCopy:'Ustawienia i pamięć przeglądarki.', privacyShort:'Prywatność', termsShort:'Warunki', cookiesShort:'Cookies',
      activeDevelopment:'Projekt w rozwoju.', cookieSettings:'Ustawienia', cookieTitle:'Prywatność i cookies', cookieCopy:'Za zgodą używamy anonimowych cookies analitycznych. Niezbędne cookies działają zawsze.', cookieDetails:'Szczegóły', cookieAcceptAll:'Akceptuj wszystkie', cookieEssential:'Tylko niezbędne', cookieSave:'Zapisz wybór', essentialTitle:'Niezbędne', essentialCopy:'Język i zapis wyboru cookies. Zawsze aktywne.', analyticsTitle:'Analityczne', analyticsCopy:'Anonimowy identyfikator, sesja i licznik odsłon. Bez danych finansowych.'
    },
    en: {
      skip:'Skip to content', tagline:'Finances in one place.', language:'Language', openMenu:'Open menu', close:'Close', navFeatures:'Features', navScreens:'Screens', navSecurity:'Security', navLegal:'Documents', navRoadmap:'Roadmap',
      heroKicker:'KOVA for Android', heroTitle:'Finances<br><em>in one place.</em>', heroCopy:'Spending, budgets, goals, and work income in one app.', projectStatus:'Check project status', watchVideo:'View product tour', pauseVideo:'Pause', playVideo:'Play', releaseNote:'The project is in active development.',
      trustPrivacy:'Privacy first', trustPrivacyCopy:'Clear boundaries for local and online data', trustReports:'Practical summaries', trustReportsCopy:'Reports based on recorded data', trustOffline:'Works offline', trustOfflineCopy:'Core finances remain available', trustLife:'Built for real life', trustLifeCopy:'Budgets, goals, work and family',
      featureExpenses:'Expenses', featureExpensesCopy:'Transactions and categories', featureBudgets:'Budgets', featureBudgetsCopy:'Limits and progress', featureWork:'Work & Income', featureWorkCopy:'Hours and paydays', featureCalendar:'Calendar', featureCalendarCopy:'Financial events', featureReports:'Reports', featureReportsCopy:'Trends and forecasts', featureGoals:'Goals', featureGoalsCopy:'Plans and progress', featureAiCopy:'Contextual explanations',
      clarityKicker:'The app', clarityTitle:'Real KOVA screens.', clarityCopy:'Captured from a running build on a phone.', clarityAccounts:'Accounts, transactions and categories', clarityReports:'Reports and forecasts', clarityWork:'Work & Income', clarityGoals:'Goals and net worth', clarityCurrency:'Multi-currency precision', clarityOffline:'Offline access to core data', exploreScreens:'Explore screens', screenOverview:'Overview', screenOverviewCopy:'Your current financial picture', screenFeatures:'Features', screenFeaturesCopy:'App modules', screenWork:'Work & Income', screenWorkCopy:'Profiles, hours and paydays',
      aiQuestion:'“What affected my month the most?”', aiTitle:'Meet KOVA AI', aiSubtitle:'An assistant that explains your data', aiCopy:'KOVA AI can help interpret recorded information and configuration. It does not replace financial, tax or legal advice.', aiInsight:'Contextual insights', aiInsightCopy:'Based on data in the app', aiExplain:'Clear explanations', aiExplainCopy:'Without hiding uncertainty', aiControl:'User control', aiControlCopy:'AI does not choose legal values for you',
      securityKicker:'Privacy', securityTitle:'How KOVA protects data.', securityCopy:'Core financial data is stored locally in an encrypted database. Online features are separate and documented.', securityModel:'Read about security', secureLocal:'Local encryption', secureOwner:'Data isolation', secureOwnerCopy:'Records are assigned to their owner', secureNoBank:'No bank passwords', secureNoBankCopy:'KOVA does not connect to your bank', secureOnline:'Online features', secureOnlineCopy:'Used only where needed',
      legalKicker:'Documents', legalTitle:'KOVA policies.', legalCopy:'Privacy, terms, and cookies in one place.', privacyTitle:'Privacy Policy', privacyCopy:'Local data and online features.', termsTitle:'Terms of Use', termsCopy:'Product scope and rules.', cookiesTitle:'Cookies', cookiesCopy:'Browser settings and storage.', privacyShort:'Privacy', termsShort:'Terms', cookiesShort:'Cookies',
      activeDevelopment:'Project in development.', cookieSettings:'Settings', cookieTitle:'Privacy and cookies', cookieCopy:'With your consent, we use anonymous analytics cookies. Essential cookies always operate.', cookieDetails:'Details', cookieAcceptAll:'Accept all', cookieEssential:'Essential only', cookieSave:'Save choice', essentialTitle:'Essential', essentialCopy:'Language and cookie-choice storage. Always active.', analyticsTitle:'Analytics', analyticsCopy:'Anonymous browser ID, session and page-view counter. No financial data.'
    },
    ru: {
      skip:'Перейти к содержимому', tagline:'Финансы в одном месте.', language:'Язык', openMenu:'Открыть меню', close:'Закрыть', navFeatures:'Функции', navScreens:'Экраны', navSecurity:'Безопасность', navLegal:'Документы', navRoadmap:'Планы',
      heroKicker:'KOVA для Android', heroTitle:'Финансы<br><em>в одном месте.</em>', heroCopy:'Расходы, бюджеты, цели и доход от работы в одном приложении.', projectStatus:'Статус проекта', watchVideo:'Посмотреть обзор', pauseVideo:'Пауза', playVideo:'Воспроизвести', releaseNote:'Проект находится в разработке.',
      trustPrivacy:'Приватность прежде всего', trustPrivacyCopy:'Ясные границы локальных и онлайн-данных', trustReports:'Практичные итоги', trustReportsCopy:'Отчёты на основе сохранённых данных', trustOffline:'Работает офлайн', trustOfflineCopy:'Основные финансы всегда доступны', trustLife:'Для реальной жизни', trustLifeCopy:'Бюджеты, цели, работа и семья',
      featureExpenses:'Расходы', featureExpensesCopy:'Транзакции и категории', featureBudgets:'Бюджеты', featureBudgetsCopy:'Лимиты и прогресс', featureWork:'Работа и доход', featureWorkCopy:'Часы и выплаты', featureCalendar:'Календарь', featureCalendarCopy:'Финансовые события', featureReports:'Отчёты', featureReportsCopy:'Тренды и прогнозы', featureGoals:'Цели', featureGoalsCopy:'План и прогресс', featureAiCopy:'Контекстные объяснения',
      clarityKicker:'Приложение', clarityTitle:'Настоящие экраны KOVA.', clarityCopy:'Снимки работающей сборки на телефоне.', clarityAccounts:'Счета, транзакции и категории', clarityReports:'Отчёты и прогнозы', clarityWork:'Работа и доход', clarityGoals:'Цели и капитал', clarityCurrency:'Точность для разных валют', clarityOffline:'Офлайн-доступ к основным данным', exploreScreens:'Посмотреть экраны', screenOverview:'Обзор', screenOverviewCopy:'Текущая картина финансов', screenFeatures:'Функции', screenFeaturesCopy:'Модули приложения', screenWork:'Работа и доход', screenWorkCopy:'Профили, часы и выплаты',
      aiQuestion:'«Что сильнее всего повлияло на мой месяц?»', aiTitle:'Знакомьтесь: KOVA AI', aiSubtitle:'Помощник, который объясняет ваши данные', aiCopy:'KOVA AI помогает интерпретировать сохранённую информацию и настройки. Он не заменяет финансовую, налоговую или юридическую консультацию.', aiInsight:'Контекстные выводы', aiInsightCopy:'На основе данных приложения', aiExplain:'Понятные объяснения', aiExplainCopy:'Без сокрытия неопределённости', aiControl:'Контроль пользователя', aiControlCopy:'AI не выбирает за вас юридически значимые параметры',
      securityKicker:'Приватность', securityTitle:'Как KOVA защищает данные.', securityCopy:'Основные финансовые данные хранятся локально в зашифрованной базе. Онлайн-функции отделены и описаны.', securityModel:'О безопасности', secureLocal:'Локальное шифрование', secureOwner:'Изоляция данных', secureOwnerCopy:'Записи привязаны к владельцу', secureNoBank:'Без банковских паролей', secureNoBankCopy:'KOVA не подключается к банку', secureOnline:'Онлайн-функции', secureOnlineCopy:'Используются только там, где нужны',
      legalKicker:'Документы', legalTitle:'Правила KOVA.', legalCopy:'Приватность, условия и cookies в одном месте.', privacyTitle:'Политика конфиденциальности', privacyCopy:'Локальные данные и онлайн-функции.', termsTitle:'Условия использования', termsCopy:'Возможности и правила продукта.', cookiesTitle:'Cookies', cookiesCopy:'Настройки и хранилище браузера.', privacyShort:'Приватность', termsShort:'Условия', cookiesShort:'Cookies',
      activeDevelopment:'Проект в разработке.', cookieSettings:'Настройки', cookieTitle:'Приватность и cookies', cookieCopy:'С вашего согласия используются анонимные аналитические cookies. Необходимые cookies работают всегда.', cookieDetails:'Подробнее', cookieAcceptAll:'Принять все', cookieEssential:'Только необходимые', cookieSave:'Сохранить выбор', essentialTitle:'Необходимые', essentialCopy:'Язык и сохранение выбора cookies. Всегда активны.', analyticsTitle:'Аналитические', analyticsCopy:'Анонимный ID браузера, сессия и счётчик просмотров. Без финансовых данных.'
    }
  };

  const additions = {
    pl: {
      navFaq:'FAQ', navStatus:'Projekt', releaseNote:'W rozwoju · publiczne pobieranie nie jest jeszcze dostępne.',
      galleryHint:'Dotknij ekranu, aby zobaczyć go w całości.', secureLocalCopy:'Szyfrowana baza na urządzeniu',
      projectKicker:'Projekt w rozwoju', projectHeading:'Co dalej z KOVA?', projectCopy:'Aplikacja jest rozwijana i testowana. Tutaj sprawdzisz jej dostępność, plan prac i ostatnie zmiany.', availability:'Dostępność aplikacji', roadmapLink:'Nad czym pracujemy', updatesLink:'Ostatnie zmiany',
      faqKicker:'Warto wiedzieć', faqTitle:'Kilka prostych odpowiedzi.', faqCopy:'Zanim zaczniesz korzystać z KOVA.',
      faqDownloadQ:'Czy mogę już pobrać KOVA?', faqDownloadA:'Publiczne pobieranie nie jest jeszcze dostępne. Sprawdzony link do sklepu pojawi się na stronie statusu projektu po przygotowaniu wydania. Nie podajemy daty, dopóki nie będzie potwierdzona.',
      faqOfflineQ:'Czy aplikacja działa bez internetu?', faqOfflineA:'Podstawowe dane finansowe są przechowywane na urządzeniu. Logowanie Google, funkcje rodzinne i inne usługi online potrzebują połączenia z internetem.',
      faqBankQ:'Czy muszę podłączać konto bankowe?', faqBankA:'Nie. KOVA nie wymaga haseł do banku. Konta w aplikacji służą do porządkowania zapisywanych przez Ciebie finansów.',
      faqEstimateQ:'Czy prognozy i kwoty netto są gwarantowane?', faqEstimateA:'Nie. To szacunki oparte na zapisanych danych i konfiguracji. Mogą różnić się od rzeczywistych wypłat i nie zastępują dokumentów pracodawcy ani indywidualnej porady.',
      faqWebsiteQ:'Czy ta strona ma dostęp do moich finansów?', faqWebsiteA:'Nie. Strona przedstawia projekt i nie łączy się z bazą finansową w telefonie. Opcjonalna analityka strony zależy od Twojej zgody.',
      altHome:'Podgląd finansów w KOVA', altProfile:'Profil w aplikacji KOVA', altFeatures:'Menu funkcji KOVA', altWork:'Praca i dochód w KOVA', previous:'Poprzedni ekran', next:'Następny ekran', navigation:'Nawigacja główna', pageTitle:'KOVA — finanse w jednym miejscu',
      cookieCopy:'Niezbędne cookies zapamiętują Twoje ustawienia. Możesz też zezwolić na analitykę korzystania ze strony. Odmowa nie ogranicza jej działania.', analyticsCopy:'Identyfikator przeglądarki, sesja i licznik zdarzeń. Bez danych finansowych.'
    },
    en: {
      navFaq:'FAQ', navStatus:'Project', releaseNote:'In development · public download is not available yet.',
      galleryHint:'Tap a screen to see the full image.', secureLocalCopy:'Encrypted database on your device',
      projectKicker:'In development', projectHeading:'What’s next for KOVA?', projectCopy:'The app is being developed and tested. Follow its availability, the work ahead, and recent changes here.', availability:'App availability', roadmapLink:'What we’re working on', updatesLink:'Recent updates',
      faqKicker:'Good to know', faqTitle:'A few simple answers.', faqCopy:'Before you start using KOVA.',
      faqDownloadQ:'Can I download KOVA yet?', faqDownloadA:'Public download is not available yet. A verified store link will appear on the project status page when the release is ready. We will announce a date only once it is confirmed.',
      faqOfflineQ:'Does the app work without internet?', faqOfflineA:'Core financial data is stored on your device. Google sign-in, family features, and other online services need an internet connection.',
      faqBankQ:'Do I need to connect my bank account?', faqBankA:'No. KOVA does not ask for your bank passwords. Accounts in the app help organise the financial information you record.',
      faqEstimateQ:'Are forecasts and net pay amounts guaranteed?', faqEstimateA:'No. They are estimates based on recorded data and configuration. They may differ from actual payments and do not replace employer documents or individual advice.',
      faqWebsiteQ:'Can this website access my finances?', faqWebsiteA:'No. The website introduces the project and does not connect to the financial database on your phone. Optional website analytics depends on your consent.',
      altHome:'KOVA financial overview', altProfile:'KOVA profile screen', altFeatures:'KOVA features menu', altWork:'KOVA Work & Income screen', previous:'Previous screen', next:'Next screen', navigation:'Main navigation', pageTitle:'KOVA — finances in one place',
      cookieCopy:'Essential cookies remember your settings. You can also allow analytics about how the website is used. Refusing does not limit the website.', analyticsCopy:'Browser identifier, session, and event counter. No financial data.'
    },
    ru: {
      navFaq:'Вопросы', navStatus:'Проект', releaseNote:'В разработке · публичное скачивание пока недоступно.',
      galleryHint:'Нажмите на экран, чтобы открыть его целиком.', secureLocalCopy:'Зашифрованная база на устройстве',
      projectKicker:'В разработке', projectHeading:'Что дальше с KOVA?', projectCopy:'Приложение разрабатывается и тестируется. Здесь можно узнать о доступности, планах и последних изменениях.', availability:'Доступность приложения', roadmapLink:'Над чем мы работаем', updatesLink:'Последние изменения',
      faqKicker:'Полезно знать', faqTitle:'Несколько простых ответов.', faqCopy:'Прежде чем начать пользоваться KOVA.',
      faqDownloadQ:'Можно ли уже скачать KOVA?', faqDownloadA:'Публичное скачивание пока недоступно. Проверенная ссылка на магазин появится на странице статуса проекта после подготовки выпуска. Дата будет опубликована только после подтверждения.',
      faqOfflineQ:'Работает ли приложение без интернета?', faqOfflineA:'Основные финансовые данные хранятся на устройстве. Для входа через Google, семейных функций и других онлайн-сервисов нужен интернет.',
      faqBankQ:'Нужно ли подключать банковский счёт?', faqBankA:'Нет. KOVA не запрашивает пароли от банка. Счета в приложении помогают упорядочить финансовые данные, которые вы записываете.',
      faqEstimateQ:'Гарантированы ли прогнозы и суммы нетто?', faqEstimateA:'Нет. Это оценки на основе записанных данных и настроек. Они могут отличаться от фактических выплат и не заменяют документы работодателя или индивидуальную консультацию.',
      faqWebsiteQ:'Есть ли у сайта доступ к моим финансам?', faqWebsiteA:'Нет. Сайт рассказывает о проекте и не подключается к финансовой базе на телефоне. Необязательная аналитика сайта зависит от вашего согласия.',
      altHome:'Обзор финансов KOVA', altProfile:'Профиль в KOVA', altFeatures:'Меню функций KOVA', altWork:'Экран «Работа и доход» KOVA', previous:'Предыдущий экран', next:'Следующий экран', navigation:'Основная навигация', pageTitle:'KOVA — финансы в одном месте',
      cookieCopy:'Необходимые cookies запоминают настройки. Вы также можете разрешить аналитику использования сайта. Отказ не ограничивает его работу.', analyticsCopy:'Идентификатор браузера, сессия и счётчик событий. Без финансовых данных.'
    }
  };
  Object.keys(additions).forEach(lang => Object.assign(dictionaries[lang], additions[lang]));

  const videoSlides = [
    { image:'assets/screenshots/kova-home-device.png', title:{ pl:'Codzienny obraz finansów', en:'Your daily financial picture', ru:'Ежедневная картина финансов' }, copy:{ pl:'Saldo, historia i najważniejsze działania w jednym miejscu.', en:'Balance, history, and essential actions in one place.', ru:'Баланс, история и основные действия в одном месте.' } },
    { image:'assets/screenshots/kova-more.png', title:{ pl:'Wszystkie narzędzia pod ręką', en:'Every tool within reach', ru:'Все инструменты под рукой' }, copy:{ pl:'Budżety, cele, raporty, kalendarz, inwestycje i ustawienia tworzą jeden spójny system.', en:'Budgets, goals, reports, calendar, investments, and settings form one coherent system.', ru:'Бюджеты, цели, отчёты, календарь, инвестиции и настройки образуют единую систему.' } },
    { image:'assets/screenshots/kova-work-income.png', title:{ pl:'Praca i dochód', en:'Work & Income', ru:'Работа и доход' }, copy:{ pl:'Profile pracy, godziny oraz estymacje wynagrodzeń i terminów wypłat.', en:'Work profiles, hours, pay estimates, and expected paydays.', ru:'Профили работы, часы, оценка заработка и ожидаемые даты выплат.' } },
    { image:'assets/screenshots/kova-profile.png', title:{ pl:'Postęp i profil', en:'Progress and profile', ru:'Прогресс и профиль' }, copy:{ pl:'Osiągnięcia i ustawienia profilu uzupełniają codzienną kontrolę finansów.', en:'Achievements and profile settings complement everyday financial control.', ru:'Достижения и настройки профиля дополняют ежедневный контроль финансов.' } }
  ];

  const supported = Object.keys(dictionaries);
  const requested = new URLSearchParams(location.search).get('lang');
  let storedLanguage;
  try { storedLanguage = localStorage.getItem(LANGUAGE_KEY); } catch { /* Browsing still works with storage disabled. */ }
  let language = supported.includes(requested) ? requested : storedLanguage;
  if (!supported.includes(language)) language = navigator.language?.toLowerCase().startsWith('ru') ? 'ru' : navigator.language?.toLowerCase().startsWith('en') ? 'en' : 'pl';
  const copy = () => dictionaries[language];
  const isLocalOwner = location.protocol === 'file:' || ['localhost', '127.0.0.1', '::1'].includes(location.hostname);

  function applyLanguage() {
    document.documentElement.lang = language;
    document.querySelector('#site-language').value = language;
    document.querySelectorAll('[data-i18n]').forEach(node => { const value = copy()[node.dataset.i18n]; if (value) node.textContent = value; });
    document.querySelectorAll('[data-i18n-html]').forEach(node => { const value = copy()[node.dataset.i18nHtml]; if (value) node.innerHTML = value; });
    document.querySelectorAll('[data-i18n-alt]').forEach(node => { node.alt = copy()[node.dataset.i18nAlt]; });
    document.querySelectorAll('[data-lightbox]').forEach(button => { button.setAttribute('aria-label', `${{pl:'Powiększ',en:'Enlarge',ru:'Увеличить'}[language]}: ${button.querySelector('img').alt}`); });
    document.querySelector('.topbar .brand').setAttribute('aria-label', copy().pageTitle);
    document.querySelector('.hero-showcase').setAttribute('aria-label', copy().navScreens);
    document.querySelector('.feature-strip').setAttribute('aria-label', copy().navFeatures);
    document.querySelector('.menu-button').setAttribute('aria-label', copy().openMenu);
    document.querySelector('.cookie-option input[disabled]').setAttribute('aria-label', copy().essentialTitle);
    document.title = copy().pageTitle;
    document.querySelector('meta[name="description"]').content = copy().heroCopy;
    document.querySelector('meta[property="og:title"]').content = copy().pageTitle;
    document.querySelector('meta[property="og:description"]').content = copy().heroCopy;
    document.querySelector('.main-nav').setAttribute('aria-label', copy().navigation);
    document.querySelector('[data-video-prev]').setAttribute('aria-label', copy().previous);
    document.querySelector('[data-video-next]').setAttribute('aria-label', copy().next);
    document.querySelector('.lightbox>button').setAttribute('aria-label', copy().close);
    document.querySelectorAll('[data-legal-link]').forEach(link => { link.href = `${link.dataset.legalLink}?lang=${language}`; });
    try { localStorage.setItem(LANGUAGE_KEY, language); } catch { /* URL preserves the language when storage is unavailable. */ }
    const url = new URL(location.href); url.searchParams.set('lang', language); history.replaceState(null, '', url);
    document.cookie = `kova_site_language=${language}; Max-Age=31536000; Path=/; SameSite=Lax`;
    renderVideoSlide();
  }

  document.querySelectorAll('[data-local-workspace]').forEach(node => { node.hidden = !isLocalOwner; });
  document.querySelector('#site-language').addEventListener('change', event => { language = event.target.value; applyLanguage(); });

  const menuButton = document.querySelector('.menu-button');
  const navigation = document.querySelector('.main-nav');
  menuButton.addEventListener('click', () => { const open = navigation.classList.toggle('open'); menuButton.setAttribute('aria-expanded', String(open)); });
  navigation.addEventListener('click', event => { if (event.target.closest('a')) { navigation.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); } });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && navigation.classList.contains('open')) { navigation.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); menuButton.focus(); } });

  const lightbox = document.querySelector('.lightbox');
  const lightboxImage = lightbox.querySelector('img');
  document.querySelectorAll('[data-lightbox]').forEach(button => button.addEventListener('click', () => { const image = button.querySelector('img'); lightboxImage.src = button.dataset.lightbox; lightboxImage.alt = image.alt; lightbox.showModal(); }));
  lightbox.querySelector('button').addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', event => { if (event.target === lightbox) lightbox.close(); });

  const videoDialog = document.querySelector('[data-video-dialog]');
  const videoImage = document.querySelector('[data-video-image]');
  const videoTitle = document.querySelector('[data-video-title]');
  const videoCopy = document.querySelector('[data-video-copy]');
  const videoCounter = document.querySelector('[data-video-counter]');
  const videoProgress = document.querySelector('[data-video-progress]');
  const videoPlayLabel = document.querySelector('[data-video-play-label]');
  const videoPlayIcon = document.querySelector('[data-video-play] use');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let videoIndex = 0;
  let videoPlaying = !reduceMotion;
  let videoTimer;

  function renderVideoSlide() {
    const slide = videoSlides[videoIndex];
    if (!slide || !videoImage) return;
    videoImage.src = slide.image;
    videoImage.alt = slide.title[language];
    videoTitle.textContent = slide.title[language];
    videoCopy.textContent = slide.copy[language];
    videoCounter.textContent = `${videoIndex + 1} / ${videoSlides.length}`;
    videoProgress.style.width = `${((videoIndex + 1) / videoSlides.length) * 100}%`;
    videoPlayLabel.textContent = videoPlaying ? copy().pauseVideo : copy().playVideo;
    videoPlayIcon.setAttribute('href', `assets/icons.svg#${videoPlaying ? 'pause' : 'play'}`);
  }
  function scheduleVideo() {
    clearInterval(videoTimer);
    if (videoPlaying && videoDialog.open) videoTimer = setInterval(() => { videoIndex = (videoIndex + 1) % videoSlides.length; renderVideoSlide(); }, 3600);
  }
  function changeVideo(direction) { videoIndex = (videoIndex + direction + videoSlides.length) % videoSlides.length; renderVideoSlide(); scheduleVideo(); }
  document.querySelector('[data-video-open]').addEventListener('click', () => { videoIndex = 0; videoPlaying = !reduceMotion; renderVideoSlide(); videoDialog.showModal(); scheduleVideo(); });
  document.querySelector('[data-video-close]').addEventListener('click', () => { clearInterval(videoTimer); videoDialog.close(); });
  document.querySelector('[data-video-prev]').addEventListener('click', () => changeVideo(-1));
  document.querySelector('[data-video-next]').addEventListener('click', () => changeVideo(1));
  document.querySelector('[data-video-play]').addEventListener('click', () => { videoPlaying = !videoPlaying; renderVideoSlide(); scheduleVideo(); });
  videoDialog.addEventListener('click', event => { if (event.target === videoDialog) { clearInterval(videoTimer); videoDialog.close(); } });
  videoDialog.addEventListener('close', () => clearInterval(videoTimer));

  const readCookie = name => document.cookie.split(';').map(value => value.trim()).find(value => value.startsWith(`${name}=`))?.slice(name.length + 1) || '';
  const writeCookie = (name, value, maxAge) => { document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${maxAge}; Path=/; SameSite=Lax${location.protocol === 'https:' ? '; Secure' : ''}`; };
  const removeCookie = name => { document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax${location.protocol === 'https:' ? '; Secure' : ''}`; };
  const makeAnonymousId = () => crypto.randomUUID?.() || `${Date.now().toString(36)}-${crypto.getRandomValues(new Uint32Array(1))[0].toString(36)}`;
  const analyticsAllowed = () => decodeURIComponent(readCookie(CONSENT_COOKIE)) === 'analytics';
  const analyticsId = () => {
    const current = decodeURIComponent(readCookie(ANALYTICS_ID_COOKIE));
    if (current) return current;
    const created = makeAnonymousId(); writeCookie(ANALYTICS_ID_COOKIE, created, 31536000); return created;
  };
  const analyticsSession = () => {
    const current = decodeURIComponent(readCookie(ANALYTICS_SESSION_COOKIE));
    const session = current || makeAnonymousId(); writeCookie(ANALYTICS_SESSION_COOKIE, session, 1800); return session;
  };
  function trackAnalytics(eventName) {
    if (!analyticsAllowed()) return false;
    const count = Number(decodeURIComponent(readCookie(ANALYTICS_COUNT_COOKIE)) || 0) + 1;
    writeCookie(ANALYTICS_COUNT_COOKIE, String(count), 1800);
    const event = { event:eventName, path:`${location.pathname}${location.hash}`, language, anonymousId:analyticsId(), sessionId:analyticsSession(), timestamp:new Date().toISOString() };
    window.dispatchEvent(new CustomEvent('kova:analytics', { detail:event }));
    const endpoint = window.KOVA_ANALYTICS_ENDPOINT;
    if (endpoint && navigator.sendBeacon) navigator.sendBeacon(endpoint, new Blob([JSON.stringify(event)], { type:'application/json' }));
    return true;
  }
  function disableAnalytics() {
    [ANALYTICS_ID_COOKIE, ANALYTICS_SESSION_COOKIE, ANALYTICS_COUNT_COOKIE].forEach(removeCookie);
  }

  const cookieBanner = document.querySelector('[data-cookie-banner]');
  const cookiePreferences = document.querySelector('[data-cookie-preferences]');
  const analyticsToggle = document.querySelector('[data-cookie-analytics-toggle]');
  const preferencesToggle = document.querySelector('[data-cookie-preferences-toggle]');
  function openCookieSettings(showPreferences = false) {
    cookieBanner.hidden = false;
    cookiePreferences.hidden = !showPreferences;
    preferencesToggle.setAttribute('aria-expanded', String(showPreferences));
    analyticsToggle.checked = analyticsAllowed();
  }
  function saveConsent(analytics) {
    writeCookie(CONSENT_COOKIE, analytics ? 'analytics' : 'essential', 31536000);
    if (analytics) trackAnalytics('consent_accepted'); else disableAnalytics();
    cookieBanner.hidden = true;
  }
  removeCookie('kova_cookie_notice');
  document.querySelector('[data-cookie-accept-all]').addEventListener('click', () => saveConsent(true));
  document.querySelector('[data-cookie-essential]').addEventListener('click', () => saveConsent(false));
  preferencesToggle.addEventListener('click', () => openCookieSettings(cookiePreferences.hidden));
  document.querySelector('[data-cookie-save]').addEventListener('click', () => saveConsent(analyticsToggle.checked));
  document.querySelector('[data-cookie-settings]')?.addEventListener('click', () => openCookieSettings(true));
  window.addEventListener('kova:cookie-settings', () => { openCookieSettings(true); analyticsToggle.focus(); });
  document.querySelectorAll('[data-analytics-event]').forEach(node => node.addEventListener('click', () => trackAnalytics(node.dataset.analyticsEvent)));
  window.KOVA_ANALYTICS = Object.freeze({ track:trackAnalytics, isEnabled:analyticsAllowed });

  applyLanguage();
  const consent = decodeURIComponent(readCookie(CONSENT_COOKIE));
  if (!consent) openCookieSettings(false);
  else { cookieBanner.hidden = true; if (consent === 'analytics') trackAnalytics('page_view'); else disableAnalytics(); }
  if (new URLSearchParams(location.search).get('cookies') === 'settings') {
    openCookieSettings(true);
    const url = new URL(location.href); url.searchParams.delete('cookies'); history.replaceState(null, '', url);
  }
})();
