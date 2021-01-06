# Reactive Programming

- paradigm works with asynchronous data streams
- data streams may be created from
  - UI Events
  - HTTP Request
  - File Systems
  - Array-like Objects
  - Memory / Cache

### A stream

- sequence of ongoing events ordered in time
- emits a value, error and complete signal

Mouse movement is never complete

## Observables

- Created to watch streams and emit functions when a value, error or completed signal is returned
- Can be subscribed to by an observer
- Will constantly watch streams and will update accordingly
- We can interact with data streams as any regular array

## Reactive extensions / reactiveX

- a library for composing asynchronous programs by using observable sequences
- provides a long list of operators which allow us to filter, select, transform, combine and compose observables

## JavaScript -> RxJs
