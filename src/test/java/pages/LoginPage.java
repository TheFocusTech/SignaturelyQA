package pages;

import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;

public class LoginPage extends BasePage {

    private final Locator userEmailField = placeholder("username@gmail.com");
    private final Locator userPasswordField = placeholder("Your password");
    private final Locator loginButton = button("Login");

    public LoginPage(Page page) {
        super(page);
    }

    public LoginPage fillUserEmailField(String userEmail) {
        userEmailField.fill(userEmail);
        return new LoginPage(getPage());
    }

    public LoginPage fillUserPasswordField(String userPassword) {
        userPasswordField.fill(userPassword);
        return new LoginPage(getPage());
    }

    public HomePage clickLoginButton() {
        loginButton.click();
        return new HomePage(getPage());
    }
}
