# Student Placement & Internship Portal

A front-end web project (HTML, CSS, vanilla JavaScript) implementing all the
features from the spec: student registration/login, student profile, resume
upload, internship/job listings with search & filter, apply button,
application status tracking, admin dashboard, add/delete job postings, and
responsive mobile design.

## How to run
1. Unzip this folder.
2. Open `index.html` in any modern browser (Chrome, Edge, Firefox).
   No server or installation is required.

## Demo accounts
- **Admin login:** username `admin`, password `admin123`
- **Students:** register your own account from the "Register" tab.

## How data is stored
This is a self-contained front-end demo, so all data (students, job
postings, applications, resumes) is stored in the browser's `localStorage` —
there is no backend/database. This keeps the project runnable by simply
opening the HTML file, which is ideal for a college web-dev project or demo.

To connect it to a real backend later, replace the functions in `js/app.js`
(e.g. `registerStudent`, `getJobs`, `applyToJob`) with `fetch()` calls to
your API — the rest of the UI code stays the same.

## File structure
```
portal/
├── index.html          Landing page (student login/register + admin login)
├── dashboard.html       Student dashboard (profile, listings, status)
├── admin.html           Admin dashboard (postings, applications, students)
├── css/style.css        Styling (dark theme, responsive)
└── js/app.js            Data layer, auth, jobs & applications logic
```
