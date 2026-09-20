(() => {
  'use strict';

  const STORAGE_KEY = 'kova_workspace_v1';
  const LANGUAGE_KEY = 'kova_workspace_language';
  const statusOrder = ['backlog', 'active', 'blocked', 'done'];
  const nowIso = () => new Date().toISOString();
  const makeId = () => `${Date.now().toString(36)}-${crypto.getRandomValues(new Uint32Array(1))[0].toString(36)}`;

  const copy = {
    pl: {
      skip:'Przejdź do pulpitu',navBoard:'Prace',navNotes:'Notatki',navScreens:'Ekrany',navDocs:'Dokumenty',language:'Język',addWork:'Dodaj pracę',localWorkspace:'KOVA Workspace',title:'Postęp projektu',lede:'Zadania, notatki i wyniki sprawdzeń.',appVersion:'Wersja aplikacji',androidTarget:'Android',database:'Baza danych',releaseState:'Stan wydania',releaseNotPublic:'Nieopublikowane',overallProgress:'Postęp zapisanych prac',activeWork:'W toku',activeWorkHint:'pozycje wymagające działania',blockedWork:'Zablokowane',blockedWorkHint:'zależności zewnętrzne lub decyzje',verifiedWork:'Zakończone',verifiedWorkHint:'pozycje zamknięte i sprawdzone',truthTitle:'Rzeczywisty stan wydania',truthCopy:'KOVA jest rozwijaną aplikacją Android. Kompilacje debug i lokalne release są weryfikowane, ale publiczne wydanie, produkcyjne podpisanie oraz pełne testy usług na żywo nie są jeszcze potwierdzone. Ta strona nie udostępnia fikcyjnego przycisku pobierania.',viewStatus:'Pełny status',workRegister:'Rejestr prac',boardTitle:'Co dzieje się w KOVA',search:'Szukaj',searchPlaceholder:'Szukaj prac i notatek',filterAll:'Wszystkie statusy',statusBacklog:'Do zrobienia',statusActive:'W toku',statusBlocked:'Zablokowane',statusDone:'Zakończone',emptyBoard:'Brak prac pasujących do filtra.',decisionLog:'Dziennik decyzji',notesTitle:'Notatki i ustalenia',noteLabel:'Zapisz decyzję lub wynik sprawdzenia',notePlaceholder:'Np. Weryfikacja na urządzeniu zakończona bez awarii…',saveNote:'Zapisz notatkę',emptyNotes:'Nie zapisano jeszcze żadnej notatki.',verifiedScope:'Zweryfikowany zakres',evidenceTitle:'Co jest potwierdzone',evidenceBuild:'Debug build i kompilacja testów',evidenceBuildCopy:'Lokalne zadania Gradle wykonywane na bieżącym drzewie.',evidenceDb:'Room 51 i migracje',evidenceDbCopy:'Jawne migracje bez destrukcyjnego fallbacku.',evidenceDevice:'Fizyczny Samsung API 36',evidenceDeviceCopy:'Instalacja, cold start i kluczowe ekrany bez FATAL/ANR w zapisanym przebiegu.',evidenceLimit:'Weryfikacja wysokiego ryzyka pozostaje niepełna',evidenceLimitCopy:'Produkcyjne podpisanie, live Firebase/billing/usunięcie konta i sparowany Wear wymagają osobnego środowiska.',openRoadmap:'Otwórz roadmapę →',realScreens:'Prawdziwe ekrany aplikacji',screensTitle:'Zarejestrowane na emulatorze i urządzeniu',screensCopy:'Bez makiet i fikcyjnych danych interfejsu. Każdy obraz pochodzi z uruchomionej kompilacji KOVA.',screenHome:'Ekran główny',screenWork:'Praca i dochód',screenMore:'Menu Więcej',screenProfile:'Profil',physicalDevice:'Fizyczny Samsung, API 36',emulatorDark:'Emulator, tryb ciemny',projectDocs:'Dokumenty projektu',documentsTitle:'Informacje, które można zweryfikować',docStatus:'Status',docStatusCopy:'Bieżąca gotowość, testy i blokady.',docRoadmap:'Roadmapa',docRoadmapCopy:'Priorytety wynikające z faktycznego backlogu.',docUpdates:'Zmiany',docUpdatesCopy:'Udokumentowane zakończone prace.',docSecurity:'Bezpieczeństwo',docSecurityCopy:'Granice przechowywania lokalnego i usług zdalnych.',docPrivacy:'Prywatność',docPrivacyCopy:'Jak aplikacja i pulpit przetwarzają dane.',docTerms:'Warunki użycia',docTermsCopy:'Zakres produktu i ograniczenia.',footerLocal:'Workspace przechowuje wpisy lokalnie w tej przeglądarce.',resetWorkspace:'Przywróć dane początkowe',workItem:'Pozycja pracy',addWorkTitle:'Dodaj pracę do rejestru',editWorkTitle:'Edytuj pracę',taskTitle:'Tytuł *',area:'Obszar',priority:'Priorytet',status:'Status',progress:'Postęp',details:'Notatka / dowód',detailsPlaceholder:'Co zostało zrobione, jak sprawdzono, co blokuje następny krok?',delete:'Usuń',cancel:'Anuluj',save:'Zapisz',updated:'Aktualizacja',exportName:'kova-workspace-export',resetConfirm:'Usunąć lokalne zmiany i przywrócić początkowy rejestr?',deleteConfirm:'Usunąć tę pozycję pracy?',noteDelete:'Usuń notatkę',taskOpen:'Otwórz i edytuj'
    },
    en: {
      skip:'Skip to workspace',navBoard:'Work',navNotes:'Notes',navScreens:'Screens',navDocs:'Documents',language:'Language',addWork:'Add work',localWorkspace:'KOVA Workspace',title:'Project progress',lede:'Tasks, notes, and verification results.',appVersion:'App version',androidTarget:'Android',database:'Database',releaseState:'Release state',releaseNotPublic:'Not published',overallProgress:'Recorded work progress',activeWork:'In progress',activeWorkHint:'items that require action',blockedWork:'Blocked',blockedWorkHint:'external dependencies or decisions',verifiedWork:'Completed',verifiedWorkHint:'closed and verified items',truthTitle:'Actual release state',truthCopy:'KOVA is an Android application under active development. Debug and local release builds are verified, but public distribution, production signing and complete live-service tests are not yet confirmed. This site does not show a fake download button.',viewStatus:'Full status',workRegister:'Work register',boardTitle:'What is happening in KOVA',search:'Search',searchPlaceholder:'Search work and notes',filterAll:'All statuses',statusBacklog:'Backlog',statusActive:'In progress',statusBlocked:'Blocked',statusDone:'Completed',emptyBoard:'No work matches this filter.',decisionLog:'Decision log',notesTitle:'Notes and decisions',noteLabel:'Record a decision or verification result',notePlaceholder:'For example: device verification completed without a crash…',saveNote:'Save note',emptyNotes:'No notes have been recorded yet.',verifiedScope:'Verified scope',evidenceTitle:'What is confirmed',evidenceBuild:'Debug build and test compilation',evidenceBuildCopy:'Local Gradle checks executed on the current tree.',evidenceDb:'Room 51 and migrations',evidenceDbCopy:'Explicit migrations without destructive fallback.',evidenceDevice:'Physical Samsung API 36',evidenceDeviceCopy:'Install, cold start and key screens without FATAL/ANR in the recorded run.',evidenceLimit:'High-risk verification remains incomplete',evidenceLimitCopy:'Production signing, live Firebase/billing/account deletion and paired Wear need a dedicated environment.',openRoadmap:'Open roadmap →',realScreens:'Real application screens',screensTitle:'Captured on emulator and device',screensCopy:'No mockups or fabricated interface data. Every image comes from a running KOVA build.',screenHome:'Home',screenWork:'Work & Income',screenMore:'More menu',screenProfile:'Profile',physicalDevice:'Physical Samsung, API 36',emulatorDark:'Emulator, dark mode',projectDocs:'Project documents',documentsTitle:'Information you can verify',docStatus:'Status',docStatusCopy:'Current readiness, tests and blockers.',docRoadmap:'Roadmap',docRoadmapCopy:'Priorities based on the actual backlog.',docUpdates:'Updates',docUpdatesCopy:'Documented completed work.',docSecurity:'Security',docSecurityCopy:'Boundaries of local storage and remote services.',docPrivacy:'Privacy',docPrivacyCopy:'How the app and workspace process data.',docTerms:'Terms of use',docTermsCopy:'Product scope and limitations.',footerLocal:'Workspace stores entries locally in this browser.',resetWorkspace:'Restore initial data',workItem:'Work item',addWorkTitle:'Add work to the register',editWorkTitle:'Edit work',taskTitle:'Title *',area:'Area',priority:'Priority',status:'Status',progress:'Progress',details:'Note / evidence',detailsPlaceholder:'What was done, how was it verified, what blocks the next step?',delete:'Delete',cancel:'Cancel',save:'Save',updated:'Updated',exportName:'kova-workspace-export',resetConfirm:'Remove local changes and restore the initial register?',deleteConfirm:'Delete this work item?',noteDelete:'Delete note',taskOpen:'Open and edit'
    },
    ru: {
      skip:'Перейти к панели',navBoard:'Работы',navNotes:'Заметки',navScreens:'Экраны',navDocs:'Документы',language:'Язык',addWork:'Добавить работу',localWorkspace:'KOVA Workspace',title:'Прогресс проекта',lede:'Задачи, заметки и результаты проверок.',appVersion:'Версия приложения',androidTarget:'Android',database:'База данных',releaseState:'Состояние релиза',releaseNotPublic:'Не опубликовано',overallProgress:'Прогресс записанных работ',activeWork:'В работе',activeWorkHint:'позиции, требующие действий',blockedWork:'Заблокировано',blockedWorkHint:'внешние зависимости или решения',verifiedWork:'Завершено',verifiedWorkHint:'закрытые и проверенные позиции',truthTitle:'Фактическое состояние релиза',truthCopy:'KOVA — Android-приложение в активной разработке. Debug- и локальные release-сборки проверяются, но публичный выпуск, production-подпись и полная проверка живых сервисов ещё не подтверждены. На сайте нет фиктивной кнопки загрузки.',viewStatus:'Полный статус',workRegister:'Реестр работ',boardTitle:'Что происходит в KOVA',search:'Поиск',searchPlaceholder:'Поиск по работам и заметкам',filterAll:'Все статусы',statusBacklog:'Запланировано',statusActive:'В работе',statusBlocked:'Заблокировано',statusDone:'Завершено',emptyBoard:'Нет работ, соответствующих фильтру.',decisionLog:'Журнал решений',notesTitle:'Заметки и решения',noteLabel:'Запишите решение или результат проверки',notePlaceholder:'Например: проверка на устройстве завершена без сбоя…',saveNote:'Сохранить заметку',emptyNotes:'Заметок пока нет.',verifiedScope:'Проверенный объём',evidenceTitle:'Что подтверждено',evidenceBuild:'Debug-сборка и компиляция тестов',evidenceBuildCopy:'Локальные проверки Gradle выполняются на текущем дереве.',evidenceDb:'Room 51 и миграции',evidenceDbCopy:'Явные миграции без разрушительного fallback.',evidenceDevice:'Физический Samsung API 36',evidenceDeviceCopy:'Установка, холодный запуск и основные экраны без FATAL/ANR в записанном прогоне.',evidenceLimit:'Высокорисковая проверка остаётся неполной',evidenceLimitCopy:'Production-подпись, live Firebase/billing/удаление аккаунта и парный Wear требуют отдельного окружения.',openRoadmap:'Открыть roadmap →',realScreens:'Настоящие экраны приложения',screensTitle:'Сняты на эмуляторе и устройстве',screensCopy:'Без макетов и вымышленных экранов. Все изображения получены из запущенной сборки KOVA.',screenHome:'Главная',screenWork:'Работа и доход',screenMore:'Меню «Ещё»',screenProfile:'Профиль',physicalDevice:'Физический Samsung API 36',emulatorDark:'Эмулятор, тёмная тема',projectDocs:'Документы проекта',documentsTitle:'Проверяемая информация',docStatus:'Статус',docStatusCopy:'Текущая готовность, тесты и блокировки.',docRoadmap:'Roadmap',docRoadmapCopy:'Приоритеты из фактического backlog.',docUpdates:'Изменения',docUpdatesCopy:'Документированные завершённые работы.',docSecurity:'Безопасность',docSecurityCopy:'Границы локального хранения и удалённых сервисов.',docPrivacy:'Конфиденциальность',docPrivacyCopy:'Как приложение и панель обрабатывает данные.',docTerms:'Условия использования',docTermsCopy:'Объём продукта и ограничения.',footerLocal:'Workspace хранит записи локально в этом браузере.',resetWorkspace:'Восстановить исходные данные',workItem:'Рабочая позиция',addWorkTitle:'Добавить работу в реестр',editWorkTitle:'Редактировать работу',taskTitle:'Название *',area:'Область',priority:'Приоритет',status:'Статус',progress:'Прогресс',details:'Заметка / доказательство',detailsPlaceholder:'Что сделано, как проверено, что блокирует следующий шаг?',delete:'Удалить',cancel:'Отмена',save:'Сохранить',updated:'Обновлено',exportName:'kova-workspace-export',resetConfirm:'Удалить локальные изменения и восстановить исходный реестр?',deleteConfirm:'Удалить эту рабочую позицию?',noteDelete:'Удалить заметку',taskOpen:'Открыть и изменить'
    }
  };

  copy.pl.backHome = 'Strona główna';
  copy.en.backHome = 'Home';
  copy.ru.backHome = 'На главную';

  Object.assign(copy.pl, {
    skipOfficial:'Przejdź do treści', officialProject:'Oficjalny projekt', navProduct:'Aplikacja',
    activeDevelopment:'Oficjalna strona · aktywny rozwój', officialTitle:'Twoje finanse. Jaśniejsza przyszłość.',
    officialLede:'KOVA to rozwijana aplikacja Android, która łączy codzienne finanse, budżety, cele, raporty oraz pracę i dochód w jednym prywatnym centrum decyzji.',
    seeApp:'Zobacz aplikację', checkStatus:'Sprawdź stan projektu', releaseCaveat:'Publiczna wersja instalacyjna nie została jeszcze potwierdzona. Pokazujemy wyłącznie faktyczny stan projektu.', realBuild:'Rzeczywista kompilacja',
    productKicker:'Jedna aplikacja, pełniejszy obraz', productTitle:'Finanse osobiste bez rozdzielania życia na osobne arkusze', productCopy:'KOVA porządkuje informacje lokalnie i pokazuje je w kontekście: od transakcji i budżetu po przewidywane dochody z pracy.',
    featureMoney:'Pieniądze na co dzień', featureMoneyCopy:'Konta, przychody, wydatki, kategorie, budżety i cele w jednej spójnej historii.',
    featureInsight:'Raporty i prognozy', featureInsightCopy:'Zestawienia, trend majątku netto i prognozy oparte na zapisanych danych — bez udawanej pewności.',
    featureWork:'Praca i dochód', featureWorkCopy:'Profile pracy, godziny, estymacje brutto i netto oraz przewidywane terminy wypłat.',
    featurePrivate:'Prywatność z jasnymi granicami', featurePrivateCopy:'Podstawowe dane finansowe pozostają lokalne i szyfrowane; funkcje online są opcjonalne i opisane osobno.',
    docStorage:'Pamięć przeglądarki', docStorageCopy:'Jawne klucze localStorage używane przez Workspace.', docContact:'Kontakt', docContactCopy:'Aktualny stan kanałów wsparcia projektu.'
  });
  Object.assign(copy.en, {
    skipOfficial:'Skip to content', officialProject:'Official project', navProduct:'App',
    activeDevelopment:'Official site · active development', officialTitle:'Your finances. A brighter tomorrow.',
    officialLede:'KOVA is an Android app in active development, bringing everyday money, budgets, goals, reports, and Work & Income into one private decision centre.',
    seeApp:'See the app', checkStatus:'Check project status', releaseCaveat:'A public installable release has not been confirmed yet. We show only the project’s actual state.', realBuild:'Real running build',
    productKicker:'One app, a fuller picture', productTitle:'Personal finance without splitting your life across spreadsheets', productCopy:'KOVA organises information locally and shows it in context—from transactions and budgets to expected work income.',
    featureMoney:'Everyday money', featureMoneyCopy:'Accounts, income, expenses, categories, budgets, and goals in one coherent history.',
    featureInsight:'Reports and forecasts', featureInsightCopy:'Summaries, net-worth trends, and forecasts based on recorded data—without fabricated certainty.',
    featureWork:'Work & Income', featureWorkCopy:'Work profiles, hours, gross and net estimates, and expected paydays.',
    featurePrivate:'Privacy with clear boundaries', featurePrivateCopy:'Core financial data stays local and encrypted; online features are optional and documented separately.',
    docStorage:'Browser storage', docStorageCopy:'The localStorage keys used by Workspace, documented clearly.', docContact:'Contact', docContactCopy:'The current state of project support channels.'
  });
  Object.assign(copy.ru, {
    skipOfficial:'Перейти к содержимому', officialProject:'Официальный проект', navProduct:'Приложение',
    activeDevelopment:'Официальный сайт · активная разработка', officialTitle:'Ваши финансы. Более ясное будущее.',
    officialLede:'KOVA — Android-приложение в активной разработке, объединяющее повседневные финансы, бюджеты, цели, отчёты, работу и доход в одном приватном центре решений.',
    seeApp:'Посмотреть приложение', checkStatus:'Статус проекта', releaseCaveat:'Публичная устанавливаемая версия пока не подтверждена. Мы показываем только фактическое состояние проекта.', realBuild:'Реальная сборка',
    productKicker:'Одно приложение, полная картина', productTitle:'Личные финансы без разрозненных таблиц', productCopy:'KOVA упорядочивает данные локально и показывает их в контексте — от транзакций и бюджета до ожидаемого дохода от работы.',
    featureMoney:'Финансы на каждый день', featureMoneyCopy:'Счета, доходы, расходы, категории, бюджеты и цели в одной последовательной истории.',
    featureInsight:'Отчёты и прогнозы', featureInsightCopy:'Сводки, динамика капитала и прогнозы на основе записанных данных — без ложной уверенности.',
    featureWork:'Работа и доход', featureWorkCopy:'Профили работы, часы, оценка брутто и нетто и ожидаемые даты выплат.',
    featurePrivate:'Приватность с ясными границами', featurePrivateCopy:'Основные финансовые данные остаются локальными и зашифрованными; онлайн-функции опциональны и описаны отдельно.',
    docStorage:'Хранилище браузера', docStorageCopy:'Открытое описание ключей localStorage, используемых Workspace.', docContact:'Контакты', docContactCopy:'Текущее состояние каналов поддержки проекта.'
  });

  const initialTasks = [
    { id:'work-income-empty', title:{pl:'Nowy pusty ekran Praca i dochód',en:'New Work & Income empty state',ru:'Новый пустой экран «Работа и доход»'}, area:'Work & Income', priority:'P3', status:'done', progress:100, details:{pl:'Zweryfikowane w jasnym i ciemnym motywie. CTA, arkusz pomocy, prywatność i brak zduplikowanego przycisku +.',en:'Verified in light and dark themes. CTA, help sheet, privacy and no duplicate + action.',ru:'Проверено в светлой и тёмной теме: CTA, справка, конфиденциальность и отсутствие дублирующей кнопки +.'}, updated:'2026-09-14T11:17:26+02:00' },
    { id:'work-profile-wizard', title:{pl:'Sześciostopniowy kreator profilu pracy',en:'Six-step Work Profile wizard',ru:'Шестишаговый мастер профиля работы'}, area:'Work & Income', priority:'P2', status:'active', progress:90, details:{pl:'Kod i testy logiki są gotowe. Trwa końcowa weryfikacja UI, buildów i urządzenia.',en:'Implementation and model tests are complete. Final UI, build and device verification is running.',ru:'Код и тесты логики готовы. Выполняется итоговая проверка UI, сборок и устройства.'}, updated:nowIso() },
    { id:'family-google', title:{pl:'Utwardzenie Google Identity i Rodziny',en:'Google Identity and Family hardening',ru:'Усиление Google Identity и семьи'}, area:'Security', priority:'P1', status:'done', progress:100, details:{pl:'UID jest źródłem tożsamości, reguły Firestore ograniczają członkostwo, a opcjonalne odczyty rodziny nie wyłączają Home.',en:'UID is the identity source, Firestore rules constrain membership, and optional Family reads cannot take Home down.',ru:'UID является источником личности, правила Firestore ограничивают членство, а необязательные чтения семьи не ломают Home.'}, updated:'2026-09-14T09:45:00+02:00' },
    { id:'physical-replay', title:{pl:'Powtórka końcowego APK na fizycznym urządzeniu',en:'Replay final APK on the physical device',ru:'Повторная проверка финального APK на устройстве'}, area:'QA', priority:'P1', status:'blocked', progress:70, details:{pl:'Poprawiony APK uruchomił się bez FATAL/ANR. Ostatnia wzmocniona wersja wymaga ponownego połączenia ADB.',en:'The corrected APK launched without FATAL/ANR. The final strengthened build still needs an ADB reconnect.',ru:'Исправленный APK запустился без FATAL/ANR. Для последней усиленной сборки нужно повторное подключение ADB.'}, updated:'2026-09-14T09:45:00+02:00' },
    { id:'production-signing', title:{pl:'Produkcyjne podpisanie i publikacja',en:'Production signing and publication',ru:'Production-подпись и публикация'}, area:'Release', priority:'P0', status:'blocked', progress:35, details:{pl:'Lokalne release APK/AAB przechodzą, ale prawdziwe dane podpisujące i publiczny listing sklepu nie są dostępne w repozytorium.',en:'Local release APK/AAB builds pass, but real signing credentials and a public store listing are not available in the repository.',ru:'Локальные release APK/AAB собираются, но реальные ключи подписи и публичная страница магазина отсутствуют в репозитории.'}, updated:'2026-09-12T23:30:00+02:00' },
    { id:'live-services', title:{pl:'Weryfikacja usług Firebase, billing i usuwania konta na żywo',en:'Live Firebase, billing and account-deletion verification',ru:'Проверка live Firebase, billing и удаления аккаунта'}, area:'Security', priority:'P1', status:'blocked', progress:55, details:{pl:'Lokalne reguły, emulatory i testy funkcji przechodzą. Potrzebne jest jednorazowe środowisko live bez danych użytkowników.',en:'Local rules, emulators and function tests pass. A disposable live environment with no user data is still required.',ru:'Локальные правила, эмуляторы и тесты функций проходят. Требуется одноразовое live-окружение без пользовательских данных.'}, updated:'2026-09-14T08:00:00+02:00' },
    { id:'website-workspace', title:{pl:'Oficjalna strona KOVA i Workspace',en:'Official KOVA website and Workspace',ru:'Официальный сайт KOVA и Workspace'}, area:'Website', priority:'P2', status:'done', progress:100, details:{pl:'Oficjalna prezentacja produktu, prawdziwe ekrany i dokumenty są połączone z lokalnym rejestrem prac. Treść nie udaje publicznego wydania.',en:'The official product presentation, real screenshots, and documents are combined with a local work log. Copy does not pretend the app is publicly released.',ru:'Официальная презентация продукта, реальные экраны и документы объединены с локальным журналом работ. Сайт не изображает публичный релиз.'}, updated:nowIso() }
  ];

  let language = localStorage.getItem(LANGUAGE_KEY) || (navigator.language?.toLowerCase().startsWith('ru') ? 'ru' : navigator.language?.toLowerCase().startsWith('en') ? 'en' : 'pl');
  if (!copy[language]) language = 'pl';
  let state = readState();

  const q = (selector, root = document) => root.querySelector(selector);
  const qa = (selector, root = document) => [...root.querySelectorAll(selector)];
  const textFor = (value) => typeof value === 'string' ? value : value?.[language] || value?.pl || value?.en || '';
  const c = (key) => copy[language][key] || copy.pl[key] || key;

  function readState() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (parsed && Array.isArray(parsed.tasks) && Array.isArray(parsed.notes)) return parsed;
    } catch (_) { /* invalid local data falls back to the documented initial state */ }
    return { version:1, tasks:structuredClone(initialTasks), notes:[] };
  }
  function saveState() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
  function el(tag, className, value) { const node = document.createElement(tag); if (className) node.className = className; if (value !== undefined) node.textContent = value; return node; }
  function svgIcon(id) { const svg = document.createElementNS('http://www.w3.org/2000/svg','svg'); svg.setAttribute('class','workspace-svg-icon'); svg.setAttribute('aria-hidden','true'); const use = document.createElementNS('http://www.w3.org/2000/svg','use'); use.setAttribute('href',`assets/icons.svg#${id}`); svg.append(use); return svg; }
  function formatDate(value) { try { return new Intl.DateTimeFormat(language, { dateStyle:'medium', timeStyle:'short' }).format(new Date(value)); } catch (_) { return value; } }

  function applyLanguage() {
    document.documentElement.lang = language;
    q('#workspace-language').value = language;
    qa('[data-t]').forEach(node => { const value = c(node.dataset.t); if (value) node.textContent = value; });
    qa('[data-t-placeholder]').forEach(node => { const value = c(node.dataset.tPlaceholder); if (value) node.placeholder = value; });
    qa('[data-open-task]').forEach(node => node.setAttribute('aria-label', c('addWork')));
    q('.workspace-home-button').setAttribute('aria-label', c('backHome'));
    q('#workspace-language').setAttribute('aria-label', c('language'));
    render();
  }

  function render() {
    renderBoard(); renderNotes(); renderMetrics();
  }

  function renderMetrics() {
    const count = status => state.tasks.filter(task => task.status === status).length;
    const overall = state.tasks.length ? Math.round(state.tasks.reduce((sum, task) => sum + Number(task.progress || 0), 0) / state.tasks.length) : 0;
    q('[data-overall-progress]').textContent = `${overall}%`;
    q('[data-overall-progress-bar]').style.width = `${overall}%`;
    q('[data-count-active]').textContent = count('active');
    q('[data-count-blocked]').textContent = count('blocked');
    q('[data-count-done]').textContent = count('done');
  }

  function renderBoard() {
    const board = q('[data-board]'); board.replaceChildren();
    const query = q('[data-task-search]').value.trim().toLocaleLowerCase(language);
    const filter = q('[data-task-filter]').value;
    const filtered = state.tasks.filter(task => {
      const haystack = `${textFor(task.title)} ${task.area} ${textFor(task.details)}`.toLocaleLowerCase(language);
      return (!query || haystack.includes(query)) && (filter === 'all' || task.status === filter);
    });
    statusOrder.forEach(status => {
      const tasks = filtered.filter(task => task.status === status).sort((a,b) => b.priority.localeCompare(a.priority) || new Date(b.updated) - new Date(a.updated));
      const column = el('section','board-column'); column.dataset.status = status;
      const heading = el('div','board-column-heading'); heading.append(el('h3','',c(`status${status[0].toUpperCase()}${status.slice(1)}`)),el('span','',String(tasks.length))); column.append(heading);
      const stack = el('div','task-stack');
      tasks.forEach(task => stack.append(createTaskCard(task)));
      column.append(stack); board.append(column);
    });
    q('[data-empty-board]').hidden = filtered.length !== 0;
  }

  function createTaskCard(task) {
    const card = el('button','task-card'); card.type='button'; card.dataset.taskId=task.id; card.setAttribute('aria-label',`${c('taskOpen')}: ${textFor(task.title)}`);
    const meta=el('div','task-meta'); meta.append(el('span',`task-pill priority-${task.priority}`,task.priority),el('span','task-pill',task.area));
    card.append(meta,el('h4','',textFor(task.title)));
    if (textFor(task.details)) card.append(el('p','',textFor(task.details)));
    const progress=el('div','task-progress'); const label=el('div'); label.append(el('span','',c('progress')),el('strong','',`${task.progress}%`)); const track=el('div','task-progress-track'); const fill=el('i'); fill.style.width=`${task.progress}%`; track.append(fill); progress.append(label,track); card.append(progress,el('time','task-date',`${c('updated')}: ${formatDate(task.updated)}`));
    card.addEventListener('click',()=>openTask(task)); return card;
  }

  function renderNotes() {
    const list=q('[data-note-list]'); list.replaceChildren();
    [...state.notes].sort((a,b)=>new Date(b.created)-new Date(a.created)).forEach(note=>{const entry=el('article','note-entry');entry.append(el('p','',note.text),el('time','',formatDate(note.created)));const remove=el('button');remove.type='button';remove.setAttribute('aria-label',c('noteDelete'));remove.append(svgIcon('x'));remove.addEventListener('click',()=>{state.notes=state.notes.filter(item=>item.id!==note.id);saveState();renderNotes();});entry.append(remove);list.append(entry);});
    q('[data-empty-notes]').hidden=state.notes.length!==0;
  }

  const dialog=q('[data-task-dialog]'), form=q('[data-task-form]'), range=q('[name="progress"]'), progressOutput=q('[data-progress-output]'), deleteButton=q('[data-delete-task]');
  function openTask(task=null){form.reset();form.elements.id.value=task?.id||'';form.elements.title.value=textFor(task?.title)||'';form.elements.area.value=task?.area||'Android';form.elements.priority.value=task?.priority||'P2';form.elements.status.value=task?.status||'active';form.elements.progress.value=task?.progress??50;form.elements.details.value=textFor(task?.details)||'';progressOutput.textContent=`${form.elements.progress.value}%`;deleteButton.hidden=!task;q('#task-dialog-title').textContent=task?c('editWorkTitle'):c('addWorkTitle');dialog.showModal();setTimeout(()=>form.elements.title.focus(),0);}
  function closeTask(){dialog.close();}
  range.addEventListener('input',()=>{progressOutput.textContent=`${range.value}%`;});
  form.addEventListener('submit',event=>{event.preventDefault();if(!form.reportValidity())return;const data=new FormData(form);const id=String(data.get('id')||'')||makeId();const previous=state.tasks.find(task=>task.id===id);const task={id,title:String(data.get('title')).trim(),area:String(data.get('area')),priority:String(data.get('priority')),status:String(data.get('status')),progress:Number(data.get('progress')),details:String(data.get('details')).trim(),updated:nowIso()};if(previous)state.tasks=state.tasks.map(item=>item.id===id?task:item);else state.tasks.push(task);saveState();closeTask();render();});
  deleteButton.addEventListener('click',()=>{const id=form.elements.id.value;if(id&&confirm(c('deleteConfirm'))){state.tasks=state.tasks.filter(task=>task.id!==id);saveState();closeTask();render();}});
  qa('[data-close-task]').forEach(button=>button.addEventListener('click',closeTask));q('[data-open-task]').addEventListener('click',()=>openTask());

  q('[data-task-search]').addEventListener('input',renderBoard);q('[data-task-filter]').addEventListener('change',renderBoard);
  q('[data-note-form]').addEventListener('submit',event=>{event.preventDefault();const field=event.currentTarget.elements.note;const value=field.value.trim();if(!value)return;state.notes.push({id:makeId(),text:value,created:nowIso()});field.value='';q('[data-note-count]').textContent='0 / 800';saveState();renderNotes();});
  q('#quick-note').addEventListener('input',event=>{q('[data-note-count]').textContent=`${event.target.value.length} / 800`;});
  q('[data-export]').addEventListener('click',()=>{const blob=new Blob([JSON.stringify({...state,exportedAt:nowIso()},null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const anchor=document.createElement('a');anchor.href=url;anchor.download=`${c('exportName')}-${new Date().toISOString().slice(0,10)}.json`;anchor.click();setTimeout(()=>URL.revokeObjectURL(url),0);});
  q('[data-reset]').addEventListener('click',()=>{if(confirm(c('resetConfirm'))){state={version:1,tasks:structuredClone(initialTasks),notes:[]};saveState();render();}});
  q('#workspace-language').addEventListener('change',event=>{language=event.target.value;localStorage.setItem(LANGUAGE_KEY,language);applyLanguage();});

  const imageDialog=q('[data-image-dialog]'), image=q('img',imageDialog);qa('[data-lightbox]').forEach(button=>button.addEventListener('click',()=>{image.src=button.dataset.lightbox;image.alt=q('img',button).alt;imageDialog.showModal();}));q('[data-close-image]').addEventListener('click',()=>imageDialog.close());imageDialog.addEventListener('click',event=>{if(event.target===imageDialog)imageDialog.close();});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&dialog.open)closeTask();});
  applyLanguage();
})();
