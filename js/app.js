'use strict';

let arrProducts = [];// Stores all the image objects
let numOfClicks = 0; // Stores the number of clicks the user has made so far
let lastAttempt = 5; // Number of attempts

// 3 arrays to display the data on the chart:
let arrChartNames = [];
let arrChartShown = [];
let arrChartClicked = [];

// This array will contain all the images that have been shown
// and save it inside. The code was designed to prevent the
// images contined here to appear more than once.
let shownArr = [];


let mainSection = document.getElementById('productsSection');
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

  // This condition in the while loop was put to prevent
  // showing the same image in the next round, that's why
  // I used the include method.
  while(firstRandomValue === secondRandomValue
     || firstRandomValue === thirdRandomValue
     || secondRandomValue === thirdRandomValue
     || shownArr.includes(firstRandomValue)
     || shownArr.includes(secondRandomValue)
     || shownArr.includes(thirdRandomValue)){

    firstRandomValue = randomImage();
    secondRandomValue = randomImage();
    thirdRandomValue = randomImage();
    }
  }

  console.log(firstRandomValue);
  console.log(secondRandomValue);
  console.log(thirdRandomValue);
  console.log('-');

  leftImage.src = arrProducts[firstRandomValue].imgPath;
  arrProducts[firstRandomValue].timesShown++;
  // shownArr.push(arrProducts[firstRandomValue]);
  shownArr[0] = firstRandomValue;

  centerImage.src = arrProducts[secondRandomValue].imgPath;
  arrProducts[secondRandomValue].timesShown++;
  // shownArr.push(arrProducts[secondRandomValue]);
  shownArr[1] = secondRandomValue;

  rightImage.src = arrProducts[thirdRandomValue].imgPath;
  arrProducts[thirdRandomValue].timesShown++;
  // shownArr.push(arrProducts[thirdRandomValue]);
  shownArr[2] = thirdRandomValue;


}

render();


// leftImage.addEventListener('click', roundImages);
// centerImage.addEventListener('click', roundImages);
// rightImage.addEventListener('click', roundImages);
// -I added the event listener for the main section only as requested: -
mainSection.addEventListener('click', roundImages);

function roundImages(event){

  if(event.target.id === 'left-image'){
    arrProducts[firstRandomValue].timesClicked++;
  }else if(event.target.id === 'center-image') {
    arrProducts[secondRandomValue].timesClicked++;
  }else if(event.target.id === 'right-image') {
    arrProducts[secondRandomValue].timesClicked++;
  }
  else
  {
    alert('please click on the photos..');
  }

  if (numOfClicks < lastAttempt-1 && shownArr.length !== arrProducts.length){
    render();
  }else{
    buttonEl.addEventListener('click', viewResults);
    leftImage.removeEventListener('click', roundImages);
    centerImage.removeEventListener('click', roundImages);
    rightImage.removeEventListener('click', roundImages);
    console.log(arrProducts);
  }

  numOfClicks++;
}

function viewResults(){
  let ulEl = document.createElement('ul');
  main.appendChild(ulEl);
  for (let i = 0; i < arrProducts.length; i++) {
    arrChartNames.push(arrProducts[i].productName);
    arrChartShown.push(arrProducts[i].timesShown);
    arrChartClicked.push(arrProducts[i].timesClicked);
    // let liEl = document.createElement('li');
    // ulEl.appendChild(liEl);
    // liEl.textContent = `${arrProducts[i].productName} had ${arrProducts[i].timesClicked} votes, and was seen ${arrProducts[i].timesShown} times.`;
    buttonEl.removeEventListener('click', viewResults);
  }
  console.log(arrChartNames);
  console.log(arrChartShown);
  console.log(arrChartClicked);

  // We call the chart render function instead of the list
  viewChart();
}


function viewChart(){
  let ctx = document.getElementById('myChart');
  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: arrChartNames,
      datasets: [{
        label: '# of Views',
        data: arrChartShown,
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1
      },{
        label: '# of Clicks',
        data: arrChartClicked,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1
      }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

