import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, DecimalPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {
  cidade: string = '';
  dadosClima: any = null;
  erroMensagem: string = '';
  apiKey: string = '78a0ebbf843d1b3baeff34cc8374b721';
  isDarkMode: boolean = false;
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    if (this.isBrowser) {
      const saved = localStorage.getItem('darkMode');
      this.isDarkMode = saved === 'true';
    }
  }

  toggleDarkMode(): void {
    if (!this.isBrowser) return;
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('darkMode', this.isDarkMode ? 'true' : 'false');
  }

  buscarClima() {
    console.log('Botão clicado! Buscando cidade:', this.cidade);

    if (!this.cidade) {
      alert('Por favor, digite o nome de uma cidade!');
      return;
    }

    this.erroMensagem = '';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.cidade}&units=metric&appid=${this.apiKey}&lang=pt_br`;

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