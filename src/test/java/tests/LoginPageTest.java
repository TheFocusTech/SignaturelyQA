package tests;

import org.testng.annotations.Test;
import pages.HomePage;
import pages.LoginPage;
import runner.BaseTest;
import runner.ProjectProperties;

import static com.microsoft.playwright.assertions.PlaywrightAssertions.assertThat;

public class LoginPageTest extends BaseTest {

    @Test
    public void testLogin() {

        HomePage homePage = new LoginPage(getPage())
                .fillUserEmailField(ProjectProperties.getPropertyValue("userEmail"))
                .fillUserPasswordField(ProjectProperties.getPropertyValue("userPassword"))
                .clickLoginButton();

        assertThat(homePage.getPage()).hasURL(ProjectProperties.getPropertyValue("baseURL") + "/sign");
        assertThat(homePage.getPage()).hasTitle("Signaturely");
    }
}