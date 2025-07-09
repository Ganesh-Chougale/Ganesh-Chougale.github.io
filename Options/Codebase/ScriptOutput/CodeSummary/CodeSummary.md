index.html:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ganesh Chougale Portfolio</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="./style.css">
</head>
<body>
    <header class="hero-header text-white text-center py-4">
        <div class="container">
            <h1 class="display-4">Ganesh Chougale <small class="text-muted fs-5 d-block mt-2">Like to keep things <span
                        id="typewriter-text">simple</span></small></h1>
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
            <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 justify-content-center">
                <div class="col">
                    <div class="card h-100">
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
                                    target="_blank" class="btn btn-outline-primary btn-sm">LinkedIn Post</a>
                                <a href="https://github.com/Ganesh-Chougale/Virtual-Keyboard-using-Mediapipe"
                                    target="_blank" class="btn btn-outline-secondary btn-sm">GitHub Repo</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card h-100">
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
                                    target="_blank" class="btn btn-outline-primary btn-sm">LinkedIn Post</a>
                                <a href="https://github.com/Ganesh-Chougale/Product_Store" target="_blank"
                                    class="btn btn-outline-secondary btn-sm">GitHub Repo</a>
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
                <i class="fas fa-star-half-alt"></i>
            </a>
        </section>
    </main>
    <footer class="bg-dark text-white text-center py-3 mt-5">
        <p class="mb-0">© 2025 Ganesh Chougale. All rights reserved.</p>
    </footer>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossorigin="anonymous"></script>
    <script src="./script.js"></script>
</body>
</html>
```

style.css:
```css
header::before{
        background-image: url("./Assests/Images/ocean_view.jpg");
        background-size: cover; 
        background-position: center center;
        background-repeat: no-repeat;
    }
.hero-header {
    background-image: url("./Assests/Images/ocean_view.jpg");
    background-size: cover; 
    background-position: center center;
    background-repeat: no-repeat;
    position: relative;
    overflow: hidden;
    min-height: 300px; 
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.hero-header::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); 
    z-index: 1;
}
.hero-header .container {
    position: relative;
    z-index: 2;
}
.hero-header .text-muted {
    color: rgba(255, 255, 255, 0.9) !important; 
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7); 
}
.hero-header .navbar-nav .nav-link {
    color: rgba(255, 255, 255, 0.9) !important; 
    font-weight: bold; 
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.6); 
}
.hero-header .navbar-nav .nav-link:hover {
    color: #e0e0e0 !important; 
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
@media (max-width: 991px) { 
    .hero-header {
        min-height: 250px; 
        padding-top: 30px; 
        padding-bottom: 30px;
        background-size: 115%; 
    }
}
@media (max-width: 767px) { 
    .hero-header {
        min-height: 200px;
        padding-top: 20px;
        padding-bottom: 20px;
        background-size: 125%; 
    }
    .hero-header h1 {
        font-size: 2.5rem; 
    }
    .hero-header .text-muted {
        font-size: 0.9rem !important; 
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
```


---

After finishing all code summary of .

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
```

SubPages\Tools.html:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Developer Tools</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="../style.css">
    <link rel="stylesheet" href="Tools.css"> </head>
<body>
    <div id="password-protection" class="password-container">
        <div class="card p-4 shadow-sm" style="max-width: 400px; width: 100%;">
            <h4 class="card-title text-center mb-4">Enter Password to Access Personal Tools</h3>
            <div class="mb-3">
                <input type="password" class="form-control" id="passwordInput" >
            </div>
            <button class="btn btn-primary" id="submitPassword">Access Tools</button>
            <p id="passwordError" class="text-danger mt-3 d-none">Incorrect password. Please try again.</p>
        </div>
    </div>
    <div id="tools-content" class="container my-5 d-none">
        <h1 class="text-center mb-5">My Developer Tools & Utilities</h1>
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 justify-content-center">
            <div class="col">
                <div class="card h-100 tool-card">
                    <div class="card-body text-center">
                        <i class="fas fa-language fa-3x mb-3 text-primary"></i>
                        <h5 class="card-title">Vocabulary Translator</h5>
                        <p class="card-text">English, Marathi & Hindi word translator.</p>
                        <a href="./Vocabulary/Vocabulary.html" class="btn btn-outline-primary mt-3">Go to Tool</a>
                    </div>
                </div>
            </div>
            </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossorigin="anonymous"></script>
    <script src="Tools.js"></script> </body>
</html>
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
#csvOutputDisplay { 
    font-family: 'Consolas', 'Menlo', monospace; 
    font-size: 1rem;
    padding: 0.75rem 1rem;
    background-color: #f8f9fa; 
    border: 1px solid #dee2e6; 
    border-radius: 0.5rem;
    white-space: nowrap; 
    overflow-x: auto; 
    cursor: copy; 
    color: #212529;
    min-height: 48px; 
    display: flex; 
    align-items: center; 
}
.container .card:first-of-type {
    margin-bottom: 1rem !important; 
}
.card .mb-4 { 
    margin-bottom: 1rem !important;
}
.card .mt-4 { 
    margin-top: 1rem !important;
}
.text-center.mt-5 { 
    margin-top: 2rem !important;
}
#copyFeedback {
    z-index: 10; 
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
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
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

