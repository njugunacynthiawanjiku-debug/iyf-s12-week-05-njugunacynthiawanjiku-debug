// STEP 1: SELECTING
const heading = document.querySelector("h1");
console.log(heading);

const paragraphs = document.querySelectorAll(".content");
console.log(paragraphs);

const form = document.getElementById("contact-form");
console.log(form);

const emailInput = document.querySelector("#contact-form #email");
console.log(emailInput);

const navItems = document.querySelectorAll(".nav-list li");
console.log(navItems);

const firstLink = document.querySelector(".nav-link");
console.log(firstLink);

const lastParagraph = document.querySelector("article p:last-of-type");
console.log(lastParagraph);

const submitButton = document.querySelector("button");
console.log(submitButton);

const allH2 = document.querySelectorAll("main h2");
console.log(allH2);

const footer = document.querySelector("footer");
console.log(footer);

// What does a missing element return?
console.log(document.querySelector(".does-not-exist"));

// Turn the nav items into an array of their text
console.log([...navItems].map(li => li.textContent));

// STEP 2: MOVING AROUND
const header = document.querySelector("#main-header");
console.log(header.querySelector("nav"));

console.log(firstLink.parentElement);

const article = document.querySelector("article");
console.log(article.nextElementSibling);

const ul = document.querySelector(".nav-list");
console.log(ul.children);

console.log(footer.parentElement);

console.log(firstLink.closest("header"));               

// STEP 3: CHANGING THINGS

// 1. Change the heading text
heading.textContent = "Khadija's DOM Practice";

// 2. Change the first link and open it in a new tab
firstLink.href = "https://developer.mozilla.org";
firstLink.target = "_blank";
firstLink.rel = "noopener";

// 3. Read and add data attributes
console.log(article.dataset.id);
console.log(article.dataset.category);
article.dataset.status = "reviewed";

// 4. Change looks with classes (no element.style)
paragraphs[0].classList.add("highlight");
paragraphs[1].classList.toggle("accent");

// 5. The injection demo
const userInput = `<img src="x" onerror="alert('hacked!')">`;
document.getElementById("unsafe").innerHTML = userInput;
document.getElementById("safe").textContent = userInput;

// Which would I use for a user's comment, and why?
// i would use textContent for a user's comment because it treats the input as plain text, preventing any HTML or JavaScript from being executed, which helps protect against XSS (Cross-Site Scripting) attacks. Using innerHTML would allow any HTML or scripts in the input to be rendered and executed, which could be a security risk.

// STEP 4: CREATE, CLONE, REMOVE

// 1. A function that adds a nav item
function addNavItem(text, href) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.className = "nav-link";
    a.href = href;
    a.textContent = text;
    li.appendChild(a);
    ul.appendChild(li);
}

addNavItem("Blog", "#blog");
addNavItem("Portfolio", "#portfolio");

// 2. A new paragraph before the article's first paragraph
const newParagraph = document.createElement("p");
newParagraph.textContent = "I made this paragraph with JavaScript.";
article.querySelector("p").before(newParagraph);

// 3. Clone the first nav item, change its text, put it first
const clone = ul.firstElementChild.cloneNode(true);
clone.querySelector("a").textContent = "Cloned";
ul.prepend(clone);

// 4. Remove the footer
footer.remove();