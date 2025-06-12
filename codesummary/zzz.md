index.html:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ganesh Chougale Portfolio</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">

    <link rel="stylesheet" href="./style.css">
</head>
<body>

    <header class="bg-dark text-white text-center py-4">
        <div class="container">
            <h1 class="display-4">Ganesh Chougale</h1>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <div class="container-fluid">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
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
            <p class="lead mb-4">I'm a passionate developer creating engaging web experiences.</p>
            <a href="#projects" class="btn btn-primary btn-lg">View My Work</a>
        </section>

        <section id="about" class="bg-white p-5 rounded shadow-sm mb-5">
            <h2 class="text-center mb-4">About Me</h2>
            <p>Hello! I'm Ganesh Chougale, a budding web developer from Kolhapur, Maharashtra. I enjoy building responsive and user-friendly websites. I'm currently expanding my skills in front-end development and looking for opportunities to contribute to exciting projects.</p>
            <p>My skills include HTML, CSS, JavaScript, and I'm always eager to learn new technologies.</p>
        </section>

        <section id="projects" class="bg-white p-5 rounded shadow-sm mb-5">
            <h2 class="text-center mb-4">My Projects</h2>
            <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                <div class="col">
                    <div class="card h-100">
                        <div class="card-body text-center">
                            <h3 class="card-title">Project Title 1</h3>
                            <p class="card-text">A brief description of your first project. What problem did it solve? What technologies did you use?</p>
                            <a href="#" target="_blank" class="btn btn-outline-primary btn-sm">View Project</a>
                            <a href="#" target="_blank" class="btn btn-outline-secondary btn-sm">GitHub Repo</a>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card h-100">
                        <div class="card-body text-center">
                            <h3 class="card-title">Project Title 2</h3>
                            <p class="card-text">Description of your second project. Highlight key features and your role.</p>
                            <a href="#" target="_blank" class="btn btn-outline-primary btn-sm">View Project</a>
                            <a href="#" target="_blank" class="btn btn-outline-secondary btn-sm">GitHub Repo</a>
                        </div>
                    </div>
                </div>
                </div>
        </section>

        <section id="contact" class="bg-white p-5 rounded shadow-sm">
            <h2 class="text-center mb-4">Get in Touch</h2>
            <p class="text-center">I'm always open to new collaborations and opportunities. Feel free to reach out!</p>
            <ul class="list-unstyled text-center">
                <li class="mb-2">Email: <a href="mailto:your.email@example.com" class="text-decoration-none">your.email@example.com</a></li>
                <li class="mb-2">LinkedIn: <a href="https://www.linkedin.com/in/yourprofile" target="_blank" class="text-decoration-none">Your LinkedIn Profile</a></li>
                <li>GitHub: <a href="https://github.com/yourusername" target="_blank" class="text-decoration-none">Your GitHub Profile</a></li>
            </ul>
        </section>
    </main>

    <footer class="bg-dark text-white text-center py-3 mt-5">
        <p class="mb-0">&copy; 2025 Ganesh Chougale. All rights reserved.</p>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>

    <script src="./script.js"></script>
</body>
</html>
```

script.js:
```js

```

style.css:
```css
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
```

