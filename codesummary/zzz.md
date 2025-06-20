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
                <strong>a programming agnostic</strong>, a budding developer from Kolhapur, Maharashtra. I enjoy building
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
                                    height="399" width="504" frameborder="0" allowfullscreen=""
                                    title="Embedded post"></iframe>
                            </div>
                            <div class="text-center">
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
                                    height="399" width="504" frameborder="0" allowfullscreen=""
                                    title="Embedded post"></iframe>
                            </div>
                            <div class="text-center">
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
});
```

style.css:
```css
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

