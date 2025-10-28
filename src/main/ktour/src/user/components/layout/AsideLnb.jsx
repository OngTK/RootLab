/**
 * 사용자단(비회원) > 공통레이아웃 > 좌측메뉴 컴포넌트
 *
 * @author 
 * @since 2025.10.17
 * @version 0.1.2
 */
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faThumbsUp, faMusic, faStreetView, faCircleChevronRight, faDog, faSignsPost, faLocationCrosshairs, faMagnifyingGlassLocation  } from "@fortawesome/free-solid-svg-icons";
import { faCompass } from "@fortawesome/free-regular-svg-icons";
import '@assets/user/css/asideLnb.css' // 좌측메뉴 asideLnb.css
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { selectedSigngu, setActiveLnbMenu } from "../../store/mapSlice";

export default function AsideLnb(props) {
    // =================== useDispatch ===================
    const dispatch = useDispatch();
    // =================== useSelector ===================
    const { firstLDong, LdongName, axiosOption, activeLnbMenu, regionSignguList } = useSelector((state) => state.relatedMap);
    // =================== useState 선언부 ===================
    const [surroundingPlace, SetSurroundingPlace] = useState([]);
    const [activeLdNo, setActiveLdNo] = useState(null);
    // =================== useEffect ===================
    useEffect(() => {
        LdongName.map((name) => {
            if (name.ldongregnnm == firstLDong.split(" ")[0]) {
                getLDongSignguCdByAxios(name.ldongregncd);
            } // if end
        }) // map end
    }, [firstLDong])

    const handleGnbClick = (menuName) => {
        dispatch(setActiveLnbMenu(menuName));
    } // func end

    // =================== LDongSignguCd Axios GET ===================
    const getLDongSignguCdByAxios = async (ldongregncd) => {
        if (ldongregncd == null) return;
        try {
            const response = await axios.get(`http://localhost:8080/ldongcode/getsigngu?lDongRegnCd=${ldongregncd}`, axiosOption);
            const data = response.data;
            SetSurroundingPlace(data);

            const initialSignguName = firstLDong.split(" ")[1];
            const initialActiveNo = data.find((signgu) => {
                signgu.ldongsigngunm == initialSignguName
            }) // find end
            if (initialActiveNo) {
                setActiveLdNo(initialActiveNo.ldNo);
            } else {
                setActiveLdNo(null);
            } // if end
        } catch (error) {
            console.log('getLDongSignguCdByAxios 오류 발생');
            console.log(error);
        } // try-catch end
    } // func end

    const handleLdNoClick = (signgu) => {
        setActiveLdNo(signgu.ldNo);
        dispatch(selectedSigngu(signgu.ldNo));
    } // func end

    /** ========================= 사용자단(비회원) > 공통레이아웃 > 좌측메뉴(asideLnb) .jsx영역 ================================== */
    return <>
        <div className="gnbWrap">
            <div className="gnb">
                <ul>
                    <li className="active"><FontAwesomeIcon icon={faStreetView} />내 주변</li>
                    <li><FontAwesomeIcon icon={faMagnifyingGlassLocation} />전국지역검색</li>
                    <li
                        className={activeLnbMenu === 'mySurroundings' ? 'active' : ''}
                        onClick={() => handleGnbClick('mySurroundings')}
                    >
                        <FontAwesomeIcon icon={faStreetView} />내 주변
                    </li>
                    <li
                        className={activeLnbMenu === 'regionSelect' ? 'active' : ''}
                        onClick={() => handleGnbClick('regionSelect')}
                    >
                        <FontAwesomeIcon icon={faCompass} />지역 선택
                    </li>
                    <li><FontAwesomeIcon icon={faCompass} />추천플레이스</li>
                    <li><FontAwesomeIcon icon={faMusic} />축제/행사/공연</li>
                    <li><FontAwesomeIcon icon={faDog} />반려동물동반</li>
                </ul>
            </div>

            {/* <!-- 좌측 서브 메뉴 시작 --> */}
            {activeLnbMenu === 'mySurroundings' && (
                <div className="lnb">
                    <h2>
                        <FontAwesomeIcon icon={faStreetView} />내 주변
                        <div className="comment">주제별 다양한 장소를 확인하세요</div>
                    </h2>
                    <ul className="subMenuList" id="lnbMap">
                        {
                            surroundingPlace &&
                            surroundingPlace.map((signgu) => {
                                const isActive = signgu.ldNo == activeLdNo;
                                return (
                                    <li key={signgu.ldNo}>
                                        <Link
                                            to="#"
                                            className={isActive ? 'active' : ''}
                                            onClick={() => handleLdNoClick(signgu)}
                                        >
                                            <span>{signgu.ldongsigngunm}</span>
                                            <FontAwesomeIcon icon={faAngleRight} />
                                        </Link>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
            )}

            {/* '지역 선택' 서브 메뉴 */}
            {activeLnbMenu === 'regionSelect' && (
                <div className="lnb">
                    <h2>
                        <FontAwesomeIcon icon={faCompass} />지역 선택
                        <div className="comment">
                            {regionSignguList.length > 0
                                ? '시군구를 선택하세요.'
                                : '상단 헤더에서 시도를 먼저 선택하세요.'
                            }
                        </div>
                    </h2>
                    <ul className="subMenuList" id="lnbRegion">
                        {
                            regionSignguList &&
                            regionSignguList.map((signgu) => {
                                const isActive = signgu.ldNo == activeLdNo;
                                return (
                                    <li key={signgu.ldNo}>
                                        <Link
                                            to="#"
                                            className={isActive ? 'active' : ''}
                                            onClick={() => handleLdNoClick(signgu)}
                                        >
                                            <span>{signgu.ldongsigngunm}</span>
                                            <FontAwesomeIcon icon={faAngleRight} />
                                        </Link>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
            )}
        </div>
    </>
}//AsideLnb.jsx end