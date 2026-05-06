import { useEffect, useState } from 'react'
import prod1 from '../assets/prod1.jpg'
import prod2 from '../assets/prod2.jpg'
import prod3 from '../assets/prod3.jpg'

const STORAGE_KEY = 'bandarakun-products'
const imageOptions = [prod1, prod2, prod3]

export default function AdminPage() {
  const [products, setProducts] = useState([])
  const [form, setForm] = useState({
    name: '',
    price: '',
    oldPrice: '',
    category: 'ai',
    location: '',
    sold: '',
    rating: '5.0',
    promo: '',
    duration: '1 bulan',
    image: imageOptions[0],
  })

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed)) setProducts(parsed)
      } catch {}
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const next = [
      {
        id: Date.now(),
        name: form.name,
        price: Number(form.price),
        oldPrice: Number(form.oldPrice || form.price),
        category: form.category,
        location: form.location || 'Indonesia',
        sold: form.sold || '0 terjual',
        rating: form.rating || '5.0',
        promo: form.promo || 'Produk Baru',
        duration: form.duration || '1 bulan',
        image: form.image,
      },
      ...products,
    ]
    setProducts(next)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    setForm({
      name: '',
      price: '',
      oldPrice: '',
      category: 'ai',
      location: '',
      sold: '',
      rating: '5.0',
      promo: '',
      duration: '1 bulan',
      image: imageOptions[0],
    })
  }

  const resetProducts = () => {
    localStorage.removeItem(STORAGE_KEY)
    setProducts([])
  }

  return (
    <main className="section admin-page">
      <div className="admin-head">
        <div>
          <span className="eyebrow">Admin Produk</span>
          <h1>Tambah Produk Marketplace</h1>
          <p className="section-copy">Panel sederhana untuk input produk baru agar langsung tampil di halaman utama pada browser ini.</p>
        </div>
        <a className="btn" href="/">Kembali ke Home</a>
      </div>

      <div className="admin-layout">
        <form className="admin-form panel" onSubmit={handleSubmit}>
          <label>Nama produk</label>
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />

          <div className="admin-row">
            <div>
              <label>Harga</label>
              <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
            </div>
            <div>
              <label>Harga coret</label>
              <input type="number" value={form.oldPrice} onChange={(e) => setForm({ ...form, oldPrice: e.target.value })} />
            </div>
          </div>

          <div className="admin-row">
            <div>
              <label>Kategori</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                <option value="ai">AI</option>
                <option value="tools">Tools</option>
                <option value="apps">Apps</option>
              </select>
            </div>
            <div>
              <label>Durasi</label>
              <input value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} />
            </div>
          </div>

          <div className="admin-row">
            <div>
              <label>Lokasi</label>
              <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
            </div>
            <div>
              <label>Promo</label>
              <input value={form.promo} onChange={(e) => setForm({ ...form, promo: e.target.value })} />
            </div>
          </div>

          <div className="admin-row">
            <div>
              <label>Rating</label>
              <input value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })} />
            </div>
            <div>
              <label>Terjual</label>
              <input value={form.sold} onChange={(e) => setForm({ ...form, sold: e.target.value })} placeholder="contoh: 20 terjual" />
            </div>
          </div>

          <label>Gambar</label>
          <select value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })}>
            {imageOptions.map((item) => <option key={item} value={item}>{item.split('/').pop()}</option>)}
          </select>

          <div className="admin-actions">
            <button className="btn primary" type="submit">Simpan Produk</button>
            <button className="btn" type="button" onClick={resetProducts}>Reset Produk Local</button>
          </div>
        </form>

        <div className="panel admin-preview">
          <h2>Preview Data Tersimpan</h2>
          <div className="admin-list">
            {products.length === 0 ? <p className="muted">Belum ada produk custom tersimpan.</p> : products.map((item) => (
              <article key={item.id} className="admin-item">
                <strong>{item.name}</strong>
                <span>{item.category.toUpperCase()} • Rp{Number(item.price).toLocaleString('id-ID')}</span>
                <small>{item.location} • {item.sold}</small>
              </article>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
