const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.next-button');
const prevButton = document.querySelector('.prev-button');
const dotsNav = document.querySelector('.nav-dots');
const dots = Array.from(dotsNav.children);

// 真实图片数量（去掉首尾两个克隆）
const realSlideCount = slides.length - 2;

// 初始位置设为 1（因为 0 是克隆的最后一张）
let currentSlideIndex = 1;
let isMoving = false;

// 初始化位置
track.style.transform = `translateX(-${currentSlideIndex * 100}%)`;

const updateDots = (index) => {
    // 计算对应的 dot 索引
    let dotIndex;
    if (index === 0) {
        dotIndex = realSlideCount - 1; // 到了 Clone Last，对应最后一个点
    } else if (index === slides.length - 1) {
        dotIndex = 0; // 到了 Clone First，对应第一个点
    } else {
        dotIndex = index - 1; // 正常对应
    }

    dots.forEach(dot => dot.classList.remove('active'));
    if(dots[dotIndex]) {
        dots[dotIndex].classList.add('active');
    }
}

const moveToSlide = (index) => {
    if (isMoving) return;
    isMoving = true;

    track.style.transition = 'transform 0.5s ease-in-out';
    track.style.transform = `translateX(-${index * 100}%)`;
    currentSlideIndex = index;
    updateDots(index);
}

// 监听过渡结束，处理瞬间回弹
track.addEventListener('transitionend', () => {
    isMoving = false;
    
    if (currentSlideIndex === 0) {
        // 如果到了第0张（克隆的最后一张），瞬间跳到倒数第2张（真实的最后一张）
        track.style.transition = 'none';
        currentSlideIndex = slides.length - 2;
        track.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
    }
    
    if (currentSlideIndex === slides.length - 1) {
        // 如果到了最后一张（克隆的第一张），瞬间跳到第1张（真实的第一张）
        track.style.transition = 'none';
        currentSlideIndex = 1;
        track.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
    }
});

nextButton.addEventListener('click', () => {
    moveToSlide(currentSlideIndex + 1);
});

prevButton.addEventListener('click', () => {
    moveToSlide(currentSlideIndex - 1);
});

dotsNav.addEventListener('click', e => {
    const targetDot = e.target.closest('button');
    if (!targetDot) return;
    
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    if (targetIndex !== -1) {
        // Dot 0 对应 Slide 1
        moveToSlide(targetIndex + 1);
    }
});

// --- 自动播放功能 ---
const intervalTime = 3000;
let autoPlayInterval;

const startAutoPlay = () => {
    clearInterval(autoPlayInterval);
    autoPlayInterval = setInterval(() => {
        if (!isMoving) {
            moveToSlide(currentSlideIndex + 1);
        }
    }, intervalTime);
};

const stopAutoPlay = () => {
    clearInterval(autoPlayInterval);
};

// 启动自动播放
startAutoPlay();

// 鼠标移入容器时暂停
document.querySelector('.carousel-container').addEventListener('mouseenter', stopAutoPlay);

// 鼠标移出容器时恢复
document.querySelector('.carousel-container').addEventListener('mouseleave', startAutoPlay);
