import TemplateManager from "../modules/templateManager.mjs";
const templateFile = "loginView.html";

const template = template.fetchTemplate(templateFile);

const loginView = TemplateManager.cloneTemplate(template, document.body)

loginView.getElementById("button", onclick = (evt) => {
  console.log("YESsssssssssssss");
  
})

loginViewController = {
  view:loginView
}

export default loginViewController