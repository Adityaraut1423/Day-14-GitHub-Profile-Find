async function getProfile() {
    const username = document.getElementById("username").value;
    const profile = document.getElementById("profile");

    if (username === "") {
        alert("Enter a username");
        return;
    }

    profile.innerHTML = "Loading...";

    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) throw new Error("User not found");

        const data = await response.json();

        profile.innerHTML = `
            <img src="${data.avatar_url}">
            <h3>${data.name || data.login}</h3>
            <p>${data.bio || "No bio available"}</p>
            <p>👥 Followers: ${data.followers}</p>
            <p>📦 Repos: ${data.public_repos}</p>
            <a href="${data.html_url}" target="_blank">View Profile</a>
        `;
    } catch (error) {
        profile.innerHTML = "❌ User not found";
    }
}
