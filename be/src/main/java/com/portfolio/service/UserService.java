package com.portfolio.service;

import com.portfolio.dto.LoginDto;
import com.portfolio.dto.TokenRequest;
import com.portfolio.dto.TokenResponse;
import com.portfolio.dto.UserFormDto;
import com.portfolio.entity.RefreshToken;
import com.portfolio.entity.User;
import com.portfolio.jwt.TokenProvider;
import com.portfolio.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;

@Service
@Transactional
@RequiredArgsConstructor
@Builder
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public boolean validateUser(UserFormDto user){
        User existId = userRepository.findById(user.getId());
        User existEmail = userRepository.findByEmail(user.getEmail());

        if(existId != null || existEmail != null){
            return false;
        }
        return true;
    }
    public void signup(UserFormDto user){
        if(validateUser(user)){
            userRepository.save(User.createUser(user, passwordEncoder));
        }else {
            throw new RuntimeException("이미 존재하는 아이디 또는 이메일 입니다.");
        }
    }

    @Override
    public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
        User user = userRepository.findById(id);
        if (user == null){
            throw new UsernameNotFoundException(id);
        }
        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getId())
                .password(user.getPassword())
                .roles(user.getRole().toString())
                .build();
    }

    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final TokenProvider tokenProvider;
    private final RefreshTokenService refreshTokenService;

    public TokenResponse login(LoginDto dto){
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(dto.getId(), dto.getPassword());

        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        //유저 조회
        User user = userRepository.findById(authentication.getName());
        if (user == null){
            throw new EntityNotFoundException();
        }

        String newRefreshToken = tokenProvider.createRefreshToken(Duration.ofDays(1));

        RefreshToken existRefreshToken = refreshTokenService.findByUser(user);

        if (existRefreshToken == null){
            refreshTokenService.saveRefreshToken(new RefreshToken(user, newRefreshToken));
        }else {
            existRefreshToken.update(newRefreshToken);
        }

        String accessToken = tokenProvider.createAccessToken(user, Duration.ofHours(2));

        return new TokenResponse(accessToken, newRefreshToken, user.getRole().getKey());

    }

    public void logout(TokenRequest request){
        refreshTokenService.removeToken(request.getRefreshToken());
    }


    public TokenResponse tokenRefresh(TokenRequest request) throws Exception{
        //refresh 토큰까지 거부
        if (!tokenProvider.validateToken(request.getRefreshToken())){
            throw new IllegalAccessException("Unexpected token");
        }
        //refresh 토큰 정상
        RefreshToken refreshToken = refreshTokenService.findByRefreshToken(request.getRefreshToken());

        User user = refreshToken.getUser();

        String accessToken = tokenProvider.createAccessToken(user, Duration.ofHours(2));
        String newRefreshToken = refreshToken.update(tokenProvider.createRefreshToken(Duration.ofDays(1))).getRefreshToken();

        return new TokenResponse(accessToken, newRefreshToken, user.getRole().getKey());

    }
}
