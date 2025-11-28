// Skapar en tom array för att lagra studentdata
let students = [];

// Definierar URL:en till API:et som innehåller studentdatan
const uri = "https://artificial-guru.github.io/students.json";

// Använder fetch API för att hämta studentdatan från URL:en
fetch(uri)
    .then(response => response.json()) // Konverterar responsen till JSON-format
    .then(data => students = data); // Sätter värdet för students-arrayen till den hämtade datan

// Funktion för att hantera inloggningen
function login() {
    // Hämta användarnamn och lösenord från inloggningsformuläret i html-filen
    const formUserName = document.getElementById("username").value;
    const formPassword = document.getElementById("password").value;
    
    // Variabel för att indikera om inloggningen är lyckad
    let authenticated = false;

    // Loopa igenom varje student i students-arrayen
    for (let student of students) {
        // Kontrollera om det angivna användarnamnet och lösenordet matchar någon student i arrayen
        if (student.login.username === formUserName && student.login.password === formPassword) {
            // Om matchning hittas, sätt authenticated till true och avslutar loopen
            authenticated = true; 
            break;
        }
    }
    // Om inloggningen är lyckad, omdirigera användaren till courses.html
    if (authenticated) {
        window.location.href = "courses.html";
    } else {
        // Om inloggningen misslyckas, visas ett felmeddelande för användaren
        let errorMessage = document.getElementById("error");
        errorMessage.textContent = "Log in failed. Please check your username and password. (hint, username: silverbear462 / password: trinidad)";
    }

}