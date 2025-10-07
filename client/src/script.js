document.getElementById("portfolioForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const bio = document.getElementById("bio").value;
  const template = document.getElementById("template").value;

  const resultDiv = document.getElementById("result");

  // For now, just show a preview of entered data
  resultDiv.innerHTML = `
    <h2>Preview (${template})</h2>
    <div style="border:1px solid #ccc; padding:10px; border-radius:5px;">
      <h3>${name}</h3>
      <p>${bio}</p>
      <small>Template: ${template}</small>
    </div>
  `;
});