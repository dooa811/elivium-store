import { useState } from "react";
import { motion } from "framer-motion";
import Input  from "../../components/ui/Input.jsx";
import Button from "../../components/ui/Button.jsx";

export default function Contact() {
  const [form, setForm]   = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent]   = useState(false);
  const [load, setLoad]   = useState(false);
  const handle = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault(); setLoad(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoad(false); setSent(true);
  };

  return (
    <div>
      <div className="bg-obsidian-800 border-b border-obsidian-700 py-16 px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-xs font-semibold uppercase tracking-[0.4em] text-gold-500">Get in Touch</span>
          <h1 className="font-display text-5xl font-bold text-white mt-3 mb-4">Contact Us</h1>
          <p className="text-obsidian-200 font-light max-w-lg mx-auto">We're here to help. Our team typically responds within 24 hours.</p>
        </motion.div>
      </div>

      <section className="section-pad">
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Info */}
            <div className="space-y-8">
              {[
                { icon: "📧", label: "Email",    val: "hello@elivium.com",  sub: "We reply within 24h"    },
                { icon: "📞", label: "Phone",    val: "+1 (800) 354-4868",  sub: "Mon–Fri, 9am–6pm EST"   },
                { icon: "📍", label: "Address",  val: "12 Luxury Lane,\nNew York, NY 10001", sub: "By appointment only" },
              ].map(c => (
                <motion.div key={c.label} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} className="flex gap-5">
                  <div className="w-12 h-12 border border-gold-500/30 bg-gold-500/8 flex items-center justify-center text-xl flex-shrink-0">
                    {c.icon}
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-obsidian-300 mb-1">{c.label}</p>
                    <p className="text-white font-medium text-sm whitespace-pre-line">{c.val}</p>
                    <p className="text-obsidian-400 text-xs mt-0.5">{c.sub}</p>
                  </div>
                </motion.div>
              ))}

              <div className="pt-6 border-t border-obsidian-700">
                <p className="text-xs font-bold uppercase tracking-widest text-obsidian-300 mb-4">Follow Us</p>
                <div className="flex gap-3">
                  {["Instagram", "Twitter", "Pinterest"].map(s => (
                    <a key={s} href="#" className="text-xs text-obsidian-300 hover:text-gold-400 transition-colors border-b border-obsidian-600 hover:border-gold-400 pb-0.5">{s}</a>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              {sent ? (
                <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  className="glass-gold p-12 text-center">
                  <div className="text-4xl mb-4">✦</div>
                  <h3 className="font-display text-2xl font-bold text-white mb-3">Message Received</h3>
                  <p className="text-obsidian-200 font-light">Thank you for reaching out. We'll be in touch within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={submit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Input label="Your Name"   name="name"    value={form.name}    onChange={handle} placeholder="James Smith"      required/>
                    <Input label="Your Email"  name="email"   type="email" value={form.email}   onChange={handle} placeholder="james@email.com"  required/>
                  </div>
                  <Input label="Subject" name="subject" value={form.subject} onChange={handle} placeholder="Order inquiry, styling advice..." required/>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-widest text-obsidian-300">Message</label>
                    <textarea name="message" value={form.message} onChange={handle} required rows={6}
                      placeholder="Tell us how we can help..."
                      className="bg-obsidian-700 border border-obsidian-500 text-white placeholder-obsidian-400 px-4 py-3.5 text-sm focus:outline-none focus:border-gold-500 transition-colors resize-none"/>
                  </div>
                  <Button type="submit" variant="gold" size="lg" loading={load}>
                    Send Message
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}