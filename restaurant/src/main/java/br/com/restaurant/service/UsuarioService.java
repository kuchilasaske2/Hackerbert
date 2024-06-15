package br.com.restaurant.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.restaurant.model.Usuario;
import br.com.restaurant.repository.UsuarioRepository;

@Service
public class UsuarioService {
	
	@Autowired
	private UsuarioRepository usuarioRepository;
	
	public Usuario save(Usuario usuario) {
		return usuarioRepository.save(usuario);
	}
	
	public Optional<Usuario>getUserById(Long id){
		return usuarioRepository.getUserById(id);
	}
	
	public Usuario updateUsuario(Long id, Usuario userDetails) {
	    Usuario usuario = usuarioRepository.findById(id).orElseThrow();
	    usuario.setNome(userDetails.getNome());
	    usuario.setEmail(userDetails.getEmail());
	    usuario.setSenha(userDetails.getSenha());
	    return usuarioRepository.save(usuario);
	}

	public void deleteUsuario(Long id) {
	    usuarioRepository.deleteById(id);
	}

	public Optional<Usuario> findByEmail(String email) {
		return usuarioRepository.findByEmail(email);
	}
	
}
