-- ------------------------------------ k_tour_headquarter -------------------------------------------
-- ------------------------------------ 사이트정보(자체 테이블) -------------------------------------------
INSERT INTO k_tour_headquarter.SiteInfo
    (siName, siDomain, siIntro, siLogo, siFavicon, siMarker, siTel, siPrivacyOfficer, siEmail, siKeywords, siIsPublic)
VALUES
	('본사 사이트', 'ktour.kr', '본사의 메인 사이트입니다.', 'headquarterLogo.png', 'headquarterFavicon.png',
      'headquarterMarker.jpg', '032-521-8889', '김진숙', 'ktour@tjoeun.com', 'ktour, 여행지도, SaaS', 1);

-- ------------------------------------ 관리자정보(자체 테이블) -------------------------------------------
INSERT INTO k_tour_headquarter.manager 
    (siNo, mId, mPwd, mName, mNick, mGender, mPhone, mEmail, 
     mAdd1, mAdd2, mTermsAgreed, mLocationAgreed, mPushAgreed, memo, mgAuth)
VALUES
-- 1. 시스템 관리자
	(1,'admin','admin', '김진숙', 'admin', '여', '032-111-2222', 'root.kjs82@gmail.com',
     '인천광역시 부평구 경원대로 1368', NULL, TRUE, TRUE, TRUE, '본사(시스템관리자)입니다.', 1);

-- ------------------------------------ 콘텐츠타입( #TourAPI 연동테이블 ) -------------------------------------------
INSERT INTO k_tour_headquarter.contentType 
    (contenttypeid, contentTypeName, defaultMarker)
VALUES
    ('12', '관광지', 'tourSpot.png'),
    ('14', '문화시설', 'culturalFacilities.png'),
    ('15', '행사/공연/축제', 'festival.png'),
    ('25', '여행코스', 'travelCourse.png'),
    ('28', '레포츠', 'leports.png'),
    ('32', '숙박', 'stay.png'),
    ('38', '쇼핑', 'shopping.png'),
    ('39', '음식점', 'food.png');
-- [1] 카테고리 코드 동기화=========================================================
INSERT INTO k_tour_headquarter.categorycode ( rnum, lclsSystm1Cd, lclsSystm1Nm, lclsSystm2Cd, lclsSystm2Nm, lclsSystm3Cd, lclsSystm3Nm )
	SELECT rnum, lclsSystm1Cd, lclsSystm1Nm, lclsSystm2Cd, lclsSystm2Nm, lclsSystm3Cd, lclsSystm3Nm
	FROM tour_api_origin.lclssystmcode2;
-- [2] 법정동 코드 동기화=========================================================
INSERT INTO k_tour_headquarter.ldongcode ( rnum, lDongRegnCd, lDongRegnNm, lDongSignguCd, lDongSignguNm, mapy, mapx )
	SELECT rnum, lDongRegnCd, lDongRegnNm, lDongSignguCd, lDongSignguNm, 0.0, 0.0
	FROM tour_api_origin.ldongcode2;
-- [2] 법정동 코드 수정=========================================================
update k_tour_headquarter.ldongcode set mapx = 126.9791666667 , mapy = 37.5733611111 where ldno=1;
update k_tour_headquarter.ldongcode set mapx = 126.9975000000 , mapy = 37.5635833333 where ldno=2;
update k_tour_headquarter.ldongcode set mapx = 126.9904166667 , mapy = 37.5324722222 where ldno=3;
update k_tour_headquarter.ldongcode set mapx = 127.0368888889 , mapy = 37.5630555556 where ldno=4;
update k_tour_headquarter.ldongcode set mapx = 127.0822777778 , mapy = 37.5384722222 where ldno=5;
update k_tour_headquarter.ldongcode set mapx = 127.0397777778 , mapy = 37.5743611111 where ldno=6;
update k_tour_headquarter.ldongcode set mapx = 127.0925833333 , mapy = 37.6063611111 where ldno=7;
update k_tour_headquarter.ldongcode set mapx = 127.0167222222 , mapy = 37.5894166667 where ldno=8;
update k_tour_headquarter.ldongcode set mapx = 127.0256944444 , mapy = 37.6397777778 where ldno=9;
update k_tour_headquarter.ldongcode set mapx = 127.0471388889 , mapy = 37.6688055556 where ldno=10;
update k_tour_headquarter.ldongcode set mapx = 127.0564722222 , mapy = 37.6542777778 where ldno=11;
update k_tour_headquarter.ldongcode set mapx = 126.9291666667 , mapy = 37.6026388889 where ldno=12;
update k_tour_headquarter.ldongcode set mapx = 126.9368055556 , mapy = 37.5791388889 where ldno=13;
update k_tour_headquarter.ldongcode set mapx = 126.9013888889 , mapy = 37.5663888889 where ldno=14;
update k_tour_headquarter.ldongcode set mapx = 126.8665277778 , mapy = 37.5170833333 where ldno=15;
update k_tour_headquarter.ldongcode set mapx = 126.8495833333 , mapy = 37.5509722222 where ldno=16;
update k_tour_headquarter.ldongcode set mapx = 126.8874166667 , mapy = 37.4954166667 where ldno=17;
update k_tour_headquarter.ldongcode set mapx = 126.8955277778 , mapy = 37.4568611111 where ldno=18;
update k_tour_headquarter.ldongcode set mapx = 126.8962777778 , mapy = 37.5263611111 where ldno=19;
update k_tour_headquarter.ldongcode set mapx = 126.9395000000 , mapy = 37.5124166667 where ldno=20;
update k_tour_headquarter.ldongcode set mapx = 126.9515833333 , mapy = 37.4784166667 where ldno=21;
update k_tour_headquarter.ldongcode set mapx = 127.0325000000 , mapy = 37.4836666667 where ldno=22;
update k_tour_headquarter.ldongcode set mapx = 127.0473333333 , mapy = 37.5172222222 where ldno=23;
update k_tour_headquarter.ldongcode set mapx = 127.1058888889 , mapy = 37.5145833333 where ldno=24;
update k_tour_headquarter.ldongcode set mapx = 127.1237777778 , mapy = 37.5300833333 where ldno=25;
update k_tour_headquarter.ldongcode set mapx = 129.0323611111 , mapy = 35.1065000000 where ldno=26;
update k_tour_headquarter.ldongcode set mapx = 129.0244444444 , mapy = 35.0970833333 where ldno=27;
update k_tour_headquarter.ldongcode set mapx = 129.0455833333 , mapy = 35.1294444444 where ldno=28;
update k_tour_headquarter.ldongcode set mapx = 129.0673611111 , mapy = 35.0916666667 where ldno=29;
update k_tour_headquarter.ldongcode set mapx = 129.0530555556 , mapy = 35.1627777778 where ldno=30;
update k_tour_headquarter.ldongcode set mapx = 129.0783888889 , mapy = 35.2047222222 where ldno=31;
update k_tour_headquarter.ldongcode set mapx = 129.0843888889 , mapy = 35.1363333333 where ldno=32;
update k_tour_headquarter.ldongcode set mapx = 128.9907777778 , mapy = 35.1977777778 where ldno=33;
update k_tour_headquarter.ldongcode set mapx = 129.1632777778 , mapy = 35.1630833333 where ldno=34;
update k_tour_headquarter.ldongcode set mapx = 128.9744166667 , mapy = 35.1044444444 where ldno=35;
update k_tour_headquarter.ldongcode set mapx = 129.0922222222 , mapy = 35.2429444444 where ldno=36;
update k_tour_headquarter.ldongcode set mapx = 128.9804722222 , mapy = 35.2119444444 where ldno=37;
update k_tour_headquarter.ldongcode set mapx = 129.0797222222 , mapy = 35.1763888889 where ldno=38;
update k_tour_headquarter.ldongcode set mapx = 129.1134166667 , mapy = 35.1454166667 where ldno=39;
update k_tour_headquarter.ldongcode set mapx = 128.9910833333 , mapy = 35.1523611111 where ldno=40;
update k_tour_headquarter.ldongcode set mapx = 129.2219444444 , mapy = 35.2443333333 where ldno=41;
update k_tour_headquarter.ldongcode set mapx = 128.6061111111 , mapy = 35.8691388889 where ldno=42;
update k_tour_headquarter.ldongcode set mapx = 128.6348055556 , mapy = 35.8896666667 where ldno=43;
update k_tour_headquarter.ldongcode set mapx = 128.5590277778 , mapy = 35.8719444444 where ldno=44;
update k_tour_headquarter.ldongcode set mapx = 128.5975833333 , mapy = 35.8463888889 where ldno=45;
update k_tour_headquarter.ldongcode set mapx = 128.5827777778 , mapy = 35.8856944444 where ldno=46;
update k_tour_headquarter.ldongcode set mapx = 128.6308333333 , mapy = 35.8584166667 where ldno=47;
update k_tour_headquarter.ldongcode set mapx = 128.5325555556 , mapy = 35.8296944444 where ldno=48;
update k_tour_headquarter.ldongcode set mapx = 128.4310833333 , mapy = 35.7749722222 where ldno=49;
update k_tour_headquarter.ldongcode set mapx = 128.5732777778 , mapy = 36.2426388889 where ldno=50;
update k_tour_headquarter.ldongcode set mapx = 126.6214722222 , mapy = 37.4737222222 where ldno=51;
update k_tour_headquarter.ldongcode set mapx = 126.6432222222 , mapy = 37.4739166667 where ldno=52;
update k_tour_headquarter.ldongcode set mapx = 126.6504722222 , mapy = 37.4635833333 where ldno=53;
update k_tour_headquarter.ldongcode set mapx = 126.6784444444 , mapy = 37.4105555556 where ldno=54;
update k_tour_headquarter.ldongcode set mapx = 126.7313888889 , mapy = 37.4470000000 where ldno=55;
update k_tour_headquarter.ldongcode set mapx = 126.7217777778 , mapy = 37.5070555556 where ldno=56;
update k_tour_headquarter.ldongcode set mapx = 126.7378888889 , mapy = 37.5376388889 where ldno=57;
update k_tour_headquarter.ldongcode set mapx = 126.6758333333 , mapy = 37.5451944444 where ldno=58;
update k_tour_headquarter.ldongcode set mapx = 126.4876111111 , mapy = 37.7467222222 where ldno=59;
update k_tour_headquarter.ldongcode set mapx = 126.6367500000 , mapy = 37.4462222222 where ldno=60;
update k_tour_headquarter.ldongcode set mapx = 126.9228888889 , mapy = 35.1458888889 where ldno=61;
update k_tour_headquarter.ldongcode set mapx = 126.8897222222 , mapy = 35.1522500000 where ldno=62;
update k_tour_headquarter.ldongcode set mapx = 126.9024166667 , mapy = 35.1327222222 where ldno=63;
update k_tour_headquarter.ldongcode set mapx = 126.9118055556 , mapy = 35.1740277778 where ldno=64;
update k_tour_headquarter.ldongcode set mapx = 126.7936388889 , mapy = 35.1396111111 where ldno=65;
update k_tour_headquarter.ldongcode set mapx = 127.4548333333 , mapy = 36.3504444444 where ldno=66;
update k_tour_headquarter.ldongcode set mapx = 127.4213333333 , mapy = 36.3255833333 where ldno=67;
update k_tour_headquarter.ldongcode set mapx = 127.3836111111 , mapy = 36.3555000000 where ldno=68;
update k_tour_headquarter.ldongcode set mapx = 127.3566666667 , mapy = 36.3623055556 where ldno=69;
update k_tour_headquarter.ldongcode set mapx = 127.4185000000 , mapy = 36.3691388889 where ldno=70;
update k_tour_headquarter.ldongcode set mapx = 129.3335555556 , mapy = 35.5694444444 where ldno=71;
update k_tour_headquarter.ldongcode set mapx = 129.3300555556 , mapy = 35.5447222222 where ldno=72;
update k_tour_headquarter.ldongcode set mapx = 129.4165000000 , mapy = 35.5048611111 where ldno=73;
update k_tour_headquarter.ldongcode set mapx = 129.3613611111 , mapy = 35.5827222222 where ldno=74;
update k_tour_headquarter.ldongcode set mapx = 129.1544166667 , mapy = 35.5509722222 where ldno=75;
update k_tour_headquarter.ldongcode set mapx = 127.2890000000 , mapy = 36.4800833333 where ldno=76;
update k_tour_headquarter.ldongcode set mapx = 127.0286111111 , mapy = 37.2635833333 where ldno=77;
update k_tour_headquarter.ldongcode set mapx = 127.0095555556 , mapy = 37.3007777778 where ldno=78;
update k_tour_headquarter.ldongcode set mapx = 126.9729722222 , mapy = 37.2587222222 where ldno=79;
update k_tour_headquarter.ldongcode set mapx = 127.0129444444 , mapy = 37.2796666667 where ldno=80;
update k_tour_headquarter.ldongcode set mapx = 127.0775000000 , mapy = 37.2527222222 where ldno=81;
update k_tour_headquarter.ldongcode set mapx = 127.1265833333 , mapy = 37.4200833333 where ldno=82;
update k_tour_headquarter.ldongcode set mapx = 127.1463333333 , mapy = 37.4486388889 where ldno=83;
update k_tour_headquarter.ldongcode set mapx = 127.1548333333 , mapy = 37.4341666667 where ldno=84;
update k_tour_headquarter.ldongcode set mapx = 127.1188333333 , mapy = 37.3822777778 where ldno=85;
update k_tour_headquarter.ldongcode set mapx = 127.0337777778 , mapy = 37.7381111111 where ldno=86;
update k_tour_headquarter.ldongcode set mapx = 126.9569444444 , mapy = 37.3942777778 where ldno=87;
update k_tour_headquarter.ldongcode set mapx = 126.9512222222 , mapy = 37.3836666667 where ldno=88;
update k_tour_headquarter.ldongcode set mapx = 126.9638888889 , mapy = 37.3913888889 where ldno=89;
update k_tour_headquarter.ldongcode set mapx = 126.7661111111 , mapy = 37.5034444444 where ldno=90;
update k_tour_headquarter.ldongcode set mapx = 126.7661111111 , mapy = 37.5034444444 where ldno=91;
update k_tour_headquarter.ldongcode set mapx = 126.7906944444 , mapy = 37.4865555556 where ldno=92;
update k_tour_headquarter.ldongcode set mapx = 126.7935000000 , mapy = 37.5475000000 where ldno=93;
update k_tour_headquarter.ldongcode set mapx = 126.8655555556 , mapy = 37.4786111111 where ldno=94;
update k_tour_headquarter.ldongcode set mapx = 127.1128333333 , mapy = 36.9920555556 where ldno=95;
update k_tour_headquarter.ldongcode set mapx = 127.0605555556 , mapy = 37.9031666667 where ldno=96;
update k_tour_headquarter.ldongcode set mapx = 126.8308333333 , mapy = 37.3216666667 where ldno=97;
update k_tour_headquarter.ldongcode set mapx = 126.8495000000 , mapy = 37.2998055556 where ldno=98;
update k_tour_headquarter.ldongcode set mapx = 126.7937500000 , mapy = 37.3161666667 where ldno=99;
update k_tour_headquarter.ldongcode set mapx = 126.8320555556 , mapy = 37.6583888889 where ldno=100;
update k_tour_headquarter.ldongcode set mapx = 126.8663888889 , mapy = 37.6493611111 where ldno=101;
update k_tour_headquarter.ldongcode set mapx = 126.7732222222 , mapy = 37.6987777778 where ldno=102;
update k_tour_headquarter.ldongcode set mapx = 126.7391666667 , mapy = 37.6773611111 where ldno=103;
update k_tour_headquarter.ldongcode set mapx = 127.0138888889 , mapy = 37.4291111111 where ldno=104;
update k_tour_headquarter.ldongcode set mapx = 127.1297777778 , mapy = 37.5942777778 where ldno=105;
update k_tour_headquarter.ldongcode set mapx = 127.2163888889 , mapy = 37.6361111111 where ldno=106;
update k_tour_headquarter.ldongcode set mapx = 127.0771388889 , mapy = 37.1497777778 where ldno=107;
update k_tour_headquarter.ldongcode set mapx = 126.8026666667 , mapy = 37.3800833333 where ldno=108;
update k_tour_headquarter.ldongcode set mapx = 126.9352222222 , mapy = 37.3616388889 where ldno=109;
update k_tour_headquarter.ldongcode set mapx = 126.9683888889 , mapy = 37.3446111111 where ldno=110;
update k_tour_headquarter.ldongcode set mapx = 127.2053333333 , mapy = 37.5388888889 where ldno=111;
update k_tour_headquarter.ldongcode set mapx = 127.1775555556 , mapy = 37.2411111111 where ldno=112;
update k_tour_headquarter.ldongcode set mapx = 127.2019722222 , mapy = 37.2329444444 where ldno=113;
update k_tour_headquarter.ldongcode set mapx = 127.1158888889 , mapy = 37.2757222222 where ldno=114;
update k_tour_headquarter.ldongcode set mapx = 127.0981666667 , mapy = 37.3208333333 where ldno=115;
update k_tour_headquarter.ldongcode set mapx = 126.7800555556 , mapy = 37.7594166667 where ldno=116;
update k_tour_headquarter.ldongcode set mapx = 127.4350000000 , mapy = 37.2721388889 where ldno=117;
update k_tour_headquarter.ldongcode set mapx = 127.2797222222 , mapy = 37.0077500000 where ldno=118;
update k_tour_headquarter.ldongcode set mapx = 126.7158333333 , mapy = 37.6151666667 where ldno=119;
update k_tour_headquarter.ldongcode set mapx = 126.8311666667 , mapy = 37.1990000000 where ldno=120;
update k_tour_headquarter.ldongcode set mapx = 127.2552222222 , mapy = 37.4293611111 where ldno=121;
update k_tour_headquarter.ldongcode set mapx = 127.0458888889 , mapy = 37.7852777778 where ldno=122;
update k_tour_headquarter.ldongcode set mapx = 127.2001111111 , mapy = 37.8948333333 where ldno=123;
update k_tour_headquarter.ldongcode set mapx = 127.6371666667 , mapy = 37.2979444444 where ldno=124;
update k_tour_headquarter.ldongcode set mapx = 127.0752777778 , mapy = 38.0962777778 where ldno=125;
update k_tour_headquarter.ldongcode set mapx = 127.5097222222 , mapy = 37.8312777778 where ldno=126;
update k_tour_headquarter.ldongcode set mapx = 127.4874444444 , mapy = 37.4912777778 where ldno=127;
update k_tour_headquarter.ldongcode set mapx = 127.4890000000 , mapy = 36.6424166667 where ldno=128;
update k_tour_headquarter.ldongcode set mapx = 127.4906944444 , mapy = 36.6379722222 where ldno=129;
update k_tour_headquarter.ldongcode set mapx = 127.4379166667 , mapy = 36.6387777778 where ldno=130;
update k_tour_headquarter.ldongcode set mapx = 127.4276666667 , mapy = 36.6359166667 where ldno=131;
update k_tour_headquarter.ldongcode set mapx = 127.4865555556 , mapy = 36.7104166667 where ldno=132;
update k_tour_headquarter.ldongcode set mapx = 127.9261388889 , mapy = 36.9910277778 where ldno=133;
update k_tour_headquarter.ldongcode set mapx = 128.1909166667 , mapy = 37.1325000000 where ldno=134;
update k_tour_headquarter.ldongcode set mapx = 127.7293888889 , mapy = 36.4894444444 where ldno=135;
update k_tour_headquarter.ldongcode set mapx = 127.5718333333 , mapy = 36.3006388889 where ldno=136;
update k_tour_headquarter.ldongcode set mapx = 127.7836666667 , mapy = 36.1751666667 where ldno=137;
update k_tour_headquarter.ldongcode set mapx = 127.5821944444 , mapy = 36.7849444444 where ldno=138;
update k_tour_headquarter.ldongcode set mapx = 127.4362222222 , mapy = 36.8551111111 where ldno=139;
update k_tour_headquarter.ldongcode set mapx = 127.7871388889 , mapy = 36.8156111111 where ldno=140;
update k_tour_headquarter.ldongcode set mapx = 127.6922222222 , mapy = 36.9404166667 where ldno=141;
update k_tour_headquarter.ldongcode set mapx = 128.3658888889 , mapy = 36.9844444444 where ldno=142;
update k_tour_headquarter.ldongcode set mapx = 127.1139722222 , mapy = 36.8150833333 where ldno=143;
update k_tour_headquarter.ldongcode set mapx = 127.1528888889 , mapy = 36.7929444444 where ldno=144;
update k_tour_headquarter.ldongcode set mapx = 127.1171944444 , mapy = 36.8272777778 where ldno=145;
update k_tour_headquarter.ldongcode set mapx = 127.1192222222 , mapy = 36.4461388889 where ldno=146;
update k_tour_headquarter.ldongcode set mapx = 126.6128888889 , mapy = 36.3331944444 where ldno=147;
update k_tour_headquarter.ldongcode set mapx = 127.0017777778 , mapy = 36.7895555556 where ldno=148;
update k_tour_headquarter.ldongcode set mapx = 126.4502222222 , mapy = 36.7845277778 where ldno=149;
update k_tour_headquarter.ldongcode set mapx = 127.0987777778 , mapy = 36.1869166667 where ldno=150;
update k_tour_headquarter.ldongcode set mapx = 127.2481388889 , mapy = 36.2742222222 where ldno=151;
update k_tour_headquarter.ldongcode set mapx = 126.6475000000 , mapy = 36.8930555556 where ldno=152;
update k_tour_headquarter.ldongcode set mapx = 127.4882222222 , mapy = 36.1086944444 where ldno=153;
update k_tour_headquarter.ldongcode set mapx = 126.9099444444 , mapy = 36.2755555556 where ldno=154;
update k_tour_headquarter.ldongcode set mapx = 126.6917222222 , mapy = 36.0804166667 where ldno=155;
update k_tour_headquarter.ldongcode set mapx = 126.8022777778 , mapy = 36.4592222222 where ldno=156;
update k_tour_headquarter.ldongcode set mapx = 126.6649444444 , mapy = 36.6010833333 where ldno=157;
update k_tour_headquarter.ldongcode set mapx = 126.8502777778 , mapy = 36.6827777778 where ldno=158;
update k_tour_headquarter.ldongcode set mapx = 126.2978888889 , mapy = 36.7454444444 where ldno=159;
update k_tour_headquarter.ldongcode set mapx = 126.3922777778 , mapy = 34.8118055556 where ldno=160;
update k_tour_headquarter.ldongcode set mapx = 127.6622222222 , mapy = 34.7604166667 where ldno=161;
update k_tour_headquarter.ldongcode set mapx = 127.4875555556 , mapy = 34.9506388889 where ldno=162;
update k_tour_headquarter.ldongcode set mapx = 126.7106944444 , mapy = 35.0160833333 where ldno=163;
update k_tour_headquarter.ldongcode set mapx = 127.6958333333 , mapy = 34.9404166667 where ldno=164;
update k_tour_headquarter.ldongcode set mapx = 126.9882222222 , mapy = 35.3208888889 where ldno=165;
update k_tour_headquarter.ldongcode set mapx = 127.2918333333 , mapy = 35.2819444444 where ldno=166;
update k_tour_headquarter.ldongcode set mapx = 127.4635555556 , mapy = 35.2020555556 where ldno=167;
update k_tour_headquarter.ldongcode set mapx = 127.2753888889 , mapy = 34.6112777778 where ldno=168;
update k_tour_headquarter.ldongcode set mapx = 127.0800000000 , mapy = 34.7713055556 where ldno=169;
update k_tour_headquarter.ldongcode set mapx = 126.9862777778 , mapy = 35.0641666667 where ldno=170;
update k_tour_headquarter.ldongcode set mapx = 126.9069166667 , mapy = 34.6813611111 where ldno=171;
update k_tour_headquarter.ldongcode set mapx = 126.7671388889 , mapy = 34.6420000000 where ldno=172;
update k_tour_headquarter.ldongcode set mapx = 126.5986666667 , mapy = 34.5732222222 where ldno=173;
update k_tour_headquarter.ldongcode set mapx = 126.6966666667 , mapy = 34.8003333333 where ldno=174;
update k_tour_headquarter.ldongcode set mapx = 126.4816666667 , mapy = 34.9906388889 where ldno=175;
update k_tour_headquarter.ldongcode set mapx = 126.5158333333 , mapy = 35.0660000000 where ldno=176;
update k_tour_headquarter.ldongcode set mapx = 126.5119444444 , mapy = 35.2772777778 where ldno=177;
update k_tour_headquarter.ldongcode set mapx = 126.7843611111 , mapy = 35.3013611111 where ldno=178;
update k_tour_headquarter.ldongcode set mapx = 126.7553055556 , mapy = 34.3111111111 where ldno=179;
update k_tour_headquarter.ldongcode set mapx = 126.2637777778 , mapy = 34.4867222222 where ldno=180;
update k_tour_headquarter.ldongcode set mapx = 126.1062222222 , mapy = 34.8260555556 where ldno=181;
update k_tour_headquarter.ldongcode set mapx = 129.3434722222 , mapy = 36.0190277778 where ldno=182;
update k_tour_headquarter.ldongcode set mapx = 129.3434722222 , mapy = 36.0190277778 where ldno=183;
update k_tour_headquarter.ldongcode set mapx = 129.3651666667 , mapy = 36.0567222222 where ldno=184;
update k_tour_headquarter.ldongcode set mapx = 129.2246666667 , mapy = 35.8561944444 where ldno=185;
update k_tour_headquarter.ldongcode set mapx = 128.1136666667 , mapy = 36.1395555556 where ldno=186;
update k_tour_headquarter.ldongcode set mapx = 128.7293888889 , mapy = 36.5683888889 where ldno=187;
update k_tour_headquarter.ldongcode set mapx = 128.3445833333 , mapy = 36.1195000000 where ldno=188;
update k_tour_headquarter.ldongcode set mapx = 128.6239166667 , mapy = 36.8056944444 where ldno=189;
update k_tour_headquarter.ldongcode set mapx = 128.9386666667 , mapy = 35.9731666667 where ldno=190;
update k_tour_headquarter.ldongcode set mapx = 128.1590833333 , mapy = 36.4108888889 where ldno=191;
update k_tour_headquarter.ldongcode set mapx = 128.1869444444 , mapy = 36.5864166667 where ldno=192;
update k_tour_headquarter.ldongcode set mapx = 128.7413888889 , mapy = 35.8250000000 where ldno=193;
update k_tour_headquarter.ldongcode set mapx = 128.6968888889 , mapy = 36.3525555556 where ldno=194;
update k_tour_headquarter.ldongcode set mapx = 129.0566666667 , mapy = 36.4366666667 where ldno=195;
update k_tour_headquarter.ldongcode set mapx = 129.1125000000 , mapy = 36.6666666667 where ldno=196;
update k_tour_headquarter.ldongcode set mapx = 129.3657777778 , mapy = 36.4149166667 where ldno=197;
update k_tour_headquarter.ldongcode set mapx = 128.7352777778 , mapy = 35.6472222222 where ldno=198;
update k_tour_headquarter.ldongcode set mapx = 128.2625833333 , mapy = 35.7276388889 where ldno=199;
update k_tour_headquarter.ldongcode set mapx = 128.2824722222 , mapy = 35.9191666667 where ldno=200;
update k_tour_headquarter.ldongcode set mapx = 128.4019444444 , mapy = 35.9945833333 where ldno=201;
update k_tour_headquarter.ldongcode set mapx = 128.4527777778 , mapy = 36.6566666667 where ldno=202;
update k_tour_headquarter.ldongcode set mapx = 128.7326388889 , mapy = 36.8930555556 where ldno=203;
update k_tour_headquarter.ldongcode set mapx = 129.4005277778 , mapy = 36.9930555556 where ldno=204;
update k_tour_headquarter.ldongcode set mapx = 130.9058888889 , mapy = 37.4845277778 where ldno=205;
update k_tour_headquarter.ldongcode set mapx = 128.6813611111 , mapy = 35.2279166667 where ldno=206;
update k_tour_headquarter.ldongcode set mapx = 128.6934166667 , mapy = 35.2536388889 where ldno=207;
update k_tour_headquarter.ldongcode set mapx = 128.6807777778 , mapy = 35.2260833333 where ldno=208;
update k_tour_headquarter.ldongcode set mapx = 128.5700555556 , mapy = 35.1334166667 where ldno=209;
update k_tour_headquarter.ldongcode set mapx = 128.5802777778 , mapy = 35.2108611111 where ldno=210;
update k_tour_headquarter.ldongcode set mapx = 128.7096944444 , mapy = 35.1335555556 where ldno=211;
update k_tour_headquarter.ldongcode set mapx = 128.1076666667 , mapy = 35.1798611111 where ldno=212;
update k_tour_headquarter.ldongcode set mapx = 128.4331666667 , mapy = 34.8543333333 where ldno=213;
update k_tour_headquarter.ldongcode set mapx = 128.0644444444 , mapy = 35.0035833333 where ldno=214;
update k_tour_headquarter.ldongcode set mapx = 128.8893055556 , mapy = 35.2284722222 where ldno=215;
update k_tour_headquarter.ldongcode set mapx = 128.7464722222 , mapy = 35.5036388889 where ldno=216;
update k_tour_headquarter.ldongcode set mapx = 128.6216666667 , mapy = 34.8805833333 where ldno=217;
update k_tour_headquarter.ldongcode set mapx = 129.0372777778 , mapy = 35.3350833333 where ldno=218;
update k_tour_headquarter.ldongcode set mapx = 128.2613333333 , mapy = 35.3222222222 where ldno=219;
update k_tour_headquarter.ldongcode set mapx = 128.4060833333 , mapy = 35.2726666667 where ldno=220;
update k_tour_headquarter.ldongcode set mapx = 128.4921666667 , mapy = 35.5448333333 where ldno=221;
update k_tour_headquarter.ldongcode set mapx = 128.3228333333 , mapy = 34.9731944444 where ldno=222;
update k_tour_headquarter.ldongcode set mapx = 127.8923333333 , mapy = 34.8377222222 where ldno=223;
update k_tour_headquarter.ldongcode set mapx = 127.7514722222 , mapy = 35.0673888889 where ldno=224;
update k_tour_headquarter.ldongcode set mapx = 127.8735000000 , mapy = 35.4154166667 where ldno=225;
update k_tour_headquarter.ldongcode set mapx = 127.7254444444 , mapy = 35.5203611111 where ldno=226;
update k_tour_headquarter.ldongcode set mapx = 127.9092777778 , mapy = 35.6866666667 where ldno=227;
update k_tour_headquarter.ldongcode set mapx = 128.1657777778 , mapy = 35.5663888889 where ldno=228;
update k_tour_headquarter.ldongcode set mapx = 126.5311666667 , mapy = 33.4995555556 where ldno=229;
update k_tour_headquarter.ldongcode set mapx = 126.5601111111 , mapy = 33.2538055556 where ldno=230;
update k_tour_headquarter.ldongcode set mapx = 127.7298333333 , mapy = 37.8813888889 where ldno=231;
update k_tour_headquarter.ldongcode set mapx = 127.9201944444 , mapy = 37.3421666667 where ldno=232;
update k_tour_headquarter.ldongcode set mapx = 128.8760555556 , mapy = 37.7516111111 where ldno=233;
update k_tour_headquarter.ldongcode set mapx = 129.1143333333 , mapy = 37.5245833333 where ldno=234;
update k_tour_headquarter.ldongcode set mapx = 128.9856944444 , mapy = 37.1640000000 where ldno=235;
update k_tour_headquarter.ldongcode set mapx = 128.5916388889 , mapy = 38.2070555556 where ldno=236;
update k_tour_headquarter.ldongcode set mapx = 129.1651666667 , mapy = 37.4500833333 where ldno=237;
update k_tour_headquarter.ldongcode set mapx = 127.8883888889 , mapy = 37.6974166667 where ldno=238;
update k_tour_headquarter.ldongcode set mapx = 127.9851666667 , mapy = 37.4826944444 where ldno=239;
update k_tour_headquarter.ldongcode set mapx = 128.4614166667 , mapy = 37.1835555556 where ldno=240;
update k_tour_headquarter.ldongcode set mapx = 128.3904444444 , mapy = 37.3703611111 where ldno=241;
update k_tour_headquarter.ldongcode set mapx = 128.6607222222 , mapy = 37.3808333333 where ldno=242;
update k_tour_headquarter.ldongcode set mapx = 127.3136111111 , mapy = 38.1467222222 where ldno=243;
update k_tour_headquarter.ldongcode set mapx = 127.7083333333 , mapy = 38.1062777778 where ldno=244;
update k_tour_headquarter.ldongcode set mapx = 127.9898888889 , mapy = 38.1098611111 where ldno=245;
update k_tour_headquarter.ldongcode set mapx = 128.1705833333 , mapy = 38.0695000000 where ldno=246;
update k_tour_headquarter.ldongcode set mapx = 128.4682222222 , mapy = 38.3806388889 where ldno=247;
update k_tour_headquarter.ldongcode set mapx = 128.6191944444 , mapy = 38.0755555556 where ldno=248;
update k_tour_headquarter.ldongcode set mapx = 127.1479444444 , mapy = 35.8242222222 where ldno=249;
update k_tour_headquarter.ldongcode set mapx = 127.1440833333 , mapy = 35.8166666667 where ldno=250;
update k_tour_headquarter.ldongcode set mapx = 127.1367777778 , mapy = 35.8495000000 where ldno=251;
update k_tour_headquarter.ldongcode set mapx = 126.7369444444 , mapy = 35.9676388889 where ldno=252;
update k_tour_headquarter.ldongcode set mapx = 126.9577777778 , mapy = 35.9483888889 where ldno=253;
update k_tour_headquarter.ldongcode set mapx = 126.8559166667 , mapy = 35.5697222222 where ldno=254;
update k_tour_headquarter.ldongcode set mapx = 127.3903333333 , mapy = 35.4163333333 where ldno=255;
update k_tour_headquarter.ldongcode set mapx = 126.8809166667 , mapy = 35.8035555556 where ldno=256;
update k_tour_headquarter.ldongcode set mapx = 127.1637777778 , mapy = 35.9039444444 where ldno=257;
update k_tour_headquarter.ldongcode set mapx = 127.4247777778 , mapy = 35.7916666667 where ldno=258;
update k_tour_headquarter.ldongcode set mapx = 127.6609444444 , mapy = 36.0070277778 where ldno=259;
update k_tour_headquarter.ldongcode set mapx = 127.5215833333 , mapy = 35.6476388889 where ldno=260;
update k_tour_headquarter.ldongcode set mapx = 127.2862777778 , mapy = 35.6175555556 where ldno=261;
update k_tour_headquarter.ldongcode set mapx = 127.1375000000 , mapy = 35.3742777778 where ldno=262;
update k_tour_headquarter.ldongcode set mapx = 126.7020277778 , mapy = 35.4348611111 where ldno=263;
update k_tour_headquarter.ldongcode set mapx = 126.7333611111 , mapy = 35.7313888889 where ldno=264;
-- [3] 관광정보 동기화 목록 동기화 =========================================================
INSERT INTO k_tour_headquarter.placeinfo (ctNo, ldNo, ccNo, contentid, title, showflag, firstimage, firstimage2, addr1, addr2, zipcode, homepage, tel, telname, overview)
	SELECT kct.ctNo, ldc.ldNo, kcc.ccNo, tabsl2.contentid, tabsl2.title, tabsl2.showflag, tabsl2.firstimage, tabsl2.firstimage2, tabsl2.addr1, tabsl2.addr2, tabsl2.zipcode, tdc2.homepage, tabsl2.tel, tdc2.telname, tdc2.overview
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
    
-- [4] 지도마커GPS 동기화 =========================================================
INSERT INTO k_tour_headquarter.markersgps (pNo, mapx, mapy)
	SELECT kpi.pNo, tabsl2.mapx, tabsl2.mapy
		FROM k_tour_headquarter.placeinfo kpi
		LEFT OUTER JOIN tour_api_origin.areabasedsynclist2 tabsl2
		USING (contentid)
		WHERE tabsl2.mapy < 1000;
-- [5] Place상세이미지 동기화 =========================================================
INSERT INTO k_tour_headquarter.placeimagedetail (pNo, serialnum, originimgurl, smallimageurl, imgname)
	SELECT kpi.pNo, tdi.serialnum, tdi.originimgurl, tdi.smallimageurl, tdi.imgname
		FROM k_tour_headquarter.placeinfo kpi
		JOIN tour_api_origin.detailimage2 tdi
		USING (contentid);
-- [6] 반려동물 동반여행정보 동기화 =========================================================
INSERT INTO k_tour_headquarter.detailpettour (pNo, relaAcdntRiskMtr, acmpyTypeCd, relaPosesFclty, relaFrnshPrdlst, etcAcmpyInfo, relaPurcPrdlst, acmpyPsblCpam, relaRntlPrdlst, acmpyNeedMtr)
SELECT kpi.pNo, tdpt.relaAcdntRiskMtr, tdpt.acmpyTypeCd, tdpt.relaPosesFclty, tdpt.relaFrnshPrdlst,
	tdpt.etcAcmpyInfo, tdpt.relaPurcPrdlst, tdpt.acmpyPsblCpam, tdpt.relaRntlPrdlst, tdpt.acmpyNeedMtr
	FROM k_tour_headquarter.placeinfo kpi
	JOIN tour_api_origin.detailpettour2 tdpt
	USING (contentid);
-- [7] 관광지 상세정보 동기화 =========================================================
INSERT INTO k_tour_headquarter.tourintro
		(pNo, accomcount, chkbabycarriage, chkcreditcard, chkpet, expagerange, expguide,
		 heritage1, heritage2, heritage3, infocenter, opendate, parking, restdate, useseason, usetime)
	SELECT kpi.pNo, tdi12.accomcount, tdi12.chkbabycarriage, tdi12.chkcreditcard, tdi12.chkpet, tdi12.expagerange, tdi12.expguide,
		   tdi12.heritage1, tdi12.heritage2, tdi12.heritage3, tdi12.infocenter, tdi12.opendate, tdi12.parking, tdi12.restdate, tdi12.useseason, tdi12.usetime
		FROM k_tour_headquarter.placeinfo kpi
		JOIN tour_api_origin.detailintro2_12 tdi12
		USING (contentid);
-- [8] 축제행사공여 상세정보 동기화 =========================================================
INSERT INTO k_tour_headquarter.festivalIntro
		(pNo, eventstartdate, eventenddate, progresstype, festivaltype, agelimit, bookingplace, discountinfofestival, eventhomepage, eventplace,
		 festivalgrade, placeinfo, playtime, program, spendtimefestival, sponsor1, sponsor1tel, sponsor2, sponsor2tel, subevent, usetimefestival)
	SELECT kpi.pNo, tdi15.eventstartdate, tdi15.eventenddate, tdi15.progresstype, tdi15.festivaltype, tdi15.agelimit, tdi15.bookingplace, tdi15.discountinfofestival, tdi15.eventhomepage, tdi15.eventplace,
		   tdi15.festivalgrade, tdi15.placeinfo, tdi15.playtime, tdi15.program, tdi15.spendtimefestival, tdi15.sponsor1, tdi15.sponsor1tel, tdi15.sponsor2, tdi15.sponsor2tel, tdi15.subevent, tdi15.usetimefestival
		FROM k_tour_headquarter.placeinfo kpi
		JOIN tour_api_origin.detailintro2_15 tdi15
		USING (contentid);
-- [9] 음식점 상세정보 동기화 =========================================================
INSERT INTO k_tour_headquarter.restaurantintro
		(pNo, chkcreditcardfood, discountinfofood, firstmenu, infocenterfood, kidsfacility, lcnsno, opendatefood,
		 opentimefood, packing, parkingfood, reservationfood, restdatefood, scalefood, seat, smoking, treatmenu)
	SELECT kpi.pNo, tdi39.chkcreditcardfood, tdi39.discountinfofood, tdi39.firstmenu, tdi39.infocenterfood, tdi39.kidsfacility, tdi39.lcnsno, tdi39.opendatefood,
		   tdi39.opentimefood, tdi39.packing, tdi39.parkingfood, tdi39.reservationfood, tdi39.restdatefood, tdi39.scalefood, tdi39.seat, tdi39.smoking, tdi39.treatmenu
		FROM k_tour_headquarter.placeinfo kpi
		JOIN tour_api_origin.detailintro2_39 tdi39
		USING (contentid);
-- [10] Place 반복정보 동기화 =========================================================
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
-- ------------------------------------ 푸시 알람 (+배너) -------------------------------------------
INSERT INTO k_tour_headquarter.pushPopup
	(pNo, mgNo, ppTitle, ppContent, ppImg, ppUse, ppType, ppStart, ppEnd, ppIterated)
VALUES
-- 송지호 해수욕장 페스티벌
	('20543', 1, '송지호 해수욕장 페스티벌', '9월 6일(토) 송지호 해수욕장에서 휴스테이와 함께합니다! 초대가수: 센턴, 우즈',
	 "songjihoFestival.jpg", 1, 2, '2025-09-25 12:00:00', '2025-10-5 21:00:00', '12:00:00'),
-- 공방 스테이 박보검 사인회
	('30033', null, '공방 스테이 박보검 사인회', '9월 21일(일) 공방 스테이에서 배우 박보검 사인회가 열립니다! 선착순 100명!',
	 'gongbangStay.png', 2, 2, '2025-10-08 12:00:00', '2025-10-21 21:00:00', '18:00:00'),
-- 화암사 주차장 공사 안내
	('54311', 1, '화암사 주차장 공사 안내', '9월 20일(금)~10월 13일(일) 화암사 주차장 공사로 인해 사용이 불가합니다.',
	 'hwaamsa.jpg', 3, 1, '2025-10-25 12:00:00', '2025-11-13 12:00:00', '12:00:00');