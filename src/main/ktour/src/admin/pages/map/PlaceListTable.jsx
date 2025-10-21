import ResizableTable from "@admin/components/common/ResizableTable";

const columns = [
  { accessorKey: "no", header: "No" },
  { accessorKey: "pid", header: "플레이스번호" },
  { accessorKey: "name", header: "플레이스명" },
  { accessorKey: "category", header: "카테고리" },
  { accessorKey: "address", header: "주소" },
  { accessorKey: "tel", header: "전화번호" },
];

const data = [
  { no: 1, pid: 421977, name: "고성명태축제", category: "행사", address: "강원 고성군", tel: "033-681-0121" },
  { no: 2, pid: 2932765, name: "불꽃쇼 & 소원풍선", category: "이벤트", address: "삼포해변", tel: "1666-1243" },
];

export default function PlaceList() {
  return (
    <AdminTable
      columns={columns}
      data={data}
      sortable={true} // 정렬 활성화
    />
  );
}
