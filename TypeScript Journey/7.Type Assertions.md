#TypeScript #javacript 

#### Type Assertion: 
- Sometime compiler doesn't know the information we do
- Typescript is not performing any check to make sure type assertion is valid
```typescript

let myImg = document.getElementById("my-img") as HTMLImageElement;
console.log(myImg.src);
```
OR 
```typescript
let myImg = <HTMLImageElement> document.getElementById("my-img");
console.log(myImg.src);
```
