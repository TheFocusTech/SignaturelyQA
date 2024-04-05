package runner;

import com.microsoft.playwright.Browser;
import com.microsoft.playwright.Playwright;

public class BrowserManager {

    public static Browser getBrowser(Playwright playwright) {
        return BrowserFactory.valueOf(ProjectProperties.BROWSER_TYPE.toUpperCase())
                .createInstance(playwright);
    }
}
