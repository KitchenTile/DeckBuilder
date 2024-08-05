
const logToPrint = (log) => {
    const logDiv = document.getElementById("log");
    logDiv.innerHTML =`${log}`
}

const rewardLogToPrint = (log) => {
    const rewardLogDiv = document.getElementById("rewardLog");
    rewardLogDiv.innerHTML = `${log}`
}

export {logToPrint, rewardLogToPrint};