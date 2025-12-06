const constants = require("./Constants");
const fs = require("fs");
const JsonManager = require("../Base/JsonManager");
const open = (...args) => import('open').then(m => m.default(...args));
const path = require('path');

class InstaHyrePage {
  constructor(page) {
    this.page = page;
    this.appliedJobs = [];
  }

  async login() {
    await this.page.waitForTimeout(1000);
    await this.page.locator("input#email").fill(constants.instahyre.username);
    await this.page
      .locator("input#password")
      .fill(constants.instahyre.password);
    await this.page.locator("button.btn-success").click();
  }

  async openViewJob() {
    try{
    await this.page.locator("button#interested-btn").first().click();
    } catch{
        await this.page.locator('li[ng-repeat="savedSearch in savedSearches"]').first().click();
        await this.page.locator("button#interested-btn").first().click();
    }
  }

  async captureViewdJobDetails() {
    await this.page.waitForSelector("div.profile-info h2", {
      state: "visible",
    });
    let companyName = await this.page
      .locator("div.profile-info h2")
      .textContent();
    let role = await this.page.locator("div.profile-info h1").textContent();
    let location = await this.page
      .locator("div.job-locations span")
      .first()
      .textContent();
    let experience = await this.page
      .locator("div.job-locations span")
      .last()
      .textContent();
    let empCount = await this.page
      .locator(`span[ng-if='employer.employee_count']`)
      .textContent();
    let hr = await this.page.locator("span.rec-name").textContent();
    let score  = await this.page.locator("div.score-bubble").textContent();
    let appliedon = await this.formatDateTime(new Date());
    this.appliedJobs.push({
      companyName: companyName.trim(),
      role: role.trim(),
      location: location.trim(),
      experience: experience.trim(),
      empCount: empCount.trim(),
      score:score.trim(),
      hr: hr.trim(),
      appliedon: appliedon.trim(),
    });

    //await this.saveJobsToFile();
  }

  async applyJob() {
    await this.page
      .locator("//button[text()='Apply' and contains(@class,'btn-primary')]")
      .click();
    await this.page.waitForTimeout(500);
    let similarJobs = `div[ng-show="modalParams.showApplyBulkModal"] h4`;
    if (await this.page.locator(similarJobs).isVisible()) {
      await this.page.locator("//button[text()='Apply']").first().click();
    }
  }
  async saveAppliedJobsDetails() {
    const jsonManager = new JsonManager(
      constants.appliedJobFileDetails.today,
      constants.appliedJobFileDetails.all
    );

    /*try {
        // Convert the appliedJobs array into a JSON string with pretty formatting
        const jsonData = JSON.stringify(this.appliedJobs, null, 2);

        // Write the JSON string to the specified file
        fs.writeFileSync(filePath, jsonData, 'utf-8');

        console.log(`Successfully saved applied jobs to ${filePath}`);
    } catch (error) {
        console.error('Error saving jobs to file:', error);
    }*/
    await jsonManager.saveTodayJobs(this.appliedJobs);
  }

  async formatDateTime(date) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Determine AM/PM
    const period = hours >= 12 ? "PM" : "AM";

    // Convert to 12-hour format
    const hour12 = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    // Format date and time
    return `${day}-${month}-${year} on ${hour12}:${formattedMinutes} ${period}`;
  }
}
module.exports = InstaHyrePage;
