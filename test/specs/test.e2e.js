const { expect, browser, $ } = require('@wdio/globals');

describe('Google Cloud Navigation', () => {
  it('should open the website and use searchbar', async () => {
    await browser.url('https://cloud.google.com/');
    //Handling cookies
    await $('//*[@class="glue-cookie-notification-bar__accept"]').click();

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

    // await browser.pause(10000);
  });
  // Edit calculator
  it('Fill the form for pricing calculator', async () => {
    await browser.url(
      'https://cloud.google.com/products/calculator?hl=pl&dl=CiQ0MzcwM2M4YS0yYTlhLTQxZTEtYTAxOS1iOWUxODg5ZTkzZWUQCBokNDUxMUM3QTgtOURBQy00QjRCLTk0RTEtNDhFOUFDNEJBMDA5'
    );

    //Set Number of instances
    await $('#i6').setValue('4');

    //Edit Machine type to n1-standard-8 (vCPUs: 8, RAM: 30 GB)
    await $('#i30').scrollIntoView();
    await browser.execute(() => {
      window.scrollBy(0, -500);
    });
    await $('#i30').setValue('8');
    await $('#i31').setValue('30');

    //Select Add GPUs
    await $("//button[@aria-label='Add GPUs']//span[@class='eBlXUe-hywKDc']").scrollIntoView();
    await browser.execute(() => {
      window.scrollBy(0, -500);
    });
    await $("//button[@aria-label='Add GPUs']//span[@class='eBlXUe-hywKDc']").click();

    //GPU Model "NVIDIA Tesla V100"

    await $(
      '//span[text()="GPU Model"]/ancestor::div[contains(@class, "O1htCb-H9tDt PPUDSe t8xIwc")]'
    ).scrollIntoView();

    await browser.execute(() => {
      window.scrollBy(0, -500);
    });
    await $('//span[text()="GPU Model"]/ancestor::div[contains(@class, "O1htCb-H9tDt PPUDSe t8xIwc")]').click();
    await $('li[data-value="nvidia-tesla-v100"]').click();

    //Local SSD 2x325Gb
    await $(
      '//span[text()="Local SSD"]/ancestor::div[contains(@class, "O1htCb-H9tDt PPUDSe t8xIwc")]'
    ).scrollIntoView();

    await browser.execute(() => {
      window.scrollBy(0, -500);
    });
    await $('//span[text()="Local SSD"]/ancestor::div[contains(@class, "O1htCb-H9tDt PPUDSe t8xIwc")]').click();
    // NEED to select option 2x325
    await browser.pause(1000);
    await browser.keys('ArrowDown');
    await browser.pause(1000);
    await browser.keys('ArrowDown');
    await browser.pause(1000);
    await browser.keys('Enter');

    //Region Netherlands since Frankfurt is missing

    await $('//span[text()="Region"]/ancestor::div[contains(@class, "O1htCb-H9tDt PPUDSe t8xIwc")]').scrollIntoView();

    await browser.execute(() => {
      window.scrollBy(0, -500);
    });
    await $('//span[text()="Region"]/ancestor::div[contains(@class, "O1htCb-H9tDt PPUDSe t8xIwc")]').click();

    await $('li[data-value="europe-west4"]').click();

    //Commited use dicount options : 1 year
    await $('//input[@id="1-year"]/ancestor::div[contains(@class, "e2WL2b MYT3K pV2hx oLWDHd")]').click();

    // Check the price from calculator on bottom right ???

    //Click Shere
    await $('//span[text()="Region"]/ancestor::div[contains(@class, "O1htCb-H9tDt PPUDSe t8xIwc")]').scrollIntoView();

    await browser.execute(() => {
      window.scrollBy(500, -500);
    });
    //Delay for system to calculate correct $
    await new Promise((resolve) => setTimeout(resolve, 5000));

    await $('//span[@class="FOBRw-vQzf8d"]').click();

    //CLick open SUmmary
    await $('//*[@class="bwApif-cnG4Wd"]').waitForDisplayed({ timeout: 2000 });

    await $('//*[@class="tltOzc MExMre rP2xkc jl2ntd"]').click();
  });
  //Check if values from Point 6 are the same as on summary
  it('Should compare results', async () => {
    // //Instances check
    // const instances = await $('').getText();
    // expect(instances).toBe('4');
    // //Operating System check
    // const operatingSystem = await $('').getText();
    // expect(operatingSystem).toBe('Free: Debian, CentOS, CoreOS, Ubuntu or BYOL (Bring Your Own License)');
    // //Provisioning Model check
    // const provisioningModel = await $('').getText();
    // expect(provisioningModel).toBe('Regular');
    // //Machine type check
    // const machineType = await $('').getText();
    // expect(machineType).toBe('n1-standard-8');
    // //Add GPUs selected check
    // const numberGpu = await $('').getText();
    // expect(numberGpu).toBe('1');
    //GPU type/model check
    const bootDiskType = await $('//*[@id="yDmH0d"]/c-wiz[1]/div/div/div/div/div[2]/div[2]/div[1]/div[2]/div[4]/span[2]/span[1]/span[2]').getText();
    // const bootDiskType = await $('//span[text()="NVIDIA Tesla V100"]/ancestor::span[contains(@class, "FDSAhb")]').getText();
    expect(bootDiskType).toBe('NVIDIA Tesla V100');
    // //Local SSD check
    // const localSsd = await $('2x375 GB').getText();
    // expect(localSsd).toBe('4');
    // //Datacenter location check
    // const region = await $('').getText();
    // expect(region).toBe('Netherlands (europe-west4)');
    // //Commited usage check
    // const commitedUsage = await $('').getText();
    // expect(commitedUsage).toBe('1 year');
  });
});
