let lastScrollTop = 0; // Menyimpan posisi scroll sebelumnya
const header = document.querySelector(".header"); // Pilih elemen header

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY; // Posisi scroll saat ini

  // Jika scroll ke bawah, sembunyikan header
  if (currentScroll > lastScrollTop) {
    // Scroll ke bawah
    header.classList.add("hidden");
    header.classList.remove("transparent");
  } else {
    // Scroll ke atas
    header.classList.remove("hidden");
    header.classList.add("transparent");
  }

  // Menyimpan posisi scroll saat ini untuk perbandingan di scroll berikutnya
  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Membatasi agar tidak negatif
});

// Parallax Effect for Text in Banner based on Scroll Position
const bannerText = document.querySelector(".banner__text");

window.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY;
  const parallaxSpeed = 0.5; // Adjust this value for stronger/weaker effect

  // Apply the parallax effect by moving the text at a different speed than the scroll
  bannerText.style.transform = `translateY(${
    scrollPosition * parallaxSpeed
  }px)`;
});

const data = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    title: `Idea Title ${i + 1}`,
    description: `This is a description for Idea ${i + 1}.`,
    image: "https://i.pinimg.com/736x/b4/53/81/b45381505ff89aa0d66179570fa13e2a.jpg",
  }));
  
  let currentPage = 1;
  let itemsPerPage = 20;
  let sortOrder = "newest";
  
  const renderPosts = () => {
    const postsContainer = document.getElementById("posts");
    postsContainer.innerHTML = "";
  
    // Sort data based on selected order
    const sortedData = [...data].sort((a, b) =>
      sortOrder === "newest" ? b.id - a.id : a.id - b.id
    );
  
    // Calculate data for current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);
  
    // Create and display posts
    paginatedData.forEach((item) => {
      const card = document.createElement("div");
      card.className = "card";
  
      card.innerHTML = `
        <img src="${item.image}" alt="${item.title}">
        <div class="card-content">
          <h3 class="card-title">${item.title}</h3>
          <p>${item.description}</p>
        </div>
      `;
      postsContainer.appendChild(card);
    });
  
    // Update page numbers
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const pageNumbersContainer = document.getElementById("pageNumbers");
    pageNumbersContainer.innerHTML = ""; // Clear previous page numbers
  
    // Add page numbers
    for (let i = 1; i <= totalPages; i++) {
      const pageNumber = document.createElement("span");
      pageNumber.className = "page-number";
      pageNumber.textContent = i;
      if (i === currentPage) {
        pageNumber.classList.add("active");
      }
      pageNumber.addEventListener("click", () => {
        currentPage = i;
        renderPosts();
      });
      pageNumbersContainer.appendChild(pageNumber);
    }
  
    // Update the state of pagination buttons
    document.getElementById("prevPage").disabled = currentPage === 1;
    document.getElementById("nextPage").disabled = currentPage === totalPages;
  };
  
  // Handle "Previous" button click
  document.getElementById("prevPage").addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderPosts();
    }
  });
  
  // Handle "Next" button click
  document.getElementById("nextPage").addEventListener("click", () => {
    const totalPages = Math.ceil(data.length / itemsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      renderPosts();
    }
  });
  
  // Handle "Items per page" change
  document.getElementById("itemsPerPage").addEventListener("change", (e) => {
    itemsPerPage = parseInt(e.target.value, 10);
    currentPage = 1; // Reset to the first page
    renderPosts();
  });
  
  // Handle "Sort by" change
  document.getElementById("sort").addEventListener("change", (e) => {
    sortOrder = e.target.value;
    currentPage = 1; // Reset to the first page
    renderPosts();
  });
  
  // Initial render
  renderPosts();
  