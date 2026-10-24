# KOVA Kebijakan Privasi — FREEMIUM LOKAL V1 — DRAFT

Revisi dokumen: 2026-10-24. Dianyari: 24 Oktober 2026. Penerbit: Vadyslav Konohrai, individu pribadi, Polandia. Kontak privasi/dukungan: contact@kovacompass.app.

Status: DRAFT — ngenteni persetujuan pungkasan sawise kasunyatan sing diidentifikasi wis rampung. Tanggal persiapan dudu tandha elektronik, bukti publikasi utawa aplikasi retroaktif saka istilah anyar. Tanggal efektif sawise persetujuan lan pambocoran kanggo pangguna: [OWNER_INPUT_REQUIRED].

URL privasi umum (versi Inggris): [https://kovacompass.app/privacy.html?lang=en](https://kovacompass.app/privacy.html?lang=en).

## 1. Cakupan

Dhukungan siji-wektu nggunakake Google Play ing wates teken tuku client-only sing padha. KOVA nangani ID produk, mlebu informasi tuku lan tuku token transiently kanggo mriksa lan finalize pembayaran; iku ora menehi Premium entitlement utawa nyimpen kuitansi support iki ing serep financial. Cathetan panji lokal sing ora sensitif sing ndhukung dibukak supaya pembayaran sing durung rampung bisa dicenthang sawise diwiwiti maneh. KOVA ora ngumpulake rincian kertu, ngirim cathetan financial, nambah Firebase login utawa analytics, utawa nerbitaké dhaftar supporter. Google Play ngolah pembayaran miturut syarat privasi dhewe. Yen sampeyan ngubungi kita babagan pembayaran, aturan korespondensi ing ngisor iki ditrapake.

Kabijakan iki nggambarake KOVA_PHONE_LOCAL_FREEMIUM_V1, aplikasi telpon Android com.kova.budget. Nduwe basis keuangan lokal gratis lan langganan Premium opsional sing dileksanakake isih mbutuhake kualifikasi dodolan umum, tanpa akun KOVA sing dibutuhake. Iki dudu kabijakan kanggo situs web, Android, Google Play utawa layanan awan sing lawas. Ketentuan sing kapisah ora ngilangi kewajiban penerbit kanggo proses dhewe.

## 2. Data lan tujuan lokal

KOVA nggunakake informasi sing sampeyan lebokake utawa pilih kanggo nyedhiyakake fungsi ing piranti sampeyan:

- Jeneng profil lokal, pengenal lan preferensi lokal: pamisahan profil, basa, mata uang lan setelan.
- Akun finansial, imbangan, jumlah, mata uang, tanggal, deskripsi, kategori, transaksi, mbalekaken lan transfer: cathetan lan petungan.
- Anggaran, gol, utang, pambayaran bola-bali lan regane net: perencanaan lan ringkesan lokal.
- Profil kerja, tarif, jam, istirahat lan informasi sing dibutuhake kanggo perkiraan penghasilan: cathetan lan ramalan kerja.
- Cathetan, tugas, dhaptar, acara, kuitansi, gambar sing dipilih lan referensi file: konten sing digawe pangguna lan OCR lokal.
- Asil pitungan lan negara teknis aplikasi: laporan, pemugaran sesi lan panyimpenan sing dipercaya.

Aja ketik sandhi bank sing ora perlu, kode bukti asli, rincian kertu lengkap utawa informasi utamane sensitif. Cathetan lan gambar bisa ngemot data wong liya; nyilikake lan nggunakake sah.

Dhaptar saringan telusuran mata uang lan basa ing piranti sampeyan; pitakon iki ora dikirim menyang penerbit utawa layanan telusuran online. Katalog mata uang, jeneng basa lan gambar panji dibundel karo app. Gendéra minangka bantuan visual, dudu nemtokake lokasi, kewarganegaraan, utawa panggonan pajak. Preferensi basa lan mata uang disimpen sacara lokal. Ing pamilih basa, milih baris nyiapake owah-owahan; Aplikasi nyimpen, nalika nutup tanpa nglamar tetep basa sadurunge.

## 3. Keuangan lokal lan tuku opsional

Basis Free nyimpen cathetan keuangan sacara lokal lan ora mbutuhake akun maya KOVA. Pemilik nyetujoni paket fitur Premium: ​​laporan / perbandingan lokal lanjutan, ramalan lan analitik penghasilan kerja. Petungan mbutuhake cathetan sing cocog. Tuku, mulihake lan ngakses refresh nggunakake Google Play lan panyambungan; akun Google Play dudu profil finansial KOVA. Otentikasi Firebase, mlebu Google ing KOVA, sinkronisasi awan finansial, Cloud Storage / Fungsi, iklan, Analytics / Crashlytics, push, Remote Config, Wear, Sharing Family online, API pasar / bank lan AI / Command Layer tetep dipateni.

CALON SAIKI - Ora disetujoni kanggo SALES PUBLIC: pemilik milih verifikasi client-only, tanpa server verifikasi KOVA. KOVA komunikasi karo aplikasi Google Play liwat antarmuka tagihan Android. Rilis mbusak ijin INTERNET KOVA; Google Play nggunakake jaringan lan akun / pangolahan pembayaran dhewe. KOVA mirsani kasedhiyan sambungan, kang ora dhewe netepake sing cached tuku Play saiki. Iki dudu pratelan manawa kabeh telpon offline.

KOVA nampa token tuku, produk / paket, informasi tuku mlebu / teken lan kasedhiya status tuku saka Play. Iki ngirim token sing cocog maneh liwat Play kanggo diakoni. Pengenal instalasi lokal acak misahake cache akses lokal; dudu pengenal pemilik finansial utawa email akun Google. Tandha sing diverifikasi sacara lokal mriksa keasliane, ora kadaluwarsa, status mbalekaken saiki utawa piranti sing ora bisa diowahi. KOVA ora nampa rincian kertu, lan ora KOVA verifier nampa cathetan financial, Cathetan, gambar OCR, serep utawa data tuku. Google ngolah tumbas miturut syarat lan informasi privasi sing ditrapake.

Cache akses dienkripsi lan diotentikasi nganggo kunci Keystore Android khusus instalasi lan disimpen ing njaba serep. Bisa diganti dening mriksa disambungake mengko lan dibusak karo data instalasi; watesan akses 48-jam ora wektu pambusakan otomatis. Data tuku ora ditulis ing log diagnostik. Cadangan / impor finansial ora menehi Premium, nyalin cache verifikasi utawa transfer cathetan finansial liwat Play.

Kabijakan akses versi iki: nganti jam 48 sawise siklus query Play disambungake kanthi sukses, diukur nganggo jam piranti monoton. Wiwiti maneh telpon, informasi boot dipercaya ora kasedhiya utawa bedo jam ngluwihi menit 2 mbutuhake mriksa liyane. Mung mbukak maneh KOVA ora ngreset utawa ngluwihi jendhela iki. Aplikasi kasebut ora ngerti utawa nggawe kadaluwarsa langganan sing dikonfirmasi. Bukak offline ora ngluwihi jendhela iki. Play bisa ngasilake informasi sing di-cache sanajan ana konektivitas, mula kadaluwarsa / mbalekaken bisa dideteksi telat. Penundaan utawa kepemilikan sing ora mesthi bisa mbutuhake refresh; panggunaan dhasar, cathetan sing disimpen lan serep / ekspor tetep kasedhiya. Instalasi liyane mulihake tumbas liwat Play kanthi kapisah saka cadangan finansial.

Mbukak dokumen umum ing browser eksternal kapisah saka maca dokumen bundled. Cookie/analitik situs web duwe pambocoran lan pilihan sing kapisah. Pangeling lokal biasa ora push remot.

## 4. Idin, OCR lan piranti

Kamera opsional kanggo foto resi. Sampeyan bisa milih gambar liwat pamilih sistem tanpa ijin kamera. OCR nggunakake model sing dibundel karo app, tanpa ngirim gambar kanggo pangenalan remot. Priksa jumlah, mata uang, tanggal lan isi sadurunge nyimpen: pangenalan bisa salah.

Kabar menehi pangeling lokal lan gumantung ing setelan Android. Biometrik opsional nggunakake otentikasi sistem; KOVA ora nampa cithakan bekas driji utawa pasuryan. Sampeyan bisa ngganti ijin ing setelan Android. Penolakan mbatesi fitur sing cocog lan ora ijin kanggo ngirim data. Versi iki ora nggunakake mikropon, pengenal iklan utawa layanan lokasi. Akses menyang file sing dipilih uga gumantung saka panyedhiya.

## 5. Proteksi lan watesane

Database keuangan utama nggunakake SQLCipher. Materi kunci khusus instalasi dilindhungi nggunakake Android Keystore; iku ora sandi serep portabel. Enkripsi database ora kanthi otomatis nutupi saben foto, file tambahan, setelan, ekspor utawa item sing ditampilake ing layar. Nglindhungi telpon lan akses file. Enkripsi ora njamin pangayoman marang piranti sing dikompromi utawa ora dikunci, malware, mundhut kunci utawa pambocoran dening pangguna.

## 6. Ekspor lan pemulihan manual

Ekspor manual minangka salinan parsial sing dienkripsi sandi saka ruang lingkup sing didhukung, dudu gambar kabeh instalasi. Iki kalebu cathetan finansial sing didhukung lan konfigurasi sing disimpen, kalebu karya, lan gambar sing diselehake ing dokumen cathetan. Ora nyalin preferensi aplikasi, tombol instalasi, konfigurasi widget, riwayat kabar, antrian sinkronisasi tambahan utawa saben cache. Foto resi eksternal lan lampiran file ora disalin. URI utawa tautan sing disimpen dudu salinan isi: file bisa uga ora kasedhiya sawise dipindhah, dibusak, utawa ijin ilang. Simpen file kasebut kanthi kapisah.

Sampeyan milih tujuan ing pamilih file sistem. Milih panyedhiya maya utawa nuduhake file karo app liya bisa uga nransfer data miturut syarat panyedhiya kasebut. KOVA ora ngunggah serep kanthi otomatis. Simpen file lan sandhi sing kuwat kanthi aman, luwih becik dipisahake. Penerbit ora nyekel kunci pemulihan kanggo tembung sandhi kasebut. Sawise konfirmasi, impor ngganti ruang lingkup data sing didhukung saka profil sing dipilih. Mbalekake serep lokal sing kompatibel menyang instalasi liyane mbutuhake konfirmasi sing jelas; iku ora otomatis nganggo akun maya sajarah utawa macem-macem nduweni.

Preferensi basa lan mata uang utama kudu dicenthang kanthi kapisah sawise pulih; serep ora salinan setelan app iki. Gambar cathetan semat beda karo referensi gambar eksternal. Yen gambar njaba ilang utawa panyedhiya nolak akses, referensi ora bisa mulihake file asli. KOVA ora njupuk gambar panggantos saka internet.

## 7. Penylametan lan pambusakan

Cathetan lokal tetep ing piranti nganti sampeyan mbusak utawa ngganti. Data tambahan lan cache gumantung ing app lan prilaku Android, tanpa wektu ngresiki tetep ditegesake ing kene. Mbusak rekaman individu liwat fungsi app sing kasedhiya. Kanggo mbusak data instalasi, gunakake Setelan Android → Aplikasi → KOVA → Panyimpenan → Mbusak data / panyimpenan; tembung beda-beda miturut piranti. Iki mbusak data lokal lan bisa nggawe Recovery ora bisa tanpa serep. Mbusak instal uga biasane mbusak data app pribadi.

File sing diekspor, salinan sing dicekel panyedhiya eksternal, gambar asli lan salinan sing dienggo bareng karo wong liya kudu dibusak kanthi kapisah. Mbusak rekaman ora njanjeni timpa fisik sing aman kanggo saben media panyimpenan. Konfigurasi rilis iki mateni serep maya otomatis Android lan transfer piranti data KOVA; iki ora sulih kanggo serep manual.

## 8. Kontak, data lan hak sing dicekel operator

Panggunaan lokal ora mbutuhake ngirim informasi menyang penerbit. Yen sampeyan ngubungi ing njaba app, bisa uga nampa alamat kontak, pesen lan lampiran sukarela. Aja ngirim database lengkap, sandi serep, tombol utawa informasi financial nyata kajaba perlu. Dokumen iki ora ngidini panjaluk kasebut.

Vadyslav Konohrai, Poland, contact@kovacompass.app, tanggung jawab minangka controller kanggo informasi sing ditampa ing publisher dhewe Correspondence nangani. Iki ora ateges akses remot menyang cathetan finansial ing telpon sampeyan. Google tanggung jawab kanggo pangolahan toko/pembayaran miturut [Kebijakan Privasi Google](https://policies.google.com/privacy?hl=en); Google ora diterangake minangka server rekaman finansial KOVA, lan pangolahan Play ora dijanjekake bakal kedadeyan mung ing Polandia utawa EEA.

Proses korespondensi konsep kalebu nanggapi panjalukan utawa nindakake kontrak (GDPR Artikel 6(1) (b), yen relevan), keluhan lan tugas legal (titik (c), kanggo tugas tartamtu), lan ngatasi masalah teknis, keamanan lan netepake utawa mbela claims (titik (f), karo kapentingan sing diadegaké lan hak-hak sing sah). Ora nyakup buletin, pariwara utawa pelatihan model. Nyedhiyakake kontak lan katrangan sing dibutuhake yaiku sukarela, nanging ora ana bisa nyegah respon utawa ngenali masalah kasebut; kabeh database ora dibutuhake. Alasan kasebut dudu idin kemul lan kudu cocog karo proses nyata.

Miturut deklarasi penerbit ing 23 Oktober 2026, pesen sing dikirim menyang contact@kovacompass.app diterusake dening Cloudflare menyang kothak layang Gmail penerbit. Kontak umum tetep contact@kovacompass.app. Mulane isi pesen, lampiran lan informasi pangiriman uga ditangani dening Google lan Cloudflare. Iki minangka korespondensi kapisah sing diwiwiti dening pangirim, dudu transmisi otomatis rekaman app. Nerusake mung ora nggawe perjanjian Google Workspace, perjanjian pangolahan, utawa panyimpenan mung EEA. Panyedhiya nerangake aturane ing [Kebijakan Privasi Google](https://policies.google.com/privacy?hl=en), [Cloudflare Kebijakan Privasi](https://www.cloudflare.com/privacypolicy/) lan [Cloudflare DPA](https://www.cloudflare.com/cloudflare-customer-dpa/). Maca aturan umum ora verifikasi syarat akun penerbit utawa basis saben transfer ing dhukungan KOVA.

DIPERLUKAN SADUNGE PUBLIKASI: peran lan syarat layanan Cloudflare/Gmail sing ditrapake, panampa tambahan, persetujuan sing dibutuhake, negara pangolahan lan latar transfer EEA, lan carane njupuk informasi babagan pangayoman [OWNER_INPUT_REQUIRED]. Cloudflare lan Gmail diidentifikasi dening penerbit; setelan pangiriman lan akun durung dites. Ing 23 Oktober 2026, penerbit nyetujoni prosedur sing direncanakake: pitakon teknis biasa ora luwih saka 12 sasi sawise ditutup, lampiran sing ora perlu ora luwih saka dina 30 sawise ditutup, kanthi pambusakan luwih awal nalika tujuane rampung. Iki minangka rencana sing disetujoni, ora diverifikasi praktik saiki; implementasine tetep pinunjul. Keluhan, perselisihan lan cathetan pemukiman mbutuhake wektu sing ditrapake kanthi kapisah lan ora kanthi otomatis ngetutake watesan kasebut. Ora ana pratelan manawa pesen bakal dibusak sawise jam 48 utawa pambusakan otomatis dikonfigurasi. Mbusak pesen saka kothak layang ora ateges mbusak langsung saka kabeh sistem panyedhiya; deleng [informasi retensi Google](https://policies.google.com/technologies/retention?hl=en).

Panjaluk data ditangani miturut hukum sing ditrapake. Ing GDPR, respon umume ditindakake sajrone sewulan; extension sing diidinake mbutuhake kabar kanthi alasan ing wektu kasebut. Priksa identitas kudu proporsional - pindai dokumen identitas utawa sandhi ora dibutuhake. Kurang akses menyang cathetan lokal sejatine ora mbusak tugas kanggo informasi sing ditampa operator. Informasi hak lan keluhan: [UODO Polandia](https://uodo.gov.pl/pl/493/2254).

Yen GDPR ditrapake kanggo data sing diproses dening operator, hak sing cocog karo kahanan kalebu akses, rectification, mbusak, watesan, portabilitas lan bantahan; idin bisa ditarik ing ngendi iku basis saka Processing sing. Sampeyan bisa sambat menyang otoritas pengawas sing kompeten, kalebu Presiden UODO Polandia, lan njaluk perlindungan hukum. Kirimi panjalukan menyang kontak privasi ing ndhuwur; hukum sing ditrapake nyetel tenggat wektu lan watesan. Operator ora bisa ngowahi basis data saka jarak adoh sing mung ana ing telpon sampeyan. Hak statutori ora ana syarat kanggo nyerahake klaim.

Google Play bisa nggawe data pesenan lan pemukiman kasedhiya kanggo penerbit, kayata nomer pesenan, produk, jumlah, mata uang, status mbalekaken lan, gumantung saka laporan, informasi panuku. Iki dudu cathetan finansial sampeyan sing disimpen ing KOVA. Ora duwe server KOVA ora kalebu pangolahan iki. Ruang lingkup, akses, ekspor lan retensi sing nyata mbutuhake konfirmasi sadurunge dodolan. Deleng [Pesenan Play](https://support.google.com/googleplay/android-developer/answer/2741495?hl=en) lan [Laporan Play](https://support.google.com/googleplay/android-developer/answer/6135870?hl=en).

## 9. Mantan akun lan layanan kapisah

Rilis iki ora nggawe akun online. Miturut deklarasi penerbit 20 Oktober 2026, mbangun awan sadurunge mung digunakake dening penerbit lan akun test, tanpa pangguna eksternal non-test. Mulane versi iki ora menehi pangguna akses menyang akun maya utawa migrasi saka iku. Pernyataan riwayat tes iki dudu audit Firebase anyar utawa bukti yen data tes wis dibusak. Versi iki ora mbusak mantan sumber daya. Mangga langsung pitakonan privasi menyang kontak ndhuwur.

## 10. Anak, owah-owahan lan informasi liyane

Basa antarmuka sing kasedhiya kadhaptar ing Setelan. Kabijakan lan syarat sing dibundel kasedhiya offline ing kana. Versi basa tambahan minangka draf sing diterjemahake mesin sing nunggu basa lan review hukum; ngarsane ora akehe persetujuan publikasi utawa kualifikasi legal kanggo negara. Ngganti basa antarmuka ora nduweni kualifikasi distribusi ing negara apa wae.

KOVA ditrapake kanggo wong sing umure 13 lan luwih, dudu bocah ing ngisor 13. Distribusi ing saindenging jagad direncanakake, miturut kasedhiyan toko lan syarat negara individu; kasedhiyan ing saben negara ora dijanjekake. Yen hukum lokal mbutuhake keterlibatan wong tuwa utawa wali ing panggunaan utawa pangolahan data tartamtu, dadi 13 ora ngganti syarat kasebut. Dokumen iki ora ngaku yen app verifikasi umur utawa ngumpulake idin wali. Idin pangolahan data lan kapasitas kontrak minangka masalah sing kapisah.

Singkat: entri sampeyan tetep ing telpon. Ora ana mlebu awan. Nglindhungi telpon, nggawe serep manual lan aja nuduhake sandhi. Yen sampeyan utawa wali duwe pitakonan data, gunakake kontak privasi; aja ngirim sandhi, dokumen identitas utawa database lengkap.

Analisis lokal kanggo pangguna; KOVA ora nggawe pancasan kredit, Employment utawa nduweni hak atas jenenge operator. Iki dudu pratelan babagan tumindak independen pihak liya. Aplikasi kasebut ora nindakake pelacakan pariwara utawa mbutuhake idin kanggo cookie analytics; situs web apa wae mbutuhake penilaian dhewe.

Kabijakan saiki kudu kasedhiya ing Setelan lan ing URL umum sing disetujoni. Owah-owahan kudu ngenali revisi anyar lan tanggal efektif sing nyata, tanpa menehi wewenang kanggo tujuan anyar. Layanan online ing mangsa ngarep mbutuhake pambocoran anyar lan alasan sing cocog, ora mung owah-owahan teks. Kabar perpustakaan ana ing Setelan. Deleng uga [Ketentuan](terms-of-service-jv.md).
