# How to install and run JSON Server

``` ts

npm install -g json-server 

ng json-server --watch db.json


```
# How to install Angular CLI and Angular Material in a Project

``` ts

npm install @ngular/cli

npm add @angular/material 

```

# How to install JQuery and Bootstrap

``` ts 

 npm install jquery

 npm install bootsrap
 
 ```

 # Static and Dynamic Arrys 

## Static Arrays 

### Are a list of elements with fixed length n. They are static beacuse the lenghth does not change

### The lenghth must be known at compile time

### We can access any element by its associated index

 ``` ts 

int[] numbers = new int [3]

numbers[0] = 1;
numbers[1] = 3;
numbers[2] = 5;

```
### Inserting to a static array is 0(1) meaning its constant at runtime 

###  Updating to a static array is also 0(1) meaning its constant at runtime 

### Deleting to a static array is 0(n) meaning we have to shift all elements to the left 

### Static Arrays are not flexible, sometimes we have to use Dyamic Arrays



## Dynamic Arrays

### Are a list of elements with fixed length n. They are dynamic beacuse the lenghth does change 

### The lenghth may or may mot be be known at compile time

### We can access any element by its associated index



``` ts 

// Wrie and Update - (0)1
numbers[0] = 1;
numbers[1] = 3;
numbers[2] = 5;

// 0(1)
numbers.push(7);
numbers.push(9);

// 0(n)
numbers.unshift(0)
numbers.unshift(-1)

// Delete 0 0(n)
numbers.splice(4. 1)

console.log(numbers)


```
### Inserting to a Dynamic array is 0(1) meaning its constant at runtime 

###  Updating to a Dynamic array is also 0(1) meaning its constant at runtime 

### Deleting to a Dynamic array is 0(n) meaning we have to shift all elements to the left 