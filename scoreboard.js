import navBar from "./UI/navBar";
import scoreBoardDisplay from "./UI/scoreboardDisplay";

// Display navbar
navBar();


//sorts the user objects by score
const sortScores = () => {
    const scoreList = [];

    for (let i = 0; i < localStorage.length; i++) {
        const user = JSON.parse(localStorage.getItem(localStorage.key(i)))
        scoreList.push(user);
    }

    scoreList.sort((a, b) => b.score - a.score);

    return scoreList;
}

scoreBoardDisplay(sortScores());