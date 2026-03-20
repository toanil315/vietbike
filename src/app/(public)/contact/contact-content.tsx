'use client';

export default function ContactContent() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-8">
      <h1 className="text-4xl font-bold">Contact VietBike</h1>
      <p className="text-secondary">Have questions? We're here to help you plan your perfect ride.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
        <div className="glass p-8 rounded-3xl space-y-4">
          <h3 className="font-bold text-lg">Hanoi Office</h3>
          <p className="text-sm text-secondary">123 Old Quarter, Hoan Kiem, Hanoi</p>
          <p className="text-sm font-bold text-primary">+84 90 123 4567</p>
        </div>
        <div className="glass p-8 rounded-3xl space-y-4">
          <h3 className="font-bold text-lg">Support Hours</h3>
          <p className="text-sm text-secondary">Monday - Sunday</p>
          <p className="text-sm font-bold text-primary">08:00 AM - 08:00 PM</p>
        </div>
      </div>
      <form className="glass p-8 rounded-3xl space-y-4 text-left">
        <div className="space-y-2">
          <label className="text-xs font-bold text-secondary uppercase">Your Name</label>
          <input type="text" className="w-full bg-surface-container border-none rounded-xl py-3 px-4" placeholder="Enter your name" />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-secondary uppercase">Message</label>
          <textarea className="w-full bg-surface-container border-none rounded-xl py-3 px-4 h-32" placeholder="How can we help?"></textarea>
        </div>
        <button type="button" className="w-full bg-primary text-white py-4 rounded-2xl font-bold">Send Message</button>
      </form>
    </div>
  );
}
