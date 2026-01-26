document.addEventListener('DOMContentLoaded', function() {
    const nextBtn = document.getElementById('slider-next');
    const prevBtn = document.getElementById('slider-prev');
    const slide = document.getElementById('slider-wrapper');

    if (nextBtn && prevBtn && slide) {
        nextBtn.onclick = function(){
            let lists = document.querySelectorAll('.slider-item');
            slide.appendChild(lists[0]);
        }
        prevBtn.onclick = function(){
            let lists = document.querySelectorAll('.slider-item');
            slide.prepend(lists[lists.length - 1]);
        }
    }
});
