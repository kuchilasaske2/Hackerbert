package br.com.restaurant.model;

import br.com.restaurant.comment.enums.CommentStatus;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "comentarios")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String text;
    private Integer notes;
    private CommentStatus status = CommentStatus.PENDING;
    @ManyToOne
    private Usuario usuario;
    
    
    public Comment() {
		// TODO Auto-generated constructor stub
	}
    
    // Construtor
    public Comment(Long id, String text, Integer notes, CommentStatus status, Usuario usuario) {
    	super();
		this.id = id;
        this.text = text;
        this.notes = notes;
        this.status = status;
        this.usuario = usuario;
    }
    
    // Getters e setters
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

	public Integer getNotes() {
		return notes;
	}

	public void setNotes(Integer notes) {
		this.notes = notes;
	}

	public CommentStatus getStatus() {
		return status;
	}

	public void setStatus(CommentStatus status) {
		this.status = status;
	}
}