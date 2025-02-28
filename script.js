document.addEventListener('DOMContentLoaded', () => {
    // Navigation
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('.section');
    
    const handleNavigation = (event) => {
        if (event.target.tagName === 'A') {
            event.preventDefault();
            const targetId = event.target.getAttribute('href').substring(1);
            
            // Update active nav link
            navLinks.forEach(link => link.classList.remove('active'));
            event.target.classList.add('active');
            
            // Show target section
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetId) {
                    section.classList.add('active');
                    // Scroll to top of section with smooth behavior
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }
            });
            
            // Update URL without page reload
            history.pushState(null, null, `#${targetId}`);
        }
    };
    
    document.querySelector('nav').addEventListener('click', handleNavigation);
    document.querySelectorAll('.footer-links a').forEach(link => {
        if (link.getAttribute('href').startsWith('#')) {
            link.addEventListener('click', handleNavigation);
        }
    });
    
    // Books Data
    const books = [
        {
            title: "The Silent Whisper",
            author: "Elena Montgomery",
            category: "fiction",
            coverColor: "#8a67c9",
            description: "A captivating tale of mystery and intrigue set in a small coastal town."
        },
        {
            title: "Quantum Realms",
            author: "Dr. Richard Hayes",
            category: "science",
            coverColor: "#6d49b2",
            description: "An exploration of quantum physics and its implications for our understanding of reality."
        },
        {
            title: "Mindful Living",
            author: "Sarah Chen",
            category: "non-fiction",
            coverColor: "#a58ad4",
            description: "A practical guide to incorporating mindfulness practices into your daily routine."
        },
        {
            title: "Echoes of Time",
            author: "Marcus Winters",
            category: "fiction",
            coverColor: "#9678cc",
            description: "A sweeping historical saga spanning three generations of a family's tumultuous journey."
        },
        {
            title: "The Cosmos Within",
            author: "Dr. Amelia Carter",
            category: "science",
            coverColor: "#7c5bbc",
            description: "Discover the fascinating connections between cosmic phenomena and human existence."
        },
        {
            title: "Growth Mindset",
            author: "James Wilson",
            category: "non-fiction",
            coverColor: "#b49ddb",
            description: "Learn how to develop a mindset that embraces challenges and fosters personal growth."
        },
        {
            title: "Midnight Shadows",
            author: "Olivia Bennett",
            category: "fiction",
            coverColor: "#8a67c9",
            description: "A thrilling page-turner about secrets that come to light under the cover of darkness."
        },
        {
            title: "Neural Networks Explained",
            author: "Prof. Alan Zhang",
            category: "science",
            coverColor: "#6d49b2",
            description: "A comprehensive yet accessible introduction to the world of artificial neural networks."
        }
    ];
    
    // Populate Books Grid
    const booksGrid = document.querySelector('.books-grid');
    
    const renderBooks = (category = 'all') => {
        booksGrid.innerHTML = '';
        
        const filteredBooks = category === 'all' 
            ? books 
            : books.filter(book => book.category === category);
        
        filteredBooks.forEach(book => {
            const bookCard = document.createElement('div');
            bookCard.className = 'book-card';
            bookCard.dataset.category = book.category;
            
            bookCard.innerHTML = `
                <div class="book-cover" style="background-color: ${book.coverColor}">
                    <span class="book-category">${book.category}</span>
                    <div class="book-description">
                        <p>${book.description}</p>
                    </div>
                </div>
                <div class="book-info">
                    <h3 class="book-title">${book.title}</h3>
                    <p class="book-author">by ${book.author}</p>
                </div>
            `;
            
            booksGrid.appendChild(bookCard);
        });
    };
    
    // Initial books render
    renderBooks();
    
    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter books
            renderBooks(filter);
        });
    });
    
    // Explore button functionality
    document.getElementById('explore-btn').addEventListener('click', () => {
        // Navigate to books section
        const booksLink = document.querySelector('nav a[href="#books"]');
        if (booksLink) {
            booksLink.click();
        }
    });

    // Search functionality
    document.getElementById('search-input').addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            const searchTerm = e.target.value.toLowerCase().trim();
            
            // Navigate to books section
            const booksLink = document.querySelector('nav a[href="#books"]');
            if (booksLink) {
                booksLink.click();
                
                // Filter books based on search if term exists
                if (searchTerm) {
                    const filteredBooks = books.filter(book => 
                        book.title.toLowerCase().includes(searchTerm) || 
                        book.author.toLowerCase().includes(searchTerm) ||
                        book.category.toLowerCase().includes(searchTerm)
                    );
                    
                    // Clear and render filtered books
                    booksGrid.innerHTML = '';
                    
                    if (filteredBooks.length > 0) {
                        filteredBooks.forEach(book => {
                            // Reusing the book card creation code
                            const bookCard = document.createElement('div');
                            bookCard.className = 'book-card';
                            bookCard.dataset.category = book.category;
                            
                            bookCard.innerHTML = `
                                <div class="book-cover" style="background-color: ${book.coverColor}">
                                    <span class="book-category">${book.category}</span>
                                    <div class="book-description">
                                        <p>${book.description}</p>
                                    </div>
                                </div>
                                <div class="book-info">
                                    <h3 class="book-title">${book.title}</h3>
                                    <p class="book-author">by ${book.author}</p>
                                </div>
                            `;
                            
                            booksGrid.appendChild(bookCard);
                        });
                    } else {
                        booksGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">No books found matching your search.</p>';
                    }
                    
                    // Reset filter buttons
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    document.querySelector('.filter-btn[data-filter="all"]').classList.add('active');
                }
            }
        }
    });

    // Contact form submission
    document.getElementById('contact-form').addEventListener('submit', (e) => {
        e.preventDefault();
        
        // In a real application, you would send the form data to a server
        // For this demo, we'll just show a success message
        const form = e.target;
        const formData = new FormData(form);
        
        // Simple validation
        let isValid = true;
        for (const [key, value] of formData.entries()) {
            if (!value.trim()) {
                isValid = false;
                break;
            }
        }
        
        if (isValid) {
            form.innerHTML = `
                <div style="text-align: center; padding: 2rem;">
                    <i class="fas fa-check-circle" style="font-size: 3rem; color: var(--primary); margin-bottom: 1rem;"></i>
                    <h3>Thank You!</h3>
                    <p>Your message has been sent successfully.</p>
                </div>
            `;
        }
    });
    
    // Newsletter subscription
    document.getElementById('newsletter-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = document.getElementById('newsletter-email');
        
        if (emailInput.value.trim()) {
            const form = e.target;
            const thankYouMessage = document.createElement('div');
            thankYouMessage.className = 'thank-you-message';
            thankYouMessage.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <p>Thank you for subscribing!</p>
            `;
            form.innerHTML = '';
            form.appendChild(thankYouMessage);
        }
    });
    
    // Handle initial URL hash if present
    if (window.location.hash) {
        const targetLink = document.querySelector(`nav a[href="${window.location.hash}"]`);
        if (targetLink) {
            targetLink.click();
        }
    }
});