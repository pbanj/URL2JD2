document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("save").onclick = save;

  document.getElementById("jd2_api_url").value = window.localStorage.getItem("jd2_api_url") ?? 'http://changeme:9666/flashgot?';
  document.getElementById("jd2_referer").value = window.localStorage.getItem("jd2_referer") ?? 'changeme';
})

function save() {
  window.localStorage.setItem("jd2_api_url", document.getElementById("jd2_api_url").value);
  window.localStorage.setItem("jd2_referer", document.getElementById("jd2_referer").value);

  browser.runtime.sendMessage({message: "refresh"})
}