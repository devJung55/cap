package com.app.captain.mapper;

import lombok.RequiredArgsConstructor;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MemberGroupMapper {

    /* 그룹 참여하기 */
    public void join(Long groupId, Long memberId);

    /* 그룹아이디로 memberGroupId 조회하기 */
    public Long selectByGroupId(Long groupId);

    /* 그룹아이디로 가입한 member 수 구하기 */
    public int memberCountByGroupId(Long groupId);

    /* groupId로 삭제하기 */
    public void delete(Long groupId);
}
