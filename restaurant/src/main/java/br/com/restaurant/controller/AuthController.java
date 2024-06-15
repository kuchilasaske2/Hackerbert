package br.com.restaurant.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import br.com.restaurant.service.AuthService;

@RestController
@RequestMapping("/auth")
public class AuthController {
	
	@Autowired
	private AuthService authService;
	
	@PostMapping
	public ResponseEntity<String> authenticate(@RequestBody Map<String, String>auth){
		
		String email = auth.get("email");
		String senha = auth.get("senha");
		
		String token = authService.authenticate(email, senha);
		return ResponseEntity.ok(token);
		
	}

}