package runner;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

public class ProjectProperties {

    private static final String ENV_ACCESS_OPTIONS = "ACCESS_OPTIONS";
    private static final String ENV_BROWSER_OPTIONS = "BROWSER_OPTIONS";
    private static Properties properties;

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
    private static String baseURL;
    private static String userEmail;
    private static String userPassword;
    private static String browserType;
    private static boolean headlessMode;
    private static double slowMoMode;
    private static int screenSizeWidth;
    private static int screenSizeHeight;
    private static boolean tracingMode;
    private static boolean videoMode;

    public static String getRunProperty(String propertyName) {
        if (properties.getProperty(propertyName) != null && !properties.getProperty(propertyName).isEmpty()) {
            return properties.getProperty(propertyName);
        } else {
            System.out.println("ERROR OCCURRED: \"" + propertyName + "\" property value is empty or does not exist.");
            System.exit(1);
            return null;
        }
    }
    public static void parseProperties() {
        try {
        baseURL = getRunProperty("baseURL");
        userEmail = getRunProperty("userEmail");
        userPassword = getRunProperty("userPassword");
        browserType = getRunProperty("browserType");
        headlessMode = Boolean.parseBoolean(getRunProperty("headlessMode"));
        slowMoMode = Double.parseDouble(getRunProperty("slowMoMode"));
        screenSizeWidth = Integer.parseInt(getRunProperty("screenSizeWidth"));
        screenSizeHeight = Integer.parseInt(getRunProperty("screenSizeHeight"));
        tracingMode = Boolean.parseBoolean(getRunProperty("tracingMode"));
        videoMode = Boolean.parseBoolean(getRunProperty("videoMode"));
        } catch (Exception e) {
            System.out.println("ERROR: " + e.getMessage());
        }
    }

    static {
        initProperties();
        parseProperties();
    }

//    public static <T> T getRunProperty(String propertyName) {
//        try {
//            Field field = ProjectProperties.class.getDeclaredField(propertyName);
//            field.setAccessible(true);
//            Object value = field.get(null); // null, так как поле статическое
//            if (value != null) {
//                return (T) value;
//            } else {
//                System.out.println("ERROR: Property value for \"" + propertyName + "\" is null.");
//                return null;
//            }
//        } catch (NoSuchFieldException | IllegalAccessException e) {
//            System.out.println("ERROR: " + e.getMessage());
//            return null;
//        }
//    }

    public static String getBaseURL() {
        return baseURL;
    }

    public static String getUserEmail() {
        return userEmail;
    }

    public static String getUserPassword() {
        return userPassword;
    }

    public static String getBrowserType() {
        return browserType;
    }

    public static boolean getHeadlessMode() {
        return headlessMode;
    }

    public static double getSlowMoMode() {
        return slowMoMode;
    }

    public static int getScreenSizeWidth() {
        return screenSizeWidth;
    }

    public static int getScreenSizeHeight() {
        return screenSizeHeight;
    }

    public static boolean getTracingMode() {
        return tracingMode;
    }

    public static boolean getVideoMode() {
        return videoMode;
    }

    static boolean isServerRun() {
        return System.getenv("CI_RUN") != null;
    }
}
