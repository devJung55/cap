package com.app.captain.mapper;

import com.app.captain.domain.dto.Criteria;
import com.app.captain.domain.dto.GroupReplyDTO;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface GroupReplyMapper {
    /* 댓글 개수 찾기 */
    public Integer selectMemberReplyCount(Long memberId);

    /* 멤버가 쓴 댓글 찾기 */
    public List<GroupReplyDTO> selectMemberReply(Long memberId,@Param("cri") Criteria criteria);

    /* 그룹 id로 탐험대에 작성된 댓글의 갯수 가져오기 */
    public Long selectReplyCount(Long groupId);
}
