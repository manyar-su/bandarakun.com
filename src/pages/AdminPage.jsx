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
    sold: '',
    rating: '5.0',
    promo: '',
    duration: '30 hari',
    serviceType: '',
    detail: '',
    features: '',
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
        sold: form.sold || '0 terjual',
        rating: form.rating || '5.0',
        promo: form.promo || 'Produk Baru',
        duration: form.duration || '30 hari',
        serviceType: form.serviceType || 'Digital access',
        detail: form.detail || 'Produk digital premium.',
        features: form.features ? form.features.split(',').map((item) => item.trim()).filter(Boolean) : ['Akses digital'],
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
      sold: '',
      rating: '5.0',
      promo: '',
      duration: '30 hari',
      serviceType: '',
      detail: '',
      features: '',
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
          <h1>Tambah Produk Digital</h1>
          <p className="section-copy">Isi data digital product lalu tampilkan langsung di home pada browser ini.</p>
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
              <label>Masa aktif</label>
              <input value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} />
            </div>
          </div>

          <div className="admin-row">
            <div>
              <label>Jenis layanan</label>
              <input value={form.serviceType} onChange={(e) => setForm({ ...form, serviceType: e.target.value })} placeholder="contoh: Sharing access" />
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

          <label>Keterangan produk</label>
          <input value={form.detail} onChange={(e) => setForm({ ...form, detail: e.target.value })} placeholder="jelaskan produk digital ini" />

          <label>Fitur layanan</label>
          <input value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })} placeholder="pisahkan dengan koma, contoh: 8500 token, generate image, generate video" />

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
                <small>{item.duration} • {item.serviceType}</small>
              </article>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
