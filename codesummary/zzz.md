index.html:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ganesh Chougale Portfolio</title>
    <link rel="stylesheet" href="./style.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</head>
<body>
    <header>
        <h1>Ganesh Chougale</h1>
        <nav>
            <ul>
                <li><a href="#about">About</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <section id="hero">
            <h2>Welcome to My Portfolio!</h2>
            <p>I'm a passionate developer creating engaging web experiences.</p>
            <a href="#projects" class="button">View My Work</a>
        </section>

        <section id="about">
            <h2>About Me</h2>
            <p>Hello! I'm Ganesh Chougale, a budding web developer from Kolhapur, Maharashtra. I enjoy building responsive and user-friendly websites. I'm currently expanding my skills in front-end development and looking for opportunities to contribute to exciting projects.</p>
            <p>My skills include HTML, CSS, JavaScript, and I'm always eager to learn new technologies.</p>
        </section>

        <section id="projects">
            <h2>My Projects</h2>
            <div class="project-grid">
                <div class="project-item">
                    <h3>Project Title 1</h3>
                    <p>A brief description of your first project. What problem did it solve? What technologies did you use?</p>
                    <a href="#" target="_blank">View Project</a> | <a href="#" target="_blank">GitHub Repo</a>
                </div>
                <div class="project-item">
                    <h3>Project Title 2</h3>
                    <p>Description of your second project. Highlight key features and your role.</p>
                    <a href="#" target="_blank">View Project</a> | <a href="#" target="_blank">GitHub Repo</a>
                </div>
                </div>
        </section>

        <section id="contact">
            <h2>Get in Touch</h2>
            <p>I'm always open to new collaborations and opportunities. Feel free to reach out!</p>
            <ul>
                <li>Email: <a href="mailto:gchougale32@gmail.com">your.email@example.com</a></li>
                <li>LinkedIn: <a href="https://www.linkedin.com/in/ganesh-chougale512449215/" target="_blank">Your LinkedIn Profile</a></li>
                <li>GitHub: <a href="https://github.com/Ganesh-Chougale" target="_blank">Your GitHub Profile</a></li>
            </ul>
        </section>
    </main>

    <footer>
        <p>&copy; 2025 Ganesh Chougale. All rights reserved.</p>
    </footer>

    <script src="./script.js"></script>
</body>
</html>
```

script.js:
```js

```

style.css:
```css
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    line-height: 1.6;
    color: #333;
    background-color: #f4f4f4;
}


header {
    background-color: #333;
    color: #fff;
    padding: 1rem 0;
    text-align: center;
}

header h1 {
    margin: 0;
    font-size: 2.5rem;
}

nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

nav ul li {
    display: inline;
    margin: 0 15px;
}

nav ul li a {
    color: #fff;
    text-decoration: none;
    font-weight: bold;
}

nav ul li a:hover {
    color: #00bcd4; 
}


main {
    padding: 20px;
    max-width: 960px;
    margin: 20px auto;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

section {
    padding: 40px 0;
    border-bottom: 1px solid #eee;
}

section:last-child {
    border-bottom: none;
}

section h2 {
    text-align: center;
    margin-bottom: 30px;
    color: #333;
    font-size: 2rem;
}


#hero {
    text-align: center;
    padding: 60px 20px;
    background-color: #e2e2e2;
    margin-bottom: 20px;
}

#hero p {
    font-size: 1.2rem;
    max-width: 600px;
    margin: 20px auto;
}

.button {
    display: inline-block;
    background-color: #007bff;
    color: #fff;
    padding: 10px 20px;
    text-decoration: none;
    border-radius: 5px;
    margin-top: 20px;
    transition: background-color 0.3s ease;
}

.button:hover {
    background-color: #0056b3;
}


.project-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 30px;
    margin-top: 30px;
}

.project-item {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    text-align: center;
}

.project-item h3 {
    margin-top: 0;
    color: #007bff;
}

.project-item a {
    color: #007bff;
    text-decoration: none;
    margin: 0 5px;
}

.project-item a:hover {
    text-decoration: underline;
}


#contact ul {
    list-style: none;
    padding: 0;
    text-align: center;
}

#contact ul li {
    margin-bottom: 10px;
}

#contact ul li a {
    color: #007bff;
    text-decoration: none;
}

#contact ul li a:hover {
    text-decoration: underline;
}


footer {
    text-align: center;
    padding: 20px;
    background-color: #333;
    color: #fff;
    margin-top: 20px;
}


@media (max-width: 768px) {
    header h1 {
        font-size: 2rem;
    }
    nav ul li {
        margin: 0 10px;
    }
    main {
        margin: 10px;
        padding: 15px;
    }
    section {
        padding: 20px 0;
    }
}
```

