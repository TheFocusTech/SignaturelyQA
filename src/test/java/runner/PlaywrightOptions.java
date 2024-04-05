package runner;

import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserType;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Tracing;
import org.testng.ITestResult;

import java.io.IOException;
import java.lang.reflect.Method;
import java.nio.file.Files;
import java.nio.file.Paths;

public class PlaywrightOptions {

    private static final String runDir = BaseUtils.setNameFromDateAndTime();
    private static final String traceDir = "target/testTracing/";
    private static final String traceRunDir = traceDir + runDir + "/";
    private static final String videoDir = "target/video/";
    private static final String videoRunDir = videoDir + runDir + "/";

    public static BrowserType.LaunchOptions browserOptions() {
        return new BrowserType.LaunchOptions()
                .setHeadless(ProjectProperties.getHeadlessMode())
                .setSlowMo(ProjectProperties.getSlowMoMode());
    }

    public static Browser.NewContextOptions contextOptions() {
        return new Browser.NewContextOptions()
                .setScreenSize(ProjectProperties.getScreenSizeWidth(), ProjectProperties.getScreenSizeHeight())
                .setBaseURL(ProjectProperties.getBaseURL())
                .setRecordVideoDir(Paths.get(videoRunDir))
                .setRecordVideoSize(1280, 720);
    }

    public static Tracing.StartOptions tracingStartOptions() {
        return new Tracing.StartOptions()
                .setScreenshots(true)
                .setSnapshots(true)
                .setSources(true);
    }

    public static Tracing.StopOptions tracingStopOptions(Page page, Method method, ITestResult testResult) {
        Tracing.StopOptions tracingStopOptions = null;
        if (!testResult.isSuccess()) {
            if (ProjectProperties.getTracingMode()) {
                tracingStopOptions = new Tracing.StopOptions()
                        .setPath(Paths.get(traceRunDir + BaseUtils.getTestClassMethodNameWithInvocationCount(method, testResult) + ".zip"));
            }
            if (ProjectProperties.getVideoMode()) {
                page.video().saveAs(Paths.get(videoRunDir + BaseUtils.getTestClassMethodNameWithInvocationCount(method, testResult) + ".webm"));

                page.video().delete();
            }
        } else {
            page.video().delete();
            try {
                Files.deleteIfExists(Paths.get(videoRunDir));
                Files.deleteIfExists(Paths.get(videoDir));
            } catch (IOException e) {
                System.out.println("Error deleting video");
            }
        }
        return tracingStopOptions;
    }
}
