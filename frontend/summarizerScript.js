async function summarizeText() {
    const inputText = document.getElementById("inputText").value;
    if (!inputText) {
        alert("Please enter some text.");
        return;
    }

    const apiKey = "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"; // Replace with your actual API key
    const apiUrl = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn";

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ inputs: inputText })
        });

        const result = await response.json();
        console.log(result);
        
        if (result.error) {
            document.getElementById("output").innerText = "Error: " + result.error;
        } else {
            document.getElementById("output").innerText = result[0].summary_text;
        }
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("output").innerText = "Failed to fetch data.";
    }
}

function copyText() {
    const text = document.getElementById("output").innerText;
    if (!text) {
        alert("No summarized text to copy!");
        return;
    }
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
}

function speakText() {
    const text = document.getElementById("output").innerText;
    if (!text) {
        alert("No summarized text to speak!");
        return;
    }
    const speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
}