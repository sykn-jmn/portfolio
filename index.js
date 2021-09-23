const DATA = [
  {
    title: "Loop Game Copy",
    thumbnail: "images/snapshots/Loop Game.png",
    image: "images/snapshots/Loop Game Copy Main.png",
    captions: ["Side Project", "2021"],
    description:
      "Loop Game Copy is a my own implementation of the Android game Infinite Loop. I made this with the final goal of making a Neural Network Powered level maker that inputs a drawing and outputs a level. This has not been implemented yet but it will be soon.",
    tags: [
      "Java",
      "JFrame",
      "Object-Oriented Programming",
      "Github",
    ],
    sourceCode: "https://github.com/sykn-jmn/Loop-Game-Copy",
    liveLink: "https://github.com/sykn-jmn/Loop-Game-Copy",
  },
  {
    title: "Webcam To ASCII Art",
    thumbnail: "images/snapshots/Image To Ascii Art.png",
    image: "images/snapshots/Image To Ascii Art.png",
    captions: ["Webcam", "Side Project", "2020", "ASCII Art","3rd Party Library","Image Processing"],
    description:
      "Intrigued by ASCII Art, I made a program that inputs the camera frames and outputs an ASCII art based on average lightness of pixels. Something new that I wanted to learn and actually learned in making this was the way for a Java Program to access the Camera.",
    tags: ["Java", "JFrame", "Webcam Capture by Sarxos"],
    sourceCode: "https://github.com/sykn-jmn/Webcam_To_ASCII-Art",
    liveLink: "https://user-images.githubusercontent.com/56058545/133916833-e04136be-e261-41a3-b500-f51ff05e4523.mp4",
  },
  {
    title: "UNO",
    thumbnail: "images/snapshots/UNO.png",
    image: "images/snapshots/UNO.png",
    captions: ["Card Game", "Side Project", "2019"],
    description:
      'When I was beginning to explore python, I wanted to do a project that includes some form of graphics. Thus I created UNO. Challenges I faced when making this was the fact that Turtle Graphics works in a very different way compared to Java\'s Graphics',
    tags: ["Python", "Turtle"],
    sourceCode: "https://github.com/sykn-jmn/UNO",
    liveLink: "https://github.com/sykn-jmn/UNO",
  },
  {
    title: "Polar Equation Grapher",
    thumbnail: "images/snapshots/Polar Grapher.png",
    image: "images/snapshots/Polar Grapher.png",
    captions: ["Polar Coordinates", "Side Project", "2019"],
    description:
      "Being both interested in programming and calculus, I made a program based on the topic that we were currently on when I made this which was Polar Equations. Given the nature of Python Turtle\'s graphics, this project became a lot easier compared to if I implemented it in Java",
    tags: ["Python", "Turtle"],
    sourceCode: "https://github.com/sykn-jmn/polarCoordinateGraph",
    liveLink: "https://github.com/sykn-jmn/polarCoordinateGraph",
  },
  {
    title: "Maze Runer",
    thumbnail: "images/snapshots/Maze Runner.png",
    image: "images/snapshots/Maze Runner.png",
    captions: ["Depth-First Search", "Side Project", "2020"],
    description:
      "A Website that generates and solves a Maze using the Depth-First Search Algorithm. I thought of making this while watching a Maze Creating Algorithm on Youtube. Halfway through the video, I was inspired to make it so I stopped watching and started making",
    tags: ["JavaScript", "BootStrap", "HTML"],
    sourceCode: "https://github.com/sykn-jmn/Maze_Runner",
    liveLink: "https://sykn-jmn.github.io/Maze_Runner/",
  },
];

const openMenuBtn = document.getElementById("open-menu");
const closeMenuBtn = document.getElementById("close-menu");
const navLinks = document.getElementById("mobile-nav");
const modalContainer = document.getElementById("modal-container");
const portfolio = document.getElementById("portfolio");
const form = document.getElementById("contact-form");
const appBar = document.querySelector(".app-bar");
const menu = document.querySelector(".mobile-menu");
const container = document.querySelector(".container");
const helperText = document.getElementById("helper-text");

/**
 * Helper function for creating HTML DOM elements
 */
function createComponent(name, props = {}) {
  const { children = [], ...attributes } = props;
  const element = document.createElement(name);
  Object.keys(attributes).forEach((attribute) => {
    element[attribute] = attributes[attribute];
  });
  children.forEach((child) => element.appendChild(child));

  return element;
}

function Icon(name) {
  const icon = createComponent("img", {
    src: `images/icons/${name}.svg`,
    alt: "",
  });

  return icon;
}

function Captions(data = []) {
  const row = [];

  data.forEach((text, index, arr) => {
    const caption = createComponent("span", {
      className: `caption bolder-2 color-n${index === 0 ? "600" : "100"}`,
      textContent: text,
    });
    row.push(caption);
    if (index !== arr.length - 1) {
      row.push(Icon("dot"));
    }
  });

  const captions = createComponent("div", {
    className: "captions",
    children: row,
  });

  return captions;
}

function Title(text) {
  const title = createComponent("h2", {
    className: "header-3 color-n800 mb-12",
    textContent: text,
  });

  return title;
}

function Paragraph(text) {
  const paragraph = createComponent("p", {
    className: "body-3 color-n600 mb-12",
    textContent: text,
  });

  return paragraph;
}

function Tags(data = []) {
  const tags = createComponent("ul", {
    className: "tags",
    children: data.map((tag) =>
      createComponent("li", {
        className: "tag",
        children: [
          createComponent("span", {
            className: "small color-b400",
            textContent: tag,
          }),
        ],
      })
    ),
  });

  return tags;
}

function Picture(src, className = "snapshot") {
  const image = createComponent("img", {
    src,
    alt: "Snapshot of project",
    className,
  });

  return image;
}

function Button({ text, icon, type, href }) {
  let button;
  if (type === "link") {
    button = createComponent("a", {
      className: "link-button",
      href,
      innerText: text,
      children: [Icon(icon)],
    });
  } else if (type === "icon-button") {
    button = createComponent("button", {
      type: "button",
      className: "icon-button",
      children: [Icon("cancel")],
    });
  } else {
    button = createComponent("button", {
      type: "button",
      className: "button",
      textContent: text,
    });
  }

  return button;
}

function toggleModal() {
  container.classList.toggle("modal-overlay");
  document.body.classList.toggle("scroll-off");
}

/**
 * Create Modal component for project details
 */
function createModal(project) {
  const ModalFooter = createComponent("div", {
    className: "modal-footer",
    children: [
      Button({
        type: "link",
        text: "See Demo",
        icon: "link",
        href: project.liveLink,
      }),
      Button({
        type: "link",
        text: "See Source",
        icon: "github-blue",
        href: project.sourceCode,
      }),
    ],
  });

  const Divider = createComponent("div", {
    className: "divider",
  });

  const Right = createComponent("div", {
    className: "modal-right-block",
    children: [Tags(project.tags), Divider, ModalFooter],
  });

  const Left = createComponent("div", {
    className: "modal-left-block",
    children: [Paragraph(project.description)],
  });

  const ModalBodyContent = createComponent("div", {
    className: "modal-blocks mt-12",
    children: [Left, Right],
  });

  const ModalBody = createComponent("div", {
    className: "modal-body",
    children: [
      Captions(project.captions),
      Picture(project.image, "modal-image"),
      ModalBodyContent,
    ],
  });

  const CloseButton = Button({
    type: "icon-button",
    icon: "cancel",
  });

  const ModalHeader = createComponent("div", {
    className: "modal-header mb-12",
    children: [Title(project.title), CloseButton],
  });

  const ModalContent = createComponent("div", {
    className: "modal-content bg-n0",
    children: [ModalHeader, ModalBody],
  });

  const Dialog = createComponent("div", {
    className: "modal-dialog",
    children: [ModalContent],
  });

  const Modal = createComponent("div", {
    className: "modal",
    children: [Dialog],
  });

  CloseButton.addEventListener("click", () => {
    toggleModal();
    modalContainer.removeChild(Modal);
  });

  return Modal;
}

/**
 * Create and return a project card DOM Node,
 * to be inserted into the project section on the main page.
 */
function createCard(project, invert) {
  const CardImage = Picture(project.thumbnail);
  const CardTitle = Title(project.title);
  const CardText = Paragraph(project.description);
  const ProjectCaptions = Captions(project.captions);
  const ProjectTags = Tags(project.tags);
  const CardButton = Button({ text: "See Project" });

  const CardFooter = createComponent("div", {
    className: "action",
    children: [CardButton],
  });

  const CardBody = createComponent("div", {
    className: `card-body mt-12 + ${invert ? " swap" : ""}`,
    children: [CardTitle, ProjectCaptions, CardText, ProjectTags, CardFooter],
  });

  const Card = createComponent("article", {
    children: [CardImage, CardBody],
    className: "card",
  });

  CardButton.addEventListener("click", () => {
    modalContainer.appendChild(createModal(project));
    toggleModal();
  });

  return Card;
}

/**
 * Add projects to HTML portfolio section
 */
function loadProjects(data = []) {
  data.forEach((project, index) => {
    portfolio.appendChild(createCard(project, index % 2 === 1));
  });
}

function toggleMenu() {
  menu.classList.toggle("open-menu");
  container.classList.toggle("menu-overlay");
  document.body.classList.toggle("scroll-off");
}

let scrolling = false;
function onScroll() {
  scrolling = true;
}

// Throttle onscroll listener
setInterval(() => {
  if (scrolling) {
    scrolling = false;
    const scrollY = Math.round(window.scrollY);
    if (scrollY) {
      appBar.classList.add("elevate-header");
    } else {
      appBar.classList.remove("elevate-header");
    }
  }
}, 300);

function validateForm(event) {
  const email = form.elements.user_email;
  const { value } = email;
  const expected = value.toLowerCase();
  if (value !== expected) {
    email.classList.add("error");
    helperText.innerText = `Email must be in lower case. Example: ${expected}`;
    event.preventDefault();
  } else {
    email.classList.remove("error");
  }
}

const STORE_KEY = "formData";

/**
 * This function will save the user current input
 * in local storage.
 */
function persistFormData(event) {
  let currentData = {};
  const storedData = localStorage.getItem(STORE_KEY);

  if (storedData) {
    currentData = JSON.parse(storedData);
  }

  const { name, value } = event.target;
  currentData[name] = value;
  localStorage.setItem(STORE_KEY, JSON.stringify(currentData));
}

/**
 * This function will check for saved form data,
 * and populate the page contact form if found.
 */
function populateForm() {
  const dataString = localStorage.getItem(STORE_KEY);

  if (dataString) {
    const storedData = JSON.parse(dataString);
    Object.keys(storedData).forEach((key) => {
      form[key].value = storedData[key];
    });
  }
}

function resetForm() {
  localStorage.removeItem(STORE_KEY);
  const email = form.elements.user_email;
  email.classList.remove("error");
  helperText.innerText = "";
}

function onPageLoad() {
  loadProjects(DATA);
  populateForm();
}

form.addEventListener("reset", resetForm);
form.user_email.addEventListener("input", persistFormData);
form.user_name.addEventListener("input", persistFormData);
form.message.addEventListener("input", persistFormData);
form.addEventListener("submit", validateForm);
openMenuBtn.addEventListener("click", toggleMenu);
closeMenuBtn.addEventListener("click", toggleMenu);
navLinks.addEventListener("click", toggleMenu);
window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("load", onPageLoad);
