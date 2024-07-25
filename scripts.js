function handleLoader() {
  function addLoader(target) {
    target.insertAdjacentHTML(
      "afterend",
      '<div id="loader" class="loader"></div>'
    );
  }

  function removeLoader() {
    const loader = document.getElementById("loader");
    loader.remove();
  }

  return { addLoader, removeLoader };
}

function updateResponseContent(target, content) {
  target.parentElement.parentElement.childNodes[3].childNodes[3].textContent =
    JSON.stringify(content, undefined, 2);
}

async function makeRequest(url, target) {
  const { addLoader, removeLoader } = handleLoader();

  addLoader(target);

  const headers = {
    method: "GET",
    mode: "cors",
  };

  const baseUrl = "http://localhost:3001";

  const response = await fetch(`${baseUrl}/${url}`, headers);
  const content = await response.json();

  updateResponseContent(target, content);

  removeLoader();
}

const getNormalButton = document.getElementById("exemplo-get-normal");
const getNoContentButton = document.getElementById("exemplo-no-content");
const getNaoProcessadoButton = document.getElementById(
  "exemplo-nao-processado"
);
const getErroButton = document.getElementById("exemplo-erro");
const loaderIcon = document.getElementById("loader");

getNormalButton.addEventListener("click", () =>
  makeRequest("exemplo-get-normal", getNormalButton)
);
getNoContentButton.addEventListener("click", () =>
  makeRequest("exemplo-no-content", getNoContentButton)
);
getNaoProcessadoButton.addEventListener("click", () =>
  makeRequest("exemplo-nao-processado", getNaoProcessadoButton)
);
getErroButton.addEventListener("click", () =>
  makeRequest("exemplo-erro", getErroButton)
);
