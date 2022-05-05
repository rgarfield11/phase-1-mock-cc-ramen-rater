// write your code here




// When the page loads, request the data from the server to get all the ramen objects. Then, display the image for each of the ramen using an `img` tag inside the `#ramen-menu` div.

//grab div containers
const ramenMenu = document.querySelector('#ramen-menu');
const newRamenForm = document.querySelector(`#new-ramen`);
// DOMContentLoaded Event
document.addEventListener('DOMContentLoaded', (e) => {
    fetchData(e);
})
// set API to variable
const baseURL = `http://localhost:3000/ramens`;
// fetch data & FOR EACH ramen, renderOneRamen
const fetchData = () => {
    fetch(baseURL)
    .then(resp => resp.json()) // give us response in json syntax
    .then(ramenObjects => {
        ramenObjects.forEach(ramen => renderRamenMenuItem(ramen))
    }) //iterates through ramenObejcts and render(s)RamenMenuItem
}


function renderRamenMenuItem(ramen){
    // create image
    const newImg = document.createElement('img'); 
    // assign data to image
    newImg.src = ramen.image; 
    //add click event
    newImg.addEventListener('click', () => ramenSelector(ramen))
    // append image to div
    ramenMenu.append(newImg);
}

function ramenSelector(ramen) {
    // grab div we're adding to
    const ramenDetailDiv = document.getElementById('ramen-detail'); 

    // target and source image
    const img = ramenDetailDiv.querySelector('img');
    img.src = ramen.image;

    // target and source name
    const h2 = ramenDetailDiv.querySelector('h2')
    h2.innerText = ramen.name;

    //target and source restaurant
    const h3 = ramenDetailDiv.querySelector('h3')
    h3.innerText = ramen.restaurant;

    // rating
    const rating = document.getElementById('rating-display')
    rating.innerText = ramen.rating

    //comment
    const comment = document.getElementById('comment-display')
    comment.innerText = ramen.comment

}

newRamenForm.addEventListener('submit', (e) => handleFormSubmit(e))

function handleFormSubmit(e) {
    e.preventDefault()

    // create object
    const ramenObject = {
        name: e.target.name.value,
        restaurant: e.target.restaurant.value,
        image: e.target.image.value,
        rating: e.target.rating.value,
        comment: e.target['new-comment'].value
    }
    // add object to DOM
    renderRamenMenuItem(ramenObject);
}