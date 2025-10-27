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
SELECT * FROM k_tour_headquarter.contenttype;		-- ctNo
SELECT * FROM k_tour_headquarter.ldongcode;			-- ldNo
SELECT * FROM k_tour_headquarter.categorycode;		-- ccNo

SELECT * FROM tour_api_origin.areabasedsynclist2;	-- contentid, title, showflag, firstImage, firstImage2, addr1, addr2, zipcode, tel
SELECT * FROM tour_api_origin.detailcommon2;		-- homepage, telname, overview

SELECT kcc.ccNo, tabsl2.lclsSystm3, kcc.lclsSystm3Cd
	FROM tour_api_origin.areabasedsynclist2 tabsl2
    LEFT OUTER JOIN k_tour_headquarter.categorycode kcc
    ON kcc.lclsSystm3Cd = UPPER(TRIM(REPLACE(REPLACE(REPLACE(REPLACE(tabsl2.lclsSystm3, CHAR(13), ''), CHAR(10), ''), CHAR(9), ''), ' ', '')));

SELECT kct.ctNo, tabsl2.contentid
	FROM tour_api_origin.areabasedsynclist2 tabsl2
    JOIN k_tour_headquarter.contenttype kct
    USING (contenttypeid);
SELECT ldc.ldNo, ldc.lDongRegnCd, tabsl2.lDongRegnCd, ldc.lDongSignguCd, tabsl2.lDongSignguCd
	FROM tour_api_origin.areabasedsynclist2 tabsl2
    LEFT OUTER JOIN k_tour_headquarter.ldongcode ldc
    ON tabsl2.lDongRegnCd = ldc.lDongRegnCd
    AND tabsl2.lDongSignguCd = ldc.lDongSignguCd;

-- FROM API 완료
SELECT kct.ctNo, ldc.ldNo, kcc.ccNo, tabsl2.contentid, tabsl2.title, tabsl2.showflag, tabsl2.firstimage, tabsl2.firstimage2, tabsl2.addr1, tabsl2.addr2, tabsl2.zipcode, tabsl2.tel, tdc2.homepage, tdc2.telname, tdc2.overview
	FROM tour_api_origin.areabasedsynclist2 tabsl2
    LEFT OUTER JOIN tour_api_origin.detailcommon2 tdc2
    USING (contentid)
    JOIN k_tour_headquarter.contenttype kct
    ON tabsl2.contenttypeid = kct.contenttypeid
    LEFT OUTER JOIN k_tour_headquarter.ldongcode ldc
    ON tabsl2.lDongRegnCd = ldc.lDongRegnCd
    AND tabsl2.lDongSignguCd = ldc.lDongSignguCd
    LEFT OUTER JOIN k_tour_headquarter.categorycode kcc
    ON kcc.lclsSystm3Cd = UPPER(TRIM(REPLACE(REPLACE(REPLACE(REPLACE(tabsl2.lclsSystm3, CHAR(13), ''), CHAR(10), ''), CHAR(9), ''), ' ', '')));
-- ----------------------------------------INSERT------------------------------------------
INSERT INTO k_tour_headquarter.placeinfo
	( ctNo, ldNo, ccNo, contentid, title, showflag, firstimage, firstimage2, addr1, addr2, zipcode, homepage, tel, telname, overview, createdAt, updatedAt )
	SELECT * FROM tour_api_origin.areabasedsynclist2;

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
SELECT * FROM k_tour_headquarter.markersgps;
SELECT * FROM k_tour_headquarter.placeinfo;
SELECT * FROM k_tour_headquarter.contenttype;
SELECT * FROM k_tour_headquarter.categorycode;
SELECT kpi.pNo, kpi.tel, kcc.lclsSystm2Nm, kcc.lclsSystm3Nm, kpi.title, kct.defaultMarker, kmg.mkURL, kmg.mapx, kmg.mapy, kpi.title, kpi.addr1, kpi.addr2, kpi.firstimage2, kct.contenttypename
	FROM k_tour_headquarter.placeinfo kpi
	JOIN k_tour_headquarter.contenttype kct
	USING (ctNo)
    JOIN k_tour_headquarter.markersgps kmg
    USING (pNo)
    JOIN k_tour_headquarter.categorycode kcc
    USING (ccNo)
    WHERE kmg.mapx > 128.3630474080145
    AND kmg.mapx < 128.73106927424288
    AND kmg.mapy > 37.95358854898442
    AND kmg.mapy < 38.12170649772779
    AND kct.ctNo = 1;
-- ----------------------------------------marker JOIN TEST------------------------------------------
SELECT * FROM k_tour_headquarter.ldongcode;
SELECT * FROM k_tour_headquarter.placeinfo;
SELECT * FROM k_tour_headquarter.markersgps;
SELECT kpi.pNo, kmg.mapx, kmg.mapy, kmg.mkURL
	FROM k_tour_headquarter.placeinfo kpi
    JOIN k_tour_headquarter.ldongcode klc
    USING (ldNo)
    JOIN k_tour_headquarter.markersgps kmg
    USING (pNO)
    WHERE klc.lDongRegnCd = 11
    AND klc.lDongSignguCd = 110;
    
-- ----------------------------------------placeInfo JOIN TEST------------------------------------------
SELECT * FROM k_tour_headquarter.placeinfo;
SELECT * FROM k_tour_headquarter.categorycode;
SELECT * FROM k_tour_headquarter.ldongcode;

SELECT kpi.*, kcc.lclsSystm2Nm, kcc.lclsSystm3Nm
	FROM k_tour_headquarter.placeinfo kpi
    JOIN k_tour_headquarter.categorycode kcc
    USING (ccNo);

SELECT * FROM k_tour_headquarter.markersgps WHERE pno = 23405;
    USING (ccNo);