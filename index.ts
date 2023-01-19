import { Subject, fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';


// start button
const startButton = document.querySelector('#start')!;
// count button
const countButton = document.querySelector('#count')!;
// error button
const errorButton = document.querySelector('#error')!;
// counting complete button
const completeButton = document.querySelector('#complete')!;

// count label
const currentCounterLabel = document.querySelector('#currentCounter')!;
// even count label
const evenCounterLabel = document.querySelector('#evenCounter')!;
// status label
const statusLabel = document.querySelector('#status')!;

// counter value
let counter = 0;
// subject call
let counter$: Subject<number>;

// start a new counter event
fromEvent(startButton, 'click').subscribe(() => {
  counter$ = new Subject();
  counter = 0;

  statusLabel.innerHTML = 'status: counting';

  // counts
  counter$.subscribe(data => {
    currentCounterLabel.innerHTML = `count: ${data}`;
  });
  // event counts
  const evenCounter$ = counter$.pipe(filter(data => data % 2 === 0));
  counter$.subscribe(data => {
    evenCounterLabel.innerHTML = `even count: ${data}`;
  });
})

// counting event
fromEvent(countButton, 'click').subscribe(() => {
  counter$.next(counter++);
})

// error event
fromEvent(errorButton, 'click').subscribe(() => {
  const reason = prompt('error message');
  counter$.error(reason || 'error');
});