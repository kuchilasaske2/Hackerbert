package br.com.restaurant.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.restaurant.comment.enums.CommentStatus;
import br.com.restaurant.model.Comment;
import br.com.restaurant.model.Usuario;
import br.com.restaurant.service.AuthService;
import br.com.restaurant.service.CommentService;


@RestController
@RequestMapping("/comment")
public class CommentController {
	
	@Autowired
	private CommentService commentService;
	
	@Autowired
	private AuthService authService;
	
	@GetMapping
	public ResponseEntity<String> metodo() {
		return ResponseEntity.ok("Hello");
	}
	
	@PostMapping
	public ResponseEntity<Comment> create(@RequestBody Comment comment,
										@RequestHeader(name="token")String token){
			if (!authService.validateToken(token)) {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
			}
		Usuario usuario = authService.toUser(token);
		comment.setUsuario(usuario);
		
		Comment commentCreated = commentService.save(comment);
		return ResponseEntity.ok(commentCreated);
	}
	
	@GetMapping("/all")
	public ResponseEntity<List<Comment>> findAll(@RequestHeader(name="token") String token){
		if (!authService.validateToken(token)) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
		Usuario usuario = authService.toUser(token);
		List<Comment> list = commentService.findAll(usuario);
		return ResponseEntity.ok(list);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Comment> edit(@PathVariable Long id,
									@RequestBody Comment comment){
		
		Optional<Comment> actualComment = commentService.edit(id, comment);{
			if (actualComment.isPresent()) {
				return ResponseEntity.ok(actualComment.get());
			}
			return ResponseEntity.notFound().build();
		}
		
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?>delete(@PathVariable Long id){
		commentService.delete(id);
		return ResponseEntity.ok().build();
	}
	
	@GetMapping("/search")
	public ResponseEntity<List<Comment>> search(@RequestParam(name = "q")String query
											,@RequestParam(name = "s")String status
											,@RequestHeader(name = "token")String token){
		
		if (!authService.validateToken(token)) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
		
		List<Comment> comments = null;
		Usuario usuario = authService.toUser(token);
		if("p".equals(status)) {
			comments = commentService.findByQuery(query, CommentStatus.PENDING, usuario);
		}
		else if ("d".equals(status)) {
			comments = commentService.findByQuery(query, CommentStatus.DONE, usuario);
		}
		return ResponseEntity.ok(comments);
	}
}
