// @ts-check
const { defineConfig, devices } = require('@playwright/test');
const { testPlanFilter } = require('allure-playwright/testplan');
import * as os from 'os';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
    testDir: './tests',
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    // forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : 1,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    // reporter: 'html',
    grep: testPlanFilter(),
    reporter: [
        ['list'],
        ['html', { outputFolder: 'my-reportTest-Firefox' }],
        [
            'allure-playwright',
            {
                detail: false,
                suiteTitle: false,
                categories: [
                    {
                        name: 'Outdated tests',
                        messageRegex: '.*FileNotFound.*',
                    },
                ],
                environmentInfo: {
                    os_platform: os.platform(),
                    os_release: os.release(),
                    os_version: os.version(),
                    node_version: process.version,
                },
            },
        ],
    ],
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    timeout: 60000,
    use: {
        // permissions: ['clipboard-write', 'clipboard-read'],

        headless: process.env.CI ? true : false,

        /* Base URL to use in actions like `await page.goto('/')`. */
        baseURL: process.env.URL,

        screenshot: 'only-on-failure',
        video: {
            mode: 'retain-on-failure',
            size: process.env.CI ? { width: 800, height: 600 } : { width: 1440, height: 900 },
        },
    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },
    ],

    /* Run your local dev server before starting the tests */
    // webServer: {
    //   command: 'npm run start',
    //   url: 'http://127.0.0.1:3000',
    //   reuseExistingServer: !process.env.CI,
    // },
});
