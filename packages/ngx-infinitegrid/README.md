<h1 align="center">
  <img width="256" alt="InfiniteGrid Logo" src="https://naver.github.io/egjs-infinitegrid/img/infinitegrid_logo.png"><br/>
  @egjs/ngx-infinitegrid
</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/@egjs/ngx-infinitegrid" target="_blank">
    <img src="https://img.shields.io/npm/v/@egjs/ngx-infinitegrid.svg?style=flat-square&color=dd0031&label=version&logo=NPM">
  </a>
  <a href="https://www.npmjs.com/package/@egjs/ngx-infinitegrid" target="_blank">
    <img alt="npm bundle size (scoped)" src="https://img.shields.io/bundlephobia/minzip/@egjs/ngx-infinitegrid.svg?style=flat-square&label=%F0%9F%92%BE%20gzipped&color=007acc">
  </a>
  <a href="https://github.com/naver/egjs-infinitegrid/graphs/commit-activity">
    <img alt="GitHub commit activity" src="https://img.shields.io/github/commit-activity/m/naver/egjs-infinitegrid.svg?style=flat-square&label=%E2%AC%86%20commits&color=08CE5D">
  </a>
  <a href="https://www.npmjs.com/package/@egjs/ngx-infinitegrid" target="_blank">
    <img src="https://img.shields.io/npm/dm/@egjs/ngx-infinitegrid.svg?style=flat-square&label=%E2%AC%87%20downloads&color=08CE5D" alt="npm downloads per month">
  </a>
  <a href="https://github.com/naver/egjs-infinitegrid/graphs/contributors" target="_blank">
    <img alt="GitHub contributors" src="https://img.shields.io/github/contributors/naver/egjs-infinitegrid.svg?label=%F0%9F%91%A5%20contributors&style=flat-square&color=08CE5D"></a>
  <a href="https://github.com/naver/egjs-infinitegrid/blob/master/LICENSE" target="_blank">
    <img alt="GitHub" src="https://img.shields.io/github/license/naver/egjs-infinitegrid.svg?style=flat-square&label=%F0%9F%93%9C%20license&color=08CE5D">
  </a>
</p>

<p align="center">
  An Angular component that can arrange items infinitely according to the type of grids
</p>

<p align="center">
  <a href="https://naver.github.io/egjs-infinitegrid/">Demo</a> / <a href="https://naver.github.io/egjs-infinitegrid/docs/api/InfiniteGrid">Documentation</a> / <a href="https://naver.github.io/egjs/">Other components</a>
</p>

## ⚙️ Installation
```sh
npm install --save @egjs/ngx-infinitegrid
```

## 🏃 Quick Start
### Module definition
```diff
+import { NgxInfiniteGridModule } from '@egjs/ngx-infinitegrid';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
 
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
+   NgxInfiniteGridModule /* Add in imports */
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { } /* Your app */
```

```html
<div NgxMasonryInfiniteGrid
  class="container"
  [gap]="5"
  [items]="items"
  [trackBy]="trackBy"
  [groupBy]="groupBy"
  (requestAppend)="onRequestAppend($event)"
  *ngFor="let item of [0]; trackBy: randomTrackBy;"
  #ig
  >
  <div class="item" *ngFor ="let item of ig.visibleItems; trackBy: trackBy;">
  </div>
</div>
```

```ts
import { Component, Input } from '@angular/core';
import { OnRequestAppend } from '@egjs/infinitegrid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  items = this.getItems(0, 10);
  getItems(nextGroupKey: number, count: number) {
    const nextItems = [];
    const nextKey = nextGroupKey * count;

    for (let i = 0; i < count; ++i) {
      nextItems.push({ groupKey: nextGroupKey, key: nextKey + i });
    }
    return nextItems;
  }
  groupBy(_: any, item: any) {
    return item.groupKey;
  }
  trackBy(_: any, item: any) {
    return item.key;
  }
  onRequestAppend(e: OnRequestAppend) {
    const nextGroupKey = (+e.groupKey! || 0) + 1;

    this.items = [
      ...this.items,
      ...this.getItems(nextGroupKey, 10),
    ];
  }
}
```


## 📖 More Options & Examples
[Options](https://naver.github.io/egjs-infinitegrid/Options) / [Demos](https://naver.github.io/egjs-infinitegrid/Demos)

## 🙌 Contributing
See [CONTRIBUTING.md](https://github.com/naver/egjs-infinitegrid/blob/master/CONTRIBUTING.md)

## 📝 Feedback
Please file an [Issue](https://github.com/naver/egjs-infinitegrid/issues) with label "Angular".

## Local development
### Project setup
```
npm install
```

### Compiles and hot-reloads demo
```sh
npm run start
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

## 📜 License
egjs-infinitegrid is released under the [MIT license](http://naver.github.io/egjs/license.txt).

```
Copyright (c) 2015-present NAVER Corp.
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```

<p align="center">
  <a href="https://naver.github.io/egjs/"><img height="50" src="https://naver.github.io/egjs/img/logotype1_black.svg" ></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://github.com/naver"><img height="50" src="https://naver.github.io/OpenSourceGuide/book/assets/naver_logo.png" /></a>
</p>

