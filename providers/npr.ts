//import { withBase, joinURL } from 'ufo'
import type { ProviderGetImage } from '@nuxt/image'

const extractNprMax = (template: string) => {
    const match = template.match(/crop\/(\d+x\d+)/);
    return match ? `${match[1]}!` : '0x0!';
}

export const getImage: ProviderGetImage = (
    src,
    { modifiers = {}, baseURL } = {}
) => {
    const {
        width = '0',
        height = '0',
        format = 'webp',
        quality = '70',
    } = modifiers

    if (!baseURL) {
        // also support runtime config 
        baseURL = useRuntimeConfig().public.publisherBaseUrl
    }

    let theWidth = ""
    // doFill
    if (width !== '0' && height !== '0') {
        theWidth = `${width}x${height}!`
        // doWidth
    } else if (width !== '0' && height === '0') {
        theWidth = `${width}`
        // doOriginal
    } else if (width === '0' && height === '0') {
        theWidth = extractNprMax(src)
    }

    console.log('## theWidth= ', theWidth)


    const url = src
        .replace("{width}", String(theWidth))
        .replace("{quality}", String(quality))
        .replace("{format}", String(format))

    return {
        url,
    }
}
