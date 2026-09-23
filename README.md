# Decentralizovana aplikacija za proverljive akreditive (Verifiable Credentials)

Kratak opis: Aplikacija omogućava upravljanje decentralizovanim identitetima korišćenjem pametnih ugovora.

## Podaci o studentu
- **Ime i prezime:** Aleksandra Acimovic
- **Broj indeksa:** 647/2022
- **Broj zadatka:** 9

## Korišćene tehnologije
- **Frontend:** React, Ethers.js
- **Pametni ugovori:** Solidity
- **Razvojno okruženje:** Hardhat
- **Novčanik:** MetaMask

## Uputstvo za pokretanje projekta

### 1. Instalacija zavisnosti
Klonirajte repozitorijum i instalirajte potrebne pakete:
\`\`\`bash
git clone https://github.com/aleksandra647/dappzadatak9.git
cd dappzadatak9
npm install
\`\`\`

### 2. Pokretanje lokalne mreže i pametnih ugovora
Pokrenite lokalni Hardhat čvor u prvom terminalu:
\`\`\`bash
npx hardhat node
\`\`\`
U drugom terminalu kompajlirajte i deploy-ujte pametni ugovor na lokalnu mrežu:
\`\`\`bash
npx hardhat run scripts/deploy.js --network localhost
\`\`\`

### 3. Konfiguracija MetaMaska
1. Otvorite ekstenziju MetaMask u pregledaču.
2. Dodajte novu mrežu (Add Network -> Add a network manually):
   - **Network Name:** Localhost 8545
   - **New RPC URL:** http://127.0.0.1:8545
   - **Chain ID:** 31337
   - **Currency Symbol:** ETH
3. Uvezite testni nalog tako što ćete kliknuti na "Import Account" u MetaMasku i uneti jedan od privatnih ključeva koje je izgenerisao Hardhat u prvom terminalu.

### 4. Pokretanje klijentske aplikacije
Kada su ugovori postavljeni i MetaMask konfigurisan, pokrenite frontend:
\`\`\`bash
npm run dev
\`\`\`
Otvorite \`http://localhost:5417\` u pregledaču i povežite svoj MetaMask nalog.
