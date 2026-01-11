# Codebase Report

## Folder Structure
```
Ganesh-Chougale.github.io
├── Assets/
│   ├── Images/
│   │   ├── ocean_view.jpg
│   │   └── own.jpg
│   └── Utils/
│       ├── Bingo.js
│       └── cdn.html
├── Codex/
│   ├── Features/
│   │   └── Scripts/
│   ├── Input/
│   │   ├── Fixed.md
│   │   ├── Instructions.txt
│   │   └── TriedSolutions.txt
│   ├── Output/
│   │   └── output.md
│   └── Runner.js
├── favicon.ico
├── index.html
├── script.js
├── style.css
└── SubPages/
    ├── DataConverter/
    │   ├── DataConverter.css
    │   ├── DataConverter.html
    │   └── DataConverter.js
    ├── ImageResizer/
    │   ├── ImageResizer.css
    │   ├── ImageResizer.html
    │   └── ImageResizer.js
    ├── MediaFinder/
    │   ├── MediaFinder.css
    │   ├── MediaFinder.html
    │   └── MediaFinder.js
    ├── NBT/
    │   ├── NBT.css
    │   ├── NBT.html
    │   ├── NBT.js
    │   └── SubJS/
    ├── Promter/
    │   ├── Prompter.css
    │   ├── Prompter.html
    │   └── scipts/
    ├── Sequencer/
    │   ├── Sequencer_JSs/
    │   ├── Sequencer.css
    │   └── Sequencer.html
    ├── Tools.css
    ├── Tools.html
    ├── Tools.js
    ├── UploadSyncer/
    │   ├── UploadSyncer.css
    │   ├── UploadSyncer.html
    │   └── UploadSyncer.js
    └── Vocabulary/
        ├── Vocabulary.css
        ├── Vocabulary.html
        └── Vocabulary.js
```

---

## Code Summary
Assets\Utils\Bingo.js:
```js
const BINGO = {
  PieValue: "3.14159",
  UploadSyncer: "obsidian",
  DriveConfig: {
    // Google Drive API Configuration
    apiKey: "AIzaSyAiHNvKrnISSw4z0wCMiyE8ttWrMsX9cBg",
    clientId: "8114939294-q088idvqfcll7bfpr12c5v60dhgdgl0p.apps.googleusercontent.com",
    clientSecret: "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",
    scopes: ["https://www.googleapis.com/auth/drive.file"],
    redirectUri: "http://localhost",
    refreshToken: "YOUR_REFRESH_TOKEN",
    accessToken: "YOUR_TEMP_ACCESS_TOKEN",
  },
  // ✅ Google Sheets Web App URL
  scriptUrl: {
    UploadSyncerUrl: "https://script.google.com/macros/s/AKfycbwJowuxou3SvmdaSH7Z2Rt1gVYmRvYjRSeo4J1r2PcPeSwU4WplNPNBBDQZk_h3WC2nOw/exec"
  },
  // ✅ WhatsApp Number (country code + number, no + sign)
  WhatsAppNumber: "918459481200"
};
export default BINGO;
```

Assets\Utils\cdn.html:
```html
<!-- Assets/Utils/cdn.html -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
      integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
      integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
      crossorigin="anonymous" referrerpolicy="no-referrer" />
```


---

After finishing all code summary of Assets
Codex\Features\Scripts\CodeSummary.js:
```js
const fs = require("fs");
const path = require("path");
// ⚙️ Config object for switches
const config = {
  reduceTokensByWhiteSpace: false,
  checkOldOutput: false,    // 🔥 Compare with old summary
  skipLanguages: ["text", ".md"], // can be ".css" or "css" or mixed
  removeComments: false     // ✅ true = strip comments, false = keep them
};
// Supported file extensions and languages
const supportedExtensions = {
  ".js": "js",
  ".gs": "gs",
  ".html": "html",
  ".ts": "typescript",
  ".java": "java",
  ".py": "python",
  ".go": "go",
  ".rb": "ruby",
  ".cpp": "cpp",
  ".c": "c",
  ".php": "php",
  ".sh": "bash",
  ".cs": "csharp",
  ".css": "css",
  ".txt": "text",
  ".h": "cpp",
  ".yaml": "yaml",
  ".dart": "dart",
  ".tsx": "typescript",
  ".mjs": "javascript",
  ".env": "env",
  ".reg": "registry",
  ".bat": "batch",
  ".cmd": "batch",
  ".md": "markdown"
};
// 🔑 Normalize skipLanguages so it can take both extensions (.css) or language names (css)
const normalizedSkipLanguages = config.skipLanguages.map((item) =>
  item.startsWith(".") ? supportedExtensions[item] || item.replace(".", "") : item
);
// Ignored files and folders
const ignoredFiles = [
  "site", ".metadata", "libraries", "gradle", ".angular", ".vscode", "node_modules", ".editorconfig",
  ".gitignore", "Migrations", "Debug", "test", "libs", "angular.json", "package-lock.json",
  "package.json", "README.md", "Dependencies", "Connected Services", "tsconfig.app.json", "next-env.d.ts",
  "tsconfig.json", "tsconfig.spec.json", "CodeSummary.md", ".mvn", ".settings", "build", "next.config.ts",
  "cS.js", "CS.js", ".idea", ".next", "ErrorExporter.js", "Splitter.js", ".dart_tool", "io", "plugins", "flutter"
  , "CodeSummer.js", "FileAndFolderSummary.js"
];
let processedFiles = 0;
let totalFiles = 0;
let lastDir = "";
// Walk a directory
function walkDir(dir, callback) {
  if (!fs.existsSync(dir)) return;
  for (const file of fs.readdirSync(dir)) {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    stats.isDirectory() ? walkDir(filePath, callback) : callback(filePath);
  }
}
// ⚙️ Strip comments from code
function stripComments(content, lang) {
  switch (lang) {
    case "js": case "ts": case "java": case "c": case "cpp": case "csharp": case "php":
      return content.replace(/\/\/.*$/gm, "").replace(/\/\*[\s\S]*?\*\//gm, "");
    case "python": case "ruby": case "bash": case "shell": case "dockerfile":
      return content.replace(/#.*$/gm, "");
    case "html": case "xml": case "vue": case "svelte":
      return content.replace(/<!--[\s\S]*?-->/gm, "");
    case "css": case "scss": case "less":
      return content.replace(/\/\*[\s\S]*?\*\//gm, "");
    case "yaml": case "yml": case "ini": case "toml":
      return content.replace(/^\s*#.*/gm, "");
    case "sql":
      return content.replace(/--.*$/gm, "").replace(/\/\*[\s\S]*?\*\//gm, "");
    default:
      return content;
  }
}
// ✅ Clean empty lines + optional whitespace formatting
function removeExcessiveEmptyLines(content) {
  return content
    .replace(/\r\n/g, "\n")
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line) => (config.reduceTokensByWhiteSpace ? line.trimStart() : line))
    .join("\n")
    .trim();
}
// 🔎 Parse CodeSummary.md into { filePath: snippet }
function parseSummary(summaryText) {
  const snippetRegex = /([^\n]+):\n```(\w+)\n([\s\S]*?)```/g;
  const snippets = {};
  let match;
  while ((match = snippetRegex.exec(summaryText))) {
    snippets[match[1].trim()] = match[3].trim();
  }
  return snippets;
}
// 📝 Generate summary
function generateSummary(root, selectedDirs) {
  let summary = "";
  processedFiles = 0;
  totalFiles = 0;
  lastDir = "";
  console.log("🔍 Starting scan...");
  const targets =
    selectedDirs.length > 0
      ? selectedDirs.map((folder) => path.resolve(folder)).filter(fs.existsSync)
      : [root];
  // Count total files
  targets.forEach((dir) => {
    walkDir(dir, (filePath) => {
      const ext = path.extname(filePath).toLowerCase();
      const lang = supportedExtensions[ext];
      const relativeFilePath = path.relative(root, filePath);
      if (
        !lang ||
        ignoredFiles.some((ignored) => relativeFilePath.includes(ignored)) ||
        normalizedSkipLanguages.includes(lang)
      ) return;
      totalFiles++;
    });
  });
  console.log(`📄 Total files to process: ${totalFiles}`);
  const newSnippets = {};
  targets.forEach((dir) => {
    walkDir(dir, (filePath) => {
      const ext = path.extname(filePath).toLowerCase();
      const lang = supportedExtensions[ext];
      const relativeFilePath = path.relative(root, filePath);
      if (
        !lang ||
        ignoredFiles.some((ignored) => relativeFilePath.includes(ignored)) ||
        normalizedSkipLanguages.includes(lang)
      ) return;
      let content = fs.readFileSync(filePath, "utf-8");
      const currentDir = path.dirname(relativeFilePath).split(path.sep)[0];
      if (currentDir !== lastDir) {
        if (lastDir) summary += `\n---\n\nAfter finishing all code summary of ${lastDir}\n`;
        lastDir = currentDir;
      }
      console.log(`Processing: ${relativeFilePath}`);
      if (config.removeComments) content = stripComments(content, lang);
      content = removeExcessiveEmptyLines(content);
      newSnippets[relativeFilePath] = content;
      summary += `${relativeFilePath}:\n\`\`\`${lang}\n${content}\n\`\`\`\n\n`;
      processedFiles++;
      const progress = Math.round((processedFiles / totalFiles) * 100);
      process.stdout.write(`\rProgress: ${progress}%`);
    });
  });
  const outputDir = path.join(__dirname, "ScriptOutput");
  fs.mkdirSync(outputDir, { recursive: true });
  const oldPath = path.join(outputDir, "CodeSummary.md");
  if (config.checkOldOutput) {
    let oldSnippets = {};
    if (fs.existsSync(oldPath)) oldSnippets = parseSummary(fs.readFileSync(oldPath, "utf-8"));
    let unchangedSection = "# unchanged snippets\n\n";
    let changedSection = "# changed snippets\n\n";
    const allFiles = new Set([...Object.keys(oldSnippets), ...Object.keys(newSnippets)]);
    allFiles.forEach((file) => {
      const oldCode = oldSnippets[file];
      const newCode = newSnippets[file];
      const ext = path.extname(file).toLowerCase();
      const lang = supportedExtensions[ext] || "";
      if (oldCode && newCode) {
        if (oldCode === newCode) {
          unchangedSection += `${file}:\n\`\`\`${lang}\n${newCode}\n\`\`\`\n\n`;
        } else {
          changedSection += `${file} (snippet changed):\n\`\`\`${lang}\n${newCode}\n\`\`\`\n\n`;
        }
      } else if (!oldCode && newCode) {
        changedSection += `${file} (new file):\n\`\`\`${lang}\n${newCode}\n\`\`\`\n\n`;
      } else if (oldCode && !newCode) {
        changedSection += `${file} (removed file)\n\n`;
      }
    });
    fs.writeFileSync(oldPath, unchangedSection + changedSection);
  } else {
    fs.writeFileSync(oldPath, summary);
  }
  console.log("\n✅ Done! Summary saved to CodeSummary.md");
}
// 🏁 MAIN
const rootDir = process.cwd();
const selectedDirs = process.argv.slice(2);
generateSummary(rootDir, selectedDirs);
```

Codex\Features\Scripts\FixedText.js:
```js
const fs = require("fs");
const path = require("path");
function main() {
  const inputFile = path.join(__dirname, "..", "..", "Input", "Fixed.md");
  const outputDir = path.join(__dirname, "ScriptOutput");
  fs.mkdirSync(outputDir, { recursive: true });
  let content = "";
  if (fs.existsSync(inputFile)) {
    content = fs.readFileSync(inputFile, "utf-8");
  } else {
    content = "_No fixed text provided._";
  }
  fs.writeFileSync(path.join(outputDir, "FixedText.md"), content);
  console.log("✅ FixedText.md generated from Input/Fixed.md");
}
main();
```

Codex\Runner.js:
```js
const fs = require("fs");
const { spawnSync } = require("child_process");
const path = require("path");
// ✅ Switches
const config = {
  runCodeSummary: true,
  runFolderStructurer: true,
  runFixedText: false,
  runTriedSolutions: false,
  runFinalInstruction: false,
};
// small helpers (no external PathMaker)
function scriptPath(...parts) {
  return path.join(__dirname, "Features", "Scripts", ...parts);
}
function scriptOutputPath(...parts) {
  return path.join(__dirname, "Features", "Scripts", "ScriptOutput", ...parts);
}
// ✅ Run feature
function runFeature(scriptPathStr, args = []) {
  console.log(`▶ Running ${scriptPathStr} ${args.length ? args.join(" ") : ""}...`);
  const res = spawnSync("node", [scriptPathStr, ...args], { stdio: "inherit" });
  if (res.error) {
    console.error("⚠️ spawnSync error:", res.error);
  } else if (typeof res.status === "number" && res.status !== 0) {
    console.warn(`⚠️ Script exited with code ${res.status} (${scriptPathStr})`);
  }
}
// ✅ Collect outputs (in requested order)
function collectOutputs() {
  const outputDir = path.join(__dirname, "Output");
  fs.mkdirSync(outputDir, { recursive: true });
  const outputPath = path.join(outputDir, "output.md");
  let finalOutput = "# Codebase Report\n\n";
  // 1️⃣ Folder Structure
  if (config.runFolderStructurer) {
    const file = scriptOutputPath("FileAndFolderSummary.md");
    if (fs.existsSync(file)) {
      finalOutput += "## Folder Structure\n" + fs.readFileSync(file, "utf-8") + "\n\n---\n\n";
    }
  }
  // 2️⃣ Fixed Text
  if (config.runFixedText) {
    const file = scriptOutputPath("FixedText.md");
    if (fs.existsSync(file)) {
      finalOutput += "## Fixed Text\n" + fs.readFileSync(file, "utf-8") + "\n\n---\n\n";
    }
  }
  // 3️⃣ Code Summary
  if (config.runCodeSummary) {
    const file = scriptOutputPath("CodeSummary.md");
    if (fs.existsSync(file)) {
      finalOutput += "## Code Summary\n" + fs.readFileSync(file, "utf-8") + "\n\n---\n\n";
    } else {
      finalOutput += "## Code Summary\n\n_(no code summary found)_\n\n---\n\n";
    }
  }
  // 4️⃣ Tried Solutions (optional)
  if (config.runTriedSolutions) {
    const file = scriptOutputPath("TriedSolutions.md");
    if (fs.existsSync(file)) {
      finalOutput += "## Previous Takes\n" + fs.readFileSync(file, "utf-8") + "\n\n---\n\n";
    }
  }
  fs.writeFileSync(outputPath, finalOutput, "utf-8");
  console.log(`✅ Combined report generated at ${outputPath}`);
  return outputPath;
}
// 🏁 MAIN
function main() {
  const args = process.argv.slice(2);
  const projectPath = args[0] ? args[0] : process.cwd();
  console.log(`📂 Running Codex on: ${projectPath}`);
  // run scripts (they accept projectPath where relevant)
  if (config.runFolderStructurer) runFeature(scriptPath("FileAndFolderSummary.js"), [projectPath]);
  if (config.runCodeSummary) runFeature(scriptPath("CodeSummary.js"), [projectPath]);
  if (config.runFixedText) runFeature(scriptPath("FixedText.js"));
  if (config.runTriedSolutions) runFeature(scriptPath("TriedSolutions.js"));
  const outputPath = collectOutputs();
  // Run final instruction after merging
  if (config.runFinalInstruction) {
    runFeature(scriptPath("FinalInstruction.js"));
    const instrFile = scriptOutputPath("FinalInstruction.md"); // ✅ corrected
    if (fs.existsSync(instrFile)) {
      const extra = fs.readFileSync(instrFile, "utf-8");
      const outputContent = fs.readFileSync(outputPath, "utf-8");
      if (!outputContent.includes(extra)) {
        fs.appendFileSync(outputPath, "\n\n## Final Instruction\n" + extra, "utf-8");
        console.log("✅ Final instruction appended.");
      }
    }
  }
}
main();
```


---

After finishing all code summary of Codex
index.html:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ganesh Chougale Portfolio</title>
    <!-- CDN Links -->
    <script>
        fetch('./Assets/Utils/cdn.html')
        .then(response => response.text())
        .then(data => document.head.insertAdjacentHTML('beforeend', data));
    </script>
    <!-- CDN Links -->
    <link rel="stylesheet" href="./style.css">
</head>
<body>
    <header class="hero-header text-white text-center py-4">
        <div class="container">
            <h1 class="display-4">Ganesh Chougale <small class="text-muted fs-5 d-block mt-2">Like to keep things <span
                        id="typewriter-text" style="font-weight: 900;">simple</span></small></h1>
            <nav class="navbar navbar-expand-lg">
                <div class="container-fluid">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link" href="#about">About</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#projects">Projects</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#contact">Contact</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    </header>
    <main class="container my-5">
        <section id="hero" class="text-center bg-light p-5 rounded shadow-sm mb-5">
            <h2 class="display-5 mb-3">Welcome to My Portfolio!</h2>
            <p class="lead mb-4">I'm a passionate developer creating engaging & scalable solutions.</p>
            <a href="#projects" class="btn btn-primary btn-lg">View My Work</a>
        </section>
        <section id="about" class="bg-white p-5 rounded shadow-sm mb-5">
            <h2 class="text-center mb-4">About Me</h2>
            <p>Hello! I'm Ganesh Chougale, 
                <strong>A programming agnostic</strong>, a budding developer from Kolhapur, Maharashtra. I enjoy building
                scalable products. I'm currently expanding my skills in front-end & back-end development and
                looking for opportunities to contribute to exciting projects.</p>
            <p>My skills include <strong>FrontEnd</strong>: Vanilla JS, React, Angular; and <strong>BackEnd</strong>: Java Spring Boot, Node, .NET EF. I'm always eager to learn new technologies. I love using Python for computer vision, and JavaScript & shell scripts for automation & custom scripting.</p>
        </section>
        <section id="projects" class="bg-white p-5 rounded shadow-sm mb-5">
            <h2 class="text-center mb-4">My Projects</h2>
            <div class="accordion" id="projectsAccordion">
                <!-- Academic Projects -->
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingAcademic">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" 
                                data-bs-target="#collapseAcademic" aria-expanded="false" 
                                aria-controls="collapseAcademic">
                            <strong>Academic Projects</strong>
                        </button>
                    </h2>
                    <div id="collapseAcademic" class="accordion-collapse collapse" 
                         aria-labelledby="headingAcademic" data-bs-parent="#projectsAccordion">
                        <div class="accordion-body">
                            <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 justify-content-center">
                                <!-- Project 1: Virtual Keyboard -->
                                <div class="col">
                                    <div class="card h-100 project-wrapper" data-project-id="project1" style="cursor: pointer;">
                                        <div class="card-body">
                                            <h3 class="card-title text-center">Virtual Keyboard</h3>
                                            <p class="card-text">Hands-on project (literally! I need to raise them for this) – check out
                                                my Cam Virtual Keyboard! 👋</p>
                                            <div class="ratio ratio-16x9 mb-3 project-video-container">
                                                <iframe 
                                                src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7336260755597451266?compact=1"
                                                allowfullscreen
                                                title="Embedded LinkedIn Post">
                                                </iframe>
                                            </div>
                                            <div class="text-center">
                                                <a href="https://www.linkedin.com/posts/ganesh-chougale-512449215_learnbydoing-opensource-activity-7336260798459097088-zz6W?utm_source=share&utm_medium=member_desktop&rcm=ACoAADZZQ54BebFnJeFxBKof8YI_PnySJ-S78xw"
                                                    target="_blank" class="btn btn-outline-primary btn-sm" onclick="event.stopPropagation();">LinkedIn Post</a>
                                                <a href="https://github.com/Ganesh-Chougale/Virtual-Keyboard-using-Mediapipe"
                                                    target="_blank" class="btn btn-outline-secondary btn-sm" onclick="event.stopPropagation();">GitHub Repo</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- Project 2: Product Store -->
                                <div class="col">
                                    <div class="card h-100 project-wrapper" data-project-id="project2" style="cursor: pointer;">
                                        <div class="card-body">
                                            <h3 class="card-title text-center">Full-Stack Product Store Application</h3>
                                            <p class="card-text">Fully functioning MERN stack product store application with all CRUD
                                                features.</p>
                                            <div class="ratio ratio-16x9 mb-3 project-video-container">
                                                <iframe 
                                                src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7298645556669685763?compact=1"
                                                allowfullscreen
                                                title="Embedded LinkedIn Post">
                                                </iframe>
                                            </div>
                                            <div class="text-center">
                                                <a href="https://www.linkedin.com/posts/ganesh-chougale-512449215_webdevelopment-mernstack-javascript-activity-7298645657362276352-tE1Y?utm_source=share&utm_medium=member_desktop&rcm=ACoAADZZQ54BebFnJeFxBKof8YI_PnySJ-S78xw"
                                                    target="_blank" class="btn btn-outline-primary btn-sm" onclick="event.stopPropagation();">LinkedIn Post</a>
                                                <a href="https://github.com/Ganesh-Chougale/Product_Store" target="_blank"
                                                    class="btn btn-outline-secondary btn-sm" onclick="event.stopPropagation();">GitHub Repo</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- Add more academic projects here -->
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Personal Projects -->
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingPersonal">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" 
                                data-bs-target="#collapsePersonal" aria-expanded="false" 
                                aria-controls="collapsePersonal">
                            <strong>Personal Projects</strong>
                        </button>
                    </h2>
                    <div id="collapsePersonal" class="accordion-collapse collapse" 
                         aria-labelledby="headingPersonal" data-bs-parent="#projectsAccordion">
                        <div class="accordion-body">
                            <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 justify-content-center">
                                <!-- Personal Project 1 -->
                                <div class="col">
                                    <div class="card h-100 project-wrapper" data-project-id="personal1" style="cursor: pointer;">
                                        <div class="card-body">
                                            <h3 class="card-title text-center">AppNetSwitch</h3>
                                            <p class="card-text text-center">Application Internet Switch</p>
                                            <div class="ratio ratio-16x9 mb-3 project-video-container">
                                                <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7393956820387766272?compact=1" height="399" width="504" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>
                                            </div>
                                            <div class="text-center">
                                                <a href="https://www.linkedin.com/posts/ganesh-chougale-512449215_python-pyqt6-windowsdevelopment-activity-7393957076365930496-JIGs?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAADZZQ54BebFnJeFxBKof8YI_PnySJ-S78xw"
                                                    target="_blank" class="btn btn-outline-primary btn-sm" onclick="event.stopPropagation();">LinkedIn Post</a>
                                                <a href="https://github.com/Ganesh-Chougale/AppNetSwitch"
                                                    target="_blank" class="btn btn-outline-secondary btn-sm" onclick="event.stopPropagation();">GitHub Repo</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- Personal Project 2 -->
                                <div class="col">
                                    <div class="card h-100 project-wrapper" data-project-id="personal2" style="cursor: pointer;">
                                        <div class="card-body">
                                            <h3 class="card-title text-center">Project Title 2</h3>
                                            <p class="card-text">Project description goes here...</p>
                                            <div class="ratio ratio-16x9 mb-3 project-video-container">
                                                <iframe 
                                                src=""
                                                allowfullscreen
                                                title="Project Video">
                                                </iframe>
                                            </div>
                                            <div class="text-center">
                                                <a href="#"
                                                    target="_blank" class="btn btn-outline-primary btn-sm" onclick="event.stopPropagation();">LinkedIn Post</a>
                                                <a href="#"
                                                    target="_blank" class="btn btn-outline-secondary btn-sm" onclick="event.stopPropagation();">GitHub Repo</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- Add more personal projects here -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section id="contact" class="bg-white p-5 rounded shadow-sm">
            <h2 class="text-center mb-4">Get in Touch</h2>
            <p class="text-center">I'm always open to new collaborations and opportunities. Feel free to reach out!</p>
            <div class="text-center mt-4 d-flex flex-wrap justify-content-center gap-3">
                <a href="mailto:gchougale32@gmail.com" class="btn btn-dark btn-lg" aria-label="Email Ganesh">
                    <i class="fas fa-envelope"></i>
                </a>
                <a href="tel:+918459481200" class="btn btn-dark btn-lg" aria-label="Call Ganesh">
                    <i class="fas fa-phone"></i>
                </a>
                <a href="http://linkedin.com/in/ganesh-chougale-512449215" target="_blank" class="btn btn-dark btn-lg"
                    aria-label="LinkedIn Profile">
                    <i class="fab fa-linkedin"></i>
                </a>
                <a href="https://github.com/Ganesh-Chougale" target="_blank" class="btn btn-dark btn-lg"
                    aria-label="GitHub Profile">
                    <i class="fab fa-github"></i>
                </a>
                <a href="https://ganesh-chougale.github.io/" target="_blank" class="btn btn-dark btn-lg"
                    aria-label="Home Page">
                    <i class="fas fa-home"></i>
                </a>
            </div>
            <a href="./SubPages/Tools.html" target="_blank" class="btn btn-sm tools-link" aria-label="Tools"
            style="float: right;">
            <h2><i class="fas fa-star-half-alt fa-spin"></i></h2>
            </a>
        </section>
    </main>
    <!-- Fullscreen Project Modal -->
    <div class="modal fade" id="projectModal" tabindex="-1" aria-labelledby="projectModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-fullscreen">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="projectModalLabel">Project Details</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" id="modalProjectContent">
                    <!-- Project content will be dynamically inserted here -->
                </div>
            </div>
        </div>
    </div>
    <footer class="bg-dark text-white text-center py-3 mt-5">
        <p class="mb-0"> 2025 Ganesh Chougale. All rights reserved.</p>
    </footer>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossorigin="anonymous"></script>
    <script src="./script.js"></script>
</body>
</html>
```

script.js:
```js
document.addEventListener('DOMContentLoaded', function() {
    const yearParagraph = document.querySelector('footer .mb-0');
    if (yearParagraph) {
        yearParagraph.textContent = `© ${new Date().getFullYear()} Ganesh Chougale. All rights reserved.`;
    }
    const words = ["simple", "concise"];
    let i = 0;
    let j = 0;
    let currentWord = "";
    let isDeleting = false;
    const typewriterElement = document.getElementById('typewriter-text');
    function type() {
        if (!typewriterElement) return;
        currentWord = words[i];
        if (isDeleting) {
            typewriterElement.textContent = currentWord.substring(0, j - 1);
            j--;
        } else {
            typewriterElement.textContent = currentWord.substring(0, j + 1);
            j++;
        }
        let typeSpeed = 150;
        if (isDeleting) {
            typeSpeed = 75;
        }
        if (!isDeleting && j === currentWord.length) {
            typeSpeed = 1000;
            isDeleting = true;
        } else if (isDeleting && j === 0) {
            isDeleting = false;
            i = (i + 1) % words.length;
            typeSpeed = 500;
        }
        setTimeout(type, typeSpeed);
    }
    type();
    // Project Modal Functionality
    const projectWrappers = document.querySelectorAll('.project-wrapper');
    const projectModal = new bootstrap.Modal(document.getElementById('projectModal'));
    const modalContent = document.getElementById('modalProjectContent');
    const modalTitle = document.getElementById('projectModalLabel');
    projectWrappers.forEach(wrapper => {
        wrapper.addEventListener('click', function() {
            // Clone the project content
            const projectCard = this.cloneNode(true);
            // Remove the click handler and cursor style from the cloned element
            projectCard.style.cursor = 'default';
            projectCard.classList.remove('project-wrapper');
            // Get the project title
            const projectTitle = projectCard.querySelector('.card-title').textContent;
            // Update modal title
            modalTitle.textContent = projectTitle;
            // Clear previous content and add new content
            modalContent.innerHTML = '';
            // Create a container for the fullscreen project
            const fullscreenContainer = document.createElement('div');
            fullscreenContainer.className = 'container-fluid h-100';
            fullscreenContainer.innerHTML = `
                <div class="row h-100 align-items-center justify-content-center">
                    <div class="col-12 col-lg-10">
                        ${projectCard.innerHTML}
                    </div>
                </div>
            `;
            modalContent.appendChild(fullscreenContainer);
            // Show the modal
            projectModal.show();
        });
    });
});
```

style.css:
```css
header::before{
        background-image: url("./Assets/Images/ocean_view.jpg");
        background-size: cover; /* Default for larger screens */
        background-position: center center;
        background-repeat: no-repeat;
    }
.hero-header {
    background-image: url("./Assets/Images/ocean_view.jpg");
    background-size: cover; /* Default for larger screens */
    background-position: center center;
    background-repeat: no-repeat;
    position: relative;
    overflow: hidden;
    min-height: 300px; /* Base height */
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
/* Overlay for text visibility - this already exists, good for contrast */
.hero-header::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Keep the existing overlay for general text readability */
    z-index: 1;
}
.hero-header .container {
    position: relative;
    z-index: 2;
}
/* Text Enhancements for better visibility */
.hero-header .text-muted {
    color: rgba(255, 255, 255, 0.9) !important; /* Make the small text whiter for better contrast */
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7); /* Shadow for tagline */
}
/* Navbar text visibility */
.hero-header .navbar-nav .nav-link {
    color: rgba(255, 255, 255, 0.9) !important; /* Ensure nav links are visible */
    font-weight: bold; /* Make nav links bolder */
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.6); /* Add a subtle shadow to nav links */
}
.hero-header .navbar-nav .nav-link:hover {
    color: #e0e0e0 !important; /* Lighter hover state for nav links */
}
@keyframes backgroundZoom {
    0% {
        background-size: cover;
    }
    50% {
        background-size: 110%;
    }
    100% {
        background-size: cover;
    }
}
/* Responsive header height and background zoom */
@media (max-width: 991px) { /* Applies to screens smaller than 992px (Bootstrap's lg breakpoint) */
    .hero-header {
        min-height: 250px; /* Reduced height for tablets and mobiles */
        padding-top: 30px; /* Adjust padding for better spacing */
        padding-bottom: 30px;
        background-size: 115%; /* Zoom out slightly on medium screens */
    }
}
@media (max-width: 767px) { /* Further reduce for smaller mobile screens */
    .hero-header {
        min-height: 200px;
        padding-top: 20px;
        padding-bottom: 20px;
        background-size: 125%; /* Zoom out more on small screens */
    }
    .hero-header h1 {
        font-size: 2.5rem; /* Adjust font size for smaller screens */
    }
    .hero-header .text-muted {
        font-size: 0.9rem !important; /* Adjust font size for smaller screens */
    }
}
.btn-primary {
    background-color: #007bff;
    border-color: #007bff;
}
.btn-primary:hover {
    background-color: #0056b3;
    border-color: #0056b3;
}
html {
    scroll-behavior: smooth;
}
.btn-dark {
    background-color: #343a40;
    border-color: #343a40;
}
.btn-dark:hover {
    background-color: #1d2124;
    border-color: #1d2124;
}
.btn-lg i {
    font-size: 1.5rem;
}
/* Projects Accordion Styling */
#projectsAccordion .accordion-item {
    border: 1px solid #dee2e6;
    margin-bottom: 1rem;
    border-radius: 0.5rem;
    overflow: hidden;
}
#projectsAccordion .accordion-button {
    background-color: #f8f9fa;
    color: #212529;
    font-size: 1.25rem;
    padding: 1.25rem 1.5rem;
    transition: all 0.3s ease;
}
#projectsAccordion .accordion-button:not(.collapsed) {
    background-color: #007bff;
    color: white;
    box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.125);
}
#projectsAccordion .accordion-button:focus {
    box-shadow: 0 0 0 0.25rem rgba(0, 123, 255, 0.25);
    border-color: #007bff;
}
#projectsAccordion .accordion-button:hover {
    background-color: #e9ecef;
}
#projectsAccordion .accordion-button:not(.collapsed):hover {
    background-color: #0056b3;
}
#projectsAccordion .accordion-body {
    padding: 1.5rem;
    background-color: #ffffff;
}
/* Smooth transition for accordion collapse */
#projectsAccordion .accordion-collapse {
    transition: height 0.35s ease;
}
/* Project Wrapper Styling */
.project-wrapper {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.project-wrapper:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2) !important;
}
/* Fullscreen Modal Styling */
#projectModal .modal-body {
    padding: 2rem;
    background-color: #f8f9fa;
}
#projectModal .modal-header {
    background-color: #007bff;
    color: white;
    border-bottom: none;
}
#projectModal .btn-close {
    filter: brightness(0) invert(1);
}
#projectModal .card {
    border: none;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
#projectModal .card-body {
    padding: 2rem;
}
#projectModal .card-title {
    font-size: 2rem;
    margin-bottom: 1.5rem;
}
#projectModal .card-text {
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
}
#projectModal .project-video-container {
    margin-bottom: 2rem;
}
#projectModal .btn {
    margin: 0.5rem;
}
```


---

After finishing all code summary of .
SubPages\DataConverter\DataConverter.css:
```css
/* DataConverter.css */
#resultContainer {
  margin-top: 1rem;
}
#outputText {
  font-family: 'Consolas', 'Courier New', monospace;
  white-space: pre-wrap;
  word-wrap: break-word;
}
#downloadBtn, #copyBtn {
  font-size: 0.85rem;
}
#tableContainer {
  margin-top: 1rem;
  overflow-x: auto;
  max-height: 70vh;
  border: 1px solid #dee2e6;
  border-radius: 6px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
thead th {
  position: sticky;
  top: 0;
  background: #f8f9fa;
  border-bottom: 2px solid #dee2e6;
}
th, td {
  padding: 0.6rem;
  text-align: left;
  border-bottom: 1px solid #dee2e6;
}
tr:hover {
  background-color: #f1f1f1;
}
.export-buttons {
  display: flex;
  justify-content: end;
  gap: 8px;
  margin-top: 1rem;
}
/* small spacing for radio toggle area */
#previewOptions { margin-bottom: 0.75rem; }
```

SubPages\DataConverter\DataConverter.html:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Data Converter</title>
  <script>
    fetch('../../Assets/Utils/cdn.html')
      .then(r => r.text())
      .then(d => document.head.insertAdjacentHTML('beforeend', d));
  </script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>
  <link rel="stylesheet" href="DataConverter.css" />
</head>
<body>
  <div class="container my-5">
    <h2 class="mb-4 text-center">Data Converter</h2>
    <!-- Mode selection: Paste / Upload -->
    <div class="mb-3">
      <label class="fw-bold me-2">Input Mode:</label>
      <div class="btn-group" role="group">
        <input type="radio" class="btn-check" name="inputMode" id="modeUpload" autocomplete="off" checked>
        <label class="btn btn-outline-primary" for="modeUpload">Upload File</label>
        <input type="radio" class="btn-check" name="inputMode" id="modePaste" autocomplete="off">
        <label class="btn btn-outline-primary" for="modePaste">Paste Text</label>
      </div>
    </div>
    <!-- Upload container -->
    <div id="uploadContainer" class="mb-3">
      <input type="file" id="inputFile" class="form-control" />
    </div>
    <!-- Paste container -->
    <div id="pasteContainer" class="mb-3 d-none">
      <textarea id="pasteInput" class="form-control" rows="8" placeholder="Paste CSV or JSON here"></textarea>
      <button id="pasteBtn" class="btn btn-primary mt-2">Process Paste</button>
    </div>
    <!-- preview toggle (hidden until input) -->
    <div id="previewOptions" class="d-none mb-3">
      <label class="me-2 fw-bold">Preview as:</label>
      <div id="previewRadios" class="btn-group" role="group" aria-label="Preview options"></div>
    </div>
    <!-- result area -->
    <div id="resultContainer" class="d-none position-relative">
      <!-- text preview controls -->
      <div id="textButtons" class="d-flex justify-content-end mb-2 gap-2 d-none">
        <button id="downloadBtn" class="btn btn-success btn-sm">Download</button>
        <button id="copyBtn" class="btn btn-secondary btn-sm">Copy</button>
      </div>
      <!-- text preview -->
      <textarea id="outputText" class="form-control d-none" rows="15" readonly></textarea>
      <!-- table preview -->
      <div id="tableContainer" class="d-none">
        <div class="export-buttons">
          <button id="exportMarkdownBtn" class="btn btn-outline-dark btn-sm">Export Markdown</button>
          <button id="exportExcelBtn" class="btn btn-outline-success btn-sm">Export Excel</button>
        </div>
        <table class="table table-striped table-bordered mt-3">
          <thead id="tableHead"></thead>
          <tbody id="tableBody"></tbody>
        </table>
      </div>
    </div>
  </div>
  <script src="DataConverter.js"></script>
</body>
</html>
```

SubPages\DataConverter\DataConverter.js:
```js
/* DataConverter.js */
document.addEventListener("DOMContentLoaded", () => {
  const inputFile = document.getElementById("inputFile");
  const previewOptions = document.getElementById("previewOptions");
  const previewRadios = document.getElementById("previewRadios");
  const resultContainer = document.getElementById("resultContainer");
  const outputText = document.getElementById("outputText");
  const textButtons = document.getElementById("textButtons");
  const downloadBtn = document.getElementById("downloadBtn");
  const copyBtn = document.getElementById("copyBtn");
  const tableContainer = document.getElementById("tableContainer");
  const tableHead = document.getElementById("tableHead");
  const tableBody = document.getElementById("tableBody");
  const exportMarkdownBtn = document.getElementById("exportMarkdownBtn");
  const exportExcelBtn = document.getElementById("exportExcelBtn");
  const pasteContainer = document.getElementById("pasteContainer");
  const pasteInput = document.getElementById("pasteInput");
  const pasteBtn = document.getElementById("pasteBtn");
  const modeUpload = document.getElementById("modeUpload");
  const modePaste = document.getElementById("modePaste");
  const uploadContainer = document.getElementById("uploadContainer");
  let fileType = "";        // 'csv' or 'json'
  let parsedData = [];
  let rawText = "";
  let currentPreview = "";
  // --- CSV/JSON helpers (unchanged) ---
  function parseCSVLine(line) {
    const res = [];
    let cur = "", inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQuotes && line[i + 1] === '"') { cur += '"'; i++; }
        else inQuotes = !inQuotes;
      } else if (ch === "," && !inQuotes) {
        res.push(cur); cur = "";
      } else cur += ch;
    }
    res.push(cur);
    return res.map(s => s.trim());
  }
  function parseCSV(text) {
    const lines = text.split(/\r?\n/).filter(l => l.trim() !== "");
    if (!lines.length) return [];
    const headers = parseCSVLine(lines[0]);
    const rows = lines.slice(1).map(line => {
      const vals = parseCSVLine(line);
      const obj = {};
      headers.forEach((h, i) => obj[h.trim()] = vals[i] ?? "");
      return obj;
    });
    return rows;
  }
  function flattenForCSV(obj) {
    const result = {};
    function recurse(curr, prefix) {
      if (Array.isArray(curr)) {
        result[prefix] = JSON.stringify(curr);
        return;
      }
      if (typeof curr === "object" && curr !== null) {
        for (const key in curr) {
          if (!Object.prototype.hasOwnProperty.call(curr, key)) continue;
          const value = curr[key];
          const newKey = prefix ? `${prefix}.${key}` : key;
          if (value && typeof value === "object" && !Array.isArray(value)) recurse(value, newKey);
          else if (Array.isArray(value)) result[newKey] = JSON.stringify(value);
          else result[newKey] = value;
        }
      } else result[prefix] = curr;
    }
    recurse(obj, "");
    return result;
  }
  function normalizeJSON(rawJson) {
    if (Array.isArray(rawJson)) {
      if (rawJson.every(item => item && typeof item === "object" && !Array.isArray(item))) return rawJson;
      else return rawJson.map(item => (item && typeof item === "object") ? item : { value: item });
    } else if (rawJson && typeof rawJson === "object") return [rawJson];
    else return [{ value: rawJson }];
  }
  function convertToCSV(arr) {
    if (!Array.isArray(arr) || arr.length === 0) return "";
    const flat = arr.map(flattenForCSV);
    const headersSet = new Set();
    flat.forEach(obj => Object.keys(obj).forEach(k => headersSet.add(k)));
    const headers = Array.from(headersSet);
    const lines = flat.map(obj => headers.map(h => `"${String(obj[h] ?? "").replace(/"/g, '""')}"`).join(","));
    return [headers.join(","), ...lines].join("\n");
  }
  function downloadBlob(content, filename, type) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, m => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' })[m]);
  }
  // --- Detect CSV or JSON ---
  function detectType(text) {
    try { JSON.parse(text); return "json"; }
    catch { return "csv"; }
  }
  // --- Handle Input Mode Toggle ---
  document.querySelectorAll('input[name="inputMode"]').forEach(radio => {
    radio.addEventListener("change", () => {
      if (modeUpload.checked) {
        uploadContainer.classList.remove("d-none");
        pasteContainer.classList.add("d-none");
      } else {
        uploadContainer.classList.add("d-none");
        pasteContainer.classList.remove("d-none");
      }
    });
  });
  // --- Process Pasted Text ---
  pasteBtn.addEventListener("click", () => {
    const text = pasteInput.value.trim();
    if (!text) return alert("Nothing to paste!");
    rawText = text;
    fileType = detectType(text);
    try {
      parsedData = fileType === "csv" ? parseCSV(text) : normalizeJSON(JSON.parse(text));
    } catch (err) {
      alert("Error parsing input: " + err.message);
      return;
    }
    showPreviewOptions();
  });
  // --- Existing File Upload Handler ---
  inputFile.addEventListener("change", () => {
    if (!inputFile.files.length) return;
    const file = inputFile.files[0];
    rawText = ""; parsedData = []; fileType = "";
    if (file.name.toLowerCase().endsWith(".csv")) fileType = "csv";
    else if (file.name.toLowerCase().endsWith(".json")) fileType = "json";
    else { alert("Only CSV or JSON supported"); inputFile.value = ""; return; }
    const reader = new FileReader();
    reader.onload = e => {
      rawText = e.target.result;
      try {
        parsedData = fileType === "csv" ? parseCSV(rawText) : normalizeJSON(JSON.parse(rawText));
      } catch (err) { alert("Error parsing file: " + err.message); return; }
      showPreviewOptions();
    };
    reader.readAsText(file);
  });
  // --- Show Preview Options & Render ---
  function showPreviewOptions() {
    previewOptions.classList.remove("d-none");
    resultContainer.classList.remove("d-none");
    const other = fileType === "csv" ? "json" : "csv";
    previewRadios.innerHTML = `
      <input type="radio" class="btn-check" name="preview" id="optOther" autocomplete="off" value="${other}" checked>
      <label class="btn btn-outline-primary" for="optOther">${other.toUpperCase()}</label>
      <input type="radio" class="btn-check" name="preview" id="optTable" autocomplete="off" value="table">
      <label class="btn btn-outline-primary" for="optTable">TABLE</label>
    `;
    document.querySelectorAll('input[name="preview"]').forEach(r => r.addEventListener("change", updatePreview));
    updatePreview();
  }
  // --- Update Preview (same as before) ---
  function updatePreview() {
    const chosen = document.querySelector('input[name="preview"]:checked')?.value;
    if (!chosen) return;
    currentPreview = chosen;
    outputText.classList.add("d-none");
    textButtons.classList.add("d-none");
    tableContainer.classList.add("d-none");
    if (chosen === "table") {
      renderTable(parsedData);
      tableContainer.classList.remove("d-none");
    } else if (chosen === "json") {
      outputText.value = JSON.stringify(parsedData, null, 2);
      outputText.classList.remove("d-none");
      textButtons.classList.remove("d-none");
      downloadBtn.dataset.ext = "json";
    } else if (chosen === "csv") {
      outputText.value = convertToCSV(parsedData);
      outputText.classList.remove("d-none");
      textButtons.classList.remove("d-none");
      downloadBtn.dataset.ext = "csv";
    }
  }
  function renderTable(data) {
    if (!Array.isArray(data) || !data.length) {
      tableHead.innerHTML = "";
      tableBody.innerHTML = "<tr><td colspan='100%' class='text-center'>No data</td></tr>";
      return;
    }
    const flat = data.map(flattenForCSV);
    const headersSet = new Set();
    flat.forEach(obj => Object.keys(obj).forEach(k => headersSet.add(k)));
    const headers = Array.from(headersSet);
    tableHead.innerHTML = `<tr>${headers.map(h => `<th>${h}</th>`).join("")}</tr>`;
    tableBody.innerHTML = flat.map(row => `<tr>${headers.map(h => `<td>${escapeHtml(String(row[h] ?? ""))}</td>`).join("")}</tr>`).join("");
  }
  // --- Download / Copy ---
  downloadBtn.addEventListener("click", () => {
    if (!outputText.value) return alert("Nothing to download");
    const name = (inputFile.files[0]?.name || "file").split(".")[0];
    const ext = downloadBtn.dataset.ext || "txt";
    const mime = ext === "json" ? "application/json" : "text/csv";
    downloadBlob(outputText.value, `${name}.${ext}`, mime);
  });
  copyBtn.addEventListener("click", async () => {
    if (!outputText.value) return;
    try { await navigator.clipboard.writeText(outputText.value); alert("Copied!"); }
    catch { outputText.select(); document.execCommand("copy"); alert("Copied!"); }
  });
  // --- Export Markdown / Excel ---
  exportMarkdownBtn.addEventListener("click", () => {
    const rows = tableBody.querySelectorAll("tr");
    if (!rows.length) return alert("No table to export");
    const headers = [...tableHead.querySelectorAll("th")].map(th => th.innerText.trim());
    const md = [
      `| ${headers.join(" | ")} |`,
      `| ${headers.map(() => '---').join(" | ")} |`,
      ...[...rows].map(tr => {
        const cells = [...tr.querySelectorAll("td")].map(td => td.innerText.replace(/\|/g, '\\|').trim());
        return `| ${cells.join(" | ")} |`;
      })
    ].join("\n");
    downloadBlob(md, "table.md", "text/markdown");
  });
  exportExcelBtn.addEventListener("click", () => {
    const headers = [...tableHead.querySelectorAll("th")].map(th => th.innerText.trim());
    const rows = [...tableBody.querySelectorAll("tr")].map(tr => [...tr.querySelectorAll("td")].map(td => td.innerText.trim()));
    if (!rows.length) return alert("No table to export");
    const ws_data = [headers, ...rows];
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(ws_data);
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "table.xlsx");
  });
});
```

SubPages\ImageResizer\ImageResizer.css:
```css
#preview {
  max-height: 300px;
  object-fit: contain;
}
.preview-container {
  border: 2px dashed #dee2e6;
  border-radius: 0.5rem;
  background-color: #f8f9fa;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  margin-bottom: 10px;
  position: relative;
  transition: all 0.3s ease;
  overflow: hidden;
}
.preview-container:hover {
  border-color: #adb5bd;
  background-color: #f1f3f5;
}
.placeholder-content {
  text-align: center;
  color: #6c757d;
  padding: 20px;
  width: 100%;
}
.placeholder-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #adb5bd;
  display: block;
}
.placeholder-content p {
  margin: 0;
  font-size: 0.9rem;
}
.preview-container img {
  max-width: 100%;
  max-height: 300px;
  object-fit: contain;
  display: block;
  margin: 0 auto;
}
.preview-container img.d-none {
  display: none;
}
.preview-container img:not(.d-none) + .placeholder-content {
  display: none;
}
#originalPreview, #preview {
  max-width: 100%;
  max-height: 300px;
  object-fit: contain;
}
#originalPreview.d-none,
#preview.d-none {
  display: none;
}
#originalInfo, #resizedInfo {
  background-color: #f8f9fa;
  padding: 10px;
  border-radius: 0.25rem;
  margin-top: 10px;
  font-size: 0.9em;
}
#originalInfo p, #resizedInfo p {
  margin: 0.3rem 0;
}
```

SubPages\ImageResizer\ImageResizer.html:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Image Resizer</title>
  <script>
    fetch('../../Assets/Utils/cdn.html')
      .then(res => res.text())
      .then(data => document.head.insertAdjacentHTML('beforeend', data));
  </script>
  <link rel="stylesheet" href="ImageResizer.css" />
</head>
<body>
<div class="container my-5">
  <h2 class="text-center mb-4">Image Resizer</h2>
  <!-- Upload -->
  <div class="mb-3">
    <input type="file" id="inputImage" class="form-control" accept="image/*" />
  </div>
  <!-- Preview Section -->
  <div class="row mb-4">
    <div class="col-md-6">
      <h5>Original</h5>
      <div class="preview-container">
        <div id="originalPlaceholder" class="placeholder-content">
          <i class="bi bi-card-image placeholder-icon"></i>
          <p>Upload an image to see the original</p>
        </div>
        <img id="originalPreview" class="img-fluid rounded shadow-sm d-none" alt="Original Preview" />
      </div>
      <div id="originalInfo" class="mt-2">
        <p>Dimensions: <span id="originalDimensions">-</span></p>
        <p>File Size: <span id="originalSize">-</span></p>
      </div>
    </div>
    <div class="col-md-6">
      <h5>Resized</h5>
      <div class="preview-container">
        <div id="resizedPlaceholder" class="placeholder-content">
          <i class="bi bi-arrow-left-right placeholder-icon"></i>
          <p>Adjust settings to see the resized version</p>
        </div>
        <img id="preview" class="img-fluid rounded shadow-sm d-none" alt="Resized Preview" />
      </div>
      <div id="resizedInfo" class="mt-2">
        <p>Dimensions: <span id="resizedDimensions">-</span></p>
        <p>File Size: <span id="resizedSize">-</span></p>
      </div>
    </div>
  </div>
  <!-- Resize Options -->
  <div class="row g-3 mb-4">
    <div class="col-md-5">
      <label for="widthInput" class="form-label">Width (px)</label>
      <input type="number" id="widthInput" class="form-control" min="1" />
    </div>
    <div class="col-md-5">
      <label for="heightInput" class="form-label">Height (px)</label>
      <input type="number" id="heightInput" class="form-control" min="1" />
    </div>
    <div class="col-md-2 d-flex align-items-end">
      <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" id="maintainAspect" checked>
        <label class="form-check-label" for="maintainAspect">Lock Ratio</label>
      </div>
    </div>
    <div class="col-12">
      <label for="qualityInput" class="form-label">Quality: <span id="qualityLabel">90%</span></label>
      <input type="range" id="qualityInput" class="form-range" min="0" max="1" step="0.01" value="0.9" />
    </div>
  </div>
  <!-- Actions -->
  <div class="text-center">
    <button id="downloadBtn" class="btn btn-success d-none">Download Resized Image</button>
  </div>
  <!-- Hidden Canvas -->
  <canvas id="canvas" class="d-none"></canvas>
</div>
<script src="ImageResizer.js"></script>
</body>
</html>
```

SubPages\ImageResizer\ImageResizer.js:
```js
document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const inputImage = document.getElementById("inputImage");
  const originalPreview = document.getElementById("originalPreview");
  const preview = document.getElementById("preview");
  const widthInput = document.getElementById("widthInput");
  const heightInput = document.getElementById("heightInput");
  const qualityInput = document.getElementById("qualityInput");
  const qualityLabel = document.getElementById("qualityLabel");
  const downloadBtn = document.getElementById("downloadBtn");
  const maintainAspect = document.getElementById("maintainAspect");
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  // Info display elements
  const originalDimensions = document.getElementById("originalDimensions");
  const originalSize = document.getElementById("originalSize");
  const originalInfo = document.getElementById("originalInfo");
  const originalPlaceholder = document.getElementById("originalPlaceholder");
  const resizedPlaceholder = document.getElementById("resizedPlaceholder");
  const resizedDimensions = document.getElementById("resizedDimensions");
  const resizedSize = document.getElementById("resizedSize");
  let originalImage = new Image();
  let originalAspectRatio = 0;
  let lastChangedInput = null;
  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };
  // Convert dataURL → Blob (for accurate file size)
  const dataURLtoBlob = (dataURL) => {
    const byteString = atob(dataURL.split(",")[1]);
    const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };
  // Update dimensions while maintaining aspect ratio
  const updateDimensions = (changedInput) => {
    if (!maintainAspect.checked || !originalAspectRatio) return;
    if (changedInput === "width") {
      const newHeight = Math.round(widthInput.value / originalAspectRatio);
      heightInput.value = newHeight;
    } else if (changedInput === "height") {
      const newWidth = Math.round(heightInput.value * originalAspectRatio);
      widthInput.value = newWidth;
    }
  };
  // Show/hide placeholders
  const updatePlaceholders = () => {
    originalPlaceholder.style.display = originalImage.src ? "none" : "block";
    resizedPlaceholder.style.display =
      preview.src && !preview.classList.contains("d-none")
        ? "none"
        : "block";
  };
  // Update preview with current settings
  const updatePreview = () => {
    if (!originalImage.src) return;
    const newWidth = parseInt(widthInput.value) || originalImage.width;
    const newHeight = parseInt(heightInput.value) || originalImage.height;
    const quality = parseFloat(qualityInput.value);
    // Update canvas with new dimensions
    canvas.width = newWidth;
    canvas.height = newHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    try {
      ctx.drawImage(originalImage, 0, 0, newWidth, newHeight);
      // Pick correct format from original extension
      let ext = (downloadBtn.dataset.extension || "jpg").toLowerCase();
      let outputFormat = "image/jpeg"; // default
      if (ext === "png") outputFormat = "image/png";
      else if (ext === "webp") outputFormat = "image/webp";
      // PNG ignores quality param, JPEG/WEBP use it
      const resizedDataUrl = canvas.toDataURL(outputFormat, quality);
      // Update preview
      preview.onload = () => {
        preview.classList.remove("d-none");
        updatePlaceholders();
      };
      preview.src = resizedDataUrl;
      // Store for download
      downloadBtn.classList.remove("d-none");
      downloadBtn.dataset.url = resizedDataUrl;
      downloadBtn.dataset.outputFormat = outputFormat;
      // Update resized info
      resizedDimensions.textContent = `${newWidth} × ${newHeight} px`;
      const resizedBlob = dataURLtoBlob(resizedDataUrl);
      resizedSize.textContent = formatFileSize(resizedBlob.size);
    } catch (error) {
      console.error("Error resizing image:", error);
      preview.classList.add("d-none");
      updatePlaceholders();
    }
  };
  // Event Listeners
  inputImage.addEventListener("change", () => {
    const file = inputImage.files[0];
    if (!file) return;
    // Store original filename + extension
    const originalFileName = file.name;
    const fileNameParts = originalFileName.split(".");
    const fileExtension =
      fileNameParts.length > 1 ? fileNameParts.pop().toLowerCase() : "jpg";
    const fileNameWithoutExt = fileNameParts.join(".");
    // Store for download
    downloadBtn.dataset.originalName = fileNameWithoutExt;
    downloadBtn.dataset.extension = fileExtension;
    // Display original file info
    originalSize.textContent = formatFileSize(file.size);
    originalInfo.style.display = "block";
    // Load and display original image
    const reader = new FileReader();
    reader.onload = (e) => {
      originalImage.onload = () => {
        widthInput.value = originalImage.width;
        heightInput.value = originalImage.height;
        originalAspectRatio = originalImage.width / originalImage.height;
        originalDimensions.textContent = `${originalImage.width} × ${originalImage.height} px`;
        originalPreview.src = e.target.result;
        originalPreview.classList.remove("d-none");
        updatePreview();
        updatePlaceholders();
      };
      originalImage.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
  // Update quality label
  qualityInput.addEventListener("input", () => {
    const quality = Math.round(qualityInput.value * 100);
    qualityLabel.textContent = `${quality}%`;
    updatePreview();
  });
  // Handle width/height changes
  widthInput.addEventListener("input", () => {
    lastChangedInput = "width";
    updateDimensions("width");
    updatePreview();
  });
  heightInput.addEventListener("input", () => {
    lastChangedInput = "height";
    updateDimensions("height");
    updatePreview();
  });
  // Toggle aspect ratio lock
  maintainAspect.addEventListener("change", () => {
    if (maintainAspect.checked && lastChangedInput) {
      updateDimensions(lastChangedInput);
      updatePreview();
    }
  });
  // Download button
  downloadBtn.addEventListener("click", () => {
    const link = document.createElement("a");
    link.href = downloadBtn.dataset.url;
    const width = widthInput.value;
    const height = heightInput.value;
    const originalName = downloadBtn.dataset.originalName || "resized";
    // Ensure extension matches actual format
    let ext = (downloadBtn.dataset.extension || "jpg").toLowerCase();
    if (!["jpg", "jpeg", "png", "webp"].includes(ext)) ext = "jpg";
    link.download = `${originalName}_${width}x${height}.${ext}`;
    link.click();
  });
  // Init placeholders
  updatePlaceholders();
});
```

SubPages\MediaFinder\MediaFinder.css:
```css
body {
  background: #f5f5f5;
  font-family: 'Segoe UI', sans-serif;
}
h1 {
  color: #333;
  font-weight: 600;
}
.card {
  border-radius: 12px;
}
.form-select {
  background-color: #fff;
  border-color: #007bff;
}
button.btn-primary {
  background-color: #007bff;
  border: none;
  font-weight: 500;
}
button.btn-primary:hover {
  background-color: #0056b3;
}
```

SubPages\MediaFinder\MediaFinder.html:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Media Finder</title>
  <!-- Bootstrap CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <!-- FontAwesome for icons -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <!-- Custom CSS -->
  <link rel="stylesheet" href="MediaFinder.css">
</head>
<body>
  <div class="container py-4">
    <h1 class="text-center mb-4"><i class="fas fa-search"></i> Media Finder</h1>
    <!-- Search Card -->
    <div class="card shadow-sm p-3 mb-4">
      <form id="searchForm">
        <div class="row g-2 mb-3">
          <div class="col-12 col-md-6">
            <input type="text" id="query" class="form-control" placeholder="Search anything e.g The.Blacklist.S01">
          </div>
          <div class="col-6 col-md-3">
            <select class="form-select" id="filetypeSelect">
              <option value="-1" data-restype="all">All / Other</option>
              <option value="mkv|mp4|avi|mov|mpg|wmv|divx|mpeg" data-restype="video">Movies / TV <i class="fas fa-film"></i></option>
              <option value="mp3|wav|ogg|flac|aac|m4a" data-restype="audio">Music <i class="fas fa-music"></i></option>
              <option value="pdf|epub|mobi|doc|docx|rtf" data-restype="ebook">Books <i class="fas fa-book"></i></option>
              <option value="exe|iso|apk|zip|rar|7z" data-restype="archive">Software / Games <i class="fas fa-box-archive"></i></option>
              <option value="apk" data-restype="mobile">Mobile Apps <i class="fas fa-mobile-alt"></i></option>
              <option value="jpg|jpeg|png|gif|bmp|tif" data-restype="picture">Images <i class="fas fa-image"></i></option>
            </select>
          </div>
          <div class="col-6 col-md-3">
            <select class="form-select" id="engineSelect">
              <option value="google">Google <i class="fab fa-google"></i></option>
              <option value="startpage">Startpage</option>
              <option value="searx">Searx</option>
              <option value="filepursuit">FilePursuit</option>
            </select>
          </div>
        </div>
        <div class="row g-2 mb-3">
          <div class="col-6 col-md-3">
            <select class="form-select" id="sortBySelect">
              <option value="default">Default</option>
              <option value="date">Date</option>
              <option value="name">Name</option>
              <option value="size">Size</option>
            </select>
          </div>
          <div class="col-6 col-md-3">
            <select class="form-select" id="sortOrderSelect">
              <option value="asc">Ascending</option>
              <option value="desc" selected>Descending</option>
            </select>
          </div>
          <div class="col-12 col-md-6 d-grid">
            <button type="submit" class="btn btn-primary"><i class="fas fa-search"></i> Search</button>
          </div>
        </div>
      </form>
    </div>
  </div>
  <!-- Bootstrap JS Bundle -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <!-- Custom JS -->
  <script type="module" src="MediaFinder.js"></script>
</body>
</html>
```

SubPages\MediaFinder\MediaFinder.js:
```js
// Handle form submission
document.getElementById('searchForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const query = document.getElementById('query').value.trim();
  const fileType = document.getElementById('filetypeSelect').value;
  const resType = document.getElementById('filetypeSelect').selectedOptions[0].dataset.restype || "all";
  const engine = document.getElementById('engineSelect').value;
  const sortBy = document.getElementById('sortBySelect').value;
  const sortOrder = document.getElementById('sortOrderSelect').value;
  if (!query) {
    alert("Please enter a search term.");
    return;
  }
  // Build query with file types
  let finalQuery = "";
  if (fileType === "-1") {
    finalQuery = `${query} -inurl:(jsp|pl|php|html|aspx|htm|cf|shtml) intitle:index.of`;
  } else {
    finalQuery = `${query} +(${fileType}) -inurl:(jsp|pl|php|html|aspx|htm|cf|shtml) intitle:index.of`;
  }
  let url = "";
  switch (engine) {
    case "google":
      // Google date sort fix
      let tbs = "";
      if (sortBy === "date") {
        tbs = sortOrder === "desc" ? "qdr:m" : "qdr:y"; // descending = last month, ascending = last year
      }
      url = `https://www.google.com/search?q=${encodeURIComponent(finalQuery)}` + (tbs ? `&tbs=${tbs}` : "");
      break;
    case "startpage":
      url = `https://www.startpage.com/do/dsearch?query=${encodeURIComponent(finalQuery)}`;
      if (sortBy === "date") url += `&with_date=1&sort=${sortOrder}`;
      break;
    case "searx":
      url = `https://searx.me/?q=${encodeURIComponent(finalQuery)}`;
      if (sortBy === "date") url += `&sort=date_${sortOrder}`;
      else if (sortBy === "size") url += `&sort=filesize_${sortOrder}`;
      break;
    case "filepursuit":
      let fpSort = "datedesc";
      if (sortBy === "date") fpSort = sortOrder === "asc" ? "dateasc" : "datedesc";
      else if (sortBy === "size") fpSort = sortOrder === "asc" ? "sizeasc" : "sizedesc";
      else if (sortBy === "name") fpSort = sortOrder === "asc" ? "nameasc" : "namedesc";
      url = `https://filepursuit.com/pursuit?q=${encodeURIComponent(query)}&type=${resType}&sort=${fpSort}`;
      break;
  }
  window.open(url, "_blank");
});
```

SubPages\NBT\NBT.css:
```css
details summary {
  cursor: pointer;
  padding: 0.5rem;
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 5px;
}
details[open] summary {
  background: #e9ecef;
  font-weight: bold;
}
form input, form textarea {
  max-width: 500px;
}
```

SubPages\NBT\NBT.html:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Newspaper Business Tracker</title>
  <!-- CDN loader -->
  <script>
    fetch('../../Assets/Utils/cdn.html')
      .then(r => r.text())
      .then(d => document.head.insertAdjacentHTML('beforeend', d));
  </script>
  <!-- jQuery (needed for bootstrap-select) -->
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <!-- Bootstrap 5 JS Bundle -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
  <!-- Bootstrap-select -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/css/bootstrap-select.min.css">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/js/bootstrap-select.min.js"></script>
  <!-- Custom CSS -->
  <link rel="stylesheet" href="NBT.css" />
</head>
<body class="container my-5">
  <h2 class="text-center mb-4">📰 Newspaper Business Tracker</h2>
  <!-- Billing -->
  <details class="mb-3">
    <summary class="h5">Billing</summary>
    <form id="billingForm" class="mt-3">
      <div class="input-group mb-2">
        <select class="form-select selectpicker" data-live-search="true" multiple id="billingCustomer" name="customer[]">
          <!-- Options will be loaded dynamically -->
        </select>
        <button class="btn btn-outline-secondary" type="button" id="addBillingCustomer">+ New Customer</button>
      </div>
      <div class="input-group mb-2">
        <input type="date" class="form-control" name="date" id="billingDate" required>
        <button class="btn btn-outline-secondary" type="button" onclick="document.getElementById('billingDate').value = new Date().toISOString().split('T')[0]">📅 Today</button>
      </div>
      <input type="number" class="form-control mb-2" name="amount" placeholder="Amount Paid" required>
      <input type="number" class="form-control mb-2" name="advance" placeholder="Advance (if any)">
      <textarea class="form-control mb-2" name="description" rows="2" placeholder="Description / Notes"></textarea>
      <button class="btn btn-primary">Save Billing</button>
    </form>
    <div class="mt-3">
      <button class="btn btn-sm btn-outline-primary" id="refreshBilling">🔄 Refresh Records</button>
      <table class="table table-sm table-striped mt-2" id="billingTable">
        <thead><tr><th>Customer</th><th>Date</th><th>Amount</th><th>Advance</th><th>Description</th></tr></thead>
        <tbody></tbody>
      </table>
    </div>
  </details>
  <!-- Retail -->
  <details class="mb-3">
    <summary class="h5">Retail Sell</summary>
    <form id="retailForm" class="mt-3">
      <div class="input-group mb-2">
        <select class="form-select selectpicker" data-live-search="true" multiple id="retailCustomer" name="customer[]">
          <!-- Options will be loaded dynamically -->
        </select>
        <button class="btn btn-outline-secondary" type="button" id="addRetailCustomer">+ New Customer</button>
      </div>
      <div class="input-group mb-2">
        <input type="date" class="form-control" name="date" id="retailDate" required>
        <button class="btn btn-outline-secondary" type="button" onclick="document.getElementById('retailDate').value = new Date().toISOString().split('T')[0]">📅 Today</button>
      </div>
      <input type="number" class="form-control mb-2" name="amount" placeholder="Total Amount" required>
      <input type="number" class="form-control mb-2" name="paid" placeholder="Paid Amount" required>
      <input type="number" class="form-control mb-2" name="remaining" placeholder="Remaining" readonly>
      <textarea class="form-control mb-2" name="description" rows="2" placeholder="Description / Notes"></textarea>
      <button class="btn btn-success">Save Retail</button>
    </form>
    <div class="mt-3">
      <button class="btn btn-sm btn-outline-success" id="refreshRetail">🔄 Refresh Records</button>
      <table class="table table-sm table-striped mt-2" id="retailTable">
        <thead><tr><th>Customer</th><th>Date</th><th>Amount</th><th>Paid</th><th>Remaining</th><th>Description</th></tr></thead>
        <tbody></tbody>
      </table>
    </div>
  </details>
  <!-- New Changes -->
  <details class="mb-3">
    <summary class="h5">New Changes</summary>
    <form id="changesForm" class="mt-3">
      <!-- Customer -->
      <div class="input-group mb-2">
        <select class="form-select selectpicker" data-live-search="true" multiple id="changesCustomer" name="customer[]">
          <!-- Options will be loaded dynamically -->
        </select>
        <button class="btn btn-outline-secondary" type="button" id="addChangesCustomer">+ New Customer</button>
      </div>
      <!-- Date -->
      <div class="input-group mb-2">
        <input type="date" class="form-control" name="date" id="changesDate" required>
        <button class="btn btn-outline-secondary" type="button" onclick="document.getElementById('changesDate').value = new Date().toISOString().split('T')[0]">📅 Today</button>
      </div>
      <!-- Paper -->
      <div class="input-group mb-2">
        <select class="form-select selectpicker" data-live-search="true" id="paperSelect" name="paper">
          <!-- Options will be loaded dynamically -->
        </select>
        <button class="btn btn-outline-secondary" type="button" id="addPaper">+ New Paper</button>
      </div>
      <!-- Description -->
      <textarea class="form-control mb-2" name="description" rows="3" placeholder="Describe the change"></textarea>
      <button class="btn btn-warning">Save Change</button>
    </form>
    <div class="mt-3">
      <button class="btn btn-sm btn-outline-warning" id="refreshChanges">🔄 Refresh Records</button>
      <table class="table table-sm table-striped mt-2" id="changesTable">
        <thead><tr><th>Customer</th><th>Date</th><th>Paper</th><th>Description</th></tr></thead>
        <tbody></tbody>
      </table>
    </div>
  </details>
  <!-- Status -->
  <div id="status" class="mt-4 text-center text-muted"></div>
  <!-- App JS -->
  <script type="module" src="NBT.js"></script>
</body>
</html>
```

SubPages\NBT\NBT.js:
```js
import { initBilling } from "./SubJS/billing.js";
import { initRetail } from "./SubJS/retail.js";
import { initChanges } from "./SubJS/changes.js";
document.addEventListener("DOMContentLoaded", () => {
  initBilling();
  initRetail();
  initChanges();
});
```

SubPages\NBT\SubJS\billing.js:
```js
import { sendToSheet, fetchFromSheet, sendToWhatsApp, showStatus } from "./utils.js";
export function initBilling() {
  const form = document.getElementById("billingForm");
  const tableBody = document.querySelector("#billingTable tbody");
  const refreshBtn = document.getElementById("refreshBilling");
  const addCustomerBtn = document.getElementById("addBillingCustomer");
  const customerSelect = document.getElementById("billingCustomer");
  if (!form) return;
  // Save form
  form.addEventListener("submit", async e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      await sendToSheet(data, "billing");
      showStatus("Billing saved ✅");
      const message = `🧾 *Billing Record*
👤 Customer: ${data["customer[]"]}
📅 Date: ${data.date}
💰 Amount: ₹${data.amount}
💵 Advance: ₹${data.advance || 0}
📝 Note: ${data.description || "-"}`;
      sendToWhatsApp(message);
      form.reset();
      loadRecords();
    } catch (err) {
      console.error(err);
      showStatus("Error saving billing ❌", true);
    }
  });
  // Refresh button
  if (refreshBtn) refreshBtn.addEventListener("click", loadRecords);
  // Add new customer
  if (addCustomerBtn) {
    addCustomerBtn.addEventListener("click", () => {
      const name = prompt("Enter new customer name:");
      if (name) {
        const option = new Option(name, name, true, true);
        customerSelect.add(option);
        // Refresh bootstrap-select
        $(customerSelect).selectpicker("refresh");
      }
    });
  }
  // Load records into table
  async function loadRecords() {
    const rows = await fetchFromSheet("billing");
    tableBody.innerHTML = rows
      .map(
        r => `<tr>
          <td>${r.Customer}</td>
          <td>${r.Date}</td>
          <td>${r.Amount}</td>
          <td>${r.Advance}</td>
          <td>${r.Description}</td>
        </tr>`
      )
      .join("");
  }
  loadRecords();
}
```

SubPages\NBT\SubJS\changes.js:
```js
import { sendToSheet, fetchFromSheet, sendToWhatsApp, showStatus } from "./utils.js";
export function initChanges() {
  const form = document.getElementById("changesForm");
  const tableBody = document.querySelector("#changesTable tbody");
  const refreshBtn = document.getElementById("refreshChanges");
  const addCustomerBtn = document.getElementById("addChangesCustomer");
  const addPaperBtn = document.getElementById("addPaper");
  const customerSelect = document.getElementById("changesCustomer");
  const paperSelect = document.getElementById("paperSelect");
  if (!form) return;
  // Save form
  form.addEventListener("submit", async e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      await sendToSheet(data, "changes");
      showStatus("Change saved ✅");
      const message = `📰 *Change Record*
👤 Customer: ${data["customer[]"]}
📅 Date: ${data.date}
🗞️ Paper: ${data.paper}
📝 Change: ${data.description || "-"}`;
      sendToWhatsApp(message);
      form.reset();
      loadRecords();
    } catch (err) {
      console.error(err);
      showStatus("Error saving change ❌", true);
    }
  });
  // Refresh button
  if (refreshBtn) refreshBtn.addEventListener("click", loadRecords);
  // Add new customer
  if (addCustomerBtn) {
    addCustomerBtn.addEventListener("click", () => {
      const name = prompt("Enter new customer name:");
      if (name) {
        const option = new Option(name, name, true, true);
        customerSelect.add(option);
        $(customerSelect).selectpicker("refresh");
      }
    });
  }
  // Add new paper
  if (addPaperBtn) {
    addPaperBtn.addEventListener("click", () => {
      const paper = prompt("Enter new paper name:");
      if (paper) {
        const option = new Option(paper, paper, true, true);
        paperSelect.add(option);
        $(paperSelect).selectpicker("refresh");
      }
    });
  }
  // Load records into table
  async function loadRecords() {
    const rows = await fetchFromSheet("changes");
    tableBody.innerHTML = rows
      .map(
        r => `<tr>
          <td>${r.Customer}</td>
          <td>${r.Date}</td>
          <td>${r.Paper}</td>
          <td>${r.Description}</td>
        </tr>`
      )
      .join("");
  }
  loadRecords();
}
```

SubPages\NBT\SubJS\retail.js:
```js
import { sendToSheet, fetchFromSheet, sendToWhatsApp, showStatus } from "./utils.js";
export function initRetail() {
  const form = document.getElementById("retailForm");
  const tableBody = document.querySelector("#retailTable tbody");
  const refreshBtn = document.getElementById("refreshRetail");
  const addCustomerBtn = document.getElementById("addRetailCustomer");
  const customerSelect = document.getElementById("retailCustomer");
  if (!form) return;
  const paidInput = form.querySelector("[name=paid]");
  const amountInput = form.querySelector("[name=amount]");
  const remainingInput = form.querySelector("[name=remaining]");
  // Auto-calc remaining
  [amountInput, paidInput].forEach(input =>
    input.addEventListener("input", () => {
      const amount = parseFloat(amountInput.value) || 0;
      const paid = parseFloat(paidInput.value) || 0;
      remainingInput.value = amount - paid;
    })
  );
  // Save form
  form.addEventListener("submit", async e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      await sendToSheet(data, "retail");
      showStatus("Retail saved ✅");
      const message = `🏪 *Retail Record*
👤 Customer: ${data["customer[]"]}
📅 Date: ${data.date}
💰 Total: ₹${data.amount}
💵 Paid: ₹${data.paid}
💳 Remaining: ₹${data.remaining}
📝 Note: ${data.description || "-"}`;
      sendToWhatsApp(message);
      form.reset();
      remainingInput.value = "";
      loadRecords();
    } catch (err) {
      console.error(err);
      showStatus("Error saving retail ❌", true);
    }
  });
  // Refresh button
  if (refreshBtn) refreshBtn.addEventListener("click", loadRecords);
  // Add new customer
  if (addCustomerBtn) {
    addCustomerBtn.addEventListener("click", () => {
      const name = prompt("Enter new customer name:");
      if (name) {
        const option = new Option(name, name, true, true);
        customerSelect.add(option);
        // Refresh bootstrap-select
        $(customerSelect).selectpicker("refresh");
      }
    });
  }
  // Load records into table
  async function loadRecords() {
    const rows = await fetchFromSheet("retail");
    tableBody.innerHTML = rows
      .map(
        r => `<tr>
          <td>${r.Customer}</td>
          <td>${r.Date}</td>
          <td>${r.Amount}</td>
          <td>${r.Paid}</td>
          <td>${r.Remaining}</td>
          <td>${r.Description}</td>
        </tr>`
      )
      .join("");
  }
  loadRecords();
}
```

SubPages\NBT\SubJS\utils.js:
```js
import BINGO from "../../Assets/Utils/Bingo.js";
export async function sendToSheet(data, type) {
  try {
    const res = await fetch(`${BINGO.SheetConfig.url}?type=${type}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    });
    return await res.json();
  } catch (err) {
    console.error("Error sending to sheet:", err);
  }
}
export async function fetchFromSheet(type) {
  try {
    const res = await fetch(`${BINGO.SheetConfig.url}?type=${type}`);
    return await res.json();
  } catch (err) {
    console.error("Error fetching from sheet:", err);
    return [];
  }
}
// ✅ WhatsApp Integration
export function sendToWhatsApp(message, number = BINGO.WhatsAppNumber) {
  if (!number) {
    console.error("WhatsApp number not set in Bingo.js");
    return;
  }
  const encodedMsg = encodeURIComponent(message);
  const url = `https://wa.me/${number}?text=${encodedMsg}`;
  window.open(url, "_blank");
}
// ✅ Status Helper
export function showStatus(msg, isError = false) {
  const status = document.getElementById("status");
  if (!status) return;
  status.textContent = msg;
  status.className = isError ? "text-danger" : "text-success";
  setTimeout(() => (status.textContent = ""), 3000);
}
```

SubPages\Promter\Prompter.css:
```css
/* Mobile-first responsive design */
body {
    background-color: #f8f9fa;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
/* Password Protection Container */
.password-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    text-align: center;
    background-color: #f8f9fa;
}
/* Card styling consistent with portfolio */
.card {
    border: none;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
    transition: box-shadow 0.15s ease-in-out;
}
.card:hover {
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}
.card-header {
    background-color: #fff;
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
    font-weight: 600;
}
/* Copy area styling */
#copyArea {
    font-family: 'Courier New', Courier, monospace;
    font-size: 0.9rem;
    line-height: 1.5;
    resize: vertical;
    background-color: #f8f9fa;
    color: #495057;
}
#copyArea:focus {
    background-color: #fff;
    box-shadow: none;
}
/* Generator options styling */
.generator-option {
    border: 1px solid rgba(0, 0, 0, 0.125);
    transition: all 0.2s ease-in-out;
    text-align: left;
}
.generator-option:hover {
    background-color: rgba(0, 0, 0, 0.05);
    transform: translateY(-1px);
}
.generator-option.active {
    background-color: #0d6efd;
    border-color: #0d6efd;
    color: white;
}
.generator-option.active .text-muted {
    color: rgba(255, 255, 255, 0.8) !important;
}
.generator-option.active i {
    color: rgba(255, 255, 255, 0.9) !important;
}
/* Button styling */
.btn-primary {
    background-color: #0d6efd;
    border-color: #0d6efd;
    font-weight: 500;
}
.btn-primary:hover {
    background-color: #0b5ed7;
    border-color: #0a58ca;
    transform: translateY(-1px);
}
.btn-outline-primary {
    border-color: #0d6efd;
    color: #0d6efd;
}
.btn-outline-primary:hover {
    background-color: #0d6efd;
    border-color: #0d6efd;
}
/* Form controls */
.form-control:focus {
    border-color: #86b7fe;
    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}
/* Toast styling */
.toast {
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}
/* Mobile responsive adjustments */
@media (max-width: 991.98px) {
    .container {
        padding: 0 15px;
    }
    .card-body {
        padding: 1rem;
    }
    #copyArea {
        font-size: 0.85rem;
    }
}
@media (max-width: 767.98px) {
    .display-5 {
        font-size: 2rem;
    }
    .lead {
        font-size: 1rem;
    }
    .card-header h5 {
        font-size: 1rem;
    }
    .generator-option h6 {
        font-size: 0.9rem;
    }
    .generator-option small {
        font-size: 0.75rem;
    }
    #copyArea {
        font-size: 0.8rem;
        min-height: 300px;
    }
    #inputText {
        font-size: 0.9rem;
    }
}
@media (max-width: 575.98px) {
    .container {
        padding: 0 10px;
    }
    .row.g-4 {
        gap: 1rem !important;
    }
    .card-body {
        padding: 0.75rem;
    }
    .display-5 {
        font-size: 1.75rem;
    }
    .generator-option .d-flex {
        flex-direction: column;
        text-align: center;
    }
    .generator-option i {
        margin-bottom: 0.5rem;
        margin-right: 0 !important;
    }
}
/* Animation for copy button */
#copyBtn.copied {
    background-color: #198754;
    border-color: #198754;
    color: white;
}
/* Loading state */
.loading {
    opacity: 0.6;
    pointer-events: none;
}
.loading #generateBtn::after {
    content: '';
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border: 2px solid #fff;
    border-radius: 50%;
    border-top-color: transparent;
    animation: spin 0.8s linear infinite;
    margin-left: 0.5rem;
}
@keyframes spin {
    to { transform: rotate(360deg); }
}
/* Shake animation for password error */
@keyframes shake {
    0% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    50% { transform: translateX(5px); }
    75% { transform: translateX(-5px); }
    100% { transform: translateX(0); }
}
.shake {
    animation: shake 0.4s;
}
/* Line Numbers Styling */
.output-container {
    display: flex;
    height: 400px;
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 0.375rem;
    overflow: hidden;
}
.output-container > div {
    overflow-y: auto;
    height: 100%;
}
.line-numbers {
    width: 50px;
    background-color: #e9ecef;
    border-right: 1px solid #dee2e6;
    padding: 10px 5px;
    text-align: right;
    font-family: 'Courier New', monospace;
    font-size: 14px;
    color: #6c757d;
    user-select: none;
    line-height: 1.5;
    white-space: pre;
    overflow: hidden;
}
.output-text {
    flex: 1;
    padding: 10px;
    font-family: 'Courier New', monospace;
    font-size: 14px;
    line-height: 1.5;
    white-space: pre-wrap;
    overflow-wrap: break-word;
    background-color: #fff;
}
.output-text:empty:before {
    content: "Generated text will appear here...";
    color: #6c757d;
    font-style: italic;
}
```

SubPages\Promter\Prompter.html:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VC Helper</title>
    <!-- CDN Links -->
    <script>
        fetch('../../Assets/Utils/cdn.html')
        .then(response => response.text())
        .then(data => document.head.insertAdjacentHTML('beforeend', data));
    </script>
    <!-- CDN Links -->
    <link rel="stylesheet" href="../../style.css">
    <link rel="stylesheet" href="./Prompter.css">
</head>
<body>
    <!-- Password Protection -->
    <div id="password-protection" class="password-container">
        <div class="card p-4 shadow-sm" style="max-width: 400px; width: 100%;">
            <h4 class="card-title text-center mb-4">Enter Password to Access VC Helper</h4>
            <div class="mb-3">
                <input type="password" class="form-control" id="passwordInput" placeholder="Enter extended PI value">
            </div>
            <button class="btn btn-primary" id="submitPassword">Access Tool</button>
            <p id="passwordError" class="text-danger mt-3 d-none">Incorrect password. Please try again.</p>
        </div>
    </div>
    <!-- Prompter Content -->
    <div id="prompter-content" class="container my-5 d-none">
        <header class="text-center mb-5">
            <h1 class="display-5">VC Helper</h1>
        </header>
        <main class="row g-4">
            <!-- Controls Section -->
            <section class="col-lg-5">
                <div class="card h-100">
                    <div class="card-header">
                        <h5 class="mb-0">Generation Options</h5>
                    </div>
                    <div class="card-body">
                        <!-- Generation Options -->
                        <div class="mb-4">
                            <label class="form-label fw-bold">Select Generator Type:</label>
                            <div class="list-group">
                                <button class="list-group-item list-group-item-action generator-option" data-type="file-folder">
                                    <div class="d-flex align-items-center">
                                        <i class="fas fa-folder-tree me-3 text-primary"></i>
                                        <div>
                                            <h6 class="mb-1">File & Folder Generator</h6>
                                            <small class="text-muted">Generate file and folder structure templates</small>
                                        </div>
                                    </div>
                                </button>
                                <button class="list-group-item list-group-item-action generator-option" data-type="entire-code">
                                    <div class="d-flex align-items-center">
                                        <i class="fas fa-code me-3 text-success"></i>
                                        <div>
                                            <h6 class="mb-1">Entire Code Generator</h6>
                                            <small class="text-muted">Generate complete code templates</small>
                                        </div>
                                    </div>
                                </button>
                                <button class="list-group-item list-group-item-action generator-option" data-type="snippet">
                                    <div class="d-flex align-items-center">
                                        <i class="fas fa-scissors me-3 text-warning"></i>
                                        <div>
                                            <h6 class="mb-1">Snippet Generator</h6>
                                            <small class="text-muted">Generate code snippets and patterns</small>
                                        </div>
                                    </div>
                                </button>
                                <button class="list-group-item list-group-item-action generator-option" data-type="error-handler">
                                    <div class="d-flex align-items-center">
                                        <i class="fas fa-bug me-3 text-danger"></i>
                                        <div>
                                            <h6 class="mb-1">Error Handler</h6>
                                            <small class="text-muted">Generate debugging and error handling prompts</small>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                        <!-- Input Text Area -->
                        <div class="mb-4">
                            <label for="inputText" class="form-label fw-bold">Custom Input:</label>
                            <textarea 
                                id="inputText" 
                                class="form-control" 
                                rows="4" 
                                placeholder="Enter your custom requirements or context here..."></textarea>
                        </div>
                        <!-- Generate Button -->
                        <button class="btn btn-primary w-100" id="generateBtn">
                            <i class="fas fa-magic me-2"></i>Generate Prompt
                        </button>
                        <!-- Additional Options -->
                        <div class="mt-3">
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" id="strictRule" checked>
                                <label class="form-check-label" for="strictRule">
                                    Strict Rule
                                </label>
                            </div>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" id="includeComments">
                                <label class="form-check-label" for="includeComments">
                                    Include Comments
                                </label>
                            </div>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" id="includeExamples">
                                <label class="form-check-label" for="includeExamples">
                                    Include Examples
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- Copy Area Section -->
            <section class="col-lg-7">
                <div class="card h-100">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h5 class="mb-0">Generated Output</h5>
                        <button class="btn btn-sm btn-outline-primary" id="copyBtn" onclick="copyToClipboard()">
                            <i class="fas fa-copy"></i> Copy
                        </button>
                    </div>
                    <div class="card-body p-0">
                        <div class="output-container" id="outputContainer">
                            <div class="line-numbers" id="lineNumbers"></div>
                            <div class="output-text" id="copyArea" contenteditable="false">Generated text will appear here...</div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </div>
    <!-- Toast Notification -->
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
            <div id="copyToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                    <i class="fas fa-check-circle text-success me-2"></i>
                    <strong class="me-auto">Copied!</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                    Text copied to clipboard successfully!
                </div>
            </div>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossorigin="anonymous"></script>
    <script type="module" src="./scipts/PromptProtection.js"></script>
    <script src="./scipts/Prompter.js"></script>
</body>
</html>
```

SubPages\Promter\scipts\Prompter.js:
```js
// Coding Helper Prompter JavaScript
class Prompter {
    constructor() {
        this.selectedGenerator = null;
        this.templates = {};
        this.init();
    }
    async init() {
        await this.loadTemplates();
        this.attachEventListeners();
        this.setupToast();
    }
    async loadTemplates() {
        try {
            const response = await fetch('./scipts/PD_Prompt.json');
            const data = await response.json();
            this.templates = data.generators;
        } catch (error) {
            console.error('Error loading templates:', error);
            this.showNotification('Error loading prompt templates', 'danger');
        }
    }
    attachEventListeners() {
        // Generator option selection
        document.querySelectorAll('.generator-option').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.selectGenerator(e.currentTarget);
            });
        });
        // Generate button
        document.getElementById('generateBtn').addEventListener('click', () => {
            this.generatePrompt();
        });
        // Copy button
        document.getElementById('copyBtn').addEventListener('click', () => {
            this.copyToClipboard();
        });
        // Enter key in input area
        document.getElementById('inputText').addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter') {
                this.generatePrompt();
            }
        });
    }
    setupToast() {
        this.toastElement = document.getElementById('copyToast');
        this.toast = new bootstrap.Toast(this.toastElement);
        // Setup synchronized scrolling
        this.setupScrollSync();
    }
    setupScrollSync() {
        const lineNumbers = document.getElementById('lineNumbers');
        const copyArea = document.getElementById('copyArea');
        // Sync scroll from text to line numbers
        copyArea.addEventListener('scroll', () => {
            lineNumbers.scrollTop = copyArea.scrollTop;
        });
        // Sync scroll from line numbers to text
        lineNumbers.addEventListener('scroll', () => {
            copyArea.scrollTop = lineNumbers.scrollTop;
        });
    }
    selectGenerator(element) {
        // Remove active class from all options
        document.querySelectorAll('.generator-option').forEach(btn => {
            btn.classList.remove('active');
        });
        // Add active class to selected option
        element.classList.add('active');
        this.selectedGenerator = element.dataset.type;
        // Auto-generate if there's input text
        const inputText = document.getElementById('inputText').value.trim();
        if (inputText) {
            this.generatePrompt();
        }
    }
    generatePrompt() {
        if (!this.selectedGenerator) {
            this.showNotification('Please select a generator type first', 'warning');
            return;
        }
        const inputText = document.getElementById('inputText').value.trim();
        if (!inputText) {
            this.showNotification('Please enter your requirements in the input area', 'warning');
            return;
        }
        // Add loading state
        const generateBtn = document.getElementById('generateBtn');
        generateBtn.classList.add('loading');
        generateBtn.disabled = true;
        // Get template and process it
        const template = this.templates[this.selectedGenerator];
        const processedPrompt = this.processTemplate(template.template, inputText);
        // Update copy area (simulate processing time)
        setTimeout(() => {
            const copyArea = document.getElementById('copyArea');
            copyArea.textContent = processedPrompt;
            // Update line numbers
            this.updateLineNumbers(processedPrompt);
            // Remove loading state
            generateBtn.classList.remove('loading');
            generateBtn.disabled = false;
            // Show success notification
            this.showNotification('Prompt generated successfully!', 'success');
        }, 500);
    }
    processTemplate(templateStr, customInput) {
        const includeComments = document.getElementById('includeComments').checked;
        const includeExamples = document.getElementById('includeExamples').checked;
        const strictRule = document.getElementById('strictRule').checked;
        const generatorData = this.templates[this.selectedGenerator];
        let result = templateStr
            .replace(/{customInput}/g, customInput)
            .replace(/{projectType}/g, this.extractProjectType(customInput))
            .replace(/{language}/g, this.extractLanguage(customInput))
            .replace(/{framework}/g, this.extractFramework(customInput))
            .replace(/{functionality}/g, this.extractFunctionality(customInput))
            .replace(/{architecture}/g, this.extractArchitecture(customInput))
            .replace(/{errorType}/g, this.extractErrorType(customInput))
            .replace(/{environment}/g, this.extractEnvironment(customInput))
            .replace(/{stackTrace}/g, this.extractStackTrace(customInput));
        // Handle conditional sections (remove if both comments and examples are disabled)
        if (!includeComments && !includeExamples && generatorData.conditionalSection) {
            result = result.replace(/{conditionalSection}\n/g, '');
        } else if (generatorData.conditionalSection) {
            let conditionalContent = generatorData.conditionalSection;
            // Replace comments and examples within conditional section
            if (includeComments && generatorData.comments) {
                conditionalContent = conditionalContent.replace(/{includeComments}/g, generatorData.comments);
            } else {
                conditionalContent = conditionalContent.replace(/{includeComments}\n?/g, '');
            }
            if (includeExamples && generatorData.examples) {
                conditionalContent = conditionalContent.replace(/{includeExamples}/g, generatorData.examples);
            } else {
                conditionalContent = conditionalContent.replace(/{includeExamples}\n?/g, '');
            }
            result = result.replace(/{conditionalSection}/g, conditionalContent);
        }
        // Handle comments and examples outside conditional sections
        if (includeComments && generatorData.comments) {
            result = result.replace(/{includeComments}/g, generatorData.comments);
        } else {
            result = result.replace(/{includeComments}\n?/g, '');
        }
        if (includeExamples && generatorData.examples) {
            result = result.replace(/{includeExamples}/g, generatorData.examples);
        } else {
            result = result.replace(/{includeExamples}\n?/g, '');
        }
        // Handle strict rule
        if (strictRule && generatorData.strictRule) {
            result = result.replace(/{strictRule}/g, generatorData.strictRule);
        } else {
            result = result.replace(/{strictRule}/g, '');
        }
        // Replace any remaining placeholders
        result = result.replace(/{[^}]+}/g, '[SPECIFY]');
        // Clean up extra newlines
        result = result.replace(/\n\n\n+/g, '\n\n').trim();
        return result;
    }
    extractProjectType(input) {
        const patterns = [
            /web app|website|web application/gi,
            /mobile app|android|ios/gi,
            /api|rest api|graphql/gi,
            /desktop app|windows app|mac app/gi,
            /cli|command line|terminal/gi
        ];
        for (let pattern of patterns) {
            if (pattern.test(input)) {
                return pattern.source.replace(/[\\\/]/gi, '').replace(/\s+/g, ' ');
            }
        }
        return 'project';
    }
    extractLanguage(input) {
        const languages = ['javascript', 'python', 'java', 'c#', 'c++', 'php', 'ruby', 'go', 'rust', 'typescript'];
        for (let lang of languages) {
            if (input.toLowerCase().includes(lang)) {
                return lang;
            }
        }
        return 'JavaScript';
    }
    extractFramework(input) {
        const frameworks = [
            'react', 'angular', 'vue', 'svelte',
            'express', 'django', 'flask', 'spring',
            'laravel', 'rails', 'nextjs', 'nuxt'
        ];
        for (let framework of frameworks) {
            if (input.toLowerCase().includes(framework)) {
                return framework;
            }
        }
        return 'Vanilla';
    }
    extractFunctionality(input) {
        // Simple extraction - can be enhanced
        if (input.toLowerCase().includes('login') || input.toLowerCase().includes('auth')) {
            return 'authentication system';
        }
        if (input.toLowerCase().includes('database') || input.toLowerCase().includes('db')) {
            return 'database operations';
        }
        if (input.toLowerCase().includes('api') || input.toLowerCase().includes('endpoint')) {
            return 'API endpoint';
        }
        return 'functionality';
    }
    extractArchitecture(input) {
        if (input.toLowerCase().includes('mvc')) return 'MVC';
        if (input.toLowerCase().includes('component')) return 'Component-based';
        if (input.toLowerCase().includes('service')) return 'Service-oriented';
        return 'MVC';
    }
    extractErrorType(input) {
        if (input.toLowerCase().includes('null') || input.toLowerCase().includes('undefined')) {
            return 'Null/Undefined Reference';
        }
        if (input.toLowerCase().includes('syntax')) return 'Syntax Error';
        if (input.toLowerCase().includes('network') || input.toLowerCase().includes('fetch')) {
            return 'Network Error';
        }
        return 'Runtime Error';
    }
    extractEnvironment(input) {
        if (input.toLowerCase().includes('production')) return 'Production';
        if (input.toLowerCase().includes('development') || input.toLowerCase().includes('dev')) {
            return 'Development';
        }
        if (input.toLowerCase().includes('test')) return 'Testing';
        return 'Development';
    }
    extractStackTrace(input) {
        // Look for stack trace patterns
        const stackPattern = /at\s+[\w.]+\s*\(.+\)/g;
        const match = input.match(stackPattern);
        return match ? match.join('\n') : 'Not provided';
    }
    updateLineNumbers(text) {
        const lineNumbers = document.getElementById('lineNumbers');
        const lines = text.split('\n').length;
        // Generate line numbers
        let lineNumbersHtml = '';
        for (let i = 1; i <= lines; i++) {
            lineNumbersHtml += i + '\n';
        }
        lineNumbers.textContent = lineNumbersHtml;
    }
    async copyToClipboard() {
        const copyBtn = document.getElementById('copyBtn');
        const copyArea = document.getElementById('copyArea');
        if (!copyArea.textContent.trim() || copyArea.textContent === 'Generated text will appear here...') {
            this.showNotification('Nothing to copy. Generate a prompt first!', 'warning');
            return;
        }
        try {
            await navigator.clipboard.writeText(copyArea.textContent);
            // Visual feedback
            copyBtn.classList.add('copied');
            copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            // Show toast
            this.toast.show();
            // Reset button after delay
            setTimeout(() => {
                copyBtn.classList.remove('copied');
                copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
            }, 2000);
        } catch (err) {
            // Fallback for older browsers
            const range = document.createRange();
            range.selectNodeContents(copyArea);
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            document.execCommand('copy');
            this.toast.show();
        }
    }
    showNotification(message, type = 'info') {
        // Create a simple notification (can be enhanced with Bootstrap alerts)
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
        notification.style.cssText = 'top: 20px; right: 20px; z-index: 1050; min-width: 300px;';
        notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        document.body.appendChild(notification);
        // Auto-remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
    }
}
// Initialize the prompter when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Prompter();
});
```

SubPages\Sequencer\Sequencer.css:
```css
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    min-height: 100vh; /* Keep this to ensure the body takes at least the full viewport height */
    background-color: #e9ecef;
    margin: 0;
    color: #343a40;
    box-sizing: border-box; /* Ensures padding is included in the element's total width and height */
}
.game-container {
    text-align: center;
    width: 95%;
    max-width: 1400px;
    padding: 20px;
    /* Remove position and z-index if they are not specifically needed for other layering */
    position: relative; /* Keep this if you have absolutely positioned elements inside */
    top: 0; /* Ensures it starts at the top of its containing block */
    margin: 0 auto; /* Centers the container horizontally */
    z-index: 1; /* Keep if needed for layering */
}
/* Game area layout */
.game-area {
    display: flex;
    flex-wrap: nowrap;
    gap: 20px;
    margin-bottom: 20px;
    height: calc(100vh - 300px);
    position: relative;
    z-index: 1;
}
/* Left side - Table area */
.table-container {
    flex: 1;
    min-width: 49%;
    overflow: auto;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    padding: 15px;
}
/* Right side - Tiles area */
.tiles-container {
    flex: 1;
    min-width: 49%;
    display: flex;
    flex-direction: column;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    padding: 15px;
}
/* Table responsive styles */
.table-responsive {
    width: 100%;
    overflow-x: auto;
    overflow-y: auto;
        min-height: 300px;
    max-height: 70vh;
}
.headings-container {
    display: inline-grid;
    gap: 5px;
    width: 100%;
    margin-bottom: 5px;
}
.heading-tile {
    font-weight: bold;
    padding: 10px;
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 0.25rem;
    box-shadow: 0 1px 2px rgba(0,0,0,0.05);
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.drop-zones-container {
    display: inline-grid;
    gap: 5px;
    min-height: 200px;
    width: 100%;
}
.drop-zone {
    border: 1px dashed #ced4da;
    min-height: 50px;
    min-width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #e9ecef;
    border-radius: 0.25rem;
    transition: background-color 0.2s ease, border-color 0.2s ease;
    padding: 5px;
    text-align: center;
    word-break: break-word;
}
.drop-zone.highlight {
    background-color: #d1e7dd;
    border-color: #198754;
}
.drop-zone.error {
    background-color: #f8d7da;
    border-color: #dc3545;
}
.shuffled-tiles-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 10px;
    min-height: 300px;
    padding: 15px;
    max-height: 70vh;
    overflow-y: auto;
    align-content: flex-start;
}
.tile {
    padding: 10px 15px;
    background-color: #0d6efd;
    color: white;
    border-radius: 0.25rem;
    cursor: grab;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
    transition: transform 0.2s ease-in-out, background-color 0.2s ease;
    animation: popIn 0.3s ease-out forwards;
    animation-delay: var(--animation-delay, 0s);
    max-width: 200px;
    word-break: break-word;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
}
.tile:active {
    cursor: grabbing;
    transform: scale(1.05);
}
.tile.correct {
    background-color: #198754;
}
.tile.incorrect {
    background-color: #dc3545;
}
.game-controls {
    position: relative;
    z-index: 10;
    margin-top: 20px;
    padding: 15px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
.btn {
    position: relative;
    z-index: 5;
    margin: 0 5px;
}
.feedback-message {
    position: relative;
    z-index: 5;
    font-weight: bold;
    text-align: center;
    margin: 20px 0;
    padding: 15px;
    border-radius: 8px;
}
@keyframes popIn {
    0% {
        transform: scale(0.5);
        opacity: 0;
    }
    80% {
        transform: scale(1.05);
        opacity: 1;
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
}
.hidden {
    display: none !important;
}
/* Responsive adjustments */
@media (max-width: 768px) {
    .game-area {
        flex-direction: column;
    }
    .table-container, .tiles-container {
        width: 100%;
        max-width: 100%;
    }
    .shuffled-tiles-container {
        max-height: 300px;
    }
}
```

SubPages\Sequencer\Sequencer.html:
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sequencer Memory Booster</title>
    <!-- CDN Links -->
    <script>
        fetch('../../Assets/Utils/cdn.html')
        .then(response => response.text())
        .then(data => document.head.insertAdjacentHTML('beforeend', data));
    </script>
    <!-- CDN Links -->
    <link rel="stylesheet" href="./Sequencer.css" />
  </head>
  <body>
    <div class="container game-container">
      <h3 class="text-center mb-2 text-primary">Sequencer Memory Booster</h3>
      <div id="csv-input-section" class="card card-body shadow-sm mb-4">
        <h2 class="text-center mb-3">Load Game Data</h2>
        <div class="row mb-3">
          <div class="col-md-6">
            <label for="csvPasteArea" class="form-label">Paste CSV Data:</label>
            <textarea
              id="csvPasteArea"
              class="form-control mb-2"
              rows="5"
              placeholder="Paste your CSV data here..."
            ></textarea>
            <button id="loadCsvPasteBtn" class="btn btn-secondary w-100">
              Load from Paste
            </button>
          </div>
          <div class="col-md-6">
            <label for="csvFileInput" class="form-label"
              >Upload CSV File:</label
            >
            <input
              type="file"
              id="csvFileInput"
              accept=".csv"
              class="form-control mb-2"
            />
            <button id="loadCsvFileBtn" class="btn btn-primary w-100">
              Load from File
            </button>
          </div>
        </div>
        <div id="csv-feedback" class="alert mt-3 hidden" role="alert"></div>
      </div>
      <div id="game-elements-section" class="hidden">
        <div class="mode-selection d-flex justify-content-center mb-4 gap-2">
          <button id="learningModeBtn" class="btn btn-success">
            Learning Mode
          </button>
          <button id="gameModeBtn" class="btn btn-info">Game Mode</button>
          <button id="solveFirstColumnBtn" class="btn btn-secondary">
            Solve 1st Column
          </button>
          <button id="submitBtn" class="btn btn-primary">Submit</button>
          <button id="restartBtn" class="btn btn-warning">
            <i class="bi bi-arrow-clockwise"></i>Reset
          </button>
        </div>
        <div class="game-area row">
          <div class="col-md-6">
            <div class="table-container card card-body shadow-sm">
              <h3 class="text-center mb-3">Table</h3>
              <div class="table-responsive">
                <div id="headings-container" class="headings-container"></div>
                <div
                  id="drop-zones-container"
                  class="drop-zones-container bg-light p-3 rounded"
                ></div>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="tiles-container card card-body shadow-sm">
              <h3 class="text-center mb-3">Tiles</h3>
              <div
                id="shuffled-tiles-container"
                class="shuffled-tiles-container"
              ></div>
            </div>
          </div>
        </div>
        <div
          id="feedback-message"
          class="feedback-message mt-4 alert hidden"
          role="alert"
        ></div>
      </div>
    </div>
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
      crossorigin="anonymous"
    ></script>
    <script type="module" src="./Sequencer_JSs/app.js"></script>
    <script type="module" src="./Sequencer_JSs/dataLoader.js"></script>
    <script type="module" src="./Sequencer_JSs/gameLogic.js"></script>
    <script type="module" src="./Sequencer_JSs/tileGenerator.js"></script>
    <script type="module" src="./Sequencer_JSs/uiManager.js"></script>
  </body>
</html>
```

SubPages\Sequencer\Sequencer_JSs\app.js:
```js
import { dataLoader } from './dataLoader.js';
import { tileGenerator } from './tileGenerator.js';
import { gameLogic } from './gameLogic.js';
import { uiManager } from './uiManager.js';
const csvInputSection = document.getElementById('csv-input-section');
const gameElementsSection = document.getElementById('game-elements-section');
const csvFileInput = document.getElementById('csvFileInput');
const loadCsvFileBtn = document.getElementById('loadCsvFileBtn');
const csvPasteArea = document.getElementById('csvPasteArea');
const loadCsvPasteBtn = document.getElementById('loadCsvPasteBtn');
const csvFeedback = document.getElementById('csv-feedback');
const solveFirstColumnBtn = document.getElementById('solveFirstColumnBtn'); // Get the new button
let gameData = null;
let allGameTiles = [];
let loadedTileRows = new Set();
function initApp() {
    gameLogic.init(tileGenerator, uiManager);
    setupEventListeners();
    gameElementsSection.classList.add('hidden');
    csvInputSection.classList.remove('hidden');
    console.log("App initialized.");
}
function showCsvFeedback(message, type = 'error') {
    csvFeedback.textContent = message;
    csvFeedback.className = `alert mt-3 alert-${type === 'success' ? 'success' : 'danger'}`;
    csvFeedback.classList.remove('hidden');
}
function hideCsvFeedback() {
    csvFeedback.textContent = '';
    csvFeedback.className = 'alert mt-3 hidden';
}
async function initializeGame(csvString) {
    try {
        uiManager.clearGameArea();
        hideCsvFeedback();
        showCsvFeedback('Loading game data...', 'info');
        gameData = await dataLoader.loadCsvData(csvString);
        if (!gameData || !gameData.data || gameData.data.length === 0) {
            throw new Error("Invalid CSV data or no data rows found. Please check your input.");
        }
        gameData.originalCsvString = csvString;
        const generatedElements = tileGenerator.generateTilesAndDropZones(gameData.data);
        allGameTiles = generatedElements.shuffledTiles;
        uiManager.renderHeadings(gameData.headers);
        uiManager.renderDropZones(gameData.data, tileGenerator.createDropZoneElement);
        loadedTileRows.clear();
        for (let i = 0; i < gameData.data.length; i++) {
            loadedTileRows.add(i);
        }
        renderVisibleTiles();
        addDragDropListeners();
        csvInputSection.classList.add('hidden');
        gameElementsSection.classList.remove('hidden');
        gameLogic.setMode('learning'); // Set initial mode
        hideCsvFeedback();
        console.log("Game initialized successfully with all CSV data.");
    } catch (error) {
        console.error("Error initializing game:", error);
        showCsvFeedback(error.message || "An error occurred while loading the game.");
        gameElementsSection.classList.add('hidden');
        csvInputSection.classList.remove('hidden');
    }
}
function renderVisibleTiles() {
    const visibleTiles = allGameTiles.filter(tile => loadedTileRows.has(tile.originalRow));
    uiManager.renderShuffledTiles(
        visibleTiles,
        tileGenerator.createTileElement.bind(tileGenerator)
    );
    console.log(`Rendered ${visibleTiles.length} visible tiles into the shuffled-tiles-container.`);
}
function addDragDropListeners() {
    const shuffledTilesContainer = document.getElementById('shuffled-tiles-container');
    const dropZonesContainer = document.getElementById('drop-zones-container');
    // Remove existing listeners to prevent duplicates
    if (gameLogic.handleDragStartBound) {
        shuffledTilesContainer.removeEventListener('dragstart', gameLogic.handleDragStartBound);
        dropZonesContainer.removeEventListener('dragover', gameLogic.handleDragOverBound);
        dropZonesContainer.removeEventListener('dragleave', gameLogic.handleDragLeaveBound);
        dropZonesContainer.removeEventListener('drop', gameLogic.handleDropBound);
        dropZonesContainer.removeEventListener('dragstart', gameLogic.handleDropZoneDragStartBound);
    }
    // Bind event handlers to gameLogic instance
    gameLogic.handleDragStartBound = gameLogic.handleDragStart.bind(gameLogic);
    gameLogic.handleDragOverBound = gameLogic.handleDragOver.bind(gameLogic);
    gameLogic.handleDragLeaveBound = gameLogic.handleDragLeave.bind(gameLogic);
    gameLogic.handleDropBound = gameLogic.handleDrop.bind(gameLogic);
    gameLogic.handleDropZoneDragStartBound = handleDropZoneDragStart.bind(gameLogic);
    // Add event listeners
    shuffledTilesContainer.addEventListener('dragstart', gameLogic.handleDragStartBound);
    dropZonesContainer.addEventListener('dragover', gameLogic.handleDragOverBound);
    dropZonesContainer.addEventListener('dragleave', gameLogic.handleDragLeaveBound);
    dropZonesContainer.addEventListener('drop', gameLogic.handleDropBound);
    dropZonesContainer.addEventListener('dragstart', gameLogic.handleDropZoneDragStartBound);
    console.log("Drag and drop listeners added.");
}
function handleDropZoneDragStart(event) {
    // Only allow dragging from drop zones in learning mode
    if (event.target.classList.contains('tile') && this.mode === 'learning') {
        gameLogic.handleDragStart(event);
    } else {
        event.preventDefault(); // Prevent dragging in game mode or if it's not a tile
    }
}
function solveFirstColumn() {
    if (!gameData || !gameData.data || gameData.data.length === 0) {
        uiManager.showFeedback("No game data loaded to solve.", 'info');
        return;
    }
    uiManager.clearGameArea(); // Clear current tiles and drop zones
    uiManager.renderHeadings(gameData.headers); // Re-render headings
    // Ensure all drop zones are visible and empty initially
    uiManager.renderDropZones(gameData.data, tileGenerator.createDropZoneElement);
    const firstColumnTiles = tileGenerator.allTiles.filter(tile => tile.originalCol === 0);
    // Sort these tiles by their original row to ensure correct order
    firstColumnTiles.sort((a, b) => a.originalRow - b.originalRow);
    firstColumnTiles.forEach(tileData => {
        const dropZone = document.querySelector(`.drop-zone[data-row="${tileData.originalRow}"][data-col="0"]`);
        const tileElement = tileGenerator.createTileElement(tileData);
        if (dropZone && tileElement) {
            // Remove from shuffled tiles container if present
            const currentTileElementInPool = document.querySelector(`#shuffled-tiles-container [data-id="${tileData.id}"]`);
            if (currentTileElementInPool) {
                currentTileElementInPool.remove();
            }
            // If there's an existing tile in the drop zone, return it to the pool first
            if (dropZone.firstChild) {
                gameLogic.returnTileToPool(dropZone.firstChild);
            }
            dropZone.appendChild(tileElement);
            tileElement.classList.add('placed', 'correct'); // Mark as placed and correct
            gameLogic.placedTiles.set(tileData.id, {
                element: tileElement,
                expectedRow: tileData.originalRow,
                expectedCol: tileData.originalCol,
                actualRow: tileData.originalRow,
                actualCol: 0 // Since we are placing in the first column
            });
        }
    });
    // Re-render remaining shuffled tiles (if any)
    const remainingTiles = tileGenerator.allTiles.filter(tile =>
        !gameLogic.placedTiles.has(tile.id)
    );
    uiManager.renderShuffledTiles(remainingTiles, tileGenerator.createTileElement.bind(tileGenerator));
    // Update feedback
    uiManager.showFeedback("First column tiles sorted and placed!", 'success');
    console.log("First column solved.");
    // IMPORTANT: Ensure submit and restart buttons are visible after solving the first column
    uiManager.submitBtn.classList.remove('hidden');
    uiManager.restartBtn.classList.remove('hidden');
}
function setupEventListeners() {
    loadCsvFileBtn.addEventListener('click', () => {
        const file = csvFileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => initializeGame(e.target.result);
            reader.onerror = () => showCsvFeedback("Error reading file. Please try again.");
            reader.readAsText(file);
        } else {
            showCsvFeedback("Please select a CSV file to upload.");
        }
    });
    loadCsvPasteBtn.addEventListener('click', () => {
        const csvString = csvPasteArea.value.trim();
        if (csvString) {
            initializeGame(csvString);
        } else {
            showCsvFeedback("Please paste CSV data into the text area.");
        }
    });
    document.getElementById('learningModeBtn').addEventListener('click', () => {
        gameLogic.setMode('learning');
        if (gameData) {
            loadedTileRows.clear();
            for (let i = 0; i < gameData.data.length; i++) {
                loadedTileRows.add(i);
            }
            renderVisibleTiles();
            uiManager.renderDropZones(gameData.data, tileGenerator.createDropZoneElement);
            addDragDropListeners();
        }
    });
    document.getElementById('gameModeBtn').addEventListener('click', () => {
        gameLogic.setMode('game');
        if (gameData) {
            uiManager.renderDropZones(gameData.data, tileGenerator.createDropZoneElement);
            gameLogic.placedTiles.clear();
            gameLogic.completedRows.clear();
            loadedTileRows.clear(); // Clear all rows as game mode starts fresh
            // Add all rows back for game mode, but don't render tiles until needed (handled by loadMoreTilesCallback)
            for (let i = 0; i < gameData.data.length; i++) {
                loadedTileRows.add(i);
            }
            renderVisibleTiles(); // Render all tiles for game mode initially
            addDragDropListeners();
        }
    });
    // Event listener for the "Solve 1st Column" button
    solveFirstColumnBtn.addEventListener('click', solveFirstColumn);
    document.getElementById('submitBtn').addEventListener('click', () => {
        gameLogic.handleSubmit();
    });
    document.getElementById('restartBtn').addEventListener('click', () => {
        if (gameData && gameData.originalCsvString) {
            initializeGame(gameData.originalCsvString);
        } else {
            gameElementsSection.classList.add('hidden');
            csvInputSection.classList.remove('hidden');
            showCsvFeedback("No game data loaded. Please load CSV data to restart.");
        }
    });
    console.log("All main event listeners setup.");
}
document.addEventListener('DOMContentLoaded', initApp);
```

SubPages\Sequencer\Sequencer_JSs\dataLoader.js:
```js
// Sequencer_JSs/dataLoader.js
export const dataLoader = {
    async loadCsvData(csvString) {
        if (!csvString) {
            console.error("No CSV string provided.");
            return null;
        }
        const lines = csvString.trim().split('\n');
        if (lines.length < 2) {
            console.error("CSV must contain at least a header and one data row.");
            // Return null or throw error if only header, as game logic expects data rows
            return null;
        }
        const headers = lines[0].split(',').map(header => header.trim());
        const dataRows = lines.slice(1).map(line => {
            const values = line.split(',').map(value => value.trim());
            const rowObject = {};
            headers.forEach((header, index) => {
                rowObject[header] = values[index];
            });
            return rowObject;
        });
        return {
            headers: headers,
            data: dataRows,
            originalCsvString: csvString // <--- ADD THIS LINE
        };
    }
};
```

SubPages\Sequencer\Sequencer_JSs\gameLogic.js:
```js
export const gameLogic = {
    mode: 'learning',
    placedTiles: new Map(),
    score: 0,
    completedRows: new Set(),
    uiManager: null,
    tileGenerator: null,
    loadMoreTilesCallback: null,
    init(tileGenerator, uiManager, loadMoreTilesCallback) {
        this.tileGenerator = tileGenerator;
        this.uiManager = uiManager;
        this.loadMoreTilesCallback = loadMoreTilesCallback;
        this.placedTiles.clear();
        this.completedRows.clear();
        this.score = 0;
        console.log("GameLogic initialized. Mode:", this.mode);
    },
    setMode(mode) {
        this.mode = mode;
        this.placedTiles.clear();
        this.completedRows.clear();
        this.score = 0;
        this.uiManager.hideFeedback();
        this.uiManager.setMode(mode);
        // Return all currently placed tiles back to the shuffled pool
        document.querySelectorAll('.drop-zone').forEach(dropZone => {
            if (dropZone.firstChild) {
                this.uiManager.shuffledTilesContainer.appendChild(dropZone.firstChild);
                dropZone.firstChild.classList.remove('placed', 'correct', 'incorrect', 'dragging');
            }
            dropZone.classList.remove('highlight', 'error'); // Remove any lingering styles
        });
        console.log(`Switched to ${mode} mode.`);
    },
    handleDragStart(event) {
        if (this.mode === 'game' && event.target.closest('.drop-zone')) {
            event.preventDefault(); // Prevent dragging tiles already in drop zones in Game Mode
            console.log("Drag from dropzone prevented in GameMode.");
            return;
        }
        event.dataTransfer.setData('text/plain', event.target.dataset.id);
        event.target.classList.add('dragging');
        console.log("Drag started:", event.target.dataset.id);
    },
    handleDragOver(event) {
        event.preventDefault();
        if (event.target.classList.contains('drop-zone')) {
            event.target.classList.add('highlight');
        }
    },
    handleDragLeave(event) {
        event.target.classList.remove('highlight');
    },
    handleDrop(event) {
        event.preventDefault();
        event.target.classList.remove('highlight');
        const tileId = event.dataTransfer.getData('text/plain');
        const tileElement = document.querySelector(`[data-id="${tileId}"]`);
        if (!tileElement) {
            console.warn("Dropped tile element not found:", tileId);
            return;
        }
        const dropZone = event.target.closest('.drop-zone');
        if (!dropZone) {
            console.warn("No drop zone found for drop event.");
            return;
        }
        const dropZoneRow = parseInt(dropZone.dataset.row);
        const dropZoneCol = parseInt(dropZone.dataset.col);
        // If the drop zone already contains a tile, move it back to the shuffled tiles container
        if (dropZone.hasChildNodes()) {
            const existingTile = dropZone.firstChild;
            if (existingTile.dataset.id !== tileId) { // Only return if it's a different tile
                console.log(`Returning existing tile ${existingTile.dataset.id} from ${dropZoneRow},${dropZoneCol} to pool.`);
                this.returnTileToPool(existingTile);
            } else {
                // If the same tile is dropped back into its current drop zone, just remove dragging class
                tileElement.classList.remove('dragging');
                return;
            }
        }
        dropZone.appendChild(tileElement);
        tileElement.classList.add('placed');
        tileElement.classList.remove('dragging');
        console.log(`Tile ${tileId} dropped into row ${dropZoneRow}, col ${dropZoneCol}.`);
        const originalTileData = this.tileGenerator.allTiles.find(t => t.id === tileId);
        if (!originalTileData) {
            console.error("Original tile data not found in tileGenerator.allTiles for ID:", tileId);
            return;
        }
        const tilePlacementData = {
            element: tileElement,
            expectedRow: originalTileData.originalRow,
            expectedCol: originalTileData.originalCol,
            actualRow: dropZoneRow,
            actualCol: dropZoneCol
        };
        this.placedTiles.set(tileId, tilePlacementData);
        if (this.mode === 'game') {
            this.checkPlacement(tileId);
            this.checkRowCompletion(dropZoneRow);
        } else {
            this.highlightCorrectPlacement(tileId);
        }
    },
    checkPlacement(tileId) {
        const tileData = this.placedTiles.get(tileId);
        if (!tileData) {
            console.warn("No tile data found in placedTiles for ID:", tileId);
            return false;
        }
        const isCorrect = tileData.expectedRow === tileData.actualRow &&
                         tileData.expectedCol === tileData.actualCol;
        if (isCorrect) {
            tileData.element.classList.add('correct');
            tileData.element.classList.remove('incorrect');
        } else {
            tileData.element.classList.add('incorrect');
            tileData.element.classList.remove('correct');
        }
        return isCorrect;
    },
    checkRowCompletion(row) {
        if (this.completedRows.has(row)) {
            console.log(`Row ${row + 1} already marked as completed correctly. Skipping check.`);
            return;
        }
        const rowDropZones = document.querySelectorAll(`.drop-zone[data-row="${row}"]`);
        console.log(`Checking row ${row + 1}. Total dropzones in row: ${rowDropZones.length}.`);
        const isRowFullyOccupied = Array.from(rowDropZones).every(zone => zone.hasChildNodes());
        console.log(`Row ${row + 1} fully occupied: ${isRowFullyOccupied}`);
        if (isRowFullyOccupied) {
            let allTilesInRowCorrect = true;
            Array.from(rowDropZones).forEach(dropZone => {
                const tileElement = dropZone.firstChild;
                if (tileElement) {
                    const tileId = tileElement.dataset.id;
                    const isTileCorrect = this.checkPlacement(tileId);
                    if (!isTileCorrect) {
                        allTilesInRowCorrect = false;
                        console.log(`Tile ${tileId} in row ${row + 1} is incorrect.`);
                    }
                } else {
                    allTilesInRowCorrect = false;
                    console.error(`Logic error: Dropzone in row ${row + 1} was empty, but isRowFullyOccupied was true.`);
                }
            });
            if (allTilesInRowCorrect) {
                this.completedRows.add(row);
                this.score += 100;
                this.uiManager.showFeedback(`Row ${row + 1} completed correctly! Score: ${this.score}`, 'success');
                console.log(`Row ${row + 1} completed correctly. Score: ${this.score}. Calling loadMoreTilesCallback.`);
                // The original logic for loadMoreTilesCallback seems to be commented out or not fully implemented.
                // If you intend to load more tiles dynamically, ensure `loadMoreTilesCallback` is properly set up in `app.js`.
                // Example: if (this.loadMoreTilesCallback && this.mode === 'game') { this.loadMoreTilesCallback(); }
                const totalDropZones = document.querySelectorAll('.drop-zone').length;
                const numCols = this.tileGenerator.headers && Object.keys(this.tileGenerator.headers).length > 0 ?
                    this.tileGenerator.headers.length :
                    0;
                const totalRowsInGame = (numCols > 0) ? (totalDropZones / numCols) : 0;
                if (this.completedRows.size === totalRowsInGame && totalRowsInGame > 0) {
                    this.uiManager.showFeedback(`Congratulations! All rows completed! Final Score: ${this.score}`, 'success');
                    console.log("All rows completed!");
                    if (this.mode === 'game') {
                        // The submit button is typically for manual submission, not automatic completion
                        // You might want to enable or show a different "Game Over" message
                    }
                }
            } else {
                this.uiManager.showFeedback(`Row ${row + 1} is filled, but some tiles are incorrect.`, 'error');
                console.log(`Row ${row + 1} is filled, but incorrect.`);
            }
        }
    },
    highlightCorrectPlacement(tileId) {
        const tileData = this.placedTiles.get(tileId);
        if (!tileData) return;
        const isCorrect = tileData.expectedRow === tileData.actualRow &&
                         tileData.expectedCol === tileData.actualCol;
        if (isCorrect) {
            tileData.element.classList.add('correct');
            tileData.element.classList.remove('incorrect');
            tileData.element.classList.remove('placed'); // Remove 'placed' as it's correctly highlighted
        } else {
            tileData.element.classList.add('incorrect');
            tileData.element.classList.remove('correct');
            tileData.element.classList.remove('placed'); // Remove 'placed' as it's incorrectly highlighted
        }
    },
    handleSubmit() {
        if (this.mode !== 'game') {
            this.uiManager.showFeedback("Submit is only available in Game Mode.", 'info');
            return;
        }
        let totalCorrectTiles = 0;
        let totalPlacedTiles = 0;
        const allDropZones = document.querySelectorAll('.drop-zone');
        allDropZones.forEach(dropZone => {
            if (dropZone.hasChildNodes()) {
                totalPlacedTiles++;
                const tileElement = dropZone.firstChild;
                const tileId = tileElement.dataset.id;
                if (this.checkPlacement(tileId)) {
                    totalCorrectTiles++;
                }
            }
        });
        if (totalPlacedTiles === 0) {
            this.uiManager.showFeedback("No tiles placed yet. Drag and drop tiles into the table!", 'info');
            return;
        }
        const totalPossibleTiles = document.querySelectorAll('.drop-zone').length;
        if (totalCorrectTiles === totalPossibleTiles) {
            this.uiManager.showFeedback(`Fantastic! All ${totalCorrectTiles} tiles placed are correct! Final Score: ${this.score}`, 'success');
        } else {
            this.uiManager.showFeedback(`You got ${totalCorrectTiles} out of ${totalPossibleTiles} tiles correct. Keep trying! Score: ${this.score}`, 'error');
        }
        console.log(`Submit clicked. Total placed: ${totalPlacedTiles}, Total correct: ${totalCorrectTiles}, Total possible: ${totalPossibleTiles}`);
    },
    returnTileToPool(tileElement) {
        const shuffledTilesContainer = document.getElementById('shuffled-tiles-container');
        if (shuffledTilesContainer) {
            shuffledTilesContainer.appendChild(tileElement);
            tileElement.classList.remove('placed', 'correct', 'incorrect', 'dragging');
            this.placedTiles.delete(tileElement.dataset.id);
            console.log(`Tile ${tileElement.dataset.id} returned to pool.`);
        }
    }
};
```

SubPages\Sequencer\Sequencer_JSs\tileGenerator.js:
```js
// tileGenerator.js
export const tileGenerator = {
    allTiles: [],
    currentShuffledTiles: [],
    headers: [],
    generateTilesAndDropZones(data) {
        this.allTiles = [];
        this.headers = Object.keys(data[0] || {});
        const correctPlacements = [];
        // Create all tiles and track their correct positions
        data.forEach((row, rowIndex) => {
            Object.entries(row).forEach(([header, value], colIndex) => {
                const tileId = `tile-${rowIndex}-${header}`;
                const tileData = {
                    id: tileId,
                    value: value,
                    originalRow: rowIndex,
                    originalHeader: header,
                    originalCol: colIndex,
                    row: rowIndex,
                    col: colIndex
                };
                this.allTiles.push(tileData);
                correctPlacements.push({
                    expectedValue: value,
                    expectedRow: rowIndex,
                    expectedCol: colIndex,
                    tileId: tileId,
                    header: header
                });
            });
        });
        // Use all tiles and shuffle them
        this.currentShuffledTiles = [...this.allTiles];
        this.shuffleCurrentTiles();
        console.log(`Generated ${this.allTiles.length} tiles`);
        return { 
            shuffledTiles: this.currentShuffledTiles, 
            correctPlacements,
            headers: this.headers
        };
    },
    shuffleCurrentTiles() {
        // Shuffle all tiles
        for (let i = this.currentShuffledTiles.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.currentShuffledTiles[i], this.currentShuffledTiles[j]] = 
            [this.currentShuffledTiles[j], this.currentShuffledTiles[i]];
        }
    },
    createTileElement(tileData, index) {
        const tileDiv = document.createElement('div');
        tileDiv.classList.add('tile');
        tileDiv.setAttribute('draggable', 'true');
        tileDiv.dataset.id = tileData.id;
        tileDiv.dataset.row = tileData.row;
        tileDiv.dataset.col = tileData.col;
        tileDiv.textContent = tileData.value;
        tileDiv.title = tileData.value;
        tileDiv.style.setProperty('--animation-delay', `${index * 0.05}s`);
        return tileDiv;
    },
    createDropZoneElement(row, col) {
        const dropZoneDiv = document.createElement('div');
        dropZoneDiv.classList.add('drop-zone');
        dropZoneDiv.dataset.row = row;
        dropZoneDiv.dataset.col = col;
        dropZoneDiv.dataset.accepts = `tile-${row}-*`;
        return dropZoneDiv;
    },
    createHeadingElement(heading) {
        const headingDiv = document.createElement('div');
        headingDiv.classList.add('heading-tile');
        headingDiv.textContent = heading;
        headingDiv.title = heading;
        return headingDiv;
    }
};
```

SubPages\Sequencer\Sequencer_JSs\uiManager.js:
```js
export const uiManager = {
    headingsContainer: document.getElementById('headings-container'),
    dropZonesContainer: document.getElementById('drop-zones-container'),
    shuffledTilesContainer: document.getElementById('shuffled-tiles-container'),
    feedbackMessage: document.getElementById('feedback-message'),
    submitBtn: document.getElementById('submitBtn'),
    restartBtn: document.getElementById('restartBtn'),
    renderHeadings(headers) {
        this.headingsContainer.innerHTML = '';
        this.headingsContainer.style.gridTemplateColumns = `repeat(${headers.length},minmax(80px,1fr))`;
        headers.forEach(header => {
            const headingDiv = document.createElement('div');
            headingDiv.classList.add('heading-tile');
            headingDiv.textContent = header;
            this.headingsContainer.appendChild(headingDiv);
        });
        console.log(`Rendered headings for ${headers.length} columns.`);
    },
    renderDropZones(data, createDropZoneElement) {
        this.dropZonesContainer.innerHTML = '';
        if (!data || data.length === 0) return;
        const numRows = data.length;
        const numCols = Object.keys(data[0]).length;
        this.dropZonesContainer.style.gridTemplateColumns = `repeat(${numCols},minmax(80px,1fr))`;
        this.dropZonesContainer.style.gridTemplateRows = `repeat(${numRows},auto)`;
        for (let row = 0; row < numRows; row++) {
            for (let col = 0; col < numCols; col++) {
                const dropZone = createDropZoneElement(row, col);
                this.dropZonesContainer.appendChild(dropZone);
            }
        }
        console.log(`Rendered ${numRows} rows and ${numCols} columns of dropzones.`);
    },
    renderShuffledTiles(shuffledTiles, createTileElement) {
        this.shuffledTilesContainer.innerHTML = '';
        shuffledTiles.forEach((tileData, index) => {
            const tileElement = createTileElement(tileData, index);
            this.shuffledTilesContainer.appendChild(tileElement);
        });
        console.log(`Rendered ${shuffledTiles.length} shuffled tiles into the pool.`);
    },
    clearGameArea() {
        this.headingsContainer.innerHTML = '';
        this.dropZonesContainer.innerHTML = '';
        this.shuffledTilesContainer.innerHTML = '';
        this.hideFeedback();
        // Removed hiding submit and restart buttons here.
        // Their visibility is now managed by setMode() or specific functions in app.js.
        console.log("Game area cleared. Button visibility now managed by setMode or specific functions.");
    },
    showFeedback(message, type = 'info') {
        this.feedbackMessage.textContent = message;
        this.feedbackMessage.className = 'alert'; // Reset classes
        switch (type.toLowerCase()) {
            case 'success':
                this.feedbackMessage.classList.add('alert-success');
                break;
            case 'error':
                this.feedbackMessage.classList.add('alert-danger');
                break;
            case 'info':
            default:
                this.feedbackMessage.classList.add('alert-info');
        }
        this.feedbackMessage.classList.remove('hidden');
    },
    hideFeedback() {
        this.feedbackMessage.textContent = '';
        this.feedbackMessage.className = 'alert hidden';
    },
    setMode(mode) {
        if (mode === 'game') {
            this.submitBtn.classList.remove('hidden');
            this.restartBtn.classList.remove('hidden');
            console.log("Submit and Restart buttons shown (Game Mode).");
        } else { // learning mode
            this.submitBtn.classList.add('hidden'); // Submit is typically only for game mode
            this.restartBtn.classList.remove('hidden');
            console.log("Submit button hidden, Restart button visible (Learning Mode).");
        }
    }
};
```

SubPages\Tools.css:
```css
body {
  background-color: #f8f9fa;
}
.password-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  text-align: center;
}
.tool-card {
  transition: transform 0.2s;
}
.tool-card:hover {
  transform: translateY(-5px);
}
/* Shake animation */
@keyframes shake {
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
}
.shake {
  animation: shake 0.4s;
}
```

SubPages\Tools.html:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Developer Tools</title>
  <!-- CDN Links -->
  <script>
    fetch('../Assets/Utils/cdn.html')
      .then(response => response.text())
      .then(data => document.head.insertAdjacentHTML('beforeend', data));
  </script>
  <!-- CDN Links -->
  <!-- Custom CSS -->
  <link rel="stylesheet" href="../style.css">
  <link rel="stylesheet" href="Tools.css">
</head>
<body>
  <!-- Password Protection -->
  <div id="password-protection" class="password-container">
    <div class="card p-4 shadow-sm" style="max-width: 400px; width: 100%;">
      <h4 class="card-title text-center mb-4">Enter Password to Access Personal Tools</h4>
      <div class="mb-3">
        <input type="password" class="form-control" id="passwordInput" placeholder="Enter value of PI">
      </div>
      <button class="btn btn-primary" id="submitPassword">Access Tools</button>
      <p id="passwordError" class="text-danger mt-3 d-none">Incorrect password. Please try again.</p>
    </div>
  </div>
  <!-- Tools Content -->
  <div id="tools-content" class="container my-5 d-none">
    <h1 class="text-center mb-5">My Developer Tools & Utilities</h1>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 justify-content-center">
      <div class="col">
        <div class="card h-100 tool-card">
          <div class="card-body text-center">
            <i class="fas fa-language fa-3x mb-3 text-primary"></i>
            <h5 class="card-title">Vocabulary Translator</h5>
            <p class="card-text">English, Marathi & Hindi translator.</p>
            <a href="./Vocabulary/Vocabulary.html" class="btn btn-outline-primary mt-3">Go to Tool</a>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card h-100 tool-card">
          <div class="card-body text-center">
            <i class="fas fa-table fa-3x mb-3 text-danger"></i>
            <h5 class="card-title">Table Handler</h5>
            <p class="card-text">Preview/Convert CSV, JSON.</p>
            <a href="./DataConverter/DataConverter.html" class="btn btn-outline-danger mt-3">Go to Tool</a>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card h-100 tool-card">
          <div class="card-body text-center">
            <i class="fas fa-brain fa-3x mb-3 text-success"></i>
            <h5 class="card-title">Sequencer Memory Booster</h5>
            <p class="card-text">Boost your memory and cognitive skills by arranging sequences from CSV data.</p>
            <a href="./Sequencer/Sequencer.html" class="btn btn-outline-success mt-3">Go to Tool</a>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card h-100 tool-card">
          <div class="card-body text-center">
            <i class="fas fa-image fa-3x mb-3 text-info"></i>
            <h5 class="card-title">Image Resizer</h5>
            <p class="card-text">Resize image dimensions & compress file size.</p>
            <a href="./ImageResizer/ImageResizer.html" class="btn btn-outline-info mt-3">Go to Tool</a>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card h-100 tool-card">
          <div class="card-body text-center">
            <i class="fas fa-newspaper fa-3x mb-3 text-dark"></i>
            <h5 class="card-title">Newspaper Business Tracker</h5>
            <p class="card-text">Track billing, retail sales & changes easily.</p>
            <a href="./NBT/NBT.html" class="btn btn-outline-dark mt-3">Go to Tool</a>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card h-100 tool-card">
          <div class="card-body text-center">
            <i class="fas fa-photo-video fa-3x mb-3 text-secondary"></i>
            <h5 class="card-title">Media Finder</h5>
            <p class="card-text">Search and fetch media files (images, audio, video) from given sources.</p>
            <a href="./MediaFinder/MediaFinder.html" class="btn btn-outline-secondary mt-3">Go to Tool</a>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card h-100 tool-card">
          <div class="card-body text-center">
            <i class="fas fa-code-branch fa-3x mb-3 text-warning"></i>
            <h5 class="card-title">Upload Syncer</h5>
            <p class="card-text">Compare & manage file versions.</p>
            <a href="./UploadSyncer/UploadSyncer.html" class="btn btn-outline-warning mt-3">Go to Tool</a>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card h-100 tool-card">
          <div class="card-body text-center">
            <i class="fas fa-wand-magic-sparkles fa-3x mb-3 text-info"></i>
            <h5 class="card-title">VC Helper</h5>
            <p class="card-text">AI-powered coding prompt generator.</p>
            <a href="./Promter/Prompter.html" class="btn btn-outline-info mt-3">Go to Tool</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Scripts -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <script type="module" src="Tools.js"></script>
</body>
</html>
```

SubPages\Tools.js:
```js
import BINGO from "../Assets/Utils/Bingo.js"; // <-- Check spelling (Assets vs Assests)
document.addEventListener('DOMContentLoaded', function () {
  const correctPassword = BINGO.PieValue;
  const passwordInput = document.getElementById('passwordInput');
  const submitPasswordBtn = document.getElementById('submitPassword');
  const passwordProtectionDiv = document.getElementById('password-protection');
  const card = passwordProtectionDiv.querySelector(".card");
  const toolsContentDiv = document.getElementById('tools-content');
  const passwordError = document.getElementById('passwordError');
  // Clear any previous session to require password on every visit
  sessionStorage.removeItem('accessGranted');
  function handleIncorrectPassword() {
    passwordInput.value = '';
    passwordError.classList.remove('d-none');
    card.classList.add('shake');
    setTimeout(() => card.classList.remove('shake'), 400);
    setTimeout(() => passwordError.classList.add('d-none'), 3000);
  }
  submitPasswordBtn.addEventListener('click', function () {
    submitPasswordBtn.disabled = true;
    setTimeout(() => { submitPasswordBtn.disabled = false; }, 1000);
    if (passwordInput.value === correctPassword) {
      passwordProtectionDiv.classList.add('d-none');
      toolsContentDiv.classList.remove('d-none');
      sessionStorage.setItem('accessGranted', 'true');
    } else {
      handleIncorrectPassword();
    }
  });
  passwordInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      submitPasswordBtn.click();
    }
  });
});
```

SubPages\UploadSyncer\UploadSyncer.css:
```css
/* Keep consistent theme with Tools page */
body {
    background-color: #f8f9fa;
}
.shake {
    animation: shake 0.4s;
}
@keyframes shake {
    0% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    50% { transform: translateX(5px); }
    75% { transform: translateX(-5px); }
    100% { transform: translateX(0); }
}
```

SubPages\UploadSyncer\UploadSyncer.html:
```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>File Differ - Access</title>
<!-- CDN Links -->
<script>
    fetch('../../Assets/Utils/cdn.html')
    .then(response => response.text())
    .then(data => document.head.insertAdjacentHTML('beforeend', data));
</script>
<!-- CDN Links -->
<link rel="stylesheet" href="../style.css">
<link rel="stylesheet" href="UploadSyncer.css">
</head>
<body>
<div id="password-protection" class="d-flex justify-content-center align-items-center vh-100">
    <div class="card p-4 shadow-sm" style="max-width: 400px; width: 100%;">
        <h4 class="card-title text-center mb-4">Enter Password to Access File Differ</h4>
        <div class="mb-3">
            <input type="password" class="form-control" id="passwordInput" placeholder="Enter volcanic glass">
        </div>
        <button class="btn btn-primary w-100" id="submitPassword">Access Tool</button>
        <p id="passwordError" class="text-danger mt-3 d-none">Incorrect password. Please try again.</p>
    </div>
</div>
<script type="module" src="UploadSyncer.js"></script>
</body>
</html>
```

SubPages\UploadSyncer\UploadSyncer.js:
```js
import BINGO from "../../Assets/Utils/Bingo.js";
document.addEventListener('DOMContentLoaded', () => {
    const correctPassword = BINGO.UploadSyncer;
    const passwordInput = document.getElementById('passwordInput');
    const submitBtn = document.getElementById('submitPassword');
    const protectionDiv = document.getElementById('password-protection');
    const card = protectionDiv.querySelector(".card");
    const passwordError = document.getElementById('passwordError');
    function handleIncorrectPassword() {
        passwordInput.value = '';
        passwordError.classList.remove('d-none');
        card.classList.add('shake');
        setTimeout(() => card.classList.remove('shake'), 400);
        setTimeout(() => passwordError.classList.add('d-none'), 3000);
    }
    submitBtn.addEventListener('click', () => {
        submitBtn.disabled = true;
        setTimeout(() => { submitBtn.disabled = false; }, 1000);
        if (passwordInput.value === correctPassword) {
            window.location.href = BINGO.scriptUrl.UploadSyncerUrl; // redirect target
        } else {
            handleIncorrectPassword();
        }
    });
    passwordInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') submitBtn.click();
    });
});
```

SubPages\Vocabulary\Vocabulary.css:
```css
body {
    background-color: #e9ecef;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
.container {
    max-width: 800px;
}
h1.text-primary {
    font-weight: 700;
}
.card {
    border: none;
    border-radius: 0.75rem;
}
.form-control-lg {
    border-radius: 0.5rem;
}
.btn-lg {
    border-radius: 0.5rem;
}
#marathiOutput,
#hindiOutput,
#englishOutput {
    font-size: 1.1rem;
    font-weight: 500;
    line-height: 1.5;
    word-wrap: break-word;
    overflow-wrap: break-word;
}
#marathiResultContainer,
#hindiResultContainer,
#englishResultContainer {
    padding: 1rem;
    border-left: 5px solid;
    border-radius: 0.25rem;
    color: #333;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
    min-height: 120px;
    display: flex;
    flex-direction: column;
}
#marathiResultContainer {
    border-color: #FF6F00;
    background-color: rgba(255, 111, 0, 0.08);
}
#marathiResultContainer h5 {
    color: #FF6F00;
    margin-bottom: 0.5rem;
}
#hindiResultContainer {
    border-color: #5A2377;
    background-color: rgba(90, 35, 119, 0.08);
}
#hindiResultContainer h5 {
    color: #5A2377;
    margin-bottom: 0.5rem;
}
#englishResultContainer {
    border-color: #1565C0;
    background-color: rgba(21, 101, 192, 0.08);
}
#englishResultContainer h5 {
    color: #1565C0;
    margin-bottom: 0.5rem;
}
#errorMessage, #loadingMessage, #noResultFound {
    font-style: italic;
    font-weight: 500;
    text-align: center;
    width: 100%;
}
#errorMessage {
    color: #dc3545;
}
#loadingMessage .spinner-border {
    color: #007bff !important;
}
.spinner-border {
    width: 2rem;
    height: 2rem;
}
#translationOutput {
    padding-right: 0;
}
/* --- New and Modified CSS for CSV Output and Layout --- */
#csvOutputDisplay { /* New style for the un-editable CSV box */
    font-family: 'Consolas', 'Menlo', monospace; /* Monospace for code-like text */
    font-size: 1rem;
    padding: 0.75rem 1rem;
    background-color: #f8f9fa; /* Light background */
    border: 1px solid #dee2e6; /* Light border */
    border-radius: 0.5rem;
    white-space: nowrap; /* Keep content on one line unless forced to break */
    overflow-x: auto; /* Allow horizontal scrolling if content is too wide */
    cursor: copy; /* Indicate it's clickable for copy */
    color: #212529;
    min-height: 48px; /* Ensure a decent height even if empty */
    display: flex; /* Use flexbox to center content vertically */
    align-items: center; /* Center content vertically */
}
/* Adjust card margins for better viewport fit */
.container .card:first-of-type {
    margin-bottom: 1rem !important; /* Reduce margin below the input card */
}
.card .mb-4 { /* Reduce margin for "Translations:" heading */
    margin-bottom: 1rem !important;
}
.card .mt-4 { /* Reduce margin above the CSV output container */
    margin-top: 1rem !important;
}
.text-center.mt-5 { /* Reduce margin for the "Back to Tools" button */
    margin-top: 2rem !important;
}
/* For the "Copied!" feedback badge */
#copyFeedback {
    z-index: 10; /* Ensure it's above other elements */
    font-size: 0.85rem;
    padding: 0.25em 0.6em;
    border-radius: 0.25rem;
    white-space: nowrap;
}
@media (max-width: 767.98px) {
    .col-12.col-md-4 {
        margin-bottom: 1rem !important;
    }
    #marathiOutput,
    #hindiOutput,
    #englishOutput {
        font-size: 1.25rem;
    }
}
@media (max-width: 575.98px) {
    .form-label.fs-5 {
        font-size: 1.1rem !important;
    }
    .form-control-lg {
        font-size: 1rem;
        padding: 0.75rem 1rem;
    }
    .card-title {
        font-size: 1.5rem;
    }
}
```

SubPages\Vocabulary\Vocabulary.html:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Universal Vocabulary Translator - Ganesh Chougale</title>
    <!-- CDN Links -->
    <script>
        fetch('../../Assets/Utils/cdn.html')
        .then(response => response.text())
        .then(data => document.head.insertAdjacentHTML('beforeend', data));
    </script>
    <!-- CDN Links -->
    <link rel="stylesheet" href="Vocabulary.css">
</head>
<body>
    <div class="container my-3">
        <div class="card p-4 shadow-sm mb-5">
            <div class="mb-3">
                <input type="text" class="form-control form-control-lg" id="universalInput" placeholder="Type any word to translate..." autofocus>
            </div>
            <div id="loadingMessage" class="text-center mt-3 d-none">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="mt-2 text-muted">Translating...</p>
            </div>
            <p id="errorMessage" class="text-danger text-center mt-3 d-none"></p>
        </div>
        <div class="card p-4 shadow-sm">
            <h3 class="card-title mb-4">Translations:</h3>
            <div class="row" id="translationOutput">
                <div class="col-12 col-md-4 mb-3 d-none" id="marathiResultContainer">
                    <h5 class="text-primary"><i class="fas fa-language me-2"></i> Marathi:</h5>
                    <p id="marathiOutput" class="lead ms-2"></p>
                </div>
                <div class="col-12 col-md-4 mb-3 d-none" id="hindiResultContainer">
                    <h5 class="text-success"><i class="fas fa-language me-2"></i> Hindi:</h5>
                    <p id="hindiOutput" class="lead ms-2"></p>
                </div>
                <div class="col-12 col-md-4 mb-3 d-none" id="englishResultContainer">
                    <h5 class="text-info"><i class="fas fa-language me-2"></i> English:</h5>
                    <p id="englishOutput" class="lead ms-2"></p>
                </div>
                <div class="col-12 d-none" id="noResultFoundContainer"> <p id="noResultFound" class="text-muted text-center mt-3 d-none">No translation found for the entered word.</p>
                </div>
            </div>
            <div id="csvOutputContainer" class="mt-4 p-3 border rounded bg-light d-none">
                <h5 class="mb-3">CSV Output</h5>
                <div id="csvOutputDisplay" class="text-muted"></div>
                <span id="copyFeedback" class="position-absolute translate-middle-x badge bg-success d-none" style="bottom: -15px; left: 50%;">Copied!</span>
            </div>
            </div>
        <div class="text-center mt-5">
            <a href="../Tools.html" class="btn btn-secondary btn-lg">
                <i class="fas fa-arrow-left me-2"></i> Back to Tools
            </a>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossorigin="anonymous"></script>
    <script src="Vocabulary.js"></script>
</body>
</html>
```

SubPages\Vocabulary\Vocabulary.js:
```js
document.addEventListener("DOMContentLoaded", () => {
  const universalInput = document.getElementById("universalInput");
  const marathiResultContainer = document.getElementById(
    "marathiResultContainer"
  );
  const hindiResultContainer = document.getElementById("hindiResultContainer");
  const englishResultContainer = document.getElementById(
    "englishResultContainer"
  );
  const marathiOutput = document.getElementById("marathiOutput");
  const hindiOutput = document.getElementById("hindiOutput");
  const englishOutput = document.getElementById("englishOutput");
  const loadingMessage = document.getElementById("loadingMessage");
  const errorMessage = document.getElementById("errorMessage");
  const noResultFound = document.getElementById("noResultFound");
  const noResultFoundContainer = document.getElementById(
    "noResultFoundContainer"
  );
  // Updated elements for CSV copy box
  const csvOutputContainer = document.getElementById("csvOutputContainer"); // The parent div that's clickable
  const csvOutputDisplay = document.getElementById("csvOutputDisplay"); // The div where CSV text is displayed
  const copyFeedback = document.getElementById("copyFeedback");
  function toCapitalCase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
  let debounceTimer;
  const debounce = (func, delay) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(func, delay);
  };
  async function fetchTranslation(text, targetLang) {
    if (!text || text.trim() === "") {
      return "";
    }
    // Using a more robust Google Translate API endpoint (still unofficial, for demonstration)
    // For production, consider official, paid APIs like Google Cloud Translation API.
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(
      text
    )}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        // If response status is not OK (e.g., 404, 500), throw an error
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      // The structure for single words or short phrases often returns data[0][0][0]
      if (data && data[0] && Array.isArray(data[0][0]) && data[0][0][0]) {
        return data[0][0][0]; // Extract the main translation
      } else if (data && data[0] && typeof data[0][0] === "string") {
        return data[0][0]; // Fallback for other structures
      } else {
        console.warn("Unexpected API response structure:", data);
        return ""; // Return empty string for unexpected structure
      }
    } catch (error) {
      console.error(`Error translating to ${targetLang}:`, error);
      // Return an empty string or a specific error message if translation fails
      return ""; // Changed to empty string to avoid "Translation failed for X" in CSV
    }
  }
  function displayResults(translations, originalWord) {
    // Hide all translation containers initially
    marathiResultContainer.classList.add("d-none");
    hindiResultContainer.classList.add("d-none");
    englishResultContainer.classList.add("d-none");
    noResultFound.classList.add("d-none");
    if (noResultFoundContainer) {
      noResultFoundContainer.classList.add("d-none");
    }
    errorMessage.classList.add("d-none");
    csvOutputContainer.classList.add("d-none"); // Hide CSV container by default
    let hasTranslation = false;
    let marathiTrans = "";
    let hindiTrans = "";
    let englishTrans = "";
    if (translations.marathi && translations.marathi !== "") {
      // Check against empty string now
      marathiOutput.textContent = translations.marathi;
      marathiResultContainer.classList.remove("d-none");
      marathiTrans = translations.marathi;
      hasTranslation = true;
    }
    if (translations.hindi && translations.hindi !== "") {
      // Check against empty string now
      hindiOutput.textContent = translations.hindi;
      hindiResultContainer.classList.remove("d-none");
      hindiTrans = translations.hindi;
      hasTranslation = true;
    }
    if (translations.english && translations.english !== "") {
      // Check against empty string now
      englishOutput.textContent = translations.english;
      englishResultContainer.classList.remove("d-none");
      englishTrans = translations.english;
      hasTranslation = true;
    }
    if (hasTranslation) {
      // Populate CSV output display
      csvOutputDisplay.textContent = `${toCapitalCase(
        translations.english
      )}, ${marathiTrans}, ${hindiTrans}`;
      csvOutputContainer.classList.remove("d-none"); // Show CSV container
    } else if (originalWord.trim() !== "") {
      // if (hasTranslation) {
      //     // Populate CSV output display
      //     csvOutputDisplay.textContent = `${originalWord}, ${marathiTrans}, ${hindiTrans}`;
      //     csvOutputContainer.classList.remove('d-none'); // Show CSV container
      // } else if (originalWord.trim() !== '') {
      // Only show "No translation found" if the input is not empty and no translation was found
      noResultFound.classList.remove("d-none");
      if (noResultFoundContainer) {
        noResultFoundContainer.classList.remove("d-none");
      }
      csvOutputContainer.classList.add("d-none"); // Ensure CSV container is hidden if no translation
    }
    // Clear CSV display if no translation or input is empty
    if (!hasTranslation && originalWord.trim() === "") {
      csvOutputDisplay.textContent = "";
    }
  }
  async function handleTranslation() {
    const text = universalInput.value.trim();
    if (text === "") {
      displayResults({}); // Clear previous results and hide containers
      noResultFound.classList.add("d-none");
      if (noResultFoundContainer) {
        noResultFoundContainer.classList.add("d-none");
      }
      errorMessage.classList.add("d-none");
      loadingMessage.classList.add("d-none");
      csvOutputContainer.classList.add("d-none"); // Also hide CSV when input is empty
      csvOutputDisplay.textContent = ""; // Clear the CSV display content
      return;
    }
    loadingMessage.classList.remove("d-none");
    errorMessage.classList.add("d-none");
    noResultFound.classList.add("d-none");
    if (noResultFoundContainer) {
      noResultFoundContainer.classList.add("d-none");
    }
    csvOutputContainer.classList.add("d-none"); // Hide CSV during loading
    csvOutputDisplay.textContent = ""; // Clear CSV display during loading
    try {
      const translations = {};
      const targetLanguages = ["en", "mr", "hi"];
      const promises = targetLanguages.map((target) =>
        fetchTranslation(text, target).then((result) => ({ target, result }))
      );
      const results = await Promise.all(promises);
      results.forEach(({ target, result }) => {
        if (target === "mr") translations.marathi = result;
        if (target === "hi") translations.hindi = result;
        if (target === "en") translations.english = result;
      });
      displayResults(translations, text);
    } catch (error) {
      console.error("Overall translation error:", error);
      errorMessage.textContent =
        "An error occurred during translation. Please try again.";
      errorMessage.classList.remove("d-none");
      displayResults({}); // Clear results on error
      csvOutputContainer.classList.add("d-none"); // Hide CSV on error
      csvOutputDisplay.textContent = ""; // Clear CSV display on error
    } finally {
      loadingMessage.classList.add("d-none");
    }
  }
  // Event listener for clicking anywhere on the CSV output container
  csvOutputContainer.addEventListener("click", async () => {
    const textToCopy = csvOutputDisplay.textContent;
    if (textToCopy) {
      // Only attempt to copy if there's text
      try {
        await navigator.clipboard.writeText(textToCopy);
        copyFeedback.classList.remove("d-none");
        setTimeout(() => {
          copyFeedback.classList.add("d-none");
        }, 1500); // Hide "Copied!" message after 1.5 seconds
      } catch (err) {
        console.error("Failed to copy text: ", err);
        // Optionally, provide user feedback that copying failed
      }
    }
  });
  universalInput.addEventListener("input", () => {
    debounce(handleTranslation, 500);
  });
});
```



---

