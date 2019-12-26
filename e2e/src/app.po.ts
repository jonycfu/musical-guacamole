import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getMenuTextList(idx) {
    const menuList = by.css('app-list li');
    return element
      .all(menuList)
      .get(idx)
      .getText() as Promise<string>;
  }
}
