const output = document.getElementById("output");
const input = document.getElementById("terminal-input");

const commandsList = [
  "whoami",
  "ls",
  "cd",
  "about",
  "projects",
  "certs",
  "contact",
  "help",
  "clear"
];

const commandsText = {
  whoami:
    "Stanley Escobar — Cybersecurity Graduate | Security Operations | Incident Response | CompTIA Certified",

  help: `Available commands:

- whoami : Shows name & professional focus
- ls : Lists available sections
- about : View About Me
- projects : View completed projects
- certs : View Certifications
- contact : View Contact info
- cd about : Navigate to About Me
- cd projects : Navigate to Projects
- cd certs : Navigate to Certifications
- cd contact : Navigate to Contact
- clear : Clears the terminal
- help : Shows this help message`,

  ls: "about/ projects/ certs/ contact/"
};

const sections = {
  about: `Hi, I'm Stanley Escobar.

🎓 B.S. in Cybersecurity and Information Assurance from Western Governors University.

🛡️ My primary interests are Security Operations, Incident Response, Threat Detection, and Digital Forensics.

🔍 I have hands-on experience with Elastic SIEM, PowerShell, Active Directory, Windows Event Logs, pfSense, Autopsy, FTK Imager, OpenSSL, Windows, and Linux.

💻 I also have a software engineering background, including JavaScript, Node.js, React, MongoDB, Git, and GitHub.

🎯 I'm currently focused on building practical cybersecurity projects and pursuing an entry-level cybersecurity role.

Type 'projects' to view my completed work or 'certs' to view my credentials.`,

  projects: `
🔐 <strong>Secure File Encryption — AES-256</strong><br>
Implemented AES-256 encryption, secure key handling, and file transfer using PowerShell, OpenSSL, SSH, and SCP.<br>
👉 <a href="https://github.com/StanleyEscobar99/secure-file-encryption-aes256" target="_blank" rel="noopener noreferrer">View on GitHub</a><br><br>

🔑 <strong>Secure Email Encryption — RSA & OpenSSL</strong><br>
Implemented RSA-based encryption and decryption workflows using OpenSSL and asymmetric cryptography.<br>
👉 <a href="https://github.com/StanleyEscobar99/secure-email-encryption-openssl" target="_blank" rel="noopener noreferrer">View on GitHub</a><br><br>

💻 <strong>Jot Down</strong><br>
Full-stack software engineering project built with MongoDB, Express, React, and Node.js.<br>
👉 <a href="https://github.com/StanleyEscobar99/Jot_Down" target="_blank" rel="noopener noreferrer">View on GitHub</a>
`,

  certs: `
📜 <strong>Professional Certifications</strong><br><br>

- CompTIA CySA+<br>
- CompTIA Security+<br>
- CompTIA PenTest+<br>
- CompTIA Network+<br>
- CompTIA A+<br>
- CompTIA Data+<br>
- CompTIA Project+<br>
- Linux Professional Institute: Linux Essentials<br>
- PeopleCert: ITIL 4 Foundation
`,

  contact: `
📧 Email: <a href="mailto:stanley.escobar.99@gmail.com">stanley.escobar.99@gmail.com</a><br>
🔗 LinkedIn: <a href="https://www.linkedin.com/in/stanley-escobar21/" target="_blank" rel="noopener noreferrer">linkedin.com/in/stanley-escobar21</a><br>
🐙 GitHub: <a href="https://github.com/StanleyEscobar99" target="_blank" rel="noopener noreferrer">github.com/StanleyEscobar99</a>
`
};

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
      appendLine("");

      if (callback) {
        setTimeout(callback, 200);
      }
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

  if (lastLine) {
    lastLine.innerHTML += char === "\n" ? "<br>" : char;
  }

  output.scrollTop = output.scrollHeight;
}

function finalizeTyping() {
  const lastLine = output.querySelector(".typing");

  if (lastLine) {
    lastLine.classList.remove("typing");
  }
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
  const text = input.value.trim().toLowerCase();

  const matches = commandsList.filter((command) =>
    command.startsWith(text)
  );

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

  // Allow direct commands such as:
  // about, projects, certs, contact
  if (sections[cmd]) {
    appendWithTyping(sections[cmd]);
    return;
  }

  // Allow terminal-style navigation such as:
  // cd projects
  if (cmd.startsWith("cd ")) {
    const section = cmd.split(/\s+/)[1];

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
  const emailRegex =
    /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;

  // If text already contains HTML, render it directly
  if (/<[^>]+>/.test(text)) {
    line.innerHTML = text;
  } else {
    let html = text
      .replace(
        urlRegex,
        (url) =>
          `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`
      )
      .replace(
        emailRegex,
        (email) => `<a href="mailto:${email}">${email}</a>`
      );

    line.innerHTML = html;
  }

  output.appendChild(line);
  output.scrollTop = output.scrollHeight;
}

function appendWithTyping(text) {
  // Render formatted HTML instantly.
  // Plain terminal text keeps the typing animation.
  if (/<[^>]+>/.test(text)) {
    appendLine(text);
  } else {
    typeText(text, finalizeTyping);
  }
}
