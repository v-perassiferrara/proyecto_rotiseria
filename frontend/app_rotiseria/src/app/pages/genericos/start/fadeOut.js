
setTimeout(function() {
    document.body.classList.add("fade-out");
    setTimeout(function() {
        window.location.href = "login.html";
    }, 1500); // esperar a que termine el fade
    }, 3000); // esperar 3 segundos antes de empezar el fade