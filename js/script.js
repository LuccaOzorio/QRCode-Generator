// Função para codificar texto em URL
function getAsURLEncoded(text) {
    return encodeURIComponent(text);
}

// Biblioteca QRCode.js (versão base64 decodificada)
// Nota: Em vez de incluir toda a biblioteca em base64, vamos usar uma versão otimizada
// ou carregar via CDN. Vou usar uma implementação simplificada para este exemplo.

// Implementação simplificada do gerador de QR Code
class QRCodeGenerator {
    constructor(elementId, text) {
        this.element = document.getElementById(elementId);
        this.text = text;
        this.size = 200;
        this.generate();
    }

    generate() {
        // Usando a API do Google Charts para gerar QR Code
        const encodedText = encodeURIComponent(this.text);
        const qrCodeUrl = `https://chart.googleapis.com/chart?cht=qr&chs=${this.size}x${this.size}&chl=${encodedText}&choe=UTF-8`;

        // Criar elemento de imagem
        const img = document.createElement('img');
        img.src = qrCodeUrl;
        img.alt = 'QR Code';
        img.style.width = this.size + 'px';
        img.style.height = this.size + 'px';

        // Limpar container e adicionar nova imagem
        this.element.innerHTML = '';
        this.element.appendChild(img);

        // Adicionar botões de ação
        this.addActionButtons(qrCodeUrl);
    }

    addActionButtons(imageUrl) {
        const container = document.createElement('div');
        container.className = 'qr-actions';

        // Botão para baixar
        const downloadBtn = document.createElement('button');
        downloadBtn.className = 'action-btn';
        downloadBtn.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    Baixar
                `;
        downloadBtn.onclick = () => this.downloadQRCode(imageUrl);

        // Botão para compartilhar
        const shareBtn = document.createElement('button');
        shareBtn.className = 'action-btn';
        shareBtn.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="18" cy="5" r="3"></circle>
                        <circle cx="6" cy="12" r="3"></circle>
                        <circle cx="18" cy="19" r="3"></circle>
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                    </svg>
                    Compartilhar
                `;
        shareBtn.onclick = () => this.shareQRCode(this.text, imageUrl);

        container.appendChild(downloadBtn);
        container.appendChild(shareBtn);
        this.element.appendChild(container);
    }

    downloadQRCode(imageUrl) {
        const a = document.createElement('a');
        a.href = imageUrl;
        a.download = `qrcode-${Date.now()}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    shareQRCode(text, imageUrl) {
        if (navigator.share) {
            navigator.share({
                title: 'QR Code Gerado',
                text: `QR Code para: ${text}`,
                url: imageUrl
            });
        } else {
            navigator.clipboard.writeText(text).then(() => {
                alert('Texto copiado para a área de transferência!');
            });
        }
    }
}

// Evento quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('gerar-qrcode');
    const qrcodeContainer = document.getElementById('qrcode-container');
    const urlInput = document.getElementById('url-input');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const url = urlInput.value.trim();

        if (!url) {
            alert('Por favor, insira uma URL ou texto.');
            return;
        }

        // Mostrar container do QR Code
        qrcodeContainer.style.display = 'block';

        // Gerar QR Code
        new QRCodeGenerator('qrcode-container', url);
    });
});