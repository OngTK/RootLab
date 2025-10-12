##  1. SQL 실행
---
- resource > sql > CRUD_Page_Search_TestSql_20251008_2109_옹태경.sql 실행

## 2. application.properties 셋팅

``` properties

## [1] Spring 서버 port 설정  
server.port = 8080  
  
## [2] JDBC 연동 설정  
# [2.1] DB 서버 주소  
spring.datasource.url=jdbc:mysql://localhost:3306/testProject  
# [2.2] DB 서버 계정명  
spring.datasource.username=root  
# [2.3] DB 서버 비밀번호  
spring.datasource.password=1234  

```

## 3. Talend API test
---

### 1) insert

Post

http://localhost:8080/api/roles

```
{ "bnNo": "100-00-00001" ,
"rtName": "이름test",
"rtDescription" :"설명 test",
"rtStatus" :1
}

```
### 2) readAll

검색 X, 페이지 X

http://localhost:8080/api/roles

get

### 3) read

개별 조회

http://localhost:8080/api/roles/2000001

get

### 4) update

수정

http://localhost:8080/api/roles

Put
```
{
"rtNo": 2000001,
"rtName": "수정Test",
"rtDescription": "행사 전반 운영, 콜/무전, 러닝 관리",
"rtStatus": 1
}
```

### 5) page · search 

Get

페이지 O / 검색 X / 전체조회
기본 1페이지 / 기본 5개씩 조회

http://localhost:8080/api/roles/search


페이지 O / 검색 X
1페이지 + 10개씩 조회

http://localhost:8080/api/roles/search?page=1&size=10

페이지 O / 검색 O
bnNo 기준 검색

http://localhost:8080/api/roles/search?page=1&bnNo=100-00-00001

rtName에 "의" 가 있는 경우에 대한 검색

http://localhost:8080/api/roles/search?page=1&rtName=의

rtName에 "의" 가 있을 때, creatdeDate 기준으로 오름차순 정렬

http://localhost:8080/api/roles/search?page=1&orderBy=createDate&direction=ASC&rtName=의