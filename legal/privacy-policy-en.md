# KOVA Privacy Policy

Effective date: July 20, 2026  
Last updated: July 20, 2026

**Current release status:** Cloud receipt AI is disabled and the Firebase Vertex AI/Gemini client library is not included. Receipt images and OCR text are processed locally and are not sent to a cloud AI provider. Any clauses below describing cloud receipt AI apply only if that feature is reintroduced with a separate disclosure and appropriate server-side controls. The current release also contains no advertising SDK or advertising identifier permission.

## 1. Introduction

This Privacy Policy explains how KOVA processes information when you use the KOVA Android application, the KOVA Wear OS application, widgets, receipt scanning, Family Sharing, AI features, subscriptions, advertising and related support features.

KOVA is designed as a personal finance and productivity app. Many core features work locally on your device. Some optional features use cloud services, external SDKs or synchronization with other users. This policy separates local processing, cloud processing, Family Sharing, external providers and optional features.

## 2. Who operates KOVA

KOVA is operated by:

- Data controller / app owner: KOVA Project Team
- Business or contact address: Warsaw, Poland
- Country of establishment: Poland
- Privacy contact: privacy@kova.app
- Support contact: support@kova.app

## 3. Scope of this Privacy Policy

This policy applies to:

- the KOVA Android app;
- the KOVA Wear OS companion app;
- Android widgets provided by KOVA;
- in-app privacy, onboarding and support screens;
- optional cloud features such as Google Sign-In and Firebase Family Sharing;
- optional local AI model features;
- advertising, purchases and subscriptions handled through third-party SDKs.

This policy does not replace the privacy policies of third-party providers listed below.

## 4. Summary of KOVA's data model

KOVA has five main data-processing modes:

1. Local-only app data: financial records, notes, receipt archive, tasks, settings and many AI settings are stored on the user's device.
2. Optional authenticated cloud data: Google Sign-In and Firebase Auth process account identity when the user signs in.
3. Optional Family Sharing: selected resources are uploaded to Cloud Firestore and shared with selected family members.
4. Receipt processing: receipt images and OCR text are processed on-device; cloud receipt AI is disabled and not included in this release.
5. External SDK/provider processing: ads, purchases, market data, speech recognition, Wear OS messaging and model delivery may involve third-party providers.

KOVA does not currently provide a real bank-account connection. The Connect Bank feature is currently a Coming Soon / placeholder feature.

## 5. Information processed by KOVA

Depending on which features you use, KOVA may process:

- profile settings, nickname, avatar/icon and selected language/currency;
- Google account profile data, if you sign in;
- financial accounts, balances, transactions, categories, budgets, savings goals and recurring payments;
- cash-flow forecasts, reports, KOVA Score snapshots and financial insights;
- investment holdings, watchlists and market-search queries;
- notebook notes, shopping lists, tasks, checklists and price memory;
- receipt images, OCR text, merchant names, purchase dates, products, prices, discounts, totals, barcodes and warranty information;
- payment notification suggestions extracted from supported Android notifications;
- Family Sharing metadata, members, invitations, shared resources and activity records;
- notification settings and notification history;
- widget settings and displayed widget content;
- AI assistant settings, local memory and command history;
- subscription entitlement and quota status;
- advertising-related identifiers and SDK data where advertising is enabled or initialized.

## 6. Data stored locally on the device

KOVA stores its main app data in a Room database named `kova_database`. The current implementation uses SQLCipher database encryption. KOVA also uses Android Keystore-backed encrypted preferences for many sensitive settings, including app settings, database passphrase storage, AI settings, AI command history, notification settings, entitlement/quota data and some widget security data.

Local database content may include:

- accounts and balances;
- transactions, categories and notes;
- budgets, goals and recurring payments;
- investment holdings and market instruments;
- notebook notes, shopping items and tasks;
- receipt records, receipt items, discounts and warranties;
- product identities and product price observations;
- detected payment suggestions;
- timeline events;
- KOVA Score snapshots;
- local notification history.

Not every local preference is encrypted. Some current settings or legacy stores use ordinary Android SharedPreferences, including payment-detection enablement, Gemma terms acceptance, some widget configuration, hourly-ad timing, receipt store/category rules and some legacy receipt price-history data.

Temporary local files may include:

- receipt photos stored in the app cache;
- generated receipt PDF files stored in the app cache;
- temporary scan files;
- local AI model files and verification markers;
- LiteRT-LM cache files.

Clearing app data or uninstalling KOVA may remove local data unless you created an export or backup. Exported files remain wherever you save them.

## 7. Account and Google Sign-In data

Google Sign-In is optional unless you use a feature that requires authentication, such as Family Sharing.

When you sign in, KOVA uses Android Credential Manager, Google ID and Firebase Authentication. KOVA may process:

- Firebase UID;
- Google account email address;
- display name;
- profile photo URL;
- authentication state;
- a bounded achievement snapshot containing unlocked achievement identifiers and its update time.

This account metadata is stored under the Firebase UID proven by Google Sign-In. Changing a local display name or username cannot change account ownership, Family access or subscription entitlement. Subscription status is written only from server-verified Google Play data; Family access is stored separately as UID-bound memberships.

KOVA does not receive your Google password. Google Sign-In alone does not upload accounts, transactions, budgets, receipts or notes: those remain local unless you explicitly use a sharing feature such as Family Sharing. Sign-out clears the active Firebase/Credential Manager session and clears locally stored Google profile metadata from KOVA settings. Sign-out does not automatically delete local financial records, local receipts, local notes or cloud data already shared through Family Sharing.

## 8. Financial information

KOVA processes financial information you enter or generate, including:

- account names and types;
- balances and currencies;
- transaction amounts, dates, descriptions and merchants;
- categories and icons;
- recurring payments, bills and subscriptions;
- budgets and savings goals;
- cash-flow forecasts;
- reports and KOVA Score factors;
- investment holdings and watchlists.

Most financial data is stored locally by default. Selected financial data may leave your device if you share it through Family Sharing. Market-search and investment-data requests may be sent to external market-data providers. KOVA does not currently connect to real bank accounts or import live bank transactions through Open Banking.

## 9. Notebook, shopping lists and tasks

KOVA may store notes, shopping lists, shopping items, price memory, tasks, checklists, linked records and related metadata locally. If you use Family Sharing, selected notebook, shopping or task resources may be uploaded to Firestore and shared with family members according to role and sharing settings.

## 10. Receipt scanning and OCR

KOVA's receipt workflow may process:

- a receipt image captured with CameraX;
- OCR text generated from the image;
- barcode data;
- merchant/store name;
- purchase date and time;
- products, quantities, prices, discounts and totals;
- receipt identifiers and warranty information;
- receipt image URI and archive metadata.

Camera capture, OCR, barcode scanning, deterministic receipt parsing, validation and local receipt archive storage are performed locally on the device. KOVA uses Google ML Kit Text Recognition and Barcode Scanning SDKs for local recognition. Receipt images may temporarily remain in the app cache. Receipt records and parsed items may be stored in the local encrypted database when you save or archive them.

The current release does not send receipt images or OCR text to cloud AI.

## 11. Cloud receipt AI (not available in this release)

KOVA does not include cloud receipt AI in the current release. Receipt OCR, deterministic parsing, local cleanup and manual review remain available on-device. Any future cloud implementation requires updated disclosures, consent and server-side entitlement, quota and abuse controls before release.

Important details:

- the cloud feature is disabled and its SDK dependency is absent;
- local OCR and manual review remain available without cloud AI;
- the current implementation sends neither receipt text nor receipt images to cloud AI;
- KOVA masks long 13-19 digit number sequences that look like card numbers before sending text;
- masking does not guarantee removal of every identifying field;
- receipt OCR may still contain merchant names, addresses, dates, product names, prices, tax identifiers, receipt numbers or other details;
- responses may be logged in debug builds and should be treated carefully during development/testing.

KOVA does not track or advertise a cloud receipt-AI quota. KOVA Support is a contribution to development and does not unlock unlimited or cloud AI features.

## 12. Local AI processing

KOVA can use an optional local Gemma model through LiteRT-LM. The model may be delivered through Google Play Asset Delivery or another verified HTTPS distribution path configured by the app owner. After the model is downloaded and verified, inference happens on the device.

Local AI may process:

- user prompts;
- financial context, if enabled;
- notebook context, if enabled;
- receipt OCR cleanup prompts;
- AI command text and app-control requests.

Local AI prompts do not need to be transmitted to Firebase AI. Model files occupy device storage. Local AI availability depends on device memory, storage, runtime compatibility and successful model verification. Use may require acceptance of Gemma Terms of Use and prohibited-use restrictions.

Local AI is separate from Firebase AI receipt enhancement.

## 13. Payment notification detection

KOVA includes an optional payment notification detection feature. This feature is not required for core budgeting.

If you explicitly enable the feature and grant Android Notification Access, KOVA's notification listener may receive notification content from Android. The current parser focuses on supported payment notifications, especially Google Wallet (`com.google.android.apps.walletnfcrel`). Bank notification support should be treated as incomplete unless additional parsers are implemented.

KOVA may extract:

- source app package;
- merchant text;
- amount;
- currency;
- timestamp/fingerprint;
- confidence score.

Detected payments are stored locally as suggestions with `PENDING` status. KOVA does not automatically add a transaction from a detected notification; you can review, add or dismiss the suggestion. Removing the original Android notification does not necessarily remove a suggestion already saved in KOVA.

You can disable payment detection in KOVA and revoke Notification Access in Android settings. Because Android grants notification-listener access at the service level, KOVA may technically receive notification metadata before deciding whether a notification is from a supported payment source.

## 14. Family Sharing

Family Sharing uses Firebase Auth and Cloud Firestore. It requires a signed-in account.

When you create, join or use a family, KOVA may store in Firestore:

- family metadata, such as family name, description, icon/emoji/color and status;
- owner UID;
- member UID, display name, email, photo URL and role;
- invitations, invite codes, role, expiry and usage count;
- activity records;
- shared-resource metadata and permissions;
- selected shared content.

Shared content may include:

- accounts and balances;
- transactions if you choose to share them;
- goals and regular payments;
- notes;
- shopping lists and shopping items;
- tasks/checklists;
- family activity records.

KOVA is private by default in the sense that local financial records are not automatically uploaded merely because you use the local app. You choose which Family Sharing features and resources to use. Other family members may view or edit resources according to their assigned role and resource permissions.

Stopping sharing or deleting a family may remove or revoke access to shared cloud resources according to the implementation and Firestore rules. It does not necessarily delete the user's original local records. Deleting a family is implemented as a soft delete of the family document, with membership index cleanup for at least the current user.

## 15. Investments and market data

KOVA can display investment holdings, watchlists, search results, charts, market snapshots and news. Market prices/searches use Yahoo Finance endpoints and market-news links use Google News RSS. Stock marks are generated locally; this release does not contact external logo providers.

Those providers may receive technical request information such as searched symbols, instrument identifiers, requested ranges/intervals, IP address, device/network metadata and user-agent-like metadata. Market data may be delayed, incomplete or provided by third parties. KOVA is not investment advice.

## 16. Voice input and speech recognition

KOVA uses the microphone only when you activate optional voice input. Voice input is used in the Android AI assistant and in the Wear OS app.

Audio may be processed by Android's system SpeechRecognizer or a Google/system speech service depending on your device and settings. KOVA does not appear to retain raw audio. Recognized text may be passed to the local assistant or the relevant KOVA feature. System speech providers have their own privacy practices.

## 17. Camera and images

The camera permission is used for receipt scanning. Receipt photos are used to perform OCR and may be stored temporarily in the app cache. If you save a receipt, KOVA may store receipt metadata and image URI information locally.

Profile images, category images or family images may be stored as local or remote URI strings. If a remote URL is used, KOVA may fetch that image from the remote host.

## 18. Notifications

KOVA may create local notification records and Android system notifications for:

- detected payments;
- budget alerts;
- goal milestones;
- cash-flow risks;
- receipts and receipt AI status;
- warranties;
- family updates;
- system events.

On Android 13 and later, KOVA asks for notification permission before showing system notifications. KOVA has category settings and a lock-screen privacy setting. When lock-screen details are disabled, KOVA displays generic notification text instead of financial details.

Quiet-hours settings exist, but the current implementation should not be represented as a complete defer/snooze system unless that behavior is finished and verified.

## 19. Advertising

KOVA does not include Google Mobile Ads / AdMob SDK and does not declare the Android Advertising ID permission in the current release.

The app does not contain an advertising toggle or interstitial-loading logic. Advertising may not be enabled in a future release without a new privacy review and any consent flow required by law or platform rules.

## 20. Purchases and subscriptions

KOVA Support, donations and subscriptions are processed through Google Play Billing. KOVA may process:

- product identifiers;
- purchase status;
- subscription entitlement;
- plan/status/source;
- server-verified contribution/entitlement status and expiry.

Payment-card details are handled by Google Play and are not directly received by KOVA. For verification, the app sends the purchase token, product identifier and product type to an authenticated Firebase callable function. The function sends the token to the Google Play Developer API, verifies purchase state, expiry and a hashed account binding, and only then records the server-authoritative entitlement. KOVA stores a SHA-256 token identifier, owner UID, product/status and expiry in Firestore; it does not persist the raw purchase token. The app acknowledges or consumes a purchase only after successful server verification.

## 21. Wear OS and device synchronization

The KOVA Wear OS app communicates with the phone through Google Play Services Wearable APIs. The phone is generally the source of truth.

Wear OS data may include:

- balance and account summaries;
- quick transaction inputs;
- pending transactions while the phone is unavailable;
- AI questions and responses;
- tile and complication summary data.

The Wear OS app stores summary and pending-transaction data in local watch SharedPreferences.

## 22. Widgets

KOVA Android widgets may display financial or notebook information on the device home screen, including budget summary, goals, limits, notes, shopping lists, tasks, Jarvis/AI entry points and quick-category transaction controls.

Widget content may be visible to anyone who can access the unlocked device or the home screen. KOVA includes settings such as hiding amounts and widget preferences, but you should avoid placing sensitive widgets where others may see them.

## 23. Backup, export, import and restore

KOVA supports user-created backup/export and import/restore files through Android file providers selected by the user, such as local storage, Google Drive, OneDrive or another Storage Access Framework provider.

Exports may include accounts, transactions, categories, goals, notebook data, recurring payments and investments. Current backup/export payloads do not include full app settings or widget configuration. KOVA also supports password-protected encrypted backups using AES/GCM with PBKDF2.

You are responsible for where exported files are stored and who can access them. Importing/restoring a backup may replace current local app data.

Android/Google system backup is limited. The reviewed backup rules exclude shared preferences, databases and local AI model files from normal Android cloud backup and device transfer because encrypted data uses device-bound keys. Use manual export for a portable backup of supported KOVA data.

## 24. External service providers

KOVA may use the following providers depending on the features you use:

| Provider | Purpose | General data category | Optional? | Provider policy |
|---|---|---|---|---|
| Google Firebase Authentication | Sign-in and identity | UID, email, profile data, authentication state | Yes, except features requiring sign-in | https://policies.google.com/privacy |
| Google Cloud Firestore | Family Sharing sync | family data, members, shared resources | Yes | https://firebase.google.com/support/privacy |
| Google ML Kit | on-device OCR/barcode recognition | image/text processing for receipt scan | Used when scanning receipts | https://developers.google.com/ml-kit/terms |
| Google Play Services / Credential Manager | sign-in, Wear, system services | account and device/service metadata | Feature-dependent | https://policies.google.com/privacy |
| Google Play Billing / Payments | subscriptions and purchases | purchase/product/entitlement data | Yes | https://payments.google.com/legaldocument?family=0.privacynotice |
| Google Play Asset Delivery | local AI model pack delivery | app/device delivery metadata | Only for local AI model delivery | https://policies.google.com/privacy |
| Android/system speech recognition | voice input | audio and recognized text | Yes | device/system provider policy |
| Yahoo Finance | market search/charts | symbols, ranges, request metadata | Yes | https://legal.yahoo.com/us/en/yahoo/privacy/index.html |
| Google News RSS | market news | search query/request metadata | Yes | https://policies.google.com/privacy |
| Hugging Face / model hosting, if configured | model information/download source | model download request metadata | Only if configured/used | https://huggingface.co/privacy |
| Google AI / Gemma | local model terms | terms/license relationship | Local AI feature | https://ai.google.dev/gemma/terms |

The reviewed source does not show active use of Firebase Analytics, Crashlytics, Cloud Messaging, Firebase Storage, Remote Config, Performance Monitoring or App Check.

## 25. Purposes of processing

KOVA processes information to:

- provide budgeting and account-management features;
- store and display user-created financial and notebook content;
- generate reports, forecasts, insights and KOVA Score;
- scan, parse and archive receipts;
- detect payment suggestions from supported notifications;
- synchronize selected Family Sharing resources;
- authenticate users;
- process subscriptions and support entitlement;
- display or prepare advertising;
- provide investment and market information;
- generate reminders and notifications;
- secure the app with local encryption, app lock and permissions;
- support backup/export/import;
- troubleshoot and support the app.

## 26. Legal bases, where applicable

If GDPR/EEA law applies, the exact legal basis must be confirmed by the app owner and privacy counsel. In general:

- Contract or requested service may apply when KOVA provides budgeting, account, Family Sharing, subscription or support features you request.
- Consent may apply to optional cloud AI receipt enhancement, microphone, camera, Notification Access, optional advertising consent where required, and action-specific sharing choices.
- Legitimate interests may apply to security, fraud prevention, service reliability, abuse prevention and debugging, subject to a balancing assessment.
- Legal obligation may apply where records are needed for tax, accounting, consumer protection or legal compliance.

You may withdraw consent for optional features through app or system settings, but this may not affect processing already completed.

## 27. Data sharing and disclosures

KOVA may disclose or make data available:

- to service providers listed above, when you use related features;
- to family members you choose to share with through Family Sharing;
- to Google Play for purchases and subscriptions;
- to Google or system providers for speech recognition, ads, sign-in, model delivery or Wear services;
- if required by law, legal process or to protect rights, safety and security;
- if the app owner transfers the app/business, subject to applicable law and notice requirements.

KOVA does not upload all local data by default. Shared/cloud processing depends on feature use and settings.

## 28. International data transfers

External providers such as Google/Firebase, Yahoo, Google News and Hugging Face may process data in countries other than your own. If GDPR or similar laws apply, the controller must confirm transfer mechanisms and provider agreements before publication.

## 29. Data retention

KOVA does not define fixed retention periods for every category in code. Unless a specific deletion action is taken:

- Local data is retained until you delete records, clear app data or uninstall the app.
- Export files are retained wherever you save them.
- Family Sharing data is retained while the family/resource exists or until it is deleted, stopped or revoked, subject to Firestore behavior and security rules.
- Firebase/Auth data is retained according to Firebase/Google and the app owner's account-management process.
- Advertising data is handled according to Google Mobile Ads policies.
- Purchase data is retained as needed to verify entitlement and comply with Google Play/legal requirements.

Precise business retention periods require manual confirmation: Data is retained as long as the account is active or as required by law..

## 30. Data deletion

You can delete many local records directly in KOVA. You can also clear app data or uninstall KOVA to remove local app storage from the device, subject to exported files and Android backup behavior.

Logging out ends the authentication session and clears local Google profile metadata, but it does not delete local financial data or all cloud data that was already shared.

Stopping sharing or deleting a family may remove or revoke access to cloud Family Sharing data, but it does not necessarily delete the original local data.

Subscription management and cancellation occur through Google Play.

KOVA provides **Settings → Data → Delete cloud account**. After you confirm the same Google account again, a protected server operation blocks new cloud access, removes your Firebase profile and memberships, recursively deletes cloud family spaces that you own, and deletes your Firebase Authentication account. Family spaces owned by somebody else remain, but your membership is removed. Data stored only on your device and exported files are not deleted by this operation. The production release gate requires the deletion function to be deployed and smoke-tested before publication.

## 31. Security

KOVA uses several safeguards:

- SQLCipher encryption for the main Room database;
- EncryptedSharedPreferences for many sensitive settings;
- Android Keystore-based key protection where applicable;
- optional app PIN and biometric/device-lock unlock;
- password-based encrypted export files;
- Family Sharing roles and permissions;
- user-controlled Android permissions.

Some settings remain in ordinary SharedPreferences, and no system of storage or transmission can be guaranteed to be completely secure.

## 32. User choices and controls

Depending on your device and app version, you may be able to:

- use KOVA as a guest for local budgeting;
- sign in or sign out of Google;
- continue with local OCR/manual review when cloud AI is disabled;
- enable or disable payment detection;
- revoke Notification Access in Android settings;
- grant or deny camera, microphone and notification permissions;
- control notification categories and lock-screen details;
- hide amounts in parts of the app;
- choose Family Sharing resources and stop sharing them;
- delete local records;
- export or import backups;
- manage KOVA Support subscriptions in Google Play;
- adjust advertising settings where available through KOVA, Android, Google or regional consent tools.

## 33. Permissions

| Permission / access | Optional? | Purpose | If denied | How to revoke |
|---|---|---|---|---|
| Camera | Yes | receipt scanning | camera receipt capture will not work; manual entry may remain available | Android App Info > Permissions |
| Microphone | Yes | optional voice input | voice input will not work | Android App Info > Permissions |
| Notifications | Yes | reminders and alerts | system notifications may not appear; in-app records may still exist | Android App Info > Notifications |
| Biometric/device lock | Yes | app lock / amount unlock | biometric unlock will not work | KOVA settings and Android security settings |
| Notification Access | Yes, special access | payment notification detection | payment detection will not work | Android Notification Access settings |
| Internet | Feature-dependent | Firebase, AI, ads, billing, market data, model download, remote images | cloud/external features will not work | disable network access at OS level where supported |
| Advertising ID | Feature/configuration-dependent | advertising | ads/personalization may be limited by OS/Google settings | Android/Google ad settings |
| Wear services | Feature-dependent | phone-watch sync, tiles, complications | Wear features may not work | uninstall/disable Wear app or permissions |

## 34. Children's privacy

KOVA is not intended for children under 16. KOVA does not knowingly collect personal data from children under that age. If you believe a child has provided personal data, contact privacy@kova.app. The child age threshold must be confirmed by the app owner before publication.

## 35. Rights under GDPR/EEA law

If you are in the EEA/UK or another region with similar rights, you may have the right to request access, correction, deletion, restriction, objection, portability, withdrawal of consent and complaint to a supervisory authority.

Some data is stored only locally and is directly controlled by you on your device. Requests concerning cloud account data, Family Sharing data or other provider-processed data should be sent to privacy@kova.app. KOVA does not currently appear to automatically fulfill every cloud-data request in-app.

## 36. Rights for other regions

Residents of certain U.S. states or other regions may have additional rights regarding identifiers, financial information, commercial information, internet/device activity, advertising identifiers, purchases and deletion requests.

The current release does not include advertising or advertising-data sharing. Any future advertising feature requires a new regional legal and consent review.

## 37. Changes to this policy

KOVA may update this policy when features, providers, permissions or legal requirements change. The app owner should update the "Last updated" date and provide appropriate notice when required by law.

## 38. Contact information

Questions or requests about privacy should be sent to:

- Privacy: privacy@kova.app
- Support: support@kova.app
- Address: Warsaw, Poland

Translation note: this policy may be provided in English, Polish and Russian. English will control if versions differ.

## Appendix A. Detailed production data inventory

This appendix is intended to make the policy operationally complete for the current KOVA codebase. It describes the main data groups processed by the app, where they are stored, and when they may leave the device.

| Data group | Examples | Default location | When it may leave the device |
|---|---|---|---|
| Account and sign-in data | Google/Firebase user ID, email, display name, profile photo URL, sign-in state | On device; Firebase Authentication | When the user signs in with Google/Firebase |
| Local financial data | Accounts, balances, transactions, categories, budgets, goals, regular payments, investments, KOVA score snapshots | Encrypted local database on the device | Only if the user chooses a cloud feature such as Family Sharing, sends data to an external AI feature, exports/shares a file, or otherwise intentionally transmits it |
| Family Sharing data | Family name, owner UID, members, roles, invitation data, shared resources, shared shopping lists, shared activity | Cloud Firestore and local device | When the user creates, joins, or uses Family Sharing |
| Shopping, notebook and task data | Notes, shopping lists, shopping items, task titles/statuses, local activity | Encrypted local database; selected shared lists/items may be in Cloud Firestore | When a user shares them through Family Sharing or exports/shares them |
| Receipt data | Receipt image cache, OCR text, merchant, date, items, prices, tax/receipt identifiers, warranties, discounts | Temporary image cache and encrypted local database | OCR text may be sent to Firebase Vertex AI/Gemini only if the optional receipt AI enhancement is enabled |
| Camera and barcode data | Receipt photos, barcode frames, recognized product codes | Device camera pipeline; cache/local database for saved receipts/products | Not sent by default; user-controlled exports/shares or optional AI text enhancement may transmit derived text |
| Voice input data | Spoken commands/questions converted to text | Android speech recognition flow; recognized text used by KOVA | Audio is processed by the Android speech recognition provider selected by the device; recognized text may be used locally or sent only if the user invokes a cloud feature |
| Local AI assistant data | Prompts, local AI memory, AI settings, local model state/cache | Device storage; sensitive settings are encrypted where implemented | Local model prompts are intended to remain on device unless the user uses a separate cloud feature |
| Optional Gemma/LiteRT model files | `gemma3-1b-it-int4.task` or KOVA local model package, verification marker, local cache | Device app storage and cache | Download requests may reveal request metadata to the hosting provider if the model is downloaded from a remote URL |
| Notification Access data | Google Wallet notification package, amount, currency, merchant, confidence, pending transaction suggestion | Device notification listener and encrypted local database | Not sent by default |
| Notification and reminder data | Local notification settings, notification history, budget/warranty/cash-flow reminder state | Device storage; many settings are encrypted | Not sent by default |
| Wear OS data | Balance summaries, account summaries, quick transaction payloads, pending transactions, tile/complication summaries, AI questions/responses | Phone and watch through Google Play Services Wearable; watch may store summary data locally | Shared between the user’s paired phone and watch through Google Play Services |
| Market/search data | Tickers, symbols, search queries, chart ranges and news RSS requests | External finance/news endpoints and local cache | Sent to Yahoo Finance and Google News when market features are used; stock marks are generated locally |
| Advertising data | Not collected by the current release | No advertising SDK or Advertising ID permission | Not sent |
| Purchase/support data | Product IDs, purchase state, token hash, account binding, entitlement status/expiry | Google Play Billing, Firebase Functions, Google Play Developer API and server Firestore records | KOVA receives purchase status/tokens, not card details; raw tokens are verified but not persisted by KOVA |
| Backup/export files | JSON exports, encrypted backup files, PDFs, shared files | User-selected file location, cache, Android share sheet | Wherever the user saves or shares the file |
| Diagnostics and logs | Local logs, AI response debug logs if enabled in the build/device environment | Device log system | May be accessible through device debugging/log tools; production builds should avoid logging sensitive data |

## Appendix B. Feature-by-feature local/cloud matrix

| Feature | Local by default | Cloud/external processing condition | User control |
|---|---:|---|---|
| Manual budgets, accounts and transactions | Yes | Family Sharing, export/share, or other user-initiated transfer | User creates, edits, deletes and exports data |
| Google/Firebase sign-in | No | Required when the user signs in | User can sign out; local financial data is not automatically removed by sign-out |
| Family Sharing | No | Uses Firebase Auth and Cloud Firestore | User chooses what to share; owner/member actions may affect shared data |
| Receipt scan OCR | Yes | OCR text may be sent to Firebase Vertex AI/Gemini if receipt AI enhancement is enabled | User can keep AI enhancement off and use local/manual flow |
| Receipt image capture | Yes | Not sent by default | User controls scanning and sharing/exporting |
| Local Gemma/LiteRT AI | Yes | Model download request may contact the model host; prompts are local for local inference | User must accept model terms and can avoid using local AI |
| Voice commands | Partly | Android speech recognition provider processes audio according to device configuration | Android microphone permission and voice feature controls |
| Payment notification detection | Yes | No default external transfer found for parsed suggestions | Requires Android Notification Access and in-app enablement |
| Wear OS companion | No, because it syncs between devices | Google Play Services Wearable transfers data between paired devices | User controls installation/usage and watch pairing |
| Market data and news | No | Yahoo Finance and Google News receive request metadata and searched symbols | User controls searches and market screens; stock marks are local |
| Ads | No | No advertising SDK is included | Not applicable in the current release |
| Play Billing | No | Google Play processes purchases and returns purchase state | User controls purchases through Google Play |
| Manual export/import | User-controlled | Files may leave the device through the destination selected by the user | User chooses destination/password/sharing |

## Appendix C. Consent, permissions and settings matrix

KOVA uses a layered consent model. Accepting this Privacy Policy or the Terms of Service is not the same as enabling every optional feature.

| Permission/setting | Why it is used | Required for core budgeting? | Notes |
|---|---|---:|---|
| Internet/network access | Sign-in, Family Sharing, market data, ads, model downloads, cloud AI features, billing and provider SDKs | Partly | Offline/local budgeting can work without many online features, but some app components need network access |
| Camera | Receipt scanning, barcode scanning and related capture flows | No | Images are local by default |
| Microphone/record audio | Voice commands or speech input | No | Audio processing depends on Android/device speech recognition configuration |
| Notification Access | Optional payment detection from Google Wallet notifications | No | This is a sensitive Android permission and must be granted in system settings |
| Post notifications | Local reminders, detected-payment prompts and other app notifications | No | User can manage app notification settings in Android |
| Biometric/device credential | Protecting selected sensitive screens/settings where implemented | No | Uses Android biometric/device security APIs |
| Advertising ID | Ad measurement/personalization through ad SDKs | No | Requires appropriate disclosures and consent choices where applicable |
| Google/Firebase account | Sign-in and Family Sharing | No | Not required for local-only budgeting |
| Gemma model terms acceptance | Local AI model availability | No | The acceptance flag is stored on the device |
| Receipt AI enhancement toggle | Optional Firebase Vertex AI/Gemini interpretation of OCR text | No | Should remain clearly separate from local OCR |

## Appendix D. Retention and deletion matrix

The exact retention periods should be finalized by the app owner before publication. Until then, KOVA follows the functional retention principles below.

| Data type | Retention principle | User deletion/control |
|---|---|---|
| Local budget and finance records | Kept until the user deletes them, resets the app, imports over them, or app data is removed by Android | Delete in app where available; uninstall/clear app data removes local app storage |
| Encrypted local database | Kept on device while the app is installed | Clearing app data or uninstalling removes local database; destructive migrations may also remove local data in some upgrade edge cases |
| Local settings and encrypted preferences | Kept while the app is installed or until changed/reset | Change settings in app; clear app data/uninstall |
| Receipt images in cache | Temporary cache copy used for processing/export | Android/app cache cleanup or manual clearing may remove cache files |
| Saved receipt archive | Kept until user deletes receipt/archive data or app data is removed | Delete saved receipts where supported |
| Family Sharing cloud data | Kept while family/shared resource records remain active or are retained for operational/legal reasons | Stop sharing, leave a family, delete an owned family, or use Delete cloud account for recursive deletion of owned spaces and removal of your other memberships |
| Firebase Authentication data | Kept by Firebase/Google according to account/project configuration | Sign out only disconnects the app session; Settings → Data → Delete cloud account removes the KOVA Firebase account after reauthentication |
| Purchase records | Kept by Google Play; KOVA retains token hash/owner/status/expiry in Firestore until cloud-account deletion | Manage subscriptions/purchases through Google Play; Delete cloud account removes KOVA-held verification records |
| Market query/cache data | Kept according to provider logs and local cache behavior | User can stop using market features; provider-side retention follows provider policies |
| Ads data | Not collected by the current release | Not applicable |
| Export/backup files | Controlled by the user-selected destination | Delete files from the destination where they were saved/shared |

## Appendix E. Provider and SDK disclosure matrix

KOVA may interact with the following provider categories depending on enabled features. Some provider use is built into the app package even when the related feature is not actively used.

| Provider/category | Purpose | Data that may be involved |
|---|---|---|
| Google Firebase Authentication | Google/Firebase sign-in | Account identifiers, email, display name, profile photo URL, auth metadata |
| Google Cloud Firestore/Firebase | Family Sharing | Family/member/shared resource data and related metadata |
| Firebase Vertex AI / Gemini | Optional receipt interpretation | OCR text and prompt content; receipt text may include merchant, items, prices, dates and identifiers |
| Google ML Kit | Local text recognition and barcode recognition | Camera frames/images processed on device by the ML Kit component used in the app |
| Google Play Services Wearable | Phone-watch data transfer | Balance summaries, quick transaction payloads, AI questions/responses and related wearable data |
| Google Play Billing | Purchases, subscriptions and donations/support | Product IDs, purchase state, purchase tokens handled through Google Play |
| Yahoo Finance endpoints | Symbol search, market chart data and related market information | Tickers, symbols, ranges, request metadata |
| Google News RSS | Market/news feed display | Search/topic request metadata |
| Hugging Face or other model host, if configured | Optional local model download | Download request metadata such as IP address, user agent and requested model file |

## Appendix F. Important current limitations and product disclosures

To avoid overpromising, the following points are part of this policy:

- KOVA is not fully local-only if the user enables online features such as sign-in, Family Sharing, market data, Play Billing or remote model download.
- Family Sharing means selected financial or household data can be stored in Cloud Firestore and visible to invited family members according to their role and the resources shared.
- Signing out does not automatically delete local financial records, exported files, shared family records, provider logs, or existing cloud account data.
- Receipt scanning and OCR processing are local in the current release; receipt images and OCR text are not sent to cloud AI.
- Payment notification detection currently centers on supported wallet notifications found by the implemented parser. Any broader bank-detection wording in the product should match the actually supported parsers.
- Quiet hours and notification controls should be described only to the extent implemented. If a scheduling control is present but not fully enforced for all notifications, the policy and UI should not promise complete suppression.
- Google Play Billing handles payment-card processing. KOVA should not claim to collect card numbers directly.
- Investment and market features are informational and are not financial, investment, tax or legal advice.
- Some values must be completed by the app owner before publication: legal owner/controller, contact address, privacy email, effective date, child age threshold, controlling language and exact retention periods. The deletion function must also be deployed and smoke-tested.

## Appendix G. “We do not” statements for clarity

Based on the reviewed implementation, KOVA should make the following narrow statements only if they remain true in the production build:

- KOVA does not require a cloud account for basic local budgeting.
- KOVA does not directly receive the user’s full payment card number for Google Play purchases.
- KOVA does not automatically upload all local financial data merely because the app is installed.
- KOVA does not automatically turn a detected payment notification into a confirmed transaction without user confirmation in the reviewed flow.
- KOVA does not provide professional financial, legal, tax or investment advice.
- KOVA does not make optional cloud AI receipt enhancement mandatory for local receipt scanning.



