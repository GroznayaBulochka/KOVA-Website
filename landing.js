(() => {
  'use strict';

  const LANGUAGE_KEY = 'kova_site_language';
  const dictionaries = {
  "pl": {
    "skip": "Przejdź do treści",
    "tagline": "Finanse w jednym miejscu.",
    "language": "Język",
    "openMenu": "Otwórz menu",
    "close": "Zamknij",
    "navFeatures": "Funkcje",
    "navScreens": "Ekrany",
    "navSecurity": "Bezpieczeństwo",
    "navLegal": "Dokumenty",
    "navRoadmap": "Roadmapa",
    "heroKicker": "KOVA Offline Free V1 · Android",
    "heroTitle": "Finanse<br><em>w jednym miejscu.</em>",
    "heroCopy": "Wydatki, budżety, cele i dochód z pracy — na Twoim telefonie. Przygotowujemy bezpłatną wersję offline, bez konta w chmurze, reklam i subskrypcji.",
    "projectStatus": "Sprawdź stan projektu",
    "watchVideo": "Obejrzyj prezentację",
    "pauseVideo": "Pauza",
    "playVideo": "Odtwórz",
    "releaseNote": "Przed premierą · publiczne pobieranie jeszcze niedostępne.",
    "trustPrivacy": "Prywatność przede wszystkim",
    "trustPrivacyCopy": "Lokalna baza, bez automatycznego uploadu",
    "trustReports": "Praktyczne podsumowania",
    "trustReportsCopy": "Raporty oparte na zapisanych danych",
    "trustOffline": "Działa offline",
    "trustOfflineCopy": "Podstawowe finanse pozostają dostępne",
    "trustLife": "Zbudowana do życia",
    "trustLifeCopy": "Budżet, cele, praca i notatki",
    "featureExpenses": "Wydatki",
    "featureExpensesCopy": "Transakcje i kategorie",
    "featureBudgets": "Budżety",
    "featureBudgetsCopy": "Limity i postęp",
    "featureWork": "Praca i dochód",
    "featureWorkCopy": "Godziny i wypłaty",
    "featureCalendar": "Kalendarz",
    "featureCalendarCopy": "Zdarzenia finansowe",
    "featureReports": "Raporty",
    "featureReportsCopy": "Trendy i prognozy",
    "featureGoals": "Cele",
    "featureGoalsCopy": "Plan i postęp",
    "clarityKicker": "Aplikacja",
    "clarityTitle": "Zajrzyj do KOVA.",
    "clarityCopy": "Jedna fikcyjna użytkowniczka, trzy konta i pół roku codziennych finansów. To nowe, nieprzerabiane zrzuty z działającej KOVA Offline V1 na emulatorze Androida. Pokazują prawdziwe funkcje z realistycznymi danymi demonstracyjnymi — bez prywatnych finansów. Interfejs na zdjęciach jest po polsku.",
    "clarityAccounts": "Konta, transakcje i kategorie",
    "clarityReports": "Raporty oraz prognozy",
    "clarityWork": "Praca i dochód",
    "clarityGoals": "Cele i majątek netto",
    "clarityCurrency": "Wiele walut z właściwą precyzją",
    "clarityOffline": "Działanie offline dla podstawowych danych",
    "exploreScreens": "Poznaj ekrany",
    "screenOverview": "Ciemny motyw",
    "screenOverviewCopy": "Saldo i zapisany wydatek",
    "screenFeatures": "Jasny motyw",
    "screenFeaturesCopy": "Te same dane, inny wygląd",
    "screenWork": "Lokalne notatki",
    "screenWorkCopy": "Zapis na urządzeniu · 21.10.2026",
    "securityKicker": "Prywatność",
    "securityTitle": "Jak KOVA chroni dane.",
    "securityCopy": "Główna baza finansowa korzysta z SQLCipher. Nie ma automatycznej synchronizacji z chmurą. Zadbaj o blokadę telefonu i regularny eksport — szyfrowanie nie zastępuje kopii ani ostrożności.",
    "securityModel": "Czytaj o bezpieczeństwie",
    "secureLocal": "Szyfrowanie lokalne",
    "secureOwner": "Izolacja danych",
    "secureOwnerCopy": "Rekordy są przypisane do użytkownika",
    "secureNoBank": "Bez haseł bankowych",
    "secureNoBankCopy": "KOVA nie łączy się z bankiem",
    "secureOnline": "Ręczny eksport",
    "secureOnlineCopy": "Częściowa kopia chroniona hasłem",
    "legalKicker": "Dokumenty",
    "legalTitle": "Zasady KOVA.",
    "legalCopy": "Aktualne kopie dokumentów aplikacji. Polityka prywatności i warunki są projektami wymagającymi zatwierdzenia przed publikacją.",
    "privacyTitle": "Polityka prywatności",
    "privacyCopy": "Dane lokalne, eksport i kontakt ze wsparciem.",
    "termsTitle": "Warunki korzystania",
    "termsCopy": "Zakres i zasady produktu.",
    "cookiesTitle": "Cookies",
    "cookiesCopy": "Ustawienia i pamięć przeglądarki.",
    "privacyShort": "Prywatność",
    "termsShort": "Warunki",
    "cookiesShort": "Cookies",
    "activeDevelopment": "Offline Free V1 · przed premierą.",
    "cookieSettings": "Ustawienia",
    "navFaq": "FAQ",
    "navStatus": "Projekt",
    "galleryHint": "Dotknij ekranu, aby zobaczyć go w całości.",
    "secureLocalCopy": "Szyfrowana baza na urządzeniu",
    "projectKicker": "Pierwsze wydanie",
    "projectHeading": "Bezpłatnie. Na telefon.",
    "projectCopy": "Lokalne konta, transakcje, budżety, płatności cykliczne, długi, cele, majątek netto, praca, raporty, kalendarz, notatki i OCR. Chmura, bankowe API, AI, Wear OS, Rodzina online i notowania na żywo nie są częścią V1. Końcowa kwalifikacja i dokumenty pozostają w przygotowaniu.",
    "availability": "Dostępność aplikacji",
    "roadmapLink": "Nad czym pracujemy",
    "updatesLink": "Ostatnie zmiany",
    "faqKicker": "Warto wiedzieć",
    "faqTitle": "Kilka prostych odpowiedzi.",
    "faqCopy": "Zanim zaczniesz korzystać z KOVA.",
    "faqDownloadQ": "Czy mogę już pobrać KOVA?",
    "faqDownloadA": "Publiczne pobieranie nie jest jeszcze dostępne. Sprawdzony link do sklepu pojawi się na stronie statusu projektu po przygotowaniu wydania. Nie podajemy daty, dopóki nie będzie potwierdzona.",
    "faqOfflineQ": "Czy aplikacja działa bez internetu?",
    "faqOfflineA": "Tak. V1 jest przygotowywana jako aplikacja offline z lokalnym profilem. Nie udostępnia logowania Google, synchronizacji ani usług AI. Wybrany dostawca plików, przeglądarka lub poczta mogą korzystać z internetu niezależnie od KOVA.",
    "faqBankQ": "Czy muszę podłączać konto bankowe?",
    "faqBankA": "Nie. KOVA nie wymaga haseł do banku. Konta w aplikacji służą do porządkowania zapisywanych przez Ciebie finansów.",
    "faqEstimateQ": "Czy prognozy i kwoty netto są gwarantowane?",
    "faqEstimateA": "Nie. To szacunki oparte na zapisanych danych i konfiguracji. Mogą różnić się od rzeczywistych wypłat i nie zastępują dokumentów pracodawcy ani indywidualnej porady.",
    "faqWebsiteQ": "Czy ta strona ma dostęp do moich finansów?",
    "faqWebsiteA": "Nie. Strona przedstawia projekt i nie łączy się z bazą finansową w telefonie. Opcjonalna analityka strony zależy od Twojej zgody.",
    "altHome": "KOVA Offline V1: ekran główny z fikcyjną historią finansową",
    "altProfile": "KOVA Offline V1: trzy lokalne konta demonstracyjne",
    "altFeatures": "KOVA Free V1: jasny motyw na emulatorze",
    "altWork": "KOVA Offline V1: zapis testowej notatki na emulatorze",
    "previous": "Poprzedni ekran",
    "next": "Następny ekran",
    "navigation": "Nawigacja główna",
    "pageTitle": "KOVA — finanse w jednym miejscu",
    "faqFreeQ": "Czy KOVA będzie bezpłatna?",
    "faqFreeA": "Tak. Offline Free V1 nie zawiera reklam, zakupów, subskrypcji ani paywalli. Korzystanie z lokalnych funkcji nie wymaga rejestracji ani płatnej usługi backendowej.",
    "tourNote": "Prawdziwe ekrany aplikacji · fikcyjne dane demonstracyjne · nie nagranie wideo",
    "tourChapters": "Wybierz ekran prezentacji",
    "factAndroid": "Android 7.0+",
    "factOffline": "Lokalne finanse",
    "factAccount": "Bez konta online",
    "faqBackupQ": "Jak zabezpieczyć dane i zmienić telefon?",
    "faqBackupA": "Utwórz ręczny eksport chroniony hasłem i przechowuj go bezpiecznie poza telefonem. Import wymaga potwierdzenia i zastępuje obsługiwany zakres wybranego profilu. To częściowa kopia, nie obraz całej aplikacji: osadzone obrazy notatek są uwzględnione, ale zewnętrzne załączniki i zdjęcia paragonów trzeba zabezpieczyć osobno. Nie ma automatycznego odzyskiwania z chmury ani hasła przez wydawcę.",
    "faqOcrQ": "Czy skanowanie paragonów działa offline?",
    "faqOcrA": "OCR używa modelu dołączonego do aplikacji. Możesz zrobić zdjęcie lub wybrać je z galerii przez selektor Androida. Rozpoznawanie może się pomylić — przed zapisem sprawdź kwotę, walutę i datę. Odmowa dostępu do aparatu nie blokuje wyboru pliku.",
    "faqDeviceQ": "Na jakie urządzenia i dla kogo powstaje KOVA?",
    "faqDeviceA": "Na telefony z Androidem 7.0 lub nowszym, z interfejsem PL/EN/RU. Testy kompatybilności nadal trwają. Planowana grupa to osoby 13+, ale nie jest to zatwierdzona klasyfikacja Google Play ani potwierdzenie dostępności we wszystkich krajach. Wydanie na zegarki i iOS nie jest oferowane."
  },
  "en": {
    "skip": "Skip to content",
    "tagline": "Finances in one place.",
    "language": "Language",
    "openMenu": "Open menu",
    "close": "Close",
    "navFeatures": "Features",
    "navScreens": "Screens",
    "navSecurity": "Security",
    "navLegal": "Documents",
    "navRoadmap": "Roadmap",
    "heroKicker": "KOVA Offline Free V1 · Android",
    "heroTitle": "Finances<br><em>in one place.</em>",
    "heroCopy": "Spending, budgets, goals, and work income — on your phone. We’re preparing a free offline release, without cloud accounts, ads, or subscriptions.",
    "projectStatus": "Check project status",
    "watchVideo": "View product tour",
    "pauseVideo": "Pause",
    "playVideo": "Play",
    "releaseNote": "Before launch · public download is not available yet.",
    "trustPrivacy": "Privacy first",
    "trustPrivacyCopy": "Local database, no automatic uploads",
    "trustReports": "Practical summaries",
    "trustReportsCopy": "Reports based on recorded data",
    "trustOffline": "Works offline",
    "trustOfflineCopy": "Core finances remain available",
    "trustLife": "Built for real life",
    "trustLifeCopy": "Budgets, goals, work, and notes",
    "featureExpenses": "Expenses",
    "featureExpensesCopy": "Transactions and categories",
    "featureBudgets": "Budgets",
    "featureBudgetsCopy": "Limits and progress",
    "featureWork": "Work & Income",
    "featureWorkCopy": "Hours and paydays",
    "featureCalendar": "Calendar",
    "featureCalendarCopy": "Financial events",
    "featureReports": "Reports",
    "featureReportsCopy": "Trends and forecasts",
    "featureGoals": "Goals",
    "featureGoalsCopy": "Plans and progress",
    "clarityKicker": "The app",
    "clarityTitle": "A look inside KOVA.",
    "clarityCopy": "One fictional user, three accounts and six months of everyday finances. These are new, unretouched screenshots from KOVA Offline V1 running on an Android emulator. Real features with realistic demo records, without anyone’s private finances. The app screens are in Polish.",
    "clarityAccounts": "Accounts, transactions and categories",
    "clarityReports": "Reports and forecasts",
    "clarityWork": "Work & Income",
    "clarityGoals": "Goals and net worth",
    "clarityCurrency": "Multi-currency precision",
    "clarityOffline": "Offline access to core data",
    "exploreScreens": "Explore screens",
    "screenOverview": "Dark theme",
    "screenOverviewCopy": "Balance and a recorded expense",
    "screenFeatures": "Light theme",
    "screenFeaturesCopy": "The same data, a different look",
    "screenWork": "Local notes",
    "screenWorkCopy": "Saved on device · 21 Oct 2026",
    "securityKicker": "Privacy",
    "securityTitle": "How KOVA protects data.",
    "securityCopy": "The main financial database uses SQLCipher. There is no automatic cloud sync. Protect your phone and export regularly — encryption does not replace a backup or careful handling.",
    "securityModel": "Read about security",
    "secureLocal": "Local encryption",
    "secureOwner": "Data isolation",
    "secureOwnerCopy": "Records are assigned to their owner",
    "secureNoBank": "No bank passwords",
    "secureNoBankCopy": "KOVA does not connect to your bank",
    "secureOnline": "Manual export",
    "secureOnlineCopy": "A partial, password-protected copy",
    "legalKicker": "Documents",
    "legalTitle": "KOVA policies.",
    "legalCopy": "Current copies of the app documents. The Privacy Policy and Terms remain drafts requiring approval before publication.",
    "privacyTitle": "Privacy Policy",
    "privacyCopy": "Local data, exports, and support contact.",
    "termsTitle": "Terms of Use",
    "termsCopy": "Product scope and rules.",
    "cookiesTitle": "Cookies",
    "cookiesCopy": "Browser settings and storage.",
    "privacyShort": "Privacy",
    "termsShort": "Terms",
    "cookiesShort": "Cookies",
    "activeDevelopment": "Offline Free V1 · before launch.",
    "cookieSettings": "Settings",
    "navFaq": "FAQ",
    "navStatus": "Project",
    "galleryHint": "Tap a screen to see the full image.",
    "secureLocalCopy": "Encrypted database on your device",
    "projectKicker": "The first release",
    "projectHeading": "Free. For your phone.",
    "projectCopy": "Local accounts, transactions, budgets, recurring payments, debts, goals, net worth, work, reports, calendar, notes, and OCR. Cloud services, bank APIs, AI, Wear OS, online Family, and live quotes are not part of V1. Final qualification and documents are still in preparation.",
    "availability": "App availability",
    "roadmapLink": "What we’re working on",
    "updatesLink": "Recent updates",
    "faqKicker": "Good to know",
    "faqTitle": "A few simple answers.",
    "faqCopy": "Before you start using KOVA.",
    "faqDownloadQ": "Can I download KOVA yet?",
    "faqDownloadA": "Public download is not available yet. A verified store link will appear on the project status page when the release is ready. We will announce a date only once it is confirmed.",
    "faqOfflineQ": "Does the app work without internet?",
    "faqOfflineA": "Yes. V1 is being prepared as an offline app with a local profile. It does not offer Google sign-in, sync, or AI services. Your chosen file provider, browser, or email app may use the internet independently of KOVA.",
    "faqBankQ": "Do I need to connect my bank account?",
    "faqBankA": "No. KOVA does not ask for your bank passwords. Accounts in the app help organise the financial information you record.",
    "faqEstimateQ": "Are forecasts and net pay amounts guaranteed?",
    "faqEstimateA": "No. They are estimates based on recorded data and configuration. They may differ from actual payments and do not replace employer documents or individual advice.",
    "faqWebsiteQ": "Can this website access my finances?",
    "faqWebsiteA": "No. The website introduces the project and does not connect to the financial database on your phone. Optional website analytics depends on your consent.",
    "altHome": "KOVA Offline V1: home screen with fictional financial history",
    "altProfile": "KOVA Offline V1: three local demo accounts",
    "altFeatures": "KOVA Free V1: light theme on an emulator",
    "altWork": "KOVA Offline V1: a saved test note on an emulator",
    "previous": "Previous screen",
    "next": "Next screen",
    "navigation": "Main navigation",
    "pageTitle": "KOVA — finances in one place",
    "faqFreeQ": "Will KOVA be free?",
    "faqFreeA": "Yes. Offline Free V1 has no ads, purchases, subscriptions, or paywalls. Local features do not require registration or a paid backend service.",
    "tourNote": "Real app screens · fictional demo data · not a video recording",
    "tourChapters": "Choose a tour screen",
    "factAndroid": "Android 7.0+",
    "factOffline": "Local finances",
    "factAccount": "No online account",
    "faqBackupQ": "How do I protect my data or change phones?",
    "faqBackupA": "Create a password-protected manual export and store it safely outside your phone. Import requires confirmation and replaces the supported data of the selected profile. It is a partial copy, not a full app image: embedded note images are included, but external attachments and receipt photos need separate copies. The publisher cannot restore data from the cloud or recover your backup password.",
    "faqOcrQ": "Does receipt scanning work offline?",
    "faqOcrA": "OCR uses a model bundled with the app. Take a photo or choose one from your gallery through the Android picker. Recognition can be wrong — check the amount, currency, and date before saving. Denying camera access does not block file selection.",
    "faqDeviceQ": "Which devices and audience is KOVA for?",
    "faqDeviceA": "Android phones running Android 7.0 or later, with PL/EN/RU interfaces. Compatibility testing is ongoing. The intended audience is 13+, but this is not an approved Google Play rating or confirmation of availability in every country. No watch or iOS release is offered."
  },
  "ru": {
    "skip": "Перейти к содержимому",
    "tagline": "Финансы в одном месте.",
    "language": "Язык",
    "openMenu": "Открыть меню",
    "close": "Закрыть",
    "navFeatures": "Функции",
    "navScreens": "Экраны",
    "navSecurity": "Безопасность",
    "navLegal": "Документы",
    "navRoadmap": "Планы",
    "heroKicker": "KOVA Offline Free V1 · Android",
    "heroTitle": "Финансы<br><em>в одном месте.</em>",
    "heroCopy": "Расходы, бюджеты, цели и доход от работы — на вашем телефоне. Готовим бесплатную офлайн-версию без облачного аккаунта, рекламы и подписок.",
    "projectStatus": "Статус проекта",
    "watchVideo": "Посмотреть обзор",
    "pauseVideo": "Пауза",
    "playVideo": "Запустить",
    "releaseNote": "До премьеры · публичное скачивание пока недоступно.",
    "trustPrivacy": "Приватность прежде всего",
    "trustPrivacyCopy": "Локальная база, без автоматической отправки",
    "trustReports": "Практичные итоги",
    "trustReportsCopy": "Отчёты на основе сохранённых данных",
    "trustOffline": "Работает офлайн",
    "trustOfflineCopy": "Основные финансы всегда доступны",
    "trustLife": "Для реальной жизни",
    "trustLifeCopy": "Бюджеты, цели, работа и заметки",
    "featureExpenses": "Расходы",
    "featureExpensesCopy": "Транзакции и категории",
    "featureBudgets": "Бюджеты",
    "featureBudgetsCopy": "Лимиты и прогресс",
    "featureWork": "Работа и доход",
    "featureWorkCopy": "Часы и выплаты",
    "featureCalendar": "Календарь",
    "featureCalendarCopy": "Финансовые события",
    "featureReports": "Отчёты",
    "featureReportsCopy": "Тренды и прогнозы",
    "featureGoals": "Цели",
    "featureGoalsCopy": "План и прогресс",
    "clarityKicker": "Приложение",
    "clarityTitle": "Загляните в KOVA.",
    "clarityCopy": "Одна вымышленная пользовательница, три счёта и полгода повседневных финансов. Новые снимки без ретуши из работающей KOVA Offline V1 на эмуляторе Android. Настоящие функции с правдоподобными демонстрационными данными — без чужих личных финансов. Интерфейс на снимках — на польском.",
    "clarityAccounts": "Счета, транзакции и категории",
    "clarityReports": "Отчёты и прогнозы",
    "clarityWork": "Работа и доход",
    "clarityGoals": "Цели и капитал",
    "clarityCurrency": "Точность для разных валют",
    "clarityOffline": "Офлайн-доступ к основным данным",
    "exploreScreens": "Посмотреть экраны",
    "screenOverview": "Тёмная тема",
    "screenOverviewCopy": "Баланс и записанный расход",
    "screenFeatures": "Светлая тема",
    "screenFeaturesCopy": "Те же данные, другое оформление",
    "screenWork": "Локальные заметки",
    "screenWorkCopy": "Сохранение на устройстве · 21.10.2026",
    "securityKicker": "Приватность",
    "securityTitle": "Как KOVA защищает данные.",
    "securityCopy": "Основная финансовая база использует SQLCipher. Автоматической синхронизации с облаком нет. Защищайте телефон и регулярно экспортируйте данные — шифрование не заменяет копию и осторожность.",
    "securityModel": "О безопасности",
    "secureLocal": "Локальное шифрование",
    "secureOwner": "Изоляция данных",
    "secureOwnerCopy": "Записи привязаны к владельцу",
    "secureNoBank": "Без банковских паролей",
    "secureNoBankCopy": "KOVA не подключается к банку",
    "secureOnline": "Ручной экспорт",
    "secureOnlineCopy": "Частичная копия с защитой паролем",
    "legalKicker": "Документы",
    "legalTitle": "Правила KOVA.",
    "legalCopy": "Актуальные копии документов приложения. Политика и условия остаются черновиками, требующими утверждения перед публикацией.",
    "privacyTitle": "Политика конфиденциальности",
    "privacyCopy": "Локальные данные, экспорт и связь с поддержкой.",
    "termsTitle": "Условия использования",
    "termsCopy": "Возможности и правила продукта.",
    "cookiesTitle": "Cookies",
    "cookiesCopy": "Настройки и хранилище браузера.",
    "privacyShort": "Приватность",
    "termsShort": "Условия",
    "cookiesShort": "Cookies",
    "activeDevelopment": "Offline Free V1 · до выпуска.",
    "cookieSettings": "Настройки",
    "navFaq": "Вопросы",
    "navStatus": "Проект",
    "galleryHint": "Нажмите на экран, чтобы открыть его целиком.",
    "secureLocalCopy": "Зашифрованная база на устройстве",
    "projectKicker": "Первый выпуск",
    "projectHeading": "Бесплатно. Для телефона.",
    "projectCopy": "Локальные счета, транзакции, бюджеты, регулярные платежи, долги, цели, капитал, работа, отчёты, календарь, заметки и OCR. Облако, банковские API, AI, Wear OS, онлайн-Семья и котировки в реальном времени не входят в V1. Итоговые проверки и документы ещё готовятся.",
    "availability": "Доступность приложения",
    "roadmapLink": "Над чем мы работаем",
    "updatesLink": "Последние изменения",
    "faqKicker": "Полезно знать",
    "faqTitle": "Несколько простых ответов.",
    "faqCopy": "Прежде чем начать пользоваться KOVA.",
    "faqDownloadQ": "Можно ли уже скачать KOVA?",
    "faqDownloadA": "Публичное скачивание пока недоступно. Проверенная ссылка на магазин появится на странице статуса проекта после подготовки выпуска. Дата будет опубликована только после подтверждения.",
    "faqOfflineQ": "Работает ли приложение без интернета?",
    "faqOfflineA": "Да. V1 готовится как офлайн-приложение с локальным профилем. Вход через Google, синхронизация и AI-сервисы не предлагаются. Выбранный поставщик файлов, браузер или почтовое приложение могут использовать интернет независимо от KOVA.",
    "faqBankQ": "Нужно ли подключать банковский счёт?",
    "faqBankA": "Нет. KOVA не запрашивает пароли от банка. Счета в приложении помогают упорядочить финансовые данные, которые вы записываете.",
    "faqEstimateQ": "Гарантированы ли прогнозы и суммы нетто?",
    "faqEstimateA": "Нет. Это оценки на основе записанных данных и настроек. Они могут отличаться от фактических выплат и не заменяют документы работодателя или индивидуальную консультацию.",
    "faqWebsiteQ": "Есть ли у сайта доступ к моим финансам?",
    "faqWebsiteA": "Нет. Сайт рассказывает о проекте и не подключается к финансовой базе на телефоне. Необязательная аналитика сайта зависит от вашего согласия.",
    "altHome": "KOVA Offline V1: главный экран с вымышленной финансовой историей",
    "altProfile": "KOVA Offline V1: три локальных демонстрационных счёта",
    "altFeatures": "KOVA Free V1: светлая тема на эмуляторе",
    "altWork": "KOVA Offline V1: сохранённая тестовая заметка на эмуляторе",
    "previous": "Предыдущий экран",
    "next": "Следующий экран",
    "navigation": "Основная навигация",
    "pageTitle": "KOVA — финансы в одном месте",
    "faqFreeQ": "Будет ли KOVA бесплатной?",
    "faqFreeA": "Да. В Offline Free V1 нет рекламы, покупок, подписок и платных ограничений. Локальные функции не требуют регистрации или платного серверного сервиса.",
    "tourNote": "Настоящие экраны приложения · вымышленные данные · не видеозапись",
    "tourChapters": "Выберите экран презентации",
    "factAndroid": "Android 7.0+",
    "factOffline": "Локальные финансы",
    "factAccount": "Без онлайн-аккаунта",
    "faqBackupQ": "Как защитить данные и сменить телефон?",
    "faqBackupA": "Создайте ручной экспорт с паролем и храните его безопасно вне телефона. Импорт требует подтверждения и заменяет поддерживаемые данные выбранного профиля. Это частичная копия, не образ всей установки: встроенные изображения заметок включены, внешние вложения и фотографии чеков копируйте отдельно. Издатель не может восстановить данные из облака или вернуть пароль копии.",
    "faqOcrQ": "Работает ли сканирование чеков офлайн?",
    "faqOcrA": "OCR использует модель из состава приложения. Можно сделать фото или выбрать его из галереи через системный выбор Android. Распознавание может ошибаться — проверьте сумму, валюту и дату перед сохранением. Отказ в доступе к камере не блокирует выбор файла.",
    "faqDeviceQ": "Для каких устройств и пользователей создаётся KOVA?",
    "faqDeviceA": "Для телефонов с Android 7.0 и новее, с интерфейсом PL/EN/RU. Проверка совместимости продолжается. Планируемая аудитория — 13+, но это не утверждённый рейтинг Google Play и не подтверждение доступности во всех странах. Версии для часов и iOS не предлагаются."
  }
};

  const videoSlides = [
  {
    "id": "home",
    "image": "assets/screenshots/offline-demo-home.png",
    "title": {
      "pl": "Finanse na dziś",
      "en": "Your finances today",
      "ru": "Финансы сегодня"
    },
    "caption": {
      "pl": "Saldo, dochody i ostatnie wydatki",
      "en": "Balance, income and recent spending",
      "ru": "Баланс, доходы и последние расходы"
    },
    "copy": {
      "pl": "Zwykły ekran główny KOVA z lokalnymi danymi Marty — fikcyjnej użytkowniczki. Ta sama historia finansowa zasila wszystkie ekrany prezentacji.",
      "en": "KOVA’s real home screen with local records for Marta, a fictional user. The same financial history powers every screen in this tour.",
      "ru": "Настоящий главный экран KOVA с локальными данными Марты — вымышленной пользовательницы. Все экраны используют одну финансовую историю."
    }
  },
  {
    "id": "accounts",
    "image": "assets/screenshots/offline-demo-accounts.png",
    "title": {
      "pl": "Konta",
      "en": "Accounts",
      "ru": "Счета"
    },
    "caption": {
      "pl": "Konto osobiste, oszczędności i gotówka",
      "en": "Current account, savings and cash",
      "ru": "Основной счёт, сбережения и наличные"
    },
    "copy": {
      "pl": "Trzy lokalne konta porządkują codzienne finanse. Salda uwzględniają zakupy, wynagrodzenie i przelewy między własnymi kontami. Bez połączenia z bankiem.",
      "en": "Three local accounts organise everyday finances. Balances include purchases, salary and transfers between your own accounts. No bank connection.",
      "ru": "Три локальных счёта для повседневных финансов. Балансы учитывают покупки, зарплату и переводы между своими счетами. Без подключения к банку."
    }
  },
  {
    "id": "transactions",
    "image": "assets/screenshots/offline-demo-transactions.png",
    "title": {
      "pl": "Transakcje",
      "en": "Transactions",
      "ru": "Транзакции"
    },
    "caption": {
      "pl": "Pół roku codziennych zapisów",
      "en": "Six months of everyday records",
      "ru": "Полгода повседневных записей"
    },
    "copy": {
      "pl": "Zakupy spożywcze, kawa, transport, czynsz i wypłata. Różne kwoty i daty tworzą realistyczną historię, a nie listę identycznych transakcji.",
      "en": "Groceries, coffee, transport, rent and salary. Varied amounts and dates create a realistic history, not a list of identical transactions.",
      "ru": "Продукты, кофе, транспорт, аренда и зарплата. Разные суммы и даты создают правдоподобную историю, а не список одинаковых операций."
    }
  },
  {
    "id": "budgets",
    "image": "assets/screenshots/offline-demo-budgets.png",
    "title": {
      "pl": "Budżety i limity",
      "en": "Budgets and limits",
      "ru": "Бюджеты и лимиты"
    },
    "caption": {
      "pl": "Plan wydatków i bieżące wykorzystanie",
      "en": "Spending plans and current usage",
      "ru": "План расходов и его выполнение"
    },
    "copy": {
      "pl": "Miesięczne limity na jedzenie, rozrywkę i transport pomagają zestawić plan z zapisanymi wydatkami. Kwoty wynikają z tego samego demonstracyjnego profilu.",
      "en": "Monthly limits for food, entertainment and transport compare plans with recorded spending. Amounts come from the same demo profile.",
      "ru": "Месячные лимиты на еду, развлечения и транспорт позволяют сравнить план с записанными расходами. Суммы взяты из того же демонстрационного профиля."
    }
  },
  {
    "id": "recurring",
    "image": "assets/screenshots/offline-demo-recurring.png",
    "title": {
      "pl": "Stałe opłaty",
      "en": "Recurring payments",
      "ru": "Регулярные платежи"
    },
    "caption": {
      "pl": "Czynsz, internet, telefon i subskrypcje",
      "en": "Rent, internet, phone and subscriptions",
      "ru": "Аренда, интернет, телефон и подписки"
    },
    "copy": {
      "pl": "Powtarzające się rachunki mają własne terminy i historię rozliczeń. KOVA porządkuje zapisy — nie wykonuje przelewów ani nie pobiera pieniędzy.",
      "en": "Recurring bills have their own due dates and payment history. KOVA organises records; it does not transfer or collect money.",
      "ru": "У повторяющихся счетов есть сроки и история оплаты. KOVA упорядочивает записи — не переводит и не списывает деньги."
    }
  },
  {
    "id": "reports",
    "image": "assets/screenshots/offline-demo-reports.png",
    "title": {
      "pl": "Raporty",
      "en": "Reports",
      "ru": "Отчёты"
    },
    "caption": {
      "pl": "Podsumowania rzeczywistych zapisów",
      "en": "Summaries of recorded entries",
      "ru": "Сводки по сохранённым записям"
    },
    "copy": {
      "pl": "Wykresy i podsumowania są obliczane przez KOVA z lokalnych transakcji. Dane są fikcyjne, ale ekran i obliczenia pochodzą z działającej aplikacji.",
      "en": "Charts and summaries are calculated by KOVA from local transactions. The data is fictional, but the screen and calculations come from the running app.",
      "ru": "Графики и сводки KOVA рассчитывает по локальным транзакциям. Данные вымышлены, но экран и расчёты — из работающего приложения."
    }
  },
  {
    "id": "calendar",
    "image": "assets/screenshots/offline-demo-calendar.png",
    "title": {
      "pl": "Kalendarz finansowy",
      "en": "Financial calendar",
      "ru": "Финансовый календарь"
    },
    "caption": {
      "pl": "Wydarzenia i terminy w jednym widoku",
      "en": "Events and due dates in one view",
      "ru": "События и сроки в одном месте"
    },
    "copy": {
      "pl": "Zapisane operacje i terminy opłat na osi miesiąca. Wybierz dzień, żeby zobaczyć jego zdarzenia bez przeszukiwania całej historii.",
      "en": "Recorded transactions and bill dates across the month. Select a day to see its events without searching the entire history.",
      "ru": "Операции и сроки платежей в течение месяца. Выберите день, чтобы увидеть его события без поиска по всей истории."
    }
  },
  {
    "id": "notes",
    "image": "assets/screenshots/offline-demo-notes.png",
    "title": {
      "pl": "Notatki",
      "en": "Notes",
      "ru": "Заметки"
    },
    "caption": {
      "pl": "Plany, listy i codzienne sprawy",
      "en": "Plans, lists and everyday details",
      "ru": "Планы, списки и повседневные дела"
    },
    "copy": {
      "pl": "Plan poduszki finansowej i weekendowego wyjazdu zapisany lokalnie obok finansów. To treść demonstracyjna, nie cudze notatki ani dane użytkownika.",
      "en": "An emergency-fund plan and weekend trip notes stored locally alongside finances. This is demo content, not another person’s private notes.",
      "ru": "План финансовой подушки и поездки на выходные хранится локально рядом с финансами. Это демонстрация, не чужие личные заметки."
    }
  }
];

  const supported = Object.keys(dictionaries);
  const requested = new URLSearchParams(location.search).get('lang');
  let storedLanguage;
  try { storedLanguage = localStorage.getItem(LANGUAGE_KEY); } catch { /* Browsing still works with storage disabled. */ }
  let language = supported.includes(requested) ? requested : document.documentElement.dataset.staticLanguage || storedLanguage;
  if (!supported.includes(language)) language = navigator.language?.toLowerCase().startsWith('ru') ? 'ru' : navigator.language?.toLowerCase().startsWith('en') ? 'en' : 'pl';
  const copy = () => dictionaries[language];
  const isLocalOwner = location.protocol === 'file:' || ['localhost', '127.0.0.1', '::1'].includes(location.hostname);

  function applyLanguage() {
    document.documentElement.lang = language;
    document.querySelector('#site-language').value = language;
    document.querySelectorAll('[data-i18n]').forEach(node => { const value = copy()[node.dataset.i18n]; if (value) node.textContent = value; });
    document.querySelectorAll('[data-i18n-html]').forEach(node => { const value = copy()[node.dataset.i18nHtml]; if (value) node.innerHTML = value; });
    document.querySelectorAll('[data-i18n-alt]').forEach(node => { node.alt = copy()[node.dataset.i18nAlt]; });
    document.querySelectorAll('[data-screen-index]').forEach(figure => {
      const slide = videoSlides[Number(figure.dataset.screenIndex)];
      figure.querySelector('b').textContent = slide.title[language];
      figure.querySelector('figcaption span').textContent = slide.caption?.[language] || slide.copy[language];
      figure.querySelector('img').alt = `${slide.title[language]} — ${{pl:'fikcyjne dane demonstracyjne',en:'fictional demo data',ru:'вымышленные данные'}[language]}`;
    });
    document.querySelectorAll('[data-lightbox]').forEach(button => { button.setAttribute('aria-label', `${{pl:'Powiększ',en:'Enlarge',ru:'Увеличить'}[language]}: ${button.querySelector('img').alt}`); });
    document.querySelector('.topbar .brand').setAttribute('aria-label', copy().pageTitle);
    document.querySelector('.hero-showcase').setAttribute('aria-label', copy().navScreens);
    document.querySelector('.feature-strip').setAttribute('aria-label', copy().navFeatures);
    document.querySelector('.menu-button').setAttribute('aria-label', copy().openMenu);
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
  const videoChapters = document.querySelector('[data-video-chapters]');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let videoIndex = 0;
  let videoPlaying = false;
  let videoTimer;

  videoSlides.forEach((slide, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.videoChapter = String(index);
    button.addEventListener('click', () => {
      videoIndex = index;
      videoPlaying = false;
      renderVideoSlide();
      scheduleVideo();
    });
    videoChapters.append(button);
  });

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
    videoChapters.setAttribute('aria-label', copy().tourChapters);
    videoChapters.querySelectorAll('button').forEach((button, index) => {
      button.textContent = `${String(index + 1).padStart(2, '0')}  ${videoSlides[index].title[language]}`;
      button.setAttribute('aria-current', index === videoIndex ? 'step' : 'false');
    });
    if (videoDialog.open) videoChapters.querySelector('[aria-current="step"]').scrollIntoView({block:'nearest', inline:'nearest', behavior:reduceMotion ? 'instant' : 'smooth'});
    videoTitle.setAttribute('aria-live', videoPlaying ? 'off' : 'polite');
  }
  function scheduleVideo() {
    clearInterval(videoTimer);
    if (videoPlaying && videoDialog.open && !document.hidden) videoTimer = setInterval(() => {
      if (videoIndex === videoSlides.length - 1) { videoPlaying = false; clearInterval(videoTimer); }
      else videoIndex += 1;
      renderVideoSlide();
    }, 7000);
  }
  function changeVideo(direction) { videoIndex = (videoIndex + direction + videoSlides.length) % videoSlides.length; videoPlaying = false; renderVideoSlide(); scheduleVideo(); }
  document.querySelectorAll('[data-video-open]').forEach(button => button.addEventListener('click', () => { videoIndex = 0; videoPlaying = false; renderVideoSlide(); videoDialog.showModal(); scheduleVideo(); }));
  document.querySelector('[data-video-close]').addEventListener('click', () => { clearInterval(videoTimer); videoDialog.close(); });
  document.querySelector('[data-video-prev]').addEventListener('click', () => changeVideo(-1));
  document.querySelector('[data-video-next]').addEventListener('click', () => changeVideo(1));
  document.querySelector('[data-video-play]').addEventListener('click', () => {
    if (!videoPlaying && videoIndex === videoSlides.length - 1) videoIndex = 0;
    videoPlaying = !videoPlaying;
    renderVideoSlide();
    scheduleVideo();
  });
  videoDialog.addEventListener('click', event => { if (event.target === videoDialog) { clearInterval(videoTimer); videoDialog.close(); } });
  videoDialog.addEventListener('close', () => clearInterval(videoTimer));
  document.addEventListener('visibilitychange', scheduleVideo);
  videoDialog.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') changeVideo(event.key === 'ArrowLeft' ? -1 : 1);
    else { videoIndex = event.key === 'Home' ? 0 : videoSlides.length - 1; videoPlaying = false; renderVideoSlide(); scheduleVideo(); }
  });

  applyLanguage();
})();
