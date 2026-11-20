# Değişiklik günlüğü

## v2.1 · Kasım 2026

Oynanış, adres ve kayıt verisi değişmedi; eski kayıtla ve rekorla açılır.

### Yeni
- **Başarımlar:** 9 yerel rozet (üç kule türü, son seviye kule, 100 düşman, yıkım koçu, 5. dalgada kayıpsız, 10. dalga, zafer, kusursuz zafer, sonsuz kipte 20. dalga). Kazanınca ekranda haber verilir, bitiş kartında ve Yenilikler kartında görünür. Bot (`?auto`) kayıt yazmaz.
- **Sürüm etiketi ve Yenilikler kartı:** ana menüde "v2.1 · Kasım 2026" düğmesi, ayarlarda sürüm satırı.
- **"Tüm oyunlar" bağlantısı** ana menüde (merkez sayfaya).
- **404 sayfası** (oyuna ve merkez sayfaya dönüş bağlantılarıyla).

### Düzeltilen
- Sayfa açıklaması ve paylaşım kartı İngilizceydi, sayfa ise Türkçe; Türkçe metin eklendi.
- Twitter kartında başlık, açıklama ve görsel eksikti; `theme-color` yoktu. Eklendi.
- Masaüstünde menü düğmeleri 41 px yüksekliğindeydi; hedef en az 44 px oldu.

### Test
- `test/duman.mjs`: sayfa açılıyor mu, konsol hatası, oyun başlıyor mu, kule kurma durumu değiştiriyor mu, telefon görünümünde taşma, Yenilikler kartı, eski kayıtla açılış, başarım kaydı.
