/**
 * 사용자단(비회원) > 공통레이아웃 > 좌측 상단 검색창 > 검색결과 레이어(모달)
 *
 * @author 
 * @since 2025.10.26
 * @version 0.1.0
 */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faXmark } from "@fortawesome/free-solid-svg-icons";
import "@assets/user/css/modalSearchHeader.css";

export default function ModalSearchHeader(props) {
   const places = [
  {id:1,img:"http://tong.visitkorea.or.kr/cms/resource/81/2797481_image2_1.jpg",category:"캠핑장",name:"광교호수공원 가족캠핑장",distance:"15km",address:"경기도 수원시 광교동",tel:"031-154-1234"},
  {id:2,img:"http://tong.visitkorea.or.kr/cms/resource/65/2797465_image2_1.jpg",category:"야영장",name:"가평숲속캠핑",distance:"42km",address:"경기도 가평군 청평면",tel:"031-845-9876"},
  {id:3,img:"/user/img/no_img.jpg",category:"오토캠핑장",name:"양평리버캠핑존",distance:"58km",address:"경기도 양평군 개군면",tel:"031-774-1112"},
  {id:4,img:"/user/img/no_img.jpg",category:"글램핑",name:"남양주 별빛글램핑",distance:"33km",address:"경기도 남양주시 조안면",tel:"031-123-7890"},
  {id:5,img:"http://tong.visitkorea.or.kr/cms/resource/15/2797515_image2_1.jpg",category:"캠핑존",name:"포천힐링캠프",distance:"77km",address:"경기도 포천시 신북면",tel:"031-666-2525"},
  {id:6,img:"http://tong.visitkorea.or.kr/cms/resource/11/2797511_image2_1.jpg",category:"카라반",name:"춘천호수카라반파크",distance:"64km",address:"강원특별자치도 춘천시 남산면",tel:"033-250-2222"},
  {id:7,img:"http://tong.visitkorea.or.kr/cms/resource/19/2797519_image2_1.jpg",category:"캠핑장",name:"양주숲속힐링캠프",distance:"50km",address:"경기도 양주시 장흥면",tel:"031-828-7788"},
  {id:8,img:"http://tong.visitkorea.or.kr/cms/resource/23/2797523_image2_1.jpg",category:"글램핑",name:"파주하늘정원글램핑",distance:"61km",address:"경기도 파주시 법원읍",tel:"031-950-3333"},
  {id:9,img:"/user/img/no_img.jpg",category:"오토캠핑장",name:"용인자연숲오토캠프",distance:"27km",address:"경기도 용인시 처인구",tel:"031-456-1122"},
  {id:10,img:"/user/img/no_img.jpg",category:"캠핑존",name:"의정부별빛캠핑파크",distance:"40km",address:"경기도 의정부시 가능동",tel:"031-487-9090"}
];


    /** =========================== ★검색창 > 검색결과 레이어(모달)★ modalSearchHeader.jsx ===================================== */
    return (
        <>
            <div className="modalSearchHeader" id="modalSearchHeader">
                {/* 모달 박스 시작 */}
                <div className="modal_box">
                    {/* 콘텐츠 내용 시작 */}
                    <button className="modalClose"><FontAwesomeIcon icon={faCircleXmark} /></button>
                    {/*  검색결과(플레이스) 시작 */}
                    {places.map((p) => (
                        <dl className="searchResult" key={p.id}>
                            <dt>
                                <img src={p.img} alt={p.name} />
                                <span className="category">{p.category}</span>
                            </dt>
                            <dd>
                                <ul>
                                    <li className="placeName">{p.name}</li>
                                    <li>
                                        <strong>{p.distance}</strong> {p.address}
                                    </li>
                                    <li>{p.tel}</li>
                                </ul>
                            </dd>
                        </dl>
                    ))}
                    {/*  검색결과(플레이스) 끝 */}
                </div>
                {/* 모달 박스 끝 */}
            </div>
        </>
    );
} // LeftModalPlace.jsx end
