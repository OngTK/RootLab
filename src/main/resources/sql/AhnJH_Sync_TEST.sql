-- ----------------------------------------ldongcode_test SQL------------------------------------------
SELECT * FROM k_tour_headquarter.ldongcode;
SELECT * FROM tour_api_origin.ldongcode2;
-- ----------------------------------------INSERT------------------------------------------
INSERT INTO k_tour_headquarter.ldongcode ( rnum, lDongRegnCd, lDongRegnNm, lDongSignguCd, lDongSignguNm, mapy, mapx )
	SELECT rnum, lDongRegnCd, lDongRegnNm, lDongSignguCd, lDongSignguNm, 0.0, 0.0
    FROM tour_api_origin.ldongcode2;

-- ----------------------------------------categorycode_test SQL------------------------------------------
SELECT * FROM k_tour_headquarter.categorycode;
SELECT * FROM tour_api_origin.lclssystmcode2;
-- ----------------------------------------INSERT------------------------------------------
INSERT INTO k_tour_headquarter.categorycode ( rnum, lclsSystm1Cd, lclsSystm1Nm, lclsSystm2Cd, lclsSystm2Nm, lclsSystm3Cd, lclsSystm3Nm )
	SELECT rnum, lclsSystm1Cd, lclsSystm1Nm, lclsSystm2Cd, lclsSystm2Nm, lclsSystm3Cd, lclsSystm3Nm
    FROM tour_api_origin.lclssystmcode2;

-- ----------------------------------------placeInfo_test SQL------------------------------------------
SELECT * FROM k_tour_headquarter.placeinfo;
-- ----------------------------------------INSERT------------------------------------------
INSERT INTO k_tour_headquarter.placeinfo ( ctNo, ldNo, ccNo, isEditable, contentid, title, showflag, firstimage, firstimage2, addr1, addr2, zipcode, homepage, tel, telname, overview, createdAt, updatedAt )
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

-- ----------------------------------------markersGPS_test SQL------------------------------------------
SELECT * FROM k_tour_headquarter.markersgps;
SELECT * FROM tour_api_origin.detailcommon2;
SELECT * FROM tour_api_origin.areabasedsynclist2;
SELECT * FROM k_tour_headquarter.placeinfo;
SELECT kpi.pNo, tabsl2.mapx, tabsl2.mapy
	FROM k_tour_headquarter.placeinfo kpi
    LEFT OUTER JOIN tour_api_origin.areabasedsynclist2 tabsl2
    USING (contentid);
SELECT contentid, mapy FROM tour_api_origin.areabasedsynclist2 WHERE ABS(mapy) >= 1000;
SELECT * FROM tour_api_origin.areabasedsynclist2 WHERE contentid = 136294;			-- mapy 좌표 이상 발견
-- ----------------------------------------INSERT------------------------------------------
INSERT INTO k_tour_headquarter.markersgps (pNo, mapx, mapy)
	SELECT kpi.pNo, tabsl2.mapx, tabsl2.mapy
		FROM k_tour_headquarter.placeinfo kpi
		LEFT OUTER JOIN tour_api_origin.areabasedsynclist2 tabsl2
		USING (contentid)
        WHERE ABS(tabsl2.mapy) < 1000;

-- ----------------------------------------placeImageDetail_test SQL------------------------------------------
SELECT * FROM k_tour_headquarter.placeimagedetail;
SELECT * FROM k_tour_headquarter.placeinfo;
SELECT * FROM tour_api_origin.detailimage2;
SELECT kpi.pNo, tdi.serialnum, tdi.originimgurl, tdi.smallimageurl, tdi.imgname
	FROM k_tour_headquarter.placeinfo kpi
    JOIN tour_api_origin.detailimage2 tdi
    USING (contentid);
-- ----------------------------------------INSERT------------------------------------------
INSERT INTO k_tour_headquarter.placeimagedetail (pNo, serialnum, originimgurl, smallimageurl, imgname)
	SELECT kpi.pNo, tdi.serialnum, tdi.originimgurl, tdi.smallimageurl, tdi.imgname
		FROM k_tour_headquarter.placeinfo kpi
		JOIN tour_api_origin.detailimage2 tdi
		USING (contentid);

-- ----------------------------------------detailPetTour_test SQL------------------------------------------
SELECT * FROM k_tour_headquarter.detailpettour;
SELECT * FROM k_tour_headquarter.placeinfo;
SELECT * FROM tour_api_origin.detailpettour2;
SELECT kpi.pNo, tdpt.relaAcdntRiskMtr, tdpt.acmpyTypeCd, tdpt.relaPosesFclty, tdpt.relaFrnshPrdlst,
	tdpt.etcAcmpyInfo, tdpt.relaPurcPrdlst, tdpt.acmpyPsblCpam, tdpt.relaRntlPrdlst, tdpt.acmpyNeedMtr
	FROM k_tour_headquarter.placeinfo kpi
    JOIN tour_api_origin.detailpettour2 tdpt
    USING (contentid);
-- ----------------------------------------INSERT------------------------------------------
INSERT INTO k_tour_headquarter.detailpettour (pNo, relaAcdntRiskMtr, acmpyTypeCd, relaPosesFclty, relaFrnshPrdlst, etcAcmpyInfo, relaPurcPrdlst, acmpyPsblCpam, relaRntlPrdlst, acmpyNeedMtr)
    SELECT kpi.pNo, tdpt.relaAcdntRiskMtr, tdpt.acmpyTypeCd, tdpt.relaPosesFclty, tdpt.relaFrnshPrdlst,
		tdpt.etcAcmpyInfo, tdpt.relaPurcPrdlst, tdpt.acmpyPsblCpam, tdpt.relaRntlPrdlst, tdpt.acmpyNeedMtr
		FROM k_tour_headquarter.placeinfo kpi
		JOIN tour_api_origin.detailpettour2 tdpt
		USING (contentid);

-- ----------------------------------------tourIntro_test SQL------------------------------------------
SELECT * FROM k_tour_headquarter.tourintro;
SELECT * FROM k_tour_headquarter.placeinfo;
SELECT * FROM tour_api_origin.detailintro2_12;
SELECT kpi.pNo, tdi12.accomcount, tdi12.chkbabycarriage, tdi12.chkcreditcard, tdi12.chkpet, tdi12.expagerange, tdi12.expguide,
	tdi12.heritage1, tdi12.heritage2, tdi12.heritage3, tdi12.infocenter, tdi12.opendate, tdi12.parking, tdi12.restdate, tdi12.useseason, tdi12.usetime
	FROM k_tour_headquarter.placeinfo kpi
    JOIN tour_api_origin.detailintro2_12 tdi12
    USING (contentid);
-- ----------------------------------------INSERT------------------------------------------
INSERT INTO k_tour_headquarter.tourintro (pNo, accomcount, chkbabycarriage, chkcreditcard, chkpet, expagerange, expguide, heritage1, heritage2, heritage3, infocenter, opendate, parking, restdate, useseason, usetime)
	SELECT kpi.pNo, tdi12.accomcount, tdi12.chkbabycarriage, tdi12.chkcreditcard, tdi12.chkpet, tdi12.expagerange, tdi12.expguide,
		tdi12.heritage1, tdi12.heritage2, tdi12.heritage3, tdi12.infocenter, tdi12.opendate, tdi12.parking, tdi12.restdate, tdi12.useseason, tdi12.usetime
		FROM k_tour_headquarter.placeinfo kpi
		JOIN tour_api_origin.detailintro2_12 tdi12
		USING (contentid);

-- ----------------------------------------festivalIntro_test SQL------------------------------------------
SELECT * FROM k_tour_headquarter.festivalIntro;
SELECT * FROM k_tour_headquarter.placeinfo;
SELECT * FROM tour_api_origin.detailintro2_15;
SELECT kpi.pNo, tdi15.eventstartdate, tdi15.eventenddate, tdi15.progresstype, tdi15.festivaltype, tdi15.agelimit, tdi15.bookingplace, tdi15.discountinfofestival, tdi15.eventhomepage, tdi15.eventplace,
	   tdi15.festivalgrade, tdi15.placeinfo, tdi15.playtime, tdi15.program, tdi15.spendtimefestival, tdi15.sponsor1, tdi15.sponsor1tel, tdi15.sponsor2, tdi15.sponsor2tel, tdi15.subevent, tdi15.usetimefestival
	FROM k_tour_headquarter.placeinfo kpi
    JOIN tour_api_origin.detailintro2_15 tdi15
    USING (contentid);
-- ----------------------------------------INSERT------------------------------------------
INSERT INTO k_tour_headquarter.festivalIntro(pNo, eventstartdate, eventenddate, progresstype, festivaltype, agelimit, bookingplace, discountinfofestival, eventhomepage, eventplace, festivalgrade, placeinfo, playtime, program, spendtimefestival, sponsor1, sponsor1tel, sponsor2, sponsor2tel, subevent, usetimefestival)
	SELECT kpi.pNo, tdi15.eventstartdate, tdi15.eventenddate, tdi15.progresstype, tdi15.festivaltype, tdi15.agelimit, tdi15.bookingplace, tdi15.discountinfofestival, tdi15.eventhomepage, tdi15.eventplace,
		   tdi15.festivalgrade, tdi15.placeinfo, tdi15.playtime, tdi15.program, tdi15.spendtimefestival, tdi15.sponsor1, tdi15.sponsor1tel, tdi15.sponsor2, tdi15.sponsor2tel, tdi15.subevent, tdi15.usetimefestival
		FROM k_tour_headquarter.placeinfo kpi
		JOIN tour_api_origin.detailintro2_15 tdi15
		USING (contentid);

-- ----------------------------------------restaurantIntro_test SQL------------------------------------------
SELECT * FROM k_tour_headquarter.restaurantIntro;
SELECT * FROM k_tour_headquarter.placeinfo;
SELECT * FROM tour_api_origin.detailintro2_39;
SELECT kpi.pNo, tdi39.chkcreditcardfood, tdi39.discountinfofood, tdi39.firstmenu, tdi39.infocenterfood, tdi39.kidsfacility, tdi39.lcnsno, tdi39.opendatefood,
	tdi39.opentimefood, tdi39.packing, tdi39.parkingfood, tdi39.reservationfood, tdi39.restdatefood, tdi39.scalefood, tdi39.seat, tdi39.smoking, tdi39.treatmenu
	FROM k_tour_headquarter.placeinfo kpi
    JOIN tour_api_origin.detailintro2_39 tdi39
    USING (contentid);
-- ----------------------------------------INSERT------------------------------------------
INSERT INTO k_tour_headquarter.restaurantintro(pNo, chkcreditcardfood, discountinfofood, firstmenu, infocenterfood, kidsfacility, lcnsno, opendatefood, opentimefood, packing, parkingfood, reservationfood, restdatefood, scalefood, seat, smoking, treatmenu)
	SELECT kpi.pNo, tdi39.chkcreditcardfood, tdi39.discountinfofood, tdi39.firstmenu, tdi39.infocenterfood, tdi39.kidsfacility, tdi39.lcnsno, tdi39.opendatefood,
		tdi39.opentimefood, tdi39.packing, tdi39.parkingfood, tdi39.reservationfood, tdi39.restdatefood, tdi39.scalefood, tdi39.seat, tdi39.smoking, tdi39.treatmenu
		FROM k_tour_headquarter.placeinfo kpi
		JOIN tour_api_origin.detailintro2_39 tdi39
		USING (contentid);
        -- ----------------------------------------restaurantIntro_test SQL------------------------------------------
SELECT * FROM k_tour_headquarter.restaurantIntro;
SELECT * FROM k_tour_headquarter.placeinfo;
SELECT * FROM tour_api_origin.detailintro2_39;
SELECT kpi.pNo, tdi39.chkcreditcardfood, tdi39.discountinfofood, tdi39.firstmenu, tdi39.infocenterfood, tdi39.kidsfacility, tdi39.lcnsno, tdi39.opendatefood,
	tdi39.opentimefood, tdi39.packing, tdi39.parkingfood, tdi39.reservationfood, tdi39.restdatefood, tdi39.scalefood, tdi39.seat, tdi39.smoking, tdi39.treatmenu
	FROM k_tour_headquarter.placeinfo kpi
    JOIN tour_api_origin.detailintro2_39 tdi39
    USING (contentid);
-- ----------------------------------------INSERT------------------------------------------
INSERT INTO k_tour_headquarter.restaurantintro(pNo, chkcreditcardfood, discountinfofood, firstmenu, infocenterfood, kidsfacility, lcnsno, opendatefood, opentimefood, packing, parkingfood, reservationfood, restdatefood, scalefood, seat, smoking, treatmenu)
	SELECT kpi.pNo, tdi39.chkcreditcardfood, tdi39.discountinfofood, tdi39.firstmenu, tdi39.infocenterfood, tdi39.kidsfacility, tdi39.lcnsno, tdi39.opendatefood,
		tdi39.opentimefood, tdi39.packing, tdi39.parkingfood, tdi39.reservationfood, tdi39.restdatefood, tdi39.scalefood, tdi39.seat, tdi39.smoking, tdi39.treatmenu
		FROM k_tour_headquarter.placeinfo kpi
		JOIN tour_api_origin.detailintro2_39 tdi39
		USING (contentid);

-- ----------------------------------------placeInfoRepeat_test SQL------------------------------------------
SELECT * FROM k_tour_headquarter.placeinforepeat;
SELECT * FROM k_tour_headquarter.placeinfo;
SELECT * FROM tour_api_origin.detailinfo2_12;
SELECT * FROM tour_api_origin.detailinfo2_39;
SELECT kpi.pNo, tdi12.fldgubun, tdi12.infoname, tdi12.infotext, tdi12.serialnum
	FROM k_tour_headquarter.placeinfo kpi
    JOIN tour_api_origin.detailinfo2_12 tdi12
    USING (contentid);
SELECT kpi.pNo, tdi39.fldgubun, tdi39.infoname, tdi39.infotext, tdi39.serialnum
	FROM k_tour_headquarter.placeinfo kpi
    JOIN tour_api_origin.detailinfo2_39 tdi39
    USING (contentid);
SELECT kpi.pNo, tdi12.fldgubun, tdi12.infoname, tdi12.infotext, tdi12.serialnum
	FROM k_tour_headquarter.placeinfo kpi
	JOIN tour_api_origin.detailinfo2_12 tdi12
	USING (contentid)
UNION ALL
SELECT kpi.pNo, tdi15.fldgubun, tdi15.infoname, tdi15.infotext, tdi15.serialnum
	FROM k_tour_headquarter.placeinfo kpi
	JOIN tour_api_origin.detailinfo2_15 tdi15
	USING (contentid)
UNION ALL
SELECT kpi.pNo, tdi39.fldgubun, tdi39.infoname, tdi39.infotext, tdi39.serialnum
	FROM k_tour_headquarter.placeinfo kpi
	JOIN tour_api_origin.detailinfo2_39 tdi39
	USING (contentid);
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

-- ----------------------------------------INSERT------------------------------------------
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

-- ----------------------------------------marker JOIN TEST------------------------------------------
-- 강사님께 피드백 받은 후, getMarker 로직 구현
SELECT * FROM k_tour_headquarter.markersgps;
SELECT * FROM k_tour_headquarter.placeinfo;
SELECT * FROM k_tour_headquarter.contenttype;
SELECT kpi.pNo, kct.defaultMarker, kmg.mkURL, kmg.mapx, kmg.mapy
	FROM k_tour_headquarter.placeinfo kpi
	JOIN k_tour_headquarter.contenttype kct
	USING (ctNo)
    JOIN k_tour_headquarter.markersgps kmg
    USING (pNo)
    WHERE kmg.mapx > 128.3630474080145
    AND kmg.mapx < 128.73106927424288
    AND kmg.mapy > 37.95358854898442
    AND kmg.mapy < 38.12170649772779;