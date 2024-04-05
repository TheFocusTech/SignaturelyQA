package runner;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

public class ProjectProperties {

    private static final String ENV_ACCESS_OPTIONS = "ACCESS_OPTIONS";
    private static final String ENV_BROWSER_OPTIONS = "BROWSER_OPTIONS";

    private static Properties properties;

    static {
        initProperties();
    }

    private static void initProperties() {
        properties = new Properties();
        if (isServerRun()) {
            if (System.getenv(ENV_ACCESS_OPTIONS) != null) {
                for (String option : System.getenv(ENV_ACCESS_OPTIONS).split(";\n")) {
                    String[] webOptionArr = option.split("=");
                    properties.setProperty(webOptionArr[0], webOptionArr[1]);
                }
            }
            if (System.getenv(ENV_BROWSER_OPTIONS) != null) {
                for (String option : System.getenv(ENV_BROWSER_OPTIONS).split(";\n")) {
                    String[] browserOptionArr = option.split("=");
                    properties.setProperty(browserOptionArr[0], browserOptionArr[1]);
                }
            }
        } else {
            String[] fileNames = {"browser.properties", "access.properties"};

            for (String fileName : fileNames) {
                try {
                    FileInputStream fileInputStream = new FileInputStream("./src/test/resources/" + fileName);
                    properties.load(fileInputStream);
                } catch (IOException e) {
                    System.out.println("ERROR: The \u001B[31m" + fileName + "\u001B[0m file not found.");
                    System.out.println("You need to create it from " + fileName + ".TEMPLATE file.");
                    System.exit(1);
                }
            }
        }
    }

    public static String getBaseURL() {
        return properties.getProperty("baseURL").trim();
    }

    public static String getUserEmail() {
        return properties.getProperty("userEmail").trim();
    }

    public static String getUserPassword() {
        return properties.getProperty("userPassword").trim();
    }

    public static String getBrowserType() {
        return properties.getProperty("browserType").trim();
    }

    public static boolean getHeadlessMode() {
        return Boolean.parseBoolean(properties.getProperty("headlessMode").trim());
    }

    public static double getSlowMoMode() {
        return Double.parseDouble(properties.getProperty("slowMoMode").trim());
    }

    public static int getScreenSizeWidth() {
        return Integer.parseInt(properties.getProperty("screenSizeWidth").trim());
    }

    public static int getScreenSizeHeight() {
        return Integer.parseInt(properties.getProperty("screenSizeHeight").trim());
    }

    public static boolean getTracingMode() {
        return Boolean.parseBoolean(properties.getProperty("tracingMode").trim());
    }

    public static boolean getVideoMode() {
        return Boolean.parseBoolean(properties.getProperty("videoMode").trim());
    }

    static boolean isServerRun() {
        return System.getenv("CI_RUN") != null;
    }
}
