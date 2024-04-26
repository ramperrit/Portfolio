package com.portfolio.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

@Getter @Setter
public class UserFormDto {
    @NotBlank(message = "이름입력필수")
    private String name;

    @NotEmpty(message = "아이디 입력 필수")
    private String id;

    @NotEmpty(message = "비밀번호 입력 필수")
    @Length(min = 8, max = 16, message = "8~16자리로 설정해주세요")
    private String password;

    @NotEmpty(message = "이메일 입력 필수")
    @Email(message = "이메일 형식으로 작성")
    private String email;

}
