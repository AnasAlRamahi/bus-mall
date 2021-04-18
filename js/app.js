'use strict';

let arrProducts = [];
let numOfClicks = 0;
let lastAttempt = 5;

// let section = document.getElementById('productsSection');
let main = document.getElementById('main');
let buttonEl = document.getElementById('viewResults');



function Products(productName, imgPath){
  this.productName = productName;
  this.imgPath = imgPath;
  this.timesShown = 0;
  this.timesClicked = 0;
  arrProducts.push(this);
}

function randomImage(){

  return Math.floor(Math.random() * arrProducts.length);

}

new Products('bag','../img/bag.jpg' );
new Products('banana','../img/banana.jpg' );
new Products('bathroom','../img/bathroom.jpg' );
new Products('boots','../img/boots.jpg' );
new Products('bubblegum','../img/bubblegum.jpg' );
new Products('chair','../img/chair.jpg' );
new Products('cthulhu','../img/cthulhu.jpg' );
new Products('dog-duck','../img/dog-duck.jpg' );
new Products('dragon','../img/dragon.jpg' );
new Products('pet-sweep','../img/pet-sweep.jpg' );
new Products('scissors','../img/scissors.jpg' );
new Products('shark','../img/shark.jpg' );
new Products('sweep','../img/sweep.png' );
new Products('tauntaun','../img/tauntaun.jpg' );
new Products('unicorn','../img/unicorn.jpg' );
new Products('usb','../img/usb.gif' );
new Products('water-can','../img/water-can.jpg' );
new Products('wine-glass','../img/wine-glass.jpg' );


// console.log(randomImage());

// let numOfImg = 3;
// for (let i = 0; i < numOfImg ; i++) {
//   let img = document.createElement('img');
//   section.appendChild(img);
// }

let leftImage = document.getElementById('left-image');
let firstRandomValue;

let centerImage = document.getElementById('center-image');
let secondRandomValue;

let rightImage = document.getElementById('right-image');
let thirdRandomValue;

function render(){
  firstRandomValue = randomImage();
  secondRandomValue = randomImage();
  thirdRandomValue = randomImage();

  leftImage.src = arrProducts[firstRandomValue].imgPath;
  // eslint-disable-next-line no-undef
  arrProducts[firstRandomValue].timesShown++;
  while(secondRandomValue === firstRandomValue){
    secondRandomValue = randomImage();
  }
  centerImage.src = arrProducts[secondRandomValue].imgPath;
  arrProducts[secondRandomValue].timesShown++;
  //   console.log(firstRandomValue);
  //   console.log(secondRandomValue);

  while(thirdRandomValue === secondRandomValue || thirdRandomValue === firstRandomValue){
    thirdRandomValue = randomImage();
  }
  //   console.log(thirdRandomValue);
  rightImage.src = arrProducts[thirdRandomValue].imgPath;
  arrProducts[thirdRandomValue].timesShown++;
}

render();

leftImage.addEventListener('click', roundImages);
centerImage.addEventListener('click', roundImages);
rightImage.addEventListener('click', roundImages);

function roundImages(event){
  numOfClicks++;

  if(event.target.id === 'left-image'){
    arrProducts[firstRandomValue].timesClicked++;
  }else if(event.target.id === 'center-image') {
    arrProducts[secondRandomValue].timesClicked++;
  }else{
    arrProducts[thirdRandomValue].timesClicked++;
  }

  if (numOfClicks < lastAttempt){
    render();
  }else{
    buttonEl.addEventListener('click', viewReslts);
    leftImage.removeEventListener('click', roundImages);
    centerImage.removeEventListener('click', roundImages);
    rightImage.removeEventListener('click', roundImages);
    console.log(arrProducts);
  }
}

function viewReslts(){
  let ulEl = document.createElement('ul');
  main.appendChild(ulEl);
  for (let i = 0; i < arrProducts.length; i++) {
    let liEl = document.createElement('li');
    ulEl.appendChild(liEl);
    liEl.textContent = `${arrProducts[i].productName} had ${arrProducts[i].timesClicked} votes, and was seen ${arrProducts[i].timesShown} times.`;
    buttonEl.removeEventListener('click', viewReslts);
  }
}

let element;
for (let i = 0; i < arrProducts.length; i++) {
  element += arrProducts[i].timesShown;
  console.log(element);
}
