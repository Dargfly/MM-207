import { loadHomeView } from './homeView.mjs';
import { loadRecipeView } from './recipeView.mjs';
import { loadEditView } from './editView.mjs';
import { loadAddView } from './addView.mjs';

class AppController {
  constructor() {
    this.views = {};
  }

  addView(viewName, viewFunction) {
    this.views[viewName] = viewFunction;
  }

  async showView(viewName, id = null) {
    const viewFunction = this.views[viewName];
    if (viewFunction) {
      document.body.innerHTML = '';
      await viewFunction(id);
    } else {
      console.error(`View ${viewName} not found`);
    }
  }
}

export const appController = new AppController();

appController.addView("home", loadHomeView);
appController.addView("recipe", loadRecipeView);
appController.addView("edit", loadEditView);
appController.addView("add", loadAddView);

export default appController;
