# Polityka prywatności KOVA — LOCAL FREEMIUM V1 — DRAFT

Wersja dokumentu: 2026-10-24. Zaktualizowano: 24 października 2026 r. Wydawca: Vadyslav Konohrai, osoba prywatna, Polska. Kontakt prywatności i wsparcia: contact@kovacompass.app.

Status: DRAFT — treść do finalnego zatwierdzenia po uzupełnieniu wskazanych faktów. Data sporządzenia nie stanowi podpisu elektronicznego, potwierdzenia publikacji ani nadania wstecznej mocy nowym zasadom. Data wejścia w życie po zatwierdzeniu i udostępnieniu użytkownikom: [OWNER_INPUT_REQUIRED].

Publiczny adres polityki (wersja angielska): [https://kovacompass.app/privacy.html?lang=en](https://kovacompass.app/privacy.html?lang=en).

## 1. Zakres

Jednorazowe wsparcie korzysta z Google Play i tej samej granicy weryfikacji podpisu zakupu client-only. KOVA przetwarza przejściowo identyfikator produktu, podpisane informacje o zakupie i token zakupu, aby sprawdzić i zakończyć płatność; nie wydaje uprawnienia Premium ani nie zapisuje tych potwierdzeń wsparcia w finansowym backupie. Lokalny znacznik bez danych wrażliwych informuje o otwarciu wsparcia, aby po restarcie sprawdzić niedokończone płatności. KOVA nie zbiera danych karty, nie wysyła finansów, nie dodaje logowania Firebase ani analityki i nie publikuje listy wspierających. Google Play przetwarza płatność według własnych zasad prywatności. Kontakt w sprawie płatności podlega opisanym dalej zasadom korespondencji.

Polityka opisuje KOVA_PHONE_LOCAL_FREEMIUM_V1, aplikację na telefon Android o identyfikatorze com.kova.budget. Ma bezpłatną bazę lokalną i zaimplementowaną opcjonalną subskrypcję Premium, nadal wymagającą pełnej kwalifikacji publicznej sprzedaży, bez obowiązkowego konta KOVA. Nie jest to polityka strony WWW, systemu Android, Google Play ani dawnych usług chmurowych. Ich odrębne zasady nie zmieniają obowiązków wydawcy dotyczących jego własnego przetwarzania.

## 2. Dane i cele lokalnego przetwarzania

KOVA używa wybranych lub wpisanych przez Ciebie danych do realizacji funkcji na urządzeniu:

- Nazwa profilu lokalnego, lokalny identyfikator i preferencje: rozdzielenie danych profilu, język, waluta i ustawienia.
- Konta finansowe, salda, kwoty, waluty, daty, opisy, kategorie, transakcje, zwroty i przelewy: ewidencja oraz wyliczenia.
- Budżety, cele, długi, płatności cykliczne i majątek: planowanie i lokalne zestawienia.
- Profile pracy, stawki, godziny, przerwy i dane potrzebne do szacowania wynagrodzeń: rejestracja pracy i prognozy.
- Notatki, zadania, listy, wydarzenia, paragony, wybrane zdjęcia i odnośniki do plików: treści tworzone przez użytkownika i lokalny OCR.
- Wyniki obliczeń i techniczny stan aplikacji: raporty, odtworzenie sesji i niezawodny zapis.

Nie wpisuj zbędnych haseł bankowych, kodów uwierzytelniających, pełnych danych kart ani szczególnie wrażliwych informacji. Notatki i zdjęcia mogą zawierać dane innych osób; ogranicz je do niezbędnego zakresu i korzystaj z nich zgodnie z prawem.

Wyszukiwarki walut i języków filtrują listy na urządzeniu; zapytania nie są wysyłane do wydawcy ani wyszukiwarki internetowej. Katalog walut, nazwy języków i obrazy flag są dołączone do aplikacji. Flaga jest pomocą wizualną, nie ustaleniem Twojej lokalizacji, obywatelstwa ani rezydencji podatkowej. Preferencje języka i waluty są zapisywane lokalnie. W selektorze języka zaznaczenie pozycji przygotowuje zmianę; przycisk Zastosuj ją zapisuje, a zamknięcie bez zastosowania zachowuje poprzedni język.

## 3. Lokalne finanse i opcjonalne zakupy

Opcjonalna subskrypcja zaawansowanych narzędzi lokalnych. Codzienne finanse, Twoje dane i backup pozostają bezpłatne. Konto KOVA nie jest wymagane. Planer życia · Pro. Historia cen · Pro. Premium obejmuje Work & Income, Kalendarz finansowy, wszystkie raporty, skanowanie paragonów, Centrum podatkowe i Vault. Podstawowa ewidencja finansów, Notatki, szyfrowanie, backup, przywracanie i eksport danych pozostają bezpłatne. Narzędzia Pro są ukryte bez Premium. Po aktywacji analizy pojawiają się dopiero po spełnieniu wymagań dotyczących danych. Narzędzia wprowadzania danych są dostępne od początku. Obliczenia podatkowe obejmują wyłącznie obsługiwane kraje i lata podatkowe. Premium nie dodaje synchronizacji z chmurą.

KOVA · 2026-10-29 · DRAFT

AKTUALNY KANDYDAT — NIEZATWIERDZONY DO PUBLICZNEJ SPRZEDAŻY: właściciel wybrał weryfikację client-only, bez serwera weryfikacji KOVA. Aplikacja komunikuje się z Google Play przez interfejs płatności Androida. Wydanie usuwa uprawnienie INTERNET z procesu KOVA; Google Play używa własnej sieci i przetwarzania kont/płatności. KOVA obserwuje dostępność połączenia, co samo nie dowodzi aktualności zakupu z pamięci Play. Nie twierdzimy, że cały telefon nie korzysta z sieci.

KOVA otrzymuje z Play token zakupu, produkt/pakiet, podpisane informacje o zakupie/podpis oraz dostępny stan zakupu. Odpowiedni token jest przekazywany przez Play do potwierdzenia obsłużenia zakupu. Losowy lokalny identyfikator instalacji rozdziela lokalną pamięć uprawnień; nie jest właścicielem finansów ani adresem e-mail konta Google. Sprawdzenie podpisu potwierdza autentyczność, nie dokładną datę wygaśnięcia, aktualny zwrot ani odporność zmodyfikowanego urządzenia. KOVA nie otrzymuje danych karty. Żaden serwer weryfikacji KOVA nie otrzymuje finansów, Notes, obrazów OCR, backupów ani danych zakupowych. Google przetwarza zakupy według właściwych mu warunków i informacji o prywatności.

Lokalne potwierdzenie dostępu jest szyfrowane i uwierzytelniane kluczem Android Keystore właściwym instalacji, poza backupami. Kolejne sprawdzenie może je zastąpić, a usunięcie danych instalacji je usuwa; limit 48 godzin nie oznacza automatycznego usuwania pliku po tym czasie. Dane zakupów nie trafiają do logów diagnostycznych. Backup/import finansów nie przyznaje Premium, nie kopiuje potwierdzenia ani nie przenosi finansów przez Play.

Polityka dostępu w tej wersji: do 48 godzin od udanego cyklu zapytań Play z połączeniem, mierzonych zegarem monotonicznym urządzenia. Restart telefonu, brak wiarygodnej informacji o jego uruchomieniu lub rozbieżność zegarów przekraczająca 2 minuty wymaga nowego sprawdzenia. Samo ponowne otwarcie KOVA nie resetuje ani nie przedłuża tego okna. Aplikacja nie zna ani nie wymyśla potwierdzonej daty końca subskrypcji. Uruchomienie offline nie przedłuża okna. Play może zwracać dane z pamięci również przy połączeniu, więc wygaśnięcie/zwrot mogą zostać wykryte z opóźnieniem. Zawieszenie lub niepewny stan mogą wymagać odświeżenia; baza, zapisane dane oraz backup/eksport pozostają dostępne. Inna instalacja przywraca zakupy w Play osobno od kopii finansów.

Otwarcie publicznego dokumentu w zewnętrznej przeglądarce jest odrębne od odczytu dołączonego dokumentu. Cookies/analityka strony mają własne informacje i wybory. Zwykłe przypomnienia lokalne nie są zdalnym push.

## 4. Uprawnienia, OCR i urządzenie

Aparat jest opcjonalny, do zdjęć paragonów. Możesz zamiast tego wybrać zdjęcie przez systemowy selektor; nie wymaga to zgody na aparat. OCR używa modeli dołączonych do aplikacji, bez wysyłania zdjęcia do zdalnego rozpoznawania. Sprawdź kwotę, walutę, datę i treść przed zapisem — rozpoznawanie może się pomylić.

Powiadomienia służą lokalnym przypomnieniom i zależą od ustawień Androida. Opcjonalna biometria korzysta z systemowego uwierzytelniania; KOVA nie otrzymuje wzorca odcisku ani twarzy. Uprawnienia można zmienić w ustawieniach Androida. Odmowa ogranicza daną funkcję, nie stanowi zgody na przesyłanie danych. Ta wersja nie używa mikrofonu, reklamowego identyfikatora ani usług lokalizacji. Dostęp do wybranego pliku zależy także od jego dostawcy.

## 5. Ochrona i jej granice

Główna baza finansowa korzysta z SQLCipher. Materiał klucza konkretnej instalacji jest chroniony z wykorzystaniem Android Keystore; nie jest to przenośne hasło backupu. Nie wszystkie zdjęcia, pliki pomocnicze, ustawienia, eksporty ani treści widoczne na ekranie są objęte szyfrowaniem tej bazy. Zabezpiecz telefon i dostęp do plików. Szyfrowanie nie gwarantuje ochrony przed przejętym lub odblokowanym urządzeniem, złośliwym oprogramowaniem, utratą klucza czy ujawnieniem przez użytkownika.

## 6. Ręczny eksport i odtwarzanie

Ręczny eksport to częściowa kopia obsługiwanego zakresu, chroniona hasłem, a nie obraz całej instalacji. Obejmuje obsługiwane rekordy finansowe i zapisane konfiguracje, m.in. pracy, oraz obrazy osadzone w dokumencie notatki. Nie kopiuje preferencji aplikacji, kluczy instalacji, konfiguracji widżetów, historii powiadomień, pomocniczych kolejek synchronizacji ani wszystkich pamięci podręcznych. Zewnętrzne zdjęcia paragonów i załączniki plikowe nie są kopiowane. Zapisany URI lub odnośnik nie jest kopią zawartości: plik może przestać być dostępny po przeniesieniu, usunięciu lub utracie uprawnienia. Zabezpiecz te pliki osobno.

Sam wybierasz miejsce eksportu w systemowym wyborze pliku. Wybór chmurowego dostawcy lub udostępnienie pliku innej aplikacji może spowodować przekazanie danych według jej zasad. KOVA nie wysyła backupu automatycznie. Przechowuj kopię i silne hasło bezpiecznie, najlepiej oddzielnie. Wydawca nie przechowuje klucza odzyskiwania tego hasła. Po potwierdzeniu import zastępuje obsługiwany zakres danych wybranego profilu. Odtworzenie kompatybilnej kopii lokalnej do innej instalacji wymaga świadomego potwierdzenia; nie przejmuje automatycznie dawnych kont cloud ani wielu właścicieli.

Preferencje języka i głównej waluty należy sprawdzić oddzielnie po odzyskaniu danych; backup nie jest kopią tych ustawień aplikacji. Obrazy osadzone w notatce różnią się od odnośników do zewnętrznych obrazów. Gdy obraz zewnętrzny zniknie lub dostawca odmówi dostępu, sam odnośnik nie odtworzy pliku. KOVA nie pobiera zastępczego obrazu z internetu.

## 7. Przechowywanie i usuwanie

Lokalne rekordy pozostają na urządzeniu do ich usunięcia lub zastąpienia przez użytkownika; dane pomocnicze i cache zależą od działania aplikacji i Androida, bez zadeklarowanego tutaj stałego terminu czyszczenia. Poszczególne rekordy usuwaj dostępnymi funkcjami aplikacji. Aby usunąć dane instalacji, użyj ustawień Androida: Aplikacje → KOVA → Pamięć → Wyczyść dane/pamięć; nazwy zależą od urządzenia. To działanie usuwa lokalne dane i może uniemożliwić odzyskanie bez kopii. Odinstalowanie również zwykle usuwa prywatne dane aplikacji.

Pliki wyeksportowane, kopie u zewnętrznych dostawców, oryginalne zdjęcia i kopie przekazane innym osobom trzeba usunąć osobno. Usunięcie rekordu nie jest obietnicą bezpiecznego nadpisania wszystkich fizycznych nośników. Automatyczny backup KOVA do chmury i transfer jej danych mechanizmem Androida są wyłączone w konfiguracji tego wydania; nie zastępuje to ręcznej kopii.

## 8. Kontakt, dane u operatora i prawa

Lokalne działanie nie wymaga przesłania danych wydawcy. Jeżeli skontaktujesz się z nim poza aplikacją, może otrzymać Twój adres kontaktowy, treść wiadomości oraz dobrowolne załączniki. Nie przesyłaj pełnej bazy, hasła kopii, kluczy ani rzeczywistych danych finansowych, jeśli nie jest to konieczne. Dokument nie upoważnia do żądania takich danych.

Za dane otrzymane w ramach własnej obsługi kontaktu odpowiada jako administrator Vadyslav Konohrai, Polska, kontakt: contact@kovacompass.app. Nie oznacza to zdalnego dostępu do finansów na telefonie. Google odpowiada za swoje przetwarzanie związane ze sklepem i płatnościami według [polityki prywatności Google](https://policies.google.com/privacy?hl=pl); nie przedstawiamy Google jako serwera finansów KOVA ani nie zapewniamy przetwarzania Play wyłącznie w Polsce lub EOG.

Projekt zasad obsługi kontaktu przewiduje odpowiedź na pytanie lub wykonanie umowy (art. 6 ust. 1 lit. b RODO, gdy kontakt tego dotyczy), obowiązki reklamacyjne i prawne (lit. c, w zakresie konkretnego obowiązku) oraz wyjaśnianie problemów technicznych, bezpieczeństwo i dochodzenie lub obronę roszczeń (lit. f, przy wykazanym prawnie uzasadnionym interesie i ocenie praw osoby). Nie obejmuje newslettera, reklamy ani trenowania modeli. Podanie kontaktu i niezbędnego opisu jest dobrowolne, ale ich brak może uniemożliwić odpowiedź lub ustalenie sprawy; nie trzeba przekazywać całej bazy. Te podstawy nie oznaczają zgody na wszystko i wymagają dopasowania do rzeczywistego procesu.

Zgodnie z oświadczeniem wydawcy z 23.10.2026 wiadomości wysłane na contact@kovacompass.app są przekierowywane przez Cloudflare do jego skrzynki Gmail. Publicznym kontaktem pozostaje contact@kovacompass.app. Treść, załączniki i dane doręczenia wiadomości są więc obsługiwane także przez Google oraz Cloudflare. To osobna korespondencja zainicjowana przez nadawcę, nie automatyczny przesył zapisów z aplikacji. Samo przekierowanie nie potwierdza umowy Google Workspace, powierzenia ani przechowywania wyłącznie w EOG. Dostawcy opisują swoje zasady w [polityce Google](https://policies.google.com/privacy?hl=pl), [polityce Cloudflare](https://www.cloudflare.com/privacypolicy/) oraz [Cloudflare DPA](https://www.cloudflare.com/cloudflare-customer-dpa/). Odczyt publicznych zasad nie jest potwierdzeniem warunków konta wydawcy ani podstawy każdego transferu w obsłudze KOVA.

DO UZUPEŁNIENIA PRZED PUBLIKACJĄ: właściwe role i warunki usług Cloudflare/Gmail, ewentualni dodatkowi odbiorcy, wymagane umowy, kraje i podstawa transferów poza EOG oraz sposób uzyskania informacji o zabezpieczeniach [OWNER_INPUT_REQUIRED]. Cloudflare i Gmail są wskazane przez wydawcę; nie wykonano testu doręczenia ani kontroli ustawień kont. Wydawca zaakceptował 23.10.2026 planowaną procedurę: zwykłe pytania techniczne maksymalnie 12 miesięcy od zamknięcia sprawy, zbędne załączniki nie później niż 30 dni od zamknięcia, z wcześniejszym usuwaniem po ustaniu celu. To zaakceptowany plan, nie potwierdzona bieżąca praktyka; wdrożenie pozostaje do wykonania. Reklamacje, spory i rozliczenia wymagają odrębnego ustalenia właściwych okresów i nie podlegają automatycznie tym limitom. Nie twierdzimy, że wiadomości są usuwane po 48 godzinach ani że automatyczne kasowanie jest skonfigurowane. Usunięcie ze skrzynki nie oznacza natychmiastowego usunięcia ze wszystkich systemów dostawcy; zobacz [zasady przechowywania Google](https://policies.google.com/technologies/retention?hl=pl).

Żądania dotyczące danych rozpatruje się zgodnie z właściwym prawem. Dla RODO odpowiedź następuje co do zasady w ciągu miesiąca; dopuszczalne przedłużenie wymaga informacji wraz z uzasadnieniem w tym terminie. Weryfikacja tożsamości powinna być proporcjonalna — nie żądamy z zasady skanu dowodu ani hasła. Brak dostępu do danych wyłącznie lokalnych nie zwalnia z obowiązków wobec danych faktycznie otrzymanych przez operatora. Informacje o prawach i wniesieniu skargi: [UODO](https://uodo.gov.pl/pl/493/2254).

W zakresie, w jakim RODO ma zastosowanie do danych przetwarzanych przez operatora, przysługują właściwe w danej sytuacji prawa dostępu, sprostowania, usunięcia, ograniczenia, przenoszenia i sprzeciwu; zgodę można wycofać, jeżeli stanowi podstawę danego przetwarzania. Można wnieść skargę do właściwego organu nadzorczego, w Polsce Prezesa UODO, oraz skorzystać z ochrony sądowej. Żądania do operatora należy kierować na podany kontakt prywatności; terminy i ograniczenia wynikają z właściwych przepisów. Operator nie może zdalnie zmodyfikować bazy istniejącej wyłącznie na Twoim telefonie. Nie uzależniamy praw ustawowych od rezygnacji z roszczeń.

Google Play może udostępniać wydawcy dane zamówień i rozliczeń, np. numer zamówienia, produkt, kwotę, walutę i status zwrotu oraz zależnie od raportu dane kupującego. Nie są to Twoje zapisane finanse w KOVA. Brak serwera KOVA nie wyklucza tego przetwarzania. Rzeczywisty zakres, dostęp, eksporty i retencja wymagają potwierdzenia przed sprzedażą. Zobacz [zamówienia Play](https://support.google.com/googleplay/android-developer/answer/2741495?hl=en) i [raporty Play](https://support.google.com/googleplay/android-developer/answer/6135870?hl=en).

## 9. Dawne konta i odrębne usługi

To wydanie nie tworzy kont online. Według oświadczenia wydawcy z 20.10.2026 wcześniejsze wersje chmurowe były używane wyłącznie przez niego i konta testowe, bez zewnętrznych nietestowych użytkowników. Nie oferujemy więc użytkownikowi tej wersji dostępu do dawnego konta cloud ani przenoszenia z niego danych. Oświadczenie o historii testów nie jest nowym audytem Firebase ani potwierdzeniem usunięcia danych testowych. Ta wersja nie usuwa dawnych zasobów. Ewentualne pytania o prywatność kieruj na wskazany kontakt.

## 10. Dzieci, zmiany i pozostałe informacje

Dostępne języki interfejsu są wymienione w Ustawieniach. Dołączona polityka i regulamin są tam dostępne offline. Dodatkowe wersje językowe są projektami tłumaczeń maszynowych oczekującymi na kontrolę językową i prawną; ich obecność nie oznacza zgody na publikację ani prawnej kwalifikacji dla danego kraju. Sama zmiana języka interfejsu nie potwierdza dopuszczalności dystrybucji w żadnym kraju.

KOVA jest przeznaczona dla osób w wieku 13 lat i starszych, nie dla dzieci poniżej 13 lat. Planowana jest dystrybucja światowa, z uwzględnieniem dostępności sklepu i wymogów poszczególnych krajów; nie jest to obietnica dostępności w każdym kraju. Jeśli lokalne prawo wymaga udziału rodzica lub opiekuna w korzystaniu albo w określonym przetwarzaniu danych, sam ukończony 13. rok życia nie zastępuje takiego wymogu. Ten dokument nie twierdzi, że aplikacja weryfikuje wiek lub zbiera zgodę opiekuna. Zgoda na przetwarzanie danych i zdolność do zawarcia umowy to odrębne kwestie.

Krótko: Twoje wpisy są na telefonie. Nie logujesz się do chmury. Zabezpiecz telefon, rób ręczne kopie i nie udostępniaj hasła. Jeśli Ty lub Twój opiekun macie pytania o dane, napiszcie na kontakt prywatności; nie wysyłajcie haseł, dokumentów tożsamości ani pełnej bazy.

Wyniki lokalnych analiz służą użytkownikowi; KOVA nie wydaje w imieniu operatora decyzji o kredycie, zatrudnieniu ani uprawnieniach. Nie jest to deklaracja dotycząca niezależnych działań innych podmiotów. Aplikacja nie prowadzi reklamowego śledzenia ani nie wymaga zgody na analityczne cookies; ewentualna strona WWW wymaga własnej oceny.

Aktualna polityka powinna być dostępna w Ustawieniach i pod zatwierdzonym publicznym adresem. Zmiany mają wskazywać nową wersję i rzeczywistą datę obowiązywania, bez wstecznego upoważniania do nowych celów. Ewentualne przyszłe usługi online wymagają nowych informacji i właściwych podstaw, nie samej zmiany tego tekstu. Informacje o bibliotekach są w Ustawieniach. Zobacz również [Regulamin](terms-of-service-pl.md).

