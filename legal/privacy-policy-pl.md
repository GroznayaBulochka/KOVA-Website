# Polityka prywatności KOVA

Data wejścia w życie: July 26, 2026  
Ostatnia aktualizacja: July 26, 2026

**Status bieżącej wersji:** Chmurowe AI paragonów jest wyłączone, a biblioteka kliencka Firebase Vertex AI/Gemini nie jest dołączona. Zdjęcia paragonów i tekst OCR są przetwarzane lokalnie i nie są wysyłane do dostawcy AI w chmurze. Zapisy poniżej opisujące chmurowe AI paragonów mają zastosowanie wyłącznie wtedy, gdy funkcja zostanie ponownie wprowadzona z osobnym ujawnieniem i właściwymi zabezpieczeniami serwerowymi. Bieżąca wersja nie zawiera również SDK reklam ani uprawnienia do identyfikatora reklamowego.

## 1. Wprowadzenie

Ta Polityka prywatności wyjaśnia, jak KOVA przetwarza informacje podczas korzystania z aplikacji KOVA na Androida, aplikacji KOVA na Wear OS, widgetów, skanowania paragonów, Family Sharing, funkcji AI, subskrypcji, reklam i funkcji wsparcia.

KOVA jest aplikacją do finansów osobistych i produktywności. Wiele podstawowych funkcji działa lokalnie na urządzeniu. Niektóre opcjonalne funkcje używają usług chmurowych, zewnętrznych SDK albo synchronizacji z innymi użytkownikami. Ten dokument rozdziela przetwarzanie lokalne, chmurowe, Family Sharing, zewnętrznych dostawców i funkcje opcjonalne.

## 2. Kto obsługuje KOVA

KOVA jest obsługiwana przez:

- Administrator / właściciel aplikacji: KOVA Financial
- Adres firmowy lub kontaktowy: Contact via email
- Kraj ustanowienia: Poland
- Kontakt prywatności: privacy@kova.example
- Kontakt wsparcia: support@kova.example

## 3. Zakres tej Polityki prywatności

Ta polityka dotyczy:

- aplikacji KOVA na Androida;
- aplikacji towarzyszącej KOVA na Wear OS;
- widgetów Android dostarczanych przez KOVA;
- ekranów prywatności, onboardingu i wsparcia w aplikacji;
- opcjonalnych funkcji chmurowych, takich jak Google Sign-In i Firebase Family Sharing;
- opcjonalnych funkcji lokalnego AI;
- reklam, zakupów i subskrypcji obsługiwanych przez zewnętrzne SDK.

Ta polityka nie zastępuje polityk prywatności zewnętrznych dostawców wymienionych poniżej.

## 4. Podsumowanie modelu danych KOVA

KOVA ma pięć głównych trybów przetwarzania danych:

1. Dane lokalne aplikacji: dane finansowe, notatki, archiwum paragonów, zadania, ustawienia i wiele ustawień AI są przechowywane na urządzeniu użytkownika.
2. Opcjonalne dane chmurowe z logowaniem: Google Sign-In i Firebase Auth przetwarzają tożsamość konta, gdy użytkownik się zaloguje.
3. Opcjonalne Family Sharing: wybrane zasoby są wysyłane do Cloud Firestore i udostępniane wybranym członkom rodziny.
4. Przetwarzanie paragonów: zdjęcia i tekst OCR są przetwarzane na urządzeniu; chmurowe AI paragonów jest wyłączone i nie jest zawarte w tej wersji.
5. Zewnętrzne SDK i dostawcy: reklamy, zakupy, dane rynkowe, rozpoznawanie mowy, komunikacja Wear OS i dostarczanie modelu mogą angażować zewnętrznych dostawców.

KOVA obecnie nie zapewnia realnego połączenia z kontem bankowym. Funkcja Connect Bank jest obecnie funkcją Coming Soon / placeholder.

## 5. Informacje przetwarzane przez KOVA

W zależności od używanych funkcji KOVA może przetwarzać:

- ustawienia profilu, pseudonim, avatar/ikonę oraz wybrany język i walutę;
- dane profilu konta Google, jeśli się zalogujesz;
- konta finansowe, salda, transakcje, kategorie, budżety, cele oszczędnościowe i płatności cykliczne;
- prognozy cash-flow, raporty, snapshoty KOVA Score i insighty finansowe;
- inwestycje, watchlisty i zapytania o dane rynkowe;
- notatki, listy zakupów, zadania, checklisty i pamięć cen;
- zdjęcia paragonów, tekst OCR, nazwy sklepów, daty zakupów, produkty, ceny, rabaty, sumy, kody kreskowe i informacje gwarancyjne;
- sugestie płatności wyodrębnione ze wspieranych powiadomień Androida;
- metadane Family Sharing, członków, zaproszenia, zasoby współdzielone i aktywność;
- ustawienia powiadomień i historię powiadomień;
- ustawienia widgetów i treść wyświetlaną w widgetach;
- ustawienia asystenta AI, lokalną pamięć i historię komend;
- status subskrypcji, uprawnień i limitów;
- identyfikatory i dane SDK związane z reklamami, gdy reklamy są włączone lub zainicjalizowane.

## 6. Dane przechowywane lokalnie na urządzeniu

KOVA przechowuje główne dane aplikacji w bazie Room o nazwie `kova_database`. Obecna implementacja używa szyfrowania SQLCipher. KOVA używa też preferencji szyfrowanych mechanizmami Android Keystore dla wielu wrażliwych ustawień, w tym ustawień aplikacji, passphrase bazy danych, ustawień AI, historii komend AI, ustawień powiadomień, danych subskrypcji/limitów i części zabezpieczeń widgetów.

Lokalna baza może zawierać:

- konta i salda;
- transakcje, kategorie i notatki;
- budżety, cele i płatności cykliczne;
- inwestycje i instrumenty rynkowe;
- notatki notebooka, zakupy i zadania;
- paragony, pozycje paragonów, rabaty i gwarancje;
- produkty i obserwacje cen produktów;
- sugestie wykrytych płatności;
- wydarzenia osi czasu;
- snapshoty KOVA Score;
- lokalną historię powiadomień.

Nie każda lokalna preferencja jest szyfrowana. Część aktualnych ustawień albo starszych magazynów używa zwykłych Android SharedPreferences, w tym włączenie wykrywania płatności, akceptacja warunków Gemma, część konfiguracji widgetów, czas reklam godzinowych, reguły sklepów/kategorii dla paragonów i część starszych danych historii cen.

Tymczasowe pliki lokalne mogą obejmować:

- zdjęcia paragonów w cache aplikacji;
- wygenerowane pliki PDF paragonów w cache aplikacji;
- tymczasowe pliki skanowania;
- pliki lokalnego modelu AI i markery weryfikacji;
- pliki cache LiteRT-LM.

Wyczyszczenie danych aplikacji albo odinstalowanie KOVA może usunąć dane lokalne, chyba że wcześniej utworzysz eksport lub backup. Wyeksportowane pliki pozostają w miejscu, w którym je zapiszesz.

## 7. Konto i Google Sign-In

Google Sign-In jest opcjonalny, chyba że korzystasz z funkcji wymagającej uwierzytelnienia, takiej jak Family Sharing.

Po zalogowaniu KOVA używa Android Credential Manager, Google ID i Firebase Authentication. KOVA może przetwarzać:

- Firebase UID;
- adres e-mail konta Google;
- nazwę wyświetlaną;
- URL zdjęcia profilowego;
- stan uwierzytelnienia;
- ograniczoną migawkę osiągnięć zawierającą identyfikatory odblokowanych osiągnięć i czas aktualizacji.

Te metadane konta są zapisywane pod Firebase UID potwierdzonym przez Google Sign-In. Zmiana lokalnej nazwy wyświetlanej lub nazwy użytkownika nie może zmienić własności konta, dostępu do Rodziny ani uprawnień subskrypcji. Status subskrypcji jest zapisywany wyłącznie na podstawie danych Google Play zweryfikowanych przez serwer, a dostęp do Rodziny jest przechowywany osobno jako członkostwo powiązane z UID.

KOVA nie otrzymuje hasła do konta Google. Samo logowanie Google nie przesyła kont, transakcji, budżetów, paragonów ani notatek: pozostają lokalne, chyba że jawnie użyjesz funkcji udostępniania, takiej jak Family Sharing. Wylogowanie czyści aktywną sesję Firebase/Credential Manager i lokalne metadane profilu Google zapisane w ustawieniach KOVA. Wylogowanie nie usuwa automatycznie lokalnych danych finansowych, lokalnych paragonów, lokalnych notatek ani danych chmurowych udostępnionych wcześniej przez Family Sharing.

## 8. Informacje finansowe

KOVA przetwarza informacje finansowe, które wpisujesz albo generujesz, w tym:

- nazwy i typy kont;
- salda i waluty;
- kwoty, daty, opisy i sprzedawców transakcji;
- kategorie i ikony;
- płatności cykliczne, rachunki i subskrypcje;
- budżety i cele oszczędnościowe;
- prognozy cash-flow;
- raporty i czynniki KOVA Score;
- inwestycje i watchlisty.

Większość danych finansowych jest domyślnie przechowywana lokalnie. Wybrane dane finansowe mogą opuścić urządzenie, jeśli udostępnisz je przez Family Sharing. Zapytania o instrumenty i dane inwestycyjne mogą być wysyłane do zewnętrznych dostawców danych rynkowych. KOVA obecnie nie łączy się z realnymi kontami bankowymi ani nie importuje transakcji bankowych przez Open Banking.

## 9. Notebook, listy zakupów i zadania

KOVA może przechowywać lokalnie notatki, listy zakupów, produkty, pamięć cen, zadania, checklisty, powiązane rekordy i metadane. Jeśli korzystasz z Family Sharing, wybrane notatki, listy zakupów lub zadania mogą być wysłane do Firestore i udostępnione członkom rodziny zgodnie z rolą i ustawieniami udostępniania.

## 10. Skanowanie paragonów i OCR

Workflow paragonów w KOVA może przetwarzać:

- zdjęcie paragonu zrobione przez CameraX;
- tekst OCR wygenerowany ze zdjęcia;
- dane kodów kreskowych;
- nazwę sklepu;
- datę i godzinę zakupu;
- produkty, ilości, ceny, rabaty i sumy;
- identyfikatory paragonu i informacje gwarancyjne;
- URI obrazu paragonu i metadane archiwum.

Przechwycenie zdjęcia, OCR, skan kodów, deterministyczny parser paragonu, walidacja i lokalne archiwum paragonów są wykonywane lokalnie na urządzeniu. KOVA używa Google ML Kit Text Recognition i Barcode Scanning SDK do lokalnego rozpoznawania. Zdjęcia paragonów mogą tymczasowo pozostać w cache aplikacji. Po zapisaniu lub archiwizacji paragonu jego rekordy i pozycje mogą być zapisane w lokalnej szyfrowanej bazie.

Obecna wersja nie wysyła zdjęć paragonów ani tekstu OCR do chmurowego AI.

## 11. Chmurowe AI paragonów (niedostępne w tej wersji)

KOVA nie zawiera chmurowego AI paragonów w obecnej wersji. OCR, deterministyczne parsowanie, lokalne czyszczenie i ręczna weryfikacja pozostają dostępne na urządzeniu. Każda przyszła implementacja chmurowa wymaga przed wydaniem zaktualizowanych ujawnień, zgody oraz serwerowej kontroli uprawnień, limitów i nadużyć.

Ważne informacje:

- funkcja chmurowa jest wyłączona, a jej zależność SDK jest nieobecna;
- lokalny OCR i ręczna weryfikacja są nadal dostępne bez AI w chmurze;
- obecna implementacja nie wysyła do chmurowego AI ani tekstu, ani zdjęć paragonów;
- KOVA maskuje przed wysłaniem długie sekwencje 13-19 cyfr wyglądające jak numery kart;
- maskowanie nie gwarantuje usunięcia każdego pola identyfikującego;
- OCR paragonu może nadal zawierać nazwy sklepów, adresy, daty, nazwy produktów, ceny, numery podatkowe, numery paragonów albo inne szczegóły;
- odpowiedzi mogą być logowane w buildach debug i powinny być traktowane ostrożnie podczas developmentu/testów.

KOVA nie śledzi ani nie reklamuje limitu chmurowego AI paragonów. KOVA Support jest wsparciem rozwoju i nie odblokowuje nielimitowanych ani chmurowych funkcji AI.

## 12. Lokalne przetwarzanie AI

KOVA może używać opcjonalnego lokalnego modelu Gemma przez LiteRT-LM. Model może być dostarczany przez Google Play Asset Delivery albo inną zweryfikowaną ścieżkę HTTPS skonfigurowaną przez właściciela aplikacji. Po pobraniu i weryfikacji modelu inferencja odbywa się na urządzeniu.

Lokalne AI może przetwarzać:

- prompty użytkownika;
- kontekst finansowy, jeśli jest włączony;
- kontekst notebooka, jeśli jest włączony;
- prompty do czyszczenia OCR paragonów;
- tekst komend AI i żądania sterowania aplikacją.

Prompty lokalnego AI nie muszą być wysyłane do Firebase AI. Pliki modelu zajmują pamięć urządzenia. Dostępność lokalnego AI zależy od pamięci RAM, miejsca na dysku, zgodności runtime i udanej weryfikacji modelu. Użycie może wymagać akceptacji Gemma Terms of Use i zasad zabronionego użycia.

Lokalne AI jest osobne od Firebase AI receipt enhancement.

## 13. Wykrywanie powiadomień o płatnościach

KOVA zawiera opcjonalne wykrywanie powiadomień o płatnościach. Ta funkcja nie jest potrzebna do podstawowego budżetowania.

Jeśli wyraźnie włączysz tę funkcję i przyznasz Android Notification Access, listener powiadomień KOVA może otrzymywać treści powiadomień z Androida. Obecny parser skupia się na obsługiwanych powiadomieniach płatniczych, zwłaszcza Google Wallet (`com.google.android.apps.walletnfcrel`). Obsługę powiadomień bankowych należy traktować jako niepełną, dopóki nie zostaną dodane dodatkowe parsery.

KOVA może wyodrębniać:

- pakiet aplikacji źródłowej;
- tekst sprzedawcy;
- kwotę;
- walutę;
- timestamp/fingerprint;
- poziom pewności.

Wykryte płatności są przechowywane lokalnie jako sugestie ze statusem `PENDING`. KOVA nie dodaje automatycznie transakcji z wykrytego powiadomienia; możesz przejrzeć, dodać albo odrzucić sugestię. Usunięcie oryginalnego powiadomienia Androida nie musi usuwać sugestii zapisanej już w KOVA.

Możesz wyłączyć wykrywanie płatności w KOVA i cofnąć Notification Access w ustawieniach Androida. Ponieważ Android przyznaje listenerowi dostęp na poziomie usługi, KOVA może technicznie otrzymać metadane powiadomienia przed decyzją, czy pochodzi ono z obsługiwanego źródła płatności.

## 14. Family Sharing

Family Sharing używa Firebase Auth i Cloud Firestore. Wymaga zalogowanego konta.

Gdy tworzysz rodzinę, dołączasz do niej albo jej używasz, KOVA może przechowywać w Firestore:

- metadane rodziny, takie jak nazwa, opis, ikona/emoji/kolor i status;
- UID właściciela;
- UID członka, nazwę, email, URL zdjęcia i rolę;
- zaproszenia, kody zaproszeń, rolę, termin ważności i liczbę użyć;
- aktywności;
- metadane zasobów współdzielonych i uprawnienia;
- wybrane treści współdzielone.

Treści współdzielone mogą obejmować:

- konta i salda;
- transakcje, jeśli zdecydujesz się je udostępnić;
- cele i płatności cykliczne;
- notatki;
- listy zakupów i produkty;
- zadania/checklisty;
- aktywność rodziny.

KOVA jest prywatna domyślnie w tym sensie, że lokalne dane finansowe nie są automatycznie wysyłane tylko dlatego, że używasz lokalnej aplikacji. To użytkownik wybiera funkcje i zasoby Family Sharing. Inni członkowie rodziny mogą przeglądać lub edytować zasoby zgodnie z przypisaną rolą i uprawnieniami.

Zatrzymanie udostępniania albo usunięcie rodziny może usunąć lub odwołać dostęp do współdzielonych danych w chmurze zgodnie z implementacją i regułami Firestore. Nie usuwa to koniecznie oryginalnych danych lokalnych użytkownika. Usunięcie rodziny jest zaimplementowane jako soft delete dokumentu rodziny, z czyszczeniem indeksu członkostwa przynajmniej dla bieżącego użytkownika.

## 15. Inwestycje i dane rynkowe

KOVA może wyświetlać inwestycje, watchlisty, wyniki wyszukiwania, wykresy, snapshoty rynkowe i newsy. Ceny oraz wyszukiwanie korzystają z endpointów Yahoo Finance, a odnośniki do wiadomości z Google News RSS. Oznaczenia akcji są generowane lokalnie; ta wersja nie kontaktuje się z zewnętrznymi dostawcami logo.

Dostawcy ci mogą otrzymywać techniczne informacje żądań, takie jak wyszukiwane symbole, identyfikatory instrumentów, zakresy/interwały, adres IP, metadane urządzenia/sieci i dane podobne do user-agenta. Dane rynkowe mogą być opóźnione, niepełne albo dostarczane przez strony trzecie. KOVA nie jest poradą inwestycyjną.

## 16. Głos i rozpoznawanie mowy

KOVA używa mikrofonu tylko wtedy, gdy aktywujesz opcjonalne wejście głosowe. Wejście głosowe jest używane w asystencie AI na Androidzie i w aplikacji Wear OS.

Audio może być przetwarzane przez systemowy Android SpeechRecognizer albo usługę mowy Google/systemową, zależnie od urządzenia i ustawień. KOVA nie wygląda na aplikację przechowującą surowe audio. Rozpoznany tekst może być przekazany do lokalnego asystenta albo odpowiedniej funkcji KOVA. Systemowi dostawcy rozpoznawania mowy mają własne praktyki prywatności.

## 17. Kamera i obrazy

Uprawnienie kamery jest używane do skanowania paragonów. Zdjęcia paragonów służą do OCR i mogą być tymczasowo przechowywane w cache aplikacji. Jeśli zapiszesz paragon, KOVA może lokalnie przechować metadane paragonu i informację o URI obrazu.

Zdjęcia profilu, kategorii albo rodziny mogą być przechowywane jako lokalne lub zdalne URI. Jeśli używany jest zdalny URL, KOVA może pobrać obraz z tego hosta.

## 18. Powiadomienia

KOVA może tworzyć lokalne rekordy powiadomień i systemowe powiadomienia Android dla:

- wykrytych płatności;
- alertów budżetowych;
- milestone'ów celów;
- ryzyk cash-flow;
- paragonów i statusu AI paragonów;
- gwarancji;
- aktualizacji rodzinnych;
- zdarzeń systemowych.

Na Androidzie 13 i nowszych KOVA prosi o pozwolenie na powiadomienia przed pokazaniem powiadomień systemowych. KOVA ma ustawienia kategorii i prywatności ekranu blokady. Gdy szczegóły na ekranie blokady są wyłączone, KOVA pokazuje ogólny tekst zamiast szczegółów finansowych.

Ustawienia quiet hours istnieją, ale obecna implementacja nie powinna być przedstawiana jako kompletny system odraczania/wyciszania, dopóki zachowanie nie zostanie ukończone i zweryfikowane.

## 19. Reklamy

KOVA nie zawiera Google Mobile Ads / AdMob SDK i nie deklaruje uprawnienia Android Advertising ID w obecnej wersji.

Aplikacja nie zawiera ustawienia reklam ani logiki ładowania reklam interstitial. Reklamy nie mogą zostać włączone w przyszłości bez nowego przeglądu prywatności i przepływu zgody wymaganego przez prawo lub zasady platformy.

## 20. Zakupy i subskrypcje

KOVA Support, donacje i subskrypcje są obsługiwane przez Google Play Billing. KOVA może przetwarzać:

- identyfikatory produktów;
- status zakupu;
- uprawnienie subskrypcyjne;
- plan/status/źródło;
- zweryfikowany przez serwer status wsparcia/uprawnienia i termin ważności.

Dane kart płatniczych są obsługiwane przez Google Play i nie są bezpośrednio otrzymywane przez KOVA. W celu weryfikacji aplikacja wysyła token zakupu, identyfikator produktu i typ produktu do uwierzytelnionej funkcji Firebase. Funkcja przekazuje token do Google Play Developer API, sprawdza stan zakupu, termin ważności i skrócone powiązanie z kontem, a dopiero potem zapisuje wiążące uprawnienie serwerowe. KOVA zapisuje w Firestore skrót SHA-256 tokenu, UID właściciela, produkt/status i termin ważności; nie zapisuje surowego tokenu zakupu. Aplikacja potwierdza lub konsumuje zakup dopiero po pomyślnej weryfikacji serwerowej.

## 21. Wear OS i synchronizacja urządzeń

Aplikacja KOVA Wear OS komunikuje się z telefonem przez Google Play Services Wearable APIs. Telefon jest zwykle głównym źródłem prawdy.

Dane Wear OS mogą obejmować:

- podsumowania salda i kont;
- szybkie dane transakcji;
- transakcje oczekujące, gdy telefon jest niedostępny;
- pytania i odpowiedzi AI;
- dane podsumowań dla kafelka i komplikacji.

Aplikacja Wear OS zapisuje podsumowania i oczekujące transakcje w lokalnych SharedPreferences zegarka.

## 22. Widgety

Widgety Android KOVA mogą pokazywać informacje finansowe albo notebook na ekranie głównym urządzenia, w tym podsumowanie budżetu, cele, limity, notatki, listy zakupów, zadania, wejścia Jarvis/AI i szybkie transakcje kategorii.

Treść widgetu może być widoczna dla każdej osoby mającej dostęp do odblokowanego urządzenia albo ekranu głównego. KOVA zawiera ustawienia takie jak ukrywanie kwot i preferencje widgetów, ale należy unikać umieszczania wrażliwych widgetów tam, gdzie mogą je zobaczyć inni.

## 23. Backup, eksport, import i restore

KOVA obsługuje tworzone przez użytkownika pliki backupu/eksportu oraz import/restore przez wybranego dostawcę plików Android, np. pamięć lokalną, Google Drive, OneDrive albo inny provider Storage Access Framework.

Eksport może obejmować konta, transakcje, kategorie, cele, notebook, płatności cykliczne i inwestycje. Aktualny payload backupu/eksportu nie obejmuje pełnych ustawień aplikacji ani konfiguracji widgetów. KOVA obsługuje też hasłem zabezpieczone szyfrowane backupy używające AES/GCM z PBKDF2.

To użytkownik odpowiada za miejsce przechowywania wyeksportowanych plików i za to, kto ma do nich dostęp. Import/restore backupu może zastąpić bieżące lokalne dane aplikacji.

Backup systemowy Android/Google jest ograniczony. Sprawdzone reguły backupu wykluczają shared preferences, bazy danych i pliki lokalnego modelu AI ze zwykłego Android cloud backup i transferu urządzenia, ponieważ szyfrowane dane używają kluczy powiązanych z urządzeniem. Do przenośnej kopii obsługiwanych danych KOVA użyj ręcznego eksportu.

## 24. Zewnętrzni dostawcy usług

KOVA może używać poniższych dostawców zależnie od funkcji:

| Dostawca | Cel | Kategoria danych | Opcjonalne? | Polityka dostawcy |
|---|---|---|---|---|
| Google Firebase Authentication | logowanie i tożsamość | UID, email, profil, stan auth | tak, poza funkcjami wymagającymi logowania | https://policies.google.com/privacy |
| Google Cloud Firestore | Family Sharing | dane rodziny, członkowie, zasoby | tak | https://firebase.google.com/support/privacy |
| Google ML Kit | lokalny OCR/kody | przetwarzanie obrazu/tekstu skanu | przy skanowaniu | https://developers.google.com/ml-kit/terms |
| Google Play Services / Credential Manager | logowanie, Wear, usługi systemowe | konto i metadane usługi | zależnie od funkcji | https://policies.google.com/privacy |
| Google Play Billing / Payments | subskrypcje i zakupy | produkt, zakup, entitlement | tak | https://payments.google.com/legaldocument?family=0.privacynotice |
| Google Play Asset Delivery | dostarczenie lokalnego modelu AI | metadane dostarczenia asset pack | tylko dla lokalnego AI | https://policies.google.com/privacy |
| Android/system speech recognition | wejście głosowe | audio i rozpoznany tekst | tak | polityka dostawcy systemowego |
| Yahoo Finance | wyszukiwanie/wykresy | symbole, zakresy, request metadata | tak | https://legal.yahoo.com/us/en/yahoo/privacy/index.html |
| Google News RSS | newsy rynkowe | query i metadane żądania | tak | https://policies.google.com/privacy |
| Hugging Face / hosting modelu, jeśli skonfigurowany | źródło/download modelu | metadane pobrania modelu | tylko jeśli użyte | https://huggingface.co/privacy |
| Google AI / Gemma | warunki lokalnego modelu | relacja licencyjna/warunki | lokalne AI | https://ai.google.dev/gemma/terms |

Sprawdzony kod nie pokazuje aktywnego użycia Firebase Analytics, Crashlytics, Cloud Messaging, Firebase Storage, Remote Config, Performance Monitoring ani App Check.

## 25. Cele przetwarzania

KOVA przetwarza informacje, aby:

- zapewnić budżetowanie i zarządzanie kontami;
- przechowywać i wyświetlać treści finansowe i notebook użytkownika;
- generować raporty, prognozy, insighty i KOVA Score;
- skanować, parsować i archiwizować paragony;
- wykrywać sugestie płatności ze wspieranych powiadomień;
- synchronizować wybrane zasoby Family Sharing;
- uwierzytelniać użytkowników;
- przetwarzać subskrypcje i uprawnienia KOVA Support;
- wyświetlać albo przygotowywać reklamy;
- dostarczać informacje inwestycyjne i rynkowe;
- generować przypomnienia i powiadomienia;
- zabezpieczać aplikację przez szyfrowanie lokalne, app lock i uprawnienia;
- obsługiwać backup/eksport/import;
- diagnozować i wspierać aplikację.

## 26. Podstawy prawne, gdy mają zastosowanie

Jeśli obowiązuje GDPR/RODO lub prawo EEA, dokładna podstawa prawna musi zostać potwierdzona przez właściciela aplikacji i prawnika prywatności. Ogólnie:

- Umowa albo żądana usługa może dotyczyć funkcji budżetu, kont, Family Sharing, subskrypcji lub wsparcia, o które prosisz.
- Zgoda może dotyczyć opcjonalnego AI paragonów w chmurze, mikrofonu, kamery, Notification Access, opcjonalnej zgody reklamowej tam, gdzie jest wymagana, i decyzji o udostępnianiu zasobów.
- Uzasadniony interes może dotyczyć bezpieczeństwa, zapobiegania nadużyciom, niezawodności usługi i debugowania, pod warunkiem testu równowagi.
- Obowiązek prawny może dotyczyć danych potrzebnych do podatków, księgowości, ochrony konsumentów lub zgodności z prawem.

Możesz wycofać zgodę na funkcje opcjonalne przez ustawienia aplikacji albo systemu, ale nie musi to wpływać na przetwarzanie już zakończone.

## 27. Udostępnianie danych i ujawnienia

KOVA może ujawniać albo udostępniać dane:

- dostawcom wymienionym powyżej, gdy używasz powiązanych funkcji;
- członkom rodziny, którym wybierzesz udostępnianie przez Family Sharing;
- Google Play dla zakupów i subskrypcji;
- Google albo dostawcom systemowym dla rozpoznawania mowy, reklam, logowania, dostarczania modelu lub usług Wear;
- gdy wymaga tego prawo, procedura prawna albo ochrona praw, bezpieczeństwa i ochrony;
- jeśli właściciel aplikacji przeniesie aplikację/biznes, zgodnie z prawem i wymaganymi powiadomieniami.

KOVA nie wysyła domyślnie wszystkich lokalnych danych. Przetwarzanie chmurowe zależy od użycia funkcji i ustawień.

## 28. Międzynarodowe transfery danych

Zewnętrzni dostawcy, tacy jak Google/Firebase, Yahoo, Google News i Hugging Face, mogą przetwarzać dane w krajach innych niż Twój. Jeśli obowiązuje GDPR/RODO lub podobne prawo, administrator musi potwierdzić mechanizmy transferu i umowy z dostawcami przed publikacją.

## 29. Retencja danych

KOVA nie definiuje w kodzie stałych okresów retencji dla każdej kategorii. O ile nie wykonasz konkretnej akcji usunięcia:

- dane lokalne są przechowywane do czasu usunięcia rekordów, wyczyszczenia danych aplikacji albo odinstalowania aplikacji;
- pliki eksportu są przechowywane tam, gdzie je zapiszesz;
- dane Family Sharing są przechowywane, gdy istnieje rodzina/zasób, albo do czasu usunięcia, zatrzymania lub odwołania, z zastrzeżeniem zachowania Firestore i reguł bezpieczeństwa;
- dane Firebase/Auth są przechowywane zgodnie z Firebase/Google i procesem zarządzania kontem właściciela aplikacji;
- dane reklamowe są obsługiwane zgodnie z politykami Google Mobile Ads;
- dane zakupów są przechowywane tak długo, jak potrzebne do weryfikacji uprawnień i zgodności z Google Play/prawem.

Dokładne okresy retencji wymagają ręcznego potwierdzenia: as required by financial regulations.

## 30. Usuwanie danych

Wiele lokalnych rekordów możesz usuwać bezpośrednio w KOVA. Możesz też wyczyścić dane aplikacji albo odinstalować KOVA, aby usunąć lokalny storage z urządzenia, z zastrzeżeniem wyeksportowanych plików i zachowania backupu Android.

Wylogowanie kończy sesję uwierzytelnienia i czyści lokalne metadane profilu Google, ale nie usuwa lokalnych danych finansowych ani wszystkich danych chmurowych wcześniej udostępnionych.

Zatrzymanie udostępniania albo usunięcie rodziny może usunąć lub odwołać dostęp do danych Family Sharing w chmurze, ale nie musi usuwać oryginalnych danych lokalnych.

Zarządzanie subskrypcją i anulowanie odbywa się przez Google Play.

KOVA udostępnia **Ustawienia → Dane → Usuń konto chmurowe**. Po ponownym potwierdzeniu tego samego konta Google chroniona operacja serwerowa blokuje nowy dostęp do chmury, usuwa profil Firebase i członkostwa, rekursywnie usuwa chmurowe przestrzenie rodzinne, których jesteś właścicielem, oraz usuwa konto Firebase Authentication. Przestrzenie należące do innej osoby pozostają, ale Twoje członkostwo jest usuwane. Ta operacja nie usuwa danych zapisanych wyłącznie na urządzeniu ani plików eksportu. Bramka wydania wymaga wdrożenia i testu funkcji usuwania przed publikacją.

## 31. Bezpieczeństwo

KOVA używa kilku zabezpieczeń:

- szyfrowania SQLCipher dla głównej bazy Room;
- EncryptedSharedPreferences dla wielu wrażliwych ustawień;
- ochrony kluczy Android Keystore tam, gdzie ma zastosowanie;
- opcjonalnego PIN-u aplikacji i biometrii/blokady urządzenia;
- szyfrowanych plików eksportu chronionych hasłem;
- ról i uprawnień Family Sharing;
- kontrolowanych przez użytkownika uprawnień Androida.

Część ustawień pozostaje w zwykłych SharedPreferences, a żaden system przechowywania lub transmisji nie może być gwarantowany jako całkowicie bezpieczny.

## 32. Wybory i kontrola użytkownika

W zależności od urządzenia i wersji aplikacji możesz:

- używać KOVA jako gość do lokalnego budżetowania;
- zalogować się lub wylogować z Google;
- kontynuować lokalny OCR/ręczną weryfikację bez AI w chmurze;
- włączyć lub wyłączyć wykrywanie płatności;
- cofnąć Notification Access w ustawieniach Androida;
- przyznać lub odmówić kamerze, mikrofonowi i powiadomieniom;
- kontrolować kategorie powiadomień i szczegóły na ekranie blokady;
- ukrywać kwoty w częściach aplikacji;
- wybierać zasoby Family Sharing i zatrzymywać udostępnianie;
- usuwać lokalne rekordy;
- eksportować lub importować backupy;
- zarządzać subskrypcją KOVA Support w Google Play;
- dostosować ustawienia reklam przez KOVA, Android, Google lub regionalne narzędzia zgody, jeśli są dostępne.

## 33. Uprawnienia

| Uprawnienie / dostęp | Opcjonalne? | Cel | Jeśli odmówisz | Jak cofnąć |
|---|---|---|---|---|
| Kamera | tak | skanowanie paragonów | zdjęcia paragonów nie będą działać; ręczne wpisanie może pozostać dostępne | Android App Info > Permissions |
| Mikrofon | tak | opcjonalne wejście głosowe | wejście głosowe nie będzie działać | Android App Info > Permissions |
| Powiadomienia | tak | przypomnienia i alerty | powiadomienia systemowe mogą się nie pojawiać; rekordy w aplikacji mogą nadal istnieć | Android App Info > Notifications |
| Biometria/blokada urządzenia | tak | app lock / odblokowanie kwot | biometria nie będzie działać | ustawienia KOVA i ustawienia bezpieczeństwa Android |
| Notification Access | tak, specjalny dostęp | wykrywanie płatności z powiadomień | wykrywanie płatności nie będzie działać | Android Notification Access settings |
| Internet | zależne od funkcji | Firebase, AI, reklamy, billing, dane rynkowe, model, obrazy zdalne | funkcje chmurowe/zewnętrzne nie będą działać | blokada sieci na poziomie OS, jeśli dostępna |
| Advertising ID | zależne od konfiguracji | reklamy | reklamy/personalizacja mogą być ograniczone przez OS/Google | ustawienia reklam Android/Google |
| Usługi Wear | zależne od funkcji | synchronizacja telefon-zegarek, kafelki, komplikacje | funkcje Wear mogą nie działać | odinstalowanie/wyłączenie Wear app lub uprawnień |

## 34. Prywatność dzieci

KOVA nie jest przeznaczona dla dzieci poniżej 18. KOVA nie gromadzi świadomie danych osobowych dzieci poniżej tego wieku. Jeśli uważasz, że dziecko podało dane osobowe, skontaktuj się z privacy@kova.example. Próg wieku musi zostać potwierdzony przez właściciela aplikacji przed publikacją.

## 35. Prawa na podstawie GDPR/RODO i prawa EEA

Jeśli jesteś w EEA/UK albo innym regionie z podobnymi prawami, możesz mieć prawo do dostępu, sprostowania, usunięcia, ograniczenia, sprzeciwu, przenoszenia danych, wycofania zgody i skargi do organu nadzorczego.

Część danych jest przechowywana tylko lokalnie i jest bezpośrednio kontrolowana przez Ciebie na urządzeniu. Żądania dotyczące danych konta w chmurze, danych Family Sharing lub danych przetwarzanych przez dostawców należy wysyłać na privacy@kova.example. KOVA obecnie nie wygląda na aplikację automatycznie realizującą każde żądanie danych chmurowych w aplikacji.

## 36. Prawa w innych regionach

Mieszkańcy niektórych stanów USA lub innych regionów mogą mieć dodatkowe prawa dotyczące identyfikatorów, informacji finansowych, informacji handlowych, aktywności internetowej/urządzenia, identyfikatorów reklamowych, zakupów i żądań usunięcia.

Obecna wersja nie zawiera reklam ani udostępniania danych reklamowych. Każda przyszła funkcja reklamowa wymaga nowego przeglądu prawnego i zgód regionalnych.

## 37. Zmiany tej polityki

KOVA może aktualizować tę politykę, gdy zmienią się funkcje, dostawcy, uprawnienia albo wymogi prawne. Właściciel aplikacji powinien zaktualizować datę „Ostatnia aktualizacja” i przekazać odpowiednie powiadomienie, gdy wymaga tego prawo.

## 38. Kontakt

Pytania lub żądania dotyczące prywatności należy wysyłać na:

- Prywatność: privacy@kova.example
- Wsparcie: support@kova.example
- Adres: Contact via email

Nota tłumaczeniowa: ta polityka może być dostępna po angielsku, polsku i rosyjsku. [CONTROLLING LANGUAGE: English / Polish / Russian / other] będzie wersją rozstrzygającą w razie rozbieżności.

## Aneks A. Szczegółowy produkcyjny spis danych

Ten aneks ma sprawić, że polityka będzie kompletna operacyjnie dla aktualnej bazy kodu KOVA. Opisuje główne grupy danych przetwarzane przez aplikację, miejsce ich przechowywania oraz sytuacje, w których mogą opuścić urządzenie.

| Grupa danych | Przykłady | Domyślne miejsce | Kiedy mogą opuścić urządzenie |
|---|---|---|---|
| Dane konta i logowania | Identyfikator użytkownika Google/Firebase, e-mail, nazwa wyświetlana, URL zdjęcia profilowego, stan logowania | Urządzenie; Firebase Authentication | Gdy użytkownik loguje się przez Google/Firebase |
| Lokalne dane finansowe | Konta, salda, transakcje, kategorie, budżety, cele, płatności cykliczne, inwestycje, migawki wyniku KOVA | Szyfrowana lokalna baza danych na urządzeniu | Tylko jeśli użytkownik wybierze funkcję chmurową, np. Family Sharing, wyśle dane do zewnętrznej funkcji AI, wyeksportuje/udostępni plik albo w inny sposób świadomie je przekaże |
| Dane Family Sharing | Nazwa rodziny, UID właściciela, członkowie, role, zaproszenia, udostępnione zasoby, wspólne listy zakupów, aktywność | Cloud Firestore i lokalne urządzenie | Gdy użytkownik tworzy, dołącza do lub używa Family Sharing |
| Dane zakupów, notatek i zadań | Notatki, listy zakupów, pozycje list, tytuły/statusy zadań, lokalna aktywność | Szyfrowana lokalna baza danych; wybrane wspólne listy/pozycje mogą być w Cloud Firestore | Gdy użytkownik udostępnia je przez Family Sharing albo eksportuje/udostępnia |
| Dane paragonów | Obraz paragonu w pamięci cache, tekst OCR, sklep, data, pozycje, ceny, identyfikatory podatkowe/paragonu, gwarancje, rabaty | Tymczasowa pamięć cache obrazów i szyfrowana lokalna baza danych | Tekst OCR może być wysłany do Firebase Vertex AI/Gemini tylko po włączeniu opcjonalnego ulepszania paragonów przez AI |
| Dane kamery i kodów kreskowych | Zdjęcia paragonów, klatki kodów kreskowych, rozpoznane kody produktów | Strumień kamery na urządzeniu; cache/lokalna baza dla zapisanych paragonów i produktów | Domyślnie nie są wysyłane; użytkownik może je przekazać przez eksport/udostępnienie lub opcjonalne ulepszanie tekstu przez AI |
| Dane głosowe | Komendy/pytania głosowe przekształcone na tekst | Mechanizm rozpoznawania mowy Androida; rozpoznany tekst używany przez KOVA | Dźwięk jest przetwarzany przez dostawcę rozpoznawania mowy wybranego na urządzeniu; rozpoznany tekst może być użyty lokalnie albo wysłany tylko przy użyciu funkcji chmurowej |
| Dane lokalnego asystenta AI | Prompty, lokalna pamięć AI, ustawienia AI, stan/cache lokalnego modelu | Pamięć urządzenia; wrażliwe ustawienia są szyfrowane tam, gdzie wdrożono szyfrowanie | Prompty lokalnego modelu mają pozostawać na urządzeniu, chyba że użytkownik używa osobnej funkcji chmurowej |
| Opcjonalne pliki modelu Gemma/LiteRT | `gemma3-1b-it-int4.task` albo lokalny pakiet modelu KOVA, znacznik weryfikacji, lokalny cache | Pamięć aplikacji i cache na urządzeniu | Jeśli model jest pobierany z adresu zdalnego, żądanie pobrania może ujawniać metadane dostawcy hostingu |
| Dane dostępu do powiadomień | Pakiet powiadomienia Google Wallet, kwota, waluta, sprzedawca, pewność dopasowania, oczekująca sugestia transakcji | Listener powiadomień na urządzeniu i szyfrowana lokalna baza danych | Domyślnie nie są wysyłane |
| Dane powiadomień i przypomnień | Lokalne ustawienia powiadomień, historia powiadomień, stan przypomnień budżetu/gwarancji/przepływów | Pamięć urządzenia; wiele ustawień jest szyfrowanych | Domyślnie nie są wysyłane |
| Dane Wear OS | Podsumowania sald i kont, szybkie transakcje, oczekujące transakcje, podsumowania kafelków/komplikacji, pytania/odpowiedzi AI | Telefon i zegarek przez Google Play Services Wearable; zegarek może przechowywać podsumowania lokalnie | Przekazywane między sparowanym telefonem i zegarkiem użytkownika przez Google Play Services |
| Dane rynkowe/wyszukiwania | Tickery, symbole, zapytania, zakresy wykresów i zapytania RSS z wiadomościami | Endpointy Yahoo Finance i Google News oraz lokalny cache | Wysyłane do Yahoo Finance i Google News przy użyciu funkcji rynkowych; oznaczenia akcji są lokalne |
| Dane reklamowe | Nie są zbierane w obecnej wersji | Brak SDK reklam i uprawnienia Advertising ID | Nie są wysyłane |
| Dane zakupów/wsparcia | ID produktów, stan zakupu, skrót tokenu, powiązanie konta, status/termin uprawnienia | Google Play Billing, Firebase Functions, Google Play Developer API i rekordy serwerowe Firestore | KOVA otrzymuje status/tokeny zakupu, nie dane karty; surowe tokeny są weryfikowane, ale nie są zapisywane przez KOVA |
| Pliki kopii/eksportu | Eksporty JSON, szyfrowane kopie zapasowe, PDF-y, pliki udostępnione | Lokalizacja wybrana przez użytkownika, cache, systemowe udostępnianie Androida | Trafiają tam, gdzie użytkownik je zapisze lub udostępni |
| Diagnostyka i logi | Lokalne logi, logi odpowiedzi AI, jeśli są aktywne w buildzie/środowisku | System logowania urządzenia | Mogą być dostępne przez narzędzia debugowania/logowania urządzenia; build produkcyjny powinien unikać logowania danych wrażliwych |

## Aneks B. Matryca lokalnie/chmura według funkcji

| Funkcja | Lokalnie domyślnie | Warunek przetwarzania w chmurze/na zewnątrz | Kontrola użytkownika |
|---|---:|---|---|
| Ręczne budżety, konta i transakcje | Tak | Family Sharing, eksport/udostępnienie albo inne świadome przekazanie przez użytkownika | Użytkownik tworzy, edytuje, usuwa i eksportuje dane |
| Logowanie Google/Firebase | Nie | Wymagane, gdy użytkownik się loguje | Użytkownik może się wylogować; lokalne dane finansowe nie są automatycznie usuwane przez wylogowanie |
| Family Sharing | Nie | Używa Firebase Auth i Cloud Firestore | Użytkownik wybiera, co udostępnia; działania właściciela/członków mogą wpływać na dane wspólne |
| OCR paragonów | Tak | Tekst OCR może trafić do Firebase Vertex AI/Gemini, jeśli włączono ulepszanie paragonów przez AI | Użytkownik może zostawić ulepszanie AI wyłączone i korzystać z lokalnego/ręcznego procesu |
| Zdjęcie paragonu | Tak | Domyślnie nie jest wysyłane | Użytkownik kontroluje skanowanie i eksport/udostępnianie |
| Lokalna AI Gemma/LiteRT | Tak | Pobranie modelu może kontaktować się z hostem modelu; prompty są lokalne przy lokalnym wnioskowaniu | Użytkownik musi zaakceptować warunki modelu i może nie używać lokalnej AI |
| Komendy głosowe | Częściowo | Dostawca rozpoznawania mowy Androida przetwarza audio zgodnie z konfiguracją urządzenia | Uprawnienie mikrofonu Androida i kontrolki funkcji głosowych |
| Wykrywanie płatności z powiadomień | Tak | Nie znaleziono domyślnego zewnętrznego transferu sparsowanych sugestii | Wymaga dostępu do powiadomień Androida i włączenia w aplikacji |
| Wear OS companion | Nie, bo synchronizuje między urządzeniami | Google Play Services Wearable przekazuje dane między sparowanymi urządzeniami | Użytkownik kontroluje instalację/użycie i parowanie zegarka |
| Dane rynkowe i wiadomości | Nie | Yahoo Finance i Google News otrzymują metadane żądań oraz wyszukiwane symbole | Użytkownik kontroluje wyszukiwania i ekrany rynkowe; oznaczenia akcji są lokalne |
| Reklamy | Nie | Brak SDK reklam | Nie dotyczy obecnej wersji |
| Play Billing | Nie | Google Play obsługuje płatności i zwraca stan zakupu | Użytkownik kontroluje zakupy w Google Play |
| Ręczny eksport/import | Zależnie od użytkownika | Pliki mogą opuścić urządzenie do miejsca wybranego przez użytkownika | Użytkownik wybiera miejsce, hasło i udostępnienie |

## Aneks C. Matryca zgód, uprawnień i ustawień

KOVA stosuje warstwowy model zgód. Akceptacja tej Polityki prywatności lub Regulaminu nie oznacza automatycznego włączenia wszystkich funkcji opcjonalnych.

| Uprawnienie/ustawienie | Po co jest używane | Wymagane dla podstawowego budżetu? | Uwagi |
|---|---|---:|---|
| Internet/sieć | Logowanie, Family Sharing, dane rynkowe, reklamy, pobieranie modeli, chmurowe funkcje AI, billing i SDK dostawców | Częściowo | Budżet lokalny/offline może działać bez wielu funkcji online, ale część komponentów aplikacji wymaga sieci |
| Kamera | Skanowanie paragonów, kodów kreskowych i powiązane przepływy przechwytywania | Nie | Obrazy są domyślnie lokalne |
| Mikrofon/nagrywanie dźwięku | Komendy głosowe lub wprowadzanie mowy | Nie | Przetwarzanie audio zależy od konfiguracji rozpoznawania mowy Androida/urządzenia |
| Dostęp do powiadomień | Opcjonalne wykrywanie płatności z powiadomień Google Wallet | Nie | To wrażliwe uprawnienie Androida i musi być nadane w ustawieniach systemu |
| Wyświetlanie powiadomień | Lokalne przypomnienia, sugestie wykrytych płatności i inne powiadomienia aplikacji | Nie | Użytkownik może zarządzać powiadomieniami aplikacji w Androidzie |
| Biometria/dane uwierzytelniające urządzenia | Ochrona wybranych wrażliwych ekranów/ustawień tam, gdzie wdrożono | Nie | Używa API biometrii/zabezpieczeń urządzenia Androida |
| Advertising ID | Pomiar/personalizacja reklam przez SDK reklamowe | Nie | Wymaga właściwych ujawnień i wyborów zgody, jeśli mają zastosowanie |
| Konto Google/Firebase | Logowanie i Family Sharing | Nie | Nie jest wymagane dla lokalnego budżetu |
| Akceptacja warunków modelu Gemma | Dostępność lokalnego modelu AI | Nie | Flaga akceptacji jest przechowywana na urządzeniu |
| Przełącznik ulepszania paragonów przez AI | Opcjonalna interpretacja tekstu OCR przez Firebase Vertex AI/Gemini | Nie | Powinien być wyraźnie oddzielony od lokalnego OCR |

## Aneks D. Matryca retencji i usuwania

Dokładne okresy retencji powinny zostać zatwierdzone przez właściciela aplikacji przed publikacją. Do tego czasu KOVA stosuje poniższe zasady funkcjonalnej retencji.

| Typ danych | Zasada retencji | Kontrola/usunięcie przez użytkownika |
|---|---|---|
| Lokalne rekordy budżetowe i finansowe | Przechowywane do czasu usunięcia przez użytkownika, resetu aplikacji, importu nadpisującego albo usunięcia danych aplikacji przez Androida | Usuwanie w aplikacji tam, gdzie dostępne; odinstalowanie/wyczyszczenie danych usuwa lokalną pamięć aplikacji |
| Szyfrowana lokalna baza danych | Przechowywana na urządzeniu, gdy aplikacja jest zainstalowana | Wyczyszczenie danych aplikacji lub odinstalowanie usuwa bazę; destrukcyjne migracje mogą też usunąć lokalne dane w niektórych przypadkach aktualizacji |
| Lokalne ustawienia i szyfrowane preferencje | Przechowywane, gdy aplikacja jest zainstalowana albo do zmiany/resetu | Zmiana ustawień w aplikacji; wyczyszczenie danych/odinstalowanie |
| Obrazy paragonów w cache | Tymczasowa kopia używana do przetwarzania/eksportu | Czyszczenie cache przez Androida/aplikację albo ręczne czyszczenie może usunąć pliki cache |
| Zapisane archiwum paragonów | Przechowywane do usunięcia paragonu/archiwum albo danych aplikacji | Usuwanie zapisanych paragonów tam, gdzie obsługiwane |
| Dane chmurowe Family Sharing | Przechowywane, gdy rekordy rodziny/udostępnionych zasobów pozostają aktywne albo są wymagane z powodów operacyjnych/prawnych | Zatrzymanie udostępniania, opuszczenie rodziny, usunięcie własnej rodziny albo użycie Usuń konto chmurowe do rekursywnego usunięcia własnych przestrzeni i pozostałych członkostw |
| Dane Firebase Authentication | Przechowywane przez Firebase/Google zgodnie z konfiguracją konta/projektu | Wylogowanie tylko rozłącza sesję; Ustawienia → Dane → Usuń konto chmurowe usuwa konto KOVA Firebase po ponownym uwierzytelnieniu |
| Rekordy zakupów | Przechowywane przez Google Play; KOVA przechowuje w Firestore skrót tokenu/właściciela/status/termin do usunięcia konta chmurowego | Subskrypcjami/zakupami zarządza Google Play; usunięcie konta chmurowego usuwa rekordy weryfikacyjne KOVA |
| Dane zapytań/cache rynkowych | Przechowywane zgodnie z logami dostawcy i lokalnym cache | Użytkownik może przestać używać funkcji rynkowych; retencja po stronie dostawcy wynika z jego polityk |
| Dane reklamowe | Nie są zbierane w obecnej wersji | Nie dotyczy |
| Pliki eksportu/kopii | Kontrolowane przez miejsce docelowe wybrane przez użytkownika | Usuń pliki z miejsca, w którym zostały zapisane/udostępnione |

## Aneks E. Matryca dostawców i SDK

KOVA może kontaktować się z poniższymi kategoriami dostawców w zależności od włączonych funkcji. Część dostawców/SDK może być obecna w pakiecie aplikacji nawet wtedy, gdy dana funkcja nie jest aktywnie używana.

| Dostawca/kategoria | Cel | Dane, których może to dotyczyć |
|---|---|---|
| Google Firebase Authentication | Logowanie Google/Firebase | Identyfikatory konta, e-mail, nazwa wyświetlana, URL zdjęcia profilowego, metadane uwierzytelnienia |
| Google Cloud Firestore/Firebase | Family Sharing | Dane rodziny, członków, udostępnionych zasobów i metadane |
| Firebase Vertex AI / Gemini | Opcjonalna interpretacja paragonów | Tekst OCR i treść promptu; tekst paragonu może obejmować sklep, pozycje, ceny, daty i identyfikatory |
| Google ML Kit | Lokalne rozpoznawanie tekstu i kodów kreskowych | Klatki/obrazy z kamery przetwarzane na urządzeniu przez komponent ML Kit używany w aplikacji |
| Google Play Services Wearable | Transfer danych telefon-zegarek | Podsumowania sald, szybkie transakcje, pytania/odpowiedzi AI i powiązane dane wearable |
| Google Play Billing | Zakupy, subskrypcje i darowizny/wsparcie | ID produktów, stan zakupu, tokeny zakupu obsługiwane przez Google Play |
| Endpointy Yahoo Finance | Wyszukiwanie symboli, wykresy rynkowe i powiązane informacje | Tickery, symbole, zakresy, metadane żądań |
| Google News RSS | Wyświetlanie wiadomości rynkowych/newsów | Metadane zapytań tematów/wyszukiwania |
| Hugging Face albo inny host modelu, jeśli skonfigurowany | Opcjonalne pobranie lokalnego modelu | Metadane żądania pobrania, np. adres IP, user agent i żądany plik modelu |

## Aneks F. Ważne aktualne ograniczenia i ujawnienia produktowe

Aby nie obiecywać więcej niż wdraża aplikacja, częścią tej polityki są poniższe punkty:

- KOVA nie jest w pełni lokalna, jeśli użytkownik włączy funkcje online, takie jak logowanie, Family Sharing, dane rynkowe, Play Billing albo zdalne pobranie modelu.
- Family Sharing oznacza, że wybrane dane finansowe lub domowe mogą być przechowywane w Cloud Firestore i widoczne dla zaproszonych członków rodziny zgodnie z ich rolą oraz udostępnionymi zasobami.
- Wylogowanie nie usuwa automatycznie lokalnych rekordów finansowych, wyeksportowanych plików, wspólnych rekordów rodzinnych, logów dostawców ani istniejących danych konta w chmurze.
- Skanowanie paragonów jest domyślnie lokalne, ale opcjonalne ulepszanie przez AI może wysłać tekst OCR do Firebase Vertex AI/Gemini. Surowy obraz paragonu nie jest wymagany dla tej funkcji w sprawdzonej implementacji, ale sam tekst OCR może zawierać wrażliwe szczegóły paragonu.
- Wykrywanie płatności z powiadomień koncentruje się obecnie na obsługiwanych powiadomieniach portfela znalezionych przez zaimplementowany parser. Szersze teksty o wykrywaniu banków powinny odpowiadać faktycznie zaimplementowanym parserom.
- Tryb ciszy i kontrolki powiadomień powinny być opisywane tylko w zakresie faktycznego wdrożenia. Jeśli kontrolka harmonogramu istnieje, ale nie wycisza w pełni wszystkich powiadomień, polityka i UI nie powinny obiecywać pełnego blokowania.
- Google Play Billing obsługuje dane kart płatniczych. KOVA nie powinna twierdzić, że bezpośrednio zbiera numery kart.
- Funkcje inwestycyjne i rynkowe mają charakter informacyjny i nie są poradą finansową, inwestycyjną, podatkową ani prawną.
- Przed publikacją właściciel aplikacji musi uzupełnić: podmiot prawny/administratora, adres kontaktowy, e-mail privacy, datę wejścia w życie, próg wieku dzieci, język rozstrzygający i dokładne okresy retencji. Funkcja usuwania musi też zostać wdrożona i sprawdzona.

## Aneks G. Oświadczenia „nie robimy” dla jasności

Na podstawie sprawdzonej implementacji KOVA powinna składać poniższe wąskie oświadczenia tylko wtedy, gdy pozostają prawdziwe w buildzie produkcyjnym:

- KOVA nie wymaga konta chmurowego do podstawowego lokalnego budżetowania.
- KOVA nie otrzymuje bezpośrednio pełnego numeru karty płatniczej użytkownika przy zakupach Google Play.
- KOVA nie wysyła automatycznie wszystkich lokalnych danych finansowych tylko dlatego, że aplikacja jest zainstalowana.
- KOVA nie zmienia automatycznie wykrytego powiadomienia o płatności w potwierdzoną transakcję bez potwierdzenia użytkownika w sprawdzonym przepływie.
- KOVA nie świadczy profesjonalnych porad finansowych, prawnych, podatkowych ani inwestycyjnych.
- KOVA nie wymaga opcjonalnego chmurowego ulepszania paragonów przez AI do lokalnego skanowania paragonów.


