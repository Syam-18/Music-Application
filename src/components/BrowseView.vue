<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const startBrowsingCategories = [
  {
    id: 1,
    name: 'Music',
    color: '#e91e63',
    image: 'https://i.pinimg.com/736x/a2/43/c7/a243c71afcee9a6cc4a769b44632a300.jpg',
  },
  {
    id: 2,
    name: 'Podcasts',
    color: '#1b5e20',
    image: 'https://i.pinimg.com/736x/95/38/03/95380384fa674c9485964ddc53eaa5a9.jpg',
  },
  {
    id: 3,
    name: 'Live Events',
    color: '#7b1fa2',
    image: 'https://i.pinimg.com/736x/9b/04/15/9b04155b6f08d34a61e2924aad68f228.jpg',
  },
]

const browseAllCategories = [
  {
    id: 4,
    name: 'Made For You',
    color: '#1565c0',
    image: 'https://i.pinimg.com/1200x/c7/bb/34/c7bb346723462982befc2056249ac8dc.jpg',
  },
  {
    id: 5,
    name: 'New Releases',
    color: '#689f38',
    image: 'https://i.pinimg.com/736x/37/75/a5/3775a5fc3c86d474ed2dec6951bdb1b0.jpg',
  },
  {
    id: 6,
    name: 'Rain & Monsoon',
    color: '#00695c',
    image: 'https://i.pinimg.com/1200x/bb/51/2b/bb512b902027bf4b346001b8988410e2.jpg',
  },
  {
    id: 7,
    name: 'Hindi',
    color: '#e91e63',
    image: 'https://i.pinimg.com/1200x/3d/ae/43/3dae438ef806cf4b0463ef5ab5448481.jpg',
  },
  {
    id: 8,
    name: 'Telugu',
    color: '#ff6f00',
    image: 'https://i.pinimg.com/1200x/04/2e/6c/042e6cde26ead313c6992a3a6185f179.jpg',
  },
  {
    id: 9,
    name: 'Punjabi',
    color: '#e91e63',
    image: 'https://i.pinimg.com/1200x/d8/bc/76/d8bc76fb060305677d144e8cbe214b50.jpg',
  },
  {
    id: 10,
    name: 'Charts',
    color: '#7b1fa2',
    image: 'https://i.pinimg.com/736x/ab/10/f4/ab10f4422a39e77221dd7728de4725cb.jpg',
  },
  {
    id: 11,
    name: 'Podcast Charts',
    color: '#1976d2',
    image: 'https://i.pinimg.com/1200x/a5/81/21/a581211af8189f347899c1bb2d1c6317.jpg',
  },
  {
    id: 12,
    name: 'Podcast New Releases',
    color: '#7b1fa2',
    image: 'https://i.pinimg.com/736x/fa/d2/c4/fad2c4b0341fd11c7211f7b48b3b892f.jpg',
  },
  {
    id: 13,
    name: 'Video Podcasts',
    color: '#d32f2f',
    image: 'https://i.pinimg.com/736x/19/97/ec/1997ec3ada2d214334a9b49c288de5b1.jpg',
  },
  {
    id: 14,
    name: 'Business & Technology',
    color: '#616161',
    image: 'https://i.pinimg.com/736x/23/99/eb/2399eb26a5280077cb04d54e1c9598c4.jpg',
  },
  {
    id: 15,
    name: 'Tamil',
    color: '#ff6f00',
    image: 'https://i.pinimg.com/1200x/58/5c/1d/585c1d1b851e1eed99e615ebb626f973.jpg',
  },
  {
    id: 16,
    name: 'Malayalam',
    color: '#00838f',
    image: 'https://i.pinimg.com/1200x/99/8d/3b/998d3b9c81dfb7700892bb3615869e76.jpg',
  },
  {
    id: 17,
    name: 'Bhojpuri',
    color: '#d32f2f',
    image: 'https://i.pinimg.com/1200x/94/8d/36/948d369dd16e937835252f2e39e4a8ac.jpg',
  },
  {
    id: 18,
    name: 'Ghazals',
    color: '#616161',
    image: 'https://i.pinimg.com/1200x/11/e4/69/11e469646f53b4c3a6e7d41922284da4.jpg',
  },
  {
    id: 19,
    name: 'Discover',
    color: '#7b1fa2',
    image: 'https://i.pinimg.com/736x/59/81/7a/59817adcf36271625eddd187c4caf90b.jpg',
  },
  {
    id: 20,
    name: 'Summer',
    color: '#00695c',
    image: 'https://i.pinimg.com/736x/1d/08/35/1d0835e47dbb135f5c1caca000bdbf03.jpg',
  },
  {
    id: 21,
    name: 'Pop',
    color: '#1976d2',
    image: 'https://i.pinimg.com/736x/1f/7e/d2/1f7ed2ad4d6ea995fc71054b4861cbd4.jpg',
  },
  {
    id: 22,
    name: 'Indie',
    color: '#d32f2f',
    image: 'https://i.pinimg.com/1200x/dc/f8/33/dcf833c813b50aae69de726d4a6a3b91.jpg',
  },
  {
    id: 23,
    name: 'Love',
    color: '#e91e63',
    image: 'https://i.pinimg.com/736x/1a/cb/5a/1acb5a5b1fd8f7b9370e4e1cf1e32ffa.jpg',
  },
  {
    id: 24,
    name: 'Trending',
    color: '#e91e63',
    image: 'https://i.pinimg.com/736x/e5/bd/2e/e5bd2e2bba948e75e9e41d8dab9ffb94.jpg',
  },
  {
    id: 25,
    name: 'Mood',
    color: '#e91e63',
    image: 'https://i.pinimg.com/736x/f1/90/7a/f1907a2e6c14e9b5a5e0ea513dc295d4.jpg',
  },
  {
    id: 26,
    name: 'Party',
    color: '#7b1fa2',
    image: 'https://i.pinimg.com/736x/47/16/6e/47166e70a29d9aef3d3e69afae306642.jpg',
  },
  {
    id: 27,
    name: 'Devotional',
    color: '#8d6e63',
    image: 'https://i.pinimg.com/1200x/49/c9/22/49c9228fcedc5786aabdd9d0abc5aca9.jpg',
  },
  {
    id: 28,
    name: 'Decades',
    color: '#8d6e63',
    image: 'https://i.pinimg.com/1200x/92/18/40/921840ae54598d37105b0ec5d60afad8.jpg',
  },
  {
    id: 29,
    name: 'Hip-Hop',
    color: '#37474f',
    image: 'https://i.pinimg.com/736x/e9/ed/83/e9ed831a177e08581d91b8bf1c7cb5bf.jpg',
  },
  {
    id: 30,
    name: 'Dance/Electronic',
    color: '#00838f',
    image: 'https://i.pinimg.com/736x/0c/43/11/0c431162fcaf9b6c0743fa08a3d9bcca.jpg',
  },
  {
    id: 31,
    name: 'Student',
    color: '#e91e63',
    image: 'https://i.pinimg.com/736x/c6/1f/24/c61f247bfd5a3174f5ad833c3a11a954.jpg',
  },
  {
    id: 32,
    name: 'At Home',
    color: '#1976d2',
    image: 'https://i.pinimg.com/1200x/14/fe/a1/14fea14eabcf6adfc97fc64ee2391e8a.jpg',
  },
  {
    id: 33,
    name: 'Country',
    color: '#ff6f00',
    image: 'https://i.pinimg.com/736x/4a/13/ab/4a13abdf3da7e7c97f8e4ccfaafcc398.jpg',
  },
  {
    id: 34,
    name: 'R&B',
    color: '#8d6e63',
    image: 'https://i.pinimg.com/736x/da/49/6e/da496ef82f139fb1f5bcc77da87e95bb.jpg',
  },
  {
    id: 35,
    name: 'Metal',
    color: '#d32f2f',
    image: 'https://i.pinimg.com/736x/c1/37/da/c137dac435c240d72022be858391226b.jpg',
  },
  {
    id: 36,
    name: 'Jazz',
    color: '#7b1fa2',
    image: 'https://i.pinimg.com/1200x/c2/d1/d0/c2d1d0c650203e3280a5feeb74f8139a.jpg',
  },
  {
    id: 37,
    name: 'Classical',
    color: '#8d6e63',
    image: 'https://i.pinimg.com/736x/e4/37/bb/e437bba4fc0b6b23964aeb1601326422.jpg',
  },
  {
    id: 38,
    name: 'Folk & Acoustic',
    color: '#ff6f00',
    image: 'https://i.pinimg.com/1200x/36/95/f8/3695f8c785e319f22643d2315f4b6a43.jpg',
  },
  {
    id: 39,
    name: 'Focus',
    color: '#8d6e63',
    image: 'https://i.pinimg.com/1200x/e0/f6/71/e0f671c225d96d531e09ca3e10e92a55.jpg',
  },
  {
    id: 40,
    name: 'Disney',
    color: '#1976d2',
    image: 'https://i.pinimg.com/736x/48/d6/2e/48d62efe5ca933c64c1c227ee07375e3.jpg',
  },
  {
    id: 41,
    name: 'Soul',
    color: '#e91e63',
    image: 'https://i.pinimg.com/736x/57/18/b6/5718b6f9225274540a9bc5b80b53c014.jpg',
  },
  {
    id: 42,
    name: 'Kids & Family',
    color: '#1976d2',
    image: 'https://i.pinimg.com/736x/52/2a/84/522a84c3c8781f74984c9e5595dd61d1.jpg',
  },
  {
    id: 43,
    name: 'Anime',
    color: '#1976d2',
    image: 'https://i.pinimg.com/736x/8a/df/c2/8adfc27b8fc9cb09a10bc3e83430748b.jpg',
  },
  {
    id: 44,
    name: 'TV & Movies',
    color: '#1b5e20',
    image: 'https://i.pinimg.com/736x/70/d5/de/70d5de04e3ee6296faa51050f5cf0cb9.jpg',
  },
  {
    id: 45,
    name: 'Punk',
    color: '#d32f2f',
    image: 'https://i.pinimg.com/736x/23/bd/8e/23bd8e19130d6801bbd326be1eb9b06f.jpg',
  },
  {
    id: 46,
    name: 'Ambient',
    color: '#1b5e20',
    image: 'https://i.pinimg.com/736x/50/8c/af/508caf1287960758ca6a51bb281cc275.jpg',
  },
  {
    id: 47,
    name: 'Blues',
    color: '#1976d2',
    image: 'https://i.pinimg.com/736x/31/97/e0/3197e069cebfb4e3792b1cdd3fd5a237.jpg',
  },
  {
    id: 48,
    name: 'Cooking & Dining',
    color: '#ff6f00',
    image: 'https://i.pinimg.com/736x/5a/11/39/5a11390a89f5de9400634593f2ec6f90.jpg',
  },
  {
    id: 49,
    name: 'Alternative',
    color: '#d32f2f',
    image: 'https://i.pinimg.com/736x/db/9f/f2/db9ff2a0617c49dae39404a1c47847ae.jpg',
  },
  {
    id: 50,
    name: 'Wellness',
    color: '#1b5e20',
    image: 'https://i.pinimg.com/1200x/bb/9a/42/bb9a42389ba76bfd1e95164fb7875c23.jpg',
  },
  {
    id: 51,
    name: 'Travel',
    color: '#1976d2',
    image: 'https://i.pinimg.com/736x/17/05/3c/17053c647d893f1cfd19fae1bf417f65.jpg',
  },
  {
    id: 52,
    name: 'Caribbean',
    color: '#1976d2',
    image: 'https://i.pinimg.com/736x/32/ec/cb/32eccbe5c3a43f25a0e3c2a400992f9d.jpg',
  },
  {
    id: 53,
    name: 'Afro',
    color: '#8d6e63',
    image: 'https://i.pinimg.com/736x/63/65/c5/6365c5df22a2ee17b72cce991700cbe4.jpg',
  },
  {
    id: 54,
    name: 'Songwriters',
    color: '#8d6e63',
    image: 'https://i.pinimg.com/736x/14/de/28/14de2807ddf41dd3a49bcbf71cb6de52.jpg',
  },
  {
    id: 55,
    name: 'Nature & Noise',
    color: '#00838f',
    image: 'https://i.pinimg.com/1200x/e0/99/cc/e099cc2431327d44172d337f49843592.jpg',
  },
]

const handleCategoryClick = (category) => {
  router.push(`/category/${encodeURIComponent(category.name)}`)
}
</script>

<template>
  <div class="p-5">
    <!-- Start browsing -->
    <section class="mb-4">
      <h2 class="text-2xl font-bold mb-4 text-white">Start browsing</h2>

      <div
        class="grid gap-6 mb-4 grid-cols-[repeat(auto-fit,minmax(220px,1fr))] max-[1200px]:grid-cols-[repeat(auto-fit,minmax(280px,1fr))] max-[768px]:grid-cols-1 max-[768px]:gap-3"
      >
        <div
          v-for="category in startBrowsingCategories"
          :key="category.id"
          class="relative h-[200px] p-5 rounded-lg cursor-pointer overflow-hidden flex items-start transition duration-300 ease-in-out hover:scale-[1.02] hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)] max-[768px]:h-[160px] max-[768px]:p-4 max-[480px]:h-[140px] max-[480px]:p-3.5"
          :style="{ backgroundColor: category.color }"
          @click="handleCategoryClick(category)"
        >
          <h3
            class="text-3xl font-bold text-white relative z-10 leading-tight drop-shadow-md max-[768px]:text-2xl max-[480px]:text-lg"
          >
            {{ category.name }}
          </h3>

          <div
            class="absolute -bottom-2.5 -right-2.5 w-[120px] h-[120px] rotate-[25deg] rounded-lg overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.3)] max-[768px]:w-[100px] max-[768px]:h-[100px] max-[480px]:w-[80px] max-[480px]:h-[80px]"
          >
            <img :src="category.image" :alt="category.name" class="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>

    <!-- Browse all -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold mb-4 text-white max-[480px]:text-xl">Browse all</h2>

      <div
        class="grid gap-6 mb-10 grid-cols-[repeat(auto-fit,minmax(350px,1fr))] max-[1200px]:grid-cols-[repeat(auto-fit,minmax(160px,1fr))] max-[768px]:grid-cols-[repeat(auto-fit,minmax(140px,1fr))] max-[768px]:gap-3 max-[480px]:grid-cols-2"
      >
        <div
          v-for="category in browseAllCategories"
          :key="category.id"
          class="relative h-[180px] p-4 rounded-lg cursor-pointer overflow-hidden flex items-start transition duration-300 ease-in-out hover:scale-[1.02] hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)] max-[768px]:h-[120px] max-[768px]:p-3 max-[480px]:h-[100px] max-[480px]:p-2.5"
          :style="{ backgroundColor: category.color }"
          @click="handleCategoryClick(category)"
        >
          <h3
            class="text-2xl font-bold text-white relative z-10 leading-tight drop-shadow-md max-[768px]:text-lg max-[480px]:text-base"
          >
            {{ category.name }}
          </h3>

          <div
            class="absolute -bottom-2.5 -right-2.5 w-[100px] h-[100px] rotate-[25deg] rounded-lg overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.3)] max-[768px]:w-[80px] max-[768px]:h-[80px] max-[480px]:w-[60px] max-[480px]:h-[60px]"
          >
            <img :src="category.image" :alt="category.name" class="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
