#TypeScript #javacript 

#### Type Annotations : 
- Indicate the data type of variables
- Indicate the data type of functions input/output
- Object's, etc.
---
```typescript
let theName: string = "Nourhan";
let theAge: number = 21;
let hire:boolean = true;
let all:any = "example";

all = 100; // no problem now
```

- If you want your variable to take `string and number` only :
```typescript
let all: string | number;

all = "A";
all = 100;
```

- If you want your array to take only `string` : 
```typescript
let myFriends: string[] = ["osama", "ahmed", "sayed"];
```

- For multidimensional array : 
```typescript
let array: (string | number | string[] | boolean[]) = [1,2,3,4, "a", "b", ["c", "d"], [true, false]];
```

 - While writing a function if you want to make a variable to be `undefined` if you didn't type it : 
```typescript
function showData(name: string, age: number, country?: string){
	return `${name} - ${age} - ${country}`;
}
//if you type `?` this means that country may be written or may not 
console.log(showData("noura", 40))
```

---
#### Data type => Type alias
```typescript
type st = string;

let theName: st = "Nourhan";
```

###### Advanced type alias
```typescript

type Buttons = {
	up: string,
	right: string,
	down: string,
	left: string
}

function getActions(btns: Buttons){
	console.log(`Action for button Up is ${btns.up}`);
	console.log(`Action for button Right is ${btns.right}`);
	console.log(`Action for button down is ${btns.down}`);
	console.log(`Action for button left is ${btns.left}`);
}

getActions({up: "jump", right: "go right", down: "go down", left: "go left"});
```
---
#### Data types => literal types 
```typescript

type nums = 0 | 1 | -1;

function compare(num1: number, num2: number) : nums {
	if(num1 === num2) { return 0;}
	else if (num1 > num2) { return 1;}
	else {return -1;}
}

console.log(compare(20,20));
console.log(compare(20, 15));
console.log(compare(20, 30));
```
---
#### Data types => Tuple
- Is another sort of array type
- We knows exactly how many elements it contains
- We knows which types it contains at specific positions

```typescript

let article [number, string, boolean] = [11, "Title one", true];
article = [12, "Title two", false];

console.log(article);

const [id, title, published] = article;
console.log(id);
console.log(title);
console.log(published);
```
- But now if we make `article.push(100)` this will successfully add `100` at the end of the tuple 
	- But we can make it read only so it will be only fixed size using 
```typescript
let article: readonly [number, string, boolean] = [11, "title one", true];
```

---
#### Data types => void 
- Function that will return nothing
- Function in JavaScript that not return a value will show undefined
- Undefined is not void
#### Data types => Never
- Return type never returns
- The function doesn't have a normal completion
- It throws an error or never finishes running at all "infinite loop"
---

