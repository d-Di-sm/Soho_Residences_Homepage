import React, { useState } from "react";
import { useAtom } from "jotai";
import { transitionHome } from "../App";

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [, setTransitionHomepage] = useAtom(transitionHome);

  const transitionToHomepage = () => {
    setTransitionHomepage(true);
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        color: "#ffffff",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Background video */}
      <video
        src="/videos/03.mp4"
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      />

      {/* Header con logo centrado */}
      <header
        style={{
          position: "absolute",
          top: 20,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          textAlign: "center",
        }}
      >
        <img
          src="/Soho_Logo_Text_Res.png"
          alt="Soho Logo"
          style={{
            maxHeight: 30,
            display: "block",
          }}
        />
      </header>

      {/* Línea horizontal a lo ancho del window */}
      <div
        style={{
          position: "absolute",
          top: 70,
          left: 0,
          width: "100vw",
          height: 1,
          backgroundColor: "#fffef7",
          zIndex: 1,
        }}
      />

      {/* Botón Interactive centrado */}
      <div
        style={{
          position: "absolute",
          top: "65%",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="interactive">
          <button
            className="interactive__button"
            onClick={transitionToHomepage}
          >
            INTERACTIVE EXPERIENCE
          </button>
        </div>
      </div>

      {/* Línea inferior con botones de texto */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100vw",
          borderTop: "1px solid #fffef7",
          padding: "10px 0vw",
          boxSizing: "border-box",
          zIndex: 2,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            alignItems: "center",
          }}
        >
          {[
            { label: "Contact", href: "https://soma.group/es/contact-us/" },
            {
              label: "Home",
              href: "https://www.sohohouse.com/es/houses/soho-house-mexico-city",
            },
            { label: "Info", href: "https://soma.group/es/" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "none",
                border: "none",
                color: "#fffef7",
                cursor: "pointer",
                fontSize: "0.85rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "0 0.5rem",
                textDecoration: "none",
                textAlign: "center",
              }}
              //   onClick={() => console.log(`${label} clicked`)}
            >
              {label}
              {/* </button> */}
            </a>
          ))}
        </div>
      </div>

      {/* Menú hamburguesa */}
      <div
        style={{
          position: "absolute",
          top: 15,
          right: 20,
          zIndex: 3,
        }}
      >
        <button
          className="home-menu-hamburger-btn"
          onClick={() => setMenuOpen((prev) => !prev)}
          style={{
            width: 40,
            height: 40,
            borderRadius: 999,
            border: "1px solid rgba(255,255,255,0.6)",
            // backgroundColor: "rgba(0,0,0,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            padding: 0,
            backdropFilter: "blur(6px)",
          }}
          aria-label="Abrir menú"
        >
          <div
            style={{
              width: 18,
              height: 14,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {[0, 1, 2].map((index) => (
              <span
                key={index}
                style={{
                  display: "block",
                  height: 2,
                  borderRadius: 999,
                  backgroundColor: "#ffffff",
                  transition: "transform 0.2s ease, opacity 0.2s ease",
                  transformOrigin: "center",
                  ...(menuOpen &&
                    (index === 0
                      ? { transform: "translateY(6px) rotate(45deg)" }
                      : index === 1
                        ? { opacity: 0 }
                        : { transform: "translateY(-6px) rotate(-45deg)" })),
                }}
              />
            ))}
          </div>
        </button>

        {menuOpen && (
          <nav
            style={{
              //   marginTop: 10,
              position: "absolute",
              top: 70,
              right: 0,
              padding: "16px 0",
              minWidth: 280,
              borderRadius: 12,
              backgroundColor: "rgba(0,0,0,0.7)",
              border: "1px solid rgba(255,255,255,0.18)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 18px 35px rgba(0,0,0,0.5)",
            }}
          >
            {[
              { label: "Soho House", href: "https://www.sohohouse.com/" },
              { label: "SOMA", href: "https://soma.group/es/" },
              { label: "Sordo Madaleno", href: "https://sordomadaleno.com/" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: "100%",
                  padding: "10px 24px",
                  background: "none",
                  border: "none",
                  color: "#ffffff",
                  textAlign: "center",
                  fontSize: "0.95rem",
                  cursor: "pointer",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                  textDecoration: "none",
                  display: "block",
                }}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </div>
  );
};

export default Home;
