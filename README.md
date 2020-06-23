# project

> My excellent Nuxt.js project

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Using Technology

* front-end skill : Vue.js Nuxt.js Javascript


## 기능

* 검색 필터 추가 기능: + 버튼을 누르면 필터 컴포넌트 추가
* 검색 필터 삭제 기능: 삭제 버튼을 누르면 필터 컴포넌트 하나씩 삭제, ```splice(index, 1)```로 해당 인덱스를 지우는 방법으로 작성하였지만 제일 아래쪽부터 삭제됨.. 원인을 모르겠어서 못 고침
* 필터 중복 사용: 확인 버튼을 누르면 검색 쿼리가 store에 저장 됨. 여러개 조건 중복 검색 가능
* 필터 중복 삭제 기능: X버튼을 누르면 store에 저장된 쿼리 삭제 됨.
* 검색 기능: store에 저장된 쿼리 대로 라우팅으로 API를 불러옴
* 정렬 기능: 헤더부분의 상위버튼, 하위버튼을 누르면 해당 열의 내림차순, 오름차순으로 정렬된 API를 받아 옴.
* 페이지 이동 기능: 1쪽 부터 차례대로 페이지 이동 가능
* 반응형: 검색 필터부분 반응형으로 만들어 스마트폰에서도 검색 가능

## 한계점

* Typescript를 사용해야 했는데, 처음에는 nuxt.js도 모르다보니 익힐 겸 Javascript로 먼저 공부하고 과제를 만듬.
만드는 과정에서 많은 어려움이 있었고, 해결하다보니 2주가 가까운 시간이 소비됨. Typescript로 바꾸고 싶었으나 Javascript로 구현한 것과는 또 많이 달라서 기능 구현에 조금 더 초점을 맞추어 Typescript를 포기함..

* 라우팅을 여러 페이지에 나누어 하였으나 pages/index.js와 중복된 코드가 대부분. layout폴더에 기본 페이지를 구성하여 pages 폴더에서 각각에 알맞는 methods나 data를 넣는 방식으로 하였으면 중복 코드가 좀 적었을 것이라 생각됨. 특히 pages/index.vue를 바꾸면 pages폴더안의 모든 vue파일들을 수정해야 했기에 번거로웠음.

* dynamic component의 삭제기능의 버그. 해당 index를 인식하는 것은 되었지만 data안의 Array에서 component를 index대로 삭제하지 못함. 이 부분 해결책을 찾지 못한것이 아쉬움.

## 느낀점

처음 해본 회사 과제였고, 처음 쓰는 프레임워크로 구현하여 재미있었습니다. 물론 아쉬운 점도 많았고, 부족한 점도 많았습니다. 아직 공부할 점이 많다는 것을 느꼈으며, 최대한 깔끔하게 코드를 짜보려고 노력하였습니다. 그러나 if문의 잦은 사용, 라우팅 페이지간 같은 코드 사용 등 깔끔하지 못한 코드가 많아서 나중에 다시 좀 고쳐보고 싶다는 생각을 하였습니다. 이런 과제 경험 기회를 주셔서 감사합니다~

