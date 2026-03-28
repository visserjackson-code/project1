//fetch json on page load and store inside variable
import encounters from './encounters.json' with { type: 'json' };



const starters = encounters.starters;
const r101 = encounters.r101;

for (let starter in starters) {
 console.log(starter);
}

for (let encounter in r101) {
    console.log(encounter);
}

const starterDropdown = document.getElementById('starter-choose');
const r101Dropdown = document.getElementById('101-choose');
const r103Dropdown = document.getElementById('103-choose');
const r102Dropdown = document.getElementById('102-choose');



const calculatePercentageOdds = (rate) => {
    if (isNaN(rate)) return rate;

    else {
        return (rate * 100) + "%";
    }

}

const getSprite = async (mon) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${mon.toLowerCase()}`);
    const data = await response.json();
    return data.sprites.front_default;
}

const mudkipHeader = document.getElementById('starter-1');
const treeckoHeader = document.getElementById('starter-2');
const torchicHeader = document.getElementById('starter-3');
mudkipHeader.src = await getSprite('mudkip');
treeckoHeader.src = await getSprite('treecko');
torchicHeader.src = await getSprite('torchic');


const renderEncounterOptions = (areaData, areaName, targetDropdown) => {
    const template = document.getElementById("encounter-option-template");
    targetDropdown.innerHTML = '';

    const defaultOption = document.createElement('option');
    defaultOption.textContent = areaName;
    defaultOption.selected = true;
    defaultOption.disabled = true;
    targetDropdown.appendChild(defaultOption);

    for (const mon in areaData) {
            const clone = template.content.cloneNode(true);
            const option = clone.querySelector('.encounter-option');

            option.value = mon;
            option.textContent = `${areaData[mon].name}  (Odds: ${calculatePercentageOdds(areaData[mon].rate)})`

            targetDropdown.appendChild(clone);
    }
}

renderEncounterOptions(encounters['starters'], 'Starters', starterDropdown);
renderEncounterOptions(encounters['r101'], 'Route 101', r101Dropdown);
renderEncounterOptions(encounters['r103'], 'Route 103', r103Dropdown);
renderEncounterOptions(encounters['r102'], 'Route 102', r102Dropdown);


