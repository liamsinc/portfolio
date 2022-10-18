<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
    <title>Portfolio - Liam Sinclair</title>
</head>
<body>
    <div class="site__container">
        <?php include 'header.php' ?>
        <div class="main">
            <section class="hero__section">
                <div class="hero__content container">
                    <h1>My Name is Liam Sinclair</h1>
                    <p>I'm a web developer</p>
                </div>
            </section>
            <section class="project__section" id="portfolio">
                <h1 class="project__heading">My Projects</h1>
                <div class="project__content container">
                    <div class="project__item">
                        <a href="https://github.com/liamsinc/html-css-reflection">
                            <img class="project__img" src="img/project-img.jpg" alt="Project One - Netmatters HTML/CSS Reflection">
                            <div class="project__text">
                                <h1>HTML/CSS Reflection</h1>
                                <p>Netmatters Website Reflection</p> 
                            </div>
                        </a>
                    </div>
                    <div class="project__item">
                        <a href="#">
                            <img class="project__img" src="img/project-img.jpg">
                            <div class="project__text">
                                <h1>Project Two</h1>
                                <p>PROJECT DESCRIPTION</p> 
                            </div>
                        </a>
                    </div>
                    <div class="project__item">
                        <a href="#">
                            <img class="project__img" src="img/project-img.jpg">
                            <div class="project__text">
                                <h1>Project Three</h1>
                                <p>PROJECT DESCRIPTION</p> 
                            </div>
                        </a>
                    </div>
                    <div class="project__item">
                        <a href="#">
                            <img class="project__img" src="img/project-img.jpg">
                            <div class="project__text">
                                <h1>Project Four</h1>
                                <p>PROJECT DESCRIPTION</p> 
                            </div>
                        </a>
                    </div>
                    <div class="project__item">
                        <a href="#">
                            <img class="project__img" src="img/project-img.jpg">
                            <div class="project__text">
                                <h1>Project Five</h1>
                                <p>PROJECT DESCRIPTION</p> 
                            </div>
                        </a>
                    </div>
                    <div class="project__item">
                        <a href="#">
                            <img class="project__img" src="img/project-img.jpg">
                            <div class="project__text">
                                <h1>Project Six</h1>
                                <p>PROJECT DESCRIPTION</p> 
                            </div>
                        </a>
                    </div>
                </div>
            </section>
            <section class="contact__section" id="contact">
                <div class="contact__content container">
                    <h1>This section will contain the contact form</h1>
                </div>
            </section>
        </div>
    </div>
</body>
</html>