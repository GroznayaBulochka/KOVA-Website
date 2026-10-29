package com.kova.budget.qualification

import androidx.room.withTransaction
import android.app.Instrumentation
import android.content.Intent
import androidx.test.core.app.ActivityScenario
import androidx.test.platform.app.InstrumentationRegistry
import androidx.test.uiautomator.By
import androidx.test.uiautomator.UiDevice
import androidx.test.uiautomator.Until
import com.kova.budget.MainActivity
import com.kova.budget.R
import com.kova.budget.data.*
import com.kova.budget.data.entitlement.LocalPremiumRepository
import com.kova.budget.data.entitlement.PremiumAccess
import com.kova.budget.data.entitlement.PremiumStatus
import io.mockk.every
import io.mockk.mockk
import com.kova.budget.data.local.OwnerTransactionResult
import com.kova.budget.data.local.UserDatabaseProvider
import com.kova.budget.data.repository.BudgetRepository
import com.kova.budget.data.repository.CreateTransactionResult
import com.kova.budget.data.repository.SettingsRepository
import com.kova.budget.di.SessionModule
import com.kova.budget.domain.features.KovaFeatureId
import com.kova.budget.domain.features.KovaReleaseContract
import com.kova.budget.notifications.FinancialBackgroundScheduler
import com.kova.core.session.*
import dagger.Binds
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.android.testing.*
import dagger.hilt.components.SingletonComponent
import java.io.File
import java.time.LocalDate
import java.util.UUID
import javax.inject.Inject
import javax.inject.Named
import javax.inject.Singleton
import kotlinx.coroutines.*
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.first
import org.json.JSONArray
import org.json.JSONObject
import org.junit.*
import org.junit.Assert.*

/** Ordinary MainActivity UI: no setContent, NavController injection or direct route.
 * Owner/session and explicit test-only Free/MOCK_ACTIVE licence bindings are isolated. The installed
 * guest preferences/database are never replaced. This is NOT onboarding/CRUD or
 * human TalkBack qualification, and an ActivityMonitor cannot observe all Binder IPC.
 */
@HiltAndroidTest
@UninstallModules(SessionModule::class)
class WebsiteEnglishPresentation53Test {
    @get:Rule val hilt = HiltAndroidRule(this)
    private val owner = LocalDataOwnerId("local_website-presentation-${UUID.randomUUID()}")
    @BindValue @JvmField val resolver: LocalDataOwnerResolver = object : LocalDataOwnerResolver {
        override suspend fun currentOwnerOrNull() = owner
        override suspend fun requireCurrentOwner() = owner
        override suspend fun currentSessionId() = owner.value
    }
    @BindValue @JvmField val coordinator: UserSessionCoordinator = object : UserSessionCoordinator {
        override val sessionState = MutableStateFlow<LocalSessionState>(LocalSessionState.Active(owner, owner.value))
        override suspend fun restoreResolvedSession() = Unit
        override suspend fun switchSession(nextOwnerId: LocalDataOwnerId?) = error("No session mutation in navigation test")
        override suspend fun logout() = error("No logout in navigation test")
        override suspend fun deleteCurrentAccount(): LocalDeletionReport = error("No deletion in navigation test")
    }
    @BindValue @JvmField val observer: LocalSessionStateObserver = coordinator
    // Instrumentation-only licence source, never a public override or proof of a Play purchase.
    private val premiumState = MutableStateFlow(PremiumAccess(PremiumStatus.FREE, false))
    @BindValue @JvmField val premium: LocalPremiumRepository = mockk<LocalPremiumRepository>(relaxed = true).also {
        every { it.observe() } returns premiumState
        every { it.access() } answers { premiumState.value }
    }
    @Module @InstallIn(SingletonComponent::class)
    abstract class SessionBindings {
        @Binds @Singleton abstract fun work(impl: AndroidLocalWorkManager): LocalWorkManager
        @Binds @Singleton abstract fun scheduler(impl: FinancialBackgroundScheduler): OwnerSessionWorkScheduler
        companion object {
            @Provides @Singleton @Named("IO") fun io(): CoroutineDispatcher = Dispatchers.IO
        }
    }
    @Inject lateinit var database: UserDatabaseProvider
    @Inject lateinit var budget: BudgetRepository
    @Inject lateinit var settings: SettingsRepository
    @Inject lateinit var financial: com.kova.budget.data.repository.FinancialDataRepository
    private val instrumentation get() = InstrumentationRegistry.getInstrumentation()
    private val target get() = instrumentation.targetContext
    private val args get() = InstrumentationRegistry.getArguments()
    private val device get() = UiDevice.getInstance(instrumentation)
    private lateinit var output: File
    private lateinit var localized: android.content.Context
    private val visited = JSONArray()
    private var premiumMode = "FREE"
    private val starts = java.util.concurrent.CopyOnWriteArrayList<JSONObject>()
    private val monitor = object : Instrumentation.ActivityMonitor() {
        override fun onStartActivity(intent: Intent): Instrumentation.ActivityResult? {
            // Keep only routing metadata, never extras or URI query strings.
            starts.add(JSONObject().put("action", intent.action).put("component", intent.component?.flattenToShortString())
                .put("package", intent.`package`).put("scheme", intent.data?.scheme))
            return null // Observation only; don't suppress real platform behavior.
        }
    }

    private lateinit var fixture: com.kova.budget.demo.DemoDataset.Data
    @Before fun setup() = runBlocking {
        check(target.packageName == "com.kova.budget.offlinequalification")
        check(android.os.Build.MODEL.contains("sdk_gphone"))
        check(args.getString("kovaUiConsent") == "ISOLATED_SYNTHETIC_OWNER_ONLY")
        check(args.getString("kovaUiMockConsent") == "LOCAL_ENTITLEMENT_FIXTURE_NOT_PLAY")
        check(args.getString("kovaUiLanguage") == "en" && args.getString("kovaUiTheme") == THEME_MODE_DARK)
        val token=requireNotNull(args.getString("kovaUiRun")).also { require(it.matches(Regex("[a-z0-9-]{8,80}"))) }
        output=File(target.getExternalFilesDir(null),"website-presentation/$token-en-DARK")
        check(!output.exists() && output.mkdirs())
        assertEquals(KovaReleaseContract.KOVA_PHONE_LOCAL_FREEMIUM_V1,KovaReleaseContract.current)
        assertFalse(KovaReleaseContract.current.networkEnabled)
        assertFalse(KovaReleaseContract.current.cloudAccountEnabled)
        premiumMode="MOCK_ACTIVE"
        premiumState.value=PremiumAccess(PremiumStatus.ACTIVE,true)
        hilt.inject()
        val today=LocalDate.now()
        check(today == LocalDate.of(2026,10,29)) { "Review dated website fixture before reuse" }
        val base=com.kova.budget.demo.DemoDataset.create(today,owner.value)
        val names=mapOf("Jedzenie" to "Groceries", "Mieszkanie" to "Housing", "Rachunki" to "Bills",
            "Transport" to "Transport", "Zdrowie" to "Health", "Rozrywka" to "Entertainment",
            "Ubrania" to "Clothing", "Podróże" to "Travel", "Dom i wyposażenie" to "Home & equipment",
            "Wynagrodzenie" to "Salary", "Przelew własny" to "Savings transfer", "Wypłata gotówki" to "Cash withdrawal")
        val accounts=mapOf("demo-current" to "Everyday account", "demo-savings" to "Emergency fund", "demo-cash" to "Cash wallet")
        val bills=mapOf("Najem mieszkania" to "Apartment rent", "Internet domowy" to "Home internet",
            "Telefon" to "Mobile plan", "Muzyka — abonament" to "Music subscription", "Karnet sportowy" to "Gym membership")
        val merchants=bills+mapOf("Pracodawca" to "Example Studio", "Bankomat" to "ATM", "Energia" to "Electricity",
            "Komunikacja miejska" to "City transport", "Sklep komputerowy" to "Computer shop", "Gabinet stomatologiczny" to "Dental clinic",
            "Sklep obuwniczy" to "Shoe shop", "Pensjonat" to "Guesthouse", "Sklep z wyposażeniem" to "Home store",
            "Piekarnia" to "Bakery", "Lunch przy biurze" to "Office lunch", "Kawiarnia" to "Coffee shop", "Kino" to "Cinema",
            "Sklep osiedlowy" to "Local shop", "Pizzeria" to "Pizza restaurant", "Apteka" to "Pharmacy")
        // Respect the real category registry. A presentation-only custom ID
        // must not steal a system category name during normal startup seeding.
        val english=target.createConfigurationContext(android.content.res.Configuration(target.resources.configuration).apply{setLocale(java.util.Locale.ENGLISH)})
        saveAppSettings(target,createDefaultAppSettings().copy(languageCode="en",currencyCode="PLN",onboardingComplete=false),owner)
        settings.loadSettings()
        val db=database.databaseFor(owner)
        assertTrue(db.transactionDao().getAllTransactionsSnapshot().isEmpty())
        ensureDefaultBudgetData(english,financial,settings)
        val library=db.categoryDao().getAllCategoriesSnapshot().map{it.toDomain()}
        check(library.isNotEmpty())
        val demoCategories=base.categories.map{category ->
            val name=names.getValue(category.name)
            library.firstOrNull{com.kova.core.finance.TransactionType.fromPersisted(it.type)==com.kova.core.finance.TransactionType.fromPersisted(category.type) && it.name.equals(name,true)}?:category.copy(name=name)
        }
        val allCategories=demoCategories+library.filter{entry -> demoCategories.none{it.id==entry.id}}
        check(allCategories.map{it.id}.distinct().size==allCategories.size)
        fixture=base.copy(
            accounts=base.accounts.map { it.copy(name=accounts.getValue(it.id)) },
            categories=allCategories,
            transactions=base.transactions.map { it.copy(name=names.getValue(it.name),merchantName=merchants[it.merchantName]?:it.merchantName,
                note=if(it.note.isBlank()) "" else when(it.type){"INCOME"->"Monthly salary";"TRANSFER"->"Transfer between my own accounts";else->"Fictional household expense"}) },
            payments=base.payments.map { it.copy(title=bills.getValue(it.title),merchantName=bills.getValue(it.title),
                category=names.getValue(it.category),categoryId=demoCategories.single{category->category.name==names.getValue(it.category)}.id,
                accountName=accounts.getValue(requireNotNull(it.accountId))) },
            goals=base.goals.map { it.copy(category=names.getValue(it.category)) },
            notes=base.notes.map { when(it.id){
                com.kova.budget.demo.DemoDataset.MARKER -> it.copy(title="About this demo",body="kova-demo-v1 · Fictional household for website screenshots. No real person, bank account or payment. As of $today.")
                "demo-note-emergency" -> it.copy(title="Emergency fund — next step",body="Target: PLN 15,000. Save PLN 600 after payday. A credit limit is not savings.")
                else -> it.copy(title="Autumn weekend",body="Compare the train and accommodation. Budget around PLN 700 per person before booking.") } },
            tasks=base.tasks.mapIndexed { i,it -> it.copy(text=listOf("Check the electricity meter", "Compare mobile plans", "Review this week's expenses")[i]) })
        db.withTransaction {
            assertTrue(db.transactionDao().getAllTransactionsSnapshot().isEmpty())
            val bootstrap=db.accountDao().getAllAccountsSnapshot()
            if(bootstrap.isNotEmpty()) {
                val main=bootstrap.single()
                check(main.id=="Main" && main.name=="Main" && main.balanceMinorUnits==0L && main.sharedFamilyId==null && !main.isArchived && (main.ownerUserId==null||main.ownerUserId==owner.value))
                db.accountDao().deleteAccount(main)
            }
            check(com.kova.budget.demo.DemoDatabaseInstaller.install(db,fixture,false))
            db.workProfileDao().insertProfile(com.kova.budget.data.work.local.WorkProfileEntity(
                "website-work", "Example Studio", "Example Studio", "Fictional work profile", "PL", "PL", "PL", "PL", "PL", "Europe/Warsaw",
                "PLN", "PLN", "EMPLOYMENT", "ACTIVE", "NOTHING", 1L, "website-work-op", "website-work-fixture", 1L, 1L, null))
            db.workProfileDao().insertCompensationTerms(com.kova.budget.data.work.local.WorkCompensationTermsEntity(
                "website-terms", "website-work", 1L, "FIXED_SALARY", 620000L, "PLN", "MONTHLY",
                today.withDayOfMonth(1).minusMonths(5).toEpochDay(), null, "website-terms-op", "website-terms-fixture", 1L))
        }
        val localFeatures=setOf(KovaFeatureId.DASHBOARD,KovaFeatureId.ACCOUNTS,KovaFeatureId.TRANSACTIONS,KovaFeatureId.CATEGORIES,
            KovaFeatureId.BUDGETS,KovaFeatureId.GOALS,KovaFeatureId.NOTES,KovaFeatureId.TASKS,KovaFeatureId.REPORTS_BASIC,
            KovaFeatureId.WORK_INCOME,KovaFeatureId.TIMELINE,KovaFeatureId.RECURRING_PAYMENTS,KovaFeatureId.NET_WORTH,KovaFeatureId.SETTINGS)
        saveAppSettings(target,createDefaultAppSettings().copy(languageCode="en",currencyCode="PLN",onboardingComplete=true,
            privacyPolicyAccepted=true,termsOfServiceAccepted=true,themeMode=THEME_MODE_DARK,appLockEnabled=false,
            profileName="Marta — demo",profileNameCustomized=true,featurePreferencesInitialized=true,
            enabledFeatureIds=localFeatures.map{it.name}.toSet(),developerModeEnabled=false),owner)
        settings.loadSettings()
        localized=target.createConfigurationContext(android.content.res.Configuration(target.resources.configuration).apply{setLocale(java.util.Locale.ENGLISH)})
        verifyMoney()
        instrumentation.addMonitor(monitor)
    }

    private fun label(id: Int) = localized.getString(id)
    private fun waitForText(text: String) {
        assertTrue("Visible label missing: $text", device.wait(Until.hasObject(By.text(text)), 30_000))
    }
    private fun revealText(text: String) {
        // Reports aggregates Room data asynchronously. A settled window may
        // still contain only its loading indicator, with no scroll container.
        // Use the existing 30s UI readiness budget; do not mistake that frame
        // for missing content or change the required financial result.
        val readyDeadline = android.os.SystemClock.uptimeMillis() + 30_000
        while (!device.hasObject(By.text(text)) && !device.hasObject(By.scrollable(true)) &&
            android.os.SystemClock.uptimeMillis() < readyDeadline) {
            android.os.SystemClock.sleep(100)
        }
        // At 150% text the account list is correctly below the summary. Exercise
        // normal scrolling instead of requiring below-fold records in the first frame.
        repeat(5) {
            if (device.hasObject(By.text(text))) return
            assertEquals(target.packageName, device.currentPackageName)
            var list: androidx.test.uiautomator.UiObject2? = null
            for (observation in 0..3) {
                try {
                    list = device.findObjects(By.scrollable(true)).maxByOrNull { it.visibleBounds.height() }
                    break
                } catch (stale: androidx.test.uiautomator.StaleObjectException) {
                    if (observation == 3) throw stale
                    // Only repeat the observation, never a money mutation or scroll.
                    device.waitForIdle()
                }
            }
            assertNotNull("No scrollable content for $text", list)
            list!!.scroll(androidx.test.uiautomator.Direction.DOWN, .65f)
            device.waitForIdle()
        }
        waitForText(text)
    }
    private fun clickText(text: String, moreResultTitle: Boolean = false) {
        waitForText(text)
        accessibilityClick(text, false, moreResultTitle)
        device.waitForIdle()
    }
    private fun revealMoney(pattern: java.util.regex.Pattern) {
        val selector = By.text(pattern)
        // Seeing the metric heading is not proof its amount is above the fold
        // at320dp/150%. Scroll to the unchanged independent910.00PLN oracle.
        repeat(5) {
            if (device.hasObject(selector)) return
            assertEquals(target.packageName, device.currentPackageName)
            var list: androidx.test.uiautomator.UiObject2? = null
            for (observation in 0..3) {
                try {
                    list = device.findObjects(By.scrollable(true)).maxByOrNull { it.visibleBounds.height() }
                    break
                } catch (stale: androidx.test.uiautomator.StaleObjectException) {
                    if (observation == 3) throw stale
                    device.waitForIdle() // Reobserve only, never retry a write.
                }
            }
            assertNotNull("No scrollable report for the independent net amount", list)
            list!!.scroll(androidx.test.uiautomator.Direction.DOWN, .65f)
            device.waitForIdle()
        }
        assertTrue("Expected net amount must be visible", device.wait(Until.hasObject(selector), 30_000))
    }
    private fun accessibilityClick(text: String, bottomOnly: Boolean, moreResultTitle: Boolean = false) {
        // Home's feature snapshot may finish loading after a bounds query. Use
        // the named native accessibility action, not a now-stale screen coordinate.
        val candidates = mutableListOf<android.view.accessibility.AccessibilityNodeInfo>()
        fun firstVisibleText(node: android.view.accessibility.AccessibilityNodeInfo): android.view.accessibility.AccessibilityNodeInfo? {
            if (node.isVisibleToUser && node.className?.toString() == "android.widget.TextView" && !node.text.isNullOrBlank()) return node
            repeat(node.childCount) { index -> node.getChild(index)?.let { firstVisibleText(it)?.let { title -> return title } } }
            return null
        }
        fun isMoreCardTitle(node: android.view.accessibility.AccessibilityNodeInfo): Boolean {
            var card: android.view.accessibility.AccessibilityNodeInfo? = node
            while (card != null && !card.isClickable) card = card.parent
            // MoreFeatureCard renders title, description, then badge. A matching
            // setting subtitle is not the destination title. Keep uniqueness and
            // the real named accessibility click; never choose an arbitrary match.
            return card != null && firstVisibleText(card) == node
        }
        fun visit(node: android.view.accessibility.AccessibilityNodeInfo) {
            val bounds = android.graphics.Rect().also(node::getBoundsInScreen)
            if (node.className?.toString() == "android.widget.TextView" && node.text?.toString() == text && node.isVisibleToUser &&
                (!bottomOnly || bounds.centerY() > device.displayHeight * .80) &&
                (!moreResultTitle || isMoreCardTitle(node))) candidates.add(node)
            repeat(node.childCount) { node.getChild(it)?.let(::visit) }
        }
        // Animated More search exposes both outgoing and incoming cards briefly.
        // Re-read until unambiguous; never pick an arbitrary duplicate or retry a click.
        val deadline = android.os.SystemClock.uptimeMillis() + 5_000
        var stableKey = ""
        var stableSince = 0L
        do {
            candidates.clear()
            val root = requireNotNull(instrumentation.uiAutomation.rootInActiveWindow)
            assertEquals(target.packageName, root.packageName.toString())
            visit(root)
            val key = candidates.singleOrNull()?.let { node ->
                val bounds = android.graphics.Rect().also(node::getBoundsInScreen)
                "${node.hashCode()}:$bounds"
            }.orEmpty()
            val now = android.os.SystemClock.uptimeMillis()
            if (key.isEmpty() || key != stableKey) { stableKey = key; stableSince = now }
            if (key.isNotEmpty() && now - stableSince >= 500) break
            android.os.SystemClock.sleep(100)
        } while (android.os.SystemClock.uptimeMillis() < deadline)
        assertEquals("Ambiguous named UI control: $text", 1, candidates.size)
        var action: android.view.accessibility.AccessibilityNodeInfo? = candidates.single()
        while (action != null && !action.isClickable) action = action.parent
        assertNotNull("No actionable parent for $text", action)
        assertEquals(target.packageName, device.currentPackageName)
        assertTrue("Native action node went stale before click: $text", action!!.refresh())
        assertTrue("Accessibility click failed for $text", action.performAction(android.view.accessibility.AccessibilityNodeInfo.ACTION_CLICK))
    }
    private fun freshBounds(text: String, bottomOnly: Boolean): List<android.graphics.Rect> {
        repeat(4) { attempt ->
            device.waitForIdle()
            try {
                return device.findObjects(By.text(text).clazz("android.widget.TextView")).map { android.graphics.Rect(it.visibleBounds) }
                    .filter { !it.isEmpty && (!bottomOnly || it.centerY() > device.displayHeight * .80) }
            } catch (stale: androidx.test.uiautomator.StaleObjectException) {
                if(attempt == 3) throw stale
                android.os.SystemClock.sleep(250) // Reacquire only; never retry a financial action.
            }
        }
        error("Unreachable")
    }
    private fun bottom(id: Int) {
        val text = label(id)
        // Work/settings use a full-screen destination without the bottom bar.
        // Return through the actual system Back path, never NavController.navigate.
        var backCount = 0
        while (freshBounds(text, true).isEmpty() && backCount < 3) {
            assertEquals(target.packageName, device.currentPackageName)
            device.pressBack()
            device.waitForIdle()
            backCount++
        }
        // Back from full-screen Work already restores the real More root.
        // Reselecting More intentionally rebuilds a product root (no saved
        // stack), so its outgoing search field must not receive the next edit.
        // Continue the ordinary Back -> existing More -> search route instead.
        // Continue with Free also returns to the existing More root. Do not
        // reselect that already-active tab and replace its search field while
        // the next accessibility setText is being applied.
        if (id == R.string.more && device.hasObject(By.text(label(R.string.more_subtitle)))) return
        assertTrue(device.wait(Until.hasObject(By.text(text)), 30_000))
        accessibilityClick(text, true)
        device.waitForIdle()
    }
    private fun capture(name: String) {
        assertEquals("Unexpected app foreground; stop without taking it back", target.packageName, device.currentPackageName)
        instrumentation.uiAutomation.waitForIdle(700, 5_000)
        if (android.os.Build.VERSION.SDK_INT >= 33) instrumentation.uiAutomation.clearCache()
        assertEquals(target.packageName, device.currentPackageName)
        device.dumpWindowHierarchy(File(output, "$name.xml"))
        assertTrue(device.takeScreenshot(File(output, "$name.png")))
        val root = instrumentation.uiAutomation.rootInActiveWindow
        assertNotNull("Accessibility tree absent", root)
        assertEquals(target.packageName, root.packageName.toString())
        visited.put(name)
    }
    private fun settledMoreSearchField(requireFocus: Boolean): android.view.accessibility.AccessibilityNodeInfo {
        val deadline = android.os.SystemClock.uptimeMillis() + 10_000
        var stableKey = ""
        var stableSince = 0L
        do {
            assertEquals(target.packageName, device.currentPackageName)
            val candidates = mutableListOf<android.view.accessibility.AccessibilityNodeInfo>()
            fun visit(node: android.view.accessibility.AccessibilityNodeInfo) {
                if (node.packageName?.toString() == target.packageName && node.isVisibleToUser && node.isEnabled &&
                    node.className?.toString() == "android.widget.EditText" && (!requireFocus || node.isFocused)) candidates.add(node)
                repeat(node.childCount) { index -> node.getChild(index)?.let(::visit) }
            }
            // More can replace its outgoing field after Continue with Free.
            // Reacquire only observations within the original10s field budget;
            // never retry a pointer action, text write or financial mutation.
            instrumentation.uiAutomation.rootInActiveWindow?.let { root ->
                if (root.packageName?.toString() == target.packageName) visit(root)
            }
            val field = candidates.singleOrNull()
            val bounds = android.graphics.Rect()
            val key = field?.takeIf { it.refresh() }?.let {
                it.getBoundsInScreen(bounds)
                if (bounds.isEmpty) "" else "${it.windowId}:${it.hashCode()}:$bounds:${it.isFocused}"
            }.orEmpty()
            val now = android.os.SystemClock.uptimeMillis()
            if (key.isEmpty() || key != stableKey) { stableKey = key; stableSince = now }
            if (field != null && key.isNotEmpty() && now - stableSince >= 500) return field
            android.os.SystemClock.sleep(100)
        } while (android.os.SystemClock.uptimeMillis() < deadline)
        error("No unique settled More search field, requireFocus=$requireFocus")
    }
    private fun openFromMore(id: Int, name: String, expectsProDialog: Boolean = false) {
        bottom(R.string.more)
        // Accounts also has an EditText. Wait for More's actual destination before
        // looking up the search box; waitForIdle alone doesn't await navigation.
        waitForText(label(R.string.more_subtitle))
        // Returning from full-screen Work can expose the outgoing search node
        // during the destination transition. Wait for the real window to settle
        // before setting text, and independently assert that the edit was applied.
        instrumentation.uiAutomation.waitForIdle(700, 5_000)
        val query = settledMoreSearchField(requireFocus = false)
        // Exercise the actual tap-to-focus path. After returning from the
        // paywall, an unfocused BasicTextField is not an established IME target;
        // writing through a cached outgoing node can report success without a
        // visible edit. Reacquire the focused field, never retry the write.
        val bounds = android.graphics.Rect().also(query::getBoundsInScreen)
        assertTrue("More search node must still exist before the one real tap", query.refresh())
        assertTrue("One observed real tap must focus More search", device.click(bounds.centerX(), bounds.centerY()))
        val focusedQuery = settledMoreSearchField(requireFocus = true)
        assertTrue("Focused More input must still be current before setText", focusedQuery.refresh())
        assertTrue("More search must accept the one accessibility text action", focusedQuery.performAction(
            android.view.accessibility.AccessibilityNodeInfo.ACTION_SET_TEXT,
            android.os.Bundle().apply { putCharSequence(
                android.view.accessibility.AccessibilityNodeInfo.ACTION_ARGUMENT_SET_TEXT_CHARSEQUENCE, label(id)) }))
        assertTrue("Search text was not applied to the settled More field", device.wait(
            Until.hasObject(By.clazz("android.widget.EditText").pkg(target.packageName).text(label(id))), 5_000))
        waitForText(label(R.string.more_results).uppercase()) // MoreSectionHeader renders uppercase.
        instrumentation.uiAutomation.waitForIdle(700, 5_000)
        capture("search-$name")
        // Dismiss only an actually observed keyboard; a blind Back can instead
        // leave More. The search result and query must survive this ordinary UI step.
        if (instrumentation.uiAutomation.windows.any {
                it.type == android.view.accessibility.AccessibilityWindowInfo.TYPE_INPUT_METHOD
            }) {
            device.pressBack()
            waitForText(label(R.string.more_subtitle))
            assertTrue(device.hasObject(By.clazz("android.widget.EditText")
                .pkg(target.packageName).text(label(id))))
        }
        clickText(label(id), moreResultTitle = true)
        if (expectsProDialog) {
            waitForText(label(R.string.more_search_pro_required))
            waitForText(label(R.string.more_search_buy))
            waitForText(label(R.string.more_search_back))
            capture(name)
            return
        }
        assertTrue("More must actually navigate to $name", device.wait(
            Until.gone(By.text(label(R.string.more_subtitle))), 15_000))
        device.waitForIdle()
        capture(name)
    }
    private suspend fun verifyMoney() {
        val db=database.databaseFor(owner)
        val rows=db.transactionDao().getAllTransactionsSnapshot()
        assertEquals(fixture.transactions.size,rows.size)
        assertEquals(6,rows.count{it.type=="INCOME"})
        assertTrue(rows.all{it.ownerUserId==owner.value && it.currencyCode=="PLN" && it.amountMinorUnits>0})
        assertEquals(rows.size,rows.map{it.id}.distinct().size)
        val balances=fixture.openingBalances.toMutableMap()
        rows.forEach{tx ->
            balances[tx.accountId]=Math.addExact(balances.getValue(tx.accountId),if(tx.type=="INCOME") tx.amountMinorUnits else -tx.amountMinorUnits)
            tx.transferAccountId?.let{balances[it]=Math.addExact(balances.getValue(it),tx.amountMinorUnits)}
        }
        assertEquals(balances,db.accountDao().getAllAccountsSnapshot().associate{it.id to it.balanceMinorUnits})
        fixture.occurrences.forEach{occurrence ->
            val tx=rows.single{it.id==occurrence.linkedTransactionId}
            assertEquals(tx.amountMinorUnits,occurrence.actualAmountMinorUnits)
            assertEquals(tx.dateEpochDay,occurrence.actualDateEpochDay)
        }
        assertEquals(3,db.goalDao().getAllGoalsSnapshot().size)
        assertEquals(3,db.notebookDao().getAllNotesSnapshot().size)
        assertEquals(1,db.workProfileDao().getAllProfilesSnapshot().size)
        File(output,"fixture-verification.json").writeText(JSONObject().put("status","PASS_INDEPENDENT_ROOM_ORACLE")
            .put("fictional",true).put("asOf",fixture.asOf.toString()).put("transactions",rows.size)
            .put("accountBalancesMinorPLN",JSONObject(balances)).put("salaries",6).put("budgetLimits",3)
            .put("notes",3).put("workProfiles",1).put("licence","INSTRUMENTATION_ONLY_MOCK_NOT_PLAY").toString(2))
    }
    private fun finalShot(name:String) {
        android.os.SystemClock.sleep(2_000)
        capture("final-$name")
    }
    @Test fun actualEnglishScreensWithIndependentlyVerifiedFictionalData() {
        ActivityScenario.launch(MainActivity::class.java).use {
            try {
                waitForText(label(R.string.more))
                waitForText(label(R.string.notes))
                finalShot("home")
                openFromMore(R.string.accounts,"accounts")
                revealText("Everyday account")
                finalShot("accounts")
                openFromMore(R.string.transactions,"transactions")
                revealText(label(R.string.net_cashflow_label))
                // Independent October oracle:6200.00 income -4307.35 expense.
                // A visible heading alone must not qualify an unavailable amount.
                waitForText(formatPrivateMoney(com.kova.core.finance.Money.ofMinorUnits(189265L,
                    com.kova.core.finance.CurrencyCode("PLN")),false))
                finalShot("transactions")
                openFromMore(R.string.goals_limits,"budgets")
                revealText("Groceries")
                finalShot("budgets")
                openFromMore(R.string.recurring_payments,"recurring")
                revealText("Apartment rent")
                finalShot("recurring")
                openFromMore(R.string.reports_btn,"reports")
                revealText(label(R.string.net_cashflow_label))
                finalShot("reports")
                openFromMore(R.string.financial_calendar_label,"calendar")
                finalShot("calendar")
                bottom(R.string.notes)
                revealText("Emergency fund — next step")
                finalShot("notes")
                openFromMore(R.string.work_income_title,"work")
                revealText("Example Studio")
                finalShot("work")
                runBlocking{verifyMoney()}
                assertTrue(com.google.firebase.FirebaseApp.getApps(target).isEmpty())
            } catch(failure:Throwable) {
                if(device.currentPackageName==target.packageName) capture("failure")
                throw failure
            }
        }
    }

    @After fun evidence() {
        instrumentation.removeMonitor(monitor)
        if (::output.isInitialized && device.currentPackageName == target.packageName) {
            device.dumpWindowHierarchy(File(output, "last-observed.xml"))
            device.takeScreenshot(File(output, "last-observed.png"))
        }
        if (::output.isInitialized) File(output, "observations.json").writeText(JSONObject()
            .put("screensReached", visited).put("activityStarts", JSONArray(starts))
            .put("scope", "Actual ordinary navigation; owner/session synthetic. JUnit result separate. Not all Binder IPC, process death, CRUD or human accessibility.")
            .put("premiumMode", premiumMode).put("licenceSource", "INSTRUMENTATION_ONLY_MOCK_NOT_PLAY")
            .put("fontScale", target.resources.configuration.fontScale).put("language", args.getString("kovaUiLanguage"))
            .put("theme", args.getString("kovaUiTheme")).toString(2))
        // Restore process locale only; never modify the installed guest's preferences.
        com.kova.budget.applyAppLocale("en")
    }
}
