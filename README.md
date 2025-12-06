# 🤖 Instahyre Job Automation (Playwright)

This project automates job applications on the Instahyre platform using Playwright, saves daily and overall job history, and generates a dynamic HTML dashboard report.

---

## 🚀 Features

- Automates Instahyre job application process
- Saves applied jobs into JSON files
- Generates dynamic HTML report with:
  - Today’s job applications
  - Overall job applications
- Report supports:
  - PDF Export
  - Excel Export
- Local server-based dashboard view

---

## 📂 Project Setup Steps

###  Step 1 — Install Node Dependencies

```
npm install
```

### Step 2 — Install Playwright Browsers
```
npx playwright install
```
### 🔐 Step 3 — Set Login Credentials

Update the username and password in Src/InstaHyre/Constants.js

username = "your_instahyre_email";
password = "your_instahyre_password";

### ▶️ Step 4 — Run Job Automation

```
npm run apply-job
```

### 📊 Step 5 — View Report in Browser

```
npm run show-report
```

This starts local server and renders:

http://127.0.0.1:8080/output.html


To stop the server, 
press: Ctrl + C