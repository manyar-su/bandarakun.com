import { useMemo, useState } from 'react'
import './App.css'
import prod1 from './assets/prod1.jpg'
import prod2 from './assets/prod2.jpg'
import prod3 from './assets/prod3.jpg'
import logoNew from './assets/logo-new.jpg'
import bannerNew from './assets/banner-new.jpg'

const products = [
  { id: 1, name: 'Codex 5.3 / 5.4 Private', price: 55000, image: prod1, tag: 'Token', category: 'token' },
  { id: 2, name: 'Bandar Akun Official', price: 55000, image: prod2, tag: 'AI', category: 'ai' },
  { id: 3, name: 'Private Account Fast Process', price: 55000, image: prod3, tag: 'Editing', category: 'editing' },
]

export default function App() {
  const [selected, setSelected] = useState(null)
  const [form, setForm] = useState({ email: '', whatsapp: '' })
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredProducts = useMemo(() => (
    activeCategory === 'all' ? products : products.filter((p) => p.category === activeCategory)
  ), [activeCategory])

  const formattedPrice = useMemo(
    () => selected ? `Rp${selected.price.toLocaleString('id-ID')} NETT` : '',
    [selected],
  )

  return (
    <main>
      <header className="hero" style={{ backgroundImage: `linear-gradient(140deg,rgba(11,31,77,.92),rgba(18,51,122,.88)), url(${bannerNew})` }}>
        <img src={logoNew} alt="Bandar Akun" className="hero-logo" />
        <h1>Bandar Akun Marketplace</h1>
        <p>Penjualan akun terpercaya • proses cepat • garansi</p>
        <a href="#produk" className="btn primary">Lihat Produk</a>
      </header>

      <section id="produk" className="section">
        <div className="section-head">
          <h2>Produk Unggulan</h2>
          <span className="chip">Harga Nett setelah diskon</span>
        </div>

        <div className="filters">
          <button className={`filter ${activeCategory === 'all' ? 'active' : ''}`} onClick={() => setActiveCategory('all')}>Semua</button>
          <button className={`filter ${activeCategory === 'ai' ? 'active' : ''}`} onClick={() => setActiveCategory('ai')}>AI</button>
          <button className={`filter ${activeCategory === 'editing' ? 'active' : ''}`} onClick={() => setActiveCategory('editing')}>Editing</button>
          <button className={`filter ${activeCategory === 'token' ? 'active' : ''}`} onClick={() => setActiveCategory('token')}>Token</button>
        </div>

        <div className="grid">
          {filteredProducts.map((p) => (
            <article key={p.id} className="card">
              <img src={p.image} alt={p.name} />
              <div className="card-body">
                <span className="tag">{p.tag}</span>
                <h3>{p.name}</h3>
                <p className="price">Rp55.000 NETT</p>
                <button className="btn" onClick={() => setSelected(p)}>Beli Sekarang</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Proses Pembelian</h3>
            <p className="muted">{selected.name}</p>
            <p className="price">{formattedPrice}</p>
            <label>Email</label>
            <input type="email" placeholder="contoh@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <label>Nomor WhatsApp</label>
            <input type="text" placeholder="08xxxxxxxxxx" value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} />
            <div className="modal-actions">
              <button className="btn" onClick={() => setSelected(null)}>Batal</button>
              <a className="btn primary" href="#" onClick={(e) => { e.preventDefault(); alert('Data tersimpan. Lanjutkan ke pembayaran QRIS / rekening.') }}>Lanjut Bayar</a>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
