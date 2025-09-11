<template>
  <div>
    <section class="section">
      <div class="section-header">
        <h2>Made For You</h2>
        <div class="section-nav">
          <button class="nav-arrow" @click="scrollSection('made-for-you', 'left')"
            :disabled="!canScrollLeft.madeForYou">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path
                d="M11.03.47a.75.75 0 0 1 0 1.06L4.56 8l6.47 6.47a.75.75 0 1 1-1.06 1.06L2.44 8 9.97.47a.75.75 0 0 1 1.06 0z" />
            </svg>
          </button>
          <button class="nav-arrow" @click="scrollSection('made-for-you', 'right')"
            :disabled="!canScrollRight.madeForYou">
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
      <div class="cards-container">
        <div class="cards-grid" ref="madeForYouGrid" id="made-for-you">
          <PlaylistCard v-for="playlist in madeForYou" :key="playlist.id" :playlist="playlist" />
        </div>
      </div>
    </section>

    <section class="section">
      <div class="section-header">
        <h2>Your top mixes</h2>
        <div class="section-nav">
          <button class="nav-arrow" @click="scrollSection('top-mixes', 'left')" :disabled="!canScrollLeft.topMixes">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path
                d="M11.03.47a.75.75 0 0 1 0 1.06L4.56 8l6.47 6.47a.75.75 0 1 1-1.06 1.06L2.44 8 9.97.47a.75.75 0 0 1 1.06 0z" />
            </svg>
          </button>
          <button class="nav-arrow" @click="scrollSection('top-mixes', 'right')" :disabled="!canScrollRight.topMixes">
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
      <div class="cards-container">
        <div class="cards-grid" ref="topMixesGrid" id="top-mixes">
          <PlaylistCard v-for="playlist in topMixes" :key="playlist.id" :playlist="playlist" />
        </div>
      </div>
    </section>

    <section class="section">
      <div class="section-header">
        <h2>Your favorite artists</h2>
        <div class="section-nav">
          <button class="nav-arrow" @click="scrollSection('favorite-artists', 'left')"
            :disabled="!canScrollLeft.favoriteArtists">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path
                d="M11.03.47a.75.75 0 0 1 0 1.06L4.56 8l6.47 6.47a.75.75 0 1 1-1.06 1.06L2.44 8 9.97.47a.75.75 0 0 1 1.06 0z" />
            </svg>
          </button>
          <button class="nav-arrow" @click="scrollSection('favorite-artists', 'right')"
            :disabled="!canScrollRight.favoriteArtists">
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
      <div class="cards-container">
        <div class="cards-grid" ref="favoriteArtistsGrid" id="favorite-artists">
          <ArtistCard v-for="artist in favoriteArtists" :key="artist.id" :artist="artist" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick } from 'vue'
import PlaylistCard from './PlaylistCard.vue'
import ArtistCard from './ArtistCard.vue'

const madeForYouGrid = ref(null)
const topMixesGrid = ref(null)
const favoriteArtistsGrid = ref(null)

const canScrollLeft = reactive({
  madeForYou: false,
  topMixes: false,
  favoriteArtists: false
})

const canScrollRight = reactive({
  madeForYou: true,
  topMixes: true,
  favoriteArtists: true
})

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
  },
  {
    id: 4,
    name: 'Daft Punk',
    image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2'
  },
  {
    id: 5,
    name: 'Queen',
    image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2'
  }
])

const scrollSection = (sectionId, direction) => {
  const element = document.getElementById(sectionId)
  if (!element) return

  const scrollAmount = 300
  const currentScroll = element.scrollLeft
  const newScroll = direction === 'left'
    ? currentScroll - scrollAmount
    : currentScroll + scrollAmount

  element.scrollTo({
    left: newScroll,
    behavior: 'smooth'
  })

  // Update scroll state after animation
  setTimeout(() => {
    updateScrollState(sectionId)
  }, 300)
}

const updateScrollState = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (!element) return

  const { scrollLeft, scrollWidth, clientWidth } = element
  const maxScroll = scrollWidth - clientWidth

  switch (sectionId) {
    case 'made-for-you':
      canScrollLeft.madeForYou = scrollLeft > 0
      canScrollRight.madeForYou = scrollLeft < maxScroll - 1
      break
    case 'top-mixes':
      canScrollLeft.topMixes = scrollLeft > 0
      canScrollRight.topMixes = scrollLeft < maxScroll - 1
      break
    case 'favorite-artists':
      canScrollLeft.favoriteArtists = scrollLeft > 0
      canScrollRight.favoriteArtists = scrollLeft < maxScroll - 1
      break
  }
}

onMounted(async () => {
  await nextTick()
  updateScrollState('made-for-you')
  updateScrollState('top-mixes')
  updateScrollState('favorite-artists')
})
</script>

<style scoped>
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

.nav-arrow:hover:not(:disabled),
.more-btn:hover {
  background: #1a1a1a;
  color: #fff;
}

.nav-arrow:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.cards-container {
  overflow: hidden;
}

.cards-grid {
  display: flex;
  gap: 24px;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding-bottom: 16px;
}

.cards-grid::-webkit-scrollbar {
  display: none;
}

.cards-grid {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.cards-grid>* {
  flex: 0 0 180px;
}

@media (max-width: 768px) {
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .section-nav {
    align-self: flex-end;
  }

  .cards-grid>* {
    flex: 0 0 140px;
  }
}
</style>
