let slide = document.querySelector('.slide');
let prevSlide = document.querySelector('.fa-chevron-left');
let nextSlide = document.querySelector('.fa-chevron-right');
let sliderContainer = document.querySelector("#slider-container");
let thumbnail = document.querySelectorAll('.slider-item');
let caption = document.querySelector('#caption-text');

let thumbnailWidth;
let currentIndex = parseInt(thumbnail.length / 2 - 1);
let currentImage = 1;
let direction = 0;
const time = 3000;
const waitingTime = 10000;
let autoPlay;
let idle;

// Stabilirea ordinii initiale pentru toate imaginile
thumbnail.forEach(function(element, index) {	   
    element.style.order = index + 1;
});

// Afisarea primului slide
showSlide(currentIndex);

// Evenimente pentru schimbarea slide-ului
for (let i = 0; i < thumbnail.length; i++)
{
    thumbnail[i].addEventListener('click', function(){
        resetTimer();
        console.log("index-curent: " + (currentIndex + 1));
        console.log("ordinea " + this.style.order);
        if (this.style.order > thumbnail[currentIndex].style.order)
            direction = 1;
        
        if (this.style.order < thumbnail[currentIndex].style.order)
            direction = -1;
        
        console.log("Directia: " + direction)
        currentIndex = i;
        getDistance();
        showSlide(currentIndex);
            
    });
}

prevSlide.addEventListener('click', function(){
    resetTimer();
    direction = -1;
    currentIndex += direction
    showSlide(currentIndex);
    getDistance();
    
});

nextSlide.addEventListener('click', function(){
    resetTimer();
    direction = 1;
    currentIndex += direction
    showSlide(currentIndex);
    getDistance();
    
});

sliderContainer.addEventListener('transitionend',  function(){
    changeOrder();
});


// Functie pentru schimbarea ordinii imaginilor
function changeOrder() 
{

    currentImage += direction;

    if(currentImage == thumbnail.length + 1)
    currentImage = 1;

    if (currentImage == 0)
    currentImage = thumbnail.length;
    
    console.log(currentImage)

    let order = 1;

    for(let i = currentImage; i <= thumbnail.length; i++) 
    {
        document.querySelector(".slider-item[data-position='" + i + "']").style.order = order;
        order++;
    }

    for(let i = 1; i < currentImage; i++) 
    {
        document.querySelector(".slider-item[data-position='" + i + "']").style.order = order;
        order++;
    }

    sliderContainer.classList.remove('slider-container-transition');
    sliderContainer.style.transform = 'translateX(0)';
}

// Functie pentru calcularea distantei de la elementul curent pana la marginea ecranului
function getDistance()
{
    thumbnailWidth = document.getElementById('slider-container').getBoundingClientRect();
    let currentThumb = thumbnail[currentIndex].getBoundingClientRect();
    let distance;

    if (direction == 1)
        distance = parseInt((thumbnailWidth.width - currentThumb.right) * 100 / thumbnailWidth.width);

    if (direction == -1)
        distance = parseInt(currentThumb.left * 100 / thumbnailWidth.width);

    console.log("Distanta: " + distance);
    if (distance <= 20)
        moveSlide(direction);
}

// Functie pentru afisarea slide-ului ales
function showSlide(newIndex)
{

    if (newIndex > thumbnail.length - 1)
        currentIndex = 0;

    if (newIndex < 0)
        currentIndex = thumbnail.length - 1;

    for (let i = 0; i < thumbnail.length; i++) 
        thumbnail[i].className = thumbnail[i].className.replace(" active", "");

    thumbnail[currentIndex].className += " active";
    

    slide.style.backgroundImage = "url('images/img_jap" + currentIndex + ".jpg')";
    caption.innerHTML = thumbnail[currentIndex].ariaLabel;
}

// Functie pentru miscarea slider-ului
function moveSlide(direction)
{
    sliderContainer.classList.add('slider-container-transition');
	sliderContainer.style.transform = `translateX(${-20 * direction}%)`;
}

// Functie pentru shimbarea automata a slide-urilor
function autoSlide()
{
    autoPlay = setInterval(function(){
        direction = 1;
        currentIndex += direction
        showSlide(currentIndex);
        getDistance();
    }, time);
}

// Functie ce numara timpul pana utilizatorul va deveni inactiv
function resetTimer() 
{
    clearInterval(autoPlay);
    clearTimeout(idle);
    idle = setTimeout(autoSlide, waitingTime);
}

window.onload = resetTimer();
