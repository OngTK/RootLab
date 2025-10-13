DROP TABLE IF EXISTS Members;
CREATE TABLE Members (
	mNo BINARY(16) DEFAULT (UUID_TO_BIN(UUID(), 1)) PRIMARY KEY,  -- 회원번호 (UUID 이진 저장)
    mId VARCHAR(60) NOT NULL UNIQUE,                              -- 아이디
    mPwd VARCHAR(60) NOT NULL,                                    -- 비밀번호
    mNick VARCHAR(60) NOT NULL UNIQUE,                            -- 닉네임
    mGender ENUM('남', '여') NOT NULL,                             -- 성별
    mPhone VARCHAR(16) NOT NULL UNIQUE,                           -- 전화번호
    mEmail VARCHAR(255) NOT NULL UNIQUE,                          -- 이메일
    mAdd1 VARCHAR(255) NOT NULL,                                  -- 도로명 주소
    mAdd2 VARCHAR(255),                                           -- 상세 주소
    mCreatedAt DATETIME DEFAULT NOW(),                            -- 가입일
    mUpdatedAt DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP, -- 수정일
    mDeletedAt DATETIME DEFAULT NULL,                             -- 탈퇴일
    mTermsAgreed BOOLEAN NOT NULL,                                -- 이용약관 동의
    mLocationAgreed BOOLEAN NOT NULL,                             -- 위치정보 동의
    mPushAgreed BOOLEAN NOT NULL,                                 -- 푸시알림 동의
    mAuth TINYINT NOT NULL DEFAULT 2                              -- 권한 (1=시스템관리자, 2=지자체관리자)      						
    );
    
INSERT INTO Members 
    (mNo, mId, mPwd, mNick, mGender, mPhone, mEmail, mAdd1, mAdd2,
     mCreatedAt, mUpdatedAt, mDeletedAt, mTermsAgreed, mLocationAgreed, mPushAgreed, mAuth)
VALUES
-- 1. 시스템 관리자
	(UUID_TO_BIN('01889895-c9e8-466d-a19e-e5e347895e54', 1), 'admin', 'admin', '시스템 관리자', '여', '032-111-2222', 'root.kjs82@gmail.com', 
    '인천광역시 부평구 경원대로 1366', '', '2025-10-01 10:00:00', NULL, NULL, TRUE, TRUE, TRUE, 1 ),
-- 2. 지자체 관리자
	(UUID_TO_BIN('01889896-1a2b-487e-89f0-123456789abc', 1), 'goseong', 'goseong', '지자체 관리자', '남', '033-680-3114', 'goseong@tjoeun.com',
    '강원특별자치도 고성군 간성읍 고성중앙길 9', '', '2025-10-01 10:00:00', NULL, NULL, TRUE, TRUE, TRUE, 2);
    
---------------------------------------------------------------------------

DROP TABLE IF EXISTS SiteInfo;
CREATE TABLE SiteInfo (
	siNo INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,   -- 사이트번호
    mNo BINARY(16) NULL,                            -- 회원번호 (FK)
    siName VARCHAR(50) NOT NULL UNIQUE,             -- 사이트명
    siDomain VARCHAR(100) NOT NULL UNIQUE,          -- 도메인
    siIntro VARCHAR(255),                           -- 사이트소개글
    siLogo VARCHAR(255),                            -- 사이트로고이미지
    siFavicon VARCHAR(255),                         -- 파비콘이미지
    siMarker VARCHAR(255),                          -- 마커이미지
    siTel VARCHAR(20),                              -- 대표전화
    siPrivacyOfficer VARCHAR(30),                   -- 개인정보처리책임자
    siEmail VARCHAR(100),                           -- 대표이메일
    siKeywords VARCHAR(255),                        -- 사이트 검색키워드
    siIsPublic TINYINT(1) NOT NULL DEFAULT 0,       -- 사이트 공개여부 (0/1)
    siCreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP, -- 생성일시
    siUpdatedAt DATETIME DEFAULT NULL 
                ON UPDATE CURRENT_TIMESTAMP,        -- 수정일시
    siMemo LONGTEXT,                                -- 메모

    CONSTRAINT fk_siteinfo_member
      FOREIGN KEY (mNo) REFERENCES Members(mNo)
      ON UPDATE CASCADE
      ON DELETE SET NULL
);

INSERT INTO SiteInfo
    (siNo, mNo, siName, siDomain, siIntro, siLogo, siFavicon, siMarker, siTel, siPrivacyOfficer, siEmail, siKeywords, siIsPublic, siCreatedAt, 
    siUpdatedAt, siMemo)
VALUES
	(UUID_TO_BIN('01889896-1a2b-487e-89f0-123456789abc', 1), '고성군 늘려라길', 'goseong.rootlab.kr',
    'DMZ와 맞닿은 침복단의 청정 자연, 에메랄드빛 동해 바다와 금강산의 수려한 산세가 어우러진 평화와 힐링의 땅입니다.', 'goseongLogo.png', 'goseongFavicon.png',
    'goseongMarker.jpg', '033-680-3114', '이상근', 'goseong@tjoeun.com', '해수욕장, 전망대, 강원도, 동해, 바다, 여행, 명소', 1, '2025-10-01 10:00:00', NULL, NULL);

-- -------------------------------------------------------------------------------

DROP TABLE IF EXISTS contentType;
CREATE TABLE contentType (
    ctNo TINYINT AUTO_INCREMENT PRIMARY KEY,        -- 콘텐츠타입번호
    contentType VARCHAR(5) NOT NULL,                -- 콘텐츠타입
    contentTypeName VARCHAR(30) NOT NULL,           -- 타입명
    defaultMarker VARCHAR(255) NOT NULL,            -- 기본마커이미지
    typeIdCreated DATETIME DEFAULT NOW(),           -- 등록일
    typeIdUpdated DATETIME DEFAULT NULL 
                 ON UPDATE CURRENT_TIMESTAMP,       -- 수정일
    memo TEXT                                       -- 비고
);

INSERT INTO contentType 
    (contentType, contentTypeName, defaultMarker, typeIdCreated)
VALUES
    ('12', '관광지', 'tourSpot.png', '2025-10-01 10:00:00'),
    ('14', '문화시설', 'culturalFacilities.png', '2025-10-01 10:00:00'),
    ('15', '행사/공연/축제', 'festival.png', '2025-10-01 10:00:00'),
    ('25', '여행코스', 'travelCourse.png', '2025-10-01 10:00:00'),
    ('28', '레포츠', 'leports.png', '2025-10-01 10:00:00'),
    ('32', '숙박', 'stay.png', '2025-10-01 10:00:00'),
    ('38', '쇼핑', 'shopping.png', '2025-10-01 10:00:00'),
    ('39', '음식점', 'food.png', '2025-10-01 10:00:00');
    
-- -------------------------------------------------------------------------------

DROP TABLE IF EXISTS IdongCode;
CREATE TABLE IdongCode (
	IdNo SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    rnum SMALLINT UNSIGNED NOT NULL,
    lDongRegnCd CHAR(5) NOT NULL, 
    lDongRegnNm VARCHAR(20) NOT NULL, 
    lDongSignguCd CHAR(5) NOT NULL, 
    lDongSignguNm VARCHAR(20) NOT NULL, 
    isActivate BOOLEAN DEFAULT FALSE, 
    latitude DECIMAL(8, 6) NOT NULL, 
    longitude DECIMAL(9, 6) NOT NULL, 
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT NULL
);

-- -------------------------------------------------------------------------------

DROP TABLE IF EXISTS categoryCode;
CREATE TABLE categoryCode (
	ccNo SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    rnum SMALLINT NOT NULL,
    lclsSystm1Cd CHAR(2) NOT NULL, 
    lclsSystm1Nm VARCHAR(15) NOT NULL, 
    lclsSystm2Cd CHAR(4) NOT NULL,
    lclsSystm2Nm VARCHAR(15) NOT NULL, 
    lclsSystm3Cd CHAR(8) NOT NULL,
    lclsSystm3Nm VARCHAR(15) NOT NULL,
    isActivate BOOLEAN DEFAULT TRUE, 
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT NULL
);

-- -------------------------------------------------------------------------------

DROP TABLE IF EXISTS placeInfo;
CREATE TABLE placeInfo (
	pNo INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    ctNo TINYINT NOT NULL,
    gpsNo SMALLINT,
    cd3No SMALLINT,
    isEditable BOOLEAN DEFAULT TRUE,
    contentid INT UNIQUE DEFAULT NULL,
    title VARCHAR(50) NOT NULL,
    showflag TINYINT DEFAULT 0,
    firstimage VARCHAR(255) DEFAULT NULL,
    firstimage2 VARCHAR(255) DEFAULT NULL,
    addr1 VARCHAR(255) NOT NULL,
    addr2 VARCHAR(100) DEFAULT NULL,
    zipcode VARCHAR(10) DEFAULT NULL,
    homepage VARCHAR(255) DEFAULT NULL,
    tel VARCHAR(10) DEFAULT NULL,
    telname VARCHAR(30) DEFAULT NULL,
    overview TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT NULL
);

-- -------------------------------------------------------------------------------

DROP TABLE IF EXISTS makersGPS;
CREATE TABLE makersGPS (
	mkNo INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    pNo INT NOT NULL,
    mkURL VARCHAR(255) DEFAULT NULL,
    mapx DECIMAL(13,10) DEFAULT NULL,
    mapy DECIMAL(13,10) DEFAULT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT NULL
);

-- -------------------------------------------------------------------------------

DROP TABLE IF EXISTS placeImageDetail;
CREATE TABLE placeImageDetail (
	pidNo INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    pNo INT NOT NULL,
    isEditable BOOLEAN DEFAULT TRUE,
    serialnum  VARCHAR(10) DEFAULT NULL,
    originimgurl  VARCHAR(255) DEFAULT NULL,
    smallimageurl  VARCHAR(255) DEFAULT NULL,
    imgname  VARCHAR(30) DEFAULT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT NULL
);

-- -------------------------------------------------------------------------------

DROP TABLE IF EXISTS detailPetTour;
CREATE TABLE detailPetTour (

	dptNo INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    pNo INT NOT NULL,
    relaAcdntRiskMtr VARCHAR(100) DEFAULT NULL,
    acmpyTypeCd VARCHAR(50) DEFAULT NULL,
    relaPosesFclty VARCHAR(255) DEFAULT NULL,
    relaFrnshPrdlst VARCHAR(255) DEFAULT NULL,
    etcAcmpyInfo VARCHAR(255) DEFAULT NULL,
    relaPurcPrdlst VARCHAR(255) DEFAULT NULL,
    acmpyPsblCpam VARCHAR(50) DEFAULT NULL,
    relaRntlPrdlst VARCHAR(255) DEFAULT NULL,
    acmpyNeedMtr VARCHAR(50) DEFAULT NULL,
    petTursmInfo VARCHAR(255) DEFAULT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT NULL
);

-- -------------------------------------------------------------------------------

DROP TABLE IF EXISTS tourIntro;
CREATE TABLE tourIntro (
	tNo INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    pNo INT NOT NULL,
    accomcount VARCHAR(255) DEFAULT NULL,
    chkbabycarriage VARCHAR(255) DEFAULT NULL,
    chkcreditcard VARCHAR(10) DEFAULT NULL,
    chkpet VARCHAR(10) DEFAULT NULL,
    expagerange VARCHAR(255) DEFAULT NULL,
    expguide VARCHAR(255) DEFAULT NULL,
	heritage1 VARCHAR(255) DEFAULT NULL,
    heritage2 VARCHAR(10),
    heritage3 VARCHAR(10),
    infocenter VARCHAR(255),
    opendate VARCHAR(255) DEFAULT NULL,
    parking VARCHAR(255) DEFAULT NULL,
    restdate VARCHAR(255) DEFAULT NULL,
    useseason VARCHAR(255) DEFAULT NULL,
    usetime VARCHAR(30) DEFAULT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT NULL
);

-- -------------------------------------------------------------------------------

DROP TABLE IF EXISTS festivalIntro;
CREATE TABLE festivalIntro (
	fiNo INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    pNo INT NOT NULL,
    eventstartdate VARCHAR(255) DEFAULT NULL,
    eventenddate VARCHAR(255) DEFAULT NULL,
    progresstype VARCHAR(10) DEFAULT NULL,
    festivaltype VARCHAR(10) DEFAULT NULL,
    agelimit VARCHAR(255) DEFAULT NULL,
    bookingplace VARCHAR(255) DEFAULT NULL,
    discountinfofestival VARCHAR(255) DEFAULT NULL,
    eventhomepage VARCHAR(255) DEFAULT NULL,
	eventplace VARCHAR(255) DEFAULT NULL,
    festivalgrade VARCHAR(255) DEFAULT NULL,
    placeinfo VARCHAR(255) DEFAULT NULL,
    playtime VARCHAR(100)DEFAULT NULL,
    program VARCHAR(255) DEFAULT NULL,
    spendtimefestival VARCHAR(255) DEFAULT NULL,
    sponsor1 VARCHAR(30) DEFAULT NULL,
    sponsor1tel VARCHAR(50) DEFAULT NULL,
    sponsor2 VARCHAR(100) DEFAULT NULL,
    sponsor2tel VARCHAR(50) DEFAULT NULL,
    subevent VARCHAR(255) DEFAULT NULL,
    usetimefestival VARCHAR(100) DEFAULT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT NULL
);

-- -------------------------------------------------------------------------------

DROP TABLE IF EXISTS restaurantIntro;
CREATE TABLE restaurantIntro (
	riNo INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    pNo INT NOT NULL,
    chkcreditcardfood VARCHAR(100),
    discountinfofood VARCHAR(255),
    firstmenu VARCHAR(100),
    infocenterfood VARCHAR(255),
    kidsfacility TINYINT UNSIGNED DEFAULT  0,
    lcnsno DECIMAL(11),
    opendatefood VARCHAR(100),
    opentimefood VARCHAR(255),
    packing VARCHAR(100),
    parkingfood VARCHAR(100),
    reservationfood VARCHAR(255),
    restdatefood VARCHAR(100),
    scalefood VARCHAR(100),
    seat VARCHAR(100),
    smoking VARCHAR(100),
    treatmenu VARCHAR(255),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT NULL
);

-- -------------------------------------------------------------------------------

DROP TABLE IF EXISTS placeInfoRepeat ;
CREATE TABLE placeInfoRepeat (
	pirNo INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    pNo INT NOT NULL UNIQUE,
    fldgubun TINYINT UNSIGNED,
    infoname VARCHAR(10),
    infotext TEXT,
    serialnum TINYINT UNSIGNED NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT NULL
);
