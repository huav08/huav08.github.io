// Handle responsive image switching for mobile devices
function handleResponsiveImages() {
    const images = document.querySelectorAll('.responsive-img');
    
    function isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                (window.innerWidth <= 768 && 'ontouchstart' in window);
    }
    
    function switchImages() {
        const isMobile = isMobileDevice();
        
        images.forEach(img => {
            if (isMobile && img.dataset.mobile) {
                if (!img.dataset.original) {
                    img.dataset.original = img.src;
                }
                img.src = img.dataset.mobile;
            } else if (img.dataset.original) {
                img.src = img.dataset.original;
            }
        });
    }
    
    switchImages();
    window.addEventListener('resize', switchImages);
}

document.addEventListener('DOMContentLoaded', handleResponsiveImages);
