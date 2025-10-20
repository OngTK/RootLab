/**
 * 관리자단 > 메뉴 데이터(adminMenus) : 페이지별 gnb, lnb, navigation 사용
 *
 * @author kimJS
 * @since 2025.10.19
 * @version 0.1.0
 */
export const adminMenus = [
  {
    no: "1",
    title: "관광정보관리",
    path: "/admin/map/place_info",
    children: [{ label: "플레이스현황", path: "/admin/map/place_info" }],
  },
  {
    no: "2",
    title: "회원관리",
    path: "/admin/member/manager",
    children: [{ label: "관리자현황", path: "/admin/member/manager" }],
  },
  {
    no: "3",
    title: "사이트관리",
    path: "/admin/site/site_info",
    children: [
      { label: "사이트정보", path: "/admin/site/site_info" },
      { label: "푸시/팝업관리", path: "/admin/site/push_popup" },
    ],
  },
];