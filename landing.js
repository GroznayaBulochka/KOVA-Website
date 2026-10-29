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
    "heroKicker": "KOVA: Money & Budget · Android · Beta",
    "heroTitle": "Wydatki. Budżet.<br><em>Dochód z pracy.</em>",
    "heroCopy": "KOVA pomaga uporządkować codzienne finanse: zapisuj wydatki, planuj budżet i sprawdzaj, ile zostaje na Twoje cele. Pracujesz na godziny? Połącz czas pracy z szacowanym dochodem i zobacz cały miesiąc w jednym miejscu.",
    "heroPrivacy": "Twoje finanse to Twoja sprawa. Dbamy o to, by dane finansowe zostawały u Ciebie, na Twoim telefonie, i nie trafiały do osób trzecich.",
    "projectStatus": "Sprawdź stan projektu",
    "watchVideo": "Zobacz aplikację",
    "pauseVideo": "Pauza",
    "playVideo": "Odtwórz",
    "releaseNote": "Beta · Przed premierą · publiczne pobieranie jeszcze niedostępne.",
    "trustPrivacy": "Prywatność przede wszystkim",
    "trustPrivacyCopy": "Lokalna baza, bez automatycznego uploadu",
    "trustReports": "Praktyczne podsumowania",
    "trustReportsCopy": "Raporty oparte na zapisanych danych",
    "trustOffline": "Działa offline",
    "trustOfflineCopy": "Podstawowe finanse pozostają dostępne",
    "trustLife": "Zbudowana do życia",
    "trustLifeCopy": "Budżet, cele, praca i notatki",
    "featureExpenses": "Wydatki",
    "featureExpensesCopy": "Zapisuj wydatki, przypisuj je do kategorii i sprawdzaj, na co idą Twoje pieniądze.",
    "featureBudgets": "Budżety",
    "featureBudgetsCopy": "Ustal limity wydatków i na bieżąco sprawdzaj, ile możesz jeszcze wydać.",
    "featureWork": "Praca i dochód",
    "featureWorkCopy": "Pro · Zliczaj godziny pracy, szacuj dochód i uwzględniaj go w swoim budżecie.",
    "featureCalendar": "Kalendarz",
    "featureCalendarCopy": "Pro · Zbierz terminy rachunków, wpływów i innych zdarzeń finansowych w jednym kalendarzu.",
    "featureReports": "Raporty",
    "featureReportsCopy": "Pro · Porównuj przychody i wydatki, poznawaj trendy i sprawdzaj prognozy oparte na Twoich zapisach.",
    "featureGoals": "Cele",
    "featureGoalsCopy": "Wyznacz cel oszczędzania, określ potrzebną kwotę i śledź postęp w jego realizacji.",
    "clarityKicker": "Aplikacja",
    "clarityTitle": "Zajrzyj do KOVA.",
    "clarityCopy": "Prawdziwe ekrany KOVA z przykładowymi danymi. Zobacz, jak zapisujesz wydatki, planujesz budżet i porządkujesz codzienne finanse.",
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
    "screenWorkCopy": "Interfejs aplikacji po angielsku · 2026-10-29",
    "securityKicker": "Prywatność",
    "securityTitle": "Prywatność jest dla nas najważniejsza.",
    "securityCopy": "Twoje dane finansowe pozostają na tym urządzeniu. Nie potrzebujesz konta KOVA w chmurze, rejestracji ani synchronizacji finansów z chmurą. Zakupy sprawdzamy przez Google Play, bez serwera KOVA. Dostęp offline może działać do 48 godzin po sprawdzeniu z połączeniem. Restart telefonu lub istotna zmiana zegara wymaga ponownego sprawdzenia. Aplikacja nie zna dokładnej daty końca subskrypcji; sprawdzisz ją w Google Play.",
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
    "altHome": "KOVA: Finanse na dziś — fikcyjne dane demonstracyjne. Interfejs aplikacji po angielsku",
    "altProfile": "KOVA: Konta — fikcyjne dane demonstracyjne. Interfejs aplikacji po angielsku",
    "altFeatures": "KOVA: Finanse na dziś — fikcyjne dane demonstracyjne. Interfejs aplikacji po angielsku",
    "altWork": "KOVA: Praca i dochód · Pro — Interfejs aplikacji po angielsku · Pro · 2026-10-29",
    "previous": "Poprzedni ekran",
    "next": "Następny ekran",
    "navigation": "Nawigacja główna",
    "pageTitle": "KOVA — finanse w jednym miejscu",
    "faqFreeQ": "Czy KOVA będzie bezpłatna?",
    "faqFreeA": "KOVA Premium. Planer życia · Pro. Historia cen · Pro. Premium obejmuje Work & Income, Kalendarz finansowy, wszystkie raporty, skanowanie paragonów, Centrum podatkowe i Vault. Podstawowa ewidencja finansów, Notatki, szyfrowanie, backup, przywracanie i eksport danych pozostają bezpłatne. Zapisane dane pozostają dostępne. Nowe operacje w tym module wymagają Premium. Backup i eksport pozostają bezpłatne. Okres próbny można rozpocząć wyłącznie po potwierdzeniu w Google Play udostępnionej Ci oferty. 30 dni za darmo, potem cena pokazana w Google Play przed zakupem (Opłata co miesiąc / Opłata raz w roku). Subskrypcja odnawia się automatycznie, jeśli nie anulujesz jej przed końcem okresu próbnego. Dostępność określa Google Play. Kwalifikację do okresu próbnego określa Google Play, nie lokalny licznik instalacji ani backup finansów. Reinstalacja KOVA nie resetuje historii triala na tym samym koncie Play. Nie gwarantuje to jednego triala na osobę korzystającą z różnych kont. Podstawowe Free i dostęp do zapisanych finansów nie wymagają rozpoczęcia triala.",
    "tourNote": "Prawdziwe ekrany aplikacji · fikcyjne dane demonstracyjne · nie nagranie wideo",
    "tourChapters": "Wybierz ekran prezentacji",
    "factAndroid": "Android 7.0+",
    "factOffline": "Darmowa baza",
    "factAccount": "Opcjonalne Premium",
    "faqBackupQ": "Jak zabezpieczyć dane i zmienić telefon?",
    "faqBackupA": "Utwórz ręczny eksport chroniony hasłem i przechowuj go bezpiecznie poza telefonem. Import wymaga potwierdzenia i zastępuje obsługiwany zakres wybranego profilu. To częściowa kopia, nie obraz całej aplikacji: osadzone obrazy notatek są uwzględnione, ale zewnętrzne załączniki i zdjęcia paragonów trzeba zabezpieczyć osobno. Nie ma automatycznego odzyskiwania z chmury ani hasła przez wydawcę.",
    "faqOcrQ": "Czy skanowanie paragonów działa offline?",
    "faqOcrA": "OCR używa modelu dołączonego do aplikacji. Możesz zrobić zdjęcie lub wybrać je z galerii przez selektor Androida. Rozpoznawanie może się pomylić — przed zapisem sprawdź kwotę, walutę i datę. Odmowa dostępu do aparatu nie blokuje wyboru pliku. Pro: Zapisane dane pozostają dostępne. Nowe operacje w tym module wymagają Premium. Backup i eksport pozostają bezpłatne.",
    "faqDeviceQ": "Na jakie urządzenia i dla kogo powstaje KOVA?",
    "faqDeviceA": "KOVA powstaje na telefony z Androidem 7.0 lub nowszym. Interfejs KOVA obsługuje 27 języków; weryfikacja zgodności i tłumaczeń trwa. Planowana grupa to osoby 13+, z uwzględnieniem wymagań sklepu i lokalnego prawa. Nie oferujemy wersji na iOS ani zegarki.",
    "aboutKicker": "Czym jest KOVA?",
    "aboutTitle": "Mniej chaosu w finansach. Więcej miejsca na Twoje plany.",
    "aboutCopy": "KOVA to aplikacja na Androida do codziennych finansów osobistych. Łączy wydatki, budżet i godziny pracy, żeby łatwiej zobaczyć, co zostaje po rachunkach, i zaplanować kolejny miesiąc.",
    "aboutAudience": "Dla studentów, osób pracujących i wszystkich, którzy chcą świadomie zarządzać własnymi pieniędzmi.",
    "aboutForWhom": "Co zyskujesz z KOVA",
    "aboutSpendingTitle": "Wiesz, na co wydajesz",
    "aboutSpendingCopy": "Zapisuj codzienne wydatki i przeglądaj je według kategorii. Zobacz, które koszty najbardziej wpływają na Twój miesiąc.",
    "aboutGoalsTitle": "Widzisz, ile zostało w budżecie",
    "aboutGoalsCopy": "Ustal limity kategorii i sprawdzaj postęp podczas wydawania. Zaplanuj kolejny zakup, wiedząc, ile jeszcze możesz przeznaczyć na daną kategorię.",
    "aboutIncomeTitle": "Planujesz przy zmiennym dochodzie",
    "aboutIncomeCopy": "Pro · Zapisuj godziny pracy i stawki, aby szacować zarobki. Połącz swój grafik i miesięczny budżet w jednym planie.",
    "aboutPrivacy": "Twoje dane finansowe pozostają na tym urządzeniu. Nie potrzebujesz konta KOVA w chmurze, rejestracji ani synchronizacji finansów z chmurą. Przywracanie sprawdza zakupy w Google Play. Nie przywraca ani nie synchronizuje danych finansowych. Premium obejmuje lokalne profile w tej instalacji. Ponowna instalacja i inne urządzenie wymagają osobnego sprawdzenia zakupu. Plan zmienisz w Google Play.",
    "aboutAction": "Zobacz KOVA w praktyce",
    "followLaunch": "Obserwuj KOVA na Instagramie",
    "downloadApp": "Pobierz z Google Play",
    "launchChannel": "Wieści o premierze na Instagramie · @kova_money",
    "workScreenNote": "Interfejs aplikacji po angielsku · Pro · 2026-10-29",
    "plansKicker": "Planowane na pierwsze wydanie",
    "plansTitle": "Darmowa baza. Więcej z Premium.",
    "plansCopy": "To wersja beta. Niektóre elementy aplikacji są nadal dopracowywane i mogą występować błędy. Pro obejmuje wyłącznie narzędzia wymienione poniżej, nie funkcje nieukończone ani obiecane na przyszłość. Przed zakupem sprawdź ograniczenia. Narzędzia Pro są ukryte bez Premium. Po aktywacji analizy pojawiają się dopiero po spełnieniu wymagań dotyczących danych. Narzędzia wprowadzania danych są dostępne od początku. Obliczenia podatkowe obejmują wyłącznie obsługiwane kraje i lata podatkowe. Premium nie dodaje synchronizacji z chmurą.",
    "planFreeTitle": "KOVA Free",
    "planFreeCopy": "Codzienne zapisy i kontrola nad własnymi danymi.",
    "planFreeOne": "Konta, transakcje i kategorie",
    "planFreeTwo": "Budżety · Cele · Stałe opłaty · Notatki",
    "planFreeThree": "Szyfrowanie, backup i eksport danych",
    "planPremiumTitle": "KOVA Premium",
    "planPremiumCopy": "Opcjonalna subskrypcja zaawansowanych narzędzi lokalnych. Codzienne finanse, Twoje dane i backup pozostają bezpłatne. Konto KOVA nie jest wymagane.",
    "planPremiumOne": "Praca i dochód · Kalendarz finansowy",
    "planPremiumTwo": "Raporty · Lokalny OCR paragonów · Centrum podatkowe",
    "planPremiumThree": "Skarbiec · Planer życia · Historia cen",
    "plansNote": "KOVA Premium · Okres próbny można rozpocząć wyłącznie po potwierdzeniu w Google Play udostępnionej Ci oferty. 30 dni za darmo, potem cena pokazana w Google Play przed zakupem (Opłata co miesiąc / Opłata raz w roku). Subskrypcja odnawia się automatycznie, jeśli nie anulujesz jej przed końcem okresu próbnego. Dostępność określa Google Play. Kwalifikację do okresu próbnego określa Google Play, nie lokalny licznik instalacji ani backup finansów. Reinstalacja KOVA nie resetuje historii triala na tym samym koncie Play. Nie gwarantuje to jednego triala na osobę korzystającą z różnych kont. Podstawowe Free i dostęp do zapisanych finansów nie wymagają rozpoczęcia triala.",
    "plansDetails": "Przeczytaj projekt zasad subskrypcji",
    "closingKicker": "Bądź blisko premiery",
    "closingTitle": "Zrób miejsce na spokojniejszy plan finansów.",
    "closingCopy": "Obserwuj KOVA Development na Instagramie: zobacz aplikację i śledź wieści o premierze. Pierwsze publiczne wydanie nadal przygotowujemy.",
    "closingSecondary": "KOVA znajdziesz też na TikToku.",
    "forecastNote": "Funkcje pojawiają się wraz z używaniem KOVA i dodawaniem potrzebnych danych. Dotyczy to również Pro: subskrypcja nie pokaże analiz wymagających danych, dopóki nie będzie wystarczającej odpowiedniej historii.",
    "faqDataQ": "Ile danych potrzebują poszczególne analizy?",
    "faqDataA": "<p>Wydatki i budżety możesz zapisywać od początku. Podstawowe raporty potrzebują 5 transakcji z co najmniej 3 różnych dni.</p><ul><li>Szacowanie zmiennych wydatków: minimum 7 dni obserwacji i 2 wydatki z ostatnich 3 miesięcy. To próg jednego składnika obliczeń, a nie całego Premium.</li><li>Rozszerzone raporty: minimum 60 dni historii, 75 transakcji, 20 dni z transakcjami oraz co najmniej 1 budżet lub cel. Wszystkie te warunki muszą być spełnione.</li><li>Prognozy: minimum 90 dni historii, 100 transakcji z 3 różnych miesięcy oraz regularny dochód lub płatność cykliczna (zapisana albo wykryta). Wszystkie te warunki muszą być spełnione.</li></ul><p>Zakup Premium nie zastępuje wymaganej historii. Liczą się dane zapisane w profilu, również prawidłowo zaimportowane; sama data instalacji nie wystarcza. Prognozy pozostają szacunkami.</p>"
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
    "heroKicker": "KOVA: Money & Budget · Android · Beta",
    "heroTitle": "Spending. Budget.<br><em>Work income.</em>",
    "heroCopy": "KOVA helps you organise everyday money: record spending, plan your budget and see what is left for your goals. Paid by the hour? Connect work hours with estimated income and see your whole month in one place.",
    "heroPrivacy": "Your finances are your business. We take care to keep your financial records with you, on your phone, and away from third parties.",
    "projectStatus": "Check project status",
    "watchVideo": "See the app",
    "pauseVideo": "Pause",
    "playVideo": "Play",
    "releaseNote": "Beta · Before launch · public download is not available yet.",
    "trustPrivacy": "Privacy first",
    "trustPrivacyCopy": "Local database, no automatic uploads",
    "trustReports": "Practical summaries",
    "trustReportsCopy": "Reports based on recorded data",
    "trustOffline": "Works offline",
    "trustOfflineCopy": "Core finances remain available",
    "trustLife": "Built for real life",
    "trustLifeCopy": "Budgets, goals, work, and notes",
    "featureExpenses": "Expenses",
    "featureExpensesCopy": "Record expenses, organise them by category and see where your money goes.",
    "featureBudgets": "Budgets",
    "featureBudgetsCopy": "Set spending limits and keep track of how much you can still spend.",
    "featureWork": "Work & Income",
    "featureWorkCopy": "Pro · Track work hours, estimate income and include it in your budget.",
    "featureCalendar": "Calendar",
    "featureCalendarCopy": "Pro · Keep bill dates, incoming payments and other financial events in one calendar.",
    "featureReports": "Reports",
    "featureReportsCopy": "Pro · Compare income and spending, spot trends and view forecasts based on your records.",
    "featureGoals": "Goals",
    "featureGoalsCopy": "Choose a savings goal, set the amount you need and follow your progress.",
    "clarityKicker": "The app",
    "clarityTitle": "A look inside KOVA.",
    "clarityCopy": "Real KOVA screens with sample data. See how you record spending, plan a budget and organise everyday money.",
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
    "screenWorkCopy": "App interface in English · 2026-10-29",
    "securityKicker": "Privacy",
    "securityTitle": "Privacy is our top priority.",
    "securityCopy": "Your financial records stay on this device. No KOVA cloud account, registration or financial cloud sync is required. Purchases are checked through Google Play without a KOVA server. Access can remain available offline for up to 48 hours after a connected check. Reboot or significant clock changes require another check. Exact subscription expiry is not available in this app; see Google Play.",
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
    "altHome": "KOVA: Your finances today — fictional demo data. App interface in English",
    "altProfile": "KOVA: Accounts — fictional demo data. App interface in English",
    "altFeatures": "KOVA: Your finances today — fictional demo data. App interface in English",
    "altWork": "KOVA: Work & Income · Pro — App interface in English · Pro · 2026-10-29",
    "previous": "Previous screen",
    "next": "Next screen",
    "navigation": "Main navigation",
    "pageTitle": "KOVA — finances in one place",
    "faqFreeQ": "Will KOVA be free?",
    "faqFreeA": "KOVA Premium. Life Planner · Pro. Price History · Pro. Premium includes Work & Income, Financial Calendar, all reports, receipt scanning, Tax Center and Vault. Basic money tracking, Notes, encryption, backup, restore and data export remain free. Saved records remain accessible. Premium is required for new operations in this module. Backup and export remain free. Only an eligible offer shown by Google Play can start a trial, after you confirm the purchase there. 30 days free, then the price displayed by Google Play before purchase (Billed every month / Billed once a year). Automatically renews unless cancelled before the trial ends. Availability is determined by Google Play. Trial eligibility is managed by Google Play, not a local installation timer or financial backup. Reinstalling KOVA does not reset the trial history on the same Play account. This is not a guarantee of one trial per natural person using different accounts. Basic Free use and access to stored financial records do not require starting a trial.",
    "tourNote": "Real app screens · fictional demo data · not a video recording",
    "tourChapters": "Choose a tour screen",
    "factAndroid": "Android 7.0+",
    "factOffline": "Free base",
    "factAccount": "Optional Premium",
    "faqBackupQ": "How do I protect my data or change phones?",
    "faqBackupA": "Create a password-protected manual export and store it safely outside your phone. Import requires confirmation and replaces the supported data of the selected profile. It is a partial copy, not a full app image: embedded note images are included, but external attachments and receipt photos need separate copies. The publisher cannot restore data from the cloud or recover your backup password.",
    "faqOcrQ": "Does receipt scanning work offline?",
    "faqOcrA": "OCR uses a model bundled with the app. Take a photo or choose one from your gallery through the Android picker. Recognition can be wrong — check the amount, currency, and date before saving. Denying camera access does not block file selection. Pro: Saved records remain accessible. Premium is required for new operations in this module. Backup and export remain free.",
    "faqDeviceQ": "Which devices and audience is KOVA for?",
    "faqDeviceA": "KOVA is being prepared for Android phones running Android 7.0 or later. KOVA’s interface supports 27 languages; compatibility and language review are ongoing. Intended for ages 13+, subject to store and local requirements. No iOS or watch release is offered.",
    "aboutKicker": "What is KOVA?",
    "aboutTitle": "Less money stress. More room for your plans.",
    "aboutCopy": "KOVA is an Android app for everyday personal finances. Keep expenses, budgets and work hours together, so you can see what is left after bills and plan the month ahead.",
    "aboutAudience": "For students, working people and anyone who wants to make more intentional decisions about their own money.",
    "aboutForWhom": "What you gain with KOVA",
    "aboutSpendingTitle": "See where your money goes",
    "aboutSpendingCopy": "Record everyday spending and find it by category. Understand which costs make the biggest difference to your month.",
    "aboutGoalsTitle": "Know what is left in your budget",
    "aboutGoalsCopy": "Set category limits and check progress as you spend. Plan the next purchase with a clearer view of what remains.",
    "aboutIncomeTitle": "Plan around changing income",
    "aboutIncomeCopy": "Pro · Record work hours and rates to estimate earnings. Bring your work schedule and monthly budget into one plan.",
    "aboutPrivacy": "Your financial records stay on this device. No KOVA cloud account, registration or financial cloud sync is required. Restore checks purchases with Google Play. It does not restore or synchronize financial records. Premium applies across local profiles on this installation. Reinstallation and another device require a separate purchase check. Changing your plan is available through Google Play.",
    "aboutAction": "See KOVA in action",
    "followLaunch": "Follow KOVA on Instagram",
    "downloadApp": "Get it on Google Play",
    "launchChannel": "Launch news on Instagram · @kova_money",
    "workScreenNote": "App interface in English · Pro · 2026-10-29",
    "plansKicker": "Planned for the first release",
    "plansTitle": "A free base. More with Premium.",
    "plansCopy": "This is a beta version. Some parts of the app are still being refined and errors may occur. Pro covers only the tools listed below, not unfinished or promised future features. Check the limitations before buying. Pro tools are hidden without Premium. After activation, analyses appear only when their data requirements are met. Tools for entering data remain available to get started. Tax calculations cover only supported countries and tax years. Premium does not add cloud sync.",
    "planFreeTitle": "KOVA Free",
    "planFreeCopy": "Everyday recording and control of your own data.",
    "planFreeOne": "Accounts, transactions and categories",
    "planFreeTwo": "Budgets · Goals · Recurring payments · Notes",
    "planFreeThree": "Encryption, backup & data export",
    "planPremiumTitle": "KOVA Premium",
    "planPremiumCopy": "Optional subscription for advanced local tools. Everyday finance, your records and backup remain free. No KOVA account required.",
    "planPremiumOne": "Work & Income · Financial Calendar",
    "planPremiumTwo": "Reports · Local receipt OCR · Tax Center",
    "planPremiumThree": "Vault · Life Planner · Price History",
    "plansNote": "KOVA Premium · Only an eligible offer shown by Google Play can start a trial, after you confirm the purchase there. 30 days free, then the price displayed by Google Play before purchase (Billed every month / Billed once a year). Automatically renews unless cancelled before the trial ends. Availability is determined by Google Play. Trial eligibility is managed by Google Play, not a local installation timer or financial backup. Reinstalling KOVA does not reset the trial history on the same Play account. This is not a guarantee of one trial per natural person using different accounts. Basic Free use and access to stored financial records do not require starting a trial.",
    "plansDetails": "Read the subscription draft",
    "closingKicker": "Stay close to the launch",
    "closingTitle": "Make room for a clearer money plan.",
    "closingCopy": "Follow KOVA Development on Instagram for app previews and launch news. The first public release is still in preparation.",
    "closingSecondary": "You can also find KOVA on TikTok.",
    "forecastNote": "Features appear as you use KOVA and add the data they need. This also applies to Pro: a subscription does not reveal data-dependent analyses before enough relevant data is available.",
    "faqDataQ": "How much data does each analysis need?",
    "faqDataA": "<p>You can record expenses and budgets from the start. Basic reports need 5 transactions across at least 3 different days.</p><ul><li>Variable spending estimate: at least 7 observation days and 2 expenses from the last 3 months. This is the threshold for one calculation component, not all of Premium.</li><li>Advanced reports: at least 60 days of history, 75 transactions, 20 days with transactions, and at least 1 budget or goal. All these conditions must be met.</li><li>Forecasts: at least 90 days of history, 100 transactions across 3 different months, and regular income or a recurring payment (recorded or detected). All these conditions must be met.</li></ul><p>Buying Premium does not replace the required history. Records in the profile count, including correctly imported data; the installation date alone is not enough. Forecasts remain estimates.</p>"
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
    "heroKicker": "KOVA: Money & Budget · Android · Beta",
    "heroTitle": "Расходы. Бюджет.<br><em>Доход от работы.</em>",
    "heroCopy": "KOVA помогает навести порядок в повседневных финансах: записывайте расходы, планируйте бюджет и смотрите, сколько остаётся на ваши цели. Работаете с почасовой оплатой? Свяжите рабочие часы с оценкой дохода и увидьте весь месяц в одном месте.",
    "heroPrivacy": "Ваши финансы — ваше личное дело. Мы заботимся о том, чтобы финансовые данные оставались у вас, на вашем телефоне, и не попадали к третьим лицам.",
    "projectStatus": "Статус проекта",
    "watchVideo": "Посмотреть приложение",
    "pauseVideo": "Пауза",
    "playVideo": "Запустить",
    "releaseNote": "Beta · До премьеры · публичное скачивание пока недоступно.",
    "trustPrivacy": "Приватность прежде всего",
    "trustPrivacyCopy": "Локальная база, без автоматической отправки",
    "trustReports": "Практичные итоги",
    "trustReportsCopy": "Отчёты на основе сохранённых данных",
    "trustOffline": "Работает офлайн",
    "trustOfflineCopy": "Основные финансы всегда доступны",
    "trustLife": "Для реальной жизни",
    "trustLifeCopy": "Бюджеты, цели, работа и заметки",
    "featureExpenses": "Расходы",
    "featureExpensesCopy": "Записывайте расходы, распределяйте их по категориям и узнавайте, на что уходят деньги.",
    "featureBudgets": "Бюджеты",
    "featureBudgetsCopy": "Устанавливайте лимиты расходов и следите, сколько ещё можно потратить.",
    "featureWork": "Работа и доход",
    "featureWorkCopy": "Pro · Учитывайте рабочие часы, оценивайте доход и включайте его в свой бюджет.",
    "featureCalendar": "Календарь",
    "featureCalendarCopy": "Pro · Соберите сроки оплаты счетов, поступления и другие финансовые события в одном календаре.",
    "featureReports": "Отчёты",
    "featureReportsCopy": "Pro · Сравнивайте доходы и расходы, замечайте тенденции и смотрите прогнозы на основе ваших записей.",
    "featureGoals": "Цели",
    "featureGoalsCopy": "Выберите цель накоплений, задайте нужную сумму и следите за продвижением к ней.",
    "clarityKicker": "Приложение",
    "clarityTitle": "Загляните в KOVA.",
    "clarityCopy": "Настоящие экраны KOVA с демонстрационными данными. Посмотрите, как записывать расходы, планировать бюджет и упорядочивать повседневные финансы.",
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
    "screenWorkCopy": "Интерфейс приложения на английском · 2026-10-29",
    "securityKicker": "Приватность",
    "securityTitle": "Приватность для нас важнее всего.",
    "securityCopy": "Финансовые данные остаются на этом устройстве. Облачный аккаунт KOVA, регистрация и облачная синхронизация финансов не требуются. Покупки проверяются через Google Play без сервера KOVA. Доступ без сети возможен до 48 часов после проверки с подключением. Перезагрузка телефона или значительное изменение часов требуют новой проверки. Приложение не знает точную дату окончания подписки; смотрите её в Google Play.",
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
    "altHome": "KOVA: Финансы сегодня — вымышленные демонстрационные данные. Интерфейс приложения на английском",
    "altProfile": "KOVA: Счета — вымышленные демонстрационные данные. Интерфейс приложения на английском",
    "altFeatures": "KOVA: Финансы сегодня — вымышленные демонстрационные данные. Интерфейс приложения на английском",
    "altWork": "KOVA: Работа и доход · Pro — Интерфейс приложения на английском · Pro · 2026-10-29",
    "previous": "Предыдущий экран",
    "next": "Следующий экран",
    "navigation": "Основная навигация",
    "pageTitle": "KOVA — финансы в одном месте",
    "faqFreeQ": "Будет ли KOVA бесплатной?",
    "faqFreeA": "KOVA Premium. Планер жизни · Pro. История цен · Pro. Premium включает работу и доходы, финансовый календарь, все отчёты, сканирование чеков, налоговый центр и Vault. Базовый учёт финансов, заметки, шифрование, резервное копирование, восстановление и экспорт данных остаются бесплатными. Сохранённые данные остаются доступны. Для новых операций в этом модуле нужен Premium. Резервное копирование и экспорт остаются бесплатными. Пробный период начинается только после подтверждения покупки доступного вам предложения в Google Play. 30 дней бесплатно, затем цена, показанная Google Play перед покупкой (Оплата каждый месяц / Оплата раз в год). Подписка продлевается автоматически, если не отменить её до конца пробного периода. Доступность определяет Google Play. Право на пробный период определяет Google Play, а не локальный таймер установки или финансовый бэкап. Переустановка KOVA не сбрасывает историю пробного периода на том же аккаунте Play. Это не гарантирует один пробный период на человека с разными аккаунтами. Базовый Free и доступ к сохранённым финансовым данным не требуют начала пробного периода.",
    "tourNote": "Настоящие экраны приложения · вымышленные данные · не видеозапись",
    "tourChapters": "Выберите экран презентации",
    "factAndroid": "Android 7.0+",
    "factOffline": "Бесплатная база",
    "factAccount": "Дополнительно Premium",
    "faqBackupQ": "Как защитить данные и сменить телефон?",
    "faqBackupA": "Создайте ручной экспорт с паролем и храните его безопасно вне телефона. Импорт требует подтверждения и заменяет поддерживаемые данные выбранного профиля. Это частичная копия, не образ всей установки: встроенные изображения заметок включены, внешние вложения и фотографии чеков копируйте отдельно. Издатель не может восстановить данные из облака или вернуть пароль копии.",
    "faqOcrQ": "Работает ли сканирование чеков офлайн?",
    "faqOcrA": "OCR использует модель из состава приложения. Можно сделать фото или выбрать его из галереи через системный выбор Android. Распознавание может ошибаться — проверьте сумму, валюту и дату перед сохранением. Отказ в доступе к камере не блокирует выбор файла. Pro: Сохранённые данные остаются доступны. Для новых операций в этом модуле нужен Premium. Резервное копирование и экспорт остаются бесплатными.",
    "faqDeviceQ": "Для каких устройств и пользователей создаётся KOVA?",
    "faqDeviceA": "KOVA готовится для телефонов Android под управлением Android 7.0 или более поздней версии. Интерфейс KOVA поддерживает 27 языков; совместимость и языковая проверка продолжаются. Предназначено для пользователей от 13 лет с учётом требований магазина и местных правил. Никакой версии для iOS или часов не предлагается.",
    "aboutKicker": "Что такое KOVA?",
    "aboutTitle": "Меньше хаоса в финансах. Больше места для ваших планов.",
    "aboutCopy": "KOVA — приложение для личных финансов на Android. Оно объединяет расходы, бюджет и учёт рабочего времени, чтобы было проще понять, сколько остаётся после оплаты счетов, и спланировать следующий месяц.",
    "aboutAudience": "Для студентов, работающих людей и всех, кто хочет осознанно распоряжаться своими деньгами.",
    "aboutForWhom": "Что даёт вам KOVA",
    "aboutSpendingTitle": "Посмотрите, куда идут ваши деньги",
    "aboutSpendingCopy": "Записывайте повседневные расходы и просматривайте их по категориям. Узнайте, какие траты сильнее всего влияют на ваш месячный бюджет.",
    "aboutGoalsTitle": "Видите, сколько осталось в бюджете",
    "aboutGoalsCopy": "Задавайте лимиты по категориям и следите за расходами. Планируйте следующую покупку, зная, сколько ещё можно потратить.",
    "aboutIncomeTitle": "Планируете при переменном доходе",
    "aboutIncomeCopy": "Pro · Записывайте рабочие часы и ставки, чтобы оценивать заработок. Объедините рабочий график и месячный бюджет в одном плане.",
    "aboutPrivacy": "Финансовые данные остаются на этом устройстве. Облачный аккаунт KOVA, регистрация и облачная синхронизация финансов не требуются. Восстановление проверяет покупки в Google Play, но не восстанавливает и не синхронизирует финансовые данные. Premium действует для локальных профилей этой установки. После переустановки и на другом устройстве покупку нужно проверить отдельно. План можно изменить в Google Play.",
    "aboutAction": "Посмотреть KOVA в действии",
    "followLaunch": "Подписаться на KOVA в Instagram",
    "downloadApp": "Скачать в Google Play",
    "launchChannel": "Новости о выпуске в Instagram · @kova_money",
    "workScreenNote": "Интерфейс приложения на английском · Pro · 2026-10-29",
    "plansKicker": "Планируется к первому выпуску",
    "plansTitle": "Бесплатная база. Больше с Premium.",
    "plansCopy": "Это бета-версия. Некоторые части приложения ещё дорабатываются, возможны ошибки. Pro включает только перечисленные ниже инструменты, а не незавершённые или обещанные функции. Перед покупкой изучите ограничения. Без Premium инструменты Pro скрыты. После активации аналитика появляется только при наличии необходимых данных. Инструменты ввода данных доступны с самого начала. Налоговые расчёты доступны только для поддерживаемых стран и налоговых лет. Premium не добавляет облачную синхронизацию.",
    "planFreeTitle": "KOVA Free",
    "planFreeCopy": "Ежедневная запись и контроль собственных данных.",
    "planFreeOne": "Счета, транзакции и категории",
    "planFreeTwo": "Бюджеты · Цели · Регулярные платежи · Заметки",
    "planFreeThree": "Шифрование, резервные копии и экспорт",
    "planPremiumTitle": "KOVA Premium",
    "planPremiumCopy": "Необязательная подписка на расширенные локальные инструменты. Повседневный учёт, ваши данные и резервное копирование остаются бесплатными. Аккаунт KOVA не требуется.",
    "planPremiumOne": "Работа и доход · Финансовый календарь",
    "planPremiumTwo": "Отчеты · Локальное распознавание чеков · Налоги (OCR)",
    "planPremiumThree": "Хранилище · Планировщик жизни · История цен",
    "plansNote": "KOVA Premium · Пробный период начинается только после подтверждения покупки доступного вам предложения в Google Play. 30 дней бесплатно, затем цена, показанная Google Play перед покупкой (Оплата каждый месяц / Оплата раз в год). Подписка продлевается автоматически, если не отменить её до конца пробного периода. Доступность определяет Google Play. Право на пробный период определяет Google Play, а не локальный таймер установки или финансовый бэкап. Переустановка KOVA не сбрасывает историю пробного периода на том же аккаунте Play. Это не гарантирует один пробный период на человека с разными аккаунтами. Базовый Free и доступ к сохранённым финансовым данным не требуют начала пробного периода.",
    "plansDetails": "Прочитать проект условий подписки",
    "closingKicker": "Следите за новостями о выпуске",
    "closingTitle": "Планируйте свои финансы спокойнее.",
    "closingCopy": "Подписывайтесь на KOVA Development в Instagram: смотрите приложение и следите за новостями о выпуске. Первый публичный релиз ещё готовится.",
    "closingSecondary": "Вы также можете найти KOVA на TikTok.",
    "forecastNote": "Функции появляются по мере использования KOVA и добавления нужных данных. Это относится и к Pro: подписка не покажет анализ, зависящий от данных, пока не накопится достаточно подходящей истории.",
    "faqDataQ": "Сколько данных нужно для разных видов анализа?",
    "faqDataA": "<p>Записывать расходы и бюджеты можно с самого начала. Для базовых отчётов нужны 5 транзакций за минимум 3 разных дня.</p><ul><li>Оценка переменных расходов: минимум 7 дней наблюдения и 2 расхода за последние 3 месяца. Это порог одного компонента расчёта, а не всего Premium.</li><li>Расширенные отчёты: минимум 60 дней истории, 75 транзакций, 20 дней с транзакциями и хотя бы 1 бюджет или цель. Все условия должны выполняться одновременно.</li><li>Прогнозы: минимум 90 дней истории, 100 транзакций за 3 разных месяца и регулярный доход или повторяющийся платёж (записанный либо обнаруженный). Все условия должны выполняться одновременно.</li></ul><p>Покупка Premium не заменяет нужную историю. Учитываются записи профиля, включая корректно импортированные данные; одной даты установки недостаточно. Прогнозы остаются оценками.</p>"
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
      "pl": "Raporty · Pro",
      "en": "Reports · Pro",
      "ru": "Отчёты · Pro"
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
      "pl": "Kalendarz finansowy · Pro",
      "en": "Financial calendar · Pro",
      "ru": "Финансовый календарь · Pro"
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

  // A direct FAQ link opens its answer, including after switching languages.
  const openLinkedAnswer = () => {
    if (location.hash === '#analysis-data') document.getElementById('analysis-data').open = true;
  };
  document.querySelectorAll('a[href="#analysis-data"]').forEach(link => link.addEventListener('click', () => {
    document.getElementById('analysis-data').open = true;
  }));
  window.addEventListener('hashchange', openLinkedAnswer);
  openLinkedAnswer();
  applyLanguage();
})();
