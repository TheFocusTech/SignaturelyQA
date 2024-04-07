package runner;

import com.microsoft.playwright.Browser;
import com.microsoft.playwright.Playwright;

public class BrowserManager {

    public static Browser getBrowser(Playwright playwright) {
        Browser browser = null;
        try {
            browser = BrowserFactory.valueOf(ProjectProperties.getPropertyValue("browserType").toUpperCase())
                    .createInstance(playwright);
        } catch (Exception e) {
            System.out.println(e.getMessage() + "\nVerify, that the browserType value in the browser.properties file is correct.");
        }
        return browser;
    }
}
