const user = require("./user.js");
const puppeteer = require("puppeteer");

console.log(user);

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(
    "https://boards.greenhouse.io/galaxydigitalservices/jobs/5009582004"
  );
  const firstName = await page.$("#first_name");
  await firstName.type(user.first_name);

  const lastName = await page.$("#last_name");
  await lastName.type(user.last_name);

  const email = await page.$("#email");
  await email.type(user.email);

  const phone = await page.$("#phone");
  await phone.type(user.phone);

  const attachButton = await page.$('[data-source="attach"]');
  await attachButton.click();

  const [fileChooser] = await Promise.all([
    page.waitForFileChooser(),
    attachButton.click(),
  ]);

  // Provide the file path to the file input dialog
  await fileChooser.accept(["./josh_mayer_815.pdf"]); // Replace with the actual file path

  // Use page.evaluate to interact with the select2 dropdown
  await page.click("#s2id_education_school_name_0");

  // Wait for the dropdown options to load (adjust the wait time as needed)
  await page.waitForTimeout(1000);

  await page.type("#s2id_autogen3_search", user.school); // Replace 'Your Dummy Value' with the text you want to type
  await page.waitForTimeout(1000);

  // Click on the option you want to select (you may need to inspect the HTML of the dropdown to determine the selector)
  await page.click(
    ".select2-results-dept-0.select2-result.select2-result-selectable.select2-highlighted"
  );

  // Close the dropdown (optional)
  await page.click("body"); // Click on the body or another element to close the dropdown

  await page.click("#s2id_education_degree_0");

  // Wait for the dropdown options to load (adjust the wait time as needed)
  await page.waitForTimeout(1000);

  await page.type("#s2id_autogen4_search", user.degree); // Replace 'Your Degree Value' with the text you want to type
  await page.waitForTimeout(1000);

  // Click on the option you want to select (you may need to inspect the HTML of the dropdown to determine the selector)
  await page.click(
    ".select2-results-dept-0.select2-result.select2-result-selectable.select2-highlighted"
  );

  // Close the dropdown (optional)
  await page.click("body"); // Click on the body or another element to close the dropdown

  await page.click("#s2id_education_discipline_0");

  // Wait for the dropdown options to load (adjust the wait time as needed)
  await page.waitForTimeout(1000);

  await page.type("#s2id_autogen5_search", user.major); // Replace 'Your Discipline Value' with the text you want to type
  await page.waitForTimeout(1000);

  // Click on the option you want to select (you may need to inspect the HTML of the dropdown to determine the selector)
  await page.click(
    ".select2-results-dept-0.select2-result.select2-result-selectable.select2-highlighted"
  );

  // Close the dropdown (optional)
  await page.click("body"); // Click on the body or another element to close the dropdown

  await page.type(".start-date-month", user.start_month); // Replace 'MM' with the desired month
  await page.type(".start-date-year", user.start_year); // Replace 'YYYY' with the desired year

  await page.type(".end-date-month", user.end_month); // Replace 'MM' with the desired month
  await page.type(".end-date-year", user.end_year); // Replace 'YYYY' with the desired year

  await page.type(
    "#job_application_answers_attributes_4_text_value",
    "submitted using a bot (bix.sh) hehe"
  ); // Replace 'Your Input Value' with the text you want to enter

  await page.select("#job_application_answers_attributes_5_boolean_value", "0");

  await page.select("#job_application_answers_attributes_6_boolean_value", "0");

  await page.click("#submit_app");

  await page.waitForTimeout(5000);

  // After selecting an option, you can close the dropdown (if necessary).
  await page.screenshot({ path: "fullpage.png", fullPage: true }); // Specify the path and filename for the screenshot

  await browser.close();
})();
