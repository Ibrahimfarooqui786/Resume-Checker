const fileInput = document.getElementById("fileInput");
const dropzone = document.getElementById("dropzone");
const resumeText = document.getElementById("resumeText");
const analyzeBtn = document.getElementById("analyzeBtn");
const clearBtn = document.getElementById("clearBtn");
const results = document.getElementById("results");
const scoreCircle = document.getElementById("scoreCircle");
const scoreLabel = document.getElementById("scoreLabel");
const scoreDesc = document.getElementById("scoreDesc");
const checks = document.getElementById("checks");

// File Upload
dropzone.addEventListener("click", () => fileInput.click());
fileInput.addEventListener("change", () => {
  if (fileInput.files.length) {
    const reader = new FileReader();
    reader.onload = e => resumeText.value = e.target.result;
    reader.readAsText(fileInput.files[0]);
  }
});

// Clear
clearBtn.addEventListener("click", () => {
  resumeText.value = "";
  results.classList.add("hidden");
});

// Analyze
analyzeBtn.addEventListener("click", () => {
  const text = resumeText.value.trim();
  if (!text) {
    alert("Please paste or upload your resume first.");
    return;
  }
  const analysis = analyzeResume(text);
  showResults(analysis);
});

// Resume Analysis Logic
function analyzeResume(text) {
  const wordCount = text.split(/\s+/).length;
  const hasContact = /@|phone|linkedin/i.test(text);
  const hasExperience = /experience|work/i.test(text);
  const hasEducation = /education|bachelor|master|degree/i.test(text);
  const hasSkills = /skills|technologies|tools/i.test(text);

  let score = 50;
  if (wordCount > 300) score += 20;
  if (hasContact) score += 10;
  if (hasExperience) score += 10;
  if (hasEducation) score += 5;
  if (hasSkills) score += 5;

  if (score > 100) score = 100;

  return { score, wordCount, hasContact, hasExperience, hasEducation, hasSkills };
}

// Display Results
function showResults(a) {
  results.classList.remove("hidden");
  scoreCircle.textContent = a.score;

  if (a.score >= 75) {
    scoreCircle.className = "score-circle good";
    scoreLabel.textContent = "Great Resume!";
    scoreDesc.textContent = "Your resume looks strong.";
  } else if (a.score >= 50) {
    scoreCircle.className = "score-circle ok";
    scoreLabel.textContent = "Decent Resume";
    scoreDesc.textContent = "There’s room for improvement.";
  } else {
    scoreCircle.className = "score-circle bad";
    scoreLabel.textContent = "Needs Work";
    scoreDesc.textContent = "Add more detail to improve.";
  }

  checks.innerHTML = `
    <div>${a.hasContact ? "✅" : "❌"} Contact Information</div>
    <div>${a.hasExperience ? "✅" : "❌"} Experience Section</div>
    <div>${a.hasEducation ? "✅" : "❌"} Education Section</div>
    <div>${a.hasSkills ? "✅" : "❌"} Skills Section</div>
    <div>📝 Word Count: ${a.wordCount}</div>
  `;
}