import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, { message: 'Ad ən azı 2 simvol olmalıdır' }),
  email: z.string().email({ message: 'Düzgün e-poçt ünvanı daxil edin' }),
  phone: z.string().min(9, { message: 'Düzgün telefon nömrəsi daxil edin' }),
  message: z.string().min(10, { message: 'Mesaj ən azı 10 simvol olmalıdır' })
});

export const askDoctorSchema = contactSchema.extend({
  question: z.string().min(20, { message: 'Sualınız ən azı 20 simvol olmalıdır' }),
  agreeToTerms: z.boolean().refine(val => val === true, { message: 'Qaydalarla razılaşmalısınız' })
}).omit({ message: true });

export const searchSchema = z.object({
  checkIn: z.string().min(1, { message: 'Gediş tarixi tələb olunur' }),
  checkOut: z.string().min(1, { message: 'Dönüş tarixi tələb olunur' }),
  adults: z.number().min(1, { message: 'Ən azı 1 böyük olmalıdır' }),
  children: z.number().min(0),
  location: z.string().min(1, { message: 'Şəhər seçilməlidir' })
}); 