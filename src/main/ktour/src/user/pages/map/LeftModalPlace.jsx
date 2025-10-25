/**
 * 사용자단(비회원) > 메인 > 지도마커 클릭시, 플레이스 상세정보 ★좌측★모달(레이어) 컴포넌트
 *
 * @author 
 * @since 2025.10.24
 * @version 0.1.0
 */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import { useEffect, useState } from "react";
import { selectMarker } from "../../store/mapSlice";

export default function LeftModalPlace(props) {
    // =================== useSelector ===================
    const { axiosOption } = useSelector((state) => state.relatedMap);
    // =================== useState 선언부 ===================
    const [placeInfo, SetPlaceInfo] = useState(null);
    // =================== useDispatch ===================
    const dispatch = useDispatch();

    const getplaceInfoByAxios = async () => {
        if (!props.pNo) return;
        try {
            const response = await axios.get(`http://localhost:8080/placeinfo/basic?pno=${props.pNo}`, axiosOption);
            console.log(response.data);
            SetPlaceInfo(response.data);
        } catch (error) {
            console.log('getplaceInfoByAxios 오류 발생');
            console.log(error);
        } // try-catch end
    } // func end
    // =================== useEffect - [props.pNo] : 상세정보 GET ===================
    useEffect(() => {
        getplaceInfoByAxios();
    }, [props.pNo])

    const handleCloseModal = () => {
        dispatch(selectMarker(null));
    } // func end

    // axios 처리가 안 됐으면, 종료
    if (!placeInfo) return;
    /** =========================== ★좌측모달★ LeftModalPlace.jsx ===================================== */
    return (
        <>
            <div className="leftModal" id="leftModalPlace">
                {/* 모달 박스 시작 */}
                <div className="modal_box">
                    {/* 콘텐츠 내용 시작 */}
                    <button className="modalClose" onClick={handleCloseModal} ><FontAwesomeIcon icon={faXmark} /></button>

                    <div className="modal_img_box">
                        {placeInfo.placeInfo.firstimage && <img src={placeInfo.placeInfo.firstimage} alt="타이틀" />}
                        <div className="modalContentOutline">
                            <h3>{placeInfo.placeInfo.title}</h3>
                            <div className="category">자연관광&nbsp; 체험관광동궁</div>
                        </div>
                    </div>

                    <div className="modalContent">
                        <p className="description">
                            {
                                placeInfo.placeInfo.overview
                            }
                        </p>

                        <h4>상세정보</h4>
                        <ul>
                            <li><b>주소</b>{placeInfo.placeInfo.addr1}{'\t'}{placeInfo.placeInfo.addr2}</li>
                            {
                                placeInfo.placeInfo.homepate &&
                                <li>
                                    <b>홈페이지</b>
                                    <a href="#" target="_blank" rel="noopener noreferrer">
                                        {placeInfo.placeInfo.homepate}
                                    </a>
                                </li>
                            }
                            {
                                placeInfo.placeInfo.tel &&
                                <li>
                                    <b>전화</b>
                                    <a href={placeInfo.placeInfo.tel}>{placeInfo.placeInfo.tel}</a>
                                </li>
                            }
                        </ul>

                        <h4>사진이미지</h4>
                        <ul className="additionImgWrap">
                            {
                                placeInfo.PlaceImageDetail.map((image) => {
                                    return <li key={image.pidNo}><img src={image.originimgurl} alt="" /></li>
                                })
                            }
                        </ul>

                        <h4>부가정보</h4>
                        <ul>
                            <li>
                                <b>홈페이지</b>
                                <a href="#" target="_blank" rel="noopener noreferrer">
                                    //tour.daegu.go.kr
                                </a>
                            </li>
                            <li>
                                <b>전화</b>
                                <a href="tel:010-1234-5678">010-1234-5678</a>
                            </li>
                            <li>
                                <b>주차</b> 가능 / 요금 (최초 2시간 무료 / 이후 30분 당 400원씩 추가 요금 발생)
                            </li>
                            <li><b>휴무일</b> 연중무휴</li>
                            <li><b>휴무일</b> 연중무휴</li>
                        </ul>
                    </div>
                    {/* 콘텐츠 내용 끝 */}
                </div>
                {/* 모달 박스 끝 */}
            </div>
            {/* 05. 지도 마커 클릭시, 플레이스 상세정보 조회 모달(레이어) 끝 */}
        </>
    );
} // LeftModalPlace.jsx end
