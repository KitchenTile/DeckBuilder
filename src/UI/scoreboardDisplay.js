const scoreBoardDisplay = (scoreList) => {
    const scoreBoardDiv = document.querySelector(".scoreBoardTable");

    scoreBoardDiv.innerHTML += "<h1>CLEANER </h1> <h1>EARNINGS</h1> "

    //display the top 10 users by score
    for (let i = 0; i < 10; i++){

        //if the local storage array's length is less than 10, it will return undefined for the remaining 

        const user = scoreList[i];
        console.log(user)

        scoreBoardDiv.innerHTML += `
            <h2> ${user.email}:</h2> <h2>$${user.score}</h2>
        `
    }
    
}

export default scoreBoardDisplay