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
  Observable.fromPromise(getUser(e.target.value)).subscribe((x) => {
    console.log({ x });
    document.getElementById("name").innerText = x.data.name;
    document.getElementById("location").innerText = x.data.location;
    document.getElementById("repos").innerText = x.data.public_repos;
  });
});
