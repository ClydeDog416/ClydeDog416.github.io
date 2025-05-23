let isLoggedIn = false;
let userData = null;
let dogData = null;
let locationsData = [];

async function fetchData() {
    const urlParams = new URLSearchParams(window.location.search);
    const tagId = urlParams.get('tag') || 'clyde-nfc-123';

    if (!tagId) {
        document.getElementById('content').innerHTML = '<p>No dog tag ID provided. Please scan a valid QR code or NFC tag.</p>';
        return;
    }

    // Fetch user data if logged in
    try {
        const userResponse = await fetch('https://mypetid-backend.herokuapp.com/api/user-data', {
            credentials: 'include'
        });
        if (userResponse.ok) {
            const data = await userResponse.json();
            userData = data.user;
            dogData = data.dog;
            isLoggedIn = true;
            showLoggedInState();
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
    }

    // Fetch dog data if not logged in or user fetch fails
    if (!dogData) {
        try {
            const dogResponse = await fetch(`https://mypetid-backend.herokuapp.com/api/dog/${tagId}`);
            if (dogResponse.ok) {
                dogData = await dogResponse.json();
            } else {
                document.getElementById('content').innerHTML = '<p>Dog not found.</p>';
                return;
            }
        } catch (error) {
            document.getElementById('content').innerHTML = `<p>Error fetching dog data: ${error.message}</p>`;
            return;
        }
    }

    // Fetch location data
    try {
        const locationResponse = await fetch(`https://mypetid-backend.herokuapp.com/api/locations/${tagId}`);
        if (locationResponse.ok) {
            locationsData = await locationResponse.json();
        }
    } catch (error) {
        console.error('Error fetching location data:', error);
    }

    navigate(window.location.hash.replace('#', '') || 'home');
}

function showLoggedInState() {
    document.getElementById('loginBtn').style.display = 'none';
    document.getElementById('logoutBtn').style.display = 'block';
    document.getElementById('registerBtn').style.display = 'none';
}

function showLoggedOutState() {
    document.getElementById('loginBtn').style.display = 'block';
    document.getElementById('logoutBtn').style.display = 'none';
    document.getElementById('registerBtn').style.display = 'block';
}

function toggleDrawer() {
    const drawer = document.getElementById('drawer');
    drawer.style.display = drawer.style.display === 'flex' ? 'none' : 'flex';
}

function navigate(page) {
    if (!dogData) {
        document.getElementById('content').innerHTML = '<p>Dog data not loaded yet. Please wait.</p>';
        return;
    }

    const content = document.getElementById('content');
    const pageTitle = document.getElementById('page-title');
    const profilePic = document.getElementById('profile-pic');
    toggleDrawer();

    window.location.hash = page;
    pageTitle.textContent = page.charAt(0).toUpperCase() + page.split('-').join(' ').slice(1);

    if (page === 'account' || page === 'login' || page === 'register' || page === 'logout') {
        profilePic.style.backgroundColor = 'gray';
        profilePic.style.backgroundImage = 'none';
    } else {
        profilePic.style.backgroundImage = `url(${dogData.photoUrl})`;
        profilePic.style.backgroundSize = 'cover';
    }

    switch (page) {
        case 'home':
            const recentLocations = locationsData.filter(loc => {
                const locTime = new Date(loc.timestamp);
                const now = new Date();
                const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000);
                return loc.active && locTime >= twoHoursAgo;
            });
            const mapUrl = recentLocations.length > 0
                ? `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${recentLocations[0].latitude},${recentLocations[0].longitude}&zoom=12`
                : 'https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=Toronto,Canada&zoom=12';
            content.innerHTML = `
                <h2>${dogData.name}</h2>
                <p>${dogData.description}</p>
                <p>Age: ${dogData.age}</p>
                <p>Weight: ${dogData.weight}</p>
                <p>Coat: ${dogData.coat}</p>
                <p>Sex: ${dogData.sex}</p>
                <p>Eye Color: ${dogData.eyeColor}</p>
                <p>Neutered: ${dogData.neutered}</p>
                <h3>Last Scanned Locations (Last 2 Hours)</h3>
                ${recentLocations.length > 0
                    ? recentLocations.map(loc => `
                        <p>Device: ${loc.deviceName}</p>
                        <p>Time: ${new Date(loc.timestamp).toLocaleString()}</p>
                        <p>Latitude: ${loc.latitude}, Longitude: ${loc.longitude}</p>
                    `).join('')
                    : '<p>No recent locations available.</p>'}
                <iframe src="${mapUrl}" allowfullscreen></iframe>
                <button onclick="navigate('report-lost')">Report Lost</button>
                <button onclick="navigate('medical')">Medical Info</button>
                <button onclick="navigate('about')">About Me</button>
                <button onclick="navigate('socials')">Socials</button>
                <button class="text-button" onclick="navigate('contact')">Contact Information</button>
            `;
            break;
        case 'contact':
            content.innerHTML = `
                <h2>Contact Information</h2>
                <p>Email: ${userData ? userData.email : 'clydedog416@gmail.com'}</p>
                <p>Phone: ${userData ? userData.phone : '(416) 555-1234'}</p>
                <p>Address: ${userData ? userData.address : '123 Bone Street, Toronto, Ontario, M5V 2T4, Canada'}</p>
                <button onclick="navigate('report-lost')">Report Lost</button>
                <button onclick="navigate('medical')">Medical Info</button>
            `;
            break;
        case 'medical':
            content.innerHTML = `
                <h2>Medical Information</h2>
                <p>Recent Shots: ${dogData.medicalInfo.shots}</p>
                <p>Medications: ${dogData.medicalInfo.medications}</p>
                <p>Vaccinations: ${dogData.medicalInfo.vaccinations}</p>
                <p>Checkups: ${dogData.medicalInfo.checkups}</p>
                <p>Allergies: ${dogData.medicalInfo.allergies}</p>
                <button class="text-button" onclick="navigate('about')">View About Me</button>
            `;
            break;
        case 'about':
            content.innerHTML = `
                <h2>About Me</h2>
                <p>Breed: ${dogData.breed}</p>
                <p>Personality: ${dogData.personality}</p>
                <p>Loves: ${dogData.loves}</p>
                <p>Routine: ${dogData.routine}</p>
                <p>Training: ${dogData.training}</p>
                <p>Quirks: ${dogData.quirks}</p>
                <button class="text-button" onclick="navigate('socials')">View Socials</button>
            `;
            break;
        case 'socials':
            content.innerHTML = `
                <h2>Socials</h2>
                <p>YouTube: ${dogData.socials.youtube}</p>
                <p>Instagram: ${dogData.socials.instagram}</p>
                <p>Facebook: ${dogData.socials.facebook}</p>
                <p>TikTok: ${dogData.socials.tiktok}</p>
                <p>Twitter: ${dogData.socials.twitter}</p>
                <p>Custom Link 1: ${dogData.socials.customLink1}</p>
                <p>Custom Link 2: ${dogData.socials.customLink2}</p>
                <p>Donation: ${dogData.socials.donationLink}</p>
                <p>Testimonials: See what others have to say about me!</p>
                ${dogData.testimonials.map(t => `<p>${t.text} - ${t.author}</p>`).join('')}
                <button class="text-button" onclick="navigate('gallery')">View Gallery</button>
            `;
            break;
        case 'gallery':
            content.innerHTML = `
                <h2>Gallery</h2>
                ${dogData.gallery.map(item => `
                    <p>${item.type}: ${item.description}</p>
                    ${item.type === 'Photo' ? `<img src="${item.url}" style="max-width: 100%; height: auto;">` : `<video src="${item.url}" controls style="max-width: 100%; height: auto;"></video>`}
                `).join('')}
                <button class="text-button" onclick="navigate('home')">Back to Home</button>
            `;
            break;
        case 'report-lost':
            content.innerHTML = `
                <h2>Report Lost</h2>
                <p style="text-align: center;">Found Me? Thank You! Please Fill Out This Form to Help Me Get Back Home!</p>
                <input type="text" id="finder-name" placeholder="Your Name">
                <input type="text" id="finder-contact" placeholder="Your Contact Info">
                <input type="text" id="location" placeholder="Where You Found Me">
                <button onclick="submitReportLost()">Submit</button>
            `;
            break;
        case 'account':
            if (!isLoggedIn) {
                content.innerHTML = `<p>Please log in to view your account.</p><button onclick="navigate('login')">Login</button>`;
            } else {
                content.innerHTML = `
                    <h2>Account View</h2>
                    <strong>User Information</strong>
                    <p>Username: ${userData.username}</p>
                    <p>Email: ${userData.email}</p>
                    <strong>Dog Information</strong>
                    <input type="text" id="dog-name" value="${dogData.name}">
                    <input type="text" id="dog-description" value="${dogData.description}">
                    <input type="text" id="dog-age" value="${dogData.age}">
                    <input type="text" id="dog-weight" value="${dogData.weight}">
                    <input type="text" id="dog-coat" value="${dogData.coat}">
                    <input type="text" id="dog-sex" value="${dogData.sex}">
                    <input type="text" id="dog-eyeColor" value="${dogData.eyeColor}">
                    <input type="text" id="dog-neutered" value="${dogData.neutered}">
                    <input type="text" id="dog-breed" value="${dogData.breed}">
                    <input type="text" id="dog-personality" value="${dogData.personality}">
                    <input type="text" id="dog-loves" value="${dogData.loves}">
                    <input type="text" id="dog-routine" value="${dogData.routine}">
                    <input type="text" id="dog-training" value="${dogData.training}">
                    <input type="text" id="dog-quirks" value="${dogData.quirks}">
                    <button onclick="saveChanges()">Save Changes</button>
                `;
            }
            break;
        case 'login':
            if (isLoggedIn) {
                content.innerHTML = `
                    <h2>Welcome, ${userData.username}</h2>
                    <button onclick="navigate('account')">Go to Account</button>
                    <button onclick="navigate('home')">View Pet Profile</button>
                `;
            } else {
                content.innerHTML = `
                    <h2>Login</h2>
                    <input type="text" id="username" placeholder="Username">
                    <input type="password" id="password" placeholder="Password">
                    <button onclick="login()">Login</button>
                    <button class="text-button" onclick="navigate('register')">Create Account</button>
                    <button class="text-button" onclick="navigate('reset-password')">Forgot Password?</button>
                `;
            }
            break;
        case 'register':
            content.innerHTML = `
                <h2>Create Account</h2>
                <input type="text" id="reg-username" placeholder="Username">
                <input type="password" id="reg-password" placeholder="Password">
                <input type="text" id="reg-email" placeholder="Email">
                <input type="text" id="reg-device" placeholder="Device Name (e.g., Dad's Phone)">
                <button onclick="register()">Register</button>
            `;
            break;
        case 'reset-password':
            content.innerHTML = `
                <h2>Reset Password</h2>
                <input type="text" id="reset-email" placeholder="Enter your email">
                <button onclick="resetPassword()">Send Reset Link</button>
            `;
            break;
        case 'logout':
            logout();
            break;
    }
}

async function submitReportLost() {
    const finderName = document.getElementById('finder-name').value;
    const finderContact = document.getElementById('finder-contact').value;
    const location = document.getElementById('location').value;
    try {
        const response = await fetch('https://mypetid-backend.herokuapp.com/api/report-lost', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                dogId: dogData._id,
                finderName,
                finderContact,
                location
            })
        });
        if (response.ok) {
            alert('Report submitted successfully!');
            navigate('home');
        } else {
            alert('Failed to submit report.');
        }
    } catch (error) {
        alert('Error submitting report: ' + error.message);
    }
}

async function saveChanges() {
    if (!isLoggedIn || !userData || userData._id !== dogData.ownerId) {
        alert('You do not have permission to edit this profile.');
        return;
    }

    const updatedDog = {
        name: document.getElementById('dog-name').value,
        description: document.getElementById('dog-description').value,
        age: document.getElementById('dog-age').value,
        weight: document.getElementById('dog-weight').value,
        coat: document.getElementById('dog-coat').value,
        sex: document.getElementById('dog-sex').value,
        eyeColor: document.getElementById('dog-eyeColor').value,
        neutered: document.getElementById('dog-neutered').value,
        breed: document.getElementById('dog-breed').value,
        personality: document.getElementById('dog-personality').value,
        loves: document.getElementById('dog-loves').value,
        routine: document.getElementById('dog-routine').value,
        training: document.getElementById('dog-training').value,
        quirks: document.getElementById('dog-quirks').value,
        medicalInfo: dogData.medicalInfo,
        socials: dogData.socials,
        testimonials: dogData.testimonials,
        gallery: dogData.gallery,
        photoUrl: dogData.photoUrl,
        ownerId: dogData.ownerId,
        nfcTagId: dogData.nfcTagId
    };

    try {
        const response = await fetch(`https://mypetid-backend.herokuapp.com/api/dog/${dogData._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedDog),
            credentials: 'include'
        });
        if (response.ok) {
            dogData = await response.json();
            alert('Changes saved successfully!');
            navigate('home');
        } else {
            alert('Failed to save changes.');
        }
    } catch (error) {
        alert('Error saving changes: ' + error.message);
    }
}

async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    try {
        const response = await fetch('https://mypetid-backend.herokuapp.com/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
            credentials: 'include'
        });
        const data = await response.json();
        if (response.ok) {
            isLoggedIn = true;
            userData = data.user;
            dogData = data.dog;
            showLoggedInState();
            navigate('home');
        } else {
            alert(data.error);
        }
    } catch (error) {
        alert('Error logging in: ' + error.message);
    }
}

async function register() {
    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;
    const email = document.getElementById('reg-email').value;
    const device = document.getElementById('reg-device').value;
    try {
        const response = await fetch('https://mypetid-backend.herokuapp.com/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, email, device })
        });
        if (response.ok) {
            alert('Registration successful! Please log in.');
            navigate('login');
        } else {
            alert('Failed to register');
        }
    } catch (error) {
        alert('Error registering: ' + error.message);
    }
}

async function resetPassword() {
    const email = document.getElementById('reset-email').value;
    try {
        const response = await fetch('https://mypetid-backend.herokuapp.com/api/reset-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        if (response.ok) {
            alert('Password reset link sent to your email (implementation pending).');
            navigate('login');
        } else {
            alert('Failed to send reset link.');
        }
    } catch (error) {
        alert('Error sending reset link: ' + error.message);
    }
}

async function logout() {
    try {
        const response = await fetch('https://mypetid-backend.herokuapp.com/api/logout', {
            method: 'POST',
            credentials: 'include'
        });
        if (response.ok) {
            isLoggedIn = false;
            userData = null;
            showLoggedOutState();
            await fetchData();
            navigate('home');
        } else {
            alert('Failed to log out');
        }
    } catch (error) {
        alert('Error logging out: ' + error.message);
    }
}

window.addEventListener('hashchange', () => {
    const page = window.location.hash.replace('#', '') || 'home';
    navigate(page);
});

fetchData();
