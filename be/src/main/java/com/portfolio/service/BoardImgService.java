package com.portfolio.service;

import com.portfolio.entity.BoardImg;
import com.portfolio.repository.BoardImgRepository;
import com.querydsl.core.util.StringUtils;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Transactional
public class BoardImgService {
    @Value("${itemImgLocation}")
    private String boardImgLocation;

    private final BoardImgRepository boardImgRepository;
    private final FileService fileService;

    public void saveBoardImg(BoardImg boardImg, MultipartFile boardImgFile) throws Exception{
        String oriImgName = boardImgFile.getOriginalFilename();
        String imgName = "";
        String imgUrl = "";

        if (oriImgName != null){
            imgName = fileService.uploadFile(boardImgLocation, oriImgName, boardImgFile.getBytes());
            imgUrl = "/images/board/" + imgName;
        }

        boardImg.updateItemImg(oriImgName, imgName, imgUrl);
        boardImgRepository.save(boardImg);
    }

    public void updateBoardImg(Long boardImgid, MultipartFile boardImgFile) throws Exception{
        if (!boardImgFile.isEmpty()){
            BoardImg savedBoardImg = boardImgRepository.findById(boardImgid).orElseThrow(EntityNotFoundException::new);

            String str = savedBoardImg.getImgName();
            if(str != null){
                fileService.deleteFile(boardImgLocation+"/"+savedBoardImg.getImgName());
            }

            String oriImgName = boardImgFile.getOriginalFilename();
            String imgName = fileService.uploadFile(boardImgLocation, oriImgName, boardImgFile.getBytes());
            String imgUrl = "/images/item/" + imgName;
            savedBoardImg.updateItemImg(oriImgName, imgName, imgUrl);
        }
    }


}
