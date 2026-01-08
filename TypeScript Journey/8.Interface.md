#TypeScript 


#### Interface :
- ###### Interface declaration:
	- Serve like types
	- The interface describes the shape of an object
	- It defines the syntax to follow
- Use with object
- Use with function
- Use read only and optional operator

```typescript

interface User {
	id: number,
	readonly username: string,
	country: string
}

let user: User = {
	id: 100,
	username: "Noura",
	country: "egypt"
}

console.log(user)

function getData(data: User){
	console.log(`id is ${data.id}`);
}

getData({id: 200, username: "noura", country:"ksa"})
```