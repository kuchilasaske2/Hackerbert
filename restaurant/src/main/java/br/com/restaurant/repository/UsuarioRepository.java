package br.com.restaurant.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.restaurant.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {}