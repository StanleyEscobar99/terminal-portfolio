const output = document.getElementById("output");
const input = document.getElementById("terminal-input");

const commandsList = [
    "whoami", "ls", "cd", "projects", "certs", "contact", "help", "clear"
];

const commandsText = {
    whoami: "Stanley Escobar — Cybersecurity Student | Software Engineering Bootcamp Grad | CompTIA Certified",
    help: `Available commands:
- whoami        : Shows your name & role
- ls            : Lists available sections
- cd about      : View About Me
- cd projects   : View Projects
- cd certs      : View Certifications
- cd contact    : View Contact info
- clear         : Clears the terminal
- help          : Shows this help message`,
    ls: "about/   projects/   certs/   contact/"
};

const sections = {
    about:
        `Hi, I'm a cybersecurity and software engineering enthusiast with a non-traditional but driven path.

🧠 I completed a 6-month full-time software engineering bootcamp where I learned JavaScript (Node.js), HTML, CSS, and Git.

🎓 I'm currently earning my Bachelor of Science in Cybersecurity and Information Assurance.

🧰 I hold the following certifications:
- CompTIA A+, Network+, Security+
- Linux Essentials
- ITIL 4 Foundation

💻 I'm still exploring my path in cybersecurity — whether it's penetration testing, SOC analysis, or cloud security. My goal is to build a meaningful career in tech that offers challenge, growth, and long-term financial security.

🍲 Outside of tech, I dedicate time to charity work — including organizing food giveaways and supporting family-led outreach in El Salvador.

🏀 I’m also into basketball, DC superheroes, and classic cartoons — creativity and curiosity drive everything I do.

Type 'projects' to see my work or 'certs' to view my credentials.`,

    projects:
        `🧠 -Manipulate The DOM: A JavaScript project built to sharpen control over the DOM, user input, and dynamic rendering.

Features:
- Custom event handling
- Conditional UI updates
- Dynamic DOM manipulation
- Responsive state-based behavior

This project emphasizes clean logic, precision, and understanding how user actions affect app flow.


👉 <a href='https://github.com/StanleyEscobar99/manipulate-the-dom' target='_blank'>View on GitHub</a>`,

    certs: `
📜 Certifications:<br>
- <a href='https://www.credly.com/badges/2a79075b-5a25-4f24-ad08-e20194269937' target='_blank'>CompTIA A+</a><br>
- <a href='https://www.credly.com/earner/earned/badge/92584243-1060-46a7-a8c0-05c0ca4091f6' target='_blank'>CompTIA Network+</a><br>
- <a href='https://www.credly.com/earner/earned/badge/2bc42b00-d888-4005-a82e-f6b663f866b9' target='_blank'>CompTIA Security+</a><br>
- <span>PeopleCert: ITIL 4 Foundation (no public badge)</span><br>
- <a href='https://www.credly.com/earner/earned/badge/eb89afab-ec65-4332-a9ac-5cd505a318e0' target='_blank'>Linux Essentials</a>
`,
  contact: `
📧 Email: <a href='mailto:stanley.escobar.99@gmail.com'>stanley.escobar.99@gmail.com</a><br>
🔗 LinkedIn: <a href='https://www.linkedin.com/in/stanley-escobar21/' target='_blank'>linkedin.com/in/stanley-escobar21</a><br>
🐙 GitHub: <a href='https://github.com/StanleyEscobar99' target='_blank'>github.com/StanleyEscobar99</a>
`
}

const easterEggs = {
    sudo: "Nice try. You're not root here. 🛑",
    nmap: "Scanning localhost... All ports secure."
};

const introLines = [
    "Booting Cyber Portfolio...",
    "Initializing modules...",
    "Welcome to my terminal portfolio.",
    "Type 'help' to see commands."
];

let introIndex = 0;

function typeText(text, callback) {
    let i = 0;
    const interval = setInterval(() => {
        appendChar(text[i]);
        i++;
        if (i >= text.length) {
            clearInterval(interval);
            appendLine(""); // New line after typing
            callback && setTimeout(callback, 200);
        }
    }, 40);
}

function appendChar(char) {
    if (!output.lastChild || !output.lastChild.classList.contains("typing")) {
        const line = document.createElement("div");
        line.className = "typing";
        output.appendChild(line);
    }
    const lastLine = output.querySelector(".typing");
    lastLine.innerHTML += char === "\n" ? "<br>" : char;
    output.scrollTop = output.scrollHeight;
}

function finalizeTyping() {
    const lastLine = output.querySelector(".typing");
    if (lastLine) lastLine.classList.remove("typing");
}

function runIntro() {
    if (introIndex < introLines.length) {
        typeText(introLines[introIndex], () => {
            finalizeTyping();
            introIndex++;
            runIntro();
        });
    }
}

window.addEventListener("DOMContentLoaded", runIntro);

input.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
        e.preventDefault();
        autocomplete();
        return;
    }
    if (e.key === "Enter") {
        e.preventDefault();
        const cmd = input.value.trim();
        if (!cmd) return;
        appendLine(`secure@portfolio:~$ ${cmd}`);
        processCommand(cmd.toLowerCase());
        input.value = "";
    }
});

function autocomplete() {
    const text = input.value;
    const matches = commandsList.filter(c => c.startsWith(text));
    if (matches.length === 1) {
        input.value = matches[0] + " ";
    }
}

function processCommand(cmd) {
  if (cmd === "clear") {
    output.innerHTML = "";
    return;
  }

  if (commandsText[cmd]) {
    appendWithTyping(commandsText[cmd]);
    return;
  }

  // Only allow navigation with `cd section`
  if (cmd.startsWith("cd ")) {
    const section = cmd.split(" ")[1];
    if (sections[section]) {
      appendWithTyping(sections[section]);
    } else {
      appendWithTyping(`cd: no such section: ${section}`);
    }
    return;
  }

  if (easterEggs[cmd]) {
    appendWithTyping(easterEggs[cmd]);
    return;
  }

  appendWithTyping(`${cmd}: command not found`);
}


function appendLine(text) {
    const line = document.createElement("div");
    line.className = "line";

    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;

    if (text.includes("<a")) {
  line.innerHTML = text; // Already formatted — trust it
} else {
  let html = text
    .replace(urlRegex, url => `<a href="${url}" target="_blank">${url}</a>`)
    .replace(emailRegex, email => `<a href="mailto:${email}">${email}</a>`);
  line.innerHTML = html;
}

    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
}

function appendWithTyping(text) {
    // If text contains HTML or links, render instantly
    if (text.includes("<a") || text.includes("http")) {
        appendLine(text);
    } else {
        typeText(text, finalizeTyping);
    }
}

