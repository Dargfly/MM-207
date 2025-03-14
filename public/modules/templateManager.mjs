const TemplateManager = {};

TemplateManager.fetchTemplate = async (path) => {
  let rawTemplate = await (await fetch(path)).text();

  let div = document.createElement("div");
  div.innerHTML = rawTemplate;

  let template = div.querySelector("template"); // Sikrer at vi finner <template>
  if (!template) throw new Error(`Template not found in ${path}`);

  return template;
};

TemplateManager.cloneTemplate = (template, target, data = {}) => {
  // Save the dialog element if it exists
  const existingDialog = document.getElementById("dialog");

  const clone = template.content.cloneNode(true);
  let wrapper = document.createElement("div");
  wrapper.appendChild(clone);

  let html = wrapper.innerHTML;
  wrapper.innerHTML = html;
  target.appendChild(wrapper);

  // If there was a dialog and the new template doesn't have one, add it back
  if (existingDialog && !document.getElementById("dialog")) {
    document.body.appendChild(existingDialog);
  }

  return wrapper;
};

// Helper function to ensure dialog exists in the DOM
TemplateManager.ensureDialogExists = () => {
  let dialog = document.getElementById("dialog");
  
  if (!dialog) {
    dialog = document.createElement("dialog");
    dialog.id = "dialog";
    
    const titleEl = document.createElement("h2");
    titleEl.id = "titleDialog";
    
    const textEl = document.createElement("p");
    textEl.id = "textDialog";
    
    const closeBtn = document.createElement("button");
    closeBtn.id = "btnCloseDialog";
    closeBtn.textContent = "OK";
    
    closeBtn.addEventListener("click", () => {
      dialog.close();
    });
    
    dialog.appendChild(titleEl);
    dialog.appendChild(textEl);
    dialog.appendChild(closeBtn);
    
    document.body.appendChild(dialog);
  }
  
  return dialog;
};

export default TemplateManager;
