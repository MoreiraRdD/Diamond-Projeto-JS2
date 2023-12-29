const LOGIN_URL = 'https://dummyjson.com/auth/login';
const USER_DETAILS_URL_TEMPLATE = 'https://dummyjson.com/auth/user/';

// Função para validar as credenciais de login
async function validateCredentials(username, password) {
    try {
        const response = await fetch(LOGIN_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const userData = await response.json();
            logSuccess('Login successful', userData);

            // Chama a função para buscar dados do usuário após o login bem-sucedido
            fetchUserDetails(userData.token, userData.id);

            // Exibe o toast de sucesso
            showToast('Login successful');
        } else {
            logError('Failed to login:', response.statusText);
            return null;
        }
    } catch (error) {
        logError('Error during login request:', error);
        return null;
    }
}

// Função para buscar dados do usuário
async function fetchUserDetails(token, userId) {
    try {
        const userDetailsUrl = `${USER_DETAILS_URL_TEMPLATE}${userId}`;
        const response = await fetch(userDetailsUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const userData = await response.json();
            displayUserData(userData);
        } else {
            logError('Failed to fetch user data:', response.statusText);
        }
    } catch (error) {
        logError('Error during user data request:', error);
    }
}

// Função para lidar com o clique no botão de login
function login() {
    const usernameInput = document.querySelector('#username');
    const passwordInput = document.querySelector('#password');

    validateCredentials(usernameInput.value, passwordInput.value);
}

// Função para exibir um toast com uma mensagem
function showToast(message) {
    const toast = document.querySelector('#toast');
    const toastText = document.querySelector('#toastText');

    toast.style.display = 'block';
    toastText.innerHTML = message;

    setTimeout(() => {
        toast.style.display = 'none';
    }, 1000);
}

// Função para exibir os dados do usuário na interface
function displayUserData(user) {
    const container = document.querySelector('.loginScreen')
    const cartao = document.querySelector('.id-card-holder')

    container.style.display = 'none'
    cartao.style.display = 'flex'



    const profileImage = document.querySelector('#perfil');
    const userID = document.querySelector('#ID');
    const fullName = document.querySelector('#Nome');
    const address = document.querySelector('#Endereço');
    const gender = document.querySelector('#Genero');
    const hairInfo = document.querySelector('#Cabelo');
    const eyeColor = document.querySelector('#Olhos');
    const heightInfo = document.querySelector('#Altura');
    const weightInfo = document.querySelector('#Peso');

    // Atribui os dados do usuário para cada elemento
    profileImage.src = user.image;
    userID.innerHTML = user.id;
    fullName.innerHTML = `${user.firstName} ${user.lastName}`;
    address.innerHTML = `${user.address.address} ${user.address.city} ${user.address.postalCode}`;
    gender.innerHTML = user.gender;
    hairInfo.innerHTML = `${user.hair.color} ${user.hair.type}`;
    eyeColor.innerHTML = user.eyeColor;
    heightInfo.innerHTML = user.height;
    weightInfo.innerHTML = user.weight;
}

// Função auxiliar para logar sucesso
function logSuccess(message, data) {
    console.log(message, data, data.token);
}

// Função auxiliar para logar erro
function logError(message, error) {
    console.error(message, error);
}