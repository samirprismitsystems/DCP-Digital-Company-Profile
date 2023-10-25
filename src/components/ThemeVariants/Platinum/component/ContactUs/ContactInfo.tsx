import ContactUs from '@/components/ThemeVariants/Gold/ContactUs/ContactUs'
import GetInTouch from '../GetInTouch/GetInTouch'

export default function ContactInfo() {
  return (
    <section id="contact" className="blog_area bg-platinum-gray pt-platinum18 platinumLg:pt-platinum120">
      <ContactUs child={<GetInTouch />} />
    </section>
  )
}
