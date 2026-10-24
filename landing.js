(() => {
  'use strict';

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
    "heroKicker": "KOVA: Money & Budget · Android",
    "heroTitle": "Wydatki. Budżet.<br><em>Dochód z pracy.</em>",
    "heroCopy": "Pracujesz w zmiennych godzinach? Połącz wydatki, budżet i szacowany dochód w jednym planie. KOVA na Androida: darmowa baza i opcjonalne KOVA Premium.",
    "heroPrivacy": "Twoje dane finansowe zostają na telefonie.",
    "projectStatus": "Sprawdź stan projektu",
    "watchVideo": "Zobacz aplikację",
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
    "clarityCopy": "Prawdziwe ekrany KOVA z przykładowymi danymi. Zobacz codzienne finanse, budżety i lokalne narzędzia. Główna galeria pokazuje interfejs po polsku.",
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
    "securityTitle": "Prywatność jest dla nas najważniejsza.",
    "securityCopy": "Prywatność jest dla nas najważniejsza. Staramy się tworzyć KOVA jak najbezpieczniej, a dane finansowe zostają na telefonie. Opcjonalny zakup i przywracanie Premium obsługuje oddzielnie Google Play; analityka tej strony wymaga Twojej zgody.",
    "securityModel": "Czytaj o bezpieczeństwie",
    "secureLocal": "Szyfrowanie lokalne",
    "secureOwner": "Izolacja danych",
    "secureOwnerCopy": "Rekordy są przypisane do użytkownika",
    "secureNoBank": "Bez haseł bankowych",
    "secureNoBankCopy": "KOVA nie łączy się z bankiem",
    "secureOnline": "Twoje dane, Twoja decyzja",
    "secureOnlineCopy": "Ręczna kopia i eksport",
    "legalKicker": "Dokumenty",
    "legalTitle": "Zasady KOVA.",
    "legalCopy": "Zasady prywatności aplikacji i subskrypcji są projektami oczekującymi na końcowe zatwierdzenie. Strona ma osobne informacje o cookies i analityce.",
    "privacyTitle": "Polityka prywatności",
    "privacyCopy": "Lokalne finanse, zakupy Google Play i kontakt ze wsparciem.",
    "termsTitle": "Warunki korzystania",
    "termsCopy": "Darmowa baza, opcjonalne Premium i zasady subskrypcji.",
    "cookiesTitle": "Cookies",
    "cookiesCopy": "Ustawienia i pamięć przeglądarki.",
    "privacyShort": "Prywatność",
    "termsShort": "Warunki",
    "cookiesShort": "Cookies",
    "activeDevelopment": "Darmowa baza + opcjonalne Premium · przed premierą",
    "cookieSettings": "Ustawienia",
    "navFaq": "FAQ",
    "navStatus": "Projekt",
    "galleryHint": "Dotknij ekranu, aby zobaczyć go w całości.",
    "secureLocalCopy": "Szyfrowana baza na urządzeniu",
    "projectKicker": "Pierwsze wydanie",
    "projectHeading": "Darmowa baza. Więcej z Premium.",
    "projectCopy": "KOVA: Money & Budget powstaje na Androida z darmową bazą i opcjonalnym Premium. Publiczne pobieranie i sprzedaż nie są jeszcze dostępne.",
    "availability": "Dostępność aplikacji",
    "roadmapLink": "Nad czym pracujemy",
    "updatesLink": "Ostatnie zmiany",
    "faqKicker": "Warto wiedzieć",
    "faqTitle": "Kilka prostych odpowiedzi.",
    "faqCopy": "Zanim zaczniesz korzystać z KOVA.",
    "faqDownloadQ": "Czy mogę już pobrać KOVA?",
    "faqDownloadA": "Publiczne pobieranie nie jest jeszcze dostępne. Obserwuj KOVA na Instagramie, aby śledzić wieści o premierze. Gdy wydanie będzie dostępne, na stronie pojawi się potwierdzony link do Google Play. Nie ogłosiliśmy daty premiery.",
    "faqOfflineQ": "Czy aplikacja działa bez internetu?",
    "faqOfflineA": "Dane finansowe i darmowa baza działają lokalnie. Opcjonalny zakup, przywracanie i odświeżanie dostępu Premium korzystają z Google Play i wymagają połączenia. Obecny dostęp Premium może wymagać ponownego sprawdzenia po maksymalnie 48 godzinach lub restarcie telefonu. Nie usuwa to danych ani nie blokuje podstawowego użycia i eksportu. Nie oferujemy synchronizacji finansów w chmurze ani połączenia z bankiem.",
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
    "faqFreeA": "Tak. Pierwsze wydanie planujemy z darmową bazą i opcjonalnym KOVA Premium. Codzienne zapisy, podstawowe raporty, dostęp do danych, lokalne szyfrowanie, kopia, eksport i usuwanie pozostają darmowe. Premium obejmuje zaawansowane raporty, prognozy i analizy dochodu z pracy. Cenę podamy przed premierą; publiczna sprzedaż jeszcze nie ruszyła.",
    "tourNote": "Prawdziwe ekrany aplikacji · fikcyjne dane demonstracyjne · nie nagranie wideo",
    "tourChapters": "Wybierz ekran prezentacji",
    "factAndroid": "Android 7.0+",
    "factOffline": "Darmowa baza",
    "factAccount": "Opcjonalne Premium",
    "faqBackupQ": "Jak zabezpieczyć dane i zmienić telefon?",
    "faqBackupA": "Utwórz ręczny eksport chroniony hasłem i przechowuj go bezpiecznie poza telefonem. Import wymaga potwierdzenia i zastępuje obsługiwany zakres wybranego profilu. To częściowa kopia, nie obraz całej aplikacji: osadzone obrazy notatek są uwzględnione, ale zewnętrzne załączniki i zdjęcia paragonów trzeba zabezpieczyć osobno. Nie ma automatycznego odzyskiwania z chmury ani hasła przez wydawcę.",
    "faqOcrQ": "Czy skanowanie paragonów działa offline?",
    "faqOcrA": "OCR używa modelu dołączonego do aplikacji. Możesz zrobić zdjęcie lub wybrać je z galerii przez selektor Androida. Rozpoznawanie może się pomylić — przed zapisem sprawdź kwotę, walutę i datę. Odmowa dostępu do aparatu nie blokuje wyboru pliku.",
    "faqDeviceQ": "Na jakie urządzenia i dla kogo powstaje KOVA?",
    "faqDeviceA": "KOVA powstaje na telefony z Androidem 7.0 lub nowszym. Aktualne źródła zawierają 27 języków interfejsu; weryfikacja zgodności i tłumaczeń trwa. Planowana grupa to osoby 13+, z uwzględnieniem wymagań sklepu i lokalnego prawa. Nie oferujemy wersji na iOS ani zegarki.",
    "aboutKicker": "Czym jest KOVA?",
    "aboutTitle": "Mniej chaosu w finansach. Więcej miejsca na Twoje plany.",
    "aboutCopy": "KOVA to aplikacja na Androida do codziennych finansów osobistych. Łączy wydatki, budżet i godziny pracy, żeby łatwiej zobaczyć, co zostaje po rachunkach, i zaplanować kolejny miesiąc.",
    "aboutAudience": "Dla studentów, osób pracujących i wszystkich, którzy chcą świadomie zarządzać własnymi pieniędzmi.",
    "aboutForWhom": "Dla Ciebie, jeśli…",
    "aboutSpendingTitle": "Wiesz, na co wydajesz",
    "aboutSpendingCopy": "Zapisuj codzienne wydatki i przeglądaj je według kategorii. Zobacz, które koszty najbardziej wpływają na Twój miesiąc.",
    "aboutGoalsTitle": "Widzisz, ile zostało w budżecie",
    "aboutGoalsCopy": "Ustal limity kategorii i sprawdzaj postęp podczas wydawania. Zaplanuj kolejny zakup, wiedząc, ile jeszcze możesz przeznaczyć na daną kategorię.",
    "aboutIncomeTitle": "Planujesz przy zmiennym dochodzie",
    "aboutIncomeCopy": "Zapisuj godziny pracy i stawki, aby szacować zarobki. Połącz swój grafik i miesięczny budżet w jednym planie.",
    "aboutPrivacy": "Dane finansowe zostają na telefonie. Bez podłączania banku i konta w chmurze KOVA. Opcjonalne zakupy Premium obsługuje oddzielnie Google Play.",
    "aboutAction": "Zobacz KOVA w praktyce",
    "followLaunch": "Obserwuj KOVA na Instagramie",
    "downloadApp": "Pobierz z Google Play",
    "launchChannel": "Wieści o premierze na Instagramie · @kova_money",
    "workScreenNote": "Praca i dochód · wcześniejszy ekran demonstracyjny; wygląd może się zmienić.",
    "plansKicker": "Planowane na pierwsze wydanie",
    "plansTitle": "Darmowa baza. Więcej z Premium.",
    "plansCopy": "Zacznij od codziennego porządkowania pieniędzy. Wybierz Premium, jeśli potrzebujesz dokładniejszych analiz lokalnych. Publiczne pobieranie i sprzedaż nie są jeszcze dostępne.",
    "planFreeTitle": "KOVA Free",
    "planFreeCopy": "Codzienne zapisy i kontrola nad własnymi danymi.",
    "planFreeOne": "Wydatki, budżety i podstawowe raporty",
    "planFreeTwo": "Zapisy pracy i dostęp do swoich danych",
    "planFreeThree": "Szyfrowanie lokalne, kopia, eksport i usuwanie",
    "planPremiumTitle": "KOVA Premium",
    "planPremiumCopy": "Opcjonalna subskrypcja dla dokładniejszego obrazu finansów.",
    "planPremiumOne": "Zaawansowane raporty i porównania",
    "planPremiumTwo": "Prognozy oparte na Twoich zapisach",
    "planPremiumThree": "Analizy dochodu z pracy",
    "plansNote": "Cenę i dostępność podamy przed premierą. Niektóre analizy wymagają odpowiedniej historii danych. Zakup i odświeżenie dostępu Premium wymagają Google Play oraz połączenia; darmowa baza pozostaje dostępna.",
    "plansDetails": "Przeczytaj projekt zasad subskrypcji",
    "closingKicker": "Bądź blisko premiery",
    "closingTitle": "Zrób miejsce na spokojniejszy plan finansów.",
    "closingCopy": "Obserwuj KOVA Development na Instagramie: zobacz aplikację i śledź wieści o premierze. Pierwsze publiczne wydanie nadal przygotowujemy.",
    "closingSecondary": "KOVA znajdziesz też na TikToku.",
    "forecastNote": "W obecnej wersji szacowanie zmiennych wydatków wymaga co najmniej 7 dni obserwacji i 2 zapisów wydatków. Więcej regularnych zapisów daje pełniejszy obraz. Prognoza pozostaje szacunkiem."
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
    "heroKicker": "KOVA: Money & Budget · Android",
    "heroTitle": "Spending. Budget.<br><em>Work income.</em>",
    "heroCopy": "Work hours change from month to month? Bring spending, budgets and estimated income into one plan. KOVA for Android: a free base and optional KOVA Premium.",
    "heroPrivacy": "Your financial data stays on your phone.",
    "projectStatus": "Check project status",
    "watchVideo": "See the app",
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
    "clarityCopy": "Real KOVA screens with fictional demo data. Explore everyday finances, budgets and local tools. The main gallery shows the Polish interface.",
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
    "securityTitle": "Privacy is our top priority.",
    "securityCopy": "Privacy comes first as we work to make KOVA as secure as possible. Financial records stay on your phone. Optional Premium purchase and restore use Google Play separately; this website’s analytics requires your consent.",
    "securityModel": "Read about security",
    "secureLocal": "Local encryption",
    "secureOwner": "Data isolation",
    "secureOwnerCopy": "Records are assigned to their owner",
    "secureNoBank": "No bank passwords",
    "secureNoBankCopy": "KOVA does not connect to your bank",
    "secureOnline": "Your data, your choice",
    "secureOnlineCopy": "Manual backup and export",
    "legalKicker": "Documents",
    "legalTitle": "KOVA policies.",
    "legalCopy": "App privacy and subscription terms are drafts awaiting final approval. The website has separate cookie and analytics information.",
    "privacyTitle": "Privacy Policy",
    "privacyCopy": "Local finances, Google Play purchases and support.",
    "termsTitle": "Terms of Use",
    "termsCopy": "Free base, optional Premium and subscription conditions.",
    "cookiesTitle": "Cookies",
    "cookiesCopy": "Browser settings and storage.",
    "privacyShort": "Privacy",
    "termsShort": "Terms",
    "cookiesShort": "Cookies",
    "activeDevelopment": "Free base + optional Premium · before launch",
    "cookieSettings": "Settings",
    "navFaq": "FAQ",
    "navStatus": "Project",
    "galleryHint": "Tap a screen to see the full image.",
    "secureLocalCopy": "Encrypted database on your device",
    "projectKicker": "The first release",
    "projectHeading": "A free base. More with Premium.",
    "projectCopy": "KOVA: Money & Budget is coming to Android with a free base and optional Premium. Public downloads and sales are not available yet.",
    "availability": "App availability",
    "roadmapLink": "What we’re working on",
    "updatesLink": "Recent updates",
    "faqKicker": "Good to know",
    "faqTitle": "A few simple answers.",
    "faqCopy": "Before you start using KOVA.",
    "faqDownloadQ": "Can I download KOVA yet?",
    "faqDownloadA": "Public downloads are not available yet. Follow KOVA on Instagram for launch news. This page will link to the confirmed Google Play listing when the release is available. No launch date has been announced.",
    "faqOfflineQ": "Does the app work without internet?",
    "faqOfflineA": "Financial records and the Free base work locally. Optional Premium purchase, restore and access refresh use Google Play and need connectivity. Current Premium access may require a new connected check after up to 48 hours or a phone restart. This does not delete your records or block basic use and export. No financial cloud sync or bank connection is offered.",
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
    "faqFreeA": "Yes. The first release is planned with a free base and optional KOVA Premium. Everyday recording, basic reports, access to your records, local encryption, backup, export and deletion remain Free. Premium covers advanced reports, forecasts and work-income analytics. Price will be announced before launch; there is no public sale yet.",
    "tourNote": "Real app screens · fictional demo data · not a video recording",
    "tourChapters": "Choose a tour screen",
    "factAndroid": "Android 7.0+",
    "factOffline": "Free base",
    "factAccount": "Optional Premium",
    "faqBackupQ": "How do I protect my data or change phones?",
    "faqBackupA": "Create a password-protected manual export and store it safely outside your phone. Import requires confirmation and replaces the supported data of the selected profile. It is a partial copy, not a full app image: embedded note images are included, but external attachments and receipt photos need separate copies. The publisher cannot restore data from the cloud or recover your backup password.",
    "faqOcrQ": "Does receipt scanning work offline?",
    "faqOcrA": "OCR uses a model bundled with the app. Take a photo or choose one from your gallery through the Android picker. Recognition can be wrong — check the amount, currency, and date before saving. Denying camera access does not block file selection.",
    "faqDeviceQ": "Which devices and audience is KOVA for?",
    "faqDeviceA": "KOVA is being prepared for Android phones running Android 7.0 or later. The current source includes 27 interface languages; compatibility and language review are ongoing. Intended for ages 13+, subject to store and local requirements. No iOS or watch release is offered.",
    "aboutKicker": "What is KOVA?",
    "aboutTitle": "Less money stress. More room for your plans.",
    "aboutCopy": "KOVA is an Android app for everyday personal finances. Keep expenses, budgets and work hours together, so you can see what is left after bills and plan the month ahead.",
    "aboutAudience": "For students, working people and anyone who wants to make more intentional decisions about their own money.",
    "aboutForWhom": "For you, if…",
    "aboutSpendingTitle": "See where your money goes",
    "aboutSpendingCopy": "Record everyday spending and find it by category. Understand which costs make the biggest difference to your month.",
    "aboutGoalsTitle": "Know what is left in your budget",
    "aboutGoalsCopy": "Set category limits and check progress as you spend. Plan the next purchase with a clearer view of what remains.",
    "aboutIncomeTitle": "Plan around changing income",
    "aboutIncomeCopy": "Record work hours and rates to estimate earnings. Bring your work schedule and monthly budget into one plan.",
    "aboutPrivacy": "Financial records stay on your phone. No bank connection or KOVA cloud account. Optional Premium purchases are handled separately through Google Play.",
    "aboutAction": "See KOVA in action",
    "followLaunch": "Follow KOVA on Instagram",
    "downloadApp": "Get it on Google Play",
    "launchChannel": "Launch news on Instagram · @kova_money",
    "workScreenNote": "Work & income · earlier demo screen; the design may change.",
    "plansKicker": "Planned for the first release",
    "plansTitle": "A free base. More with Premium.",
    "plansCopy": "Start with everyday money management. Choose Premium if you need deeper local analysis. Public downloads and sales are not available yet.",
    "planFreeTitle": "KOVA Free",
    "planFreeCopy": "Everyday recording and control of your own data.",
    "planFreeOne": "Expenses, budgets and basic reports",
    "planFreeTwo": "Work records and access to saved data",
    "planFreeThree": "Local encryption, backup, export and deletion",
    "planPremiumTitle": "KOVA Premium",
    "planPremiumCopy": "An optional subscription for more detailed local insight.",
    "planPremiumOne": "Advanced reports and comparisons",
    "planPremiumTwo": "Forecasts based on your records",
    "planPremiumThree": "Work-income analytics",
    "plansNote": "Price and launch availability will be announced before release. Some analyses need sufficient history. Premium purchases and access refresh require Google Play and connectivity; the Free base remains available.",
    "plansDetails": "Read the subscription draft",
    "closingKicker": "Stay close to the launch",
    "closingTitle": "Make room for a clearer money plan.",
    "closingCopy": "Follow KOVA Development on Instagram for app previews and launch news. The first public release is still in preparation.",
    "closingSecondary": "You can also find KOVA on TikTok.",
    "forecastNote": "In the current version, estimating variable spending needs at least 7 days of observation and 2 expense records. More regular records give a fuller picture. A forecast remains an estimate."
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
    "heroKicker": "KOVA: Money & Budget · Android",
    "heroTitle": "Расходы. Бюджет.<br><em>Доход от работы.</em>",
    "heroCopy": "Работаете по меняющемуся графику? Объедините расходы, бюджет и ожидаемый доход в одном плане. KOVA для Android: бесплатные основные функции и необязательная подписка KOVA Premium.",
    "heroPrivacy": "Ваши финансовые данные остаются на телефоне.",
    "projectStatus": "Статус проекта",
    "watchVideo": "Посмотреть приложение",
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
    "clarityCopy": "Настоящие экраны KOVA с вымышленными демонстрационными данными. Посмотрите, как устроены повседневные записи, бюджеты и инструменты на устройстве. Основная галерея показывает интерфейс на польском языке.",
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
    "securityTitle": "Приватность для нас важнее всего.",
    "securityCopy": "Приватность для нас важнее всего. Мы стараемся сделать KOVA максимально безопасной, а финансовые данные остаются на телефоне. Необязательные покупки и восстановление Premium обрабатывает Google Play; аналитика этого сайта работает только с вашего согласия.",
    "securityModel": "О безопасности",
    "secureLocal": "Локальное шифрование",
    "secureOwner": "Изоляция данных",
    "secureOwnerCopy": "Записи привязаны к владельцу",
    "secureNoBank": "Без банковских паролей",
    "secureNoBankCopy": "KOVA не подключается к банку",
    "secureOnline": "Ваши данные, ваш выбор",
    "secureOnlineCopy": "Ручное резервное копирование и экспорт",
    "legalKicker": "Документы",
    "legalTitle": "Правила KOVA.",
    "legalCopy": "Политика конфиденциальности приложения и условия подписки пока остаются проектами и ожидают окончательного утверждения. Информация о cookies и аналитике сайта приведена отдельно.",
    "privacyTitle": "Политика конфиденциальности",
    "privacyCopy": "Финансы на телефоне, покупки через Google Play и обращение в поддержку.",
    "termsTitle": "Условия использования",
    "termsCopy": "Бесплатные основные функции, необязательный Premium и условия подписки.",
    "cookiesTitle": "Cookies",
    "cookiesCopy": "Настройки и хранилище браузера.",
    "privacyShort": "Приватность",
    "termsShort": "Условия",
    "cookiesShort": "Cookies",
    "activeDevelopment": "Бесплатные основные функции + необязательный Premium · до выпуска",
    "cookieSettings": "Настройки",
    "navFaq": "Вопросы",
    "navStatus": "Проект",
    "galleryHint": "Нажмите на экран, чтобы открыть его целиком.",
    "secureLocalCopy": "Зашифрованная база на устройстве",
    "projectKicker": "Первый выпуск",
    "projectHeading": "Бесплатная база. Больше с Premium.",
    "projectCopy": "KOVA: Money & Budget готовится к выпуску на Android с бесплатными основными функциями и необязательным Premium. Публичное скачивание и продажи пока недоступны.",
    "availability": "Доступность приложения",
    "roadmapLink": "Над чем мы работаем",
    "updatesLink": "Последние изменения",
    "faqKicker": "Полезно знать",
    "faqTitle": "Несколько простых ответов.",
    "faqCopy": "Прежде чем начать пользоваться KOVA.",
    "faqDownloadQ": "Можно ли уже скачать KOVA?",
    "faqDownloadA": "Публичное скачивание пока недоступно. Подпишитесь на KOVA в Instagram, чтобы следить за новостями. После выпуска здесь появится подтверждённая ссылка на Google Play. Дату выпуска мы ещё не объявили.",
    "faqOfflineQ": "Работает ли приложение без интернета?",
    "faqOfflineA": "Финансовые данные и бесплатные основные функции работают на устройстве. Для покупки, восстановления и обновления доступа Premium нужны Google Play и интернет. В текущей версии повторная проверка может понадобиться не позднее чем через 48 часов или после перезагрузки телефона. Ваши записи сохраняются, а основные функции и экспорт остаются доступными. Синхронизации финансовых данных с облаком и подключения к банкам нет.",
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
    "faqFreeA": "Да. Первое издание планируется с бесплатными основными функциями и необязательной подпиской KOVA Premium. Повседневные записи, базовые отчёты, доступ к данным, локальное шифрование, резервное копирование, экспорт и удаление остаются бесплатными. Premium добавляет расширенные отчёты, прогнозы и анализ дохода от работы. Цену объявим до выпуска; публичные продажи пока не начались.",
    "tourNote": "Настоящие экраны приложения · вымышленные данные · не видеозапись",
    "tourChapters": "Выберите экран презентации",
    "factAndroid": "Android 7.0+",
    "factOffline": "Бесплатная база",
    "factAccount": "Дополнительно Premium",
    "faqBackupQ": "Как защитить данные и сменить телефон?",
    "faqBackupA": "Создайте ручной экспорт с паролем и храните его безопасно вне телефона. Импорт требует подтверждения и заменяет поддерживаемые данные выбранного профиля. Это частичная копия, не образ всей установки: встроенные изображения заметок включены, внешние вложения и фотографии чеков копируйте отдельно. Издатель не может восстановить данные из облака или вернуть пароль копии.",
    "faqOcrQ": "Работает ли сканирование чеков офлайн?",
    "faqOcrA": "OCR использует модель из состава приложения. Можно сделать фото или выбрать его из галереи через системный выбор Android. Распознавание может ошибаться — проверьте сумму, валюту и дату перед сохранением. Отказ в доступе к камере не блокирует выбор файла.",
    "faqDeviceQ": "Для каких устройств и пользователей создаётся KOVA?",
    "faqDeviceA": "KOVA готовится для телефонов Android под управлением Android 7.0 или более поздней версии. Текущий исходный код включает 27 языков интерфейса; совместимость и языковая проверка продолжаются. Предназначено для детей старше 13 лет с учетом требований магазина и местных условий. Никакой версии для iOS или часов не предлагается.",
    "aboutKicker": "Что такое KOVA?",
    "aboutTitle": "Меньше хаоса в финансах. Больше места для ваших планов.",
    "aboutCopy": "KOVA — приложение для личных финансов на Android. Оно объединяет расходы, бюджет и учёт рабочего времени, чтобы было проще понять, сколько остаётся после оплаты счетов, и спланировать следующий месяц.",
    "aboutAudience": "Для студентов, работающих людей и всех, кто хочет осознанно распоряжаться своими деньгами.",
    "aboutForWhom": "Для вас, если…",
    "aboutSpendingTitle": "Посмотрите, куда идут ваши деньги",
    "aboutSpendingCopy": "Записывайте повседневные расходы и просматривайте их по категориям. Узнайте, какие траты сильнее всего влияют на ваш месячный бюджет.",
    "aboutGoalsTitle": "Видите, сколько осталось в бюджете",
    "aboutGoalsCopy": "Задавайте лимиты по категориям и следите за расходами. Планируйте следующую покупку, зная, сколько ещё можно потратить.",
    "aboutIncomeTitle": "Планируете при переменном доходе",
    "aboutIncomeCopy": "Записывайте рабочие часы и ставки, чтобы оценивать заработок. Объедините рабочий график и месячный бюджет в одном плане.",
    "aboutPrivacy": "Финансовые данные остаются на телефоне. Подключение к банку и облачный аккаунт KOVA не нужны. Необязательные покупки Premium отдельно обрабатывает Google Play.",
    "aboutAction": "Посмотреть KOVA в действии",
    "followLaunch": "Подписаться на KOVA в Instagram",
    "downloadApp": "Скачать в Google Play",
    "launchChannel": "Новости о выпуске в Instagram · @kova_money",
    "workScreenNote": "Работа и доход · более ранний демонстрационный экран; дизайн может измениться.",
    "plansKicker": "Планируется к первому выпуску",
    "plansTitle": "Бесплатная база. Больше с Premium.",
    "plansCopy": "Начните с повседневного учёта денег. Premium подойдёт, если вам нужен более подробный анализ на устройстве. Публичное скачивание и продажи пока недоступны.",
    "planFreeTitle": "KOVA Free",
    "planFreeCopy": "Ежедневная запись и контроль собственных данных.",
    "planFreeOne": "Расходы, бюджеты и базовые отчеты",
    "planFreeTwo": "Записи о работе и доступ к сохраненным данным",
    "planFreeThree": "Локальное шифрование, резервное копирование, экспорт и удаление",
    "planPremiumTitle": "KOVA Premium",
    "planPremiumCopy": "Необязательная подписка для более подробного анализа личных финансов.",
    "planPremiumOne": "Расширенные отчеты и сравнения",
    "planPremiumTwo": "Прогнозы на основе ваших записей",
    "planPremiumThree": "Аналитика доходов от работы",
    "plansNote": "Цену и доступность объявим до выпуска. Некоторым видам анализа нужна более длительная история записей. Для покупки и обновления доступа Premium нужны Google Play и интернет; бесплатные основные функции остаются доступными.",
    "plansDetails": "Прочитать проект условий подписки",
    "closingKicker": "Следите за новостями о выпуске",
    "closingTitle": "Планируйте свои финансы спокойнее.",
    "closingCopy": "Подписывайтесь на KOVA Development в Instagram: смотрите приложение и следите за новостями о выпуске. Первый публичный релиз ещё готовится.",
    "closingSecondary": "Вы также можете найти KOVA на TikTok.",
    "forecastNote": "В текущей версии для оценки переменных расходов нужны как минимум 7 дней наблюдений и 2 записи о расходах. Регулярные записи дают более полную картину. Прогноз остаётся оценкой."
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

  for (const [code, data] of Object.entries(window.KOVA_TRANSLATIONS || {})) {
    dictionaries[code] = data.home;
    videoSlides.forEach((slide,index) => { for (const key of ['title','caption','copy']) slide[key][code] = data.slides[index][key]; });
  }
  window.addEventListener?.('kova:locale-loaded', ({detail:{code,data}}) => { dictionaries[code]=data.home; videoSlides.forEach((slide,index)=>{for(const key of ['title','caption','copy'])slide[key][code]=data.slides[index][key];}); });
  const supported = window.KOVA_LANGUAGES?.codes || Object.keys(dictionaries);
  let language = window.KOVA_LANGUAGES.initial();
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
      figure.querySelector('img').alt = `${slide.title[language]} — ${(window.KOVA_TRANSLATIONS?.[language]?.extra.demo || {pl:'fikcyjne dane demonstracyjne',en:'fictional demo data',ru:'вымышленные данные'}[language])}`;
    });
    document.querySelectorAll('[data-lightbox]').forEach(button => { button.setAttribute('aria-label', `${(window.KOVA_TRANSLATIONS?.[language]?.extra.enlarge || {pl:'Powiększ',en:'Enlarge',ru:'Увеличить'}[language])}: ${button.querySelector('img').alt}`); });
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
    const url = new URL(location.href); url.searchParams.set('lang', language); history.replaceState(null, '', url);
    renderVideoSlide();
  }

  document.querySelectorAll('[data-local-workspace]').forEach(node => { node.hidden = !isLocalOwner; });
  document.querySelector('#site-language').addEventListener('change', event => { language = event.target.value; applyLanguage(); });

  const lightbox = document.querySelector('.lightbox');
  const lightboxImage = lightbox.querySelector('img');
  const galleryButtons = [...document.querySelectorAll('[data-lightbox]')];
  let lightboxIndex=0,lightboxOpener;
  function showLightbox(index){
    lightboxIndex=(index+galleryButtons.length)%galleryButtons.length;
    const button=galleryButtons[lightboxIndex];
    lightboxImage.src=button.dataset.lightbox;lightboxImage.alt=button.querySelector('img').alt;
    lightbox.querySelector('[data-lightbox-counter]').textContent=`${lightboxIndex+1} / ${galleryButtons.length}`;
    lightbox.querySelector('[data-lightbox-prev]').setAttribute('aria-label',copy().previous);
    lightbox.querySelector('[data-lightbox-next]').setAttribute('aria-label',copy().next);
  }
  galleryButtons.forEach((button,index) => button.addEventListener('click', () => {lightboxOpener=button;showLightbox(index);lightbox.showModal();}));
  lightbox.querySelector('button').addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', event => { if (event.target === lightbox) lightbox.close(); });
  lightbox.querySelector('[data-lightbox-prev]').addEventListener('click',()=>showLightbox(lightboxIndex-1));
  lightbox.querySelector('[data-lightbox-next]').addEventListener('click',()=>showLightbox(lightboxIndex+1));
  lightbox.addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();showLightbox(event.key==='Home'?0:event.key==='End'?galleryButtons.length-1:lightboxIndex+(event.key==='ArrowLeft'?-1:1));});
  lightbox.addEventListener('close',()=>lightboxOpener?.focus({preventScroll:true}));

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
    if (videoDialog.open) videoImage.src = slide.image;
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
  document.querySelectorAll('[data-video-open]').forEach(button => button.addEventListener('click', () => { videoIndex = 0; videoPlaying = false; videoDialog.showModal(); renderVideoSlide(); scheduleVideo(); }));
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
