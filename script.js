// Datos de los personajes
const characters = [
  {
    name: "Eren Yeager",
    image: "https://i.pinimg.com/236x/38/84/92/3884926506316fb9241bac22801fb176.jpg",
    description: "Eren Yeager es el protagonista de la serie y un ex-soldado de la humanidad.",
    strength: "Alta",
    speed: "Media",
    intelligence: "Alta"
  },
  {
    name: "Mikasa Ackerman",
    image: "https://i.pinimg.com/236x/2f/71/15/2f71155b9646272f921767634c29f1da.jpg",
    description: "Mikasa Ackerman es la hermana adoptiva de Eren y una de las guerreras más fuertes.",
    strength: "Alta",
    speed: "Alta",
    intelligence: "Alta"
  },
  {
    name: "Levi Ackerman",
    image: "https://i.pinimg.com/474x/6f/89/f6/6f89f68959c52b71831fc26743509697.jpg",
    description: "Levi Ackerman es el capitán del Cuerpo de Exploración y uno de los soldados más habilidosos.",
    strength: "Alta",
    speed: "Alta",
    intelligence: "Alta"
  },
  {
    name: "Reiner Braun",
    image: "https://i.pinimg.com/236x/4a/1e/ec/4a1eec62d1d3f330c8b2ad6399acfe9b.jpg",
    description: "Reiner Braun es un antiguo soldado de las fuerzas militares y uno de los principales antagonistas.",
    strength: "Alta",
    speed: "Alta",
    intelligence: "Media"
  },
  {
    name: "Armin Arlert",
    image: "https://i.pinimg.com/736x/e5/cb/c1/e5cbc1034dc0eda537a8cc109e269dd4.jpg",
    description: "Armin Arlert es un amigo de Eren y Mikasa, conocido por su gran inteligencia y capacidad estratégica.",
    strength: "Baja",
    speed: "Media",
    intelligence: "Muy Alta"
  },
  {
    name: "Annie Leonhart",
    image: "https://i.pinimg.com/236x/0d/9d/62/0d9d62732383033786aca57f6f6fb518.jpg",
    description: "Annie Leonhart es una experta en combate y una de las antagonistas más complejas de la serie.",
    strength: "Alta",
    speed: "Alta",
    intelligence: "Alta"
  }
];

// Elementos del DOM
const gallery = document.getElementById('gallery');
const searchInput = document.getElementById('search');
const loadMoreButton = document.getElementById('load-more');
let displayedCharacters = 0;

// Reproductor de Música
const musicPlayer = document.getElementById('music-player'); // Asegúrate de que tengas un id 'music-player' en tu HTML
const playPauseButton = document.getElementById('play-pause'); // Botón para reproducir/pausar
const musicAudio = document.getElementById('music-audio'); // Elemento de audio

let isPlaying = false;

// Función para reproducir/pausar música
function toggleMusic() {
  if (isPlaying) {
    musicAudio.pause();
    playPauseButton.textContent = 'Reproducir'; // Cambiar el texto del botón a 'Reproducir'
  } else {
    musicAudio.play();
    playPauseButton.textContent = 'Pausar'; // Cambiar el texto del botón a 'Pausar'
  }
  isPlaying = !isPlaying;
}

// Función para controlar el volumen
function adjustVolume() {
  musicAudio.volume = document.getElementById('volume-control').value / 100;
}

// Función para mostrar personajes
function displayCharacters() {
  const charactersToShow = characters.slice(displayedCharacters, displayedCharacters + 3); // Mostrar 3 personajes a la vez
  charactersToShow.forEach(character => {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
        <img src="${character.image}" alt="${character.name}">
        <h2>${character.name}</h2>
        <p>${character.description}</p>
        <button class="modal-btn" onclick="showModal('${character.name}')">Ver Detalles</button>
    `;

    gallery.appendChild(card);
  });
  displayedCharacters += charactersToShow.length;

  // Ocultar el botón si ya no hay más personajes por mostrar
  if (displayedCharacters >= characters.length) {
    loadMoreButton.style.display = 'none';
  }
}

// Función para filtrar personajes
searchInput.addEventListener('input', function () {
  const query = searchInput.value.toLowerCase();
  const filteredCharacters = characters.filter(character => {
    return character.name.toLowerCase().includes(query);
  });

  gallery.innerHTML = ''; // Limpiar la galería
  displayedCharacters = 0; // Reiniciar la cantidad mostrada
  filteredCharacters.forEach(character => {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
        <img src="${character.image}" alt="${character.name}">
        <h2>${character.name}</h2>
        <p>${character.description}</p>
        <button class="modal-btn" onclick="showModal('${character.name}')">Ver Detalles</button>
    `;

    gallery.appendChild(card);
  });
  loadMoreButton.style.display = 'none'; // Ocultar el botón si hay pocos personajes
});

// Función para mostrar el modal con detalles del personaje
function showModal(characterName) {
  const character = characters.find(c => c.name === characterName);
  const modalContainer = document.getElementById('modal-container');
  modalContainer.style.display = 'flex';

  // Llenar el modal con los datos del personaje
  document.getElementById('modal-name').textContent = character.name;
  document.getElementById('modal-description').textContent = character.description;
  document.getElementById('modal-strength').textContent = character.strength;
  document.getElementById('modal-speed').textContent = character.speed;
  document.getElementById('modal-intelligence').textContent = character.intelligence;
}

// Función para cerrar el modal
function closeModal() {
  const modalContainer = document.getElementById('modal-container');
  modalContainer.style.display = 'none';
}

// Cargar más personajes al hacer clic en el botón
loadMoreButton.addEventListener('click', function () {
  displayCharacters();
});

// Cargar los primeros personajes al inicio
displayCharacters();

// Event listeners para el reproductor de música
playPauseButton.addEventListener('click', toggleMusic);
document.getElementById('volume-control').addEventListener('input', adjustVolume);

// Función para actualizar la barra de progreso
function updateProgress() {
  const progressBar = document.querySelector('.progress');
  const progress = (musicAudio.currentTime / musicAudio.duration) * 100;
  progressBar.style.width = `${progress}%`;
}

// Función para controlar el volumen
function adjustVolume() {
  musicAudio.volume = document.querySelector('.volume-slider input').value / 100;
}

// Event listener para la barra de progreso
musicAudio.addEventListener('timeupdate', updateProgress);
document.querySelector('.volume-slider input').addEventListener('input', adjustVolume);
