import { Observable } from "rxjs/Rx";

const btn = document.getElementById("btn");
const input = document.getElementById("input");

const btnStream$ = Observable.fromEvent(btn, "click");

btnStream$.subscribe(
  (e) => console.log(e.target.innerHTML),
  (err) => console.log(err),
  () => console.log("Completed")
);

const inputStream$ = Observable.fromEvent(input, "keyup");

inputStream$.subscribe(
  (e) => console.log(e),
  (err) => console.log(err),
  () => console.log("Completed")
);
