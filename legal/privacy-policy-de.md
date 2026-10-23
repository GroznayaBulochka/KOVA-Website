# KOVA Datenschutzrichtlinie – OFFLINE V1 – ENTWURF

Dokumentrevision: 22.10.2026. Nicht zur Veröffentlichung freigegeben; Dies ist kein Datum des Inkrafttretens. Betreiber/Herausgeber: Vadyslav Konohrai, Privatperson, Polen. Datenschutz-/Support-Kontakt: contact@kovacompass.app. Datum des Inkrafttretens: [OWNER_INPUT_REQUIRED].

URL der öffentlichen Datenschutzrichtlinie (englische Version): [https://kovacompass.app/privacy.html?lang=en](https://kovacompass.app/privacy.html?lang=en).

## 1. Geltungsbereich

Diese Richtlinie beschreibt KOVA_PHONE_OFFLINE_FREE_V1, die Android Telefon-App com.kova.budget. Es handelt sich um einen kostenlosen lokalen Organisator für persönliche Finanzen, für den kein Online-Konto erforderlich ist. Dies ist nicht die Richtlinie für eine Website, Android, Google Play oder frühere Cloud-Dienste. Ihre gesonderten Bedingungen entbinden den Verlag nicht von seinen Pflichten zur eigenen Verarbeitung.

## 2. Lokale Daten und Zwecke

KOVA verwendet die von Ihnen eingegebenen oder ausgewählten Informationen, um Funktionen auf Ihrem Gerät bereitzustellen:

- Name des lokalen Profils, lokale Kennung und Einstellungen: Profiltrennung, Sprache, Währung und Einstellungen.
- Finanzkonten, Salden, Beträge, Währungen, Daten, Beschreibungen, Kategorien, Transaktionen, Rückerstattungen und Überweisungen: Aufzeichnungen und Berechnungen.
- Budgets, Ziele, Schulden, wiederkehrende Zahlungen und Nettovermögen: Planung und lokale Zusammenfassungen.
- Arbeitsprofile, Tarife, Stunden, Pausen und Informationen, die für Verdienstschätzungen benötigt werden: Arbeitsaufzeichnungen und Prognosen.
- Notizen, Aufgaben, Listen, Ereignisse, Belege, ausgewählte Bilder und Dateiverweise: vom Benutzer erstellte Inhalte und lokale OCR.
- Berechnungsergebnisse und technischer Anwendungsstatus: Berichte, Sitzungswiederherstellung und zuverlässige Speicherung.

Geben Sie keine unnötigen Bankpasswörter, Authentifizierungscodes, vollständigen Kartendaten oder besonders vertraulichen Informationen ein. Notizen und Bilder können Daten anderer Personen enthalten; Minimieren Sie es und verwenden Sie es rechtmäßig.

## 3. Keine Cloud-Dienste in dieser Edition

Diese Version bietet keine Firebase-Authentifizierung, Google-Anmeldung, Serversynchronisierung, Cloud-Speicher/-Funktionen, Analysen oder Crashlytics, Remote-Push, Remote-Konfiguration, Anzeigen, Käufe oder Abonnements, Banking-APIs, Wear OS, Online-Familienfreigabe, Live-Angebote, KI-Dienste oder Befehlsebene. Gewöhnliche lokale Erinnerungen sind keine Remote-Push-Erinnerungen. Der beibehaltene zukünftige Funktionscode bedeutet nicht, dass diese Dienste aktiv sind.

Das Release-Manifest verfügt über keine INTERNET-Berechtigung und entfernt den automatischen Start deaktivierter Dienste. KOVA sendet Ihre Datensätze nicht automatisch an den Herausgeber und gewährt ihm keinen Fernzugriff auf die lokale Datenbank. Dies bedeutet nicht, dass das gesamte Telefon, der Store oder der ausgewählte Dateianbieter Netzwerkaktivitäten vermeidet. Es ist auch kein Nachweis, dass Sicherheitsmängel ausgeschlossen sind.

## 4. Berechtigungen, OCR und das Gerät

Für Belegfotos ist die Kamera optional. Sie können stattdessen ein Bild über die Systemauswahl ohne Kameraerlaubnis auswählen. OCR verwendet mit der App gebündelte Modelle, ohne das Bild zur Fernerkennung zu senden. Überprüfen Sie vor dem Speichern Beträge, Währung, Datum und Inhalt: Die Erkennung kann fehlerhaft sein.

Benachrichtigungen stellen lokale Erinnerungen bereit und hängen von den Android-Einstellungen ab. Optionale Biometrie nutzt Systemauthentifizierung; KOVA empfängt keine Fingerabdruck- oder Gesichtsvorlagen. Sie können Berechtigungen in den Android-Einstellungen ändern. Eine Verweigerung schränkt die jeweilige Funktion ein und stellt keine Erlaubnis zur Datenübermittlung dar. Die Offline-Version nutzt weder das Mikrofon noch eine Werbekennung oder Ortungsdienste. Der Zugriff auf eine ausgewählte Datei hängt auch von ihrem Anbieter ab.

## 5. Schutz und seine Grenzen

Die Hauptfinanzdatenbank verwendet SQLCipher. Installationsspezifisches Schlüsselmaterial wird mit Android Keystore geschützt; Es handelt sich nicht um ein tragbares Backup-Passwort. Die Datenbankverschlüsselung deckt nicht automatisch jedes Foto, jede Hilfsdatei, jede Einstellung, jeden Export oder jedes auf dem Bildschirm angezeigte Element ab. Schützen Sie Ihr Telefon und Ihren Dateizugriff. Die Verschlüsselung garantiert keinen Schutz vor kompromittierten oder entsperrten Geräten, Malware, Schlüsselverlust oder Offenlegung durch den Benutzer.

## 6. Manueller Export und Wiederherstellung

Beim manuellen Export handelt es sich um eine passwortverschlüsselte Teilkopie des unterstützten Bereichs, nicht um ein Abbild der gesamten Installation. Es umfasst unterstützte Finanzunterlagen und gespeicherte Konfigurationen, einschließlich Arbeit, sowie Bilder, die in ein Notizdokument eingebettet sind. Es kopiert nicht App-Einstellungen, Installationsschlüssel, Widget-Konfiguration, Benachrichtigungsverlauf, zusätzliche Synchronisierungswarteschlangen oder jeden Cache. Externe Belegfotos und Dateianhänge werden nicht kopiert. Ein gespeicherter URI oder Link ist keine Kopie des Inhalts: Eine Datei kann nach dem Verschieben, Löschen oder Verlust der Berechtigung nicht mehr verfügbar sein. Bewahren Sie diese Dateien separat auf.

Sie wählen das Ziel in der Dateiauswahl des Systems aus. Wenn Sie einen Cloud-Anbieter auswählen oder die Datei mit einer anderen App teilen, werden möglicherweise Daten gemäß den Bedingungen dieses Anbieters übertragen. KOVA lädt das Backup nicht automatisch hoch. Bewahren Sie die Datei und ein sicheres Passwort sicher auf, vorzugsweise getrennt. Der Herausgeber verfügt über keinen Wiederherstellungsschlüssel für dieses Passwort. Nach der Bestätigung ersetzt der Import den unterstützten Datenumfang des ausgewählten Profils. Die Wiederherstellung einer kompatiblen lokalen Sicherung in einer anderen Installation erfordert eine ausdrückliche Bestätigung; historische Cloud-Konten oder mehrere Besitzer werden nicht automatisch übernommen.

## 7. Aufbewahrung und Löschung

Lokale Datensätze bleiben auf dem Gerät, bis Sie sie entfernen oder ersetzen. Hilfsdaten und Caches hängen von der App und dem Android-Verhalten ab, ohne dass hier ein fester Bereinigungszeitraum festgelegt wird. Löschen Sie einzelne Datensätze über die verfügbaren App-Funktionen. Um Installationsdaten zu entfernen, verwenden Sie Android Einstellungen → Apps → KOVA → Speicher → Daten/Speicher löschen; Der Wortlaut variiert je nach Gerät. Dadurch werden lokale Daten entfernt und eine Wiederherstellung ohne Backup ist möglicherweise nicht möglich. Durch die Deinstallation werden normalerweise auch private App-Daten entfernt.

Exportierte Dateien, Kopien externer Anbieter, Originalbilder und mit anderen geteilte Kopien müssen separat entfernt werden. Das Löschen eines Datensatzes verspricht kein sicheres physisches Überschreiben jedes Speichermediums. Diese Release-Konfiguration deaktiviert die automatische Cloud-Sicherung von Android und die Geräteübertragung von KOVA-Daten. Dies ist kein Ersatz für eine manuelle Sicherung.

## 8. Kontaktdaten, vom Betreiber gespeicherte Daten und Rechte

Für die lokale Nutzung ist keine Übermittlung von Informationen an den Herausgeber erforderlich. Wenn Sie es außerhalb der App kontaktieren, erhält es möglicherweise Ihre Kontaktadresse, Nachricht und freiwillige Anhänge. Senden Sie keine vollständige Datenbank, kein Backup-Passwort, Schlüssel oder echte Finanzinformationen, es sei denn, dies ist erforderlich. Dieses Dokument berechtigt nicht zu Ansprüchen.

Die Bearbeitung der Korrespondenz ist eine gesonderte Bearbeitung. Vor der Eröffnung dieses Kanals muss der Betreiber seinen Zweck und die entsprechende Rechtsgrundlage, Empfänger/Anbieter, etwaige Übertragungen außerhalb des EWR sowie den Aufbewahrungszeitraum oder die Aufbewahrungskriterien angeben: [OWNER_INPUT_REQUIRED]. Wir behaupten nicht, dass die Offline-Nutzung die DSGVO unanwendbar macht oder dass die Anerkennung dieser Richtlinie einer Verarbeitung jeglicher Art zustimmt.

Soweit die DSGVO auf vom Betreiber verarbeitete Daten anwendbar ist, umfassen die den Umständen entsprechenden Rechte Zugriff, Berichtigung, Löschung, Einschränkung, Übertragbarkeit und Widerspruch; Die Einwilligung kann widerrufen werden, wenn sie die Grundlage für die Verarbeitung darstellt. Sie können sich bei der zuständigen Aufsichtsbehörde, einschließlich des polnischen Präsidenten von UODO, beschweren und gerichtlichen Rechtsschutz beantragen. Senden Sie Anfragen an den oben genannten Datenschutzkontakt. Das geltende Recht legt Fristen und Beschränkungen fest. Der Betreiber kann eine Datenbank, die ausschließlich auf Ihrem Telefon gespeichert ist, nicht aus der Ferne ändern. Der Anspruchsverzicht setzt den gesetzlichen Anspruch nicht voraus.

## 9. Ehemalige Konten und separate Dienste

Mit dieser Version werden keine Online-Konten erstellt. Laut der Erklärung des Herausgebers vom 20. Oktober 2026 wurden bisherige Cloud-Builds nur vom Herausgeber und von Testkonten verwendet, ohne externe Nicht-Testbenutzer. Offline V1 bietet Benutzern daher keinen Zugriff auf ein früheres Cloud-Konto oder eine Migration von diesem. Bei dieser Aussage zum Testverlauf handelt es sich nicht um eine neue Firebase-Prüfung oder um einen Beweis dafür, dass Testdaten gelöscht wurden. Diese Version entfernt keine früheren Ressourcen. Bitte richten Sie Fragen zum Datenschutz an den oben genannten Kontakt.

## 10. Kinder, Änderungen und andere Informationen

KOVA richtet sich an Personen ab 13 Jahren, nicht an Kinder unter 13 Jahren. Der weltweite Vertrieb ist geplant, abhängig von der Verfügbarkeit im Geschäft und den Anforderungen der einzelnen Länder. Verfügbarkeit in jedem Land wird nicht versprochen. Wenn örtliches Recht die Beteiligung eines Elternteils oder Erziehungsberechtigten an der Nutzung oder bestimmten Datenverarbeitung vorschreibt, ersetzt die Vollendung des 13. Lebensjahres diese Anforderung nicht. Dieses Dokument behauptet nicht, dass die App das Alter überprüft oder die Zustimmung des Erziehungsberechtigten einholt. Die Einwilligung zur Datenverarbeitung und die Vertragsfähigkeit sind getrennte Themen.

Kurz gesagt: Ihre Eingaben bleiben auf Ihrem Telefon. Es gibt keine Cloud-Anmeldung. Schützen Sie das Telefon, erstellen Sie manuelle Backups und geben Sie das Passwort nicht weiter. Wenn Sie oder Ihr Erziehungsberechtigter Fragen zum Datenschutz haben, nutzen Sie den Datenschutzkontakt; Versenden Sie keine Passwörter, Ausweisdokumente oder die komplette Datenbank.

Die lokale Analyse ist für den Benutzer; KOVA trifft keine Kredit-, Beschäftigungs- oder Berechtigungsentscheidungen im Namen des Betreibers. Hierbei handelt es sich nicht um eine Behauptung über unabhängige Handlungen anderer Parteien. Die App führt kein Werbe-Tracking durch und erfordert keine Zustimmung zu Analyse-Cookies; Jede Website benötigt eine eigene Bewertung.

Die aktuelle Richtlinie sollte in den Einstellungen und unter einer genehmigten öffentlichen URL verfügbar sein. Änderungen sollten die neue Revision und das tatsächliche Datum des Inkrafttretens angeben, ohne rückwirkend neue Zwecke zu genehmigen. Zukünftige Online-Dienste erfordern neue Offenlegungen und entsprechende Begründungen, nicht nur eine Textänderung. Bibliothekshinweise finden Sie in den Einstellungen. Siehe auch die [Nutzungsbedingungen](terms-of-service-en.md).
