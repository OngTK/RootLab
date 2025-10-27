/**
 * 사용자단(비회원) > 공통레이아웃 > 좌측메뉴 컴포넌트
 *
 * @author 
 * @since 2025.10.17
 * @version 0.1.2
 */
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faThumbsUp, faMusic, faStreetView, faCircleChevronRight, faDog } from "@fortawesome/free-solid-svg-icons";
import { faCompass } from "@fortawesome/free-regular-svg-icons";
import '@assets/user/css/asideLnb.css' // 좌측메뉴 asideLnb.css
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AsideLnb(props) {
    // =================== useSelector ===================
    const { firstLDong, LdongName, axiosOption } = useSelector((state) => state.relatedMap);
    // =================== useState 선언부 ===================
    const [surroundingPlace, SetSurroundingPlace] = useState([]);
    // =================== useEffect ===================
    useEffect(() => {
        LdongName.map((name) => {
            if (name.ldongregnnm == firstLDong.split(" ")[0]) {
                getLDongSignguCdByAxios(name.ldongregncd);
            }
        })
    }, [firstLDong])

    // =================== LDongSignguCd Axios GET ===================
    const getLDongSignguCdByAxios = async (ldongregncd) => {
        if (ldongregncd == null) return;
        try {
            const response = await axios.get(`http://localhost:8080/ldongcode/getsigngu?lDongRegnCd=${ldongregncd}`, axiosOption);
            SetSurroundingPlace(response.data);
        } catch (error) {
            console.log('getLDongSignguCdByAxios 오류 발생');
            console.log(error);
        } // try-catch end
    } // func end

    if (!surroundingPlace) return;
    /** ========================= 사용자단(비회원) > 공통레이아웃 > 좌측메뉴(asideLnb) .jsx영역 ================================== */
    return <>
        <div className="gnbWrap">
            <div className="gnb">
                <ul>
                    <li className="active"><FontAwesomeIcon icon={faStreetView} />내 주변</li>
                    <li><FontAwesomeIcon icon={faCompass} />지역 선택</li>
                    <li><FontAwesomeIcon icon={faCompass} />추천플레이스</li>
                    <li><FontAwesomeIcon icon={faMusic} />축제/행사/공연</li>
                    <li><FontAwesomeIcon icon={faDog} />반려동물동반</li>
                </ul>
            </div>

            {/* <!-- 좌측 서브 메뉴 시작 --> */}
            <div className="lnb">
                <h2>
                    <FontAwesomeIcon icon={faStreetView} />내 주변
                    <div className="comment">주제별 다양한 장소를 확인하세요</div>
                </h2>
                {/* <!--  서브 메뉴 --> */}
                <ul className="subMenuList" id="lnbMap">
                    {
                        surroundingPlace &&
                        surroundingPlace.map((signgu) => {
                            if (signgu.ldongsigngunm == firstLDong.split(" ")[1]) {
                                return <li key={signgu.ldNo}>
                                    <Link to="#" className="active"><span>{signgu.ldongsigngunm}</span><FontAwesomeIcon icon={faAngleRight} /></Link>
                                </li>
                            } else {
                                return <li key={signgu.ldNo}>
                                    <Link to="#"><span>{signgu.ldongsigngunm}</span><FontAwesomeIcon icon={faAngleRight} /></Link>
                                </li>
                            }
                        })
                    }
                    <li data-code="53">
                        <Link to="#"><span>미추홀구</span><FontAwesomeIcon icon={faAngleRight} /></Link>
                    </li>
                    <li data-code="54">
                        <Link to="#"><span>연수구</span><FontAwesomeIcon icon={faAngleRight} /></Link>
                    </li>
                    <li data-code="55">
                        <Link to="#"><span>남동구</span><FontAwesomeIcon icon={faAngleRight} /></Link>
                    </li>
                    <li data-code="56">
                        <Link to="#" className="active"><span>부평구</span><FontAwesomeIcon icon={faCircleChevronRight} /></Link>
                    </li>
                    <li data-code="57">
                        <Link to="#"><span>계양구</span><FontAwesomeIcon icon={faAngleRight} /></Link>
                    </li>
                    <li data-code="58">
                        <Link to="#"><span>서구</span><FontAwesomeIcon icon={faAngleRight} /></Link>
                    </li>
                    <li data-code="59">
                        <Link to="#"><span>강화군</span><FontAwesomeIcon icon={faAngleRight} /></Link>
                    </li>
                    <li data-code="60">
                        <Link to="#"><span>옹진군</span><FontAwesomeIcon icon={faAngleRight} /></Link>
                    </li>
                </ul>
            </div>
            {/* <!-- 좌측 서브 메뉴  끝 --> */}

        </div>
    </>
}//AsideLnb.jsx end