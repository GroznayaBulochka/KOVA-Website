KOVA presentation refresh — 21 October 2026

Purpose: authentic screenshots of existing Offline V1 features with fictional,
plausible financial records. No product-feature implementation or release claim.

INPUTS
runtime.json pins APK/test APK and actual Android runtime observations.
provenance.json pins the original unchanged screenshots, captured UI hierarchies,
existing DemoDataset and the explicit opt-in instrumentation helper.
web-results.json pins current website inputs and each browser test command.
apk-permissions.log confirms the isolated APK has no INTERNET permission.

DATA AND CAPTURE
Only KOVA_Demo / emulator-5560 and the newly installed isolated qualification
package were used. No physical phone, cloud project or private finances accessed.
Existing ordinary KOVA installation in the emulator was left intact.
Existing debug DemoDataset/installer supplies 214 transactions across six months,
3 accounts, 5 recurring payments, 3 spending limits, 3 notes and 3 tasks.
The fictional monthly salary is 6200 PLN. No statistical representativeness claim.

Build command (KOVA-App root; existing JDK from Android Studio):
gradlew.bat :app:assembleDebugAndroidTest -PKOVA_PHONE_FREE_V1_TEST=true --init-script scripts/offline-v1-qualification-device.gradle --offline --max-workers=1 --console=plain

Opt-in test command, ONLY in the guarded synthetic emulator installation:
adb -s emulator-5560 shell am instrument -w -r -e class com.kova.budget.qualification.OfflinePresentationDemoTest -e kovaPresentationConsent synthetic-empty-emulator-only com.kova.budget.offlinequalification.test/com.kova.budget.KovaTestRunner

The helper refuses unknown populated profiles; only the automatic zero-value Main
bootstrap row can be removed inside the same guarded Room transaction. No app data
was cleared. Normal onboarding, reading the draft documents, selecting PLN, Polish
and dark theme were completed through ordinary UI. The test's preference save was
not sufficient to bypass onboarding; no automatic-settings success is claimed.
Website qa/capture-presentation.ps1 records normal UI navigation and raw screenshots.
No screenshot pixels were modified. The emulator was stopped afterwards; its data
and both existing/new installations remain available.

RESULTS
fixture-test.log: OK (1 test), exact balances/ownership/record counts and recurring
occurrence links. fixture-after-ui.log: same case PASS again after screen capture.
This is one independent test case executed successfully twice, not two cases.
site-checks.log: 15/15 check groups PASS.
release-check.log: 41/41 checks PASS; unapproved publication command exits 2 as required.
web-results.json: current nine-case browser matrix, final per-case status therein.
The final Russian-only play label is shortened to fit a 320 px screen; its targeted
post-build rerun is web-ru-320-final.log/png. The nine-case matrix pins the preceding
source; no unrelated success is claimed as a new execution after that text edit.
Checks cover eight chapters, Home/End, next/previous, paused opening, replay from the
end, one real timer advance, image loading, lightbox, language switching, viewport
overflow, accessible control names and absence of unexpected external requests.
Automated checks are not human accessibility or physical-device testing.

NON-SUCCESSFUL PREPARATION ATTEMPTS
test-build.log: incorrect isolated-build argument; corrected with existing init script.
fixture-test-initial-low-memory.log: process stopped by Android LOW_MEMORY
(initial-exit-info.log), not counted as PASS. Owned build daemons stopped first.
fixture-test-bootstrap-refusal.log: installer correctly refused generated Main
account; guarded test-only bootstrap handling added, then rebuilt and retested.
reports.png captures loading; home-dark.png captures a confirmation; home-final.png
captures the drawer; notes-finance-ready.png captures an empty filter. None ships.
Only the eight originals explicitly listed by provenance.json ship.

BOUNDARIES
Production Android source, financial engines, release flags, signing, private
Workspace storage, Firebase and AI were not changed. No commit, push or deployment.
Old screenshot source assets remain archived. Only their three identical generated
dist copies were replaced. Draft legal/publication gates remain closed.
