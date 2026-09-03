<!DOCTYPE html>
<html lang="{{ page.lang | default: 'en' }}">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>
    {% if page.title %}
      {{ page.title }} | SpamEDGE Company
    {% else %}
      SpamEDGE Company
    {% endif %}
  </title>

  <style>
    * {
      box-sizing: border-box;
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      margin: 0;
      font-family: Arial, Helvetica, sans-serif;
      color: #17294d;
      background: #ffffff;
      line-height: 1.7;
    }

    /* =========================
       HEADER
       ========================= */

    header {
      background: #080817;
      color: white;
      padding: 15px 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: sticky;
      top: 0;
      z-index: 1000;
    }

    .logo-area {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .logo-area img {
      width: 68px;
      height: auto;
    }

    .company-name {
      font-size: 20px;
      font-weight: bold;
      color: white;
    }

    /* =========================
       DESKTOP NAVIGATION
       ========================= */

    .desktop-nav {
      display: flex;
      align-items: center;
      gap: 25px;
    }

    .desktop-nav a {
      color: white;
      text-decoration: none;
      font-size: 15px;
      font-weight: 600;
    }

    .desktop-nav a:hover {
      color: #d5008f;
    }

    /* =========================
       LANGUAGE BUTTON
       ========================= */

    .language-switcher {
      margin-left: 15px;
    }

    .language-switcher a {
      display: inline-block;
      padding: 7px 13px;
      border: 1px solid rgba(255,255,255,0.5);
      border-radius: 4px;
      color: white;
      text-decoration: none;
      font-size: 13px;
      font-weight: bold;
    }

    .language-switcher a:hover {
      background: white;
      color: #080817;
    }

    /* =========================
       MOBILE MENU BUTTON
       ========================= */

    .menu-button {
      display: none;
      background: none;
      border: none;
      color: white;
      font-size: 30px;
      cursor: pointer;
    }

    /* =========================
       MOBILE MENU
       ========================= */

    .mobile-menu {
      display: none;
      position: fixed;
      top: 0;
      right: 0;
      width: 85%;
      max-width: 420px;
      height: 100vh;
      background: white;
      z-index: 2000;
      overflow-y: auto;
      box-shadow: -5px 0 20px rgba(0,0,0,0.2);
    }

    .mobile-menu.active {
      display: block;
    }

    .mobile-menu-header {
      display: flex;
      justify-content: flex-end;
      padding: 25px 20px 10px;
    }

    .close-menu {
      background: none;
      border: none;
      font-size: 34px;
      color: #17294d;
      cursor: pointer;
      line-height: 1;
    }

    .mobile-nav {
      padding: 30px 40px;
    }

    .mobile-nav a {
      display: block;
      padding: 18px 0;
      border-bottom: 1px solid #e5e5e5;
      color: #17294d;
      text-decoration: none;
      font-size: 20px;
      font-weight: 600;
    }

    .mobile-nav a:hover {
      color: #d5008f;
    }

    /* Language inside mobile menu */

    .mobile-language {
      margin-top: 25px;
    }

    .mobile-language a {
      display: inline-block;
      border: 1px solid #17294d;
      padding: 8px 18px;
      font-size: 15px;
      border-radius: 4px;
    }

    /* =========================
       PAGE CONTENT
       ========================= */

    main {
      max-width: 1100px;
      margin: 0 auto;
      padding: 60px 30px;
      min-height: 70vh;
    }

    main h1 {
      font-size: 42px;
      line-height: 1.2;
      margin-bottom: 30px;
      color: #17294d;
    }

    main h2 {
      color: #17294d;
      margin-top: 35px;
    }

    main img {
      max-width: 100%;
      height: auto;
    }

    main a {
      color: #d5008f;
    }

    /* =========================
       FOOTER
       ========================= */

    footer {
      background: #080817;
      color: white;
      padding: 35px 30px;
      text-align: center;
      margin-top: 50px;
    }

    footer p {
      margin: 5px 0;
    }

    /* =========================
       MOBILE
       ========================= */

    @media (max-width: 900px) {

      header {
        padding: 14px 20px;
      }

      .desktop-nav {
        display: none;
      }

      .menu-button {
        display: block;
      }

      .company-name {
        font-size: 17px;
      }

      .logo-area img {
        width: 58px;
      }

      main {
        padding: 40px 20px;
      }

      main h1 {
        font-size: 34px;
      }
    }

    /* Overlay */

    .menu-overlay {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.45);
      z-index: 1500;
    }

    .menu-overlay.active {
      display: block;
    }
  </style>
</head>

<body>

  <!-- =========================
       HEADER
       ========================= -->

  <header>

    <div class="logo-area">

      <a href="{% if page.lang == 'fr' %}/fr/{% else %}/{% endif %}">
        <img src="/logo.png" alt="SpamEDGE Company">
      </a>

      <div class="company-name">
        SpamEDGE Company
      </div>

    </div>


    <!-- DESKTOP NAVIGATION -->

    <nav class="desktop-nav">

      {% if page.lang == "fr" %}

        <a href="/fr/">Accueil</a>
        <a href="/fr/about">À propos de SpamEDGE</a>
        <a href="/fr/leadership">Direction</a>
        <a href="/fr/services">Services</a>
        <a href="/fr/projects">Projets</a>
        <a href="/fr/subsidiaries">Filiales</a>
        <a href="/fr/news">Actualités</a>
        <a href="/fr/contact">Contact</a>

        <div class="language-switcher">
          <a href="{{ page.url | replace_first: '/fr', '' }}">EN</a>
        </div>

      {% else %}

        <a href="/">Home</a>
        <a href="/about">About SpamEDGE Company</a>
        <a href="/leadership">Leadership</a>
        <a href="/services">Services</a>
        <a href="/projects">Projects</a>
        <a href="/subsidiaries">Subsidiaries</a>
        <a href="/news">News</a>
        <a href="/contact">Contact</a>

        <div class="language-switcher">
          <a href="/fr{{ page.url }}">FR</a>
        </div>

      {% endif %}

    </nav>


    <!-- MOBILE MENU BUTTON -->

    <button
      class="menu-button"
      id="openMenu"
      aria-label="Open menu">
      ☰
    </button>

  </header>


  <!-- =========================
       MOBILE MENU OVERLAY
       ========================= -->

  <div class="menu-overlay" id="menuOverlay"></div>


  <!-- =========================
       MOBILE MENU
       ========================= -->

  <aside class="mobile-menu" id="mobileMenu">

    <div class="mobile-menu-header">

      <button
        class="close-menu"
        id="closeMenu"
        aria-label="Close menu">
        ×
      </button>

    </div>


    <nav class="mobile-nav">

      {% if page.lang == "fr" %}

        <!-- FRENCH MENU -->

        <a href="/fr/">Accueil</a>

        <a href="/fr/about">
          À propos de SpamEDGE
        </a>

        <a href="/fr/leadership">
          Direction
        </a>

        <a href="/fr/services">
          Services
        </a>

        <a href="/fr/projects">
          Projets
        </a>

        <a href="/fr/subsidiaries">
          Filiales
        </a>

        <a href="/fr/news">
          Actualités
        </a>

        <a href="/fr/contact">
          Contact
        </a>


        <div class="mobile-language">

          <a href="{{ page.url | replace_first: '/fr', '' }}">
            🇬🇧 English
          </a>

        </div>


      {% else %}

        <!-- ENGLISH MENU -->

        <a href="/">
          Home
        </a>

        <a href="/about">
          About SpamEDGE Company
        </a>

        <a href="/leadership">
          Leadership
        </a>

        <a href="/services">
          Services
        </a>

        <a href="/projects">
          Projects
        </a>

        <a href="/subsidiaries">
          Subsidiaries
        </a>

        <a href="/news">
          News
        </a>

        <a href="/contact">
          Contact
        </a>


        <div class="mobile-language">

          <a href="/fr{{ page.url }}">
            🇫🇷 Français
          </a>

        </div>

      {% endif %}

    </nav>

  </aside>


  <!-- =========================
       MAIN CONTENT
       ========================= -->

  <main>

    {{ content }}

  </main>


  <!-- =========================
       FOOTER
       ========================= -->

  <footer>

    {% if page.lang == "fr" %}

      <p>© {{ site.time | date: "%Y" }} SpamEDGE Company. Tous droits réservés.</p>

    {% else %}

      <p>© {{ site.time | date: "%Y" }} SpamEDGE Company. All rights reserved.</p>

    {% endif %}

  </footer>


  <!-- =========================
       MOBILE MENU JAVASCRIPT
       ========================= -->

  <script>

    const openMenu = document.getElementById("openMenu");
    const closeMenu = document.getElementById("closeMenu");
    const mobileMenu = document.getElementById("mobileMenu");
    const menuOverlay = document.getElementById("menuOverlay");


    function openMobileMenu() {
      mobileMenu.classList.add("active");
      menuOverlay.classList.add("active");
      document.body.style.overflow = "hidden";
    }


    function closeMobileMenu() {
      mobileMenu.classList.remove("active");
      menuOverlay.classList.remove("active");
      document.body.style.overflow = "";
    }


    openMenu.addEventListener("click", openMobileMenu);

    closeMenu.addEventListener("click", closeMobileMenu);

    menuOverlay.addEventListener("click", closeMobileMenu);


    /* Close menu after clicking a link */

    const mobileLinks =
      document.querySelectorAll(".mobile-nav a");

    mobileLinks.forEach(function(link) {

      link.addEventListener("click", function() {
        closeMobileMenu();
      });

    });

  </script>

</body>

</html>
