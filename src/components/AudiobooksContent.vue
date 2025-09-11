<template>
  <div>
    <section class="section">
      <div class="section-header">
        <h2>Popular Audiobooks</h2>
      </div>
      <div class="cards-grid">
        <PlaylistCard v-for="book in popularBooks" :key="book.id" :playlist="book" />
      </div>
    </section>

    <section class="section">
      <div class="section-header">
        <h2>Fiction</h2>
      </div>
      <div class="cards-grid">
        <PlaylistCard v-for="book in fictionBooks" :key="book.id" :playlist="book" />
      </div>
    </section>

    <section class="section">
      <div class="section-header">
        <h2>Non-Fiction</h2>
      </div>
      <div class="cards-grid">
        <PlaylistCard v-for="book in nonFictionBooks" :key="book.id" :playlist="book" />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import PlaylistCard from './PlaylistCard.vue'

const popularBooks = ref([
  {
    id: 1,
    name: 'Becoming',
    description: 'Michelle Obama',
    image: 'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2'
  },
  {
    id: 2,
    name: 'Educated',
    description: 'Tara Westover',
    image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2'
  },
  {
    id: 3,
    name: 'The Seven Husbands of Evelyn Hugo',
    description: 'Taylor Jenkins Reid',
    image: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2'
  }
])

const fictionBooks = ref([
  {
    id: 4,
    name: 'Where the Crawdads Sing',
    description: 'Delia Owens',
    image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2'
  },
  {
    id: 5,
    name: 'The Silent Patient',
    description: 'Alex Michaelides',
    image: 'https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2'
  },
  {
    id: 6,
    name: 'The Midnight Library',
    description: 'Matt Haig',
    image: 'https://images.pexels.com/photos/1699159/pexels-photo-1699159.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2'
  }
])

const nonFictionBooks = ref([
  {
    id: 7,
    name: 'Atomic Habits',
    description: 'James Clear',
    image: 'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2'
  },
  {
    id: 8,
    name: 'Sapiens',
    description: 'Yuval Noah Harari',
    image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2'
  },
  {
    id: 9,
    name: 'The Power of Now',
    description: 'Eckhart Tolle',
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
