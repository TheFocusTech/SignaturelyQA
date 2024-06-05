/**
 * Функция кликает на случайную позицию внутри элемента canvas, исключая указанные области.
 * @param {Page} page - Экземпляр страницы Playwright.
 * @param {Locator} canvasLocator - Локатор элемента canvas.
 * @param {Array} excludedAreas - Массив областей для исключения клика [{left, top, width, height}, ...].
 * @returns {Object} - Позиция клика {x, y}.
 */
export async function clickCanvas(page, canvasLocator, excludedAreas = []) {
  const canvas = await canvasLocator;
  const boundingBox = await canvas.boundingBox();

  const elementAfterClick = await page.locator('.fieldDropDown').nth(excludedAreas.length + 1);
  
  if (await elementAfterClick.boundingBox()) { 
    const elementBoundingRect = await elementAfterClick.boundingBox();
    const newExcludedArea = {
      left: elementBoundingRect.x - boundingBox.x,
      top: elementBoundingRect.y - boundingBox.y,
      width: elementBoundingRect.width,
      height: elementBoundingRect.height
    };
    excludedAreas.push(newExcludedArea);
  }

  /**
   * Генерирует случайную позицию, избегая указанных областей.
   * @param {Object} boundingBox - Координаты и размеры canvas.
   * @param {Array} excludedAreas - Массив областей для исключения.
   * @returns {Object} - Случайная позиция {x, y}.
   */

  const getRandomPosition = (boundingBox, excludedAreas) => {
    let randomX, randomY;

    do {
      randomX = boundingBox.x + Math.random() * boundingBox.width;
      randomY = boundingBox.y + Math.random() * boundingBox.height;
    } while (
      excludedAreas.some(area => 
        randomX >= area.left && randomX <= area.left + area.width &&
        randomY >= area.top && randomY <= area.top + area.height
      )
    );

    return { x: randomX, y: randomY };
  };

  const clickPosition = getRandomPosition(boundingBox, excludedAreas);

  await canvas.click({
    position: { x: clickPosition.x - boundingBox.x, y: clickPosition.y - boundingBox.y },
    force: true
  });

  return clickPosition;
}
