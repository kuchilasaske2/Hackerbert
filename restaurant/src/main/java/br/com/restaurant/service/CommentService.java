package br.com.restaurant.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.restaurant.comment.enums.CommentStatus;
import br.com.restaurant.model.Comment;
import br.com.restaurant.model.Usuario;
import br.com.restaurant.repository.CommentRepository;

@Service
public class CommentService {
	@Autowired
	private CommentRepository commentRepository;
	
	public Comment save(Comment comment) {
		return commentRepository.save(comment);
	}

	public List<Comment> findAll() {
		return commentRepository.findAll();
	}
	
	public List<Comment> findAll(Usuario usuario) {
		return commentRepository.findFirstByUsuario(usuario);
	}
	
	public Optional<Comment> edit(Long id, Comment comment){
		Optional<Comment> c = commentRepository.findById(id);
		
		if (c.isPresent()) {
			c.get().setText(comment.getText());
			c.get().setNotes(comment.getNotes());
			Comment saved = commentRepository.save(c.get());
			return Optional.of(saved);
		}
		return Optional.empty();
	}
	
	public void delete(Long id) {
		commentRepository.deleteById(id);
	}
	
	public List<Comment> findByQuery(String query, CommentStatus status, Usuario usuario){
		
		return commentRepository.findByQuery(query.toUpperCase(), status, usuario);
		
	}

}