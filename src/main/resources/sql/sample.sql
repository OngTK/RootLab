DROP TABLE IF EXISTS Members;
CREATE TABLE Members (
	mNo BINARY(16) DEFAULT (UUID_TO_BIN(UUID(), 1)) PRIMARY KEY,
    mId VARCHAR(60) not null UNIQUE,
    mPwd VARCHAR(60) not null,
    mNick VARCHAR(60) not null UNIQUE,
    mGender ENUM('남', '여'),
    mPhone VARCHAR(16) not null UNIQUE,
    mEmail VARCHAR(255) not null UNIQUE,
    mAdd1 VARCHAR(255) not null,
    mAdd2 VARCHAR(255)
);

-- -------------------------------------------------------------------------------

DROP TABLE IF EXISTS SiteInfo;
CREATE TABLE SiteInfo (
	siNo int unsigned PRIMARY KEY auto_increment,
    mNo BINARY(16),
    siName  varchar(50) not null unique,
    siDomain varchar(100) not null unique,
    siIntro varchar(255),
    siLogo varchar(255),
    siFavicon varchar(255),
    siMarker varchar(255),
    siTel varchar(20),
    siPrivacyOfficer varchar(30),
    siEmail varchar(100),
    siKeywords varchar(255),
    siIsPublic TINYINT(1) DEFAULT 0,
    siCreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    siUpdatedAt DATETIME DEFAULT null ON UPDATE CURRENT_TIMESTAMP,
    siMemo longtext, 
    FOREIGN KEY (mNo) REFERENCES members(id) ON DELETE SET NULL
);

-- -------------------------------------------------------------------------------

DROP TABLE IF EXISTS IdongCode;
CREATE TABLE IdongCode (
	ctNo tinyint PRIMARY KEY auto_increment,
    contentType varchar(5),
    contentTypeName varchar(30),
    defaultMarker varchar(255) not null,
    typeIdCreated datetime default now(),
    typeIdUpdated datetime default null ON UPDATE CURRENT_TIMESTAMP,
    memo TEXT
);

-- -------------------------------------------------------------------------------

DROP TABLE IF EXISTS IdongCode;
CREATE TABLE IdongCode (
	IdNo smallint UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    rnum smallint UNSIGNED not null,
    lDongRegnCd CHAR(5) not null, 
    lDongRegnNm varchar(20) not null, 
    lDongSignguCd CHAR(5) not null, 
    lDongSignguNm varchar(20) not null, 
    isActivate boolean DEFAULT false, 
    latitude DECIMAL(8, 6) not null, 
    longitude DECIMAL(9, 6) not null, 
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME default null
);

-- -------------------------------------------------------------------------------

DROP TABLE IF EXISTS categoryCode;
CREATE TABLE categoryCode (
	ccNo smallint UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    rnum smallint not null,
    lclsSystm1Cd CHAR(2) not null, 
    lclsSystm1Nm varchar(15) not null, 
    lclsSystm2Cd CHAR(4) not null,
    lclsSystm2Nm varchar(15) not null, 
    lclsSystm3Cd CHAR(8) not null,
    lclsSystm3Nm varchar(15) not null,
    isActivate boolean DEFAULT true, 
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, 
    updatedAt DATETIME default null
);

-- -------------------------------------------------------------------------------

DROP TABLE IF EXISTS placeInfo;
CREATE TABLE placeInfo (
	pNo int UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    ctNo tinyint not null,
    gpsNo smallint,
    cd3No smallint,
    isEditable boolean default true,
    contentid int UNIQUE default null,
    title varchar(50) not null,
    showflag tinyint default 0,
    firstimage varchar(255) default null,
    firstimage2 varchar(255) default null,
    addr1 varchar(255) not null,
    addr2 varchar(100) default null,
    zipcode varchar(10) default null,
    homepage varchar(255) default null,
    tel varchar(10) default null,
    telname varchar(30) default null,
    overview TEXT not null,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME default null
);

-- -------------------------------------------------------------------------------

DROP TABLE IF EXISTS makersGPS;
CREATE TABLE makersGPS (
	mkNo int UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    pNo int not null,
    mkURL varchar(255) default null,
    mapx decimal(13,10) default null,
    mapy decimal(13,10) default null,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME default null
);

-- -------------------------------------------------------------------------------

DROP TABLE IF EXISTS placeImageDetail;
CREATE TABLE placeImageDetail (
	pidNo int UNSIGNED PRIMARY KEY AUTO_INCREMENT ,
    pNo int not null,
    isEditable boolean default true,
    serialnum varchar(10) default null,
    originimgurl varchar(255) default null,
    smallimageurl varchar(255) default null,
    imgname varchar(30) default null,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME default null
);

-- -------------------------------------------------------------------------------

DROP TABLE IF EXISTS detailPetTour;
CREATE TABLE detailPetTour (

	dptNo int UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    pNo int not null,
    relaAcdntRiskMtr varchar(100) default null,
    acmpyTypeCd varchar(50) default null,
    relaPosesFclty varchar(255) default null,
    relaFrnshPrdlst varchar(255) default null,
    etcAcmpyInfo varchar(255) default null,
    relaPurcPrdlst varchar(255) default null,
    acmpyPsblCpam varchar(50) default null,
    relaRntlPrdlst varchar(255) default null,
    acmpyNeedMtr varchar(50) default null,
    petTursmInfo varchar(255) default null,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME default null
);

-- -------------------------------------------------------------------------------

DROP TABLE IF EXISTS tourIntro;
CREATE TABLE tourIntro (
	tNo int UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    pNo int not null,
    accomcount varchar(255) default null,
    chkbabycarriage varchar(255) default null,
    chkcreditcard varchar(10) default null,
    chkpet varchar(10) default null,
    expagerange varchar(255) default null,
    expguide varchar(255) default null,
	heritage1 varchar(255) default null,
    heritage2 varchar(10),
    heritage3 varchar(10),
    infocenter varchar(255),
    opendate varchar(255) default null,
    parking varchar(255) default null,
    restdate varchar(255) default null,
    useseason varchar(255) default null,
    usetime varchar(30) default null,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME default null
);

-- -------------------------------------------------------------------------------

DROP TABLE IF EXISTS festivalIntro;
CREATE TABLE festivalIntro (
	fiNo int UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    pNo int not null,
    eventstartdate varchar(255) default null,
    eventenddate varchar(255) default null,
    progresstype varchar(10) default null,
    festivaltype varchar(10) default null,
    agelimit varchar(255) default null,
    bookingplace varchar(255) default null,
    discountinfofestival varchar(255) default null,
    eventhomepage varchar(255) default null,
	eventplace varchar(255) default null,
    festivalgrade varchar(255) default null,
    placeinfo varchar(255) default null,
    playtime varchar(100) default null,
    program varchar(255) default null,
    spendtimefestival varchar(255) default null,
    sponsor1 varchar(30) default null,
    sponsor1tel varchar(50) default null,
    sponsor2 varchar(100) default null,
    sponsor2tel varchar(50) default null,
    subevent varchar(255) default null,
    usetimefestival varchar(100) default null,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME default null
);

-- -------------------------------------------------------------------------------

DROP TABLE IF EXISTS restaurantIntro;
CREATE TABLE restaurantIntro (
	riNo smallint UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    pNo int not null,
    chkcreditcardfood varchar(100),
    discountinfofood varchar(255),
    firstmenu varchar(100),
    infocenterfood varchar(255),
    kidsfacility tinyint UNSIGNED default 0,
    lcnsno decimal(11),
    opendatefood varchar(100),
    opentimefood varchar(255),
    packing varchar(100),
    parkingfood varchar(100),
    reservationfood varchar(255),
    restdatefood varchar(100),
    scalefood varchar(100),
    seat varchar(100),
    smoking varchar(100),
    treatmenu varchar(255),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME default null
);

-- -------------------------------------------------------------------------------

DROP TABLE IF EXISTS placeInfoRepeat ;
CREATE TABLE placeInfoRepeat (
	pirNo int UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    pNo int not null unique,
    fldgubun tinyint UNSIGNED,
    infoname varchar(10),
    infotext text,
    serialnum tinyint UNSIGNED not null,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME default null
);
