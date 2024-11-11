function getRecentTracks() {
    var username = "dopiture_";
    var apiKey = "c1bf66eaa51b5b83a56fac50a122b8bf";
    var apiUrl = "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=" + username + "&api_key=" + apiKey + "&format=json";
  
    // Wykonaj zapytanie HTTP do Last.fm API
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // Pobierz informacje o ostatnio odtwarzanych utworach
        var recentTracks = data.recenttracks.track;
        var lastTrack = recentTracks[0];
  
        // Wyświetl informacje na stronie
        var trackInfo = "";
  
        // Sprawdź, czy istnieje obiekt lastTrack i czy ma atrybut '@attr', co oznacza, że jest to aktualnie odtwarzany utwór
        if (lastTrack && lastTrack['@attr'] && lastTrack['@attr'].nowplaying === 'true') {
          // Odtwarzany utwór
          var nowPlayingInfo = lastTrack.name + " - " + lastTrack.artist["#text"];
          
          // Sprawdź, czy istnieje miniatura albumu
          if (lastTrack.image && Array.isArray(lastTrack.image) && lastTrack.image.length > 0) {
            var albumImage = lastTrack.image[2]['#text']; // Odpowiada za średnią wielkość miniatury, możesz dostosować do swoich potrzeb
            // Dodaj obraz albumu do kontenera
            document.getElementById('albumContainer').innerHTML = '<img id="albumImage" src="' + albumImage + '" alt="Album Image">';
          }
  
          // Dodaj pozostałe informacje do kontenera
          trackInfo = '<div id="trackInfo">Teraz odtwarzany utwór: ' + nowPlayingInfo + '</div>';
        }
  
        document.getElementById('nowPlaying').innerHTML = trackInfo;
      })
      .catch(error => console.error('Error fetching data:', error));
  }
  
  // Wywołaj funkcję do pobierania ostatnio odtwarzanych utworów
  getRecentTracks();






  // Funkcja do pobierania informacji o użytkowniku i ilości scrobbli
  function getUserInfoAndScrobbles() {
    var username = "dopiture_";
    var apiKey = "c1bf66eaa51b5b83a56fac50a122b8bf";
  
    // Zapytanie dla informacji o użytkowniku
    var userInfoUrl = "https://ws.audioscrobbler.com/2.0/?method=user.getInfo&user=" + username + "&api_key=" + apiKey + "&format=json";
  
    // Zapytanie dla ostatnio odtwarzanych utworów
    var recentTracksUrl = "https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=" + username + "&api_key=" + apiKey + "&format=json";
  
    // Wykonaj zapytania HTTP do Last.fm API
    Promise.all([
      fetch(userInfoUrl),
      fetch(recentTracksUrl)
    ])
    .then(responses => Promise.all(responses.map(response => response.json())))
    .then(data => {
      // Informacje o użytkowniku
      var userPlaycount = data[0].user.playcount;
  
      // Informacje o ostatnio odtwarzanych utworach
      var recentTracks = data[1].recenttracks.track;
      var lastTrack = recentTracks[0];
  
      // Przykładowa średnia długość piosenki metalowej (w minutach)
      var averageMetalSongLength = 4.2;
  
      // Oblicz przewidywany ogólny czas słuchania
      var predictedListeningTime = userPlaycount * averageMetalSongLength;
  
      // Wyświetl informacje na stronie
      var scrobblesInfo = "Ilość odtworzonych utworów: " + userPlaycount;
      scrobblesInfo += "<br>Przewidywany ogólny czas słuchania (w minutach): " + predictedListeningTime.toFixed(2);
  
      document.getElementById('scrobblesInfo').innerHTML = scrobblesInfo;
    })
    .catch(error => console.error('Error fetching data:', error));
  }
  
  // Wywołaj funkcję do pobierania informacji o użytkowniku i ilości scrobbli
  getUserInfoAndScrobbles();
