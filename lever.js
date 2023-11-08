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

// Expected Input

const application = {
  easy: {
    name: "Josh",
    email: "jooshmayer@gmail.com",
    phone: "4152055634",
  },
  links: {
    linkedin_url: "https://linkedin.com/in/jooshmayer",
    portfolio_url: "https://joshmayer.net",
    twitter_url: "https://twitter.com/jooshmayer",
    github_url: "https://github.com/joshmayerr",
  },
  hard: ["Yes", "No", "Written Response...."],
  cover_letter: "cover letter....",
};

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      "--disable-features=IsolateOrigins,site-per-process,SitePerProcess",
      "--flag-switches-begin --disable-site-isolation-trials --flag-switches-end",
    ],
  });
  const page = await browser.newPage();
  //   await page.goto("https://arh.antoinevastel.com/bots/areyouheadless");
  await page.goto(
    "https://jobs.lever.co/tri/e602a5e6-a400-412b-96cf-c5c82a9adb33/apply"
  );

  await page.waitForSelector("#application-form");

  //   --- fill in section 1 ----

  try {
    const attachButton = await page.$('input[name="resume"]');
    await attachButton.click();

    const [fileChooser] = await Promise.all([
      page.waitForFileChooser(),
      attachButton.click(),
    ]);

    await fileChooser.accept(["./josh_mayer_815.pdf"]);
  } catch (error) {
    console.log("resume not work");
  }

  try {
    await page.type(
      'input[name="name"]',
      `${user.first_name} ${user.last_name}`
    );
  } catch (error) {}

  try {
    await page.type('input[name="email"]', user.email);
  } catch (error) {}

  try {
    await page.type('input[name="phone"]', user.phone);
  } catch (error) {}

  //  -------- fill in section 2 --------

  try {
    await page.type('input[name="urls[LinkedIn]"]', user.linkedin_url);
  } catch (error) {}

  try {
    await page.type('input[name="urls[Portfolio]"]', user.portfolio_url);
  } catch (error) {}

  try {
    await page.type('input[name="urls[GitHub]"]', user.github_url);
  } catch (error) {}

  try {
    await page.type('input[name="urls[Twiter]"]', user.twitter_url);
  } catch (error) {}

  //   section 3 the hard part ------------

  const customQuestions = await page.$$(
    ".application-question.custom-question"
  );

  for (let i = 0; i < customQuestions.length; i++) {
    const question = customQuestions[i];
    const radioInputs = await question.$$('input[type="radio"]');
    const textInput = await question.$('input[type="text"], textarea');

    if (radioInputs.length > 0) {
      // Select a radio button (assuming you want to select the first option)
      await radioInputs[0].click();
    }
    if (textInput) {
      // Fill in the text input field (you can replace 'Your answer' with your desired text)
      await textInput.type("Your answer");
    }
  }

  // --------- section 4 cover letter ---------

  await page.type(
    'textarea[name="comments"]',
    "submitted using a bot (bix.sh) hehe"
  );

  //   --- section 5 demographics (opttion so not done) -----

  //   ---- submit!!! + bypass hcaptcha ----

  //   await page.click("#btn-submit");

  //   console.log("clicked submit");

  //   await page.waitForTimeout(1000);

  //   console.log("waiting for captcha");

  //   const frame = page.mainFrame().childFrames()[1];

  //   const { captchas, filtered, solutions, solved, error } =
  //     await frame.solveRecaptchas();

  //   console.log(captchas, "c");

  //   console.log(solved);

  //   console.log("solved captchs");

  //   await page.waitForTimeout(2000);

  //   await page.screenshot({ path: "leverdoneenew.png", fullPage: true });
  //   await browser.close();
})();
