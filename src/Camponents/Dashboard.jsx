import React, { useEffect, useState } from "react";
import { Chart } from "chart.js/auto";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate=useNavigate()
  const [username, setUsername] = useState('example');
  const [user, setUser] = useState({});
  const [repositories, setRepositories] = useState([]);
  const [followers, setFollowers] = useState(0);
  const [selectedRepo, setSelectedRepo] = useState(null);

  useEffect(() => {
    if (username.trim() === "") {
      // Display an alert if username is empty
      alert("Please enter a GitHub username.");
      return; // Stop further API requests
    }

    // Fetch user data and repositories from GitHub API
    fetch(`https://api.github.com/users/${username}`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        setFollowers(data.followers);
      });

    fetch(`https://api.github.com/users/${username}/repos`)
      .then((response) => response.json())
      .then((data) => setRepositories(data));
  }, [username]);

  useEffect(() => {
    // Calculate the number of projects and forks
    const numProjects = repositories.filter((repo) => !repo.fork).length;
    const numForks = repositories.filter((repo) => repo.fork).length;

    // Create a chart to display project stats (Pie Chart)
    const projectStatsCtx = document.getElementById("projectStatsChart");
    if (projectStatsCtx) {
      // Destroy the existing chart if it exists
      if (projectStatsCtx.chart) {
        projectStatsCtx.chart.destroy();
      }
      projectStatsCtx.chart = new Chart(projectStatsCtx, {
        type: "pie",
        data: {
          labels: ["Projects", "Forks"],
          datasets: [
            {
              data: [numProjects, numForks],
              backgroundColor: ["#36A2EB", "#FFCE56"],
            },
          ],
        },
      });
    }

    // Create a chart to display repositories by year (Bar Chart)
    const repoByYearCtx = document.getElementById("repoByYearChart");
    if (repoByYearCtx) {
      // Destroy the existing chart if it exists
      if (repoByYearCtx.chart) {
        repoByYearCtx.chart.destroy();
      }

      // Extract and process data for the bar graph
      const repoYears = {};
      repositories.forEach((repo) => {
        const year = new Date(repo.created_at).getFullYear();
        if (repoYears[year]) {
          repoYears[year]++;
        } else {
          repoYears[year] = 1;
        }
      });

      const years = Object.keys(repoYears);
      const repoCounts = years.map((year) => repoYears[year]);

      repoByYearCtx.chart = new Chart(repoByYearCtx, {
        type: "bar",
        data: {
          labels: years,
          datasets: [
            {
              label: "Repositories",
              data: repoCounts,
              backgroundColor: "#4CAF50",
            },
          ],
        },
      });
    }
  }, [repositories]);

  // Function to handle repository click
  const handleRepoClick = (repo) => {
    setSelectedRepo(repo);
  };
  const handleLogout=()=>{
    navigate('/')
  }

  return (
    <div className="dashboard">
      <header className="header">
        <h1 className="dashboard-title">GitHub Dashboard</h1>
        <div className='buttonsignout'><button className="btn btn-outline-success" style={{marginLeft:'1000px'}} onClick={handleLogout}>Logout</button></div>
      </header>


      <main className="content">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search GitHub User"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        {/* User Profile */}
        <aside className="profile">
          <img
            className="profile-avatar"
            src={user.avatar_url}
            alt="User Avatar"
          />
          <h3 className="profile-name">{user.login}</h3>
          <p className="profile-info">Followers: {followers}</p>
          {/* Add more user profile details here */}
        </aside>

        {/* Project Stats and Repositories by Year Charts */}
        <div style={{display:'flex', justifyContent:'space-around'}}>
        <section className="chart">
          <h2 className="section-title">Project Stats</h2>
          <div id="chartContainer" style={{ width: "200px", height: "200px" }}>
            <canvas id="projectStatsChart" style={{ width: "100%", height: "100%" }}></canvas>
          </div>
        </section>
        <section className="chart">
          <h2 className="section-title">Repositories by Year</h2>
          <div id="repoChartsContainer" style={{ display: 'flex', width: '100%' }}>
            <div
              id="repoByYearContainer"
              style={{ width: "100%", height: "100%" }}>
              <canvas
                id="repoByYearChart"
                style={{ width: "100%", height: "100%" }}
              ></canvas>
            </div>
          </div>
        </section>
        </div>
        <section className="repositories">
          <h2 className="section-title">Repositories</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Start Date</th>
                <th>End Date</th>
              </tr>
            </thead>
            <tbody>
              {repositories.map((repo) => (
                <tr key={repo.id} onClick={() => handleRepoClick(repo)}>
                  <td>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {repo.name}
                    </a>
                  </td>
                  <td>
                    {new Date(repo.created_at).toLocaleDateString()}
                  </td>
                  <td>{new Date(repo.updated_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section>
          {selectedRepo && (
            <section className="repository-details">
              <h2 className="section-title">Repository Details</h2>
              <div>
                <strong>Name:</strong> {selectedRepo.name}
              </div>
              <div>
                <strong>Description:</strong>{" "}
                {selectedRepo.description || "N/A"}
              </div>
              <div>
                <strong>Language:</strong> {selectedRepo.language || "N/A"}
              </div>
              <div>
                <strong>Stars:</strong> {selectedRepo.stargazers_count}
              </div>
              <div>
                <strong>Watchers:</strong> {selectedRepo.watchers_count}
              </div>
              <div>
                <strong>Forks:</strong> {selectedRepo.forks_count}
              </div>
            </section>
          )}
        </section>
      </main>

      <footer className="footer">
        <p className="footer-text">
          &copy; {new Date().getFullYear()} GitHub Dashboard
        </p>
      </footer>
    </div>
  );
}

export default Dashboard;
