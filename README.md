# Road to Silicon V/Alley

### Requirements
- Node.js

### Getting Started
To run the website, run install dependencies and start the server.

```bash
npm install
npm start
```

### Changing Information
The site is entirely static. Site data is modified using Primsic CMS (Content Managment System), which automatically updates site information when changes are made. Prismic includes tabs for **Social Links**, **Google Calendar ID** and other parts of the page.


### Updating the Calendar
The calendar uses the Google Calendars API. To add your own calendar:

- Create a new calendar on Google Calendar
- Navigate to the calendar under "My calendars", click on the more menu, then click on "Settings and sharing"
- Under "Access permissions", make the calendar public
- Under "Integrate calendar", copy the **Calendar ID** in full, and paste it into the "Calendar ID" property in the "Calendar Info" tab in the Prismic account.

It's explained [here](https://help.risevision.com/hc/en-us/articles/115002181123-Make-a-Google-Calendar-public-and-get-the-Calendar-ID) as well.