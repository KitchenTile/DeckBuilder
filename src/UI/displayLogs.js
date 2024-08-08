
const logToPrint = (log) => {
    const logDiv = document.getElementById("log");
    logDiv.innerHTML =`${log}`
}

const rewardLogToPrint = (log) => {
    const rewardLogDiv = document.getElementById("itemRewardLog");
    rewardLogDiv.innerHTML = `${log}`
}

export {logToPrint, rewardLogToPrint};