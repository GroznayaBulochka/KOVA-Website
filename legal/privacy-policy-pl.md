# Polityka prywatności KOVA — OFFLINE V1 — DRAFT

Wersja dokumentu: 2026-10-22. Projekt niezatwierdzony do publikacji; to nie jest data wejścia w życie. Operator/wydawca: Vadyslav Konohrai, osoba prywatna, Polska. Kontakt prywatności i wsparcia: contact@kovacompass.app. Data obowiązywania i publiczny adres polityki: [OWNER_INPUT_REQUIRED].

## 1. Zakres

Polityka opisuje KOVA_PHONE_OFFLINE_FREE_V1, aplikację na telefon Android o identyfikatorze com.kova.budget. Jest to bezpłatny lokalny organizer finansów, bez obowiązkowego konta online. Nie jest to polityka strony WWW, systemu Android, Google Play ani dawnych usług chmurowych. Ich odrębne zasady nie zmieniają obowiązków wydawcy dotyczących jego własnego przetwarzania.

## 2. Dane i cele lokalnego przetwarzania

KOVA używa wybranych lub wpisanych przez Ciebie danych do realizacji funkcji na urządzeniu:

- Nazwa profilu lokalnego, lokalny identyfikator i preferencje: rozdzielenie danych profilu, język, waluta i ustawienia.
- Konta finansowe, salda, kwoty, waluty, daty, opisy, kategorie, transakcje, zwroty i przelewy: ewidencja oraz wyliczenia.
- Budżety, cele, długi, płatności cykliczne i majątek: planowanie i lokalne zestawienia.
- Profile pracy, stawki, godziny, przerwy i dane potrzebne do szacowania wynagrodzeń: rejestracja pracy i prognozy.
- Notatki, zadania, listy, wydarzenia, paragony, wybrane zdjęcia i odnośniki do plików: treści tworzone przez użytkownika i lokalny OCR.
- Wyniki obliczeń i techniczny stan aplikacji: raporty, odtworzenie sesji i niezawodny zapis.

Nie wpisuj zbędnych haseł bankowych, kodów uwierzytelniających, pełnych danych kart ani szczególnie wrażliwych informacji. Notatki i zdjęcia mogą zawierać dane innych osób; ogranicz je do niezbędnego zakresu i korzystaj z nich zgodnie z prawem.

## 3. Brak usług chmurowych w tej edycji

Wydanie nie udostępnia Firebase Authentication, logowania Google, synchronizacji serwerowej, Cloud Storage/Functions, analityki ani Crashlytics, zdalnych push, Remote Config, reklam, zakupów i subskrypcji, bankowych API, Wear OS, internetowego Family Sharing, notowań na żywo, usług AI ani Command Layer. Zwykłe przypomnienia lokalne nie są zdalnym push. Zachowany kod przyszłych funkcji nie oznacza ich aktywności.

Manifest wydania nie zawiera uprawnienia INTERNET i usuwa automatyczną inicjalizację wyłączonych usług. KOVA nie wysyła automatycznie Twoich zapisów do wydawcy i nie daje mu zdalnego dostępu do lokalnej bazy. Nie oznacza to, że cały telefon, sklep lub wybrany dostawca plików nie korzystają z sieci. Nie jest to też certyfikat braku jakichkolwiek błędów bezpieczeństwa.

## 4. Uprawnienia, OCR i urządzenie

Aparat jest opcjonalny, do zdjęć paragonów. Możesz zamiast tego wybrać zdjęcie przez systemowy selektor; nie wymaga to zgody na aparat. OCR używa modeli dołączonych do aplikacji, bez wysyłania zdjęcia do zdalnego rozpoznawania. Sprawdź kwotę, walutę, datę i treść przed zapisem — rozpoznawanie może się pomylić.

Powiadomienia służą lokalnym przypomnieniom i zależą od ustawień Androida. Opcjonalna biometria korzysta z systemowego uwierzytelniania; KOVA nie otrzymuje wzorca odcisku ani twarzy. Uprawnienia można zmienić w ustawieniach Androida. Odmowa ogranicza daną funkcję, nie stanowi zgody na przesyłanie danych. Wersja offline nie używa mikrofonu, reklamowego identyfikatora ani usług lokalizacji. Dostęp do wybranego pliku zależy także od jego dostawcy.

## 5. Ochrona i jej granice

Główna baza finansowa korzysta z SQLCipher. Materiał klucza konkretnej instalacji jest chroniony z wykorzystaniem Android Keystore; nie jest to przenośne hasło backupu. Nie wszystkie zdjęcia, pliki pomocnicze, ustawienia, eksporty ani treści widoczne na ekranie są objęte szyfrowaniem tej bazy. Zabezpiecz telefon i dostęp do plików. Szyfrowanie nie gwarantuje ochrony przed przejętym lub odblokowanym urządzeniem, złośliwym oprogramowaniem, utratą klucza czy ujawnieniem przez użytkownika.

## 6. Ręczny eksport i odtwarzanie

Ręczny eksport to częściowa kopia obsługiwanego zakresu, chroniona hasłem, a nie obraz całej instalacji. Obejmuje obsługiwane rekordy finansowe i zapisane konfiguracje, m.in. pracy, oraz obrazy osadzone w dokumencie notatki. Nie kopiuje preferencji aplikacji, kluczy instalacji, konfiguracji widżetów, historii powiadomień, pomocniczych kolejek synchronizacji ani wszystkich pamięci podręcznych. Zewnętrzne zdjęcia paragonów i załączniki plikowe nie są kopiowane. Zapisany URI lub odnośnik nie jest kopią zawartości: plik może przestać być dostępny po przeniesieniu, usunięciu lub utracie uprawnienia. Zabezpiecz te pliki osobno.

Sam wybierasz miejsce eksportu w systemowym wyborze pliku. Wybór chmurowego dostawcy lub udostępnienie pliku innej aplikacji może spowodować przekazanie danych według jej zasad. KOVA nie wysyła backupu automatycznie. Przechowuj kopię i silne hasło bezpiecznie, najlepiej oddzielnie. Wydawca nie przechowuje klucza odzyskiwania tego hasła. Po potwierdzeniu import zastępuje obsługiwany zakres danych wybranego profilu. Odtworzenie kompatybilnej kopii lokalnej do innej instalacji wymaga świadomego potwierdzenia; nie przejmuje automatycznie dawnych kont cloud ani wielu właścicieli.

## 7. Przechowywanie i usuwanie

Lokalne rekordy pozostają na urządzeniu do ich usunięcia lub zastąpienia przez użytkownika; dane pomocnicze i cache zależą od działania aplikacji i Androida, bez zadeklarowanego tutaj stałego terminu czyszczenia. Poszczególne rekordy usuwaj dostępnymi funkcjami aplikacji. Aby usunąć dane instalacji, użyj ustawień Androida: Aplikacje → KOVA → Pamięć → Wyczyść dane/pamięć; nazwy zależą od urządzenia. To działanie usuwa lokalne dane i może uniemożliwić odzyskanie bez kopii. Odinstalowanie również zwykle usuwa prywatne dane aplikacji.

Pliki wyeksportowane, kopie u zewnętrznych dostawców, oryginalne zdjęcia i kopie przekazane innym osobom trzeba usunąć osobno. Usunięcie rekordu nie jest obietnicą bezpiecznego nadpisania wszystkich fizycznych nośników. Automatyczny backup KOVA do chmury i transfer jej danych mechanizmem Androida są wyłączone w konfiguracji tego wydania; nie zastępuje to ręcznej kopii.

## 8. Kontakt, dane u operatora i prawa

Lokalne działanie nie wymaga przesłania danych wydawcy. Jeżeli skontaktujesz się z nim poza aplikacją, może otrzymać Twój adres kontaktowy, treść wiadomości oraz dobrowolne załączniki. Nie przesyłaj pełnej bazy, hasła kopii, kluczy ani rzeczywistych danych finansowych, jeśli nie jest to konieczne. Dokument nie upoważnia do żądania takich danych.

Obsługa kontaktu jest odrębnym przetwarzaniem. Przed uruchomieniem kanału operator musi określić cel i właściwą podstawę prawną, odbiorców/dostawców, ewentualne transfery poza EOG oraz okres lub kryteria retencji: [OWNER_INPUT_REQUIRED]. Nie twierdzimy, że offline wyłącza obowiązywanie RODO albo że zaakceptowanie tej polityki jest zgodą na dowolne przetwarzanie.

W zakresie, w jakim RODO ma zastosowanie do danych przetwarzanych przez operatora, przysługują właściwe w danej sytuacji prawa dostępu, sprostowania, usunięcia, ograniczenia, przenoszenia i sprzeciwu; zgodę można wycofać, jeżeli stanowi podstawę danego przetwarzania. Można wnieść skargę do właściwego organu nadzorczego, w Polsce Prezesa UODO, oraz skorzystać z ochrony sądowej. Żądania do operatora należy kierować na podany kontakt prywatności; terminy i ograniczenia wynikają z właściwych przepisów. Operator nie może zdalnie zmodyfikować bazy istniejącej wyłącznie na Twoim telefonie. Nie uzależniamy praw ustawowych od rezygnacji z roszczeń.

## 9. Dawne konta i odrębne usługi

To wydanie nie tworzy kont online. Według oświadczenia wydawcy z 20.10.2026 wcześniejsze wersje chmurowe były używane wyłącznie przez niego i konta testowe, bez zewnętrznych nietestowych użytkowników. Nie oferujemy więc użytkownikowi Offline V1 dostępu do dawnego konta cloud ani przenoszenia z niego danych. Oświadczenie o historii testów nie jest nowym audytem Firebase ani potwierdzeniem usunięcia danych testowych. Ta wersja nie usuwa dawnych zasobów. Ewentualne pytania o prywatność kieruj na wskazany kontakt.

## 10. Dzieci, zmiany i pozostałe informacje

KOVA jest przeznaczona dla osób w wieku 13 lat i starszych, nie dla dzieci poniżej 13 lat. Planowana jest dystrybucja światowa, z uwzględnieniem dostępności sklepu i wymogów poszczególnych krajów; nie jest to obietnica dostępności w każdym kraju. Jeśli lokalne prawo wymaga udziału rodzica lub opiekuna w korzystaniu albo w określonym przetwarzaniu danych, sam ukończony 13. rok życia nie zastępuje takiego wymogu. Ten dokument nie twierdzi, że aplikacja weryfikuje wiek lub zbiera zgodę opiekuna. Zgoda na przetwarzanie danych i zdolność do zawarcia umowy to odrębne kwestie.

Krótko: Twoje wpisy są na telefonie. Nie logujesz się do chmury. Zabezpiecz telefon, rób ręczne kopie i nie udostępniaj hasła. Jeśli Ty lub Twój opiekun macie pytania o dane, napiszcie na kontakt prywatności; nie wysyłajcie haseł, dokumentów tożsamości ani pełnej bazy.

Wyniki lokalnych analiz służą użytkownikowi; KOVA nie wydaje w imieniu operatora decyzji o kredycie, zatrudnieniu ani uprawnieniach. Nie jest to deklaracja dotycząca niezależnych działań innych podmiotów. Aplikacja nie prowadzi reklamowego śledzenia ani nie wymaga zgody na analityczne cookies; ewentualna strona WWW wymaga własnej oceny.

Aktualna polityka powinna być dostępna w Ustawieniach i pod zatwierdzonym publicznym adresem. Zmiany mają wskazywać nową wersję i rzeczywistą datę obowiązywania, bez wstecznego upoważniania do nowych celów. Ewentualne przyszłe usługi online wymagają nowych informacji i właściwych podstaw, nie samej zmiany tego tekstu. Informacje o bibliotekach są w Ustawieniach. Zobacz również [Regulamin](terms-of-service-pl.md).
