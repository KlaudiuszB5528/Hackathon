import * as htmlToImage from 'html-to-image';
import { z } from 'zod';
export const formSchema = z.object({
  city: z.string().min(1, { message: 'Provide city' }),
  theme: z.string().min(1, { message: 'Provide theme' }),
  points: z.string().min(1, { message: 'Provide number of points' }),
  participants: z
    .string()
    .min(1, { message: 'Provide number of participants' }),
});

export type CreateGameFormValues = z.infer<typeof formSchema>;

export const generateImage = () => {
  const node = document.getElementById('map');
  if (!node) return;
  htmlToImage
    .toPng(node)
    .then((dataUrl) => {
      const img = new Image();
      img.src = dataUrl;
      console.log(img);
      document.body.appendChild(img);
    })
    .catch((error) => {
      console.error('oops, something went wrong!', error);
    });
};
