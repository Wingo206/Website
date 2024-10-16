console.log("hello");

let numColumns = 3;
let selectedIndex = -1;
let projects = [
    {
        id: "rascal",
        name: "RASCAL",
        thumbnail: "rascal.png",
        tags: ["Linux", "ROS", "Python", "PyTorch", "OpenCV", "Flask", "Virtual Box"],
        start_date: "May 2022",
        end_date: "August 2024"
    },
    {
        id: "mr_pizza",
        name: "Mr. Pizza",
        thumbnail: "chatbot.png",
        tags: ["Node.js", "SQL", "NLP", "HTML", "Javascript", "REST", "Google Maps", "Stripe", "Bcrypt"],
        start_date: "January 2024",
        end_date: "May 2024"
    },
    {
        id: "musik",
        name: "Musik",
        thumbnail: "musik_demo.gif",
        tags: ["Pygame", "OpenCV", "Arduino", "ArUco detection", "Camera calibration"],
        start_date: "January 2024",
        end_date: "May 2024"
    },
    {
        id: "a_star",
        name: "A* Algorithm Showcase",
        thumbnail: "a_star_demo.gif",
        tags: ["JavaScript", "A*", "Maze Generation"],
        start_date: "February 2024"
    },
    {
        id: "recyclinator",
        name: "The Recyclinator",
        thumbnail: "irl.jpg",
        tags: ["Arduino", "Flutter", "Fusion 360", "Computer Vision"],
        start_date: "January 2023",
        end_date: "May 2023"
    },
    {
        id: "ru_on_time",
        name: "RU On Time",
        thumbnail: "pet_info.png",
        tags: ["Flutter", "Firebase", "Android"],
        start_date: "September 2021",
        end_date: "December 2021"
    },
    {
        id: "perceptron",
        name: "Perceptron and Neural Network",
        tags: ["Machine Learning", "MATLAB", "Perceptron", "Multilayered Perceptron"],
        start_date: "April 2024"
    },
    {
        id: "cse",
        name: "Cougar Script Editor",
        thumbnail: "cse.png",
        tags: ["Java", "FRC", "JSON"],
        start_date: "January 2019",
        end_date: "June 2020"
    },
    {
        id: "laser_turret",
        name: "Autonomous Laser Turret",
        thumbnail: "laser_turret_irl.png",
        tags: ["Raspberry Pi", "Python", "Bluetooth", "Flutter", "Computer Vision", "Canny Edge Detection", "Hough Transform"],
        start_date: "September 2020",
        end_date: "June 2021",
    },
    {
        id: "raytracing",
        name: "3D Rendering and Lighting Engine",
        thumbnail: "3d_1.png",
        tags: ["Java", "Raytracing"],
        start_date: "June 2020"
    }
    // {
    //     name: "Photo Gallery",
    // },
    // {
    //     name: "Chess App",
    // },
    // {
    //     name: "Flight Reservation",
    // },
    // {
    //     name: "Robo James",
    // },
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

        // add the thumbnail if available
        if (project.thumbnail) {
            projectCard.appendChild(fromHTML(
                `<img class="project_thumbnail" src="project_pages/${project.id}/${project.thumbnail}">`
            ))
        }

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
    let detailsString = "";
    detailsString += `<div class="project-details-header">
    <h2 class="section-header">${project.name}</h2>
    <div style="flex-grow:1"></div>
    <button class="project-details-x" onclick="updateProjectsDisplay(-1)">
        <p class="project-details-x-text">X</p>
        </button>
        </div>`
    // header
    // detailsString += `<h2 class="section-header">${project.name}</h2>`
    // tags
    if (project.tags) {
        detailsString += '<p>' + project.tags.map(t => t).join(", ") + '</p>'
    }
    // dates
    if (project.start_date) {
        detailsString += `<p>${project.start_date}${(project.end_date) ? " - " + project.end_date : ""}</p>`
    }

    // page contents
    let detailsHTML = await new Promise(resolve => {
        fetch(`project_pages/${project.id}/${project.id}.html`).then((res) => resolve(res.text()))
    })
    detailsString += detailsHTML

    // add to the section
    let details = fromHTML(detailsString)
    Array.from(details).forEach(n => {console.log(n); projectDetails.appendChild(n)});
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
