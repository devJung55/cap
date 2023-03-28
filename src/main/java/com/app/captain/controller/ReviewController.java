package com.app.captain.controller;

import com.app.captain.domain.dto.ReviewDTO;
import com.app.captain.domain.dto.ReviewFileDTO;
import com.app.captain.domain.vo.ReviewFileVO;
import com.app.captain.domain.vo.ReviewVO;
import com.app.captain.service.ReviewFileService;
import com.app.captain.service.ReviewService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.coobird.thumbnailator.Thumbnailator;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Controller
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/reviews/*")
public class ReviewController {

    private final ReviewService reviewService;
    private final ReviewFileService reviewFileService;


    //  리뷰작성 폼
    @GetMapping("write")
    public String getWrite(Model model) {
        model.addAttribute("review", new ReviewVO());
        model.addAttribute("files", new ReviewFileVO());
        return "reviews/reviewMake";
    }

    //    리뷰 작성
    @PostMapping("write")
    public String save(@ModelAttribute ReviewVO reviewVO, RedirectAttributes redirectAttributes) {
        reviewVO.setGroupId(1L);
        log.info(reviewVO.toString());
        reviewService.write(reviewVO);
        redirectAttributes.addFlashAttribute("review", reviewVO);
        return "redirect:list";
    }

//    리뷰 수정 페이지
    @GetMapping("{reviewId}/modify")
    public String getModify(@PathVariable("reviewId")Long reviewId, Model model){
        ReviewFileDTO reviewFileDTO = reviewService.getReview(reviewId);
        model.addAttribute("review", reviewFileDTO);
        return "reviews/reviewModify";
    }

//    리뷰 수정 완료 페이지
    @PostMapping("{reviewId}/modify")
    public String modify(@PathVariable("reviewId") Long reviewId, @ModelAttribute("review") ReviewVO reviewVO, RedirectAttributes redirectAttributes){
        reviewVO.setReviewId(reviewId);
        reviewService.modify(reviewVO);
        redirectAttributes.addFlashAttribute("review", reviewVO);
        return "redirect:list";
    }

//    리뷰 수정 처리 페이지

    //    리뷰 상세보기
    @GetMapping("detail/{reviewId}")
    public String getReview(@PathVariable("reviewId") Long reviewId, Model model) {
        model.addAttribute("review", reviewService.getDTO(reviewId));
        model.addAttribute("files", reviewFileService.getList(reviewId));
        model.addAttribute("reviewId", reviewId);
        return "reviews/reviewDetail";
    }

    //    리뷰 리스트

    @GetMapping("list")
    public String getList(Model model) {
        List<ReviewVO> reviewList = reviewService.getList();
        model.addAttribute("reviews", reviewList);
        return "reviews/reviewList";
    }

//    리뷰 삭제
    @GetMapping("{reviewId}/remove")
    public String remove(@PathVariable("reviewId")Long reviewId, RedirectAttributes redirectAttributes){
        reviewService.remove(reviewId);
        redirectAttributes.addFlashAttribute("reviewId","삭제완료");
        return "redirect:/reviews/list";
    }

  /*  //    파일 저장
    @PostMapping("save")
    @ResponseBody
    public void save(@RequestBody List<ReviewFileVO> files) {
        reviewFileService.write(files);
    }*/

    //    파일 업로드
    @PostMapping("upload")
    @ResponseBody
    public List<String> upload(@RequestParam("file") List<MultipartFile> multipartFiles) throws IOException {
        List<String> uuids = new ArrayList<>();
        String path = "C:/upload/" + reviewFileService.getPath();
        File file = new File(path);
        if (!file.exists()) {
            file.mkdirs();
        }
        for (int i = 0; i < multipartFiles.size(); i++) {
            uuids.add(UUID.randomUUID().toString());
            multipartFiles.get(i).transferTo(new File(path, uuids.get(i) + "_" + multipartFiles.get(i).getOriginalFilename()));

            if (multipartFiles.get(i).getContentType().startsWith("image")) {
                FileOutputStream out = new FileOutputStream(new File(path, "t_" + uuids.get(i) + "_" + multipartFiles.get(i).getOriginalFilename()));
                Thumbnailator.createThumbnail(multipartFiles.get(i).getInputStream(), out, 100, 100);
                out.close();
            }
        }
        return uuids;
    }

    //    파일 다운로드
    @GetMapping("download")
    public ResponseEntity<Resource> download(String fileName) throws UnsupportedEncodingException {
        Resource resource = new FileSystemResource("C:/upload/" + fileName);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment;filename=" + new String(fileName.substring(fileName.indexOf("_") + 1).getBytes("UTF-8"), "ISO-8859-1"));
        return new ResponseEntity<>(resource, headers, HttpStatus.OK);
    }

}
