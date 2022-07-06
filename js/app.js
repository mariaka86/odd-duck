/*
File: app.js
Date: 2022-07-05
Author: Mary K
*/
'use strict';
/******************************************************************
 *  Global Variables
 ******************************************************************/
let fantaseaContainer; //html elements will go here
let resultButton;// will show the voting results
let image1; //  1st image element
let image2; // 2nd image element
let image3;// 3rd image product
let allProductsArray;// an array of product objects
let clicks = 0; // # of user clicks
let maxClicksPermitted = 25; // the maximum amount that a user can  click.



/*****************************************************************
 * PRODUCT OBJECTS
 ****************************************************************



 Constructor for product objects **/
/**
  *
  * @param {string} productName - the name of the product name
  * @param {string} imagePath - where the image is located
  */
function Product(productName,imagePath){
  this.productName = productName;
  this.imagePath= imagePath;
  this.timesShown=0;
  this.numberClicks=0;
}
/************************************************************************
  * LOGIC
  ***********************************************************************
  /
/**
 * Draw 3 random products on the page
 */
function render(){
  console.log('rendering()');
  ///getting 3 random products
  let product1 = getRandomProductIndex();
  let product2 = getRandomProductIndex();
  let product3 = getRandomProductIndex();
  ///how to make sure they're not the same product
  while (product1===product2 || product1===product3){
    product1=getRandomProductIndex();

  }
  while (product1===product2 || product2===product3){
    product2=getRandomProductIndex();

  }
  // Image value
  image1.src = allProductsArray[product1].imagePath;
  image1.alt= allProductsArray[product1].productName;
  image2.src = allProductsArray[product2].imagePath;
  image2.alt= allProductsArray[product2].productName;
  image3.src = allProductsArray[product3].imagePath;
  image3.alt= allProductsArray[product3].productName;
  //incrementing views/ amount shown
  allProductsArray[product1].timesShown++;
  allProductsArray[product2].timesShown++;
  allProductsArray[product3].timesShown++;
}

/**
 * Results of clicking
 */
function renderResult(){
  console.log('in renderResult()');
  let ul = document.querySelector('ul');
  for(let i = 0; i < allProductsArray[i]; i++){
    let product =allProductsArray[i];
    let li = document.createElement('li');
    li.textContent= `${product.name} had ${product.timesShown} and was clicked ${product.numberClicks} times.`;
    ul.appendChild(li);
  }
}
/********************************************************************************
 * Control Logic
 */
/** initialize global variables, setting up event handlers and initial render performance */
function initialize (){
  console.log('in initialize()');
  // initial references to html
  fantaseaContainer = document.querySelector('section');
  resultButton = document.querySelector('section + div');
  image1=document.querySelector('section img:first-child');
  image2=document.querySelector('section img:nth-child(2)');
  image3=document.querySelector('section img:nth-child(3)');
  // instanitiating products
  allProductsArray =[];
  allProductsArray.push(new Product('Bag','./images/bag.jpg'));
  allProductsArray.push(new Product('Banana','./images/banana.jpg'));
  allProductsArray.push(new Product('Bathroom','./images/bathroom.jpg'));
  allProductsArray.push(new Product('Boots','./images/boots.jpg'));
  allProductsArray.push(new Product('Breakfast','./images/breakfast.jpg'));
  allProductsArray.push(new Product('Bubblegum','./images/bubblegum.jpg'));
  allProductsArray.push(new Product('Chair','./images/chair.jpg'));
  allProductsArray.push(new Product('Cthulhu','./images/cthulhu.jpg'));
  allProductsArray.push(new Product('Dog/Duck','./images/dog-duck.jpg'));
  allProductsArray.push(new Product('Dragon','./images/dragon.jpg'));
  allProductsArray.push(new Product('Pen','./images/pen.jpg'));
  allProductsArray.push(new Product('Pet-Broom','./images/pet-sweep.jpg'));
  allProductsArray.push(new Product('Scissors','./images/scissors.jpg'));
  allProductsArray.push(new Product('Shark','./images/shark.jpg'));
  allProductsArray.push(new Product('Baby-Broom','./images/sweep.png'));
  allProductsArray.push(new Product('Sleeping-Bag','./images/tauntaun.jpg'));
  allProductsArray.push(new Product('Unicorn-Mug','./images/unicorn.jpg'));
  allProductsArray.push(new Product('Watering-Can','./images/water-can.jpg'));
  allProductsArray.push(new Product('Wine-Glass','./images/wine-glass.jpg'));

  //setting up event handlers
  fantaseaContainer.addEventListener('click',handleProductClick);
  //initial render
  render();

}//end initialize function
/**
 * click handler for products
 *
 */
function handleProductClick(evt){
  console.log('in handleProductClick()');
  // click product test
  if (evt.target === fantaseaContainer){
    alert('Please click on an image.');
  }
  clicks++;
  // loop through random products
  // see if any match event target
  let clickProduct= evt.target.alt;
  for(let i=0; i< allProductsArray.length; i++){
    if (clickProduct=== allProductsArray[i].name){
      allProductsArray[i].clicks++;
      break;
    }
  }
  //checking to see if maximimum clicks have been reached(25)
  if (clicks===maxClicksPermitted){
    //removing event listener
    fantaseaContainer.removeEventListener ('click',handleProductClick);
    //enable the display of the result button
    resultButton.addEventListener('click',renderResult);
    resultButton.className= 'clicks-allowed';
    fantaseaContainer.className = 'no-voting';
  }else{
    render();
  }
}
/**
 * Returns random index from allProductsArray
 *
 */
function getRandomProductIndex(){
  return Math.floor(Math.random()* allProductsArray.length);

}
