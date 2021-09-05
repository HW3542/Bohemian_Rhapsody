# ✏️Bohemian Rhapsody (핀터레스트 클론 코딩) - Backend
<p align='center'>
  <img src='https://img.shields.io/badge/express-4.17.1-white?logo=Express'>
  <img src='https://img.shields.io/badge/MySQL-5.7-white?logo=MySQL'>
</p>

## 🏠 [Home Page](http://bohemianrhapsody.shop/) / [Youtube](https://www.youtube.com/watch?v=lUjD6D7hPKA)

![Screenshot_56](https://user-images.githubusercontent.com/47944165/132097069-2a781816-9ae6-41e1-96ac-059c95979775.png)


## 🚩 프로젝트 소개
이미지 기반 SNS pinterest를 클론코딩한 프로젝트 입니다.

## 🗓 프로젝트 기간
2021년 7월 9일 ~ 2021년 7월 15일

## 👥 개발 인원
- 이용우 (Node.js) [팀장] @ [archepro84](https://github.com/archepro84)
- 이해웅 (Node.js) @ [HW3542](https://github.com/HW3542)
- 홍성훈 (React) @ [HseongH](https://github.com/HseongH)
- 주재인 (React) @ [demian0721](https://github.com/demian0721)


## 🛠 기술스텍

Front | Back
---|---:
React | Node.js
Redux | Express
Axios | MySQL


## 📖 라이브러리

라이브러리 | 설명
---|:---:
body-parser | 파라미터 추출
chokidar | 파일 감시 라이브러리
cors | 교차 리소스 공유
dotenv | DB비밀번호, 시크릿키 암호화
express | 서버
express-fileupload | 파일업로드
fs | 파일 수정
jsonwebtoken | 회원가입 작동 방식
sequelize | MySQL ORM
sequelize-cli | MySQL ORM Console
mysql | MySQL
cookie-parser | 쿠키 저장
joi | 입력데이터 검출
nunjucks | 템플릿 언어


## 🗃 DB ERD
![](https://blog.kakaocdn.net/dn/2oSJF/btq9Ah58Rrr/i2VY7Hs5rOnRwvjLVrPN20/img.png)

## 📋 [API Document](https://docs.google.com/spreadsheets/d/1RmCCC8TYkvNTH7gBLJ8cIhmlHC7W131AipUwB6R4C3Y/edit#gid=0)

## 📂 [Notion](https://www.notion.so/12-fd2b9e26805f4e9a908f1e5f791d7838)

## 🔨 [Front-End Git hub](https://github.com/HseongH/Bohemian-Rhapsody)


## 📌 특징

### 1) 게시글 보여주기
- 게시글을 보여줄때 무한스크롤이 가능하도록 LIMIT 옵션을 사용해서 정해진 갯수의 데이터만 통신하도록 했습닌다.
- 즐겨찾기 기능을 위해 따로 즐겨찾기 테이블을 구성해서 자신이 즐겨찾기에 추가한 경우와 아닌 경우를 TRUE, False로 구분하였습니다.
```SQL
select postId, img, 
        case when postId in (select postId from Favorites where userId = ${userId}) then "TRUE" else "FALSE" end as favorite
        from Posts
        LIMIT ${start}, ${limit};
```

### 2) 즐겨찾기
- 즐겨찾기를 위한 Favorite 테이블을 따로두어 즐겨찾기 기능을 구현했습니다.
``` SQL
SELECT postId, img
        FROM Posts
        WHERE postId IN (SELECT postId FROM Favorites WHERE userId = ${userId})
        LIMIT ${start}, ${limit};
```

### 3) 검색 기능
- Like 옵션을 활용하여 특정 글자가 들어간 글의 제목과 아티스트를 검색 가능하도록 구현하였습니다.
``` SQL
SELECT postId, img, 
            CASE WHEN postId IN (SELECT postId FROM Favorites WHERE userId = ${userId}) THEN "TRUE" ELSE "FALSE" END AS favorite
            FROM Posts
            WHERE title LIKE '%${keyword}%' OR artist LIKE '%${keyword}%'
            LIMIT ${start}, ${limit};
```
