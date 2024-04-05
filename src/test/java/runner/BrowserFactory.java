package runner;

import com.microsoft.playwright.Browser;
import com.microsoft.playwright.Playwright;

public enum BrowserFactory {

    CHROMIUM {
        @Override
        public Browser createInstance(Playwright playwright) {
            return playwright.chromium().launch(PlaywrightOptions.browserOptions());
        }
    },

    FIREFOX {
        @Override
        public Browser createInstance(Playwright playwright) {
            return playwright.firefox().launch(PlaywrightOptions.browserOptions());
        }
    },

    WEBKIT {
        @Override
        public Browser createInstance(Playwright playwright) {
            return playwright.webkit().launch(PlaywrightOptions.browserOptions());
        }
    };

    public abstract Browser createInstance(Playwright playwright);
}
