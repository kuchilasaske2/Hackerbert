package br.com.restaurant.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.com.restaurant.comment.enums.CommentStatus;
import br.com.restaurant.model.Comment;
import br.com.restaurant.model.Usuario;

public interface CommentRepository extends JpaRepository<Comment, Long> {
	
	List<Comment> findFirstByUsuario(Usuario usuario);
	
	
	@Query("select c from Comment c " 
			+ "where upper(c.text) like ?1% "
			+ "and c.status = ?2 "
			+ "and c.usuario = ?3")
	List<Comment> findByQuery(String query, CommentStatus status, Usuario usuario);
}