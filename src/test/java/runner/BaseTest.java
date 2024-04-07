package runner;

import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserContext;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Playwright;
import org.testng.ITestResult;
import org.testng.annotations.AfterClass;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.BeforeMethod;

import java.lang.reflect.Method;

public abstract class BaseTest {

    private Playwright playwright;
    private Browser browser;
    private BrowserContext context;
    private Page page;

    @BeforeClass
    protected void launchBrowser() {
        ProjectProperties.verifyPropertiesValues();
        try {
            playwright = Playwright.create();
            if (playwright == null) {
                System.out.println("Error occurred: Playwright is null");
                System.exit(1);
            }
            browser = BrowserManager.getBrowser(playwright);
        } catch (NullPointerException e) {
            e.printStackTrace();
            System.out.println("Error occurred: " + e.getMessage());
        }
    }

    @BeforeMethod
    protected void createContextAndPage(Method method, ITestResult testResult) {
        try {
            context = browser.newContext(PlaywrightOptions.contextOptions());
            context.tracing().start(PlaywrightOptions.tracingStartOptions());
            page = context.newPage();
            page.navigate("/");
        } catch (NullPointerException e) {
            e.printStackTrace();
            System.out.println("Error occurred: " + e.getMessage());
            System.exit(1);
        }
    }

    @AfterMethod(alwaysRun = true)
    protected void closeContext(Method method, ITestResult testResult) {
        try {
            page.close();
            context.close();
        } catch (NullPointerException e) {
            e.printStackTrace();
            System.out.println("Error occurred: " + e.getMessage());
            System.exit(1);
        }
    }

    @AfterClass(alwaysRun = true)
    protected void closeBrowser() {
        browser.close();
        playwright.close();
    }

    public Page getPage() {
        return page;
    }
}
