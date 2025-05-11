<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background-color: #f5f5f5;
      overflow: hidden; /* Prevent scrolling on mobile */
    }
    .container {
      position: relative;
      text-align: center;
    }
    iframe {
      border: none;
      height: 600px;
      width: 375px;
    }
    .footer-image {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 375px;
      height: 60px; /* Increased height to better cover branding logo */
      background-color: white; /* Placeholder white image */
      z-index: 10;
    }
    .top-right-cover {
      position: absolute;
      top: 5px; /* Adjusted for better alignment */
      right: 5px; /* Adjusted for better alignment */
      width: 50px; /* Slightly increased to ensure full coverage */
      height: 50px;
      background-color: white; /* Placeholder white image */
      z-index: 10;
    }
    .open-source {
      position: absolute;
      bottom: 10px;
      width: 100%;
      text-align: center;
      z-index: 20;
    }
    @media (min-width: 376px) {
      body {
        overflow: auto; /* Allow scrolling on web */
      }
      iframe {
        width: 375px;
        height: 600px;
      }
      .footer-image {
        width: 375px;
        height: 60px;
      }
      .container {
        padding: 20px;
        background-color: #f5e8c7; /* Tan color for sides */
        background: linear-gradient(to right, #f5e8c7, #d2b48c); /* Tan to light brown gradient */
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <iframe id="JotFormIFrame-251257978290165" title="Clyde's Info" allow="geolocation; microphone; camera" src="https://www.jotform.com/app/251257978290165?appEmbedded=1"></iframe>
    <div class="footer-image"></div>
    <div class="top-right-cover"></div>
    <div class="open-source">
      This site is open source. Improve this page.
    </div>
  </div>
</body>
</html>
