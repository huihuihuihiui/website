document.addEventListener('DOMContentLoaded', () => {
    // --- Global Elements ---
    const homePage = document.getElementById('home-page');
    const loggedInPage = document.getElementById('logged-in-page');
    const formulaDetailPage = document.getElementById('formula-detail-page');
    const sidebar = document.getElementById('sidebar');
    const sidebarToggleBtn = document.getElementById('sidebar-toggle');

    // --- State ---
    let mBitCount = 100;
    let currentFormulaId = null;

    // --- Helper Functions ---
    function updateMbitDisplay() {
        const mbitCountElement = document.getElementById('mbit-count');
        if (mbitCountElement) {
           mbitCountElement.textContent = mBitCount;
        }
    }

    function renderMathIfReady(element) {
        if (!element || typeof renderMathInElement !== 'function') {
             if (!element) console.warn("renderMathIfReady: Element not provided");
            return;
        }
        try {
            renderMathInElement(element, {
                delimiters: [ {left: "$$", right: "$$", display: true}, {left: "$", right: "$", display: false}, {left: "\\(", right: "\\)", display: false}, {left: "\\[", right: "\\]", display: true} ],
                throwOnError: false
            });
        } catch (error) { console.error("KaTeX rendering error:", error); }
    }

    function showPage(pageToShow) {
        console.log("Attempting to show page:", pageToShow ? pageToShow.id : 'null');
        [homePage, loggedInPage, formulaDetailPage].forEach(page => {
            if(page) page.classList.remove('active');
        });
        if(pageToShow) {
            pageToShow.classList.add('active');
            console.log("Added 'active' to:", pageToShow.id);
            // Render math if necessary
            if (pageToShow === formulaDetailPage || pageToShow === loggedInPage || pageToShow === homePage) {
                 setTimeout(() => renderMathIfReady(pageToShow), 50);
            }
            // Re-initialize observer when homepage becomes active
            if (pageToShow === homePage) {
                 initializeStripAnimationObserver();
            }
        } else {
            console.error("Target page to show is null or undefined.");
        }
    }

    function simulateLogin() {
        console.log("Simulating login...");
        mBitCount = 100; updateMbitDisplay();
        if (sidebar) { /* ... (sidebar state logic remains same) ... */
            if (window.innerWidth <= 768) { sidebar.classList.remove('open'); sidebar.classList.remove('collapsed'); }
            else { sidebar.classList.remove('collapsed'); sidebar.classList.remove('open'); }
        }
        showPage(loggedInPage);
    }

    function simulateLogout() {
        console.log("Simulating logout...");
        showPage(homePage);
    }

    function useAiFeature(event) {
        /* ... (AI feature logic remains same) ... */
        const mbitCountElement = document.getElementById('mbit-count');
        if (mBitCount > 0) {
            mBitCount--; updateMbitDisplay(); console.log("AI feature used. M-Bit remaining:", mBitCount);
            const tempIndicator = document.createElement('span');
            tempIndicator.textContent = ' AI (-1 M-Bit)'; tempIndicator.style.color = 'var(--accent-secondary)'; tempIndicator.style.fontSize = '0.75em'; tempIndicator.style.position = 'absolute'; tempIndicator.style.right = '15px'; tempIndicator.style.top = '50%'; tempIndicator.style.transform = 'translateY(-50%)'; tempIndicator.style.padding = '2px 5px'; tempIndicator.style.backgroundColor = 'rgba(0,0,0,0.4)'; tempIndicator.style.borderRadius = '3px';
             const searchContainer = event.target.closest('.search-container');
             if(searchContainer) {
                const existingIndicator = searchContainer.querySelector('.ai-indicator');
                if (existingIndicator) existingIndicator.remove();
                tempIndicator.classList.add('ai-indicator'); searchContainer.appendChild(tempIndicator);
                setTimeout(() => tempIndicator.remove(), 2000);
             }
        } else { alert("M-Bit 不足！請參與審核或貢獻以獲取更多 M-Bit。"); }
    }

    function loadFormulaDetail(formulaId) { /* ... (Load detail logic remains same) ... */
        currentFormulaId = formulaId;
        const formulaTitleEl = document.getElementById('formula-title'); const proofContentEl = document.getElementById('proof-content'); const actionButtonsEl = document.getElementById('action-buttons'); const commentSectionEl = document.getElementById('comment-section'); const commentTextareaEl = document.getElementById('comment-textarea'); const submitProofBtnEl = document.getElementById('submit-proof-btn');
        if (!formulaDetailPage || !commentSectionEl || !commentTextareaEl || !actionButtonsEl || !submitProofBtnEl || !formulaTitleEl || !proofContentEl) { console.error("Detail page elements not found!"); return; }
        commentSectionEl.style.display = 'none'; commentTextareaEl.value = ''; actionButtonsEl.style.display = 'flex'; submitProofBtnEl.style.display = 'none';
        if (formulaId === 'quadratic') {
            formulaTitleEl.textContent = '二次方程公式解證明'; proofContentEl.innerHTML = `<p>對於一元二次方程式 $ax^2 + bx + c = 0$ (其中 $a \\neq 0$):</p><p>1. 將常數項移到右邊:</p>$$ax^2 + bx = -c$$<p>2. 方程兩邊同除以 $a$ (因為 $a \\neq 0$):</p>$$x^2 + \\frac{b}{a}x = -\\frac{c}{a}$$<p>3. 配方法：在兩邊同時加上 $(\\frac{b}{2a})^2 = \\frac{b^2}{4a^2}$:</p>$$x^2 + \\frac{b}{a}x + \\left(\\frac{b}{2a}\\right)^2 = -\\frac{c}{a} + \\frac{b^2}{4a^2}$$<p>4. 左邊化為完全平方，右邊通分:</p>$$\\left(x + \\frac{b}{2a}\\right)^2 = \\frac{b^2 - 4ac}{4a^2}$$<p>5. 兩邊開平方根:</p>$$x + \\frac{b}{2a} = \\pm \\sqrt{\\frac{b^2 - 4ac}{4a^2}}$$ $$x + \\frac{b}{2a} = \\pm \\frac{\sqrt{b^2 - 4ac}}{2a}$$<p>6. 移項得到最終公式:</p>$$x = -\\frac{b}{2a} \\pm \\frac{\sqrt{b^2 - 4ac}}{2a}$$<p>因此:</p>$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$`;
             actionButtonsEl.style.display = 'flex'; submitProofBtnEl.style.display = 'none';
        } else {
             const box = document.querySelector(`.formula-box[data-formula-id="${formulaId}"]`);
             formulaTitleEl.textContent = box && box.querySelector('h3') ? box.querySelector('h3').textContent : '公式詳情';
             proofContentEl.innerHTML = `<p style="text-align: center; color: var(--text-secondary);">此公式目前尚無證明。</p>`;
             actionButtonsEl.style.display = 'none'; submitProofBtnEl.style.display = 'block';
        }
        showPage(formulaDetailPage);
    }

    // --- Intersection Observer for Feature Strips Animation ---
    function initializeStripAnimationObserver() {
        const featureStrips = document.querySelectorAll('.feature-strip'); // Target strips
        if (!featureStrips.length) {
             console.log("No feature strips found to observe.");
             return;
        }

        const observerOptions = {
            root: null, // Viewport
            rootMargin: '0px',
             // Adjust threshold: maybe trigger when strip is more visible
            threshold: 0.25 // Trigger when 25% of the strip is visible
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                     console.log("Intersecting:", entry.target);
                    entry.target.classList.add('visible');
                    // Keep observing if you want hide-on-exit behavior
                    observer.unobserve(entry.target); // Stop observing once visible (reveal-and-stay)
                }
                // else { // For Hide-on-Exit (Uncomment if needed)
                //     entry.target.classList.remove('visible');
                // }
            });
        };

        // Create and start observing
        const stripObserver = new IntersectionObserver(observerCallback, observerOptions);
        featureStrips.forEach(strip => {
             // Reset visibility on init, in case user scrolls fast / page reloads
            // strip.classList.remove('visible'); // Optional reset
            stripObserver.observe(strip);
            console.log("Observing strip:", strip);
        });
         console.log("Feature strip observer initialized.");
    }


    // --- Event Listeners Setup ---
    function setupEventListeners() {
        // Login/Logout
        const homeNavLoginBtn = document.getElementById('home-nav-login-btn'); const mainLoginBtn = document.getElementById('main-login-btn'); const logoutBtn = document.getElementById('logout-btn');
        if (homeNavLoginBtn) homeNavLoginBtn.addEventListener('click', simulateLogin);
        if (mainLoginBtn) mainLoginBtn.addEventListener('click', simulateLogin);
        if (logoutBtn) logoutBtn.addEventListener('click', simulateLogout);

        // Sidebar Toggle
        if (sidebarToggleBtn && sidebar) { /* ... (sidebar toggle logic remains same) ... */
             sidebarToggleBtn.addEventListener('click', (e) => { e.stopPropagation(); if (window.innerWidth <= 768) { sidebar.classList.toggle('open'); } else { sidebar.classList.toggle('collapsed'); } });
        }

        // AI Icons
        const aiIcons = document.querySelectorAll('.ai-icon'); aiIcons.forEach(icon => { icon.addEventListener('click', useAiFeature); });

        // Formula Box Clicks
        const formulaBoxes = document.querySelectorAll('.formula-box'); formulaBoxes.forEach(box => { /* ... (formula box logic remains same) ... */
             box.addEventListener('click', () => { const formulaId = box.getAttribute('data-formula-id'); if (formulaId) loadFormulaDetail(formulaId); else console.warn("Formula box clicked, but no data-formula-id found."); });
        });

        // Back Button
        const backToListBtn = document.getElementById('back-to-list-btn'); if (backToListBtn) { backToListBtn.addEventListener('click', () => showPage(loggedInPage)); }

        // Detail Page Actions
        /* ... (Detail page button listeners remain the same) ... */
         const approveBtn = document.querySelector('.approve-btn'); const disapproveBtn = document.querySelector('.disapprove-btn'); const questionBtn = document.querySelector('.question-btn'); const submitCommentBtn = document.getElementById('submit-comment-btn'); const submitProofBtn = document.getElementById('submit-proof-btn'); const commentSectionEl = document.getElementById('comment-section'); const commentTextareaEl = document.getElementById('comment-textarea');
         if(approveBtn) { approveBtn.addEventListener('click', () => { console.log(`Approved proof for ${currentFormulaId}`); alert('感謝您的審核！ (贊成)'); if (commentSectionEl) commentSectionEl.style.display = 'none'; }); }
         if (disapproveBtn) { disapproveBtn.addEventListener('click', () => { console.log(`Disapproved proof for ${currentFormulaId}`); if (commentSectionEl) commentSectionEl.style.display = 'block'; if (commentTextareaEl) commentTextareaEl.focus(); }); }
         if (questionBtn) { questionBtn.addEventListener('click', () => { console.log(`Questioned proof for ${currentFormulaId}`); if (commentSectionEl) commentSectionEl.style.display = 'block'; if (commentTextareaEl) commentTextareaEl.focus(); }); }
         if(submitCommentBtn) { submitCommentBtn.addEventListener('click', () => { const comment = commentTextareaEl ? commentTextareaEl.value.trim() : ''; if (comment) { console.log(`Submitted comment for ${currentFormulaId}: "${comment}"`); alert('感謝您的回饋！'); if (commentTextareaEl) commentTextareaEl.value = ''; if (commentSectionEl) commentSectionEl.style.display = 'none'; } else { alert('請輸入您的意見！'); } }); }
         if (submitProofBtn) { submitProofBtn.addEventListener('click', () => alert('提交證明功能尚未開放！')); }


        // Click Outside to Close Mobile Sidebar
        document.addEventListener('click', function(event) { /* ... (click outside logic remains same) ... */
             if (window.innerWidth <= 768 && sidebar && sidebar.classList.contains('open')) {
                 const isClickInsideSidebar = sidebar.contains(event.target);
                 const isClickOnToggler = sidebarToggleBtn && sidebarToggleBtn.contains(event.target);
                 if (!isClickInsideSidebar && !isClickOnToggler) { sidebar.classList.remove('open'); }
             }
        });

        // Adjust Sidebar on Resize
        window.addEventListener('resize', () => { /* ... (resize logic remains same) ... */
             if (sidebar) { if (window.innerWidth > 768) { sidebar.classList.remove('open'); } else { sidebar.classList.remove('collapsed'); } }
        });
    }

    // --- Initialization ---
    updateMbitDisplay();
    setupEventListeners();
    initializeStripAnimationObserver(); // Initialize the *new* observer

    // Ensure math renders on the initially active page
    const initialActivePage = document.querySelector('.page.active');
    if (initialActivePage) {
        renderMathIfReady(initialActivePage);
    }
    console.log("MathVerse UI Initialized with Feature Strips");
});