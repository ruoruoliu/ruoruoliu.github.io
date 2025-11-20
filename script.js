// script.js
let age = 18;
var age_diff = 2;
var age_after = age + age_diff;
let city = "New York";
const pi = 3.14;

let sentence = `I am ${age_after} years old and I live in ${city}.`;

if (age_after >= 18) {
    sentence += " I am an adult.";
} else {
    sentence += " I am a minor.";
}
console.log("Script loaded: " + sentence);
// alert("Welcome to the Page!");


let colors = ["red", "green", "blue"];
colors.push("yellow");
console.log(`all ${colors.length} colors, last one is ${colors[colors.length - 1]}, all colors are ${colors.join(", ")}`);

for (let i = 0; i < colors.length; i++) {
    console.log(`Color ${i + 1}: ${colors[i]}`);
}

function greet(name) {
    return `Hello, ${name}!`;
}

console.log(greet("Visitor"));

function add_color(color) {
    colors.push(color);
    console.log(`Added color: ${color}`);
}

add_color("purple");
console.log(`Updated colors: ${colors.join(", ")}`);

const ul = document.querySelector(".subjects");
function add_subject(subject) {
    const li = document.createElement("li");
    // li.textContent = subject;
    li.innerHTML = `
        <input type="checkbox" class="subject-checkbox">
        <label>${subject}</label>
        <button class="delete-button">🗑️</button>
    `
    
    const deleteButton = li.querySelector(".delete-button");
    deleteButton.addEventListener("click", function() {
        li.remove();
        console.log(`Deleted subject: ${subject}`);
    });

    const checkbox = li.querySelector(".subject-checkbox");
    checkbox.addEventListener("change", function() {
        if (checkbox.checked) {
            console.log(`Subject completed: ${subject}`);
            li.style.textDecoration = "line-through";
            ul.append(li);
        } else {
            console.log(`Subject uncompleted: ${subject}`);
            li.style.textDecoration = "none";
            ul.prepend(li);
        }
    });


    ul.appendChild(li);
    console.log(`Added subject: ${subject}`);
}

// add_subject("物理");
// add_subject("化学");

const input = document.querySelector(".input");
input.addEventListener("keyup", function(event) {
    // console.log(event);
    if (event.key === "Enter" && event.target.value.trim() !== "") {
        console.log("Input changed to:", event.target.value);
        add_subject(event.target.value);
        event.target.value = "";
    }
});

const addButton = document.querySelector(".add-button");
addButton.addEventListener("click", function() {
    if (input.value.trim() !== "") {
        console.log("Button clicked, adding subject:", input.value);
        add_subject(input.value);
        input.value = "";
    }
});
