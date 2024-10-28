const navBar = () => {
    // Modify the navBar div to get as many links as we want retrieved from the list below.

    const navBarDiv = document.querySelector(".navBar");
    const navBarData = [{name: "HOME"},{name: "SCORE BOARD"}, {name: "INSTRUCTIONS"}];

    navBarData.forEach((link, index) => {
        navBarDiv.innerHTML += `
            <a href="${link.name.replace(/\s/g, '')}" id=${index}>${link.name}</a>
        `
    })
}

export default navBar;