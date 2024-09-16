
const logToPrint = (log) => {
    const logDiv = document.getElementById("log");
    logDiv.innerHTML =`${log}`
}

const itemRewardLogToPrint = (log) => {
    const rewardLogDiv = document.getElementById("itemRewardLog");
    rewardLogDiv.innerHTML = `${log}`
}

const cardRewardLogToPrint = (log) => {
    const rewardLogDiv = document.getElementById("cardRewardLog");
    rewardLogDiv.innerHTML = `${log}`
}

const cardUpgradeLogToPrint = (log) => {
    const upgradeLogDiv = document.getElementById("cardUpgradeLog");
    upgradeLogDiv.innerHTML = `${log}`
}

export {logToPrint, itemRewardLogToPrint, cardRewardLogToPrint, cardUpgradeLogToPrint};