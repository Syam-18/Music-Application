<template>
  <div class="main-content-container">
    <div class="content-header">
      <div class="content-tabs">
        <button class="tab active">All</button>
        <button class="tab">Music</button>
        <button class="tab">Podcasts</button>
        <button class="tab">Audiobooks</button>
      </div>
      <button class="grid-btn">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path
            d="M1 2.5A1.5 1.5 0 012.5 1h3A1.5 1.5 0 017 2.5v3A1.5 1.5 0 015.5 7h-3A1.5 1.5 0 011 5.5v-3zm8 0A1.5 1.5 0 0110.5 1h3A1.5 1.5 0 0115 2.5v3A1.5 1.5 0 0113.5 7h-3A1.5 1.5 0 019 5.5v-3zm-8 8A1.5 1.5 0 012.5 9h3A1.5 1.5 0 017 10.5v3A1.5 1.5 0 015.5 15h-3A1.5 1.5 0 011 13.5v-3zm8 0A1.5 1.5 0 0110.5 9h3a1.5 1.5 0 011.5 1.5v3a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 019 13.5v-3z" />
        </svg>
      </button>
    </div>

    <div class="content-scroll">
      <section class="section">
        <div class="section-header">
          <h2>Made For You</h2>
          <div class="section-nav">
            <button class="nav-arrow">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path
                  d="M11.03.47a.75.75 0 0 1 0 1.06L4.56 8l6.47 6.47a.75.75 0 1 1-1.06 1.06L2.44 8 9.97.47a.75.75 0 0 1 1.06 0z" />
              </svg>
            </button>
            <button class="nav-arrow">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path
                  d="M4.97.47a.75.75 0 0 0 0 1.06L11.44 8l-6.47 6.47a.75.75 0 1 0 1.06 1.06L13.56 8 6.03.47a.75.75 0 0 0-1.06 0z" />
              </svg>
            </button>
            <button class="more-btn">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 9a1 1 0 100-2 1 1 0 000 2zM8 6a1 1 0 100-2 1 1 0 000 2zM8 12a1 1 0 100-2 1 1 0 000 2z" />
              </svg>
            </button>
          </div>
        </div>
        <div class="cards-grid">
          <PlaylistCard v-for="playlist in madeForYou" :key="playlist.id" :playlist="playlist" />
        </div>
      </section>

      <section class="section">
        <div class="section-header">
          <h2>Your top mixes</h2>
          <div class="section-nav">
            <button class="nav-arrow">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path
                  d="M11.03.47a.75.75 0 0 1 0 1.06L4.56 8l6.47 6.47a.75.75 0 1 1-1.06 1.06L2.44 8 9.97.47a.75.75 0 0 1 1.06 0z" />
              </svg>
            </button>
            <button class="nav-arrow">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path
                  d="M4.97.47a.75.75 0 0 0 0 1.06L11.44 8l-6.47 6.47a.75.75 0 1 0 1.06 1.06L13.56 8 6.03.47a.75.75 0 0 0-1.06 0z" />
              </svg>
            </button>
            <button class="more-btn">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 9a1 1 0 100-2 1 1 0 000 2zM8 6a1 1 0 100-2 1 1 0 000 2zM8 12a1 1 0 100-2 1 1 0 000 2z" />
              </svg>
            </button>
          </div>
        </div>
        <div class="cards-grid">
          <PlaylistCard v-for="playlist in topMixes" :key="playlist.id" :playlist="playlist" />
        </div>
      </section>

      <section class="section">
        <div class="section-header">
          <h2>Your favorite artists</h2>
          <div class="section-nav">
            <button class="nav-arrow">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path
                  d="M11.03.47a.75.75 0 0 1 0 1.06L4.56 8l6.47 6.47a.75.75 0 1 1-1.06 1.06L2.44 8 9.97.47a.75.75 0 0 1 1.06 0z" />
              </svg>
            </button>
            <button class="nav-arrow">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path
                  d="M4.97.47a.75.75 0 0 0 0 1.06L11.44 8l-6.47 6.47a.75.75 0 1 0 1.06 1.06L13.56 8 6.03.47a.75.75 0 0 0-1.06 0z" />
              </svg>
            </button>
            <button class="more-btn">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 9a1 1 0 100-2 1 1 0 000 2zM8 6a1 1 0 100-2 1 1 0 000 2zM8 12a1 1 0 100-2 1 1 0 000 2z" />
              </svg>
            </button>
          </div>
        </div>
        <div class="cards-grid">
          <ArtistCard v-for="artist in favoriteArtists" :key="artist.id" :artist="artist" />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import PlaylistCard from './PlaylistCard.vue'
import ArtistCard from './ArtistCard.vue'

const madeForYou = ref([
  {
    id: 1,
    name: 'Discover Weekly',
    description: 'Your weekly mixtape of fresh music. Enjoy new songs!',
    image: 'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  {
    id: 2,
    name: 'Daily Mix 1',
    description: 'Linkin Park, System Of A Down, Red Hot Chili Peppers and more',
    image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
    gradient: 'linear-gradient(135deg, #36d1dc 0%, #5b86e5 100%)'
  },
  {
    id: 3,
    name: 'Daily Mix 2',
    description: 'Avril Lavigne, Lorde, Charli XCX and more',
    image: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
  },
  {
    id: 4,
    name: 'Daily Mix 3',
    description: 'The Strokes, Martin Garrix, MGMT and more',
    image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
  },
  {
    id: 5,
    name: 'Daily Mix 4',
    description: 'Clozee Berry, Elvis Presley, Ray Orleans and more',
    image: 'https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
  },
  {
    id: 6,
    name: 'Daily Mix 6',
    description: 'Frank Sinatra, Gerhard Trede, Dean Martin and more',
    image: 'https://images.pexels.com/photos/1699159/pexels-photo-1699159.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
  },
  {
    id: 7,
    name: 'Nirvana Radio',
    description: 'The Strokes, Martin Garrix, MGMT and more',
    image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
    gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
  },
  {
    id: 8,
    name: 'Fall Out Boy Radio',
    description: 'With Panic! At The Disco, The All-American Rejects...',
    image: 'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
    gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)'
  }
])

const topMixes = ref([
  {
    id: 9,
    name: 'Rock Mix',
    description: 'Red Hot Chili Peppers, R.E.M., Stone Temple Pilots and more',
    image: 'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  {
    id: 10,
    name: 'Chill Mix',
    description: 'Yr DOOM, Goodie Mob, The Chainsmokers and more',
    image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
    gradient: 'linear-gradient(135deg, #36d1dc 0%, #5b86e5 100%)'
  },
  {
    id: 11,
    name: 'Pop Mix',
    description: 'Red Hot Chili Peppers, R.E.M., Oasis The Beatles and...',
    image: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
  },
  {
    id: 12,
    name: 'Daft Punk Mix',
    description: 'Daft Punk, MGMT, Muse, and Justice...',
    image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
  },
  {
    id: 13,
    name: 'Happy Mix',
    description: 'The Tallies, Vulf Morrison, ABRA and more',
    image: 'https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
  },
  {
    id: 14,
    name: 'David Bowie Mix',
    description: 'Soft Cell, The Who and The Cheat',
    image: 'https://images.pexels.com/photos/1699159/pexels-photo-1699159.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
  },
  {
    id: 15,
    name: 'Upbeat Mix',
    description: 'Kylie Minogue, Oasis XCX, Cage The Elephant and...',
    image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
    gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
  },
  {
    id: 16,
    name: '60s Mix',
    description: 'Oingo Boingo, Stewar David, Vin Morrison and...',
    image: 'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
    gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)'
  }
])

const favoriteArtists = ref([
  {
    id: 1,
    name: 'The Beatles',
    image: 'https://images.pexels.com/photos/1699159/pexels-photo-1699159.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2'
  },
  {
    id: 2,
    name: 'Red Hot Chili Peppers',
    image: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2'
  },
  {
    id: 3,
    name: 'David Bowie',
    image: 'https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2'
  }
])
</script>

<style scoped>
.main-content-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #1a1a1a 0%, #000 50%);
  overflow: hidden;
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid #1a1a1a;
}

.content-tabs {
  display: flex;
  gap: 8px;
}

.tab {
  padding: 8px 16px;
  border: none;
  border-radius: 50px;
  background: none;
  color: #b3b3b3;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s;
}

.tab.active {
  background: #333;
  color: #fff;
}

.tab:hover:not(.active) {
  color: #fff;
}

.grid-btn {
  width: 32px;
  height: 32px;
  border-radius: 4px;
  background: none;
  border: none;
  color: #b3b3b3;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.grid-btn:hover {
  background: #1a1a1a;
  color: #fff;
}

.content-scroll {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
}

.section {
  margin-bottom: 48px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.section-header h2 {
  font-size: 24px;
  font-weight: 700;
  color: #fff;
}

.section-nav {
  display: flex;
  gap: 8px;
  align-items: center;
}

.nav-arrow,
.more-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: none;
  border: none;
  color: #b3b3b3;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.nav-arrow:hover,
.more-btn:hover {
  background: #1a1a1a;
  color: #fff;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 24px;
}

.content-scroll::-webkit-scrollbar {
  width: 12px;
}

.content-scroll::-webkit-scrollbar-track {
  background: #000;
}

.content-scroll::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 6px;
}

.content-scroll::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
