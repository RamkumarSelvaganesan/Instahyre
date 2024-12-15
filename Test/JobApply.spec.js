const { test } = require("playwright/test");
import userDetails from "../Src/InstaHyre/Constants";
const InstaHyrePage = require("../Src/InstaHyre/InstaHyrePage");

test("Apply the Hirist", async ({ page }) => {
  await page.goto(userDetails.instahyre.url);
  const instaHyrePage = new InstaHyrePage(page);
  await instaHyrePage.login();
  await instaHyrePage.openViewJob();
  try {
   for(let i=0;i<1000;i++){
    await instaHyrePage.captureViewdJobDetails();
    await instaHyrePage.applyJob();
   }
  } catch {
    await instaHyrePage.saveAppliedJobsDetails();
  }
});

// test.only("Apply the Hirist time", async ({ page }) => {
//    const instaHyrePage = new InstaHyrePage(page);
//    console.log(await instaHyrePage.formatDateTime(new Date()));
// });