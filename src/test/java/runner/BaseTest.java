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
import pages.LoginPage;

import java.lang.reflect.Method;

public abstract class BaseTest {

    private Playwright playwright;
    private Browser browser;
    private BrowserContext context;
    private Page page;

    @BeforeClass
    protected void launchBrowser() {
        playwright = Playwright.create();
        browser = BrowserManager.getBrowser(playwright);
    }

    @BeforeMethod
    protected void createContextAndPage(Method method, ITestResult testResult) {
        context = browser.newContext(Options.contextOptions());
        context.tracing().start(Options.tracingStartOptions());
        page = context.newPage();
        page.navigate("/");

    }

    @AfterMethod(alwaysRun = true)
    protected void closeContext(Method method, ITestResult testResult) {
        page.close();
        context.tracing().stop(Options.tracingStopOptions(page, method, testResult));
        context.close();
    }

    @AfterClass(alwaysRun = true)
    protected void closeBrowser() {
        browser.close();
        playwright.close();
    }

    public LoginPage openLoginPage() {
        return new LoginPage(page);
    }
}
