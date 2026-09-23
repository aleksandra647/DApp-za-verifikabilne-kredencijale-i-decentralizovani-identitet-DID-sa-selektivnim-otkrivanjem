import React, { useState } from 'react'
import { ethers } from 'ethers'

function App() {
    // --- STANJA APLIKACIJE ---
    const [account, setAccount] = useState(null)
    const [activeTab, setActiveTab] = useState('issuer')

    // Stanje za unos adrese u Admin panelu
    const [issuerAddressInput, setIssuerAddressInput] = useState('')

    // --- PODACI O PAMETNOM UGOVORU ---
    // OVDJE ZAMENI SA PRAVOM ADRESOM  UGOVORA (kada ga deploy)
    const CONTRACT_ADDRESS = " 0xe7f1725E7734CE288F8367e1Bb143E90bb3F05123"

    // Minimalni ABI tvog
    const CONTRACT_ABI = [
        "function registerIssuer(address _issuer) external"
    ]

    // --- FUNKCIJE ---
    // Povezivanje sa MetaMaskom
    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum)
                const signer = await provider.getSigner()
                const address = await signer.getAddress()
                setAccount(address)
            } catch (error) {
                console.error("Greška pri povezivanju novčanika:", error)
            }
        } else {
            alert("Molim te instaliraj MetaMask ekstenziju!")
        }
    }

    // Upis izdavaoca na blockchain (Admin funkcionalnost)
    const ovlastiIzdavaoca = async () => {
        if (!window.ethereum) return alert("Instaliraj MetaMask!")
        if (!issuerAddressInput) return alert("Molim te unesi adresu izdavaoca!")

        try {
            const provider = new ethers.BrowserProvider(window.ethereum)
            const signer = await provider.getSigner()
            const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)

            // Poziv funkcije iz  pametnog ugovora
            const tx = await contract.registerIssuer(issuerAddressInput)

            alert("Transakcija je poslata! Čeka se potvrda mreže...")

            // Čekamo da se transakcija zapiše u blok
            await tx.wait()
            alert("Izdavalac je uspešno ovlašćen na blockchainu!")
            setIssuerAddressInput('') // Čistimo polje nakon uspešnog upisa

        } catch (error) {
            console.error("Greška pri upisu:", error)
            alert("Došlo je do greške: " + (error.shortMessage || error.message))
        }
    }

    // --- STILOVI ---
    const styles = {
        container: { backgroundColor: '#0b0c2a', minHeight: '100vh', color: '#ffffff', fontFamily: 'Arial, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 20px', boxSizing: 'border-box' },
        header: { marginBottom: '10px', fontSize: '28px', fontWeight: 'bold' },
        subtitle: { color: '#8a8d9f', marginBottom: '20px', fontSize: '14px', textAlign: 'center' },
        metaMaskBtn: { backgroundColor: '#f6851b', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginBottom: '30px' },
        tabsContainer: { display: 'flex', gap: '10px', marginBottom: '30px', flexWrap: 'wrap', justifyContent: 'center' },
        tabBtn: (isActive) => ({ backgroundColor: isActive ? '#3b82f6' : '#1e224c', color: 'white', border: 'none', padding: '10px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: isActive ? 'bold' : 'normal' }),
        card: { backgroundColor: '#1a1d3f', borderRadius: '12px', padding: '30px', width: '100%', maxWidth: '600px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)' },
        cardTitle: { marginTop: '0', fontSize: '20px', marginBottom: '20px', color: '#c7c9e0' },
        label: { display: 'block', marginBottom: '8px', fontSize: '14px', color: '#c7c9e0' },
        input: { width: '100%', padding: '12px', borderRadius: '6px', border: 'none', marginBottom: '20px', boxSizing: 'border-box', fontSize: '14px', backgroundColor: '#ffffff', color: '#000000' },
        checkboxContainer: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' },
        submitBtn: (color = '#10b981') => ({ width: '100%', backgroundColor: color, color: 'white', border: 'none', padding: '12px', borderRadius: '6px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' })
    }

    // --- RENDER (Prikaz) ---
    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Verifiable Credentials & DID Portal</h1>
            <p style={styles.subtitle}>Selektivno otkrivanje sa Merkle stablima i Sepolia integracijom</p>

            <button onClick={connectWallet} style={styles.metaMaskBtn}>
                {account ? `Povezan: ${account.slice(0, 6)}...${account.slice(-4)}` : 'Poveži MetaMask'}
            </button>

            {/* Navigacioni tabovi */}
            <div style={styles.tabsContainer}>
                <button style={styles.tabBtn(activeTab === 'issuer')} onClick={() => setActiveTab('issuer')}>
                    1. Izdavalac (Issuer)
                </button>
                <button style={styles.tabBtn(activeTab === 'holder')} onClick={() => setActiveTab('holder')}>
                    2. Imalac (Holder)
                </button>
                <button style={styles.tabBtn(activeTab === 'verifier')} onClick={() => setActiveTab('verifier')}>
                    3. Proverilac (Verifier)
                </button>
                <button style={styles.tabBtn(activeTab === 'admin')} onClick={() => setActiveTab('admin')}>
                    Admin
                </button>
            </div>

            {/* TAB 1: IZDAVALAC */}
            {activeTab === 'issuer' && (
                <div style={styles.card}>
                    <h2 style={styles.cardTitle}>Izdavanje Kredencijala</h2>
                    <div>
                        <label style={styles.label}>Atribut 1 (Ime i Prezime):</label>
                        <input style={styles.input} type="text" defaultValue="Petar Petrovic" />
                    </div>
                    <div>
                        <label style={styles.label}>Atribut 2 (Status punoletstva):</label>
                        <input style={styles.input} type="text" defaultValue="Punoletan" />
                    </div>
                    <button style={styles.submitBtn('#10b981')}>Kreiraj, Potpiši i Registruj na Blockchainu</button>
                </div>
            )}

            {/* TAB 2: IMALAC (HOLDER) */}
            {activeTab === 'holder' && (
                <div style={styles.card}>
                    <h2 style={styles.cardTitle}>Moj Kredencijal (Selektivno Otkrivanje)</h2>
                    <p style={styles.label}>Odaberi atribute koje želiš da otkriješ proveriocu (ZK / Merkle Tree):</p>

                    <div style={styles.checkboxContainer}>
                        <input type="checkbox" id="attr1" defaultChecked={false} />
                        <label htmlFor="attr1" style={styles.label}>Otkrij Ime i Prezime (Petar Petrovic)</label>
                    </div>
                    <div style={styles.checkboxContainer}>
                        <input type="checkbox" id="attr2" defaultChecked={true} />
                        <label htmlFor="attr2" style={styles.label}>Otkrij Status (Punoletan)</label>
                    </div>

                    <button style={styles.submitBtn('#3b82f6')}>Generiši Prezentaciju (Dokaz)</button>
                </div>
            )}

            {/* TAB 3: PROVERILAC (VERIFIER) */}
            {activeTab === 'verifier' && (
                <div style={styles.card}>
                    <h2 style={styles.cardTitle}>Verifikacija Kredencijala</h2>
                    <div>
                        <label style={styles.label}>Zalepi prezentaciju (JSON Dokaz):</label>
                        <textarea
                            style={{ ...styles.input, minHeight: '100px', resize: 'vertical' }}
                            placeholder='{"proof": "...", "revealedAttributes": {...}}'
                        />
                    </div>
                    <button style={styles.submitBtn('#8b5cf6')}>Proveri Potpis i Status na Sepolia Mreži</button>
                </div>
            )}

            {/* TAB 4: ADMIN */}
            {activeTab === 'admin' && (
                <div style={styles.card}>
                    <h2 style={styles.cardTitle}>Admin Panel - Registracija Izdavaoca</h2>
                    <div>
                        <label style={styles.label}>Ethereum Adresa Izdavaoca (Issuer Address):</label>
                        <input
                            style={styles.input}
                            type="text"
                            placeholder="0x..."
                            value={issuerAddressInput}
                            onChange={(e) => setIssuerAddressInput(e.target.value)}
                        />
                    </div>
                    <button
                        style={styles.submitBtn('#ef4444')}
                        onClick={ovlastiIzdavaoca}
                    >
                        Ovlasti Izdavaoca (Upis na Blockchain)
                    </button>
                </div>
            )}

        </div>
    )
}
<input
    type="text"
    value={adresaIzdavaoca}
    onChange={(e) => setAdresaIzdavaoca(e.target.value)}
/>
export default App