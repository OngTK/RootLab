-- --------------------------------- 회원  ------------------------------------------
INSERT INTO manager 
    (mgNo, mId, mPwd, mNick, mGender, mPhone, mEmail, mAdd1, mAdd2,
     CreatedAt, mTermsAgreed, mLocationAgreed, mPushAgreed, mAuth)
VALUES
-- 1. 시스템 관리자
	(UUID_TO_BIN('01889895-c9e8-466d-a19e-e5e347895e54', 1), 'admin', 'admin', '시스템 관리자', '여', '032-111-2222', 'root.kjs82@gmail.com', 
    '인천광역시 부평구 경원대로 1366', '', '2025-10-01 10:00:00', TRUE, TRUE, TRUE, 1 ),
-- 2. 지자체 관리자
	(UUID_TO_BIN('01889896-1a2b-487e-89f0-123456789abc', 1), 'goseong', 'goseong', '지자체 관리자', '남', '033-680-3114', 'goseong@tjoeun.com',
    '강원특별자치도 고성군 간성읍 고성중앙길 9', '', '2025-10-01 10:00:00', TRUE, TRUE, TRUE, 2);
    
    
-- --------------------------------- 사이트정보 ------------------------------------------
INSERT INTO SiteInfo
    (siNo, mgNo, siName, siDomain, siIntro, siLogo, siFavicon, siMarker, siTel, siPrivacyOfficer, siEmail, siKeywords, siIsPublic, siCreatedAt, 
    siMemo)
VALUES
	(UUID_TO_BIN('01889896-1a2b-487e-89f0-123456789abc', 1), '고성군 놀러가자!', 'goseong.rootlab.kr',
    'DMZ와 맞닿은 침복단의 청정 자연, 에메랄드빛 동해 바다와 금강산의 수려한 산세가 어우러진 평화와 힐링의 땅입니다.<이하 생략···>', 'goseongLogo.png', 'goseongFavicon.png',
    'goseongMarker.jpg', '033-680-3114', '이상근', 'goseong@tjoeun.com', '해수욕장, 전망대, 강원도, 동해, 바다, 여행, 명소', 1, '2025-10-01 10:00:00', '');
    

-- -------------------------------------- 콘텐츠타입 -----------------------------------------
INSERT INTO contentType 
    (contenttypeid, contentTypeName, defaultMarker, createdAt, updatedAt, memo)
VALUES
    ('12', '관광지', 'tourSpot.png', '2025-10-01 10:00:00' , '2025-10-01 10:00:00' ,''),
    ('14', '문화시설', 'culturalFacilities.png', '2025-10-01 10:00:00','2025-10-01 10:00:00' , ''),
    ('15', '행사/공연/축제', 'festival.png', '2025-10-01 10:00:00', '2025-10-01 10:00:00' ,''),
    ('25', '여행코스', 'travelCourse.png', '2025-10-01 10:00:00', '2025-10-01 10:00:00' ,''),
    ('28', '레포츠', 'leports.png', '2025-10-01 10:00:00', '2025-10-01 10:00:00' ,''),
    ('32', '숙박', 'stay.png', '2025-10-01 10:00:00', '2025-10-01 10:00:00' ,''),
    ('38', '쇼핑', 'shopping.png', '2025-10-01 10:00:00', '2025-10-01 10:00:00' ,''),
    ('39', '음식점', 'food.png', '2025-10-01 10:00:00', '2025-10-01 10:00:00' ,'');
    
-- ------------------------------------ 푸시 알람 (+배너) -------------------------------------------
INSERT INTO push
	(contentID_New, pbTitle, pbContent, pbImg, pbType, mNo, pbCreated, pbUpdadted, pbStart, pbEnd, pbIterated)
VALUES
-- 송지호 해수욕장 페스티벌
('127874',
 '송지호 해수욕장 페스티벌',
 '9월 6일(토) 송지호 해수욕장에서 휴스테이와 함께합니다! 초대가수: 센턴, 우즈',
 'songjihoFestival.jpg',
 '이벤트',
 UUID_TO_BIN('01889996-1a2b-487e-8910-123456789abc', 1),
 '2025-08-25 10:00:00',
 Null,
 '2025-09-05',
 '12:00:00'),
 
-- 공방 스테이 박보검 사인회
('3068031',
 '공방 스테이 박보검 사인회',
 '9월 21일(일) 공방 스테이에서 배우 박보검 사인회가 열립니다! 선착순 100명!',
 'gongbangStay.png',
 '이벤트',
 UUID_TO_BIN('01889996-1a2b-487e-8910-123456789abc', 1),
 '2025-09-08 10:00:00',
 '2025-09-08',
 '2025-09-21',
 '18:00:00'),
 
-- 화암사 주차장 공사 안내
('125752',
 '화암사 주차장 공사 안내',
 '9월 20일(금)~10월 13일(일) 화암사 주차장 공사로 인해 사용이 불가합니다.',
 'hwaamsa.jpg',
 '공지',
 UUID_TO_BIN('01889996-1a2b-487e-8910-123456789abc', 1),
 '2025-09-25 10:00:00',
 Null,
 '2025-09-25',
 '2025-10-13',
 '12:00:00');
