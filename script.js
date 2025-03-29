// Sports data
const sportsData = {
    football: {
      team: "Manchester United",
      year: 2022,
      coach: "Erik ten Hag",
      players: [
        { id: 1, name: "David de Gea", number: 1, position: "Goalkeeper", image: "player1.jpg" },
        { id: 2, name: "Harry Maguire", number: 5, position: "Defender", image: "player2.jpg" },
        { id: 3, name: "Bruno Fernandes", number: 8, position: "Midfielder", image: "player3.jpg" },
        { id: 4, name: "Marcus Rashford", number: 10, position: "Forward", image: "player4.jpg" },
        { id: 5, name: "Luke Shaw", number: 23, position: "Defender", image: "player5.jpg" },
        { id: 6, name: "Casemiro", number: 18, position: "Midfielder", image: "player6.jpg" },
        { id: 7, name: "Antony", number: 21, position: "Forward", image: "player7.jpg" },
        { id: 8, name: "Raphael Varane", number: 19, position: "Defender", image: "player8.jpg" },
        { id: 9, name: "Mason Mount", number: 7, position: "Midfielder", image: "player9.jpg" }
      ]
    },
    volleyball: {
      team: "USA National Team",
      year: 2022,
      coach: "John Speraw",
      players: [
        { id: 1, name: "Matt Anderson", number: 1, position: "Outside Hitter", image: "vplayer1.jpg" },
        { id: 2, name: "Micah Christenson", number: 11, position: "Setter", image: "vplayer2.jpg" },
        { id: 3, name: "Max Holt", number: 17, position: "Middle Blocker", image: "vplayer3.jpg" },
        { id: 4, name: "Aaron Russell", number: 2, position: "Outside Hitter", image: "vplayer4.jpg" },
        { id: 5, name: "David Smith", number: 20, position: "Middle Blocker", image: "vplayer5.jpg" },
        { id: 6, name: "Erik Shoji", number: 22, position: "Libero", image: "vplayer6.jpg" }
      ]
    },
    rugby: {
      team: "New Zealand All Blacks",
      year: 2022,
      coach: "Scott Robertson",
      players: [
        { id: 1, name: "Sam Cane", number: 7, position: "Flanker", image: "rplayer1.jpg" },
        { id: 2, name: "Beauden Barrett", number: 10, position: "Fly-half", image: "rplayer2.jpg" },
        { id: 3, name: "Aaron Smith", number: 9, position: "Scrum-half", image: "rplayer3.jpg" },
        { id: 4, name: "Brodie Retallick", number: 4, position: "Lock", image: "rplayer4.jpg" },
        { id: 5, name: "Ardie Savea", number: 8, position: "Number 8", image: "rplayer5.jpg" },
        { id: 6, name: "Rieko Ioane", number: 13, position: "Center", image: "rplayer6.jpg" },
        { id: 7, name: "Damian McKenzie", number: 15, position: "Fullback", image: "rplayer7.jpg" }
      ]
    }
  };
  
  // State management
  let currentSport = 'football';
  let currentFilter = 'all';
  
  // DOM Elements
  const playersContainer = document.getElementById('players-container');
  const teamName = document.getElementById('team-name');
  const teamYear = document.getElementById('team-year');
  const teamCoach = document.getElementById('team-coach');
  const playerCount = document.getElementById('player-count');
  const sportTabs = document.querySelectorAll('.tab-btn');
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  // Initialize the app
  function init() {
    updateTeamDetails();
    renderPlayers();
    
    // Event listeners for sport tabs
    sportTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const sport = tab.dataset.sport;
        if (sport !== currentSport) {
          currentSport = sport;
          updateActiveTab();
          updateTeamDetails();
          renderPlayers();
        }
      });
    });
    
    // Event listeners for filter buttons
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        if (filter !== currentFilter) {
          currentFilter = filter;
          updateActiveFilter();
          renderPlayers();
        }
      });
    });
  }
  
  // Update active tab
  function updateActiveTab() {
    sportTabs.forEach(tab => {
      if (tab.dataset.sport === currentSport) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });
  }
  
  // Update active filter
  function updateActiveFilter() {
    filterButtons.forEach(btn => {
      if (btn.dataset.filter === currentFilter) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }
  
  // Update team details
  function updateTeamDetails() {
    const team = sportsData[currentSport];
    teamName.textContent = team.team;
    teamYear.textContent = team.year;
    teamCoach.textContent = team.coach;
    playerCount.textContent = team.players.length;
  }
  
  // Render players based on current sport and filter
  function renderPlayers() {
    playersContainer.innerHTML = '';
    
    const team = sportsData[currentSport];
    let filteredPlayers = team.players;
    
    // Apply filter
    if (currentFilter !== 'all') {
      filteredPlayers = team.players.filter(player => {
        return player.position.toLowerCase().includes(currentFilter.toLowerCase());
      });
    }
    
    // Create player cards
    filteredPlayers.forEach(player => {
      const playerCard = document.createElement('div');
      playerCard.className = 'player-card';
      playerCard.innerHTML = `
        <div class="player-image" style="background-image: linear-gradient(135deg, var(--accent-blue) 0%, var(--bg-secondary) 100%);">
          <div class="sport-badge">${currentSport.toUpperCase()}</div>
        </div>
        <div class="player-info">
          <div class="player-name">${player.name}</div>
          <div class="player-position">${player.position}</div>
          <div class="player-number">#${player.number}</div>
        </div>
      `;
      playersContainer.appendChild(playerCard);
    });
    
    // Show message if no players match the filter
    if (filteredPlayers.length === 0) {
      const noPlayers = document.createElement('div');
      noPlayers.style.gridColumn = '1 / -1';
      noPlayers.style.textAlign = 'center';
      noPlayers.style.padding = '40px';
      noPlayers.style.color = 'var(--text-secondary)';
      noPlayers.textContent = 'No players match the selected filter.';
      playersContainer.appendChild(noPlayers);
    }
  }
  
  // Initialize the app when DOM is loaded
  document.addEventListener('DOMContentLoaded', init);