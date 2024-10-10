console.log("hello");

let numColumns = 3;
let selectedIndex = -1;
let projects = [
    {
        name: "RASCAL",
        pageContents: `<p>hello</p>`
    },
    {
        name: "Mr. Pizza",
        pageContents: "<p>yello</p>"
    },
    {
        name: "Perceptron and Neural Network",
        pageContents: ""
    },
    {
        name: "RU On Time",
        pageContents: ""
    },
    {
        name: "Musik",
        pageContents: ""
    },
    {
        name: "Recyclinator",
        pageContents: ""
    },
    {
        name: "Cougar Script Editor",
        pageContents: ""
    },
    {
        name: "Autonomous Laser Turret",
        pageContents: ""
    },
    {
        name: "Photo Gallery",
        pageContents: ""
    },
    {
        name: "Chess App",
        pageContents: ""
    },
    {
        name: "Flight Reservation",
        pageContents: ""
    },
    {
        name: "Robo James",
        pageContents: ""
    },
    {
        name: "A* Algorithm Showcase",
        pageContents: ""
    }
];

// populate the projects with data
function populateProjects() {

    let columns = [];
    for (let i = 0; i < numColumns; i++) {
        columns.push(fromHTML(`<div class="projects-grid-column"></div>`));
    }

    let projectsList = document.getElementById("projects-list");

    // add the project cards to the columns
    for (let i = 0; i < projects.length; i++) {
        let project = projects[i];

        let projectCard = fromHTML(
            `<div class="project-card" onclick="updateProjectsDisplay(${i})">
                <p class="project-title">${project.name}</p>
            </div>`
        );

        columns[i % numColumns].appendChild(projectCard);
        columns[i % numColumns].appendChild(fromHTML(`<div class="projects-spacer"></div>`));

        // add a copy to the list
        let copy = projectCard.cloneNode(true);
        copy.classList.add("shrink");
        projectsList.appendChild(copy);
        projectsList.appendChild(fromHTML(`<div class="projects-spacer"></div>`));


    }

    // add the columns to the projects grid
    let grid = document.getElementById("projects-grid");
    for (let i = 0; i < numColumns; i++) {
        grid.appendChild(columns[i]);
        if (i < numColumns - 1) {
            grid.appendChild(fromHTML(`<div class="projects-spacer"></div>`));
        }
    }
}


/**
 * updates the display based on the selected index
 */
window.updateProjectsDisplay = async (index) => {
    console.log(index);
    // none selected
    if (index == -1) {
        document.getElementById('projects-grid').classList.remove("hidden");
        document.getElementById('projects-detailed-view').classList.add("hidden");
        return;
    }

    // project selected
    let project = projects[index];
    document.getElementById('projects-grid').classList.add("hidden");
    document.getElementById('projects-detailed-view').classList.remove("hidden");

    // set details
    let projectDetails = document.getElementById("project-details");
    while (projectDetails.firstChild) {
        projectDetails.removeChild(projectDetails.lastChild);
    }
    projectDetails.appendChild(fromHTML(
    `<div class="project-details-header">
    <button class="project-details-x" onclick="updateProjectsDisplay(-1)">
        <p class="project-details-x-text">X</p>
        </button>
        </div>`))
    projectDetails.appendChild(fromHTML(` <h2 class="section-header">${project.name}</h2> `))

    // get details
    let detailsHTML = await new Promise(resolve => {
        fetch(`/project_pages/${project.name}.html`).then((res) => resolve(res.text()))
    })
    let details = fromHTML(detailsHTML)
    details.childNodes.values().forEach(n => projectDetails.appendChild(n));
}

/**
 * @param {String} HTML representing a single element.
 * @param {Boolean} flag representing whether or not to trim input whitespace, defaults to true.
 * @return {Element | HTMLCollection | null}
 */
function fromHTML(html, trim = true) {
    // Process the HTML string.
    html = trim ? html.trim() : html;
    if (!html) return null;

    // Then set up a new template element.
    const template = document.createElement("template");
    template.innerHTML = html;
    const result = template.content.children;

    // Then return either an HTMLElement or HTMLCollection,
    // based on whether the input HTML had one or more roots.
    if (result.length === 1) return result[0];
    return result;
}

populateProjects();
window.updateProjectsDisplay(-1);
