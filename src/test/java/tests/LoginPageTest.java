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
                .fillUserEmailField(ProjectProperties.getUserEmail())
                .fillUserPasswordField(ProjectProperties.getUserPassword())
                .clickLoginButton();

        assertThat(homePage.getPage()).hasURL(ProjectProperties.getBaseURL() + "/sign");
        assertThat(homePage.getPage()).hasTitle("Signaturely");
    }
}
