import { Observable } from "rxjs/Rx";
import jsonp from "jsonp";

const btn = document.getElementById("btn");
const input = document.getElementById("input");
const output = document.getElementById("output");

const btnStream$ = Observable.fromEvent(btn, "click");

// Observables from events
btnStream$.subscribe(
  (e) => console.log(e.target.innerHTML),
  (err) => console.log(err),
  () => console.log("Completed")
);

const inputStream$ = Observable.fromEvent(input, "keyup");

inputStream$.subscribe(
  (e) => (output.innerHTML = e.target.value),
  (err) => console.log(err),
  () => console.log("Completed")
);

const moveStream$ = Observable.fromEvent(document, "mousemove");

moveStream$.subscribe(
  (e) => (output.innerHTML = `<h1>${e.clientX} ${e.clientY}</h1>`),
  (err) => console.log(err),
  () => console.log("Completed")
);

// Observables from array-like objects
const numbers = [33, 44, 55, 66, 77];

const numbers$ = Observable.from(numbers);

numbers$.subscribe({
  next: console.log,
  error: console.log,
  complete: console.log.bind(null, "Completed"),
});

const posts = [
  { title: "A title one", body: "This is title" },
  { title: "A title two", body: "This is title" },
  { title: "A title three", body: "This is title" },
];

const postOutput = document.getElementById("posts");

const posts$ = Observable.from(posts);

posts$.subscribe({
  next: (post) => {
    console.log(post);
    postOutput.innerHTML += `<li>${post.title}</li><p>${post.body}</p>`;
  },
  error: console.log,
  complete: console.log.bind(null, "Completed"),
});

// Set

const set = new Set(["Hello", 44, { title: "My title" }]);

const set$ = Observable.from(set);

set$.subscribe({
  next: (post) => {
    console.log(post);
  },
  error: console.log,
  complete: console.log.bind(null, "Completed"),
});

const map = new Map([
  [1, 2],
  [3, 4],
  [5, 6],
]);
const map$ = Observable.from(map);

map$.subscribe({
  next: (post) => {
    console.log(post);
  },
  error: console.log,
  complete: console.log.bind(null, "Completed"),
});

// Observables from scratch

const source$ = new Observable((observer) => {
  console.log("Creating Observable...");

  observer.next("Hello world");
  observer.next("Another value");

  observer.error(new Error("Error: Something went wrong"));

  setTimeout(() => {
    observer.next("Yet another value");
    observer.complete();
  }, 3000);
});

source$
  .catch((err) => Observable.of(err))
  .subscribe(
    (x) => {
      console.log(x);
    },
    (err) => console.log(err),
    (complete) => console.log("Completed")
  );

//Observables from a promise

// const myPromise = new Promise((resolve, reject) => {
//   console.log("Creating Promise");
//   setTimeout(() => {
//     resolve("Hello from promise");
//   }, 3000);
// });

// myPromise.then((x) => {
//   console.log(x);
// });

// const source2$ = Observable.fromPromise(myPromise);

// source2$.subscribe(console.log);

function getUser(username) {
  return new Promise((resolve, reject) => {
    jsonp(
      `https://api.github.com/users/${username}`,
      null,
      function (err, data) {
        if (err) {
          reject(err.message);
        } else {
          resolve(data);
        }
      }
    );
  });
}

const input2Source$ = Observable.fromEvent(
  document.getElementById("input2"),
  "keyup"
);

input2Source$.subscribe((e) => {
  Observable.fromPromise(getUser(e.target.value))
    .map((user) => user.data)
    .subscribe((x) => {
      console.log({ x });
      document.getElementById("name").innerText = x.name;
      document.getElementById("location").innerText = x.location;
      document.getElementById("repos").innerText = x.public_repos;
    });
});

// Interval, Timer & Range

const source3$ = Observable.interval(100).take(5);

source3$.subscribe(
  (x) => {
    console.log({ x });
  },
  (err) => console.log(err),
  (complete) => console.log("Completed!")
);

const source4$ = Observable.timer(5000, 2000).take(5);

source4$.subscribe(
  (x) => {
    console.log({ x });
  },
  (err) => console.log(err),
  (complete) => console.log("Completed!")
);

const source5$ = Observable.range(25, 100);

source5$.subscribe(
  (x) => {
    console.log({ x });
  },
  (err) => console.log(err),
  (complete) => console.log("Completed!")
);

// Map
const source6$ = Observable.interval(1000)
  .take(10)
  .map((v) => v * v);

source6$.subscribe((v) => console.log(v));

const source7$ = Observable.from(["John", "Maria", "Tom"])
  .map((v) => v.toUpperCase())
  .map((v) => `I am ${v}`);

source7$.subscribe((v) => console.log(v));

// Pluck
const users = [
  { name: "John", age: 20 },
  { name: "Tom", age: 25 },
  { name: "Maria", age: 30 },
];

const users$ = Observable.from(users).pluck("name");

users$.subscribe((x) => console.log(x));

// Merge

Observable.of("Hello")
  .merge(Observable.of("Everyone"))
  .subscribe((x) => console.log(x));

Observable.interval(2000)
  .merge(Observable.interval(500))
  .take(25)
  .subscribe((x) => console.log(x));

const source8$ = Observable.interval(2000).map((v) => `Merge1: ${v}`);
const source9$ = Observable.interval(500).map((v) => `Merge2: ${v}`);

Observable.merge(source8$, source9$)
  .take(25)
  .subscribe((x) => console.log(x));

// Concat - one after another

const source10$ = Observable.range(0, 5).map((v) => `Source10: ${v}`);
const source11$ = Observable.range(6, 5).map((v) => `Source11: ${v}`);

Observable.concat(source10$, source11$).subscribe((x) => console.log(x));

// MergeMap
Observable.of("Hello").subscribe((v) => {
  Observable.of(v + " Everyone").subscribe((x) => console.log(x));
});

Observable.of("Hello")
  .mergeMap((v) => Observable.of(v + "Everyone!"))
  .subscribe();
