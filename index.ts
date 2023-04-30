console.clear;

// สร้าง Function
// const next = (value: any) => console.log('next:', value);

// ใช้ Function
// next('Hello World');

// สร้าง Function แบบ Object
// const observer = {
//   next: (value: any) => console.log('next', value),
//   error: (err: any) => console.log('error', err),
//   complete: () => console.log('complete'),
// };

// สร้าง Interface
interface Observer {
  next: (value: any) => void;
  error: (err: any) => void;
  complete: () => void;
}

// สร้าง Type ให้ Teardown
type Teardown = () => void;

const observer: Observer = {
  next: (value: any) => console.log('next', value),
  error: (err: any) => console.log('error', err),
  complete: () => console.log('complete'),
};

// ใช้ Function แบบ Object
// observer.next('Hello World From Object');
// observer.error('Hello World From Object (Error)');
// observer.complete();

// สร้าง class Observable
class Observable {
  subscriber: (observer: Observer) => Teardown;
  constructor(subscriber: (observer: Observer) => Teardown) {
    this.subscriber = subscriber;
  }
  subscribe(observer: Observer) {
    // teardown Function สำหรับหยุด การนับเลข
    const teardown: Teardown = this.subscriber(observer);
    return { unsubscribe: () => teardown() };
  }
}

// Function source ทำงานทุก ๆ 1 วิ แปลว่าเราสามารถสังเกตุ เกตุการณ์ได้ เป็น Observable ได้
// function source(observer: Observer) {
//   let i = 0;
//   const index = setInterval(() => {
//     observer.next(i++);
//   }, 1000);
//   // teardown Function สำหรับหยุด การนับเลข
//   const teardown = () => clearInterval(index);
//   return { unsubscribe: () => teardown() };
// }

// function Interval(milisec: number) {
//   return new Observable((observer) => {
//     let i = 0;
//     const index = setInterval(() => {
//       observer.next(i++);
//     }, milisec);
//     // teardown Function สำหรับหยุด การนับเลข
//     const teardown = () => clearInterval(index);
//     return teardown;
//   });
// }

// function of(...dataList: any[]) {
//   return new Observable((observer) => {
//     dataList.forEach((data) => observer.next(data));
//     observer.complete();
//     return () => {};
//   });
// }

function from(dataList: any[]) {
  return new Observable((observer) => {
    dataList.forEach((data) => observer.next(data));
    observer.complete();
    return () => {};
  });
}

// const source = Interval(2000);
// const source = of(10, 20, 30, 40);
const source = from(['banana', 'old-banana', 'apple']);
const subscription = source.subscribe(observer);
setTimeout(() => {
  subscription.unsubscribe();
}, 5000);
