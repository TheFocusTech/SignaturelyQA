package runner;

import com.microsoft.playwright.Browser;
import com.microsoft.playwright.Playwright;

public class BrowserManager {

    public static Browser getBrowser(Playwright playwright) {
        try {
            return BrowserFactory.valueOf(ProjectProperties.getBrowserType().toUpperCase())
                    .createInstance(playwright);
        } catch (Exception e) {
            System.out.println("Error occurred: " + e.getMessage() + "\nVerify, that the browserType value in the browser.properties file is correct.");
            return null;
        }
    }
}
