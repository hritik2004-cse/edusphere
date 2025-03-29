async function summarizeText() {
  const text = document.getElementById("inputText").value;
  const apiKey = "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";
  const apiUrl = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn";

  const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: text })
  });

  const data = await response.json();
  document.getElementById("summary").innerText = data[0]?.summary_text || "Error: Could not summarize.";
}