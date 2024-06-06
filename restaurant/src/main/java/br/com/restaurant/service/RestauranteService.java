package br.com.restaurant.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.restaurant.model.Restaurante;
import br.com.restaurant.repository.RestauranteRepository;

@Service
public class RestauranteService {
	
	@Autowired
	private RestauranteRepository restauranteRepository;
	
	public Restaurante save(Restaurante restaurante) {
		return restauranteRepository.save(restaurante);
	}
	
	public Optional<Restaurante>findByEmail(String email){
		return restauranteRepository.findFirstByEmail(email);
	}

}
