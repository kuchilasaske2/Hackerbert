package br.com.restaurant.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.restaurant.model.Restaurante;
import br.com.restaurant.service.RestauranteService;

@RestController
@RequestMapping("/api/restaurantes")
public class RestauranteController {

	@Autowired
	private RestauranteService restauranteService;
	
	@PostMapping
	public ResponseEntity<Restaurante> create(@RequestBody Restaurante restaurante){
		
		Restaurante created = restauranteService.save(restaurante);
		return ResponseEntity.ok(created);
	}
}