import Image, { type ImageProps } from 'next/image';
import { asset } from '@/lib/basePath';

type Props = Omit<ImageProps, 'src'> & { src: string };

// Use this instead of a raw <img> for every data-driven image. next/image applies
// assetPrefix, but normalizing the string src through asset() guarantees correct paths
// on the GitHub Pages subpath. External URLs pass through untouched.
export default function SmartImage({ src, alt, ...rest }: Props) {
  return <Image src={asset(src)} alt={alt} {...rest} />;
}
