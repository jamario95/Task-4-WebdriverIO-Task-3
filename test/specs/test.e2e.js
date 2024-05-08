const { expect, browser, $ } = require('@wdio/globals');

describe('Google Cloud Navigation', () => {
  it('should open the website and use searchbar', async () => {
    await browser.url('https://cloud.google.com/');

    await $('//*[@id="kO001e"]/div[2]/div[1]/div/div[2]/div[2]/div[1]/form/div').click();

    await $('//*[@id="kO001e"]/div[2]/div[1]/div/div[2]/div[2]/div[1]/form/div/input').setValue(
      'Google Cloud Platform Pricing Calculator'
    );

    await browser.keys('Enter');

    // await browser.pause(2000);
  });

  it('Should click the correct option from seach list', async () => {
    await $(
      '#___gcse_0 > div > div > div > div.gsc-wrapper > div.gsc-resultsbox-visible > div > div > div.gsc-expansionArea > div:nth-child(1) > div > div.gsc-thumbnail-inside > div > a'
    ).click();

    // await browser.pause(2000);
  });

  it('Create pricing calculator', async () => {
    await $('//span[text()="Add to estimate"]').click();

    await $(
      '#yDmH0d > div.bwApif-Sx9Kwc.bwApif-Sx9Kwc-OWXEXe-vOE8Lb.bwApif-Sx9Kwc-OWXEXe-di8rgd-bN97Pc-QFlW2.mDH3Wc.bwApif-Sx9Kwc-OWXEXe-FNFY6c > div.bwApif-wzTsW > div > div'
    ).waitForDisplayed({ timeout: 2000 });

    await $('//*[@class="honxjf"] [text()= "Compute Engine"]').click();

    // await browser.pause(3000);
  });

});
