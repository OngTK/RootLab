DROP DATABASE IF EXISTS k_tour_headquarter;
CREATE DATABASE k_tour_headquarter;
USE k_tour_headquarter;
SET SQL_SAFE_UPDATES = 0;

DROP TABLE IF EXISTS placeInfoRepeat ;
DROP TABLE IF EXISTS restaurantIntro;
DROP TABLE IF EXISTS festivalIntro;
DROP TABLE IF EXISTS tourIntro;
DROP TABLE IF EXISTS detailPetTour;
DROP TABLE IF EXISTS placeImageDetail;
DROP TABLE IF EXISTS markersGPS;
DROP TABLE IF EXISTS placeInfo;
DROP TABLE IF EXISTS categoryCode;
DROP TABLE IF EXISTS ldongCode;
DROP TABLE IF EXISTS push;
DROP TABLE IF EXISTS contentType;
DROP TABLE IF EXISTS manager;
DROP TABLE IF EXISTS siteInfo;
-- ------------------------------------ 사이트정보 -------------------------------------------
CREATE TABLE siteInfo (
	siNo INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,   -- 사이트번호
    siName VARCHAR(50) NOT NULL UNIQUE,             -- 사이트명
    siDomain VARCHAR(100) NOT NULL UNIQUE,          -- 도메인명
    siIntro VARCHAR(255),                           -- 사이트소개글
    siLogo VARCHAR(255),                            -- 사이트로고이미지
    siFavicon VARCHAR(255),                         -- 파비콘이미지
    siMarker VARCHAR(255),                          -- 마커이미지
    siTel VARCHAR(20),                              -- 대표전화
    siPrivacyOfficer VARCHAR(30),                   -- 개인정보처리책임자
    siEmail VARCHAR(100),                           -- 대표이메일
    siKeywords VARCHAR(255),                        -- 사이트 검색키워드
    siIsPublic TINYINT NOT NULL DEFAULT 0,       	-- 사이트 공개여부 (0/1)
    createdAt  DATETIME DEFAULT CURRENT_TIMESTAMP, 	-- 생성일시
    updatedAt  DATETIME DEFAULT NULL 				-- 수정일시
                ON UPDATE CURRENT_TIMESTAMP,        
    siMemo LONGTEXT                                 -- 메모
);

-- ------------------------------------ 관리자정보 -------------------------------------------
CREATE TABLE manager (
	mgNo BINARY(16) DEFAULT (UUID_TO_BIN(UUID(), 1)) PRIMARY KEY, 	-- 관리자No
    siNo INT UNSIGNED,												-- 사이트번호(FK)
    mId VARCHAR(60) NOT NULL UNIQUE,                              	-- 아이디
    mPwd VARCHAR(60) NOT NULL,                                    	-- 패스워드
    mNick VARCHAR(60) NOT NULL UNIQUE,                            	-- 닉네임
    mGender ENUM('남', '여'),                             		  	-- 성별
    mPhone VARCHAR(16) NOT NULL UNIQUE,                           	-- 전화번호
    mEmail VARCHAR(255) NOT NULL UNIQUE,                          	-- 이메일
    mAdd1 VARCHAR(255) NOT NULL,                                  	-- 도로명 주소
    mAdd2 VARCHAR(255),                                           	-- 상세 주소
    createdAt DATETIME DEFAULT NOW(),                             	-- 가입일
    updatedAt DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,	-- 수정일
    deletedAt DATETIME DEFAULT NULL,                             	-- 탈퇴일
    mTermsAgreed BOOLEAN NOT NULL,                                	-- 이용약관 동의
    mLocationAgreed BOOLEAN NOT NULL,                             	-- 위치정보 동의
    mPushAgreed BOOLEAN NOT NULL,                                 	-- 푸시알림 동의
    memo TEXT,                                       				-- 비고
    mAuth TINYINT NOT NULL DEFAULT 2,                              	-- 권한 (1=시스템관리자, 2=지자체관리자)
    
	CONSTRAINT
      FOREIGN KEY (siNo) REFERENCES siteInfo(siNo)
      ON UPDATE CASCADE
      ON DELETE SET NULL
);

-- ------------------------------------ 콘텐츠타입 -------------------------------------------
CREATE TABLE contentType (
    ctNo TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,       -- 콘텐츠타입번호
    contenttypeid VARCHAR(5) NOT NULL,                		-- 콘텐츠타입
    contentTypeName VARCHAR(30) NOT NULL,           		-- 타입명
    defaultMarker VARCHAR(255) NOT NULL,           			-- 기본마커이미지
    createdAt DATETIME DEFAULT NOW(),           			-- 등록일
    updatedAt DATETIME DEFAULT NULL							-- 수정일
                 ON UPDATE CURRENT_TIMESTAMP,      			
    memo TEXT                                       		-- 비고
);

-- ------------------------------------ 푸시 알람 (+배너) -------------------------------------------
CREATE TABLE push (
	pbNo INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,		-- 푸쉬No
    contentID_New VARCHAR(15) NOT NULL,					-- 콘텐츠ID_자체PK
    pbTitle VARCHAR(150) NOT NULL,						-- 제목
    pbContent VARCHAR(255),								-- 내용
    pbImg VARCHAR(255),									-- 이미지
    pbType enum("공지","이벤트") NOT NULL,					-- 구분
    mNo BINARY(16) NOT NULL,							-- 작성자
    createdAt DATETIME DEFAULT NOW(),					-- 작성일
    updatedAt DATETIME DEFAULT NULL						-- 수정일
			ON UPDATE CURRENT_TIMESTAMP,
	pbStart DATE NOT NULL,								-- 노출시작일
    pbEnd DATE NOT NULL,								-- 노출종료일
    pbIterated TIME NOT NULL							-- 푸시알람 시간(9~20시 중 1시간 단위)
);

-- ------------------------------------ 법정동코드 -------------------------------------------
CREATE TABLE ldongCode (
	ldNo SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,		-- 법정동코드번호
    rnum SMALLINT UNSIGNED NOT NULL,						-- 일련번호
    lDongRegnCd CHAR(5) NOT NULL, 							-- 시도코드
    lDongRegnNm VARCHAR(20) NOT NULL, 						-- 시도명
    lDongSignguCd CHAR(5) NOT NULL, 						-- 시군구코드
    lDongSignguNm VARCHAR(20) NOT NULL, 					-- 시군구명
    isActivate BOOLEAN DEFAULT FALSE, 						-- 활성화여부
    mapy DECIMAL(13,10) NOT NULL, 							-- 위도
    mapx DECIMAL(13,10) NOT NULL, 							-- 경도
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,			-- 등록일
    updatedAt DATETIME DEFAULT NULL							-- 수정일
                 ON UPDATE CURRENT_TIMESTAMP				
);

-- ------------------------------------ 분류체계코드 -------------------------------------------
CREATE TABLE categoryCode (
	ccNo SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,			-- 분류체계번호
    rnum SMALLINT NOT NULL,										-- 일련번호
    lclsSystm1Cd CHAR(3) NOT NULL, 								-- 대분류코드
    lclsSystm1Nm VARCHAR(15) NOT NULL, 							-- 대분류명
    lclsSystm2Cd CHAR(5) NOT NULL,								-- 중분류코드
    lclsSystm2Nm VARCHAR(30) NOT NULL, 							-- 중분류명
    lclsSystm3Cd CHAR(9) NOT NULL,								-- 소분류코드
    lclsSystm3Nm VARCHAR(30) NOT NULL,							-- 소분류명
    isActivate BOOLEAN DEFAULT TRUE, 							-- 활성화여부
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,				-- 등록일
    updatedAt DATETIME DEFAULT NULL								-- 수정일
                 ON UPDATE CURRENT_TIMESTAMP
);

-- ------------------------------------ Place 기본정보 -------------------------------------------
CREATE TABLE placeInfo (
	pNo INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,			-- place번호
    ctNo TINYINT UNSIGNED,									-- 콘텐츠타입번호 (FK)
    gpsNo SMALLINT UNSIGNED,								-- 법정동코드번호 (FK)
    cd3No SMALLINT UNSIGNED,								-- 분류체계번호 (FK)
    isEditable BOOLEAN DEFAULT TRUE,						-- 수정 가능 여부
    contentid INT UNIQUE DEFAULT NULL,						-- 콘텐츠ID
    title VARCHAR(50) NOT NULL,								-- 콘텐츠명(제목)
    showflag TINYINT DEFAULT 0,								-- 콘텐츠 표출여부
    firstimage VARCHAR(255),								-- 원본이미지(대표)
    firstimage2 VARCHAR(255),								-- 섬네일(대표)
    addr1 VARCHAR(255) NOT NULL,							-- 기본주소
    addr2 VARCHAR(100),										-- 상세주소
    zipcode VARCHAR(10),									-- 우편번호
    homepage TEXT,											-- 홈페이지링크
    tel VARCHAR(10),										-- 전화
    telname VARCHAR(30),									-- 전화번호명
    overview TEXT NOT NULL,									-- 개요
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,			-- 등록일
    updatedAt DATETIME DEFAULT NULL							-- 수정일
                 ON UPDATE CURRENT_TIMESTAMP,
                 
	CONSTRAINT fk_placeInfo_contentType
      FOREIGN KEY (ctNo) REFERENCES contentType(ctNo)
      ON UPDATE CASCADE
      ON DELETE SET NULL,
      
	CONSTRAINT fk_placeInfo_IdongCode
      FOREIGN KEY (gpsNo) REFERENCES ldongCode(ldNo)
      ON UPDATE CASCADE
      ON DELETE SET NULL,
      
	CONSTRAINT fk_placeInfo_categoryCode
      FOREIGN KEY (cd3No) REFERENCES categoryCode(ccNo)
      ON UPDATE CASCADE
      ON DELETE SET NULL
);

-- ------------------------------------ 지도마커GPS -------------------------------------------
CREATE TABLE markersGPS (
	mkNo INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,			-- 마커번호
    pNo INT UNSIGNED,										-- place번호 (FK)
    mkURL VARCHAR(255),										-- 마커이미지경로
    mapx DECIMAL(13,10) DEFAULT NULL,						-- GPS X좌표
    mapy DECIMAL(13,10) DEFAULT NULL,						-- GPS Y좌표
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,			-- 등록일
    updatedAt DATETIME DEFAULT NULL							-- 수정일
                 ON UPDATE CURRENT_TIMESTAMP,
                 
   CONSTRAINT fk_makersGPS_placeInfo
      FOREIGN KEY (pNo) REFERENCES placeInfo(pNo)
      ON UPDATE CASCADE
      ON DELETE SET NULL
);

-- ------------------------------------ place 상세이미지 -------------------------------------------
CREATE TABLE placeImageDetail (
	pidNo INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,			-- 상세이미지번호
    pNo INT UNSIGNED,										-- place번호 (FK)
    isEditable BOOLEAN DEFAULT TRUE,						-- 수정 가능 여부
    serialnum  VARCHAR(10),									-- 이미지일련번호
    originimgurl  VARCHAR(255),								-- 원본이미지
    smallimageurl  VARCHAR(255),							-- 썸네일이미지
    imgname  VARCHAR(30),									-- 이미지명
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,			-- 등록일
    updatedAt DATETIME DEFAULT NULL							-- 수정일
                 ON UPDATE CURRENT_TIMESTAMP,
                 
   CONSTRAINT fk_placeImageDetail_placeInfo
      FOREIGN KEY (pNo) REFERENCES placeInfo(pNo)
      ON UPDATE CASCADE
      ON DELETE SET NULL
);

-- ------------------------------------ 반려동물 동반여행 정보 -------------------------------------------
CREATE TABLE detailPetTour (
	dptNo INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,			-- 반려동물 동반여행 번호
    pNo INT UNSIGNED,										-- place번호 (FK)
    relaAcdntRiskMtr TEXT,									-- 관련 사고 대비사항
    acmpyTypeCd VARCHAR(50),								-- 동반유형코드(동반구분)
    relaPosesFclty TEXT,									-- 관련 구비 시설
    relaFrnshPrdlst VARCHAR(255),							-- 관련 비치 품목
    etcAcmpyInfo TEXT,										-- 기타 동반 정보
    relaPurcPrdlst VARCHAR(255),							-- 관련 구매 품목
    acmpyPsblCpam TEXT,										-- 동반가능동물
    relaRntlPrdlst VARCHAR(255),							-- 관련 렌탈 품목
    acmpyNeedMtr VARCHAR(50),								-- 동반시 필요사항
    petTursmInfo VARCHAR(255),								-- 반려동물 관광정보
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,			-- 등록일
    updatedAt DATETIME DEFAULT NULL							-- 수정일
                 ON UPDATE CURRENT_TIMESTAMP,
                 
	CONSTRAINT fk_detailPetTour_placeInfo
      FOREIGN KEY (pNo) REFERENCES placeInfo(pNo)
      ON UPDATE CASCADE
      ON DELETE SET NULL
);

-- ------------------------------------ 관광지 소개정보 -------------------------------------------
CREATE TABLE tourIntro (
	tNo INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,		-- 관광지소개번호
    pNo INT UNSIGNED,									-- place번호 (FK)
    accomcount VARCHAR(255),							-- 수용인원
    chkbabycarriage VARCHAR(255),						-- 유모차대여정보
    chkcreditcard VARCHAR(10),							-- 신용카드가능정보
    chkpet VARCHAR(10),									-- 애완동물동반가능정보
    expagerange VARCHAR(255),							-- 체험가능연령
    expguide VARCHAR(255),								-- 체험안내
	heritage1 VARCHAR(255),								-- 세계문화유산유무1
    heritage2 VARCHAR(10),								-- 세계문화유산유무2
    heritage3 VARCHAR(10),								-- 세계문화유산유무3
    infocenter VARCHAR(255),							-- 문의및안내
    opendate VARCHAR(255),								-- 개장일
    parking VARCHAR(255),								-- 주차시설
    restdate VARCHAR(255),								-- 쉬는날
    useseason VARCHAR(255),								-- 이용시기
    usetime VARCHAR(30),								-- 이용시간
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,		-- 등록일
    updatedAt DATETIME DEFAULT NULL						-- 수정일
                 ON UPDATE CURRENT_TIMESTAMP,
                 
    CONSTRAINT fk_tourIntro_placeInfo
      FOREIGN KEY (pNo) REFERENCES placeInfo(pNo)
      ON UPDATE CASCADE
      ON DELETE SET NULL
);

-- ------------------------------------ 축제행사공연 소개정보 -------------------------------------------
CREATE TABLE festivalIntro (
	fiNo INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,			-- 축제행사번호
    pNo INT UNSIGNED,										-- place번호 (FK)
    eventstartdate VARCHAR(255),							-- 행사시작일
    eventenddate VARCHAR(255),								-- 행사종료일
    progresstype VARCHAR(10),								-- 진행상태정보
    festivaltype VARCHAR(10),								-- 축제유형명
    agelimit VARCHAR(255),									-- 관람가능연령
    bookingplace VARCHAR(255),								-- 예매처
    discountinfofestival VARCHAR(255),						-- 할인정보
    eventhomepage VARCHAR(255),								-- 행사홈페이지
	eventplace VARCHAR(255),								-- 행사장소
    festivalgrade VARCHAR(255),								-- 축제등급
    placeinfo VARCHAR(255),									-- 행사장위치안내
    playtime VARCHAR(100),									-- 공연시간
    program VARCHAR(255),									-- 행사프로그램
    spendtimefestival VARCHAR(255),							-- 관람소요시간
    sponsor1 VARCHAR(30),									-- 주최자정보
    sponsor1tel VARCHAR(50),								-- 주최자연락처
    sponsor2 VARCHAR(100),									-- 주관사정보
    sponsor2tel TEXT,										-- 주관사연락처
    subevent VARCHAR(255),									-- 부대행사
    usetimefestival VARCHAR(100),							-- 이용요금
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,			-- 등록일
    updatedAt DATETIME DEFAULT NULL							-- 수정일
                 ON UPDATE CURRENT_TIMESTAMP,
	
	CONSTRAINT fk_festivalIntro_placeInfo
      FOREIGN KEY (pNo) REFERENCES placeInfo(pNo)
      ON UPDATE CASCADE
      ON DELETE SET NULL
);

-- ------------------------------------ 음식점 소개정보 -------------------------------------------
CREATE TABLE restaurantIntro (
	riNo INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,			-- 음식점소개 번호
    pNo INT UNSIGNED,										-- place번호 (FK)
    chkcreditcardfood VARCHAR(100),							-- 신용카드가능정보
    discountinfofood VARCHAR(255),							-- 할인정보
    firstmenu VARCHAR(100),									-- 대표메뉴
    infocenterfood VARCHAR(255),							-- 문의및안내
    kidsfacility TINYINT UNSIGNED DEFAULT  0,				-- 어린이놀이방여부
    lcnsno DECIMAL(11),										-- 인허가번호
    opendatefood VARCHAR(100),								-- 개업일
    opentimefood VARCHAR(255),								-- 영업시간
    packing VARCHAR(100),									-- 포장가능
    parkingfood VARCHAR(100),								-- 주차시설
    reservationfood VARCHAR(255),							-- 예약안내
    restdatefood VARCHAR(100),								-- 쉬는날
    scalefood VARCHAR(100),									-- 규모
    seat VARCHAR(100),										-- 좌석수
    smoking VARCHAR(100),									-- 금연/흡연여부
    treatmenu TEXT,											-- 취급메뉴
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,			-- 등록일
    updatedAt DATETIME DEFAULT NULL							-- 수정일
                 ON UPDATE CURRENT_TIMESTAMP,
                 
	CONSTRAINT fk_restaurantIntro_placeInfo
      FOREIGN KEY (pNo) REFERENCES placeInfo(pNo)
      ON UPDATE CASCADE
      ON DELETE SET NULL
);

-- ------------------------------------ Place 반복정보 -------------------------------------------
CREATE TABLE placeInfoRepeat (
	pirNo INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,			-- place 반복 번호
    pNo INT UNSIGNED,										-- place번호 (FK)
    fldgubun TINYINT UNSIGNED,								-- 구분일련번호
    infoname VARCHAR(10),									-- 제목
    infotext TEXT,											-- 내용
    serialnum TINYINT UNSIGNED NOT NULL,					-- 반복일련번호
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,			-- 등록일
    updatedAt DATETIME DEFAULT NULL							-- 수정일
                 ON UPDATE CURRENT_TIMESTAMP,
                 
	CONSTRAINT fk_placeInfoRepeat_placeInfo
      FOREIGN KEY (pNo) REFERENCES placeInfo(pNo)
      ON UPDATE CASCADE
      ON DELETE SET NULL
      
);
