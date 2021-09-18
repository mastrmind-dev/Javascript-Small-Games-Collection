document.querySelector("button").addEventListener("click", () => {
    var birthYear = prompt("What year were you born... Good Friend?");

    while(isNaN(birthYear)){
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

