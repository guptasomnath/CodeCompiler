const compilingText = document.getElementById("compiling-text");
const resultDiv = document.getElementById("result-div");

const runCode = async () => {
  const userCode = document.querySelector("textarea").value;
  const pLanguage = document.querySelector("select");

  const response = await fetch("/compile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code: userCode, type :  pLanguage.value}),
  });

  compilingText.style.display = "none";

  resultDiv.style.display = "block";

  const isJsonResponse =
    response.headers.has("Content-Type") &&
    response.headers.get("Content-Type").includes("application/json");

  if (!response.ok) {
    if (isJsonResponse) {
      const result = await response.json();
      resultDiv.innerText = result.message;
      return;
    }

    const result = await response.text();
    resultDiv.innerText = result;
    return;
  }

  resultDiv.innerText = await response.text();
};

document.querySelector("button").addEventListener("click", (ev) => {
  ev.preventDefault();
  compilingText.style.display = "block";
  resultDiv.style.display = "none";
  runCode();
});
