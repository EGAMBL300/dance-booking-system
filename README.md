# DanceHub – Dance Class Booking System

DanceHub is a Node.js web application that allows users to browse and book dance courses and classes. It also provides organiser-level access for managing courses, classes, attendees, and other organisers.

## Live Demo

Check out the live version of DanceHub here: [https://dancehub.onrender.com](https://dancehub.onrender.com)

## Summary

This application was developed using:

- **Node.js** and **Express** for backend logic and routing.
- **NeDB** as a lightweight database for storing users, courses, classes, and bookings.
- **Mustache** templates for server-side rendering.
- **Vanilla JavaScript** for client-side interactivity.
- **CSS** for styling with consistent theming across all pages.

## 👥 User Roles

### Guests (Not Logged In)

- View organisation information and class locations.
- Browse courses and view full class details.
- Enrol in a course or book individual classes.

### Organisers (Logged In)

- Log in securely with a username and password.
- Add, edit, or delete courses and classes.
- View and manage class attendees.
- Register new organisers and remove existing ones.

## Features

- About page with organisation overview and locations.
- Course and class listings with date, time, description, location, and price.
- Organiser dashboard to manage course and class data.
- Organiser registration and management tools.
- Class attendee lists with modal popups.
- Session-based authentication for organisers.

## How to Run the Application Locally

1. **Extract the ZIP**

   Unzip the project folder to your desired location.

2. **Install Node.js**

   Ensure you have [Node.js](https://nodejs.org/) installed.

3. **Install Dependencies**

   Open a terminal in the root of the project folder and run:

   ```bash
   npm install
   ```

4. **Seed the database with a test organiser**

   Open a terminal in the root of the project folder and run:

   ```bash
   node seed.js
   ```

5. **Start the Application**

   Run the app locally using:

   ```bash
   npm run dev
   ```

6. **Open in Browser**

   Visit: http://localhost:3000
