package tests;

import org.testng.annotations.Test;
import pages.HomePage;
import runner.BaseTest;
import runner.ProjectProperties;

import static com.microsoft.playwright.assertions.PlaywrightAssertions.assertThat;

public class LoginPageTest extends BaseTest {

    @Test
    public void testLogin() {

        HomePage homePage = openLoginPage()
                .fillUserEmailField(ProjectProperties.USER_EMAIL)
                .fillUserPasswordField(ProjectProperties.USER_PASSWORD)
                .clickLoginButton();

        assertThat(homePage.getPage()).hasURL(ProjectProperties.BASE_URL + "/sign");
        assertThat(homePage.getPage()).hasTitle("Signaturely");
    }
}
