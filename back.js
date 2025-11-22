document.addEventListener('DOMContentLoaded', () => {
    const navBar = document.getElementById('nav');
    const navButtons = navBar.querySelectorAll('.but');
    const sections = document.querySelectorAll('.body2');
    const body1 = document.getElementById('body1');
    const scrollChangePoint = 100;
    const SCROLLED_CLASS = 'scrolled'; 

    const sectionNames = ["Home", "About", "Services", "Contact"]; 
    
    // --- 2. SCROLL EFFECT: Change navbar style by toggling the 'scrolled' class ---
    
    const handleScroll = () => {
        if (window.scrollY > scrollChangePoint) {
            navBar.classList.add(SCROLLED_CLASS);
        } else {
            navBar.classList.remove(SCROLLED_CLASS);
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // --- 3. ACTIVE LINK HIGHLIGHT: Intersection Observer and Helper Functions ---
    
    const removeActiveClass = () => {
        navButtons.forEach(button => {
            button.classList.remove('active-link');
        });
    };

    const observerCallback = (entries, observer) => {
        let currentActiveSection = null;

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                currentActiveSection = entry.target;
            }
        });
        
        if (currentActiveSection) {
            const sectionIndex = Array.from(sections).indexOf(currentActiveSection);
            const sectionName = sectionNames[sectionIndex + 1]; 

            let targetButton = null;
            navButtons.forEach(button => {
                if (button.textContent.trim() === sectionName) {
                    targetButton = button;
                }
            });

            if (targetButton) {
                removeActiveClass();
                targetButton.classList.add('active-link');
            }
        }
        
        if (window.scrollY < scrollChangePoint && !navButtons[0].classList.contains('active-link')) { 
            removeActiveClass();
            navButtons[0].classList.add('active-link'); 
        }
    };

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px 0px -50% 0px', 
        threshold: 0
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
    
    // --- 4. ADD CLICKABLE FUNCTIONALITY (Smooth Scrolling) ---
    navButtons.forEach((button, index) => {
        let targetElement = null;

        if (index === 0) {
            targetElement = body1;
        } else {
            targetElement = sections[index - 1]; 
        }
        
        button.addEventListener('click', () => {
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - (navBar.offsetHeight || 0), 
                    behavior: 'smooth'
                });
                
                removeActiveClass();
                button.classList.add('active-link');
            }
        });
    });

});
document.addEventListener('DOMContentLoaded', () => {
    const myDivs = document.querySelectorAll('.but'); 
    myDivs.forEach(ele => {
        
        ele.addEventListener('click', () => {
            myDivs.forEach(ot => {
                ot.classList.remove('clicked-div');
            });
            ele.classList.toggle('clicked-div'); 
        });
    });
});
