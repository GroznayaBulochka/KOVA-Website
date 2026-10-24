# KOVA Privacy Policy — LOCAL FREEMIUM V1 — DRAFT

Document revision: 2026-10-24. Updated: 24 October 2026. Publisher: Vadyslav Konohrai, private individual, Poland. Privacy/support contact: contact@kovacompass.app.

Status: DRAFT — awaiting final approval once the identified facts are completed. The preparation date is not an electronic signature, evidence of publication or retroactive application of new terms. Effective date following approval and disclosure to users: [OWNER_INPUT_REQUIRED].

Public privacy policy URL (English version): [https://kovacompass.app/privacy.html?lang=en](https://kovacompass.app/privacy.html?lang=en).

## 1. Scope

One-time support uses Google Play under the same client-only purchase-signature boundary. KOVA handles the product ID, signed purchase information and purchase token transiently to check and finalize the payment; it does not grant a Premium entitlement or store these support receipts in the financial backup. A local, non-sensitive flag records that support was opened so unfinished payments can be checked after restart. KOVA does not collect card details, send financial records, add Firebase login or analytics, or publish a supporter list. Google Play processes the payment under its own privacy terms. If you contact us about a payment, the correspondence rules below apply.

This policy describes KOVA_PHONE_LOCAL_FREEMIUM_V1, the Android phone app com.kova.budget. It has a free local finance base and an implemented optional Premium subscription still requiring full public-sales qualification, without a required KOVA account. This is not the policy for a website, Android, Google Play or former cloud services. Their separate terms do not remove the publisher's obligations for its own processing.

## 2. Local data and purposes

KOVA uses information you enter or select to provide functions on your device:

- Local profile name, local identifier and preferences: profile separation, language, currency and settings.
- Financial accounts, balances, amounts, currencies, dates, descriptions, categories, transactions, refunds and transfers: records and calculations.
- Budgets, goals, debts, recurring payments and net worth: planning and local summaries.
- Work profiles, rates, hours, breaks and information needed for earnings estimates: work records and forecasts.
- Notes, tasks, lists, events, receipts, selected images and file references: user-created content and local OCR.
- Calculation results and application technical state: reports, session restoration and reliable storage.

Do not enter unnecessary bank passwords, authentication codes, full card details or especially sensitive information. Notes and images may contain other people's data; minimize it and use it lawfully.

Currency and language searches filter lists on your device; these queries are not sent to the publisher or an online search service. The currency catalogue, language names and flag images are bundled with the app. A flag is a visual aid, not a determination of your location, citizenship or tax residence. Language and currency preferences are stored locally. In the language picker, selecting a row prepares a change; Apply saves it, while closing without applying keeps the previous language.

## 3. Local finances and optional purchases

The Free base stores financial records locally and requires no KOVA cloud account. The owner approved the Premium feature package: advanced local reports/comparisons, forecasts and work-income analytics. Calculations need sufficient relevant records. Purchase, restore and access refresh use Google Play and connectivity; a Google Play account is not a KOVA financial profile. Firebase Authentication, Google sign-in inside KOVA, financial cloud sync, Cloud Storage/Functions, advertising, Analytics/Crashlytics, push, Remote Config, Wear, online Family Sharing, market/bank APIs and AI/Command Layer remain disabled.

CURRENT CANDIDATE — NOT APPROVED FOR PUBLIC SALES: the owner selected client-only verification, without a KOVA verification server. KOVA communicates with the Google Play app through Android's billing interface. The release removes KOVA's INTERNET permission; Google Play uses its own network and account/payment processing. KOVA observes connection availability, which does not itself establish that a cached Play purchase is current. This is not a claim that the entire phone is offline.

KOVA receives purchase token, product/package, signed purchase information/signature and available purchase status from Play. It sends the relevant token back through Play for acknowledgement. A random local installation identifier separates the local access cache; it is not a financial owner identifier or Google account email. A locally verified signature checks authenticity, not exact expiry, current refund status or an unmodifiable device. KOVA does not receive card details, and no KOVA verifier receives financial records, Notes, OCR images, backups or purchase data. Google processes purchases under its applicable terms and privacy information.

The access cache is encrypted and authenticated with an installation-specific Android Keystore key and kept outside backups. It can be replaced by a later connected check and removed with installation data; the 48-hour access limit is not an automatic deletion period. Purchase data is not written to diagnostic logs. Financial backup/import does not grant Premium, copy the verification cache or transfer financial records through Play.

This version's access policy: up to 48 hours after a successful connected Play query cycle, measured with a monotonic device clock. Restarting the phone, unavailable reliable boot information or a clock discrepancy exceeding 2 minutes requires another check. Merely reopening KOVA neither resets nor extends this window. The app does not know or invent a confirmed subscription expiry. Offline launch does not extend this window. Play may return cached information even with connectivity, so expiry/refunds may be detected late. Suspension or uncertain ownership can require a refresh; basic use, stored records and backup/export remain available. Another installation restores purchases through Play separately from financial backup.

Opening a public document in an external browser is separate from reading bundled documents. Website cookies/analytics have separate disclosures and choices. Ordinary local reminders are not remote push.

## 4. Permissions, OCR and the device

The camera is optional for receipt photos. You can instead select an image through the system picker without camera permission. OCR uses models bundled with the app, without sending the image for remote recognition. Check amounts, currency, dates and content before saving: recognition can be wrong.

Notifications provide local reminders and depend on Android settings. Optional biometrics use system authentication; KOVA does not receive fingerprint or face templates. You can change permissions in Android settings. Refusal limits the relevant feature and is not permission to transmit data. This version does not use the microphone, an advertising identifier or location services. Access to a selected file also depends on its provider.

## 5. Protection and its limits

The main financial database uses SQLCipher. Installation-specific key material is protected using Android Keystore; it is not a portable backup password. Database encryption does not automatically cover every photo, auxiliary file, setting, export or item displayed on screen. Protect your phone and file access. Encryption does not guarantee protection against a compromised or unlocked device, malware, key loss or disclosure by the user.

## 6. Manual export and recovery

Manual export is a password-encrypted partial copy of the supported scope, not an image of the entire installation. It includes supported financial records and stored configurations, including work, and images embedded in a note document. It does not copy app preferences, installation keys, widget configuration, notification history, auxiliary synchronization queues or every cache. External receipt photos and file attachments are not copied. A saved URI or link is not a copy of the contents: a file may become unavailable after moving, deletion or permission loss. Keep those files separately.

You choose the destination in the system file picker. Selecting a cloud provider or sharing the file with another app may transfer data under that provider's terms. KOVA does not automatically upload the backup. Keep the file and a strong password safely, preferably separately. The publisher does not hold a recovery key for that password. After confirmation, import replaces the supported data scope of the selected profile. Recovering a compatible local backup into another installation requires explicit confirmation; it does not automatically adopt historical cloud accounts or multiple owners.

Language and main-currency preferences must be checked separately after recovery; the backup is not a copy of these app settings. Embedded note images differ from external image references. If an external image is missing or its provider denies access, the reference cannot restore the original file. KOVA does not retrieve a replacement image from the internet.

## 7. Retention and deletion

Local records remain on the device until you remove or replace them. Auxiliary data and caches depend on app and Android behavior, without a fixed cleanup period asserted here. Delete individual records through the available app functions. To remove installation data, use Android Settings → Apps → KOVA → Storage → Clear data/storage; wording varies by device. This removes local data and may make recovery impossible without a backup. Uninstalling also normally removes private app data.

Exported files, copies held by external providers, original images and copies shared with others must be removed separately. Deleting a record does not promise secure physical overwriting of every storage medium. This release config disables Android automatic cloud backup and device transfer of KOVA data; this is not a substitute for a manual backup.

## 8. Contact, operator-held data and rights

Local use does not require sending information to the publisher. If you contact it outside the app, it may receive your contact address, message and voluntary attachments. Do not send a complete database, backup password, keys or real financial information unless necessary. This document does not authorize demands for them.

Vadyslav Konohrai, Poland, contact@kovacompass.app, is responsible as controller for information received in the publisher's own correspondence handling. This does not mean remote access to financial records on your phone. Google is responsible for its store/payment processing under the [Google Privacy Policy](https://policies.google.com/privacy?hl=en); Google is not described as KOVA's financial-record server, and Play processing is not promised to occur solely in Poland or the EEA.

The draft correspondence process covers responding to a request or performing a contract (GDPR Article 6(1)(b), where relevant), complaints and legal duties (point (c), for a specific duty), and technical troubleshooting, security and establishing or defending claims (point (f), with an established legitimate interest and assessment of the person's rights). It does not cover newsletters, advertising or model training. Providing a contact and necessary description is voluntary, but their absence may prevent a response or identifying the issue; the entire database is not required. These grounds are not blanket consent and must match the actual process.

According to the publisher's declaration on 23 October 2026, messages sent to contact@kovacompass.app are forwarded by Cloudflare to the publisher's Gmail mailbox. The public contact remains contact@kovacompass.app. Message content, attachments and delivery information are therefore also handled by Google and Cloudflare. This is separate correspondence initiated by the sender, not automatic transmission of app records. Forwarding alone does not establish a Google Workspace agreement, a processing agreement or EEA-only storage. Providers describe their rules in the [Google Privacy Policy](https://policies.google.com/privacy?hl=en), [Cloudflare Privacy Policy](https://www.cloudflare.com/privacypolicy/) and [Cloudflare DPA](https://www.cloudflare.com/cloudflare-customer-dpa/). Reading public rules does not verify the publisher's account terms or the basis of every transfer in KOVA support.

REQUIRED BEFORE PUBLICATION: applicable roles and terms of Cloudflare/Gmail services, any additional recipients, required agreements, processing countries and EEA transfer grounds, and how to obtain information about safeguards [OWNER_INPUT_REQUIRED]. Cloudflare and Gmail are identified by the publisher; delivery and account settings have not been tested. On 23 October 2026 the publisher approved the planned procedure: ordinary technical inquiries for no more than 12 months after closure, unnecessary attachments no later than 30 days after closure, with earlier deletion when the purpose ends. This is an approved plan, not verified current practice; implementation remains outstanding. Complaints, disputes and settlement records require separately determined applicable periods and do not automatically follow these limits. There is no claim that messages are deleted after 48 hours or that automatic deletion is configured. Removing a message from the mailbox does not mean immediate removal from all provider systems; see [Google's retention information](https://policies.google.com/technologies/retention?hl=en).

Data requests are handled under applicable law. Under GDPR a response is generally due within one month; a permitted extension requires notification with reasons within that period. Identity checks should be proportionate — an identity-document scan or password is not routinely required. Lack of access to purely local records does not remove duties for information the operator actually receives. Rights and complaints information: [Poland's UODO](https://uodo.gov.pl/pl/493/2254).

Where GDPR applies to data processed by the operator, the rights appropriate to the circumstances include access, rectification, erasure, restriction, portability and objection; consent can be withdrawn where it is the basis of that processing. You can complain to the competent supervisory authority, including Poland's President of UODO, and seek judicial protection. Send requests to the privacy contact above; applicable law sets deadlines and limitations. The operator cannot remotely modify a database held solely on your phone. Statutory rights are not conditional on giving up claims.

Google Play may make order and settlement data available to the publisher, such as order number, product, amount, currency, refund status and, depending on the report, buyer information. These are not your financial records stored in KOVA. Having no KOVA server does not exclude this processing. Actual scope, access, exports and retention require confirmation before sales. See [Play orders](https://support.google.com/googleplay/android-developer/answer/2741495?hl=en) and [Play reports](https://support.google.com/googleplay/android-developer/answer/6135870?hl=en).

## 9. Former accounts and separate services

This release does not create online accounts. According to the publisher's declaration of 20 October 2026, previous cloud builds were used only by the publisher and test accounts, with no external non-test users. This version therefore does not offer users access to a former cloud account or migration from it. This statement of testing history is not a new Firebase audit or proof that test data was deleted. This version does not remove former resources. Please direct privacy questions to the contact above.

## 10. Children, changes and other information

Available interface languages are listed in Settings. The bundled policy and terms are available offline there. Additional language versions are machine-translated drafts awaiting language and legal review; their presence does not constitute publication approval or legal qualification for a country. Changing the interface language does not itself qualify distribution in any country.

KOVA is intended for people aged 13 and over, not children under 13. Worldwide distribution is planned, subject to store availability and individual countries' requirements; availability in every country is not promised. If local law requires a parent or guardian's involvement in use or particular data processing, being 13 does not replace that requirement. This document does not claim that the app verifies age or collects guardian consent. Data-processing consent and contractual capacity are separate issues.

In short: your entries stay on your phone. There is no cloud sign-in. Protect the phone, make manual backups and do not share the password. If you or your guardian have data questions, use the privacy contact; do not send passwords, identity documents or the complete database.

Local analysis is for the user; KOVA does not make credit, employment or eligibility decisions on the operator's behalf. This is not a claim about other parties' independent actions. The app does not conduct advertising tracking or require consent to analytics cookies; any website needs its own assessment.

The current policy should be available in Settings and at an approved public URL. Changes should identify the new revision and actual effective date, without retroactively authorizing new purposes. Future online services require new disclosures and appropriate grounds, not merely a text change. Library notices are in Settings. See also the [Terms](terms-of-service-en.md).

