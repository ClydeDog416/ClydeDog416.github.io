# My Pet ID

Welcome to **My Pet ID**, a web app designed to help keep track of your pet's location and information using NFC tags. This app is accessible on both desktop and mobile devices, making it easy for anyone to view your pet's profile and recent locations.

## About Clyde

Woof woof! I’m Clyde, a purebred American Pit Bull Terrier, born on April 16, 2024. I weigh 53 lbs and stand 1.8 feet tall—perfect for zooming and cuddling! I’m all about love and play, and I’ve got a big personality to match.

- **Who I Am**: I’m playful, loving, and super affectionate. I bark with a sturdy voice and love to alert with my paw—I’m great at sniffing out anything interesting!
- **What I Love**: Running fast, learning tricks for treats (I know about 10 on command!), and hiking with my human—we explore the Appalachian Trail and local spots, plus we go camping! I also love napping with my toys, snuggling under a blanket, and watching TV—*Regular Show* is my fave, especially Rigby!
- **My Routine**: We walk every morning and afternoon, and on my human’s days off, we go for long hikes. I’m a healthy eater with a breakfast and dinner schedule—yummy veggies, protein like chicken or beef, rice, and eggs for breakfast. I’ve got free roam of the house and can go outside whenever I ask—woof!
- **My Training**: My human’s teaching me to be an awesome Emotional Support Animal (ESA) or service dog. I’m picking up commands fast, so I might help with alerting or comfort someday!
- **My Quirks**: I’ve still got all three balls (hehe!), and I’m super vocal—my barks and whines keep the house lively! I also play well with other dogs so far—love making new friends!

## How It Works

- **Scan the NFC Tag**: Use your phone to scan Clyde’s NFC tag. If you’re the owner, your location will be updated in our database.
- **View the Profile**: Anyone can scan the tag to view Clyde’s profile, including his details and the last known locations (updated within the last 2 hours).
- **Account Features**: Create an account or log in to manage Clyde’s profile and update his information (owner-only).

[Visit the My Pet ID App](https://clydedog416.github.io/) to get started!

## Features

- View Clyde’s detailed profile, including his personality, medical info, socials, and gallery.
- See the last known locations on a Google Map (updated dynamically via GitHub Actions).
- Report Clyde as lost if you find him.
- Create an account or log in to manage pet details (owner-only).

## Coming Soon

- Integration with Tasker and NFC Tools Pro to automatically update location data when the owner scans the tag.
- Support for additional devices (e.g., family members’ phones) to update locations.


<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=375px, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
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
      width: 375px;
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
      height: 80px; /* Ensures full coverage of branding logo */
      background-color: white; /* Placeholder white image */
      z-index: 10;
    }
    .top-right-cover {
      position: absolute;
      top: 10px; /* Adjusted to align below "PAGES" */
      right: 5px; /* Adjusted to follow the edge of the "PAGES" rectangle */
      width: 60px;
      height: 60px;
      background-color: white; /* Placeholder white image */
      z-index: 10;
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
        height: 80px;
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
  </div>
</body>
</html>
