document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("summarize-btn").addEventListener("click", summarizeText);
});

async function summarizeText() {
  const inputElement = document.getElementById("text-input");

  if (!inputElement) {
    console.error("Element with id 'text-input' not found!");
    return;
  }

  const inputText = inputElement.value.trim();

  if (!inputText) {
    alert("Please enter text to summarize!");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/summarizer/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: inputText }),
    });

    if (!response.ok) {
      throw new Error("Failed to summarize text");
    }

    const data = await response.json();
    document.getElementById("summary-output").innerText = data.summary;

  } catch (error) {
    console.error("Error:", error);
    alert("Error summarizing text. Check console for details.");
  }
}


  
  // Copy function
  function copyText() {
    const outputText = document.getElementById("output").innerText;
    navigator.clipboard.writeText(outputText).then(() => {
      alert("Text copied to clipboard!");
    });
  }
  
  // Text-to-Speech function
  function speakText() {
    const text = document.getElementById("output").innerText;
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
  }
  