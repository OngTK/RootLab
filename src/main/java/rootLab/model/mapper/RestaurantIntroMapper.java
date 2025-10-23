package rootLab.model.mapper;

import org.apache.ibatis.annotations.*;
import rootLab.model.criteria.PlaceInfoCriteria;
import rootLab.model.dto.RestaurantIntroDto;
import rootLab.model.repository.CommonRepository;

import java.util.Optional;

/**
 * [ RestaurantIntroMapper ]
 * <p>
 * 음식점 상세정보 / ContentTypeID 39 / ctNo 8
 *
 * @author OngTK
 */
@Mapper
public interface RestaurantIntroMapper extends CommonRepository<RestaurantIntroDto, Integer, PlaceInfoCriteria> {

    /**
     * [1] pno별 음식점 정보 조회
     *
     * @author OngTK
     */
    @Override
    @Select("""
            select * from RestaurantIntro where pno = #{pno};
            """)
    Optional<RestaurantIntroDto> read(Integer pno);

    /**
     * [2] 음식점 정보 생성
     * @author OngTK
     */
    @Insert("""
             INSERT INTO restaurantIntro (
                    pNo,
                    chkCreditCardFood,
                    discountInfoFood,
                    firstMenu,
                    infoCenterFood,
                    kidsFacility,
                    lcnsNo,
                    openDateFood,
                    openTimeFood,
                    packing,
                    parkingFood,
                    reservationFood,
                    restDateFood,
                    scaleFood,
                    seat,
                    smoking,
                    treatMenu
                ) VALUES (
                    #{pNo},
                    #{chkCreditCardFood},
                    #{discountInfoFood},
                    #{firstMenu},
                    #{infoCenterFood},
                    #{kidsFacility},
                    #{lcnsNo},
                    #{openDateFood},
                    #{openTimeFood},
                    #{packing},
                    #{parkingFood},
                    #{reservationFood},
                    #{restDateFood},
                    #{scaleFood},
                    #{seat},
                    #{smoking},
                    #{treatMenu}
                )
            """)
    @Override
    @Options(useGeneratedKeys = true,  keyProperty = "riNo")
    int create(RestaurantIntroDto restaurantIntroDto);

    /**
     * [3] 음식점 정보 업데이트
     * @author OngTK
     */
    @Update("""
            <script>
            UPDATE restaurantIntro
            <set>
              <if test="chkCreditCardFood != null">chkCreditCardFood = #{chkCreditCardFood},</if>
              <if test="discountInfoFood  != null">discountInfoFood  = #{discountInfoFood},</if>
              <if test="firstMenu         != null">firstMenu         = #{firstMenu},</if>
              <if test="infoCenterFood    != null">infoCenterFood    = #{infoCenterFood},</if>
              <if test="kidsFacility      != null">kidsFacility      = #{kidsFacility},</if>
              <if test="lcnsNo            != null">lcnsNo            = #{lcnsNo},</if>
              <if test="openDateFood      != null">openDateFood      = #{openDateFood},</if>
              <if test="openTimeFood      != null">openTimeFood      = #{openTimeFood},</if>
              <if test="packing           != null">packing           = #{packing},</if>
              <if test="parkingFood       != null">parkingFood       = #{parkingFood},</if>
              <if test="reservationFood   != null">reservationFood   = #{reservationFood},</if>
              <if test="restDateFood      != null">restDateFood      = #{restDateFood},</if>
              <if test="scaleFood         != null">scaleFood         = #{scaleFood},</if>
              <if test="seat              != null">seat              = #{seat},</if>
              <if test="smoking           != null">smoking           = #{smoking},</if>
              <if test="treatMenu         != null">treatMenu         = #{treatMenu},</if>
            </set>
            WHERE riNo = #{riNo}
            </script>
            """)
    @Override
    boolean update(RestaurantIntroDto restaurantIntroDto);

} // func end
