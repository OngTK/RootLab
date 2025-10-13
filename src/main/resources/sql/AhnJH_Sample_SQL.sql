DROP DATABASE IF EXISTS tour_api_origin;
CREATE DATABASE tour_api_origin;
USE tour_api_origin;
set SQL_SAFE_UPDATES = 0;

CREATE TABLE areabasedlist2 (addr1 varchar(255), addr2 varchar(255), areacode int, cat1 varchar(255), cat2 varchar(255), cat3 varchar(255), contentid int, contenttypeid int, createdtime double, firstimage varchar(255), firstimage2 varchar(255), cpyrhtDivCd varchar(255), mapx double, mapy double, mlevel int, modifiedtime double, sigungucode int, tel varchar(255), title varchar(255), zipcode int, lDongRegnCd int, lDongSignguCd int, lclsSystm1 varchar(255), lclsSystm2 varchar(255), lclsSystm3 varchar(255));
CREATE TABLE areaBasedSyncList2(addr1 varchar(255),addr2 varchar(255),areacode varchar(255),cat1 varchar(255),cat2 varchar(255),cat3 varchar(255),contentid varchar(255),contenttypeid varchar(255),createdtime varchar(255),firstimage varchar(255),firstimage2 varchar(255),cpyrhtDivCd varchar(255),mapx varchar(255),mapy varchar(255),mlevel varchar(255),modifiedtime varchar(255),sigungucode varchar(255),tel varchar(255),title varchar(255),zipcode varchar(255),showflag varchar(255),lDongRegnCd varchar(255),lDongSignguCd varchar(255),lclsSystm1 varchar(255),lclsSystm2 varchar(255),lclsSystm3 varchar(255));
CREATE TABLE detailCommon2(contentid varchar(255),contenttypeid varchar(255),title varchar(255),homepage text,tel varchar(255),zipcode varchar(255),addr1 varchar(255),addr2 varchar(255),areacode varchar(255),sigungucode varchar(255),cat1 varchar(255),cat2 varchar(255),cat3 varchar(255),mapx varchar(255),mapy varchar(255),mlevel varchar(255),firstimage varchar(255),firstimage2 varchar(255),createdtime varchar(255),modifiedtime varchar(255),overview text,cpyrhtDivCd varchar(255),lDongRegnCd varchar(255),lDongSignguCd varchar(255),lclsSystm1 varchar(255),lclsSystm2 varchar(255),lclsSystm3 varchar(255),telname varchar(255));
CREATE TABLE detailImage2(contentid varchar(255), originimgurl varchar(255), imgname varchar(255), smallimageurl varchar(255), cpyrhtDivCd varchar(255), serialnum varchar(255));
CREATE TABLE detailInfo2_12(contentid varchar(255),contenttypeid varchar(255),serialnum varchar(255),infoname varchar(255),infotext varchar(255),fldgubun varchar(255));

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