document.querySelector("button").addEventListener("click", () => {
    var birthYear = prompt("What year were you born... Good Friend?");

    while (isNaN(birthYear)) {
        var birthYear = prompt("What year were you born... Good Friend?", "Must enter an year");
    };

    var date = new Date();
    var ageInDays = (date.getFullYear() - birthYear) * 365;
    var result = document.createElement('h1');
    result.setAttribute("id", "ageInDays");
    var textAnswer = document.createTextNode("You are " + ageInDays + " days old.");
    result.appendChild(textAnswer);
    document.getElementById("flex-box-result").appendChild(result);

});

document.querySelectorAll('button')[1].addEventListener('click', () => {
    document.getElementById('ageInDays').remove();
});

document.querySelector("#generate-cat-button").addEventListener('click', () => {

    document.querySelector("#generate-cat-button").innerText = "Generating..."

    fetch("https://api.thecatapi.com/v1/images/search").then(response => (response.json())).then(data => {
        document.getElementById("cat-image").setAttribute("src", data[0].url);
        document.querySelector("#cat-image").style.visibility = "visible";
        document.querySelector("#cat-image").addEventListener("load", (e) => {
            if (e.returnValue === true) {
                document.querySelector("#generate-cat-button").innerText = "Generate Another Cat";
            }
        });

    });

})
