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
  const clone = template.content.cloneNode(true);
  let wrapper = document.createElement("div");
  wrapper.appendChild(clone);

  let html = wrapper.innerHTML;
  wrapper.innerHTML = html;
  target.appendChild(wrapper);
  
  return wrapper;
};

export default TemplateManager;
