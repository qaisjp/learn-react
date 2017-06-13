import axios from 'axios';

// const client_id = "CLIENT_ID";
// const client_secret = "CLIENT_SECRET";
// const params = `?client_id=${client_id}&client_secret=${client_secret}`;
const params = '?';

function getProfile(username) {
    return axios.get(`https://api.github.com/users/${username}${params}`)
        .then(user => user.data)
}

function getRepos(username) {
    return axios.get(`https://api.github.com/users/${username}/repos${params}&per_page=100`)
}

function getStarCount(repos) {
    return repos.data.reduce((stars, repo) => {
        return stars + repo.stargazers_count;
    }, 0);
}

function calculateScore(profile, repos) {
    const followers = profile.followers;
    const totalStars = getStarCount(repos);

    return (followers * 3) + totalStars;
}

function handleError(err) {
    console.warn(err);
    return null;
}

function getUserData(player) {
    return axios.all([
        getProfile(player),
        getRepos(player),
    ]).then(results => {
        const profile = results[0];
        const repos = results[1];
        const score = calculateScore(profile, repos)

        return {profile, score};
    });
}

function sortPlayers(players) {
    return players.sort((a, b) => {
        return b.score - a.score;
    });
}

export default {
    battle: players => {
        return axios.all(players.map(getUserData))
            .then(sortPlayers)
            .catch(handleError);
    },

    fetchPopularRepos: language => {
        const encodedURI = window.encodeURI(
            `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
        );

        return axios.get(encodedURI).
            then(response => {
                return response.data.items;
            });
    }
}