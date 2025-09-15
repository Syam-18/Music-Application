<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-column">
        <h3>Company</h3>
        <ul>
          <li><a href="#">About</a></li>
          <li><a href="#">Jobs</a></li>
          <li><a href="#">For the Record</a></li>
        </ul>
      </div>
      <div class="footer-column">
        <h3>Communities</h3>
        <ul>
          <li><a href="#">For Artists</a></li>
          <li><a href="#">Developers</a></li>
          <li><a href="#">Advertising</a></li>
          <li><a href="#">Investors</a></li>
          <li><a href="#">Vendors</a></li>
        </ul>
      </div>
      <div class="footer-column">
        <h3>Useful links</h3>
        <ul>
          <li><a href="#">Support</a></li>
          <li><a href="#">Free Mobile App</a></li>
          <li><a href="#">Popular by Country</a></li>
          <li><a href="#">Import your music</a></li>
        </ul>
      </div>
      <div class="footer-column">
        <h3>Spotify Plans</h3>
        <ul>
          <li><a href="#">Premium Individual</a></li>
          <li><a href="#">Premium Duo</a></li>
          <li><a href="#">Premium Family</a></li>
          <li><a href="#">Premium Student</a></li>
          <li><a href="#">Spotify Free</a></li>
        </ul>
      </div>
      <div class="footer-column social-column">
        <h3>Social</h3>
        <div class="social-icons">
          <a href="#" aria-label="Instagram" class="social-icon instagram">
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm4.75-.88a1.12 1.12 0 110 2.25 1.12 1.12 0 010-2.25z" />
            </svg>
          </a>
          <a href="#" aria-label="Twitter" class="social-icon twitter">
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 001.88-2.37 8.59 8.59 0 01-2.72 1.04 4.28 4.28 0 00-7.3 3.9A12.14 12.14 0 013 4.89a4.28 4.28 0 001.32 5.71 4.27 4.27 0 01-1.94-.54v.05a4.28 4.28 0 003.44 4.2 4.3 4.3 0 01-1.93.07 4.28 4.28 0 003.99 2.97A8.6 8.6 0 012 19.54a12.13 12.13 0 006.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19 0-.37-.01-.56A8.7 8.7 0 0022.46 6z" />
            </svg>
          </a>
          <a href="#" aria-label="Facebook" class="social-icon facebook">
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M22 12a10 10 0 10-11.5 9.87v-6.98h-2.1v-2.9h2.1v-2.2c0-2.07 1.23-3.22 3.12-3.22.9 0 1.84.16 1.84.16v2.02h-1.04c-1.03 0-1.35.64-1.35 1.3v1.54h2.3l-.37 2.9h-1.93v6.98A10 10 0 0022 12z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
    <hr />
    <p class="copyright">© 2025 Spotify AB</p>
  </footer>
</template>

<script setup>
</script>

<style scoped>
.footer {
  background-color: #000;
  color: #b3b3b3;
  padding: 40px 0px  60px ;
  border-top: 1px solid #1a1a1a;
  font-size: 14px;
}

.footer-container {
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto 0 40px;
  flex-wrap: wrap;
  gap: 24px;
  padding-right: 40px;
}

.footer-column {
  flex: 1 1 180px;
  min-width: 150px;
}

.footer-column h3 {
  color: #fff;
  font-weight: 700;
  margin-bottom: 16px;
}

.footer-column ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-column ul li {
  margin-bottom: 8px;
}

.footer-column ul li a {
  color: #b3b3b3;
  text-decoration: none;
  transition: color 0.2s;
}

.footer-column ul li a:hover {
  color: #fff;
}

.social-icons {
  margin-top: 16px;
  display: flex;
  gap: 16px;
}

.social-icon {
  color: #b3b3b3;
  transition: color 0.2s;
}

.social-icon:hover {
  color: #fff;
}

hr {
  border: none;
  border-top: 1px solid #1a1a1a;
  margin: 24px 0 16px;
}

.copyright {
  color: #666;
  font-size: 12px;
  max-width: 1200px;
  margin: 0 auto 24px;
}
</style>
