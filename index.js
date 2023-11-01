const user = require("./user.js");
const puppeteer = require("puppeteer");

console.log(user);

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://boards.greenhouse.io/virtu/jobs/5827302002");
  const firstName = await page.$("#first_name");
  await firstName.type(user.first_name);

  const lastName = await page.$("#last_name");
  await lastName.type(user.last_name);

  const email = await page.$("#email");
  await email.type(user.email);

  const phone = await page.$("#phone");
  await phone.type(user.phone);

  //   const attachButton = await page.$('[data-source="attach"]');
  //   await attachButton.click();

  //   const [fileChooser] = await Promise.all([
  //     page.waitForFileChooser(),
  //     attachButton.click(),
  //   ]);

  //   await fileChooser.accept(["./josh_mayer_815.pdf"]);

  try {
    await page.click("#s2id_education_school_name_0");

    await page.waitForTimeout(1000);

    await page.type("#s2id_autogen3_search", user.school);
    await page.waitForTimeout(1000);

    await page.click(
      ".select2-results-dept-0.select2-result.select2-result-selectable.select2-highlighted"
    );

    await page.click("body");
  } catch {
    console.log("skipped");
  }

  try {
    await page.click("#s2id_education_degree_0");

    await page.waitForTimeout(1000);

    await page.type("#s2id_autogen4_search", user.degree);
    await page.waitForTimeout(1000);

    await page.click(
      ".select2-results-dept-0.select2-result.select2-result-selectable.select2-highlighted"
    );

    await page.click("body");
  } catch (error) {}

  try {
    await page.click("#s2id_education_discipline_0");

    await page.waitForTimeout(1000);

    await page.type("#s2id_autogen5_search", user.major);
    await page.waitForTimeout(1000);

    await page.click(
      ".select2-results-dept-0.select2-result.select2-result-selectable.select2-highlighted"
    );

    await page.click("body");
  } catch (error) {}

  try {
    await page.type(".start-date-month", user.start_month);
  } catch (error) {}

  try {
    await page.type(".start-date-year", user.start_year);
  } catch (error) {}

  try {
    await page.type(".end-date-month", user.end_month);
  } catch (error) {}

  try {
    await page.type(".end-date-year", user.end_year);
  } catch (error) {}

  try {
    await page.type(
      "#job_application_answers_attributes_4_text_value",
      "submitted using a bot (bix.sh) hehe"
    ); // Replace 'Your Input Value' with the text you want to enter
  } catch (error) {}

  try {
    await page.select(
      "#job_application_answers_attributes_5_boolean_value",
      "0"
    );
  } catch (error) {}

  try {
    await page.select(
      "#job_application_answers_attributes_6_boolean_value",
      "0"
    );
  } catch (error) {}

  //   await page.click("#submit_app");

  await page.waitForTimeout(5000);

  await page.screenshot({ path: "fullpage.png", fullPage: true });

  await browser.close();
})();
