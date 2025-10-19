-- --------------------------------------
-- tour_api_origin
-- API 원본 DB 
-- --------------------------------------

use tour_api_origin;

select * from areabasedsynclist2;
select * from detailcommon2;
select * from detailimage2;
select * from detailinfo2_12;
select * from detailinfo2_39;
select * from detailintro2_12;
select * from detailintro2_39;
select * from detailpettour2;
select * from lclssystmcode2;
select * from ldongcode2;
select * from searchfestival2;
select * from searchstay2;

-- --------------------------------------
-- k-tour_headquater
-- 본사 정규화 DB 
-- --------------------------------------
use k_tour_headquarter;

select * from categorycode;
select * from contenttype;
select * from ldongcode;

select * from placeinfo;
select * from detailpettour;
select * from festivalintro;
select * from manager;
select * from markersgps;
select * from placeimagedetail;
select * from placeinforepeat;
select * from push;
select * from restaurantintro;
select * from siteinfo;
select * from tourintro;

-- ---------------------------------------------------------
-- PlaceInfoRepeat : 반복정보 관련
-- ---------------------------------------------------------

SELECT * FROM PLACEINFOREPEAT;
insert into placeInfoRepeat( pNo, infoName , infoText, serialnum ) values (125183, "화장실","비밀번호 뭐게요", 0);
select * from placeinforepeat where pNo = "125183";
update placeinforepeat set infoname = "화장실수정11", infotext = "비밀번호 수정" where pirNo = "2";
alter table placeinforepeat change infoname infoname varchar(30); 
desc placeinforepeat;

-- ---------------------------------------------------------
-- PlaceInfo : 플레이스 정보
-- 관광, 플레이스 관련 기본 공통 정보
-- ---------------------------------------------------------

select * from placeInfo;

insert into placeInfo(ctNo, ldNo, ccNO, title, showflag, firstImage, firstImage2, addr1, zipcode, homepage, tel)
values (1, 1, 1, "제목",1,"임시이미지1.jpg","임시이미지2.jpg", "경기도 부천시","00000","https://~~~","032-000-00000" );