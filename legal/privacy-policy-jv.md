# KOVA Kebijakan Privasi — OFFLINE V1 — DRAFT

Revisi dokumen: 2026-10-22. Ora disetujoni kanggo publikasi; iki dudu tanggal efektif. Operator/penerbit: Vadyslav Konohrai, pribadi, Polandia. Kontak privasi/dukungan: contact@kovacompass.app. Tanggal efektif: [OWNER_INPUT_REQUIRED].

URL privasi umum (versi Inggris): [https://kovacompass.app/privacy.html?lang=en](https://kovacompass.app/privacy.html?lang=en).

## 1. Cakupan

Kabijakan iki nerangake KOVA_PHONE_OFFLINE_FREE_V1, aplikasi telpon Android com.kova.budget. Iki minangka pangatur keuangan pribadi lokal gratis, tanpa akun online sing dibutuhake. Iki dudu kabijakan kanggo situs web, Android, Google Play utawa layanan awan lawas. Ketentuan sing kapisah ora ngilangi kewajiban penerbit kanggo proses dhewe.

## 2. Data lan tujuan lokal

KOVA nggunakake informasi sing sampeyan lebokake utawa pilih kanggo nyedhiyakake fungsi ing piranti sampeyan:

- Jeneng profil lokal, pengenal lan preferensi lokal: pamisahan profil, basa, mata uang lan setelan.
- Akun finansial, imbangan, jumlah, mata uang, tanggal, deskripsi, kategori, transaksi, mbalekaken lan transfer: cathetan lan petungan.
- Anggaran, gol, utang, pambayaran bola-bali lan regane net: perencanaan lan ringkesan lokal.
- Profil kerja, tarif, jam, istirahat lan informasi sing dibutuhake kanggo perkiraan penghasilan: cathetan lan ramalan kerja.
- Cathetan, tugas, dhaptar, acara, kuitansi, gambar sing dipilih lan referensi file: konten sing digawe pangguna lan lokal OCR.
- Asil pitungan lan negara teknis aplikasi: laporan, pemugaran sesi lan panyimpenan sing dipercaya.

Aja ketik sandhi bank sing ora perlu, kode otentikasi, rincian kertu lengkap utawa informasi utamane sensitif. Cathetan lan gambar bisa ngemot data wong liya; nyilikake lan nggunakake sah.

## 3. Ora ana layanan maya ing edisi iki

Rilis iki ora nawakake Firebase Authentication, mlebu Google, sinkronisasi server, Cloud Storage/Functions, analytics utawa Crashlytics, remote push, Remote Config, iklan, tumbas utawa langganan, API perbankan, Wear OS, Enggo bareng Keluarga online, kuotasi langsung, layanan AI utawa Command Layer. Pangeling lokal biasa ora push remot. Kode fitur mangsa sing disimpen ora ateges layanan kasebut aktif.

Manifest release ora duwe idin INTERNET lan mbusak wiwitan otomatis layanan dipatèni. KOVA ora kanthi otomatis ngirim cathetan sampeyan menyang penerbit utawa menehi akses remot menyang basis data lokal. Iki ora ateges kabeh telpon, nyimpen utawa panyedhiya file sing dipilih ngindhari aktivitas jaringan. Uga ora sertifikasi manawa cacat keamanan ora mungkin.

## 4. Idin, OCR lan piranti

Kamera opsional kanggo foto resi. Sampeyan bisa milih gambar liwat pamilih sistem tanpa ijin kamera. OCR nggunakake model sing digabung karo app, tanpa ngirim gambar kanggo pangenalan remot. Priksa jumlah, mata uang, tanggal lan isi sadurunge nyimpen: pangenalan bisa salah.

Kabar menehi pangeling lokal lan gumantung ing setelan Android. Biometrik opsional nggunakake otentikasi sistem; KOVA ora nampa sidik jari utawa cithakan pasuryan. Sampeyan bisa ngganti ijin ing setelan Android. Penolakan mbatesi fitur sing cocog lan ora ijin kanggo ngirim data. Versi offline ora nggunakake mikropon, pengenal iklan utawa layanan lokasi. Akses menyang file sing dipilih uga gumantung saka panyedhiya.

## 5. Proteksi lan watesan

Database keuangan utama nggunakake SQLCipher. Materi kunci khusus instalasi dilindhungi nggunakake Android Keystore; iku ora sandi serep portabel. Enkripsi database ora kanthi otomatis nutupi saben foto, file tambahan, setelan, ekspor utawa item sing ditampilake ing layar. Nglindhungi telpon lan akses file. Enkripsi ora njamin pangayoman marang piranti sing dikompromi utawa ora dikunci, malware, mundhut kunci utawa pambocoran dening pangguna.

## 6. Manual ekspor lan Recovery

Ekspor manual minangka salinan parsial sing dienkripsi sandi saka ruang lingkup sing didhukung, dudu gambar kabeh instalasi. Iki kalebu cathetan finansial sing didhukung lan konfigurasi sing disimpen, kalebu karya, lan gambar sing diselehake ing dokumen cathetan. Ora nyalin preferensi aplikasi, tombol instalasi, konfigurasi widget, riwayat kabar, antrian sinkronisasi tambahan utawa saben cache. Foto resi eksternal lan lampiran file ora disalin. URI utawa tautan sing disimpen dudu salinan isi: file bisa uga ora kasedhiya sawise dipindhah, dibusak, utawa ijin ilang. Simpen file kasebut kanthi kapisah.

Sampeyan milih tujuan ing pemilih file sistem. Milih panyedhiya maya utawa nuduhake file karo app liya bisa uga nransfer data miturut syarat panyedhiya kasebut. KOVA ora otomatis ngunggah serep. Simpen file lan sandhi sing kuwat kanthi aman, luwih becik dipisahake. Penerbit ora nyekel kunci pemulihan kanggo tembung sandhi kasebut. Sawise konfirmasi, impor ngganti ruang lingkup data sing didhukung saka profil sing dipilih. Mbalekake serep lokal sing kompatibel menyang instalasi liyane mbutuhake konfirmasi sing jelas; iku ora otomatis nganggo akun maya sajarah utawa macem-macem nduweni.

## 7. Penylametan lan pambusakan

Cathetan lokal tetep ing piranti nganti sampeyan mbusak utawa ngganti. Data tambahan lan cache gumantung ing app lan prilaku Android, tanpa wektu ngresiki tetep ditegesake ing kene. Mbusak rekaman individu liwat fungsi app sing kasedhiya. Kanggo mbusak data instalasi, gunakake Android Setelan → Aplikasi → KOVA → Panyimpenan → Mbusak data/panyimpenan; tembung beda-beda miturut piranti. Iki mbusak data lokal lan bisa nggawe Recovery ora bisa tanpa serep. Mbusak instal uga biasane mbusak data app pribadi.

File sing diekspor, salinan sing dicekel panyedhiya eksternal, gambar asli lan salinan sing dienggo bareng karo wong liya kudu dibusak kanthi kapisah. Mbusak rekaman ora njanjeni timpa fisik sing aman kanggo saben media panyimpenan. Konfigurasi rilis iki mateni Android serep maya otomatis lan transfer piranti KOVA data; iki ora sulih kanggo serep manual.

## 8. Kontak, data lan hak sing dicekel operator

Panggunaan lokal ora mbutuhake ngirim informasi menyang penerbit. Yen sampeyan ngubungi ing njaba app, bisa uga nampa alamat kontak, pesen lan lampiran sukarela. Aja ngirim database lengkap, sandi serep, tombol utawa informasi financial nyata kajaba perlu. Dokumen iki ora ngidini panjaluk kasebut.

Nangani korespondensi minangka pangolahan sing kapisah. Sadurunge mbukak saluran kasebut, operator kudu nemtokake tujuane lan basis hukum sing cocog, panampa/panyedhiya, transfer apa wae ing njaba EEA, lan periode retensi utawa kritéria: [OWNER_INPUT_REQUIRED]. Kita ora ngaku yen panggunaan offline ndadekake GDPR ora bisa ditrapake utawa yen ngakoni kebijakan iki ngidini proses apa wae.

Yen GDPR ditrapake kanggo data sing diproses dening operator, hak sing cocog karo kahanan kalebu akses, rectification, mbusak, watesan, portabilitas lan bantahan; idin bisa ditarik ing ngendi iku basis saka Processing sing. Sampeyan bisa sambat menyang otoritas pengawas sing kompeten, kalebu Presiden UODO Polandia, lan njaluk perlindungan hukum. Kirimi panjalukan menyang kontak privasi ing ndhuwur; hukum sing ditrapake nyetel tenggat wektu lan watesan. Operator ora bisa ngowahi basis data saka jarak adoh sing mung ana ing telpon sampeyan. Hak statutori ora ana syarat kanggo nyerahake klaim.

## 9. Mantan akun lan layanan kapisah

Rilis iki ora nggawe akun online. Miturut deklarasi penerbit tanggal 20 Oktober 2026, mbangun awan sadurunge mung digunakake dening penerbit lan akun tes, tanpa pangguna non-tes eksternal. Offline V1 mulane ora menehi pangguna akses menyang akun maya utawa migrasi saka iku. Pernyataan riwayat tes iki dudu audit Firebase anyar utawa bukti yen data tes wis dibusak. Versi iki ora mbusak mantan sumber daya. Mangga langsung pitakonan privasi menyang kontak ndhuwur.

## 10. Anak, owah-owahan lan informasi liyane

KOVA dimaksudaké kanggo wong sing umuré 13 lan luwih, dudu bocah-bocah ing sangisoré 13 taun. Distribusi ing saindenging jagad direncanakake, miturut kasedhiyan toko lan syarat negara individu; kasedhiyan ing saben negara ora dijanjekake. Yen hukum lokal mbutuhake keterlibatan wong tuwa utawa wali ing panggunaan utawa pangolahan data tartamtu, dadi 13 ora ngganti syarat kasebut. Dokumen iki ora ngaku yen app verifikasi umur utawa ngumpulake idin wali. Idin pangolahan data lan kapasitas kontrak minangka masalah sing kapisah.

Singkat: entri sampeyan tetep ing telpon. Ora ana mlebu awan. Nglindhungi telpon, nggawe serep manual lan aja nuduhake sandhi. Yen sampeyan utawa wali duwe pitakonan data, gunakake kontak privasi; aja ngirim sandhi, dokumen identitas utawa database lengkap.

Analisis lokal kanggo pangguna; KOVA ora nggawe keputusan kredit, pegawe utawa eligibility atas jenenge operator. Iki dudu pratelan babagan tumindak independen pihak liya. Aplikasi kasebut ora nindakake pelacakan pariwara utawa mbutuhake idin kanggo cookie analytics; situs web apa wae mbutuhake penilaian dhewe.

Kabijakan saiki kudu kasedhiya ing Setelan lan ing URL umum sing disetujoni. Owah-owahan kudu ngenali revisi anyar lan tanggal efektif sing nyata, tanpa menehi wewenang kanggo tujuan anyar. Layanan online ing mangsa ngarep mbutuhake pambocoran anyar lan alasan sing cocog, ora mung owah-owahan teks. Kabar perpustakaan ana ing Setelan. Deleng uga [Ketentuan](terms-of-service-en.md).
