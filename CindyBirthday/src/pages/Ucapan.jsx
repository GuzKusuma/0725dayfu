import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Gallery() {
  const itemData = [
    { img: "/images/c1.jpg" },
    { img: "/images/c2.jpg" },
    { img: "/images/c3.jpg" },
    { img: "/images/c4.jpg" },
    { img: "/images/c5.jpg" },
    { img: "/images/c6.jpg" },
    { img: "/images/c7.jpg" },
    { img: "/images/c8.jpg" },
    { img: "/images/c9.jpg" },
    { img: "/images/c10.jpg" },
    { img: "/images/c11.jpg" },
    { img: "/images/c12.jpg" },
    { img: "/images/c13.jpg" },
    { img: "/images/c14.jpg" },
    { img: "/images/c15.jpg" },
    { img: "/images/c16.jpg" },
    { img: "/images/c17.jpg" },
    { img: "/images/c18.jpg" },
    { img: "/images/c19.jpg" },
    { img: "/images/c20.jpg" },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 2600,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true, // otomatis jalan
    autoplaySpeed: 100, // 2 detik tiap slide
    pauseOnHover: true, // berhenti kalau dihover
    cssEase: "linear", // transisi lebih smooth
    
  };
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Happy Birthday Cindy 🎉</h1>

      <div style={styles.carouselWrapper}>
        <Slider {...settings}>
          {itemData.map((item, index) => (
            <div key={index} style={styles.slide}>
              <img
                src={item.img}
                alt={`Gallery ${index + 1}`}
                style={styles.image}
                loading="lazy"
              />
            </div>
          ))}
        </Slider>
      </div>

{/* gambar ornamen */}

      <div style={{ position: 'relative', margin: '0 auto',  }}>
      <img 
          src="/images/cindy.png" 
          alt="Birthday Cake"
          loading="lazy"
          style={{
            width: '35%',
            height: 'auto',
            objectFit: 'contain',
            position: 'absolute',
            top: '-55px',        // ubah ini sesuai posisi yang kamu mau
            right: '690px',      // bisa diganti left, bottom, dsb
            zIndex: -99999,
            pointerEvents: 'none', // supaya gak ganggu klik elemen lain
          }}
        />
        
     
        
      </div>
      <div style={{ position: 'relative', margin: '0 auto',  }}>
      <img 
          src="/images/cindyy.png" 
          alt="Birthday Cake"
          loading="lazy"
          style={{
            width: '35%',
            height: 'auto',
            objectFit: 'contain',
            position: 'absolute',
            top: '-105px',        // ubah ini sesuai posisi yang kamu mau
            right: '-12%',      // bisa diganti left, bottom, dsb
            zIndex: -99999,
            pointerEvents: 'none', // supaya gak ganggu klik elemen lain
          }}
        />
         <img 
          src="/images/dayliliy.png" 
          alt="Birthday Cake"
          loading="lazy"
          style={{
            width: '35%',
            height: 'auto',
            objectFit: 'contain',
            position: 'absolute',
            top: '140px',        // ubah ini sesuai posisi yang kamu mau
            right: '-12%',      // bisa diganti left, bottom, dsb
            zIndex: -99999,
            pointerEvents: 'none', // supaya gak ganggu klik elemen lain
          }}
        />
      </div>
<br />
<br />
      <p style={{ fontSize: "16px", color: "#FFFF", lineHeight: "1.6", maxWidth: "600px", margin: "0 auto" }}>
        <span > Cindy, selamat ulang tahun ke-22</span> 🎉 Makasih udah jadi manusia yang
        selalu optimis dan nyebarin vibe positif di sekitarmu. Semoga umur baru
        ini ngasih kamu banyak keberuntungan, dan hal-hal baru.
        <br />
        <br />
        <span style={{ fontWeight: "bold", backgroundColor: "rgba(255, 64, 128, 0.9)", padding: "5px", borderRadius: "5px", }}>

        Foto-foto ini mungkin kelihatan biasa aja, tapi siapa tau bisa jadi
        reminder buat kamu kalau kita gk nyadar udh ciptain memori buat diri sendiri dan orang lain. 🎈
        </span>
      </p>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    maxWidth: "900px",
    margin: "0 auto",
    boxSizing: "border-box",
  },
  heading: {
    marginBottom: "20px",
    fontSize: "24px",
    color: "#ff4081",
  },
  carouselWrapper: {
    marginBottom: "30px",
  },
  slide: {
    padding: "10px",
    boxSizing: "border-box",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "10px",
  },
  paragraph: {
    fontSize: "16px",
    color: "#333",
    lineHeight: "1.6",
    maxWidth: "600px",
    margin: "0 auto",
  },
};

export default Gallery;
