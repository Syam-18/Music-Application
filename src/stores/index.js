import { reactive } from 'vue'

export const store = reactive({
  user: null,
  currentSong: null,
  isPlaying: false,
  likedSongs: [
    {
      id: 1,
      title: 'Get Lucky',
      artist: 'Daft Punk',
      album: 'Random Access Memories',
      duration: '4:35',
      image:
        'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2',
      liked: true,
    },
    {
      id: 2,
      title: 'Instant Crush',
      artist: 'Daft Punk, Julian Casablancas',
      album: 'Random Access Memories',
      duration: '5:37',
      image:
        'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2',
      liked: true,
    },
    {
      id: 3,
      title: 'On Melancholy Hill',
      artist: 'Gorillaz',
      album: 'Plastic Beach',
      duration: '3:53',
      image:
        'https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2',
      liked: true,
    },
    {
      id: 4,
      title: 'Tainted Love',
      artist: 'Soft Cell',
      album: 'Non-Stop Erotic Cabaret',
      duration: '2:33',
      image:
        'https://images.pexels.com/photos/1699159/pexels-photo-1699159.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2',
      liked: true,
    },
    {
      id: 5,
      title: 'One More Time',
      artist: 'Daft Punk',
      album: 'Discovery',
      duration: '5:20',
      image:
        'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2',
      liked: true,
    },
    {
      id: 6,
      title: 'Electric Feel',
      artist: 'MGMT',
      album: 'Oracular Spectacular',
      duration: '3:49',
      image:
        'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2',
      liked: true,
    },
    {
      id: 7,
      title: 'Give Life Back to Music',
      artist: 'Daft Punk',
      album: 'Random Access Memories',
      duration: '4:35',
      image:
        'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2',
      liked: true,
    },
  ],
  searchResults: [],
  recentSearches: [
    {
      id: 1,
      name: 'Daft Punk',
      type: 'artist',
      image:
        'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    },
    {
      id: 2,
      name: 'David Bowie',
      type: 'artist',
      image:
        'https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    },
    {
      id: 3,
      name: 'Black Holes...',
      type: 'album',
      image:
        'https://images.pexels.com/photos/1699159/pexels-photo-1699159.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    },
  ],

  login(user) {
    this.user = user
  },

  logout() {
    this.user = null
  },

  toggleLike(songId) {
    const song = this.likedSongs.find((s) => s.id === songId)
    if (song) {
      const index = this.likedSongs.findIndex((s) => s.id === songId)
      this.likedSongs.splice(index, 1)
    }
  },

  playSong(song) {
    this.currentSong = song
    this.isPlaying = true
  },

  togglePlay() {
    this.isPlaying = !this.isPlaying
  },
})
