chrome.storage.local.get("videoDetails", (data) => {
  if (data.videoDetails) {
    updateUI(data.videoDetails);
  } else {
    console.log("No video data found!");
  }
});

chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === "local" && changes.videoDetails) {
    updateUI(changes.videoDetails.newValue);
  }
});

function updateUI(videoDetails) {
  document.getElementById("thumbnail").src = videoDetails.thumbnailUrl;

  const summarizeBtn = document.getElementById("summarizeBtn");
  const summaryResult = document.getElementById("summaryResult");

  summarizeBtn.addEventListener("click", () => {
    if (summarizeBtn.innerText === "Copy") {
      const summaryText = summarizeBtn.getAttribute("data-summary");
      if (summaryText) {
        navigator.clipboard
          .writeText(summaryText)
          .then(() => {
            summarizeBtn.classList.add("text-white");
            summarizeBtn.innerText = "Copied";
            setTimeout(() => {
              summarizeBtn.classList.add("text-white");
              summarizeBtn.innerHTML = `${copyIcon()} Copy`;
            }, 2000);
          })
          .catch((error) => {
            console.error("Error copying text: ", error);
          });
      }
    } else {
      summarizeBtn.disabled = true;
      summarizeBtn.classList.add("text-white");
      summarizeBtn.innerText = "Loading...";
      const videoUrl = videoDetails.videoUrl;

      fetchData(videoUrl, summarizeBtn, summaryResult);
    }
  });
}

function fetchData(videoUrl, summarizeBtn, summaryResult) {
  const summaryField = document.getElementById("summaryField");

  fetch("http://localhost:3030/api/summarize", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: '',
      videoUrl: videoUrl,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      summaryField.classList.remove("hidden");
      summaryResult.innerText = data.text;
      summarizeBtn.disabled = false;
      summarizeBtn.classList.add("text-white");
      summarizeBtn.innerHTML = `${copyIcon()} Copy`;
      summarizeBtn.setAttribute("data-summary", data.text);
    })
    .catch((e) => {
      console.log("Error: ", e);
      summarizeBtn.disabled = false;
      summarizeBtn.innerText = "Summarize Video";
    });
}

function copyIcon() {
  return `
    <svg class="h-4 text-white px-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z" />
    </svg>
    `;
}
