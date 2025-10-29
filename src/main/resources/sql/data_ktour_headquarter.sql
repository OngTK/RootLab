-- ------------------------------------ k_tour_headquarter -------------------------------------------
-- ------------------------------------ 사이트정보(자체 테이블) -------------------------------------------
INSERT INTO k_tour_headquarter.SiteInfo
    (siName, siDomain, siIntro, siLogo, siFavicon, siMarker, siTel, siPrivacyOfficer, siEmail, siKeywords, siIsPublic)
VALUES
	('본사 사이트', 'ktour.kr', '본사의 메인 사이트입니다.', 'headquarterLogo.png', 'headquarterFavicon.png',
      'headquarterMarker.jpg', '032-521-8889', '김진숙', 'ktour@tjoeun.com', 'ktour, 여행지도, SaaS', 1);

-- ------------------------------------ 관리자정보(자체 테이블) -------------------------------------------
INSERT INTO k_tour_headquarter.manager 
    (siNo, mId, mPwd, mName, mNick, mGender, mPhone, mEmail, zipCode,
     mAddr1, mAddr2, mTermsAgreed, mLocationAgreed, mPushAgreed, memo, mType, mgAuth)
VALUES
-- 1. 시스템 관리자
(1,'admin','admin', '김진숙', 'admin', '여', '032-111-2222', 'root.kjs82@gmail.com', '12345', '인천광역시 부평구 경원대로 1368', NULL, TRUE, TRUE, TRUE, '본사(시스템관리자)입니다.', 0, 0),
(1,'user001','1234','이서준','서준1','남','010-1001-2345','user001@ktour.kr','04524','서울특별시 중구 세종대로 110',NULL,TRUE,TRUE,TRUE,'서울지사 담당자입니다.',1,1),
(1,'user002','1234','김하늘','하늘2','여','010-1002-2345','user002@ktour.kr','21456','인천광역시 남동구 예술로 120',NULL,TRUE,TRUE,TRUE,'인천지사 관리자입니다.',1,1),
(1,'user003','1234','박민준','민준3','남','010-1003-2345','user003@ktour.kr','48214','부산광역시 해운대구 우동 123',NULL,TRUE,TRUE,TRUE,'부산지사 직원입니다.',1,2),
(1,'user004','1234','최지우','지우4','여','010-1004-2345','user004@ktour.kr','34987','대전광역시 유성구 온천로 50',NULL,TRUE,TRUE,TRUE,'대전지사 담당자입니다.',1,2),
(1,'user005','1234','정도윤','도윤5','남','010-1005-2345','user005@ktour.kr','63024','제주특별자치도 제주시 첨단로 24',NULL,TRUE,TRUE,TRUE,'제주 운영담당입니다.',1,3),
(1,'user006','1234','윤하린','하린6','여','010-1006-2345','user006@ktour.kr','21345','서울특별시 강남구 테헤란로 231',NULL,TRUE,TRUE,TRUE,'서울2지사 담당자입니다.',1,2),
(1,'user007','1234','서현우','현우7','남','010-1007-2345','user007@ktour.kr','21355','서울특별시 강서구 공항대로 56',NULL,TRUE,TRUE,TRUE,'서울서부지사 담당자입니다.',1,1),
(1,'user008','1234','김예린','예린8','여','010-1008-2345','user008@ktour.kr','21712','인천광역시 연수구 송도과학로 70',NULL,TRUE,TRUE,TRUE,'인천송도 담당자입니다.',1,2),
(1,'user009','1234','홍지호','지호9','남','010-1009-2345','user009@ktour.kr','48512','부산광역시 수영구 광안로 88',NULL,TRUE,TRUE,TRUE,'부산서부 담당자입니다.',1,2),
(1,'user010','1234','배수아','수아10','여','010-1010-2345','user010@ktour.kr','34911','대전광역시 서구 둔산대로 99',NULL,TRUE,TRUE,TRUE,'대전홍보 담당자입니다.',1,3),
(1,'user011','1234','이도현','도현11','남','010-1011-2345','user011@ktour.kr','63312','제주시 연동 중앙로 84',NULL,TRUE,TRUE,TRUE,'제주영업 담당자입니다.',1,3),
(1,'user012','1234','정유진','유진12','여','010-1012-2345','user012@ktour.kr','04560','서울 종로구 종로 45',NULL,TRUE,TRUE,TRUE,'본사 지원직원입니다.',0,1),
(1,'user013','1234','한지민','지민13','여','010-1013-2345','user013@ktour.kr','21478','인천 부평구 부평대로 22',NULL,TRUE,TRUE,TRUE,'인천지사 보조입니다.',1,2),
(1,'user014','1234','장도윤','도윤14','남','010-1014-2345','user014@ktour.kr','48075','부산 남구 용호로 20',NULL,TRUE,TRUE,TRUE,'부산홍보 직원입니다.',2,2),
(1,'user015','1234','유지호','지호15','남','010-1015-2345','user015@ktour.kr','34811','대전 서구 둔산북로 102',NULL,TRUE,TRUE,TRUE,'대전 서구지사 직원입니다.',1,2),
(1,'user016','1234','김아인','아인16','여','010-1016-2345','user016@ktour.kr','63122','제주시 아라로 33',NULL,TRUE,TRUE,TRUE,'제주 신규직원입니다.',2,3),
(1,'user017','1234','박서연','서연17','여','010-1017-2345','user017@ktour.kr','04122','서울 마포구 독막로 22',NULL,TRUE,TRUE,TRUE,'서울본사 서브매니저입니다.',0,1),
(1,'user018','1234','오태윤','태윤18','남','010-1018-2345','user018@ktour.kr','21344','인천 연수구 센트럴로 33',NULL,TRUE,TRUE,TRUE,'인천 운영스텝.',1,3),
(1,'user019','1234','이은서','은서19','여','010-1019-2345','user019@ktour.kr','48300','부산 강서구 명지국제6로 14',NULL,TRUE,TRUE,TRUE,'부산 신규직원.',2,2),
(1,'user020','1234','정하율','하율20','남','010-1020-2345','user020@ktour.kr','34855','대전 중구 중앙로 12',NULL,TRUE,TRUE,TRUE,'대전본부 지원자.',1,3),
(1,'user021','1234','남예준','예준21','남','010-1021-2345','user021@ktour.kr','63345','제주시 신제주로 55',NULL,TRUE,TRUE,TRUE,'제주지사 홍보담당.',1,3),
(1,'user022','1234','김서윤','서윤22','여','010-1022-2345','user022@ktour.kr','04512','서울 강북구 도봉로 150',NULL,TRUE,TRUE,TRUE,'서울북부 담당자.',1,2),
(1,'user023','1234','박도영','도영23','남','010-1023-2345','user023@ktour.kr','21460','인천 동구 송림로 42',NULL,TRUE,TRUE,TRUE,'인천동구 담당자.',1,2),
(1,'user024','1234','노유진','유진24','여','010-1024-2345','user024@ktour.kr','48610','부산 북구 덕천로 21',NULL,TRUE,TRUE,TRUE,'부산북구 직원.',1,3),
(1,'user025','1234','이현수','현수25','남','010-1025-2345','user025@ktour.kr','34892','대전 동구 중앙로 33',NULL,TRUE,TRUE,TRUE,'대전동구 담당자.',1,3),
(1,'user026','1234','서예린','예린26','여','010-1026-2345','user026@ktour.kr','63312','제주시 연동 공항로 40',NULL,TRUE,TRUE,TRUE,'제주공항지사.',1,3),
(1,'user027','1234','이재윤','재윤27','남','010-1027-2345','user027@ktour.kr','04515','서울특별시 중구 필동로 4',NULL,TRUE,TRUE,TRUE,'서울직원',1,1),
(1,'user028','1234','최하진','하진28','여','010-1028-2345','user028@ktour.kr','21431','인천광역시 미추홀구 소성로 17',NULL,TRUE,TRUE,TRUE,'인천보조',2,3),
(1,'user029','1234','윤지아','지아29','여','010-1029-2345','user029@ktour.kr','48521','부산광역시 해운대구 해운대로 123',NULL,TRUE,TRUE,TRUE,'부산보조',1,2),
(1,'user030','1234','남도윤','도윤30','남','010-1030-2345','user030@ktour.kr','34921','대전광역시 유성구 대학로 56',NULL,TRUE,TRUE,TRUE,'대전보조',1,3),
(1,'user031','1234','김민서','민서31','여','010-1031-2345','user031@ktour.kr','63319','제주시 연북로 76',NULL,TRUE,TRUE,TRUE,'제주보조',1,2),
(1,'user032','1234','박시후','시후32','남','010-1032-2345','user032@ktour.kr','04550','서울특별시 용산구 한강대로 72',NULL,TRUE,TRUE,TRUE,'서울보조',2,2),
(1,'user033','1234','정서윤','서윤33','여','010-1033-2345','user033@ktour.kr','21412','인천광역시 부평구 경원대로 33',NULL,TRUE,TRUE,TRUE,'인천보조',2,3),
(1,'user034','1234','강지민','지민34','남','010-1034-2345','user034@ktour.kr','48567','부산광역시 남구 대연로 10',NULL,TRUE,TRUE,TRUE,'부산보조',1,3),
(1,'user035','1234','조하린','하린35','여','010-1035-2345','user035@ktour.kr','34887','대전광역시 서구 둔산중로 44',NULL,TRUE,TRUE,TRUE,'대전보조',2,2),
(1,'user036','1234','이윤호','윤호36','남','010-1036-2345','user036@ktour.kr','63112','제주시 중앙로 99',NULL,TRUE,TRUE,TRUE,'제주보조',2,3),
(1,'user037','1234','이소율','소율37','여','010-1037-2345','user037@ktour.kr','04533','서울특별시 중구 세종로 55',NULL,TRUE,TRUE,TRUE,'서울보조',1,2),
(1,'user038','1234','정민재','민재38','남','010-1038-2345','user038@ktour.kr','21498','인천광역시 계양구 계양대로 44',NULL,TRUE,TRUE,TRUE,'인천보조',1,3),
(1,'user039','1234','김서아','서아39','여','010-1039-2345','user039@ktour.kr','48230','부산광역시 동래구 충렬로 100',NULL,TRUE,TRUE,TRUE,'부산보조',1,2),
(1,'user040','1234','윤하늘','하늘40','여','010-1040-2345','user040@ktour.kr','34856','대전광역시 유성구 궁동로 88',NULL,TRUE,TRUE,TRUE,'대전보조',1,3),
(1,'user041','1234','이태희','태희41','남','010-1041-2345','user041@ktour.kr','63111','제주시 삼양로 17',NULL,TRUE,TRUE,TRUE,'제주보조',2,3),
(1,'user042','1234','최예준','예준42','남','010-1042-2345','user042@ktour.kr','04522','서울 종로구 청계천로 11',NULL,TRUE,TRUE,TRUE,'서울보조',1,1),
(1,'user043','1234','김도영','도영43','남','010-1043-2345','user043@ktour.kr','21432','인천광역시 서구 청라대로 22',NULL,TRUE,TRUE,TRUE,'인천보조',2,3),
(1,'user044','1234','박하율','하율44','여','010-1044-2345','user044@ktour.kr','48544','부산광역시 해운대구 센텀중앙로 22',NULL,TRUE,TRUE,TRUE,'부산보조',1,2),
(1,'user045','1234','정도윤','도윤45','남','010-1045-2345','user045@ktour.kr','34899','대전광역시 중구 대흥로 90',NULL,TRUE,TRUE,TRUE,'대전보조',1,2),
(1,'user046','1234','이서현','서현46','여','010-1046-2345','user046@ktour.kr','63323','제주시 애월로 111',NULL,TRUE,TRUE,TRUE,'제주보조',2,3),
(1,'user047','1234','한유정','유정47','여','010-1047-2345','user047@ktour.kr','04577','서울 강남구 논현로 200',NULL,TRUE,TRUE,TRUE,'서울보조',1,3),
(1,'user048','1234','조현우','현우48','남','010-1048-2345','user048@ktour.kr','21411','인천 미추홀구 수봉로 10',NULL,TRUE,TRUE,TRUE,'인천보조',1,2),
(1,'user049','1234','김지현','지현49','여','010-1049-2345','user049@ktour.kr','48590','부산 동래구 명륜로 60',NULL,TRUE,TRUE,TRUE,'부산보조',1,3),
(1,'user050','1234','정하준','하준50','남','010-1050-2345','user050@ktour.kr','34901','대전 서구 둔산로 22',NULL,TRUE,TRUE,TRUE,'대전보조',1,2);
     
     
-- ------------------------------------ 콘텐츠타입( #TourAPI 연동테이블 ) -------------------------------------------
INSERT INTO k_tour_headquarter.contentType 
    (contenttypeid, contentTypeName, defaultMarker)
VALUES
    ('12', '관광지', 'tourSpot.png'),
    ('14', '문화시설', 'culturalFacilities.png'),
    ('15', '행사/공연/축제', 'festival.png'),
    ('25', '여행코스', 'travelCourse.png'),
    ('28', '레포츠', 'leports.png'),
    ('32', '숙박', 'stay.png'),
    ('38', '쇼핑', 'shopping.png'),
    ('39', '음식점', 'food.png');
-- [1] 카테고리 코드 동기화=========================================================
INSERT INTO k_tour_headquarter.categorycode ( rnum, lclsSystm1Cd, lclsSystm1Nm, lclsSystm2Cd, lclsSystm2Nm, lclsSystm3Cd, lclsSystm3Nm )
	SELECT rnum, lclsSystm1Cd, lclsSystm1Nm, lclsSystm2Cd, lclsSystm2Nm, lclsSystm3Cd, lclsSystm3Nm
	FROM tour_api_origin.lclssystmcode2;
-- [2] 법정동 코드 동기화=========================================================
INSERT INTO k_tour_headquarter.ldongcode ( rnum, lDongRegnCd, lDongRegnNm, lDongSignguCd, lDongSignguNm, mapy, mapx )
	SELECT rnum, lDongRegnCd, lDongRegnNm, lDongSignguCd, lDongSignguNm, 0.0, 0.0
	FROM tour_api_origin.ldongcode2;
-- [2] 법정동 코드 수정=========================================================
update k_tour_headquarter.ldongcode set mapx = 126.9791666667 , mapy = 37.5733611111 where ldno=1;
update k_tour_headquarter.ldongcode set mapx = 126.9975000000 , mapy = 37.5635833333 where ldno=2;
update k_tour_headquarter.ldongcode set mapx = 126.9904166667 , mapy = 37.5324722222 where ldno=3;
update k_tour_headquarter.ldongcode set mapx = 127.0368888889 , mapy = 37.5630555556 where ldno=4;
update k_tour_headquarter.ldongcode set mapx = 127.0822777778 , mapy = 37.5384722222 where ldno=5;
update k_tour_headquarter.ldongcode set mapx = 127.0397777778 , mapy = 37.5743611111 where ldno=6;
update k_tour_headquarter.ldongcode set mapx = 127.0925833333 , mapy = 37.6063611111 where ldno=7;
update k_tour_headquarter.ldongcode set mapx = 127.0167222222 , mapy = 37.5894166667 where ldno=8;
update k_tour_headquarter.ldongcode set mapx = 127.0256944444 , mapy = 37.6397777778 where ldno=9;
update k_tour_headquarter.ldongcode set mapx = 127.0471388889 , mapy = 37.6688055556 where ldno=10;
update k_tour_headquarter.ldongcode set mapx = 127.0564722222 , mapy = 37.6542777778 where ldno=11;
update k_tour_headquarter.ldongcode set mapx = 126.9291666667 , mapy = 37.6026388889 where ldno=12;
update k_tour_headquarter.ldongcode set mapx = 126.9368055556 , mapy = 37.5791388889 where ldno=13;
update k_tour_headquarter.ldongcode set mapx = 126.9013888889 , mapy = 37.5663888889 where ldno=14;
update k_tour_headquarter.ldongcode set mapx = 126.8665277778 , mapy = 37.5170833333 where ldno=15;
update k_tour_headquarter.ldongcode set mapx = 126.8495833333 , mapy = 37.5509722222 where ldno=16;
update k_tour_headquarter.ldongcode set mapx = 126.8874166667 , mapy = 37.4954166667 where ldno=17;
update k_tour_headquarter.ldongcode set mapx = 126.8955277778 , mapy = 37.4568611111 where ldno=18;
update k_tour_headquarter.ldongcode set mapx = 126.8962777778 , mapy = 37.5263611111 where ldno=19;
update k_tour_headquarter.ldongcode set mapx = 126.9395000000 , mapy = 37.5124166667 where ldno=20;
update k_tour_headquarter.ldongcode set mapx = 126.9515833333 , mapy = 37.4784166667 where ldno=21;
update k_tour_headquarter.ldongcode set mapx = 127.0325000000 , mapy = 37.4836666667 where ldno=22;
update k_tour_headquarter.ldongcode set mapx = 127.0473333333 , mapy = 37.5172222222 where ldno=23;
update k_tour_headquarter.ldongcode set mapx = 127.1058888889 , mapy = 37.5145833333 where ldno=24;
update k_tour_headquarter.ldongcode set mapx = 127.1237777778 , mapy = 37.5300833333 where ldno=25;
update k_tour_headquarter.ldongcode set mapx = 129.0323611111 , mapy = 35.1065000000 where ldno=26;
update k_tour_headquarter.ldongcode set mapx = 129.0244444444 , mapy = 35.0970833333 where ldno=27;
update k_tour_headquarter.ldongcode set mapx = 129.0455833333 , mapy = 35.1294444444 where ldno=28;
update k_tour_headquarter.ldongcode set mapx = 129.0673611111 , mapy = 35.0916666667 where ldno=29;
update k_tour_headquarter.ldongcode set mapx = 129.0530555556 , mapy = 35.1627777778 where ldno=30;
update k_tour_headquarter.ldongcode set mapx = 129.0783888889 , mapy = 35.2047222222 where ldno=31;
update k_tour_headquarter.ldongcode set mapx = 129.0843888889 , mapy = 35.1363333333 where ldno=32;
update k_tour_headquarter.ldongcode set mapx = 128.9907777778 , mapy = 35.1977777778 where ldno=33;
update k_tour_headquarter.ldongcode set mapx = 129.1632777778 , mapy = 35.1630833333 where ldno=34;
update k_tour_headquarter.ldongcode set mapx = 128.9744166667 , mapy = 35.1044444444 where ldno=35;
update k_tour_headquarter.ldongcode set mapx = 129.0922222222 , mapy = 35.2429444444 where ldno=36;
update k_tour_headquarter.ldongcode set mapx = 128.9804722222 , mapy = 35.2119444444 where ldno=37;
update k_tour_headquarter.ldongcode set mapx = 129.0797222222 , mapy = 35.1763888889 where ldno=38;
update k_tour_headquarter.ldongcode set mapx = 129.1134166667 , mapy = 35.1454166667 where ldno=39;
update k_tour_headquarter.ldongcode set mapx = 128.9910833333 , mapy = 35.1523611111 where ldno=40;
update k_tour_headquarter.ldongcode set mapx = 129.2219444444 , mapy = 35.2443333333 where ldno=41;
update k_tour_headquarter.ldongcode set mapx = 128.6061111111 , mapy = 35.8691388889 where ldno=42;
update k_tour_headquarter.ldongcode set mapx = 128.6348055556 , mapy = 35.8896666667 where ldno=43;
update k_tour_headquarter.ldongcode set mapx = 128.5590277778 , mapy = 35.8719444444 where ldno=44;
update k_tour_headquarter.ldongcode set mapx = 128.5975833333 , mapy = 35.8463888889 where ldno=45;
update k_tour_headquarter.ldongcode set mapx = 128.5827777778 , mapy = 35.8856944444 where ldno=46;
update k_tour_headquarter.ldongcode set mapx = 128.6308333333 , mapy = 35.8584166667 where ldno=47;
update k_tour_headquarter.ldongcode set mapx = 128.5325555556 , mapy = 35.8296944444 where ldno=48;
update k_tour_headquarter.ldongcode set mapx = 128.4310833333 , mapy = 35.7749722222 where ldno=49;
update k_tour_headquarter.ldongcode set mapx = 128.5732777778 , mapy = 36.2426388889 where ldno=50;
update k_tour_headquarter.ldongcode set mapx = 126.6214722222 , mapy = 37.4737222222 where ldno=51;
update k_tour_headquarter.ldongcode set mapx = 126.6432222222 , mapy = 37.4739166667 where ldno=52;
update k_tour_headquarter.ldongcode set mapx = 126.6504722222 , mapy = 37.4635833333 where ldno=53;
update k_tour_headquarter.ldongcode set mapx = 126.6784444444 , mapy = 37.4105555556 where ldno=54;
update k_tour_headquarter.ldongcode set mapx = 126.7313888889 , mapy = 37.4470000000 where ldno=55;
update k_tour_headquarter.ldongcode set mapx = 126.7217777778 , mapy = 37.5070555556 where ldno=56;
update k_tour_headquarter.ldongcode set mapx = 126.7378888889 , mapy = 37.5376388889 where ldno=57;
update k_tour_headquarter.ldongcode set mapx = 126.6758333333 , mapy = 37.5451944444 where ldno=58;
update k_tour_headquarter.ldongcode set mapx = 126.4876111111 , mapy = 37.7467222222 where ldno=59;
update k_tour_headquarter.ldongcode set mapx = 126.6367500000 , mapy = 37.4462222222 where ldno=60;
update k_tour_headquarter.ldongcode set mapx = 126.9228888889 , mapy = 35.1458888889 where ldno=61;
update k_tour_headquarter.ldongcode set mapx = 126.8897222222 , mapy = 35.1522500000 where ldno=62;
update k_tour_headquarter.ldongcode set mapx = 126.9024166667 , mapy = 35.1327222222 where ldno=63;
update k_tour_headquarter.ldongcode set mapx = 126.9118055556 , mapy = 35.1740277778 where ldno=64;
update k_tour_headquarter.ldongcode set mapx = 126.7936388889 , mapy = 35.1396111111 where ldno=65;
update k_tour_headquarter.ldongcode set mapx = 127.4548333333 , mapy = 36.3504444444 where ldno=66;
update k_tour_headquarter.ldongcode set mapx = 127.4213333333 , mapy = 36.3255833333 where ldno=67;
update k_tour_headquarter.ldongcode set mapx = 127.3836111111 , mapy = 36.3555000000 where ldno=68;
update k_tour_headquarter.ldongcode set mapx = 127.3566666667 , mapy = 36.3623055556 where ldno=69;
update k_tour_headquarter.ldongcode set mapx = 127.4185000000 , mapy = 36.3691388889 where ldno=70;
update k_tour_headquarter.ldongcode set mapx = 129.3335555556 , mapy = 35.5694444444 where ldno=71;
update k_tour_headquarter.ldongcode set mapx = 129.3300555556 , mapy = 35.5447222222 where ldno=72;
update k_tour_headquarter.ldongcode set mapx = 129.4165000000 , mapy = 35.5048611111 where ldno=73;
update k_tour_headquarter.ldongcode set mapx = 129.3613611111 , mapy = 35.5827222222 where ldno=74;
update k_tour_headquarter.ldongcode set mapx = 129.1544166667 , mapy = 35.5509722222 where ldno=75;
update k_tour_headquarter.ldongcode set mapx = 127.2890000000 , mapy = 36.4800833333 where ldno=76;
update k_tour_headquarter.ldongcode set mapx = 127.0286111111 , mapy = 37.2635833333 where ldno=77;
update k_tour_headquarter.ldongcode set mapx = 127.0095555556 , mapy = 37.3007777778 where ldno=78;
update k_tour_headquarter.ldongcode set mapx = 126.9729722222 , mapy = 37.2587222222 where ldno=79;
update k_tour_headquarter.ldongcode set mapx = 127.0129444444 , mapy = 37.2796666667 where ldno=80;
update k_tour_headquarter.ldongcode set mapx = 127.0775000000 , mapy = 37.2527222222 where ldno=81;
update k_tour_headquarter.ldongcode set mapx = 127.1265833333 , mapy = 37.4200833333 where ldno=82;
update k_tour_headquarter.ldongcode set mapx = 127.1463333333 , mapy = 37.4486388889 where ldno=83;
update k_tour_headquarter.ldongcode set mapx = 127.1548333333 , mapy = 37.4341666667 where ldno=84;
update k_tour_headquarter.ldongcode set mapx = 127.1188333333 , mapy = 37.3822777778 where ldno=85;
update k_tour_headquarter.ldongcode set mapx = 127.0337777778 , mapy = 37.7381111111 where ldno=86;
update k_tour_headquarter.ldongcode set mapx = 126.9569444444 , mapy = 37.3942777778 where ldno=87;
update k_tour_headquarter.ldongcode set mapx = 126.9512222222 , mapy = 37.3836666667 where ldno=88;
update k_tour_headquarter.ldongcode set mapx = 126.9638888889 , mapy = 37.3913888889 where ldno=89;
update k_tour_headquarter.ldongcode set mapx = 126.7661111111 , mapy = 37.5034444444 where ldno=90;
update k_tour_headquarter.ldongcode set mapx = 126.7661111111 , mapy = 37.5034444444 where ldno=91;
update k_tour_headquarter.ldongcode set mapx = 126.7906944444 , mapy = 37.4865555556 where ldno=92;
update k_tour_headquarter.ldongcode set mapx = 126.7935000000 , mapy = 37.5475000000 where ldno=93;
update k_tour_headquarter.ldongcode set mapx = 126.8655555556 , mapy = 37.4786111111 where ldno=94;
update k_tour_headquarter.ldongcode set mapx = 127.1128333333 , mapy = 36.9920555556 where ldno=95;
update k_tour_headquarter.ldongcode set mapx = 127.0605555556 , mapy = 37.9031666667 where ldno=96;
update k_tour_headquarter.ldongcode set mapx = 126.8308333333 , mapy = 37.3216666667 where ldno=97;
update k_tour_headquarter.ldongcode set mapx = 126.8495000000 , mapy = 37.2998055556 where ldno=98;
update k_tour_headquarter.ldongcode set mapx = 126.7937500000 , mapy = 37.3161666667 where ldno=99;
update k_tour_headquarter.ldongcode set mapx = 126.8320555556 , mapy = 37.6583888889 where ldno=100;
update k_tour_headquarter.ldongcode set mapx = 126.8663888889 , mapy = 37.6493611111 where ldno=101;
update k_tour_headquarter.ldongcode set mapx = 126.7732222222 , mapy = 37.6987777778 where ldno=102;
update k_tour_headquarter.ldongcode set mapx = 126.7391666667 , mapy = 37.6773611111 where ldno=103;
update k_tour_headquarter.ldongcode set mapx = 127.0138888889 , mapy = 37.4291111111 where ldno=104;
update k_tour_headquarter.ldongcode set mapx = 127.1297777778 , mapy = 37.5942777778 where ldno=105;
update k_tour_headquarter.ldongcode set mapx = 127.2163888889 , mapy = 37.6361111111 where ldno=106;
update k_tour_headquarter.ldongcode set mapx = 127.0771388889 , mapy = 37.1497777778 where ldno=107;
update k_tour_headquarter.ldongcode set mapx = 126.8026666667 , mapy = 37.3800833333 where ldno=108;
update k_tour_headquarter.ldongcode set mapx = 126.9352222222 , mapy = 37.3616388889 where ldno=109;
update k_tour_headquarter.ldongcode set mapx = 126.9683888889 , mapy = 37.3446111111 where ldno=110;
update k_tour_headquarter.ldongcode set mapx = 127.2053333333 , mapy = 37.5388888889 where ldno=111;
update k_tour_headquarter.ldongcode set mapx = 127.1775555556 , mapy = 37.2411111111 where ldno=112;
update k_tour_headquarter.ldongcode set mapx = 127.2019722222 , mapy = 37.2329444444 where ldno=113;
update k_tour_headquarter.ldongcode set mapx = 127.1158888889 , mapy = 37.2757222222 where ldno=114;
update k_tour_headquarter.ldongcode set mapx = 127.0981666667 , mapy = 37.3208333333 where ldno=115;
update k_tour_headquarter.ldongcode set mapx = 126.7800555556 , mapy = 37.7594166667 where ldno=116;
update k_tour_headquarter.ldongcode set mapx = 127.4350000000 , mapy = 37.2721388889 where ldno=117;
update k_tour_headquarter.ldongcode set mapx = 127.2797222222 , mapy = 37.0077500000 where ldno=118;
update k_tour_headquarter.ldongcode set mapx = 126.7158333333 , mapy = 37.6151666667 where ldno=119;
update k_tour_headquarter.ldongcode set mapx = 126.8311666667 , mapy = 37.1990000000 where ldno=120;
update k_tour_headquarter.ldongcode set mapx = 127.2552222222 , mapy = 37.4293611111 where ldno=121;
update k_tour_headquarter.ldongcode set mapx = 127.0458888889 , mapy = 37.7852777778 where ldno=122;
update k_tour_headquarter.ldongcode set mapx = 127.2001111111 , mapy = 37.8948333333 where ldno=123;
update k_tour_headquarter.ldongcode set mapx = 127.6371666667 , mapy = 37.2979444444 where ldno=124;
update k_tour_headquarter.ldongcode set mapx = 127.0752777778 , mapy = 38.0962777778 where ldno=125;
update k_tour_headquarter.ldongcode set mapx = 127.5097222222 , mapy = 37.8312777778 where ldno=126;
update k_tour_headquarter.ldongcode set mapx = 127.4874444444 , mapy = 37.4912777778 where ldno=127;
update k_tour_headquarter.ldongcode set mapx = 127.4890000000 , mapy = 36.6424166667 where ldno=128;
update k_tour_headquarter.ldongcode set mapx = 127.4906944444 , mapy = 36.6379722222 where ldno=129;
update k_tour_headquarter.ldongcode set mapx = 127.4379166667 , mapy = 36.6387777778 where ldno=130;
update k_tour_headquarter.ldongcode set mapx = 127.4276666667 , mapy = 36.6359166667 where ldno=131;
update k_tour_headquarter.ldongcode set mapx = 127.4865555556 , mapy = 36.7104166667 where ldno=132;
update k_tour_headquarter.ldongcode set mapx = 127.9261388889 , mapy = 36.9910277778 where ldno=133;
update k_tour_headquarter.ldongcode set mapx = 128.1909166667 , mapy = 37.1325000000 where ldno=134;
update k_tour_headquarter.ldongcode set mapx = 127.7293888889 , mapy = 36.4894444444 where ldno=135;
update k_tour_headquarter.ldongcode set mapx = 127.5718333333 , mapy = 36.3006388889 where ldno=136;
update k_tour_headquarter.ldongcode set mapx = 127.7836666667 , mapy = 36.1751666667 where ldno=137;
update k_tour_headquarter.ldongcode set mapx = 127.5821944444 , mapy = 36.7849444444 where ldno=138;
update k_tour_headquarter.ldongcode set mapx = 127.4362222222 , mapy = 36.8551111111 where ldno=139;
update k_tour_headquarter.ldongcode set mapx = 127.7871388889 , mapy = 36.8156111111 where ldno=140;
update k_tour_headquarter.ldongcode set mapx = 127.6922222222 , mapy = 36.9404166667 where ldno=141;
update k_tour_headquarter.ldongcode set mapx = 128.3658888889 , mapy = 36.9844444444 where ldno=142;
update k_tour_headquarter.ldongcode set mapx = 127.1139722222 , mapy = 36.8150833333 where ldno=143;
update k_tour_headquarter.ldongcode set mapx = 127.1528888889 , mapy = 36.7929444444 where ldno=144;
update k_tour_headquarter.ldongcode set mapx = 127.1171944444 , mapy = 36.8272777778 where ldno=145;
update k_tour_headquarter.ldongcode set mapx = 127.1192222222 , mapy = 36.4461388889 where ldno=146;
update k_tour_headquarter.ldongcode set mapx = 126.6128888889 , mapy = 36.3331944444 where ldno=147;
update k_tour_headquarter.ldongcode set mapx = 127.0017777778 , mapy = 36.7895555556 where ldno=148;
update k_tour_headquarter.ldongcode set mapx = 126.4502222222 , mapy = 36.7845277778 where ldno=149;
update k_tour_headquarter.ldongcode set mapx = 127.0987777778 , mapy = 36.1869166667 where ldno=150;
update k_tour_headquarter.ldongcode set mapx = 127.2481388889 , mapy = 36.2742222222 where ldno=151;
update k_tour_headquarter.ldongcode set mapx = 126.6475000000 , mapy = 36.8930555556 where ldno=152;
update k_tour_headquarter.ldongcode set mapx = 127.4882222222 , mapy = 36.1086944444 where ldno=153;
update k_tour_headquarter.ldongcode set mapx = 126.9099444444 , mapy = 36.2755555556 where ldno=154;
update k_tour_headquarter.ldongcode set mapx = 126.6917222222 , mapy = 36.0804166667 where ldno=155;
update k_tour_headquarter.ldongcode set mapx = 126.8022777778 , mapy = 36.4592222222 where ldno=156;
update k_tour_headquarter.ldongcode set mapx = 126.6649444444 , mapy = 36.6010833333 where ldno=157;
update k_tour_headquarter.ldongcode set mapx = 126.8502777778 , mapy = 36.6827777778 where ldno=158;
update k_tour_headquarter.ldongcode set mapx = 126.2978888889 , mapy = 36.7454444444 where ldno=159;
update k_tour_headquarter.ldongcode set mapx = 126.3922777778 , mapy = 34.8118055556 where ldno=160;
update k_tour_headquarter.ldongcode set mapx = 127.6622222222 , mapy = 34.7604166667 where ldno=161;
update k_tour_headquarter.ldongcode set mapx = 127.4875555556 , mapy = 34.9506388889 where ldno=162;
update k_tour_headquarter.ldongcode set mapx = 126.7106944444 , mapy = 35.0160833333 where ldno=163;
update k_tour_headquarter.ldongcode set mapx = 127.6958333333 , mapy = 34.9404166667 where ldno=164;
update k_tour_headquarter.ldongcode set mapx = 126.9882222222 , mapy = 35.3208888889 where ldno=165;
update k_tour_headquarter.ldongcode set mapx = 127.2918333333 , mapy = 35.2819444444 where ldno=166;
update k_tour_headquarter.ldongcode set mapx = 127.4635555556 , mapy = 35.2020555556 where ldno=167;
update k_tour_headquarter.ldongcode set mapx = 127.2753888889 , mapy = 34.6112777778 where ldno=168;
update k_tour_headquarter.ldongcode set mapx = 127.0800000000 , mapy = 34.7713055556 where ldno=169;
update k_tour_headquarter.ldongcode set mapx = 126.9862777778 , mapy = 35.0641666667 where ldno=170;
update k_tour_headquarter.ldongcode set mapx = 126.9069166667 , mapy = 34.6813611111 where ldno=171;
update k_tour_headquarter.ldongcode set mapx = 126.7671388889 , mapy = 34.6420000000 where ldno=172;
update k_tour_headquarter.ldongcode set mapx = 126.5986666667 , mapy = 34.5732222222 where ldno=173;
update k_tour_headquarter.ldongcode set mapx = 126.6966666667 , mapy = 34.8003333333 where ldno=174;
update k_tour_headquarter.ldongcode set mapx = 126.4816666667 , mapy = 34.9906388889 where ldno=175;
update k_tour_headquarter.ldongcode set mapx = 126.5158333333 , mapy = 35.0660000000 where ldno=176;
update k_tour_headquarter.ldongcode set mapx = 126.5119444444 , mapy = 35.2772777778 where ldno=177;
update k_tour_headquarter.ldongcode set mapx = 126.7843611111 , mapy = 35.3013611111 where ldno=178;
update k_tour_headquarter.ldongcode set mapx = 126.7553055556 , mapy = 34.3111111111 where ldno=179;
update k_tour_headquarter.ldongcode set mapx = 126.2637777778 , mapy = 34.4867222222 where ldno=180;
update k_tour_headquarter.ldongcode set mapx = 126.1062222222 , mapy = 34.8260555556 where ldno=181;
update k_tour_headquarter.ldongcode set mapx = 129.3434722222 , mapy = 36.0190277778 where ldno=182;
update k_tour_headquarter.ldongcode set mapx = 129.3434722222 , mapy = 36.0190277778 where ldno=183;
update k_tour_headquarter.ldongcode set mapx = 129.3651666667 , mapy = 36.0567222222 where ldno=184;
update k_tour_headquarter.ldongcode set mapx = 129.2246666667 , mapy = 35.8561944444 where ldno=185;
update k_tour_headquarter.ldongcode set mapx = 128.1136666667 , mapy = 36.1395555556 where ldno=186;
update k_tour_headquarter.ldongcode set mapx = 128.7293888889 , mapy = 36.5683888889 where ldno=187;
update k_tour_headquarter.ldongcode set mapx = 128.3445833333 , mapy = 36.1195000000 where ldno=188;
update k_tour_headquarter.ldongcode set mapx = 128.6239166667 , mapy = 36.8056944444 where ldno=189;
update k_tour_headquarter.ldongcode set mapx = 128.9386666667 , mapy = 35.9731666667 where ldno=190;
update k_tour_headquarter.ldongcode set mapx = 128.1590833333 , mapy = 36.4108888889 where ldno=191;
update k_tour_headquarter.ldongcode set mapx = 128.1869444444 , mapy = 36.5864166667 where ldno=192;
update k_tour_headquarter.ldongcode set mapx = 128.7413888889 , mapy = 35.8250000000 where ldno=193;
update k_tour_headquarter.ldongcode set mapx = 128.6968888889 , mapy = 36.3525555556 where ldno=194;
update k_tour_headquarter.ldongcode set mapx = 129.0566666667 , mapy = 36.4366666667 where ldno=195;
update k_tour_headquarter.ldongcode set mapx = 129.1125000000 , mapy = 36.6666666667 where ldno=196;
update k_tour_headquarter.ldongcode set mapx = 129.3657777778 , mapy = 36.4149166667 where ldno=197;
update k_tour_headquarter.ldongcode set mapx = 128.7352777778 , mapy = 35.6472222222 where ldno=198;
update k_tour_headquarter.ldongcode set mapx = 128.2625833333 , mapy = 35.7276388889 where ldno=199;
update k_tour_headquarter.ldongcode set mapx = 128.2824722222 , mapy = 35.9191666667 where ldno=200;
update k_tour_headquarter.ldongcode set mapx = 128.4019444444 , mapy = 35.9945833333 where ldno=201;
update k_tour_headquarter.ldongcode set mapx = 128.4527777778 , mapy = 36.6566666667 where ldno=202;
update k_tour_headquarter.ldongcode set mapx = 128.7326388889 , mapy = 36.8930555556 where ldno=203;
update k_tour_headquarter.ldongcode set mapx = 129.4005277778 , mapy = 36.9930555556 where ldno=204;
update k_tour_headquarter.ldongcode set mapx = 130.9058888889 , mapy = 37.4845277778 where ldno=205;
update k_tour_headquarter.ldongcode set mapx = 128.6813611111 , mapy = 35.2279166667 where ldno=206;
update k_tour_headquarter.ldongcode set mapx = 128.6934166667 , mapy = 35.2536388889 where ldno=207;
update k_tour_headquarter.ldongcode set mapx = 128.6807777778 , mapy = 35.2260833333 where ldno=208;
update k_tour_headquarter.ldongcode set mapx = 128.5700555556 , mapy = 35.1334166667 where ldno=209;
update k_tour_headquarter.ldongcode set mapx = 128.5802777778 , mapy = 35.2108611111 where ldno=210;
update k_tour_headquarter.ldongcode set mapx = 128.7096944444 , mapy = 35.1335555556 where ldno=211;
update k_tour_headquarter.ldongcode set mapx = 128.1076666667 , mapy = 35.1798611111 where ldno=212;
update k_tour_headquarter.ldongcode set mapx = 128.4331666667 , mapy = 34.8543333333 where ldno=213;
update k_tour_headquarter.ldongcode set mapx = 128.0644444444 , mapy = 35.0035833333 where ldno=214;
update k_tour_headquarter.ldongcode set mapx = 128.8893055556 , mapy = 35.2284722222 where ldno=215;
update k_tour_headquarter.ldongcode set mapx = 128.7464722222 , mapy = 35.5036388889 where ldno=216;
update k_tour_headquarter.ldongcode set mapx = 128.6216666667 , mapy = 34.8805833333 where ldno=217;
update k_tour_headquarter.ldongcode set mapx = 129.0372777778 , mapy = 35.3350833333 where ldno=218;
update k_tour_headquarter.ldongcode set mapx = 128.2613333333 , mapy = 35.3222222222 where ldno=219;
update k_tour_headquarter.ldongcode set mapx = 128.4060833333 , mapy = 35.2726666667 where ldno=220;
update k_tour_headquarter.ldongcode set mapx = 128.4921666667 , mapy = 35.5448333333 where ldno=221;
update k_tour_headquarter.ldongcode set mapx = 128.3228333333 , mapy = 34.9731944444 where ldno=222;
update k_tour_headquarter.ldongcode set mapx = 127.8923333333 , mapy = 34.8377222222 where ldno=223;
update k_tour_headquarter.ldongcode set mapx = 127.7514722222 , mapy = 35.0673888889 where ldno=224;
update k_tour_headquarter.ldongcode set mapx = 127.8735000000 , mapy = 35.4154166667 where ldno=225;
update k_tour_headquarter.ldongcode set mapx = 127.7254444444 , mapy = 35.5203611111 where ldno=226;
update k_tour_headquarter.ldongcode set mapx = 127.9092777778 , mapy = 35.6866666667 where ldno=227;
update k_tour_headquarter.ldongcode set mapx = 128.1657777778 , mapy = 35.5663888889 where ldno=228;
update k_tour_headquarter.ldongcode set mapx = 126.5311666667 , mapy = 33.4995555556 where ldno=229;
update k_tour_headquarter.ldongcode set mapx = 126.5601111111 , mapy = 33.2538055556 where ldno=230;
update k_tour_headquarter.ldongcode set mapx = 127.7298333333 , mapy = 37.8813888889 where ldno=231;
update k_tour_headquarter.ldongcode set mapx = 127.9201944444 , mapy = 37.3421666667 where ldno=232;
update k_tour_headquarter.ldongcode set mapx = 128.8760555556 , mapy = 37.7516111111 where ldno=233;
update k_tour_headquarter.ldongcode set mapx = 129.1143333333 , mapy = 37.5245833333 where ldno=234;
update k_tour_headquarter.ldongcode set mapx = 128.9856944444 , mapy = 37.1640000000 where ldno=235;
update k_tour_headquarter.ldongcode set mapx = 128.5916388889 , mapy = 38.2070555556 where ldno=236;
update k_tour_headquarter.ldongcode set mapx = 129.1651666667 , mapy = 37.4500833333 where ldno=237;
update k_tour_headquarter.ldongcode set mapx = 127.8883888889 , mapy = 37.6974166667 where ldno=238;
update k_tour_headquarter.ldongcode set mapx = 127.9851666667 , mapy = 37.4826944444 where ldno=239;
update k_tour_headquarter.ldongcode set mapx = 128.4614166667 , mapy = 37.1835555556 where ldno=240;
update k_tour_headquarter.ldongcode set mapx = 128.3904444444 , mapy = 37.3703611111 where ldno=241;
update k_tour_headquarter.ldongcode set mapx = 128.6607222222 , mapy = 37.3808333333 where ldno=242;
update k_tour_headquarter.ldongcode set mapx = 127.3136111111 , mapy = 38.1467222222 where ldno=243;
update k_tour_headquarter.ldongcode set mapx = 127.7083333333 , mapy = 38.1062777778 where ldno=244;
update k_tour_headquarter.ldongcode set mapx = 127.9898888889 , mapy = 38.1098611111 where ldno=245;
update k_tour_headquarter.ldongcode set mapx = 128.1705833333 , mapy = 38.0695000000 where ldno=246;
update k_tour_headquarter.ldongcode set mapx = 128.4682222222 , mapy = 38.3806388889 where ldno=247;
update k_tour_headquarter.ldongcode set mapx = 128.6191944444 , mapy = 38.0755555556 where ldno=248;
update k_tour_headquarter.ldongcode set mapx = 127.1479444444 , mapy = 35.8242222222 where ldno=249;
update k_tour_headquarter.ldongcode set mapx = 127.1440833333 , mapy = 35.8166666667 where ldno=250;
update k_tour_headquarter.ldongcode set mapx = 127.1367777778 , mapy = 35.8495000000 where ldno=251;
update k_tour_headquarter.ldongcode set mapx = 126.7369444444 , mapy = 35.9676388889 where ldno=252;
update k_tour_headquarter.ldongcode set mapx = 126.9577777778 , mapy = 35.9483888889 where ldno=253;
update k_tour_headquarter.ldongcode set mapx = 126.8559166667 , mapy = 35.5697222222 where ldno=254;
update k_tour_headquarter.ldongcode set mapx = 127.3903333333 , mapy = 35.4163333333 where ldno=255;
update k_tour_headquarter.ldongcode set mapx = 126.8809166667 , mapy = 35.8035555556 where ldno=256;
update k_tour_headquarter.ldongcode set mapx = 127.1637777778 , mapy = 35.9039444444 where ldno=257;
update k_tour_headquarter.ldongcode set mapx = 127.4247777778 , mapy = 35.7916666667 where ldno=258;
update k_tour_headquarter.ldongcode set mapx = 127.6609444444 , mapy = 36.0070277778 where ldno=259;
update k_tour_headquarter.ldongcode set mapx = 127.5215833333 , mapy = 35.6476388889 where ldno=260;
update k_tour_headquarter.ldongcode set mapx = 127.2862777778 , mapy = 35.6175555556 where ldno=261;
update k_tour_headquarter.ldongcode set mapx = 127.1375000000 , mapy = 35.3742777778 where ldno=262;
update k_tour_headquarter.ldongcode set mapx = 126.7020277778 , mapy = 35.4348611111 where ldno=263;
update k_tour_headquarter.ldongcode set mapx = 126.7333611111 , mapy = 35.7313888889 where ldno=264;
-- [3] 관광정보 동기화 목록 동기화 =========================================================
INSERT INTO k_tour_headquarter.placeinfo (ctNo, ldNo, ccNo, contentid, title, showflag, firstimage, firstimage2, addr1, addr2, zipcode, homepage, tel, telname, overview)
	SELECT kct.ctNo, ldc.ldNo, kcc.ccNo, tabsl2.contentid, tabsl2.title, tabsl2.showflag, tabsl2.firstimage, tabsl2.firstimage2, tabsl2.addr1, tabsl2.addr2, tabsl2.zipcode, tdc2.homepage, tabsl2.tel, tdc2.telname, tdc2.overview
		FROM tour_api_origin.areabasedsynclist2 tabsl2
		LEFT OUTER JOIN tour_api_origin.detailcommon2 tdc2
		USING (contentid)
		JOIN k_tour_headquarter.contenttype kct
		ON tabsl2.contenttypeid = kct.contenttypeid
		LEFT OUTER JOIN k_tour_headquarter.ldongcode ldc
		ON tabsl2.lDongRegnCd = ldc.lDongRegnCd
		AND tabsl2.lDongSignguCd = ldc.lDongSignguCd
		LEFT OUTER JOIN k_tour_headquarter.categorycode kcc
		ON kcc.lclsSystm3Cd = UPPER(TRIM(REPLACE(REPLACE(REPLACE(REPLACE(tabsl2.lclsSystm3, CHAR(13), ''), CHAR(10), ''), CHAR(9), ''), ' ', '')));
    
-- [4] 지도마커GPS 동기화 =========================================================
INSERT INTO k_tour_headquarter.markersgps (pNo, mapx, mapy)
	SELECT kpi.pNo, tabsl2.mapx, tabsl2.mapy
		FROM k_tour_headquarter.placeinfo kpi
		LEFT OUTER JOIN tour_api_origin.areabasedsynclist2 tabsl2
		USING (contentid)
		WHERE tabsl2.mapy < 1000;
-- [5] Place상세이미지 동기화 =========================================================
INSERT INTO k_tour_headquarter.placeimagedetail (pNo, serialnum, originimgurl, smallimageurl, imgname)
	SELECT kpi.pNo, tdi.serialnum, tdi.originimgurl, tdi.smallimageurl, tdi.imgname
		FROM k_tour_headquarter.placeinfo kpi
		JOIN tour_api_origin.detailimage2 tdi
		USING (contentid);
-- [6] 반려동물 동반여행정보 동기화 =========================================================
INSERT INTO k_tour_headquarter.detailpettour (pNo, relaAcdntRiskMtr, acmpyTypeCd, relaPosesFclty, relaFrnshPrdlst, etcAcmpyInfo, relaPurcPrdlst, acmpyPsblCpam, relaRntlPrdlst, acmpyNeedMtr)
SELECT kpi.pNo, tdpt.relaAcdntRiskMtr, tdpt.acmpyTypeCd, tdpt.relaPosesFclty, tdpt.relaFrnshPrdlst,
	tdpt.etcAcmpyInfo, tdpt.relaPurcPrdlst, tdpt.acmpyPsblCpam, tdpt.relaRntlPrdlst, tdpt.acmpyNeedMtr
	FROM k_tour_headquarter.placeinfo kpi
	JOIN tour_api_origin.detailpettour2 tdpt
	USING (contentid);
-- [7] 관광지 상세정보 동기화 =========================================================
INSERT INTO k_tour_headquarter.tourintro
		(pNo, accomcount, chkbabycarriage, chkcreditcard, chkpet, expagerange, expguide,
		 heritage1, heritage2, heritage3, infocenter, opendate, parking, restdate, useseason, usetime)
	SELECT kpi.pNo, tdi12.accomcount, tdi12.chkbabycarriage, tdi12.chkcreditcard, tdi12.chkpet, tdi12.expagerange, tdi12.expguide,
		   tdi12.heritage1, tdi12.heritage2, tdi12.heritage3, tdi12.infocenter, tdi12.opendate, tdi12.parking, tdi12.restdate, tdi12.useseason, tdi12.usetime
		FROM k_tour_headquarter.placeinfo kpi
		JOIN tour_api_origin.detailintro2_12 tdi12
		USING (contentid);
-- [8] 축제행사공여 상세정보 동기화 =========================================================
INSERT INTO k_tour_headquarter.festivalIntro
		(pNo, eventstartdate, eventenddate, progresstype, festivaltype, agelimit, bookingplace, discountinfofestival, eventhomepage, eventplace,
		 festivalgrade, placeinfo, playtime, program, spendtimefestival, sponsor1, sponsor1tel, sponsor2, sponsor2tel, subevent, usetimefestival)
	SELECT kpi.pNo, tsf.eventstartdate, tsf.eventenddate, tsf.progresstype, tsf.festivaltype, tdi15.agelimit, tdi15.bookingplace, tdi15.discountinfofestival, tdi15.eventhomepage, tdi15.eventplace,
		   tdi15.festivalgrade, tdi15.placeinfo, tdi15.playtime, tdi15.program, tdi15.spendtimefestival, tdi15.sponsor1, tdi15.sponsor1tel, tdi15.sponsor2, tdi15.sponsor2tel, tdi15.subevent, tdi15.usetimefestival
		FROM k_tour_headquarter.placeinfo kpi
		LEFT OUTER JOIN tour_api_origin.detailintro2_15 tdi15
		USING (contentid)
        JOIN tour_api_origin.searchfestival2 tsf
        USING (contentid);
-- [9] 음식점 상세정보 동기화 =========================================================
INSERT INTO k_tour_headquarter.restaurantintro
		(pNo, chkcreditcardfood, discountinfofood, firstmenu, infocenterfood, kidsfacility, lcnsno, opendatefood,
		 opentimefood, packing, parkingfood, reservationfood, restdatefood, scalefood, seat, smoking, treatmenu)
	SELECT kpi.pNo, tdi39.chkcreditcardfood, tdi39.discountinfofood, tdi39.firstmenu, tdi39.infocenterfood, tdi39.kidsfacility, tdi39.lcnsno, tdi39.opendatefood,
		   tdi39.opentimefood, tdi39.packing, tdi39.parkingfood, tdi39.reservationfood, tdi39.restdatefood, tdi39.scalefood, tdi39.seat, tdi39.smoking, tdi39.treatmenu
		FROM k_tour_headquarter.placeinfo kpi
		JOIN tour_api_origin.detailintro2_39 tdi39
		USING (contentid);
-- [10] Place 반복정보 동기화 =========================================================
INSERT INTO k_tour_headquarter.placeinforepeat(pNo, fldgubun, infoname, infotext, serialnum)
	SELECT kpi.pNo, tdi12.fldgubun, tdi12.infoname, tdi12.infotext, tdi12.serialnum
	FROM k_tour_headquarter.placeinfo kpi
	JOIN tour_api_origin.detailinfo2_12 tdi12
	USING (contentid)
UNION ALL
	SELECT kpi.pNo, tdi39.fldgubun, tdi39.infoname, tdi39.infotext, tdi39.serialnum
	FROM k_tour_headquarter.placeinfo kpi
	JOIN tour_api_origin.detailinfo2_39 tdi39
	USING (contentid)
UNION ALL
	SELECT kpi.pNo, tdi39.fldgubun, tdi39.infoname, tdi39.infotext, tdi39.serialnum
	FROM k_tour_headquarter.placeinfo kpi
	JOIN tour_api_origin.detailinfo2_39 tdi39
	USING (contentid);
-- ------------------------------------ 푸시 알람 (+배너) -------------------------------------------
INSERT INTO k_tour_headquarter.pushPopup
	(pNo, mgNo, ppTitle, ppContent, ppImg, ppUse, ppType, ppStart, ppEnd, ppIterated)
VALUES
-- 송지호 해수욕장 페스티벌
	('20543', 1, '송지호 해수욕장 페스티벌', '9월 6일(토) 송지호 해수욕장에서 휴스테이와 함께합니다! 초대가수: 센턴, 우즈',
	 "songjihoFestival.jpg", 1, 2, '2025-09-25 12:00:00', '2025-10-5 21:00:00', '12:00:00'),
-- 공방 스테이 박보검 사인회
	('30033', null, '공방 스테이 박보검 사인회', '9월 21일(일) 공방 스테이에서 배우 박보검 사인회가 열립니다! 선착순 100명!',
	 'gongbangStay.png', 2, 2, '2025-10-08 12:00:00', '2025-10-21 21:00:00', '18:00:00'),
-- 화암사 주차장 공사 안내
	('54311', 1, '화암사 주차장 공사 안내', '9월 20일(금)~10월 13일(일) 화암사 주차장 공사로 인해 사용이 불가합니다.',
	 'hwaamsa.jpg', 3, 1, '2025-10-25 12:00:00', '2025-11-13 12:00:00', '12:00:00');