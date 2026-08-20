import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, DecimalPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  cidade: string = '';
  dadosClima: any = null;
  erroMensagem: string = '';
  apiKey: string = '78a0ebbf843d1b3baeff34cc8374b721';

  constructor(private http: HttpClient) {}

  buscarClima() {
    // 1. Teste rápido: se a função responder, vai disparar essa mensagem na tela
    console.log('Botão clicado! Buscando cidade:', this.cidade);

    if (!this.cidade) {
      alert('Por favor, digite o nome de uma cidade!');
      return;
    }

    this.erroMensagem = '';
    const url = `https://openweathermap.org{this.cidade}&units=metric&appid=${this.apiKey}&lang=pt_br`;

    this.http.get(url).subscribe({
      next: (dados: any) => {
        console.log('Dados brutos da API:', dados);
        this.dadosClima = dados;
      },
      error: (erro) => {
        console.error('Erro na requisição:', erro);
        this.erroMensagem = 'Cidade não encontrada ou erro na conexão.';
      }
    });
  }
}
