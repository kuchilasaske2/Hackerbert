package br.com.restaurant.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.restaurant.model.Restaurante;

public interface RestauranteRepository extends JpaRepository<Restaurante, Long> {}