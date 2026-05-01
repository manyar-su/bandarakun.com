import { useMemo, useState } from 'react'
import './App.css'
import prod1 from './assets/prod1.jpg'
import prod2 from './assets/prod2.jpg'
import prod3 from './assets/prod3.jpg'

const products = [
  { id: 1, name: 'Codex 5.3 / 5.4 Private', price: 55000, image: prod1, tag: 'Best Seller' },
  { id: 2, name: 'Bandar Akun Official', price: 55000, image: prod2, tag: 'Trusted' },
  { id: 3, name: 'Private Account Fast Process', price: 55000, image: prod3, tag: '1 Bulan' },
]

export default function App() {
  const [selected, setSelected] = useState(null)
  const [form, setForm] = useState({ email: '', whatsapp: '' })

  const formattedPrice = useMemo(
    () => selected ? `Rp${selected.price.toLocaleString('id-ID')} NETT` : '',
    [selected],
  )

  const openModal = (product) => setSelected(product)
  const closeModal = () => {
    setSelected(null)
    setForm({ email: '', whatsapp: '' })
  }

  return (
    <main>
      <header className="hero">
        <h1>Bandar Akun Marketplace</h1>
        <p>Penjualan akun terpercaya • proses cepat • garansi</p>
        <a href="#produk" className="btn primary">Lihat Produk</a>
      </header>

      <section id="produk" className="section">
        <div className="section-head">
          <h2>Produk Unggulan</h2>
          <span className="chip">Harga Nett setelah diskon</span>
        </div>
        <div className="grid">
          {products.map((p) => (
            <article key={p.id} className="card">
              <img src={p.image} alt={p.name} />
              <div className="card-body">
                <span className="tag">{p.tag}</span>
                <h3>{p.name}</h3>
                <p className="price">Rp55.000 NETT</p>
                <button className="btn" onClick={() => openModal(p)}>Beli Sekarang</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {selected && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Proses Pembelian</h3>
            <p className="muted">{selected.name}</p>
            <p className="price">{formattedPrice}</p>
            <label>Email</label>
            <input
              type="email"
              placeholder="contoh@email.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <label>Nomor WhatsApp</label>
            <input
              type="text"
              placeholder="08xxxxxxxxxx"
              value={form.whatsapp}
              onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
            />
            <div className="modal-actions">
              <button className="btn" onClick={closeModal}>Batal</button>
              <a className="btn primary" href="#" onClick={(e) => {
                e.preventDefault()
                alert('Data tersimpan. Lanjutkan ke pembayaran QRIS / rekening.')
              }}>Lanjut Bayar</a>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
