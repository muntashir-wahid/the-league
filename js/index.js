"use strict";

/* ******************** */
// HTML Elements
/* ******************** */

const selectedLeagueEl = document.getElementById("selected-league");
const teamsContainerEl = document.getElementById("teams-container");
// const selectSessionEl = document.getElementById("selected-session");
const btnShowAll = document.getElementById("btn-show-all");

// console.log(selectedLeagueEl.value);

/* ******************** */
// Page logics
/* ******************** */

let getAllTeams;

const loadLeagueAllTeamsData = function (leagueName) {
  fetch(
    `https://www.thesportsdb.com/api/v1/json/2/search_all_teams.php?l=${leagueName}`
  )
    .then((res) => res.json())
    .then((data) => {
      const allTeams = data.teams;
      getTeamsData(allTeams);
      getAllTeams = function () {
        return allTeams;
      };
    });
};

const getTeamsData = function (teamsData) {
  btnShowAll.addEventListener("click", function () {
    renderLeagueData(teamsData);
    btnShowAll.classList.add("d-none");
  });

  renderLeagueData(teamsData.slice(0, 6));
};

const renderLeagueData = function (teamsData) {
  teamsContainerEl.innerHTML = "";

  teamsData.forEach((teamData, i) => {
    // console.log(teamData);
    const teamCardEl = document.createElement("article");
    teamCardEl.classList.add("col");
    teamCardEl.innerHTML = `
      <div class="card p-4 h-100">
        <img src="${teamData.strTeamBadge}" class="card-img-top" alt="..." />
        <div class="card-body">
          <h4 class="card-title text-info">${teamData.strTeam}</h4>
          <h5>Home ground: ${teamData.strStadium}</h5>
          <div class="d-flex mb-2 text-muted">
            <span class="py-1 px-2 me-2 bg-info rounded-pill">
              ${teamData.strCountry}
            </span>
            <span class="py-1 px-2 bg-info rounded-pill">
              ${teamData.intFormedYear}
            </span>
          </div>
          <p class="card-text">
            ${teamData.strDescriptionEN.slice(0, 150)}
          </p>
          </div>
          <button 
            class="btn btn-primary" 
            data-bs-toggle="modal" 
            data-bs-target="#teamDetails"
            onclick="showDetailsHandler(${i})"
          >
            Show more
          </button>
      </div>
    `;
    teamsContainerEl.append(teamCardEl);
  });
};

const defaultLeague = selectedLeagueEl.value;
loadLeagueAllTeamsData(defaultLeague);

selectedLeagueEl.addEventListener("change", function () {
  const selectedLeague = selectedLeagueEl.value;
  loadLeagueAllTeamsData(selectedLeague);
  btnShowAll.classList.remove("d-none");
});

const showDetailsHandler = function (index) {
  const team = getAllTeams()[index];
  console.log(team);
  renderTeamDetailsModal(team);
};

const renderTeamDetailsModal = function (team) {
  document.getElementById(
    "teamDetailsLabel"
  ).innerText = `${team.strAlternate}`;
  document.querySelector(".modal-body").innerText = `${team.strDescriptionEN}`;
};
