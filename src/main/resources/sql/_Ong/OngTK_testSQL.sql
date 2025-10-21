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
select * from restaurantintro;
select * from siteinfo;
select * from tourintro;
select * from push;

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

INSERT INTO k_tour_headquarter.placeinfo (ctNo, ldNo, ccNo, isEditable, contentid, title, showflag, firstimage, firstimage2, addr1, addr2, zipcode, homepage, tel, telname, overview, createdAt, updatedAt)
            SELECT
                /* FK: contentType.ctNo */
                ( SELECT ct.ctNo
                  FROM k_tour_headquarter.contentType ct
                  WHERE ct.contenttypeID = TRIM(al.contenttypeid)
                    LIMIT 1 ) AS ctNo,

                /* FK: ldongCode.ldNo (법정동: lDongRegnCd + lDongSignguCd) */
                ( SELECT ld.ldNo
                FROM k_tour_headquarter.ldongCode ld
                WHERE ld.lDongRegnCd = TRIM(al.lDongRegnCd)
                AND ld.lDongSignguCd= TRIM(al.lDongSignguCd)
                LIMIT 1 ) AS ldNo,

                /* FK: categoryCode.ccNo (al.lclsSystm3 기준 매칭) */
                ( SELECT cc.ccNo
                FROM k_tour_headquarter.categoryCode cc
                WHERE cc.lclsSystm3Cd =
                UPPER(TRIM(REPLACE(REPLACE(REPLACE(REPLACE(
                al.lclsSystm3, CHAR(13), ''), CHAR(10), ''), CHAR(9), ''), ' ', '')))
                LIMIT 1 ) AS ccNo,

                TRUE AS isEditable,
                CAST(al.contentid AS UNSIGNED) AS contentid,
                LEFT(TRIM(al.title), 50) AS title,
                al.showflag AS showflag,
                NULLIF(TRIM(al.firstimage), '') AS firstimage,
                NULLIF(TRIM(al.firstimage2), '') AS firstimage2,
                COALESCE(NULLIF(TRIM(al.addr1), ''), '-') AS addr1,
                NULLIF(TRIM(al.addr2), '') AS addr2,
                NULLIF(TRIM(al.zipcode), '') AS zipcode,

                /* 부가정보: dc가 있으면 채움, 없으면 NULL */
                NULLIF(TRIM(dc.homepage), '') AS homepage,
                LEFT(NULLIF(TRIM(al.tel), ''), 10) AS tel,
                NULLIF(TRIM(dc.telname), '') AS telname,
                NULLIF(dc.overview, '') AS overview,

                /* [] createdAt, updatedAt을 DATETIME 형식으로 변환 */
                STR_TO_DATE(al.createdtime, '%Y%m%d%H%i%s') AS createdAt,
                STR_TO_DATE(al.modifiedtime, '%Y%m%d%H%i%s') AS updatedAt

            FROM tour_api_origin.areabasedsynclist2 al
            LEFT JOIN tour_api_origin.detailcommon2 dc
            ON CAST(TRIM(al.contentid) AS UNSIGNED) = CAST(TRIM(dc.contentid) AS UNSIGNED);
            
-- ---------------------------------------------------------
-- TourIntro
-- 관광지(contentTypeID 12 . ctNo1) 정보
-- ---------------------------------------------------------
select * from tourIntro where pno = 6881;


-- ---------------------------------------------------------
-- festivalintro 
-- 행사/축제 (contentTypeID 15 . ctNo3) 정보
-- ---------------------------------------------------------
select * from festivalintro where pno=23405;


-- ---------------------------------------------------------
-- RestaurantIntro 
-- 음식점 (contentTypeID 39 . ctNo 8) 정보
-- ---------------------------------------------------------