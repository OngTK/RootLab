package rootLab.util.sql;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.util.Map;

/**
 * 각종 SQL을 자동으로 매핑하여 생성해주는 클래스
 * <p>
 * 추후 자동화를 하기위해 존재
 * @author AhnJH
 */

@Component
public class SqlCreator {
    @Value("${spring.datasource.driver-class-name}")
    private String DatasourceDriver;
    @Value("${spring.datasource.username}")
    private String Username;
    @Value("${spring.datasource.password}")
    private String Password;

    /**
     * 테넌트ID를 받아서 해당 ID의 DB가 없다면 생성한다.
     * <p>
     * 동적으로 생성까지 진행한다.
     * @param tenantID
     * @return DB 성공여부
     * @author AhnJH
     */
    public boolean createDataBase(String tenantID){
        System.out.println("SqlCreator.createDataBase");
        // 1. 기본으로 접속할 DB URL 선언
        String URL = "jdbc:mysql://localhost:3306/?useUnicode=true&characterEncoding=utf8&useSSL=false&serverTimezone=Asia/Seoul&allowPublicKeyRetrieval=true";
        // 2. 동적으로 DB를 생성할 DDL 생성 - 안정성을 위해 utf8
        String createDynamicTable = "CREATE DATABASE IF NOT EXISTS " + tenantID;
        System.out.println("createDynamicTable = " + createDynamicTable);
        try {
            // 3. 기본 DB에 접속하기
            Connection conn = DriverManager.getConnection(URL, Username, Password);
            Statement st = conn.createStatement();
            Class.forName(DatasourceDriver);
            // 4. 동적으로 생성한 DDL 실행
            int executeCount = st.executeUpdate(createDynamicTable);
            if (executeCount == 1) {
                System.out.println(tenantID + "(이)라는 데이터베이스를 생성하였습니다.");
            } else if (executeCount == 0){
                System.out.println(tenantID + "(이)라는 데이터베이스가 이미 존재합니다.");
            } // if end
            // 5. 실행에 성공했으면, true 반환
            return true;
        } catch (Exception e) {
            System.err.println("데이터베이스 생성에 실패하였습니다.\n-> " + e.getMessage());
            return false;
        } // try-catch end
    } // func end
} // class end