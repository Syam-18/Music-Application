<template>
  <div>
    <section class="section">
      <div class="section-header">
        <h2>Popular Podcasts</h2>
      </div>
      <div class="cards-grid">
        <PlaylistCard v-for="podcast in popularPodcasts" :key="podcast.id" :playlist="podcast" />
      </div>
    </section>

    <section class="section">
      <div class="section-header">
        <h2>True Crime</h2>
      </div>
      <div class="cards-grid">
        <PlaylistCard v-for="podcast in trueCrimePodcasts" :key="podcast.id" :playlist="podcast" />
      </div>
    </section>

    <section class="section">
      <div class="section-header">
        <h2>Comedy</h2>
      </div>
      <div class="cards-grid">
        <PlaylistCard v-for="podcast in comedyPodcasts" :key="podcast.id" :playlist="podcast" />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import PlaylistCard from './PlaylistCard.vue'

const popularPodcasts = ref([
  {
    id: 1,
    name: 'The Joe Rogan Experience',
    description: 'Joe Rogan',
    image: 'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2'
  },
  {
    id: 2,
    name: 'Serial',
    description: 'Sarah Koenig',
    image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2'
  },
  {
    id: 3,
    name: 'This American Life',
    description: 'Ira Glass',
    image: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2'
  }
])

const trueCrimePodcasts = ref([
  {
    id: 4,
    name: 'My Favorite Murder',
    description: 'Karen Kilgariff & Georgia Hardstark',
    image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2'
  },
  {
    id: 5,
    name: 'Crime Junkie',
    description: 'Ashley Flowers & Brit Prawat',
    image: 'https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2'
  },
  {
    id: 6,
    name: 'Casefile',
    description: 'Anonymous Host',
    image: 'https://images.pexels.com/photos/1699159/pexels-photo-1699159.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2'
  }
])

const comedyPodcasts = ref([
  {
    id: 7,
    name: 'Comedy Bang! Bang!',
    description: 'Scott Aukerman',
    image: 'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2'
  },
  {
    id: 8,
    name: 'Conan O\'Brien Needs a Friend',
    description: 'Conan O\'Brien',
    image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2'
  },
  {
    id: 9,
    name: 'WTF with Marc Maron',
    description: 'Marc Maron',
    image: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2'
  }
])
</script>

<style scoped>
.section {
  margin-bottom: 48px;
}

.section-header {
  margin-bottom: 24px;
}

.section-header h2 {
  font-size: 24px;
  font-weight: 700;
  color: #fff;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 24px;
}

@media (max-width: 768px) {
  .cards-grid {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 16px;
  }
}
</style>
