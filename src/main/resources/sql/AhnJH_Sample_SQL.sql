/*
1. MySQL Connections > 설정 > Connection > Advanced > Others에 OPT_LOCAL_INFILE=1 추가
2. LOAD DATA LOCAL INFILE "절대경로"
	-> 절대경로는 각자 다른 경로를 갖기에 본인 경로에 맞게 커스텀해야함.
    -> 경로 작성 시, \ -> \\로 변경 요망
3. 경로를 모두 변경했다면, 전체 실행을 함으로써 모든 CSV 데이터를 DB에 추가

** 기본적으로 varchar(255)로 진행하였으나, 크기가 큰 데이터가 있어 일부는 text로 진행. -> 추후 자동화할 때는 어떻게 진행할 지 논의 필요
*/
DROP DATABASE IF EXISTS tour_api_origin;
CREATE DATABASE tour_api_origin;
USE tour_api_origin;
set SQL_SAFE_UPDATES = 0;
set global local_infile=true;	# 로컬 파일을 읽을 수 있도록 설정

CREATE TABLE areabasedlist2 (addr1 varchar(255), addr2 varchar(255), areacode varchar(255), cat1 varchar(255), cat2 varchar(255), cat3 varchar(255), contentid int, contenttypeid int, createdtime double, firstimage varchar(255), firstimage2 varchar(255), cpyrhtDivCd varchar(255), mapx double, mapy double, mlevel varchar(255), modifiedtime double, sigungucode varchar(255), tel text, title varchar(255), zipcode varchar(255), lDongRegnCd varchar(255), lDongSignguCd varchar(255), lclsSystm1 varchar(255), lclsSystm2 varchar(255), lclsSystm3 varchar(255));
CREATE TABLE areaBasedSyncList2(addr1 varchar(255),addr2 varchar(255),areacode varchar(255),cat1 varchar(255),cat2 varchar(255),cat3 varchar(255),contentid varchar(255),contenttypeid varchar(255),createdtime varchar(255),firstimage varchar(255),firstimage2 varchar(255),cpyrhtDivCd varchar(255),mapx varchar(255),mapy varchar(255),mlevel varchar(255),modifiedtime varchar(255),sigungucode varchar(255),tel text,title varchar(255),zipcode varchar(255),showflag varchar(255),lDongRegnCd varchar(255),lDongSignguCd varchar(255),lclsSystm1 varchar(255),lclsSystm2 varchar(255),lclsSystm3 varchar(255));
CREATE TABLE detailCommon2(contentid varchar(255),contenttypeid varchar(255),title varchar(255),createdtime varchar(255),modifiedtime varchar(255),tel varchar(255),telname varchar(255),homepage text,firstimage varchar(255),firstimage2 varchar(255),cpyrhtDivCd varchar(255),areacode varchar(255),sigungucode varchar(255),lDongRegnCd varchar(255),lDongSignguCd varchar(255),lclsSystm1 varchar(255),lclsSystm2 varchar(255),lclsSystm3 varchar(255),cat1 varchar(255),cat2 varchar(255),cat3 varchar(255),addr1 varchar(255),addr2 varchar(255),zipcode varchar(255),mapx varchar(255),mapy varchar(255),mlevel varchar(255),overview text);
CREATE TABLE detailImage2(contentid varchar(255), originimgurl varchar(255), imgname varchar(255), smallimageurl varchar(255), cpyrhtDivCd varchar(255), serialnum varchar(255));
CREATE TABLE detailInfo2_12(contentid varchar(255),contenttypeid varchar(255),serialnum varchar(255),infoname varchar(255),infotext varchar(255),fldgubun varchar(255));
CREATE TABLE detailInfo2_39(contentid varchar(255),contenttypeid varchar(255),serialnum varchar(255),infoname varchar(255),infotext varchar(255),fldgubun varchar(255));
CREATE TABLE detailIntro2_12(contentid varchar(255),contenttypeid varchar(255),heritage1 varchar(255),heritage2 varchar(255),heritage3 varchar(255),infocenter varchar(255),opendate varchar(255),restdate varchar(255),expguide varchar(255),expagerange varchar(255),accomcount varchar(255),useseason varchar(255),usetime varchar(255),parking varchar(255),chkbabycarriage varchar(255),chkpet varchar(255),chkcreditcard varchar(255));
CREATE TABLE detailIntro2_39(contentid varchar(255),contenttypeid varchar(255),seat varchar(255),kidsfacility varchar(255),firstmenu varchar(255),treatmenu text,smoking varchar(255),packing varchar(255),infocenterfood varchar(255),scalefood varchar(255),parkingfood varchar(255),opendatefood varchar(255),opentimefood varchar(255),restdatefood varchar(255),discountinfofood varchar(255),chkcreditcardfood varchar(255),reservationfood varchar(255),lcnsno varchar(255));
CREATE TABLE detailPetTour2(contentid varchar(255),relaAcdntRiskMtr text,acmpyTypeCd varchar(255),relaPosesFclty text,relaFrnshPrdlst varchar(255),etcAcmpyInfo text,relaPurcPrdlst varchar(255),acmpyPsblCpam text,relaRntlPrdlst varchar(255),acmpyNeedMtr varchar(255));
CREATE TABLE lclsSystmCode2(lclsSystm1Cd varchar(255),lclsSystm1Nm varchar(255),lclsSystm2Cd varchar(255),lclsSystm2Nm varchar(255),lclsSystm3Cd varchar(255),lclsSystm3Nm varchar(255),rnum varchar(255));
CREATE TABLE ldongCode2(lDongRegnCd varchar(255),lDongRegnNm varchar(255),lDongSignguCd varchar(255),lDongSignguNm varchar(255),rnum varchar(255));
CREATE TABLE searchFestival2(addr1 varchar(255),addr2 varchar(255),zipcode varchar(255),cat1 varchar(255),cat2 varchar(255),cat3 varchar(255),contentid varchar(255),contenttypeid varchar(255),createdtime varchar(255),eventstartdate varchar(255),eventenddate varchar(255),firstimage varchar(255),firstimage2 varchar(255),cpyrhtDivCd varchar(255),mapx varchar(255),mapy varchar(255),mlevel varchar(255),modifiedtime varchar(255),areacode varchar(255),sigungucode varchar(255),tel text,title varchar(255),lDongRegnCd varchar(255),lDongSignguCd varchar(255),lclsSystm1 varchar(255),lclsSystm2 varchar(255),lclsSystm3 varchar(255),progresstype varchar(255),festivaltype varchar(255));
CREATE TABLE searchStay2(addr1 varchar(255),addr2 varchar(255),areacode varchar(255),sigungucode varchar(255),cat1 varchar(255),cat2 varchar(255),cat3 varchar(255),contentid varchar(255),contenttypeid varchar(255),createdtime varchar(255),firstimage varchar(255),firstimage2 varchar(255),cpyrhtDivCd varchar(255),mapx varchar(255),mapy varchar(255),mlevel varchar(255),modifiedtime varchar(255),tel varchar(255),title varchar(255),zipcode varchar(255),lDongRegnCd varchar(255),lDongSignguCd varchar(255),lclsSystm1 varchar(255),lclsSystm2 varchar(255),lclsSystm3 varchar(255));

LOAD DATA LOCAL INFILE "C:\\Users\\tj-bu-702-06\\Desktop\\RootLab\\src\\main\\resources\\csv\\251012\\areabasedlist2.csv"
INTO TABLE tour_api_origin.areabasedlist2
FIELDS TERMINATED BY ","
LINES TERMINATED BY "\n"
IGNORE 1 ROWS;
LOAD DATA LOCAL INFILE "C:\\Users\\tj-bu-702-06\\Desktop\\RootLab\\src\\main\\resources\\csv\\251012\\areaBasedSyncList2.csv"
INTO TABLE tour_api_origin.areaBasedSyncList2
FIELDS TERMINATED BY ","
LINES TERMINATED BY "\n"
IGNORE 1 ROWS;
LOAD DATA LOCAL INFILE "C:\\Users\\tj-bu-702-06\\Desktop\\RootLab\\src\\main\\resources\\csv\\251012\\detailCommon2.csv"
INTO TABLE tour_api_origin.detailCommon2
FIELDS TERMINATED BY ","
LINES TERMINATED BY "\n"
IGNORE 1 ROWS;
LOAD DATA LOCAL INFILE "C:\\Users\\tj-bu-702-06\\Desktop\\RootLab\\src\\main\\resources\\csv\\251012\\detailImage2.csv"
INTO TABLE tour_api_origin.detailImage2
FIELDS TERMINATED BY ","
LINES TERMINATED BY "\n"
IGNORE 1 ROWS;
LOAD DATA LOCAL INFILE "C:\\Users\\tj-bu-702-06\\Desktop\\RootLab\\src\\main\\resources\\csv\\251012\\detailInfo2_12.csv"
INTO TABLE tour_api_origin.detailInfo2_12
FIELDS TERMINATED BY ","
LINES TERMINATED BY "\n"
IGNORE 1 ROWS;
LOAD DATA LOCAL INFILE "C:\\Users\\tj-bu-702-06\\Desktop\\RootLab\\src\\main\\resources\\csv\\251012\\detailInfo2_39.csv"
INTO TABLE tour_api_origin.detailInfo2_39
FIELDS TERMINATED BY ","
LINES TERMINATED BY "\n"
IGNORE 1 ROWS;
LOAD DATA LOCAL INFILE "C:\\Users\\tj-bu-702-06\\Desktop\\RootLab\\src\\main\\resources\\csv\\251012\\detailIntro2_12.csv"
INTO TABLE tour_api_origin.detailIntro2_12
FIELDS TERMINATED BY ","
LINES TERMINATED BY "\n"
IGNORE 1 ROWS;
LOAD DATA LOCAL INFILE "C:\\Users\\tj-bu-702-06\\Desktop\\RootLab\\src\\main\\resources\\csv\\251012\\detailIntro2_39.csv"
INTO TABLE tour_api_origin.detailIntro2_39
FIELDS TERMINATED BY ","
LINES TERMINATED BY "\n"
IGNORE 1 ROWS;
LOAD DATA LOCAL INFILE "C:\\Users\\tj-bu-702-06\\Desktop\\RootLab\\src\\main\\resources\\csv\\251012\\detailPetTour2.csv"
INTO TABLE tour_api_origin.detailPetTour2
FIELDS TERMINATED BY ","
LINES TERMINATED BY "\n"
IGNORE 1 ROWS;
LOAD DATA LOCAL INFILE "C:\\Users\\tj-bu-702-06\\Desktop\\RootLab\\src\\main\\resources\\csv\\251012\\lclsSystmCode2.csv"
INTO TABLE tour_api_origin.lclsSystmCode2
FIELDS TERMINATED BY ","
LINES TERMINATED BY "\n"
IGNORE 1 ROWS;
LOAD DATA LOCAL INFILE "C:\\Users\\tj-bu-702-06\\Desktop\\RootLab\\src\\main\\resources\\csv\\251012\\ldongCode2.csv"
INTO TABLE tour_api_origin.ldongCode2
FIELDS TERMINATED BY ","
LINES TERMINATED BY "\n"
IGNORE 1 ROWS;
LOAD DATA LOCAL INFILE "C:\\Users\\tj-bu-702-06\\Desktop\\RootLab\\src\\main\\resources\\csv\\251012\\searchFestival2.csv"
INTO TABLE tour_api_origin.searchFestival2
FIELDS TERMINATED BY ","
LINES TERMINATED BY "\n"
IGNORE 1 ROWS;
LOAD DATA LOCAL INFILE "C:\\Users\\tj-bu-702-06\\Desktop\\RootLab\\src\\main\\resources\\csv\\251012\\searchStay2.csv"
INTO TABLE tour_api_origin.searchStay2
FIELDS TERMINATED BY ","
LINES TERMINATED BY "\n"
IGNORE 1 ROWS;