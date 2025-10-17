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

select * from tour_api_origin.areabasedsynclist2 al 
left join tour_api_origin.detailcommon2 dc on al.contentid = dc.contentid; 

select al.*, dc.homepage, dc.telname, dc.overview from tour_api_origin.areabasedsynclist2 al 
left join tour_api_origin.detailcommon2 dc on al.contentid = dc.contentid; 
