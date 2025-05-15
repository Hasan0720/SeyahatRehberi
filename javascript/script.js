/* Mobil boyutlardayken çıkacak  */
function toggleMenu() {
  var menu = document.getElementById("mobileMenu");
  if (menu.classList.contains("w3-hide")) {
    menu.classList.remove("w3-hide");
  } else {
    menu.classList.add("w3-hide");
  }
}
// Butonu seç
var mybutton = document.getElementById("scrollToTopBtn");

// Sayfa kaydırıldıkça butonun görünürlüğünü kontrol et
window.onscroll = function () {
  if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
    mybutton.style.display = "block"; // Butonu göster
  } else {
    mybutton.style.display = "none"; // Butonu gizle
  }
};

// Butona tıklandığında sayfayı yukarı kaydırma
function scrollToTop() {
  var currentPosition = window.pageYOffset; // Mevcut scroll pozisyonunu al
  var scrollInterval = setInterval(function () {
    if (currentPosition > 0) {
      window.scrollBy(0, -20); // Yukarı kaydırma
      currentPosition -= 20;
    } else {
      clearInterval(scrollInterval); // Kaydırma tamamlandı
    }
  }, 10); // Kaydırma hızı (10ms'de bir)
}


/* Light Box */
function openLightbox(image) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");

  // Tıklanan resmi lightbox içeriğine yükle
  lightboxImage.src = image.src;

  // Lightbox'ı göster
  lightbox.style.display = "flex";
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  lightbox.style.display = "none";
}

/* Sadece uçuş ve otel arama sayfasında kullanılanlar */
// Tabs
function openLink(evt, linkName) {
  var i, x, tablinks;
  x = document.getElementsByClassName("myLink");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < x.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" w3-red", "");
  }
  document.getElementById(linkName).style.display = "block";
  evt.currentTarget.className += " w3-red";
  // Her geçişte diğer bölümün sonuçlarını gizle
  if (linkName === "Flight") {
    document.getElementById("hotelResults").style.display = "none"; // Otellerin sonuçlarını gizle
  } else if (linkName === "Hotel") {
    document.getElementById("flightResults").style.display = "none"; // Uçuşların sonuçlarını gizle
  }
}
// Click on the first tablink on load
document.getElementsByClassName("tablink")[0].click();

// Uçuş Aramaları
function searchFlights() {
  // Kullanıcı seçimlerini alıyoruz
  var flightDestination = document.getElementById("flightDestination").value;
  var flightStartDate = document.getElementById("flightStartDate").value;
  var flightEndDate = document.getElementById("flightEndDate").value;

  // Sonuçları ve mesajı yerleştireceğimiz HTML elemanları
  var flightResults = document.getElementById("flightResults");
  var flightResultList = document.getElementById("flightResultList");
  var flightResultsMessage = document.getElementById("flightResultsMessage");

  // Önceki sonuçları temizleme
  flightResultList.innerHTML = "";
  flightResultsMessage.style.display = "none"; // "Uygun uçuş bulunamadı" mesajını gizle
  flightResults.style.display = "none"; // Sonuçları gizle

  // Eğer şehir, tarih gibi gerekli bilgiler eksikse, kullanıcıyı uyarıyoruz
  if (!flightDestination || !flightStartDate || !flightEndDate) {
    alert("Lütfen alanları doldurunuz.");
    return;
  }

  // Tarih formatlarını karşılaştırmak için Date objelerine dönüştürme
  var flightStartDateObj = new Date(flightStartDate);
  var flightEndDateObj = new Date(flightEndDate);

  // Başlangıç tarihi ve bitiş tarihi arasındaki kısıtlamaları kontrol et
  if (flightEndDateObj < flightStartDateObj) {
    alert("En geç tarih en erken tarihten önce olamaz.");
    return;
  }
  else if (flightStartDateObj.toDateString() === flightEndDateObj.toDateString()) {
    alert("İki tarihte aynı gün olamaz.");
    return;
  }
  // Örnek uçuş verileri 1 şehir için max 5 taneyi geçme
  var flights = [
    { city: "İstanbul", flightDate: "2024-12-04 16:00" },
    { city: "İzmir", flightDate: "2024-12-08 15:00" },
    { city: "Antalya", flightDate: "2024-12-06 10:00" },
    { city: "Denizli", flightDate: "2024-12-07 19:00" },
    { city: "İstanbul", flightDate: "2024-12-25 16:00" },
    { city: "Adıyaman", flightDate: "2024-12-11 16:00" },
    { city: "İzmir", flightDate: "2024-12-12 11:00" },
    { city: "Antalya", flightDate: "2024-12-15 22:00" },
    { city: "Denizli", flightDate: "2024-12-13 08:00" },
    { city: "İstanbul", flightDate: "2024-12-12 17:00" },
    { city: "Adıyaman", flightDate: "2024-12-18 14:00" },
    { city: "İzmir", flightDate: "2024-12-20 20:00" },
    { city: "Antalya", flightDate: "2024-12-25 21:00" },
    { city: "Denizli", flightDate: "2024-12-27 23:00" },
    { city: "İstanbul", flightDate: "2024-12-29 09:00" },
    { city: "Adıyaman", flightDate: "2024-12-30 12:00" },
    { city: "İzmir", flightDate: "2024-12-30 21:00" },
    { city: "Antalya", flightDate: "2024-12-31 13:00" },
    { city: "Denizli", flightDate: "2024-12-31 05:00" },
  ];

  // Seçilen tarihler ve şehirle uyumlu uçuşları arıyoruz
  var foundFlights = flights.filter(function (flight) {
    var flightDateObj = new Date(flight.flightDate);
    return (
      flight.city === flightDestination &&
      flightDateObj >= flightStartDateObj && // Uçuş tarihi, başlangıç tarihinden büyük veya eşit olmalı
      flightDateObj <= flightEndDateObj // Uçuş tarihi, bitiş tarihinden küçük veya eşit olmalı
    );
  });

  // Eğer uygun uçuş bulunmazsa, kullanıcıya mesaj gösteriyoruz
  if (foundFlights.length === 0) {
    flightResultsMessage.style.display = "block"; // "Uygun uçuş bulunamadı" mesajını göster
    flightResults.style.display = "block"; // Sonuç bölümünü göster
  } else {
    // Uygun uçuşları liste halinde gösteriyoruz
    foundFlights.forEach(function (flight) {
      var listItem = document.createElement("li");
      var link = document.createElement("a"); // Link elemanı oluşturuyoruz
      listItem.textContent =
        "Gidilecek Yer: "
      link.href = `https://google.com/flights?city=${encodeURIComponent(
        flight.city
      )}&date=${encodeURIComponent(flight.flightDate)}`; // Dinamik bağlantı
      link.textContent = `${flight.city} / ${flight.flightDate}`;
      link.target = "_blank"; // Yeni sekmede açmak için
      link.style.textDecoration = "none"; // İsteğe bağlı stil
      link.style.color = "blue";

      listItem.appendChild(link); // Linki liste elemanına ekliyoruz
      flightResultList.appendChild(listItem);
    });
    flightResults.style.display = "block"; // Sonuç bölümünü göster
  }
}

// Otel Aramaları
function searchHotels() {
  // Kullanıcı seçimlerini alıyoruz
  var hotelDestination = document.getElementById("hotelDestination").value;
  var reservationStartDate = document.getElementById("reservationStartDate").value;
  var reservationEndDate = document.getElementById("reservationEndDate").value;

  // Sonuçları ve mesajı yerleştireceğimiz HTML elemanları
  var hotelResults = document.getElementById("hotelResults");
  var hotelResultList = document.getElementById("hotelResultList");
  var hotelResultsMessage = document.getElementById("hotelResultsMessage");

  // Önceki sonuçları temizleme
  hotelResultList.innerHTML = "";
  hotelResultsMessage.style.display = "none"; // "Uygun uçuş bulunamadı" mesajını gizle
  hotelResults.style.display = "none"; // Sonuçları gizle

  // Eğer şehir, tarih gibi gerekli bilgiler eksikse, kullanıcıyı uyarıyoruz
  if (!hotelDestination || !reservationStartDate || !reservationEndDate) {
    alert("Lütfen alanları doldurunuz.");
    return;
  }

  // Tarih formatlarını karşılaştırmak için Date objelerine dönüştürme
  var reservationStartDateObj = new Date(reservationStartDate);
  var reservationEndDateObj = new Date(reservationEndDate);

  // Başlangıç tarihi ve bitiş tarihi arasındaki kısıtlamaları kontrol et
  if (reservationEndDateObj < reservationStartDateObj) {
    alert("En geç tarih en erken tarihten önce olamaz.");
    return;
  }
  else if (reservationStartDateObj.toDateString() === reservationEndDateObj.toDateString()) {
    alert("İki tarihte aynı gün olamaz.");
    return;
  }

  // Örnek otel verileri
  var hotels = [
    { city: "İstanbul", reservationStartDate: "2024-12-07 08:00", reservationEndDate: "2024-12-14 22:00" },
    { city: "Adıyaman", reservationStartDate: "2024-12-09 08:00", reservationEndDate: "2024-12-16 22:00" },
    { city: "İzmir", reservationStartDate: "2024-12-08 08:00", reservationEndDate: "2024-12-15 22:00" },
    { city: "Antalya", reservationStartDate: "2024-12-06 08:00", reservationEndDate: "2024-12-13 22:00" },
    { city: "Denizli", reservationStartDate: "2024-12-07 08:00", reservationEndDate: "2024-12-14 22:00" },
    { city: "İstanbul", reservationStartDate: "2024-12-25 08:00", reservationEndDate: "2025-01-01 22:00" },
    { city: "Adıyaman", reservationStartDate: "2024-12-11 08:00", reservationEndDate: "2024-12-18 22:00" },
    { city: "İzmir", reservationStartDate: "2024-12-12 08:00", reservationEndDate: "2024-12-19 22:00" },
    { city: "Antalya", reservationStartDate: "2024-12-15 08:00", reservationEndDate: "2024-12-22 22:00" },
    { city: "Denizli", reservationStartDate: "2024-12-13 08:00", reservationEndDate: "2024-12-20 22:00" },
    { city: "İstanbul", reservationStartDate: "2024-12-12 08:00", reservationEndDate: "2024-12-19 22:00" },
    { city: "Adıyaman", reservationStartDate: "2024-12-18 08:00", reservationEndDate: "2024-12-25 22:00" },
    { city: "İzmir", reservationStartDate: "2024-12-20 08:00", reservationEndDate: "2024-12-27 22:00" },
    { city: "Antalya", reservationStartDate: "2024-12-25 08:00", reservationEndDate: "2024-12-15 22:00" },
    { city: "Denizli", reservationStartDate: "2024-12-27 08:00", reservationEndDate: "2025-01-03 22:00" },
    { city: "İstanbul", reservationStartDate: "2024-12-29 08:00", reservationEndDate: "2025-01-05 22:00" },
    { city: "Adıyaman", reservationStartDate: "2024-12-30 08:00", reservationEndDate: "2025-01-06 22:00" },
    { city: "İzmir", reservationStartDate: "2024-12-30 08:00", reservationEndDate: "2025-01-06 22:00" },
    { city: "Antalya", reservationStartDate: "2024-12-31 08:00", reservationEndDate: "2025-01-07 22:00" },
    { city: "Denizli", reservationStartDate: "2024-12-31 08:00", reservationEndDate: "2025-01-07 22:00" },
  ];

  // Seçilen tarihler ve şehirle uyumlu otelleri arıyoruz
  var foundhotels = hotels.filter(function (hotel) {
    var hotelStartDateObj = new Date(hotel.reservationStartDate);
    var hotelEndDateObj = new Date(hotel.reservationEndDate);
    return (
      hotel.city === hotelDestination &&
      hotelStartDateObj >= reservationStartDateObj && // Rezervasyon tarihi, başlangıç tarihinden büyük veya eşit olmalı
      hotelEndDateObj <= reservationEndDateObj // Rezervasyon tarihi, bitiş tarihinden küçük veya eşit olmalı
    );
  });

  // Eğer uygun otel bulunmazsa, kullanıcıya mesaj gösteriyoruz
  if (foundhotels.length === 0) {
    hotelResultsMessage.style.display = "block"; // "Uygun otel bulunamadı" mesajını göster
    hotelResults.style.display = "block"; // Sonuç bölümünü göster
  } else {
    // Uygun otelleri liste halinde gösteriyoruz
    foundhotels.forEach(function (hotel) {
      var listItem = document.createElement("li");
      var link = document.createElement("a");
      listItem.textContent =
        "Gidilecek Yer: "
      link.href = `https://google.com/hotels?city=${encodeURIComponent(hotel.city)}&startDate=${encodeURIComponent(hotel.reservationStartDate)}&endDate=${encodeURIComponent(hotel.reservationEndDate)}`;
      link.textContent = `${hotel.city} / ${hotel.reservationStartDate} / ${hotel.reservationEndDate}`;
      link.target = "_blank";
      link.style.textDecoration = "none";
      link.style.color = "blue";
      listItem.appendChild(link);
      hotelResultList.appendChild(listItem);
    });
    hotelResults.style.display = "block"; // Sonuç bölümünü göster
  }
}

function addCircle(e) {
  // Ana kapsayıcıya referans al
  const container = document.querySelector('.w3-display-container');

  // Kapsayıcının pozisyonunu hesapla
  const rect = container.getBoundingClientRect();
  const offsetX = e.clientX - rect.left; // Fare X konumu
  const offsetY = e.clientY - rect.top;  // Fare Y konumu

  // Eğer hover üzerinde değilse daire oluştur
  if (!document.querySelector('.w3-display-middle:hover')) {
    const circle = document.createElement('div');
    circle.className = 'circle';
    circle.style.width = '50px'; // Daire boyutu
    circle.style.height = '50px'; // Daire boyutu
    circle.style.left = `${offsetX - 25}px`; // Ortalamak için yarısını çıkarıyoruz
    circle.style.top = `${offsetY - 25}px`; // Ortalamak için yarısını çıkarıyoruz
    container.appendChild(circle);

    // Dairenin kaybolmasını sağla
    setTimeout(() => {
      circle.remove();
    }, 500); // 0.5 saniye sonra kaybolur
  }
}

// Hover efekti devre dışı bırakma
function disableHoverEffect(isInside) {
  const container = document.querySelector('.w3-display-container');
  if (isInside) {
    container.classList.add('no-hover');
  } else {
    container.classList.remove('no-hover');
  }
}

/* Sadece iletişim sayfasında kullanılanlar */
// Formun submit işlemi sırasında çağrılacak fonksiyon
function handleSubmit(event) {
  event.preventDefault(); // Sayfa yeniden yüklenmesini engeller

  // Formdaki input alanlarını alıyoruz
  const isim = document.querySelector("input[name='İsim']").value;
  const email = document.querySelector("input[name='Email']").value;
  const mesaj = document.querySelector("input[name='Mesaj']").value;

  // Konsola yazdırıyoruz
  console.log("İsim: " + isim);
  console.log("E-mail: " + email);
  console.log("Mesaj: " + mesaj);

  // Mesaj gönderildiğini bildiren alert gösteriyoruz
  alert("Mesajınız gönderildi.");

  // Formu sıfırlıyoruz
  event.target.reset();
}