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

## 구현

기능적인 구현과 퍼블리싱에 체크가 진행된다.

- 상품 테이블
  - [ ] 한 페이지에 나오는 아이템 수를 제어할 수 있는가
  - [ ] 현재 페이지를 확인할 수 있고, 특정페이지로 이동할 수 있는가(페이지네이션)
  - [ ] 테이블 헤더를 클릭하여 정렬된 결과를 얻을 수 있는가 - 정렬쿼리로 구현해보자
- 상품필터
  - [ O ] 필드, 연산자, 값을 제대로 입력할 수 있는가
  - [ O ] 여러개의 조건필터를 중첩하여생성할 수 있는가
  - [ ] 중간에 필터를 삭제할 수 있는가
  - [ O ] 필터를 이용해서 생산된 검색쿼리가 필터의 내용과 일치하는가
  - [ O ] 검색쿼리로 서버의 데이터를 잘 가져오는가
  - [ ] 필터 수정시 마다 적절하게 데이터가 변경되는가
- 퍼블리싱
  - [ ] 필터를 직관적으로 사용할 수 있는가
  - [ O ] 상품을 로딩하는 동안 로딩중 표시가 있는가
  - [ ] 모바일 화면(width: 640px)에서도 테이블의 내용을 확인할 수 있는가
  - [ ] 모바일 화면에서도 상품필터를 수정하는데에 무리가 없는가
- 코드 스타일
  - [ ] 변수명, 메소드명은 적절한가
  - [ ] 작명 스타일(camelCase, snakeCase 등)은 일관적인가
  - [ ] 사용되지 않는 변수, 메서드가 없는가
  - [ ] 제출 결과물에 console.log가 포함되지 않았는가

가산점

- [ ] 검색된 내용을 그래프로 요약할 수 있는가([Toast Chart](https://ui.toast.com/tui-chart/) 이용)
- [ ] 새로고침을 했을 때, 마지막에 작성했던 검색쿼리를 남길 수 있는가
- [ ] 누군가에게 URL로 공유했을 때, 검색쿼리를 포함해서 공유할 수 있는가
- [ ] 대기중인 경우 화면 전환(또는 애니메이션)을 이용하여 로딩 시간을 지루하지 않게 하는가
