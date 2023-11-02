const user = require("./user.js");
const puppeteer = require("puppeteer-extra");

console.log(user);

const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

const RecaptchaPlugin = require("puppeteer-extra-plugin-recaptcha");
puppeteer.use(
  RecaptchaPlugin({
    provider: {
      id: "2captcha",
      token: "6ed6af27d3ff2d18630dd39b843955c1", // REPLACE THIS WITH YOUR OWN 2CAPTCHA API KEY ⚡
    },
    visualFeedback: true, // colorize reCAPTCHAs (violet = detected, green = solved)
  })
);

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--disable-features=IsolateOrigins,site-per-process,SitePerProcess",
      "--flag-switches-begin --disable-site-isolation-trials --flag-switches-end",
    ],
  });
  const page = await browser.newPage();
  await page.goto(
    "https://jobs.lever.co/artera/82c93c81-1d5d-4490-9dbc-4c68af88e34f/apply"
  );

  await page.waitForSelector('input[name="name"]', { timeout: 5000 });
  await page.type('input[name="name"]', `${user.first_name} ${user.last_name}`);

  const attachButton = await page.$('input[name="resume"]');
  await attachButton.click();

  const [fileChooser] = await Promise.all([
    page.waitForFileChooser(),
    attachButton.click(),
  ]);

  await fileChooser.accept(["./josh_mayer_815.pdf"]);

  await page.waitForSelector('input[name="email"]', { timeout: 5000 });
  await page.type('input[name="email"]', user.email);

  await page.waitForSelector('input[name="phone"]', { timeout: 5000 });
  await page.type('input[name="phone"]', user.phone);

  await page.waitForSelector('input[name="urls[LinkedIn]"]', { timeout: 5000 });
  await page.type('input[name="urls[LinkedIn]"]', user.linkedin_url);

  await page.waitForSelector('input[name="urls[Portfolio]"]', {
    timeout: 5000,
  });
  await page.type('input[name="urls[Portfolio]"]', user.portfolio_url);

  await page.waitForSelector(
    'input[type="radio"][name="cards[d74bd0d4-ef9f-476c-9ad8-081d540f476a][field0]"][value="Yes"]'
  );

  await page.click(
    'input[type="radio"][name="cards[d74bd0d4-ef9f-476c-9ad8-081d540f476a][field0]"][value="Yes"]'
  );

  // await page.waitForSelector('textarea[name="comments"]');

  await page.type(
    'textarea[name="comments"]',
    "submitted using a bot (bix.sh) hehe"
  );

  await page.click("#btn-submit");

  console.log("clicked submit");

  await page.waitForTimeout(1000);

  console.log("waiting for captcha");

  //   await page.waitForSelector('iframe[src*="recaptcha/"]');
  //   console.log(page.mainFrame().childFrames()[1]);
  //   for (const frame of page.mainFrame().childFrames()) {
  //     // Attempt to solve any potential captchas in those frames
  //     console.log("iter");
  //     const { captchas, filtered, solutions, solved, error } =
  //       await frame.solveRecaptchas();

  //     console.log(captchas, "c");

  //     console.log(solved);
  //   }

  const frame = page.mainFrame().childFrames()[1];

  const { captchas, filtered, solutions, solved, error } =
    await frame.solveRecaptchas();

  console.log(captchas, "c");

  console.log(solved);

  console.log("solved");

  await Promise.all([
    page.waitForNavigation(),
    console.log("ass"),
    // page.screenshot({ path: "aftercapp.png", fullPage: true }),
    // page.click(`#hcaptchaSubmitBtn`),
  ]);

  console.log("submited");

  await page.click("#btn-submit");

  await page.waitForTimeout(1000);

  await page.screenshot({ path: "lever.png", fullPage: true });
  await page.click("#btn-submit");

  await browser.close();
})();
