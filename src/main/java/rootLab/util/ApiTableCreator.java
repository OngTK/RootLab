package rootLab.util;

import java.util.Map;

public class ApiTableCreator {
    /**
     * 테이블명과 컬럼명을 바탕으로, 자동으로 DDL을 생성하는 메소드
     * <p>
     * 모든 타입은 varchar(255)로 설정될 예정
     * @author AhnJH
     * @param tableName 생성할 테이블명
     * @param data Api로부터 받은 데이터 : 생성할 테이블의 컬럼명이 들어있음
     * @return 완성된 DDL SQL
     */
    public String dynamicCreateTable(String tableName, Map<String, Object> data){
        // 1. DDL이 생성될 StringBuilder 객체 생성 : String보다 성능에 유리
        StringBuilder DDL = new StringBuilder();
        // 2. 같은 이름으로 table이 존재한다면, 생성하지 않는 구문 추가
        DDL.append("CREATE TABLE IF NOT EXISTS ").append(tableName).append("(\n");
        // 3. PK로 사용될 id 컬럼을 추가 - PK명 : tableName 맨 첫글자 + No
        DDL.append(tableName.charAt(0)).append("No int auto_increment primary key,\n");
        // 4-1. Map을 순회하면서 컬럼 정의 - .ketSet() : Map의 모든 key를 Set으로 반환
        for (String entry : data.keySet()){
            // 4-2. 모든 타입은 varchar(255)로 정의
            DDL.append(entry).append(" ").append("varchar(255),\n");
        } // for end
        // 5. 마지막 컬럼에도 ,가 추가되었으므로 제거
        DDL.deleteCharAt(DDL.length() - 1);
        // 6. 최종적으로 DDL 괄호 닫기
        DDL.append(");");
        // 7. 만들어진 DDL 반환
        return DDL.toString();
    } // func end
} // class end