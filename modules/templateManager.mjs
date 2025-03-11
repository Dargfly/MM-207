const TemplateManager = {};

TemplateManager.fetchTemplate = async (path) => {

  //laster inn extern template
  let rawTemplate = await (await fetch(path)).text();
  //Et hack for å gjøre det enklere å laste ned emplates dynamisk .
  let div = document.createElement("div");
  div.innerHTML = rawTemplate;
  let template = div.firstChild;
  return template
}


TemplateManager.cloneTemplate = (template, target)

export default TemplateManager