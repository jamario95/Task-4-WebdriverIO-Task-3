const { expect, browser, $ } = require('@wdio/globals');

describe('Google Cloud Navigation', () => {
  it('should open the website and use searchbar', async () => {
    await browser.url('https://cloud.google.com/');
    //Handle cookies
    await $('//*[@class="glue-cookie-notification-bar__accept"]').click();
    //Search icon click
    await $('div.YSM5S').click();
    //Search word insert
    await $('div.YSM5S input').setValue('Google Cloud Platform Pricing Calculator');

    await browser.keys('Enter');
  });

  it('Should click the correct option from seach list', async () => {
    //Select 1st elemet from search
    await $('div:nth-child(1) > div > div.gsc-thumbnail-inside > div > a').click();
  });

  it('Create pricing calculator', async () => {
    //Click Add button
    await $('//span[text()="Add to estimate"]').click();
    //Wait for pop-up to open
    await $('div.bwApif-wzTsW > div > div').waitForDisplayed({ timeout: 2000 });
    //Select compute
    await $('//*[@class="honxjf"] [text()="Compute Engine"]').click();
    //Wait for full url
    await new Promise((resolve) => setTimeout(resolve, 2000));
  });

  // Edit calculator
  it('Fill the form for pricing calculator', async () => {
    //Insert the full url
    await browser.url(await browser.getUrl());
    //Set Number of instances
    await $('#i6').setValue('4');

    //Edit Machine type to n1-standard-8 (vCPUs: 8, RAM: 30 GB)
    await $('#i30').setValue('8');
    await $('#i31').setValue('30');

    //Select Add GPUs
    await $("//button[@aria-label='Add GPUs']//span[@class='eBlXUe-hywKDc']").click();

    //Select GPU Model "NVIDIA Tesla V100"
    await $('//span[text()="GPU Model"]/ancestor::div[contains(@class, "O1htCb-H9tDt PPUDSe t8xIwc")]').click();
    await $('li[data-value="nvidia-tesla-v100"]').click();

    //Select Local SSD 2x325Gb
    await $('//span[text()="Local SSD"]/ancestor::div[contains(@class, "O1htCb-H9tDt PPUDSe t8xIwc")]').click();
    await $$('li[data-value="2"]')[1].click();

    //Select Region Netherlands since Frankfurt is missing
    await $('//span[text()="Region"]/ancestor::div[contains(@class, "O1htCb-H9tDt PPUDSe t8xIwc")]').click();
    await $('li[data-value="europe-west4"]').click();

    //Commited use dicount options : 1 year
    await $('//input[@id="1-year"]/ancestor::div[contains(@class, "e2WL2b MYT3K pV2hx oLWDHd")]').click();

    // Check the price from calculator on bottom right ???

    //Delay for system to calculate correct $
    await new Promise((resolve) => setTimeout(resolve, 2000));

    //Click Shere
    await $('//span[@class="FOBRw-vQzf8d"]').click();

    //Wait for Shere window to appear
    await $('//*[@class="bwApif-cnG4Wd"]').waitForDisplayed({ timeout: 2000 });
  });

  //Check if values from Point 6 are the same as on summary
  it('Should compare results', async () => {
    //Get href for Summary
    const summaryHref = await $('//*[@class="tltOzc MExMre rP2xkc jl2ntd"]').getAttribute('href');

    //Go to summary page
    await browser.url('https://cloud.google.com' + summaryHref);

    //Instances check
    const instances = await $('//span[text()="Number of Instances"]/following-sibling::span[1]').getText();
    expect(instances).toHaveText('4');

    //Operating System check
    const operatingSystem = await $(
      '//span[text()="Operating System / Software"]/following-sibling::span[1]'
    ).getText();
    expect(operatingSystem).toHaveText('Free: Debian, CentOS, CoreOS, Ubuntu or BYOL (Bring Your Own License)');

    //Provisioning Model check
    const provisioningModel = await $('//span[text()="Provisioning Model"]/following-sibling::span[1]').getText();
    expect(provisioningModel).toHaveText('Regular');

    //Machine type check
    const machineType = await $('//span[text()="Machine type"]/following-sibling::span[1]').getText();
    expect(machineType).toHaveText('n1-standard-8');

    //Add GPUs selected check
    const numberGpu = await $('//span[text()="Number of GPUs"]/following-sibling::span[1]').getText();
    expect(numberGpu).toHaveText('1');

    // GPU type/model check
    const bootDiskType = await $('//span[text()="GPU Model"]/following-sibling::span[1]').getText();
    expect(bootDiskType).toHaveText('NVIDIA Tesla V100');

    //Local SSD check
    const localSsd = await $('//span[text()="Local SSD"]/following-sibling::span[1]').getText();
    expect(localSsd).toHaveText('2x375 GB');

    // //Datacenter location check
    const region = await $('//span[text()="Region"]/following-sibling::span[1]').getText();
    expect(region).toHaveText('Netherlands (europe-west4)');

    //Commited usage check
    const commitedUsage = await $(
      '//span[text()="Committed use discount options"]/following-sibling::span[1]'
    ).getText();
    expect(commitedUsage).toHaveText('1 year');
  });
});
