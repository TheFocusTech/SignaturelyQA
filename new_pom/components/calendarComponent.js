import {step} from "allure-js-commons";

export default class CalendarComponent {
    constructor(page) {
        this.page = page;

        this.selectDateContainer = this.page.locator('[class="DayPickerContainer__icon"]');
        this.customDateInCalendar = this.page.locator('[class="DayPicker__custom-day"]');
        this.calendarMonthAndYear = this.page.locator('[class="DayPicker__nav-title"]');
        this.datePickerNavigationLeft = this.page.locator('[class="DayPicker__nav"]');
        this.selectBtn = this.page.getByRole('button', {name: "Select"});
    }

    async clickSelectDate() {
        await step('Click "Select date" dropdown in the calendar', async () => {
            await this.selectDateContainer.click();
        });
    }

    async pickExpirationDateInCalendar() {
        await step('Select expiration date in the calendar', async () => {
            let date = new Date();
            date.setDate(date.getDate() + 1);
            const expectedDate = date.getDate().toString();
            const expectedMonthLong = date.toLocaleString('En-US', {month: "long"});
            const expectedYear = date.getFullYear().toString();

            let calendarMonthAndYear = await this.calendarMonthAndYear.textContent();
            const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`;
            while (!calendarMonthAndYear.includes(expectedMonthAndYear)) {
                await this.datePickerNavigationLeft.click();
                calendarMonthAndYear = await this.calendarMonthAndYear.textContent();
            }
            await this.customDateInCalendar.getByText(expectedDate, {exact: true}).click();
        });
    }

    async clickSelectBtn() {
        await step('Click "Select" button in the calendar', async () => {
            await this.selectBtn.click();
        });
    }
}