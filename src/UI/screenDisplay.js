export default function screenDisplay(state) { 
    switch (state) {
        case "endScreen": // Change the div's styling to display the logs in the middle of the screen in a larger font
            document.querySelector(".top_bit").setAttribute("style", "flex-direction:row; background:black"); // I use .setAttribute instead of .style because flex-drection doesn't work with .style
            document.querySelector("#enemy").style.display = "none";
            document.querySelector(".logs").setAttribute("style", "display: flex;top: 10%;left: 40%;font-size: 40px;position: absolute;align-items: flex-start;flex-direction: column;"); 
            document.querySelector("#itemRewardLog").setAttribute("style", "display:inline;")
            document.querySelector("#cardRewardLog").setAttribute("style", "display:inline;")
            document.querySelector("#cardUpgradeLog").setAttribute("style", "display:inline; margin-top:20px")

            document.querySelector("#card_Reward_Visual").setAttribute("style", "display:flex;")
            document.querySelector("#upgradeCardVisual").setAttribute("style", "display:grid;")

            break;
        case "restartScreen": // Change the div's styling to undo endScreen changes
            document.querySelector(".top_bit").setAttribute("style", "flex-direction:column; background-image: url('../src/images/Background.jpeg'); flex-direction: column; background-repeat: no-repeat; background-size: 100%; align-items: center;");
            document.querySelector("#enemy").style.display = "flex";
            document.querySelector(".logs").setAttribute("style", "font-size:24px;position:absolute");
            document.querySelector("#itemRewardLog").setAttribute("style", "display:none")
            document.querySelector("#cardRewardLog").setAttribute("style", "display:none")
            document.querySelector("#cardUpgradeLog").setAttribute("style", "display:none;")

            break;
    }
}