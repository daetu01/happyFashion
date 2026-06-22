package com.fashion.music.user.controller;

import com.fashion.music.global.security.CustomDetails;
import com.fashion.music.user.dto.UserMeResponse;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @GetMapping("/me")
    public UserMeResponse me(@AuthenticationPrincipal CustomDetails userDetails) {
        return new UserMeResponse(
                userDetails.getUserId(),
                userDetails.getEmail(),
                userDetails.getNickname()
        );
    }
}
