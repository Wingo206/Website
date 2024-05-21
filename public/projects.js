console.log("hello");

let selectedIndex = -1;

// populate the projects with data
function populateProjectsGrid() {
    let projects = ["RASCAL", "Mr. Pizza", "test 1", "test2"];
    for (let i = 0; i < projects.length; i++) {
        let project = projects[i];
        let projectsSection = document.getElementById("projects-grid");

        let projectCard = fromHTML(
            `<div class="project-card" onclick="projectCardClick(${i})">
                <p class="project-title">${project}</p>
            </div>`
        );

        projectsSection.appendChild(projectCard);
    }
}
/**
 * updates the display based on the selected index
 */
function updateDisplay(index) {
    // none selected
    if (index == -1) {
        return;
    }

    // project selected
}

window.projectCardClick = (index) => {
    console.log("Project " + projects[index] + " was clicked.");
    updateDisplay(index);
};

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
