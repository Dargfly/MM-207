"use strict"
if("serviceWorker" in navigator) {
  navigator.serviceWorker.register("../sw.js")
}

import appController from '../controller/controller.mjs';  // Importer AppController
appController.showView("home");  // For eksempel, vise home view