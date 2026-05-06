const faqs = [
  {
    q: 'Kategori apa saja yang tersedia?',
    a: 'Saat ini fokus utamanya dibagi jadi VIP Sharing untuk AI, Tools, dan Apps supaya user lebih cepat menemukan produk yang dicari.',
  },
  {
    q: 'Informasi apa yang bisa dilihat sebelum checkout?',
    a: 'Sekarang user bisa lihat nama produk, kategori, durasi, jenis akses, status stok, dan ringkasan benefit sebelum lanjut order.',
  },
  {
    q: 'Bagaimana proses beli?',
    a: 'Pilih produk, cek detail, isi kontak, lalu lanjutkan ke admin untuk proses konfirmasi order.',
  },
  {
    q: 'Kalau masih bingung pilih AI, Tools, atau Apps?',
    a: 'Mulai dari kategori dulu, lalu pilih produk yang paling relevan dengan kebutuhan utama user.',
  },
]

export default function FaqPage() {
  return (
    <main className="section page-shell">
      <span className="eyebrow">FAQ</span>
      <h1>Pertanyaan Umum</h1>
      <div className="faq-grid">
        {faqs.map((item) => (
          <article key={item.q} className="faq-card">
            <h3>{item.q}</h3>
            <p>{item.a}</p>
          </article>
        ))}
      </div>
    </main>
  )
}
