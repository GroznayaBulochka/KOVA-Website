# KOVA Gizlilik Politikası — ÇEVRİMDIŞI V1 — TASLAK

Belge revizyonu: 2026-10-22. Yayınlanmak üzere onaylanmadı; bu geçerli bir tarih değil. Operatör/yayıncı: Vadyslav Konohrai, özel kişi, Polonya. Gizlilik/destek iletişim kişisi: contact@kovacompass.app. Yürürlük tarihi: [OWNER_INPUT_REQUIRED].

Genel gizlilik politikası URL'si (İngilizce sürüm): [https://kovacompass.app/privacy.html?lang=en](https://kovacompass.app/privacy.html?lang=en).

## 1. Kapsam

Bu politika, KOVA_PHONE_OFFLINE_FREE_V1, Android telefon uygulaması com.kova.budget'yi açıklar. Gerekli bir çevrimiçi hesaba gerek duymadan, ücretsiz bir yerel kişisel finans organizatörüdür. Bu, bir web sitesinin, Android, Google Play veya eski bulut hizmetlerinin politikası değildir. Bunların ayrı şartları, yayıncının kendi işlemesine ilişkin yükümlülüklerini ortadan kaldırmaz.

## 2. Yerel veriler ve amaçlar

KOVA cihazınızda işlevler sağlamak için girdiğiniz veya seçtiğiniz bilgileri kullanır:

- Yerel profil adı, yerel tanımlayıcı ve tercihler: profil ayrımı, dil, para birimi ve ayarlar.
- Mali hesaplar, bakiyeler, tutarlar, para birimleri, tarihler, açıklamalar, kategoriler, işlemler, geri ödemeler ve transferler: kayıtlar ve hesaplamalar.
- Bütçeler, hedefler, borçlar, yinelenen ödemeler ve net değer: planlama ve yerel özetler.
- Kazanç tahminleri için gereken çalışma profilleri, ücretler, saatler, molalar ve bilgiler: iş kayıtları ve tahminler.
- Notlar, görevler, listeler, etkinlikler, makbuzlar, seçilen resimler ve dosya referansları: kullanıcı tarafından oluşturulan içerik ve yerel OCR.
- Hesaplama sonuçları ve uygulamanın teknik durumu: raporlar, oturum restorasyonu ve güvenilir depolama.

Gereksiz banka şifrelerini, kimlik doğrulama kodlarını, tam kart bilgilerini veya özellikle hassas bilgileri girmeyin. Notlar ve resimler diğer kişilerin verilerini içerebilir; en aza indirin ve yasal olarak kullanın.

## 3. Bu sürümde bulut hizmeti yok

Bu sürüm, Firebase Kimlik Doğrulaması, Google ile oturum açma, sunucu senkronizasyonu, Bulut Depolama/İşlevler, analiz veya Crashlytics, uzaktan gönderme, Uzaktan Yapılandırma, reklamlar, satın almalar veya abonelikler, bankacılık API'leri, Wear OS, çevrimiçi Aile Paylaşımı, canlı fiyat teklifleri, AI hizmetleri veya Komut Katmanı sunmaz. Sıradan yerel hatırlatıcılar uzaktan kumandalı değildir. Gelecekteki özellik kodunun korunması, bu hizmetlerin etkin olduğu anlamına gelmez.

Sürüm bildiriminin İNTERNET izni yoktur ve devre dışı bırakılan hizmetlerin otomatik başlatılmasını kaldırır. KOVA kayıtlarınızı otomatik olarak yayıncıya göndermez veya yayıncıya yerel veritabanına uzaktan erişim sağlamaz. Bu, telefonun, mağazanın veya seçilen dosya sağlayıcının tamamının ağ etkinliğinden kaçındığı anlamına gelmez. Güvenlik kusurlarının imkansız olduğunu gösteren bir sertifika da değildir.

## 4. İzinler, OCR ve cihaz

Makbuz fotoğrafları için kamera isteğe bağlıdır. Bunun yerine, kamera izni olmadan sistem seçici aracılığıyla bir görüntü seçebilirsiniz. OCR, görüntüyü uzaktan tanımaya göndermeden, uygulamayla birlikte verilen modelleri kullanır. Kaydetmeden önce tutarları, para birimini, tarihleri ​​ve içeriği kontrol edin: tanıma yanlış olabilir.

Bildirimler yerel hatırlatıcılar sağlar ve Android ayarlarına bağlıdır. İsteğe bağlı biyometri sistem kimlik doğrulamasını kullanır; KOVA parmak izi veya yüz şablonlarını almaz. Android ayarlarında izinleri değiştirebilirsiniz. Reddetme, ilgili özelliği sınırlandırır ve veri aktarımına izin vermez. Çevrimdışı sürüm mikrofonu, reklam tanımlayıcıyı veya konum hizmetlerini kullanmaz. Seçilen bir dosyaya erişim aynı zamanda sağlayıcısına da bağlıdır.

## 5. Koruma ve sınırları

Ana finansal veritabanı SQLCipher'i kullanır. Kuruluma özel anahtar malzemesi Android Anahtar Deposu kullanılarak korunur; taşınabilir bir yedekleme şifresi değildir. Veritabanı şifrelemesi, ekranda görüntülenen her fotoğrafı, yardımcı dosyayı, ayarı, dışa aktarmayı veya öğeyi otomatik olarak kapsamaz. Telefonunuzu ve dosya erişiminizi koruyun. Şifreleme, güvenliği ihlal edilmiş veya kilidi açılmış bir cihaza, kötü amaçlı yazılıma, anahtar kaybına veya kullanıcı tarafından ifşa edilmesine karşı korumayı garanti etmez.

## 6. Manuel dışa aktarma ve kurtarma

Manuel dışa aktarma, tüm kurulumun görüntüsü değil, desteklenen kapsamın parolayla şifrelenmiş kısmi kopyasıdır. Bir not belgesine gömülü iş ve görüntüler de dahil olmak üzere desteklenen mali kayıtları ve depolanan yapılandırmaları içerir. Uygulama tercihlerini, kurulum anahtarlarını, widget yapılandırmasını, bildirim geçmişini, yardımcı senkronizasyon sıralarını veya her önbelleği kopyalamaz. Harici makbuz fotoğrafları ve dosya ekleri kopyalanmaz. Kaydedilmiş bir URI veya bağlantı, içeriğin bir kopyası değildir: bir dosya taşıma, silme veya izin kaybı sonrasında kullanılamaz hale gelebilir. Bu dosyaları ayrı tutun.

Hedefi sistem dosyası seçicide seçersiniz. Bir bulut sağlayıcısı seçmek veya dosyayı başka bir uygulamayla paylaşmak, verileri o sağlayıcının koşulları kapsamında aktarabilir. KOVA yedeği otomatik olarak yüklemez. Dosyayı ve güçlü parolayı güvenli bir şekilde, tercihen ayrı ayrı saklayın. Yayıncının bu parola için bir kurtarma anahtarı bulunmuyor. Onaylandıktan sonra içe aktarma, seçilen profilin desteklenen veri kapsamının yerini alır. Uyumlu bir yerel yedeğin başka bir kuruluma kurtarılması açık onay gerektirir; geçmiş bulut hesaplarını veya birden fazla sahibi otomatik olarak benimsemez.

## 7. Saklama ve silme

Yerel kayıtlar siz kaldırana veya değiştirene kadar cihazda kalır. Yardımcı veriler ve önbellekler uygulamaya ve Android davranışına bağlıdır; burada sabit bir temizleme süresi belirtilmez. Mevcut uygulama işlevleri aracılığıyla bireysel kayıtları silin. Kurulum verilerini kaldırmak için Android Ayarlar → Uygulamalar → KOVA → Depolama → Verileri/depolamayı temizle; ifadeler cihaza göre değişir. Bu, yerel verileri kaldırır ve yedekleme olmadan kurtarmayı imkansız hale getirebilir. Kaldırma işlemi normalde özel uygulama verilerini de kaldırır.

Dışa aktarılan dosyalar, harici sağlayıcılar tarafından tutulan kopyalar, orijinal görüntüler ve başkalarıyla paylaşılan kopyalar ayrı ayrı kaldırılmalıdır. Bir kaydın silinmesi, her depolama ortamının üzerine fiziksel olarak güvenli bir şekilde yazılacağını garanti etmez. Bu sürüm yapılandırması, Android otomatik bulut yedeklemesini ve KOVA verilerinin cihaz aktarımını devre dışı bırakır; bu, manuel yedeklemenin yerini almaz.

## 8. İletişim, operatör tarafından tutulan veriler ve haklar

Yerel kullanım, yayıncıya bilgi gönderilmesini gerektirmez. Uygulama dışında iletişime geçerseniz iletişim adresinizi, mesajınızı ve gönüllü eklerinizi alabilir. Gerekmedikçe eksiksiz bir veritabanı, yedek şifre, anahtarlar veya gerçek finansal bilgiler göndermeyin. Bu belge bunlara yönelik taleplere izin vermez.

Yazışmaların yönetilmesi ayrı bir işlemdir. Bu kanalı açmadan önce operatör, kanalın amacını ve uygun yasal dayanağını, alıcıları/sağlayıcıları, AEA dışındaki tüm aktarımları ve saklama süresini veya kriterlerini belirtmelidir: [OWNER_INPUT_REQUIRED]. Çevrimdışı kullanımın GDPR'yi uygulanamaz hale getirdiğini veya bu politikanın kabul edilmesinin herhangi bir işleme izin verdiğini iddia etmiyoruz.

GDPR'nin operatör tarafından işlenen verilere uygulandığı durumlarda, koşullara uygun haklar arasında erişim, düzeltme, silme, kısıtlama, taşınabilirlik ve itiraz yer alır; İşlemenin temeli olması durumunda onay geri çekilebilir. Polonya'nın UODO Başkanı da dahil olmak üzere yetkili denetim makamına şikayette bulunabilir ve adli koruma talep edebilirsiniz. Yukarıdaki gizlilik iletişim bilgilerine isteklerinizi gönderin; Geçerli yasa, son teslim tarihlerini ve sınırlamaları belirler. Operatör, yalnızca telefonunuzda tutulan bir veritabanını uzaktan değiştiremez. Kanuni haklar taleplerden vazgeçmek şartına bağlı değildir.

## 9. Eski hesaplar ve ayrı hizmetler

Bu sürüm çevrimiçi hesaplar oluşturmaz. Yayıncının 20 Ekim 2026 tarihli beyanına göre önceki bulut yapıları yalnızca yayıncı ve test hesapları tarafından kullanılıyordu ve test dışı harici kullanıcılar yoktu. Bu nedenle Çevrimdışı V1, kullanıcılara eski bir bulut hesabına erişim veya bu hesaptan geçiş olanağı sunmaz. Test geçmişine ilişkin bu bildirim, yeni bir Firebase denetimi veya test verilerinin silindiğine dair bir kanıt değildir. Bu sürüm eski kaynakları kaldırmaz. Lütfen gizlilikle ilgili sorularınızı yukarıdaki kişiye yönlendirin.

## 10. Çocuklar, değişiklikler ve diğer bilgiler

KOVA, 13 yaşın altındaki çocuklara değil, 13 yaş ve üzerindeki kişilere yöneliktir. Dünya çapında dağıtım, mağazaların kullanılabilirliği ve bireysel ülkelerin gereksinimlerine bağlı olarak planlanmaktadır; Her ülkede kullanılabilirlik sözü verilmemektedir. Yerel yasa, bir ebeveynin veya velinin kullanıma veya belirli bir veri işlemeye dahil olmasını gerektiriyorsa, 13 yaşında olmak bu şartın yerine geçmez. Bu belge, uygulamanın yaşı doğruladığını veya veli iznini aldığını iddia etmez. Veri işleme izni ve sözleşmeye dayalı ehliyet ayrı konulardır.

Kısacası: girişleriniz telefonunuzda kalır. Bulutta oturum açma yok. Telefonu koruyun, manuel yedekleme yapın ve şifreyi paylaşmayın. Sizin veya vasinizin verilerle ilgili soruları varsa gizlilik iletişim kişisini kullanın; şifreleri, kimlik belgelerini veya veritabanının tamamını göndermeyin.

Yerel analiz kullanıcıya yöneliktir; KOVA operatörün adına kredi, istihdam veya uygunluk kararları vermez. Bu, diğer tarafların bağımsız eylemlerine ilişkin bir iddia değildir. Uygulama, reklam takibi yapmaz veya analiz çerezleri için izin gerektirmez; herhangi bir web sitesinin kendi değerlendirmesine ihtiyacı vardır.

Mevcut politika Ayarlar'da ve onaylanmış bir genel URL'de bulunmalıdır. Değişiklikler, geriye dönük olarak yeni amaçlara izin vermeden, yeni revizyonu ve fiili yürürlük tarihini tanımlamalıdır. Gelecekteki çevrimiçi hizmetler, yalnızca metin değişikliği değil, yeni açıklamalar ve uygun gerekçeler gerektirir. Kütüphane duyuruları Ayarlar'dadır. Ayrıca bkz. [Şartlar](terms-of-service-en.md).
