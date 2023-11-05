import user from "./user.js";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

puppeteer.use(StealthPlugin());

(async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: [
      "--disable-features=IsolateOrigins,site-per-process,SitePerProcess",
      "--flag-switches-begin --disable-site-isolation-trials --flag-switches-end",
    ],
  });
  const page = await browser.newPage();
  //   await page.goto("https://arh.antoinevastel.com/bots/areyouheadless");
  await page.goto(
    "https://jobs.lever.co/activecampaign/2d34cbb1-43f9-4448-8fa9-d51c6950d8b6/apply"
  );

  const easyQuestions = await page.evaluate(() => {
    const list = document.querySelectorAll(
      "li.application-question:not(.custom-question)"
    );
    const result = [];

    list.forEach((element) => {
      result.push(element.textContent);
    });

    return result;
  });

  //   console.log(easyQuestions);

  const hardQuestions = await page.evaluate(() => {
    const list = document.querySelectorAll(
      "li.application-question.custom-question"
    );
    const result = [];

    list.forEach((element) => {
      result.push(element.textContent);
    });

    return result;
  });

  console.log(hardQuestions);

  //   const firstUlLiList = await page.evaluate(() => {
  //     const firstUl = document.querySelector("ul:first-of-type"); // Select the first <ul> element
  //     const liList = firstUl
  //       ? firstUl.querySelectorAll("li.application-question")
  //       : []; // Find <li> elements within the first <ul>

  //     const result = [];

  //     liList.forEach((element) => {
  //       result.push(
  //         element.querySelector("label.application-field").textContent
  //         //   .getAttribute("name")
  //       );
  //     });

  //     return result;
  //   });

  //   console.log(firstUlLiList);
  await browser.close();

  //   await page.screenshot({ path: "leverdoneenew.png", fullPage: true });
  //   await page.click("#btn-submit");

  //   await browser.close();
})();
