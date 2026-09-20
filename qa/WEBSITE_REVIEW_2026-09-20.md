# Przegląd KOVA Website — 20 września 2026

Zakres: istniejąca oficjalna strona, 10 publicznych podstron i lokalny Workspace. Zmiany wykonane lokalnie; bez publikacji, commitów ani zmian w aplikacji Android. Istniejące zmiany użytkownika zachowano.

## Wprowadzone zmiany

- Spójny układ w kolorach KOVA, lżejsza typografia, czytelniejsza hierarchia i nawigacja.
- Prawdziwe zrzuty ekranu bez przycinania treści; przewijana galeria na telefonie i powiększanie zdjęć.
- Sekcja dostępności projektu, pięć odpowiedzi FAQ, aktualności, plan rozwoju i kontakt.
- Wspólna stopka, powroty do strony głównej, menu mobilne zamykane także klawiszem Escape.
- Publiczne treści i nawigacja PL/EN/RU; język zachowywany w linkach. Podstrony projektu mają pełną polską treść także bez JS.
- Spisy treści dokumentów, czytelne nagłówki i wyraźne oznaczenie roboczych danych prawnych.
- Ochrona przed nadpisaniem wybranego języka dokumentu przez wolniejszą wcześniejszą odpowiedź sieciową.
- Mniejszy panel cookies, równa dostępność odmowy, działające wycofanie zgody i wejście do ustawień ze wszystkich stopek.
- Nazwy dostępności dla małych przycisków i bardziej zwarty układ podsumowania Workspace na telefonie.
- Publiczne procenty gotowości zastąpione opisem prac. Prywatne dane i postęp zadań Workspace nie były resetowane.

## Weryfikacja wykonana

Katalog roboczy poleceń: `C:\Users\vlad2\Desktop\KOVA\KOVA-Website`.

| Polecenie | Exit | Wynik |
| --- | --- | --- |
| `node qa/public-site-matrix.mjs` | 0 | 36/36 konfiguracji przeglądarkowych PASS |
| `node qa/public-site-matrix.mjs legal` | 0 | 6/6 ponownych sprawdzeń dokumentów po korekcie hierarchii PASS |
| `node qa/static-check.mjs` | 0 | 11 plików HTML, 237 lokalnych odwołań PASS |
| `node qa/public-contract-check.mjs ../KOVA-App` | 0 | 10 publicznych stron, 18 wersji językowych podstron, 5 FAQ; teksty 6 dokumentów zgodne ze źródłem aplikacji |
| `node qa/workspace-access-check.mjs` | 0 | Sprawdzenie obecnej bramki lokalnego dostępu; nie stanowi testu autoryzacji serwerowej |
| `node --check` dla 8 głównych plików JS | 0 | Poprawna składnia |
| `git diff --check` | 0 | Bez błędów whitespace; Git ostrzega o konwersji LF/CRLF |

Macierz: każda publiczna strona w PL/360px, EN/768px i RU/1440px. Dodatkowo strona główna w RU/320px, pełny desktop PL, banner cookies PL/390px, prezentacja RU/360px oraz Workspace w 390px i 1440px.

Dokładne polecenia, kody wyjścia, logi i zrzuty dla poszczególnych przypadków:

- `qa/artifacts/public-review/results.json` — główna macierz 36 przypadków;
- `qa/artifacts/public-review-legal-final/results.json` — 6 ponownych sprawdzeń.

Dodatkowe wykonania po poprawkach dostępności i ustawień cookies (każde exit 0):

```text
node qa/site-smoke.mjs http://127.0.0.1:4173/index.html?lang=pl qa/artifacts/accessible-home.png 360 800
node qa/site-smoke.mjs http://127.0.0.1:4173/workspace.html?lang=pl qa/artifacts/accessible-workspace.png 390 844
node qa/site-smoke.mjs "http://127.0.0.1:4173/index.html?lang=en&cookies=settings" qa/artifacts/cookie-settings-link.png 390 844
```

Testy sprawdzają: brak poziomego przepełnienia dokumentu, obrazy, błędy JS, otwieranie galerii i prezentacji, menu, FAQ, wybór języka, zgodę/odmowę/wycofanie cookies, zmianę języka dokumentów przy opóźnionej odpowiedzi, wspólną stopkę i utworzenie zadania w odizolowanym testowym profilu Workspace. Galerie mobilne przewijają się we własnym kontenerze celowo.

Oglądane zrzuty obejmowały pełną stronę główną, mobile, status PL/RU, dokument prywatności, cookies i Workspace. Testy przeglądarkowe korzystają z headless Microsoft Edge, nie z fizycznego telefonu.

## Nieudane sprawdzenia i wyjaśnienie

Nowe porównanie kopii dokumentów początkowo zakończyło się dwukrotnie exit 1. Diagnostyka wykazała identyczny tekst wszystkich sześciu plików, ale mieszane CRLF/LF w źródłach Androida i dodatkowy pusty wiersz na końcu kopii strony. Porównanie normalizuje teraz wyłącznie końce linii i puste wiersze na końcu pliku; wszystkie znaki treści pozostają sprawdzane. Dokumentów prawnych nie przeredagowano. Końcowy test: exit 0, 6/6 zgodnych tekstów.

## Granice gotowości do publikacji

- Brakuje zatwierdzonego publicznego adresu kontaktowego; zadano właścicielowi pytanie. Nie utworzono fikcyjnego formularza ani skrzynki.
- Dokumenty aplikacji nadal zawierają przykładowe adresy i robocze pola. Oznaczono to na stronie; wymagają uzupełnienia i zatwierdzenia przez właściciela.
- Nie wykonywano wdrożenia, kontroli domeny/HTTPS ani konfiguracji serwera produkcyjnego.
- Obecny Workspace ma lokalną bramkę JavaScript, nie autoryzację serwerową. Przy publikacji jego pliki i artefakty QA należy wyłączyć z publicznego pakietu albo objąć rzeczywistą kontrolą dostępu. Samo ukrycie linku nie jest zabezpieczeniem.
- Nie podłączono odbiorcy analityki. Mechanizm zgody i lokalne identyfikatory działają; strona opisuje rzeczywisty stan.
- Prezentacja to sekwencja prawdziwych zrzutów, nie nagranie wideo.
- To przegląd strony, nie ponowny audyt całej aplikacji Android ani prawna certyfikacja dokumentów. Nie wykonywano manualnego testu czytnikiem ekranu ani na fizycznym telefonie.

Wniosek: lokalny redesign i opisane kontrole strony zakończone. Pełna gotowość publicznego wydania zależy od powyższych danych i konfiguracji.
