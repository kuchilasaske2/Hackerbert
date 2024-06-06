package br.com.restaurant.model;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Restaurante {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String nomeEstabelecimento;
    private String enderecoEstabelecimento;
    private List<String> fotosEstabelecimento;
    
    public Restaurante() {
		// TODO Auto-generated constructor stub
	}

    // Construtor
    public Restaurante(String nome, String nomeEstabelecimento, String enderecoEstabelecimento, List<String> fotosEstabelecimento) {
        this.nome = nome;
        this.nomeEstabelecimento = nomeEstabelecimento;
        this.enderecoEstabelecimento = enderecoEstabelecimento;
        this.fotosEstabelecimento = fotosEstabelecimento;
    }
    
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getNomeEstabelecimento() {
		return nomeEstabelecimento;
	}
	public void setNomeEstabelecimento(String nomeEstabelecimento) {
		this.nomeEstabelecimento = nomeEstabelecimento;
	}
	public String getEnderecoEstabelecimento() {
		return enderecoEstabelecimento;
	}
	public void setEnderecoEstabelecimento(String enderecoEstabelecimento) {
		this.enderecoEstabelecimento = enderecoEstabelecimento;
	}
	public List<String> getFotosEstabelecimento() {
		return fotosEstabelecimento;
	}
	public void setFotosEstabelecimento(List<String> fotosEstabelecimento) {
		this.fotosEstabelecimento = fotosEstabelecimento;
	}
}